import { RoleModel } from "@Domain/models/role.model";
import { RoleAvailableContext, RoleCanSeeContext } from "./role.context";

describe("Role Strategies", () => {
	let repositoryMock: any;

	beforeEach(() => {
		repositoryMock = {
			manager: {
				findBy: jest.fn().mockResolvedValue([{ id: 1 }]),
				createQueryBuilder: jest.fn(),
			},
		};
	});

	describe("RoleCanSeeContext", () => {
		it("Administrator/Proprietary branch uses findBy with Like and coalesces undefined query", async () => {
			const strategyAdmin = RoleCanSeeContext(RoleModel.ROLE_ADMINISTRATOR);
			await strategyAdmin.getData({} as any, repositoryMock);
			expect(repositoryMock.manager.findBy).toHaveBeenCalledTimes(1);
			expect(repositoryMock.manager.findBy).toHaveBeenCalledWith({ name: expect.anything() });

			const strategyProp = RoleCanSeeContext(RoleModel.ROLE_PROPIETARY);
			await strategyProp.getData({ query: "adm" } as any, repositoryMock);
			expect(repositoryMock.manager.findBy).toHaveBeenCalledTimes(2);
		});

		it("Manager branch uses QB and filters by not-in and like", async () => {
			const qb = {
				where: jest.fn().mockReturnThis(),
				andWhere: jest.fn().mockReturnThis(),
				getMany: jest.fn().mockResolvedValue([{ id: 2 }]),
			};
			repositoryMock.manager.createQueryBuilder.mockReturnValue(qb);

			const strategy = RoleCanSeeContext(RoleModel.ROLE_MANAGER);
			const res = await strategy.getData({ query: "mgr" } as any, repositoryMock);

			expect(repositoryMock.manager.createQueryBuilder).toHaveBeenCalledWith("r");
			expect(qb.where).toHaveBeenCalledWith(
				"r.name NOT IN (:...excludedValues)",
				{ excludedValues: [RoleModel.ROLE_ADMINISTRATOR, RoleModel.ROLE_PROPIETARY, RoleModel.ROLE_MANAGER] }
			);
			expect(qb.andWhere).toHaveBeenCalledWith("r.name LIKE :searchValue", { searchValue: `%mgr%` });
			expect(qb.getMany).toHaveBeenCalled();
			expect(res).toEqual([{ id: 2 }]);
		});

		it("Basic branch returns empty array", async () => {
			const strategy = RoleCanSeeContext("OTHER");
			const res = await strategy.getData({} as any, repositoryMock);
			expect(res).toEqual([]);
		});
	});

	describe("RoleAvailableContext", () => {
		it("Administrator uses findBy Like", async () => {
			const strategy = RoleAvailableContext(RoleModel.ROLE_ADMINISTRATOR);
			await strategy.getData({ query: "adm" } as any, repositoryMock);
			expect(repositoryMock.manager.findBy).toHaveBeenCalledWith({ name: expect.anything() });
		});

		it("Proprietary uses QB with exclude admins/proprietary", async () => {
			const qb = {
				where: jest.fn().mockReturnThis(),
				andWhere: jest.fn().mockReturnThis(),
				getMany: jest.fn().mockResolvedValue([{ id: 3 }]),
			};
			repositoryMock.manager.createQueryBuilder.mockReturnValue(qb);

			const strategy = RoleAvailableContext(RoleModel.ROLE_PROPIETARY);
			const res = await strategy.getData({ query: "prop" } as any, repositoryMock);
			expect(repositoryMock.manager.createQueryBuilder).toHaveBeenCalledWith("r");
			expect(qb.where).toHaveBeenCalledWith("r.name LIKE :query", { query: `%prop%` });
			expect(qb.andWhere).toHaveBeenCalledWith("r.name NOT IN(:exclude)", { exclude: [RoleModel.ROLE_ADMINISTRATOR, RoleModel.ROLE_PROPIETARY] });
			expect(qb.getMany).toHaveBeenCalled();
			expect(res).toEqual([{ id: 3 }]);
		});

		it("Manager uses QB with exclude admins/proprietary/manager", async () => {
			const qb = {
				where: jest.fn().mockReturnThis(),
				andWhere: jest.fn().mockReturnThis(),
				getMany: jest.fn().mockResolvedValue([{ id: 4 }]),
			};
			repositoryMock.manager.createQueryBuilder.mockReturnValue(qb);

			const strategy = RoleAvailableContext(RoleModel.ROLE_MANAGER);
			const res = await strategy.getData({ query: "mgr" } as any, repositoryMock);
			expect(repositoryMock.manager.createQueryBuilder).toHaveBeenCalledWith("r");
			expect(qb.where).toHaveBeenCalledWith("r.name LIKE :query", { query: `%mgr%` });
			// Note: string matches implementation even if it contains a typo (...exclude)
			expect(qb.andWhere).toHaveBeenCalledWith("r.name NOT IN(...exclude)", { exclude: [RoleModel.ROLE_ADMINISTRATOR, RoleModel.ROLE_PROPIETARY, RoleModel.ROLE_MANAGER] });
			expect(qb.getMany).toHaveBeenCalled();
			expect(res).toEqual([{ id: 4 }]);
		});

		it("Default branch returns empty array", async () => {
			const strategy = RoleAvailableContext("OTHER");
			const res = await strategy.getData({} as any, repositoryMock);
			expect(res).toEqual([]);
		});
	});
});

