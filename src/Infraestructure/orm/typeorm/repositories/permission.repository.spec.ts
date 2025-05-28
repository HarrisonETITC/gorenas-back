import { PermissionRepository } from './permission.repository';
import { RoleEntity } from '../entities/role.entity';
import { AppUtil } from '@Application/core/utils/app.util';

jest.mock('@Application/core/utils/app.util');

describe('PermissionRepository Unit Test', () => {
    let repository: PermissionRepository;
    let dataSourceMock: any;
    let mapperMock: any;
    let roleRepoMock: any;
    let managerMock: any;

    beforeEach(() => {
        roleRepoMock = { findBy: jest.fn() };
        managerMock = {
            findBy: jest.fn()
        };
        dataSourceMock = {
            getRepository: jest.fn((entity) => {
                if (entity === RoleEntity) return roleRepoMock;
                return null;
            })
        };
        mapperMock = {
            fromDomainToMv: jest.fn((model, opts) => ({
                ...model,
                role: opts?.role ?? ''
            }))
        };

        (AppUtil.extractIds as jest.Mock).mockImplementation((arr, field) => arr.map(e => e[field]));

        repository = new PermissionRepository(dataSourceMock, mapperMock);
        repository.manager = managerMock;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should map PermissionModel[] to PermissionModelView[] with role names', async () => {
        const models = [
            { id: 1, roleId: 10 },
            { id: 2, roleId: 20 }
        ];
        const roles = [
            { id: 10, name: 'Admin' },
            { id: 20, name: 'User' }
        ];
        roleRepoMock.findBy.mockResolvedValue(roles);

        const result = await repository.generateModelView(models as any);

        expect(result).toEqual([
            expect.objectContaining({ id: 1, role: 'Admin' }),
            expect.objectContaining({ id: 2, role: 'User' })
        ]);
        expect(roleRepoMock.findBy).toHaveBeenCalledWith({ id: expect.anything() });
    });
    it('Should throw error (not implemented)', async () => {
        await expect(repository.getAvailable({} as any)).rejects.toThrow('Method not implemented.');
    });
    it('Should build searchParams and return PermissionModelView[]', async () => {
        const params = {
            roleName: 'Admin',
            module: 'users',
            permission: 'read'
        };
        const permissions = [
            { id: 1, name: 'users:read', role: { name: 'Admin' }, roleId: 10 }
        ];
        const roles = [{ id: 10, name: 'Admin' }];

        managerMock.findBy.mockResolvedValue(permissions);
        roleRepoMock.findBy.mockResolvedValue(roles);

        const result = await repository.getCanSee(params as any);

        expect(managerMock.findBy).toHaveBeenCalledWith(expect.objectContaining({
            role: { name: expect.any(Object) },
            name: expect.any(Object)
        }));
        expect(result[0]).toEqual(expect.objectContaining({
            id: 1,
            name: 'users:read',
            role: 'Admin'
        }));
    });
    it('Should handle empty params and return PermissionModelView[]', async () => {
        const permissions = [
            { id: 1, name: 'users:read', role: { name: 'Admin' }, roleId: 10 }
        ];
        const roles = [{ id: 10, name: 'Admin' }];

        managerMock.findBy.mockResolvedValue(permissions);
        roleRepoMock.findBy.mockResolvedValue(roles);
        (AppUtil.verifyEmpty as jest.Mock).mockImplementation((_) => true)

        const result = await repository.getCanSee({} as any);

        expect(managerMock.findBy).toHaveBeenCalledWith({});
        expect(result[0]).toEqual(expect.objectContaining({
            name: 'users:read',
            role: 'Admin'
        }));
    });
    it('Should handle empty permission and not empty module param and return PermissionModelView[]', async () => {
        const params = {
            roleName: 'Customer',
            module: 'persons'
        };
        const permissions = [
            { id: 4, name: 'persons:edit', role: { name: 'Customer' }, roleId: 10 }
        ];
        const roles = [{ id: 10, name: 'Customer' }];

        managerMock.findBy.mockResolvedValue(permissions);
        roleRepoMock.findBy.mockResolvedValue(roles);
        (AppUtil.verifyEmpty as jest.Mock).mockImplementation((param1) => {
            return param1 !== undefined;
        })

        const result = await repository.getCanSee(params as any);

        expect(managerMock.findBy).toHaveBeenCalledWith(expect.objectContaining({
            name: expect.any(Object)
        }));
        expect(result[0]).toEqual(expect.objectContaining({
            name: 'persons:edit',
            role: 'Customer'
        }));
    });
    it('Should handle not empty permission and empty module param and return PermissionModelView[]', async () => {
        const params = {
            roleName: 'Salesman',
            permission: 'create'
        };
        const permissions = [
            { id: 4, name: 'sales:create', role: { name: 'Salesman' }, roleId: 10 }
        ];
        const roles = [{ id: 10, name: 'Salesman' }];

        managerMock.findBy.mockResolvedValue(permissions);
        roleRepoMock.findBy.mockResolvedValue(roles);
        (AppUtil.verifyEmpty as jest.Mock).mockImplementation((param1) => {
            return param1 !== undefined;
        })

        const result = await repository.getCanSee(params as any);

        expect(managerMock.findBy).toHaveBeenCalledWith(expect.objectContaining({
            name: expect.any(Object)
        }));
        expect(result[0]).toEqual(expect.objectContaining({
            name: 'sales:create',
            role: 'Salesman'
        }));
    });
    it('Should return empty array', async () => {
        const result = await repository.getIdValueMany([]);
        expect(result).toEqual([]);
    });
});