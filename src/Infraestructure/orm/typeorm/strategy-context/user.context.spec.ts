import { RoleModel } from "@Domain/models/role.model";
import { UserAvailableContext, UserCanSeeContext } from "./user.context";

describe("User Strategies", () => {
  let repositoryMock: any;

  beforeEach(() => {
    repositoryMock = {
      manager: {
        find: jest.fn().mockResolvedValue([{ id: 1 }]),
        findBy: jest.fn().mockResolvedValue([{ id: 2 }]),
        findOneBy: jest.fn().mockResolvedValue({ id: 9 }),
        createQueryBuilder: jest.fn(),
      },
      source: {
        getRepository: jest.fn().mockReturnValue({
          findOneBy: jest.fn().mockResolvedValue({ id: 5 }),
        }),
      },
    };
  });

  describe("UserCanSeeContext", () => {
    it("Administrator branch returns all users via find()", async () => {
      const strategy = UserCanSeeContext(RoleModel.ROLE_ADMINISTRATOR);
      const res = await strategy.getData({} as any, repositoryMock);
      expect(repositoryMock.manager.find).toHaveBeenCalled();
      expect(res).toEqual([{ id: 1 }]);
    });

    it("Proprietary branch uses QB and excludes admin role", async () => {
      const qb = {
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([{ id: 3 }]),
      };
      repositoryMock.manager.createQueryBuilder.mockReturnValue(qb);

      const strategy = UserCanSeeContext(RoleModel.ROLE_PROPIETARY);
      const res = await strategy.getData({} as any, repositoryMock);

      expect(repositoryMock.manager.createQueryBuilder).toHaveBeenCalledWith("u");
      expect(qb.innerJoin).toHaveBeenCalledWith("u.person", "p");
      expect(qb.innerJoin).toHaveBeenCalledWith("p.role", "r");
      expect(qb.where).toHaveBeenCalledWith("r.name != :excluded", { excluded: RoleModel.ROLE_ADMINISTRATOR });
      expect(qb.getMany).toHaveBeenCalled();
      expect(res).toEqual([{ id: 3 }]);
    });

    it("Manager branch finds branch by user and filters users by branch", async () => {
      // Mock branch lookup to return branch id 42
      repositoryMock.source.getRepository = jest.fn().mockReturnValue({
        findOneBy: jest.fn().mockResolvedValue({ id: 42 }),
      });

      const strategy = UserCanSeeContext(RoleModel.ROLE_MANAGER);
      const res = await strategy.getData({ userId: 7 } as any, repositoryMock);

      expect(repositoryMock.source.getRepository).toHaveBeenCalled();
      expect(repositoryMock.manager.findBy).toHaveBeenCalledWith({ person: { employee: { branchId: 42 } } });
      expect(res).toEqual([{ id: 2 }]);
    });

    it("Basic branch returns the specific user by id wrapped in an array", async () => {
      repositoryMock.manager.findOneBy.mockResolvedValue({ id: 99 });
      const strategy = UserCanSeeContext("OTHER");
      const res = await strategy.getData({ userId: 99 } as any, repositoryMock);
      expect(repositoryMock.manager.findOneBy).toHaveBeenCalledWith({ id: 99 });
      expect(res).toEqual([{ id: 99 }]);
    });
  });

  describe("UserAvailableContext", () => {
    it("Administrator available: left join person and filter null person + email like", async () => {
      const qb = {
        leftJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([{ id: 11 }]),
      };
      repositoryMock.manager.createQueryBuilder.mockReturnValue(qb);
  const strategy = UserAvailableContext(RoleModel.ROLE_ADMINISTRATOR);
      const res = await strategy.getData({ query: "adm" } as any, repositoryMock);
      expect(repositoryMock.manager.createQueryBuilder).toHaveBeenCalledWith('u');
      expect(qb.leftJoin).toHaveBeenCalledWith('u.person', 'p');
      expect(qb.where).toHaveBeenCalledWith('u.email LIKE :email', { email: `%adm%` });
      expect(qb.andWhere).toHaveBeenCalledWith('p.id IS NULL');
      expect(qb.getMany).toHaveBeenCalled();
      expect(res).toEqual([{ id: 11 }]);
    });

    it("Proprietary available: left join person and role, exclude admin role", async () => {
      const qb = {
        leftJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([{ id: 12 }]),
      };
      repositoryMock.manager.createQueryBuilder.mockReturnValue(qb);
  const strategy = UserAvailableContext(RoleModel.ROLE_PROPIETARY);
      const res = await strategy.getData({ query: "prop" } as any, repositoryMock);
      expect(repositoryMock.manager.createQueryBuilder).toHaveBeenCalledWith('u');
      expect(qb.leftJoin).toHaveBeenCalledWith('u.person', 'p');
      expect(qb.leftJoin).toHaveBeenCalledWith('p.role', 'r');
      expect(qb.where).toHaveBeenCalledWith('u.email LIKE :email', { email: `%prop%` });
      expect(qb.andWhere).toHaveBeenCalledWith('p.id IS NULL');
      expect(qb.andWhere).toHaveBeenCalledWith('r.name != :excluded', { excluded: RoleModel.ROLE_ADMINISTRATOR });
      expect(res).toEqual([{ id: 12 }]);
    });

    it("Manager available: left join person->employee and filter by branch", async () => {
      repositoryMock.source.getRepository = jest.fn().mockReturnValue({
        findOneBy: jest.fn().mockResolvedValue({ id: 77 }),
      });
      const qb = {
        leftJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([{ id: 13 }]),
      };
      repositoryMock.manager.createQueryBuilder.mockReturnValue(qb);
  const strategy = UserAvailableContext(RoleModel.ROLE_MANAGER);
      const res = await strategy.getData({ query: "mgr", userId: 2 } as any, repositoryMock);

      expect(repositoryMock.source.getRepository).toHaveBeenCalled();
      expect(repositoryMock.manager.createQueryBuilder).toHaveBeenCalledWith('u');
      expect(qb.leftJoin).toHaveBeenCalledWith('u.person', 'p');
      expect(qb.leftJoin).toHaveBeenCalledWith('p.employee', 'e');
      expect(qb.where).toHaveBeenCalledWith('u.email LIKE :email', { email: `%mgr%` });
      expect(qb.andWhere).toHaveBeenCalledWith('p.id IS NULL');
      expect(qb.andWhere).toHaveBeenCalledWith('e.branch_id = :branchId', { branchId: 77 });
      expect(res).toEqual([{ id: 13 }]);
    });

    it("Default available context returns null", () => {
      const ctx = UserAvailableContext('OTHER');
      expect(ctx).toBeNull();
    });
  });
});
