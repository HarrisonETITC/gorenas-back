import { RoleModel } from '@Domain/models/role.model';
import { BaseStrategy, AdministratorStrategy, BranchCanSeeContext } from './branch.context';

describe('Branch Strategies', () => {
    let repositoryMock: any;
    let queryBuilderMock: any;

    beforeEach(() => {
        queryBuilderMock = {
            leftJoinAndSelect: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            getMany: jest.fn().mockResolvedValue([{ id: 1 }, { id: 2 }]),
        };
        repositoryMock = {
            manager: {
                createQueryBuilder: jest.fn().mockReturnValue(queryBuilderMock)
            },
            processFilter: jest.fn().mockResolvedValue(undefined)
        };
    });

    describe('BaseStrategy', () => {
        it('should build query with joins and filter, then return branches', async () => {
            const args = { userId: 10 };
            const strategy = new BaseStrategy();
            const result = await strategy.getData(args as any, repositoryMock);

            expect(repositoryMock.manager.createQueryBuilder).toHaveBeenCalledWith('s');
            expect(queryBuilderMock.leftJoinAndSelect).toHaveBeenCalledWith('s.employees', 'e');
            expect(queryBuilderMock.leftJoinAndSelect).toHaveBeenCalledWith('e.person', 'p');
            expect(queryBuilderMock.where).toHaveBeenCalledWith('p.user_id = :userId', { userId: 10 });
            expect(repositoryMock.processFilter).toHaveBeenCalledWith(queryBuilderMock, args);
            expect(queryBuilderMock.getMany).toHaveBeenCalled();
            expect(result).toEqual([{ id: 1 }, { id: 2 }]);
        });
    });

    describe('AdministratorStrategy', () => {
        it('should build query without joins and return branches', async () => {
            const args = { restaurantId: 5 };
            const strategy = new AdministratorStrategy();
            const result = await strategy.getData(args as any, repositoryMock);

            expect(repositoryMock.manager.createQueryBuilder).toHaveBeenCalledWith('s');
            expect(repositoryMock.processFilter).toHaveBeenCalledWith(queryBuilderMock, args);
            expect(queryBuilderMock.getMany).toHaveBeenCalled();
            expect(result).toEqual([{ id: 1 }, { id: 2 }]);
        });
    });

    describe('BranchCanSeeContext', () => {
        it('should return BaseStrategy for manager or cashier', () => {
            expect(BranchCanSeeContext(RoleModel.ROLE_MANAGER)).toBeInstanceOf(BaseStrategy);
            expect(BranchCanSeeContext(RoleModel.ROLE_CASHIER)).toBeInstanceOf(BaseStrategy);
        });

        it('should return AdministratorStrategy for other roles', () => {
            expect(BranchCanSeeContext('admin')).toBeInstanceOf(AdministratorStrategy);
            expect(BranchCanSeeContext('superuser')).toBeInstanceOf(AdministratorStrategy);
        });
    });
});