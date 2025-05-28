import { RoleRepository } from './role.repository';
import { AppUtil } from '@Application/core/utils/app.util';
import { RoleAvailableContext, RoleCanSeeContext } from '../strategy-context/role.context';

jest.mock('@Application/core/utils/app.util');
jest.mock('../strategy-context/role.context');

describe('RoleRepository Unit Test', () => {
    let repository: RoleRepository;
    let dataSourceMock: any;
    let mapperMock: any;
    let managerMock: any;

    beforeEach(() => {
        managerMock = {
            createQueryBuilder: jest.fn().mockReturnValue({
                innerJoin: jest.fn().mockReturnThis(),
                select: jest.fn().mockReturnThis(),
                addSelect: jest.fn().mockReturnThis(),
                groupBy: jest.fn().mockReturnThis(),
                addGroupBy: jest.fn().mockReturnThis(),
                getRawMany: jest.fn(),
                orWhere: jest.fn().mockReturnThis(),
                getMany: jest.fn()
            })
        };
        dataSourceMock = {
            getRepository: jest.fn().mockReturnValue(managerMock),
            manager: managerMock
        };
        mapperMock = {
            fromDomainToMv: jest.fn((model, opts) => ({ ...model, ...opts }))
        };

        function mapToIdValue(d: any, idField: string, valueFields: any[]) {
            return {
                id: d[idField],
                value: valueFields.map((f: any) => d[f]).join(' ')
            };
        }

        (AppUtil.transformToIdValue as jest.Mock).mockImplementation((data, idField, valueFields) =>
            data.map((d: any) => mapToIdValue(d, idField, valueFields))
        );

        repository = new RoleRepository(dataSourceMock, mapperMock);
        repository.manager = managerMock;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should get available roles as IdValue array', async () => {
        const params = { role: 'admin' };
        const data = [
            { id: 1, name: 'Admin' },
            { id: 2, name: 'User' }
        ];
        (RoleAvailableContext as any).mockReturnValue({
            getData: jest.fn().mockResolvedValue(data)
        });

        const result = await repository.getAvailable(params as any);

        expect(RoleAvailableContext).toHaveBeenCalledWith('admin');
        expect(result).toEqual([
            { id: 1, value: 'Admin' },
            { id: 2, value: 'User' }
        ]);
    });

    it('Should get can see roles as RoleModelView[] with users count', async () => {
        const params = { role: 'admin' };
        const basicRoles = [
            { id: 1, name: 'Admin' },
            { id: 2, name: 'User' }
        ];
        const infoRoles = [
            { id: 1, name: 'Admin', usedBy: '3' },
            { id: 2, name: 'User', usedBy: '1' }
        ];
        (RoleCanSeeContext as any).mockReturnValue({
            getData: jest.fn().mockResolvedValue(basicRoles)
        });
        managerMock.createQueryBuilder().getRawMany.mockResolvedValue(infoRoles);

        const result = await repository.getCanSee(params as any);

        expect(RoleCanSeeContext).toHaveBeenCalledWith('admin');
        expect(managerMock.createQueryBuilder).toHaveBeenCalledWith('r');
        expect(result[0]).toEqual(expect.objectContaining({ id: 1, name: 'Admin', users: 3 }));
        expect(result[1]).toEqual(expect.objectContaining({ id: 2, name: 'User', users: 1 }));
    });

    it('Should get can see roles as RoleModelView[] with users count 0 if not found', async () => {
        const params = { role: 'admin' };
        const basicRoles = [
            { id: 1, name: 'Admin' }
        ];
        const infoRoles = [{
            id: 1
        }];
        (RoleCanSeeContext as any).mockReturnValue({
            getData: jest.fn().mockResolvedValue(basicRoles)
        });
        managerMock.createQueryBuilder().getRawMany.mockResolvedValue(infoRoles);

        const result = await repository.getCanSee(params as any);

        expect(result[0]).toEqual(expect.objectContaining({ id: 1, name: 'Admin', users: 0 }));
    });

    it('Should get IdValue array from getIdValueMany', async () => {
        const values = ['Admin', 'User'];
        const roles = [
            { id: 1, name: 'Admin' },
            { id: 2, name: 'User' }
        ];
        managerMock.createQueryBuilder().getMany.mockResolvedValue(roles);

        const result = await repository.getIdValueMany(values);

        expect(managerMock.createQueryBuilder).toHaveBeenCalledWith('r');
        expect(managerMock.createQueryBuilder().orWhere).toHaveBeenCalledTimes(values.length);
        expect(AppUtil.transformToIdValue).toHaveBeenCalledWith(roles, 'id', ['name']);
        expect(result).toEqual([
            { id: 1, value: 'Admin' },
            { id: 2, value: 'User' }
        ]);
    });
});