import { RoleModel } from "@Domain/models/role.model";
import {
  PersonCanSeeContext,
  AdministratorStrategy,
  ManagerStrategy,
  CashierStrategy,
} from "./person.context";

describe("Person Strategies", () => {
  let repositoryMock: any;

  beforeEach(() => {
    repositoryMock = {
      manager: {
        createQueryBuilder: jest.fn(),
        findOneBy: jest.fn(),
      },
      source: {
        getRepository: jest.fn(),
      },
    };
  });

  describe("PersonCanSeeContext", () => {
    it("should return AdministratorStrategy for administrator role", async () => {
      const qb = {
        innerJoin: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        addOrderBy: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([{ id: 1 }]),
      };
      repositoryMock.manager.createQueryBuilder.mockReturnValue(qb);

      const strategy = PersonCanSeeContext(RoleModel.ROLE_ADMINISTRATOR);
      expect(strategy).toBeInstanceOf(AdministratorStrategy);
      const result = await strategy.getData({} as any, repositoryMock);
      expect(repositoryMock.manager.createQueryBuilder).toHaveBeenCalledWith("p");
      expect(qb.innerJoin).toHaveBeenCalledWith("p.role", "r");
      expect(qb.orderBy).toHaveBeenCalledWith(
        `FIELD(r.name, '${RoleModel.ROLE_ADMINISTRATOR}', '${RoleModel.ROLE_PROPIETARY}', '${RoleModel.ROLE_MANAGER}', '${RoleModel.ROLE_CASHIER}')`,
        "ASC"
      );
      expect(qb.addOrderBy).toHaveBeenCalledWith("p.id", "ASC");
      expect(qb.getMany).toHaveBeenCalled();
      expect(result).toEqual([{ id: 1 }]);
    });

    it("should return AdministratorStrategy for proprietary role (same branch)", async () => {
      const qb = {
        innerJoin: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        addOrderBy: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([{ id: 2 }]),
      };
      repositoryMock.manager.createQueryBuilder.mockReturnValue(qb);

      const strategy = PersonCanSeeContext(RoleModel.ROLE_PROPIETARY);
      expect(strategy).toBeInstanceOf(AdministratorStrategy);
      await strategy.getData({} as any, repositoryMock);
      expect(repositoryMock.manager.createQueryBuilder).toHaveBeenCalledWith("p");
      expect(qb.getMany).toHaveBeenCalled();
    });

    it("should return ManagerStrategy for manager role", async () => {
      const branchQB = {
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue({ id: 42 }),
      };
      repositoryMock.source.getRepository.mockReturnValue({
        createQueryBuilder: jest.fn().mockReturnValue(branchQB),
      });

      const peopleQB = {
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([{ id: 3 }]),
      };
      repositoryMock.manager.createQueryBuilder.mockReturnValue(peopleQB);

      const strategy = PersonCanSeeContext(RoleModel.ROLE_MANAGER);
      expect(strategy).toBeInstanceOf(ManagerStrategy);
      const args = { userId: 7 } as any;
      const result = await strategy.getData(args, repositoryMock);

      expect(repositoryMock.source.getRepository).toHaveBeenCalled();
      expect(branchQB.innerJoin).toHaveBeenCalledWith("s.employees", "e");
      expect(branchQB.innerJoin).toHaveBeenCalledWith("e.person", "p");
      expect(branchQB.where).toHaveBeenCalledWith("p.userId = :userId", { userId: 7 });
      expect(branchQB.select).toHaveBeenCalledWith("s.id");
      expect(branchQB.getOne).toHaveBeenCalled();

      expect(repositoryMock.manager.createQueryBuilder).toHaveBeenCalledWith("p");
      expect(peopleQB.innerJoinAndSelect).toHaveBeenCalledWith("p.employee", "e");
      expect(peopleQB.innerJoinAndSelect).toHaveBeenCalledWith("e.branch", "s");
      expect(peopleQB.where).toHaveBeenCalledWith("s.id = :branchId", { branchId: 42 });
      expect(peopleQB.getMany).toHaveBeenCalled();
      expect(result).toEqual([{ id: 3 }]);
    });

    it("should return CashierStrategy for any other role", async () => {
      repositoryMock.manager.findOneBy.mockResolvedValue({ id: 9, userId: 8 });
      const strategy = PersonCanSeeContext("other");
      expect(strategy).toBeInstanceOf(CashierStrategy);

      const result = await strategy.getData({ userId: 8 } as any, repositoryMock);
      expect(repositoryMock.manager.findOneBy).toHaveBeenCalledWith({ userId: 8 });
      expect(result).toEqual([{ id: 9, userId: 8 }]);
    });
  });
});
