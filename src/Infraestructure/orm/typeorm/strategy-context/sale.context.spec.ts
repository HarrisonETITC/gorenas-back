import { RoleModel } from "@Domain/models/role.model";
import { SaleCanSeeContext } from "./sale.context";

describe("Sale Strategies", () => {
  let repositoryMock: any;

  beforeEach(() => {
    repositoryMock = {
      manager: {
        find: jest.fn().mockResolvedValue([{ id: 1 }]),
        findBy: jest.fn().mockResolvedValue([{ id: 2 }]),
      },
      source: {
        getRepository: jest.fn().mockReturnValue({
          findOneBy: jest.fn().mockResolvedValue({ branchId: 77 }),
        }),
      },
    };
  });

  it("Administrator/Proprietary branch: returns all sales via find()", async () => {
    const strategyAdmin = SaleCanSeeContext(RoleModel.ROLE_ADMINISTRATOR);
    const resA = await strategyAdmin.getData({} as any, repositoryMock);
    expect(repositoryMock.manager.find).toHaveBeenCalled();
    expect(resA).toEqual([{ id: 1 }]);

    const strategyProp = SaleCanSeeContext(RoleModel.ROLE_PROPIETARY);
    const resP = await strategyProp.getData({} as any, repositoryMock);
    expect(repositoryMock.manager.find).toHaveBeenCalledTimes(2);
    expect(resP).toEqual([{ id: 1 }]);
  });

  it("Manager branch: finds employee by userId and filters sales by branchId", async () => {
    const strategy = SaleCanSeeContext(RoleModel.ROLE_MANAGER);
    const res = await strategy.getData({ userId: 10 } as any, repositoryMock);
    expect(repositoryMock.source.getRepository).toHaveBeenCalled();
    expect(repositoryMock.manager.findBy).toHaveBeenCalledWith({ employee: { branchId: 77 } });
    expect(res).toEqual([{ id: 2 }]);
  });

  it("Basic branch: filters sales by employee.person.userId", async () => {
    const strategy = SaleCanSeeContext("OTHER");
    const res = await strategy.getData({ userId: 33 } as any, repositoryMock);
    expect(repositoryMock.manager.findBy).toHaveBeenCalledWith({ employee: { person: { userId: 33 } } });
    expect(res).toEqual([{ id: 2 }]);
  });
});
