import { UserRepository } from './user.repository';
import { AppUtil } from '@Application/core/utils/app.util';
import { RoleEntity } from '../entities/role.entity';
import { PersonEntity } from '../entities/person.entity';
import { PermissionEntity } from '../entities/permission.entity';
import { UserCanSeeContext } from '../strategy-context/user.context';

jest.mock('@Application/core/utils/app.util');
jest.mock('../strategy-context/user.context');

describe('UserRepository Unit Test', () => {
    let repository: UserRepository;
    let dataSourceMock: any;
    let mapperMock: any;
    let roleRepoMock: any;
    let personRepoMock: any;
    let permissionRepoMock: any;
    let managerMock: any;

    beforeEach(() => {
        roleRepoMock = { findBy: jest.fn() };
        personRepoMock = { findBy: jest.fn() };
        permissionRepoMock = { findBy: jest.fn() };
        managerMock = {
            findOneBy: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue({
                leftJoin: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                andWhere: jest.fn().mockReturnThis(),
                getMany: jest.fn()
            })
        };
        dataSourceMock = {
            getRepository: jest.fn((entity) => {
                if (entity === RoleEntity) return roleRepoMock;
                if (entity === PersonEntity) return personRepoMock;
                if (entity === PermissionEntity) return permissionRepoMock;
                return null;
            }),
            manager: managerMock
        };
        mapperMock = {
            fromEntityToDomain: jest.fn((entity) => ({ ...entity })),
            fromDomainToMv: jest.fn((model, opts) => ({ ...model, ...opts }))
        };

        (AppUtil.extractIds as jest.Mock).mockImplementation((arr, field) => {
            if (!arr) return [];
            if (field) return arr.map(e => e[field]);
            return arr.map(e => e.id);
        });
        (AppUtil.verifyEmpty as jest.Mock).mockImplementation((val) => val == null);

        repository = new UserRepository(dataSourceMock, mapperMock);
        repository.manager = managerMock;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should find user by email and return domain model', async () => {
        const userEntity = { id: 1, email: 'test@mail.com' };
        managerMock.findOneBy.mockResolvedValue(userEntity);

        const result = await repository.findByEmail('test@mail.com');

        expect(managerMock.findOneBy).toHaveBeenCalledWith({ email: 'test@mail.com' });
        expect(mapperMock.fromEntityToDomain).toHaveBeenCalledWith(userEntity);
        expect(result).toEqual(userEntity);
    });

    it('Should return null if user not found by email', async () => {
        managerMock.findOneBy.mockResolvedValue(null);

        const result = await repository.findByEmail('notfound@mail.com');

        expect(result).toBeNull();
    });

    it('Should get available users as IdValue array', async () => {
        const params = { query: 'mail' };
        const users = [
            { id: 1, email: 'mail1@mail.com' },
            { id: 2, email: 'mail2@mail.com' }
        ];
        managerMock.createQueryBuilder().getMany.mockResolvedValue(users);

        const result = await repository.getAvailable(params as any);

        expect(managerMock.createQueryBuilder).toHaveBeenCalledWith('u');
        expect(result).toEqual([
            { id: 1, value: 'mail1@mail.com' },
            { id: 2, value: 'mail2@mail.com' }
        ]);
    });

    it('Should get can see users as UserModelView[]', async () => {
        const params = { role: 'admin' };
        const data = [
            { id: 1, email: 'a@mail.com' },
            { id: 2, email: 'b@mail.com' }
        ];
        (UserCanSeeContext as any).mockReturnValue({
            getData: jest.fn().mockResolvedValue(data)
        });
        jest.spyOn(repository, 'generateModelView').mockResolvedValue([
            { id: 1, email: 'a@mail.com', name: 'A', state: 'active', role: 'Admin', permissions: ['perm1'] },
            { id: 2, email: 'b@mail.com', name: 'B', state: 'active', role: 'User', permissions: ['perm2'] }
        ]);

        const result = await repository.getCanSee(params as any);

        expect(UserCanSeeContext).toHaveBeenCalledWith('admin');
        expect(result[0]).toEqual(expect.objectContaining({ email: 'a@mail.com', role: 'Admin' }));
        expect(result[1]).toEqual(expect.objectContaining({ email: 'b@mail.com', role: 'User' }));
    });

    it('Should return empty array from getIdValueMany', async () => {
        const result = await repository.getIdValueMany([]);
        expect(result).toEqual([]);
    });

    it('Should generate model view for users', async () => {
        const models = [
            { id: 1, email: 'a@mail.com' },
            { id: 2, email: 'b@mail.com' }
        ];
        const roles = [
            { id: 10, name: 'Admin' },
            { id: 20, name: 'User' }
        ];
        const persons = [
            { userId: 1, names: 'A', surnames: 'Alpha', roleId: 10 },
            { userId: 2, names: 'B', surnames: 'Beta', roleId: 20 }
        ];
        const permissions = [
            { id: 100, name: 'perm1', roleId: 10 },
            { id: 200, name: 'perm2', roleId: 20 }
        ];

        roleRepoMock.findBy.mockResolvedValue(roles);
        permissionRepoMock.findBy.mockResolvedValue(permissions);
        personRepoMock.findBy.mockResolvedValue(persons);

        const result = await repository.generateModelView(models as any);
        const callArgsRoleRepoMock = roleRepoMock.findBy.mock.calls[0][0];
        const callArgsPermissionRepoMock = permissionRepoMock.findBy.mock.calls[0][0];
        const callArgsPersonRepoMock = personRepoMock.findBy.mock.calls[0][0];

        expect(callArgsRoleRepoMock.persons).toMatchObject({
            userId: {
                _type: 'in',
                _value: [1, 2]
            }
        });
        expect(callArgsPermissionRepoMock.role).toMatchObject({
            id: { _type: 'in', _value: [10, 20] }
        });
        expect(callArgsPersonRepoMock.userId).toMatchObject({
            _type: 'in', _value: [1, 2]
        });
        expect(result[0]).toEqual(expect.objectContaining({
            id: 1,
            name: 'A Alpha',
            role: 'Admin',
            permissions: ['perm1']
        }));
        expect(result[1]).toEqual(expect.objectContaining({
            id: 2,
            name: 'B Beta',
            role: 'User',
            permissions: ['perm2']
        }));
    });

    it('Should handle missing person or role gracefully in generateModelView', async () => {
        const models = [
            { id: 1, email: 'a@mail.com' }
        ];
        roleRepoMock.findBy.mockResolvedValue([]);
        permissionRepoMock.findBy.mockResolvedValue([]);
        personRepoMock.findBy.mockResolvedValue([]);

        const result = await repository.generateModelView(models as any);

        expect(result[0]).toEqual(expect.objectContaining({
            id: 1,
            name: " ",
            role: "",
            permissions: [],
            email: "a@mail.com"
        }));
    });
});