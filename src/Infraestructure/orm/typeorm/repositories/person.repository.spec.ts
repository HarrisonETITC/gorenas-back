import { PersonRepository } from './person.repository';
import { AppUtil } from '@Application/core/utils/app.util';
import { UserEntity } from '../entities/user.entity';
import { RoleEntity } from '../entities/role.entity';
import { BranchEntity } from '../entities/branch.entity';
import { EmployeeEntity } from '../entities/employee.entity';
import { PersonCanSeeContext } from '../strategy-context/person.context';

jest.mock('@Application/core/utils/app.util');
jest.mock('../strategy-context/person.context');

describe('PersonRepository Unit Test', () => {
    let repository: PersonRepository;
    let dataSourceMock: any;
    let mapperMock: any;
    let userRepoMock: any;
    let roleRepoMock: any;
    let branchRepoMock: any;
    let employeeRepoMock: any;
    let managerMock: any;

    beforeEach(() => {
        userRepoMock = { find: jest.fn() };
        roleRepoMock = { find: jest.fn() };
        branchRepoMock = {
            createQueryBuilder: jest.fn().mockReturnValue({
                innerJoin: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                getMany: jest.fn()
            })
        };
        employeeRepoMock = { findBy: jest.fn() };
        managerMock = {
            createQueryBuilder: jest.fn().mockReturnValue({
                leftJoin: jest.fn().mockReturnThis(),
                innerJoin: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                andWhere: jest.fn().mockReturnThis(),
                getMany: jest.fn()
            }),
            findOneBy: jest.fn()
        };
        dataSourceMock = {
            getRepository: jest.fn((entity) => {
                if (entity === UserEntity) return userRepoMock;
                if (entity === RoleEntity) return roleRepoMock;
                if (entity === BranchEntity) return branchRepoMock;
                if (entity === EmployeeEntity) return employeeRepoMock;
                return null;
            }),
            manager: managerMock
        };
        mapperMock = {
            fromDomainToMv: jest.fn((model, opts) => ({
                ...model,
                ...opts
            }))
        };

        function mapToIdValue(d: any, idField: string, valueFields: string[]) {
            return {
                id: d[idField],
                value: valueFields.map((f: any) => d[f]).join(' ')
            };
        }
        (AppUtil.transformToIdValue as jest.Mock).mockImplementation((data, idField, valueFields) =>
            data.map((d: any) => mapToIdValue(d, idField, valueFields))
        );
        (AppUtil.extractIds as jest.Mock).mockImplementation((arr, field) => {
            if (!arr) return [];
            if (field) return arr.map(e => e[field]);
            return arr.map(e => e.id);
        });
        (AppUtil.verifyEmpty as jest.Mock).mockImplementation((val) => val == null);

        repository = new PersonRepository(dataSourceMock, mapperMock);
        repository.manager = managerMock;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should get available persons as IdValue array', async () => {
        const params = { query: 'John' };
        const persons = [
            { id: 1, names: 'John', surnames: 'Doe' },
            { id: 2, names: 'Jane', surnames: 'Smith' }
        ];
        managerMock.createQueryBuilder().getMany.mockResolvedValue(persons);

        const result = await repository.getAvailable(params as any);

        expect(managerMock.createQueryBuilder).toHaveBeenCalledWith('p');
        expect(result).toEqual([
            { id: 1, value: 'John Doe' },
            { id: 2, value: 'Jane Smith' }
        ]);
    });

    it('Should get can see persons as PersonModelView[]', async () => {
        const params = { role: 'admin' };
        const basic = [
            { id: 1, userId: 10, roleId: 100 },
            { id: 2, userId: 20, roleId: 200 }
        ];
        const users = [
            { id: 10, email: 'john@doe.com' },
            { id: 20, email: 'jane@smith.com' }
        ];
        const roles = [
            { id: 100, name: 'Admin' },
            { id: 200, name: 'User' }
        ];
        const branches = [
            { id: 1, name: 'Branch 1' }
        ];
        const employees = [
            { personId: 1, branchId: 1 }
        ];

        (PersonCanSeeContext as any).mockReturnValue({
            getData: jest.fn().mockResolvedValue(basic)
        });
        userRepoMock.find.mockResolvedValue(users);
        roleRepoMock.find.mockResolvedValue(roles);
        branchRepoMock.createQueryBuilder().getMany.mockResolvedValue(branches);
        employeeRepoMock.findBy.mockResolvedValue(employees);

        const result = await repository.getCanSee(params as any);

        expect(result[0]).toEqual(expect.objectContaining({
            id: 1,
            email: 'john@doe.com',
            branch: 'Branch 1',
            role: 'Admin'
        }));
        expect(result[1]).toEqual(expect.objectContaining({
            id: 2,
            email: 'jane@smith.com',
            branch: '',
            role: 'User'
        }));
    });

    it('Should return empty array from getIdValueMany', async () => {
        const result = await repository.getIdValueMany([]);
        expect(result).toEqual([]);
    });

    it('Should get person by userId', async () => {
        const person = { id: 1, userId: 10, roleId: 100 };
        managerMock.findOneBy.mockResolvedValue(person);
        mapperMock.fromDomainToMv.mockImplementation((model, opts) => ({ ...model, ...opts }));

        // generateModelView is called inside getByUserId
        jest.spyOn(repository, 'generateModelView').mockResolvedValue([{
            ...person,
            email: 'john@doe.com',
            branch: 'Branch 1',
            role: 'Admin',
            names: 'John',
            surnames: 'Doe',
            identification: '123456'
        }]);

        const result = await repository.getByUserId(10);

        expect(managerMock.findOneBy).toHaveBeenCalledWith({ userId: 10 });
        expect(result).toEqual(expect.objectContaining({
            id: 1,
            userId: 10,
            branch: 'Branch 1',
            role: 'Admin'
        }));
    });

    it('Should return null from getByUserId if not found', async () => {
        managerMock.findOneBy.mockResolvedValue(null);

        const result = await repository.getByUserId(99);

        expect(result).toBeNull();
    });

    it('Should generate model view for persons', async () => {
        const models = [
            { id: 1, userId: 10, roleId: 100 },
            { id: 2, userId: 20, roleId: 200 }
        ];
        const users = [
            { id: 10, email: 'john@doe.com' },
            { id: 20, email: 'jane@smith.com' }
        ];
        const roles = [
            { id: 100, name: 'Admin' },
            { id: 200, name: 'User' }
        ];
        const branches = [
            { id: 1, name: 'Branch 1' }
        ];
        const employees = [
            { personId: 1, branchId: 1 }
        ];

        userRepoMock.find.mockResolvedValue(users);
        roleRepoMock.find.mockResolvedValue(roles);
        branchRepoMock.createQueryBuilder().getMany.mockResolvedValue(branches);
        employeeRepoMock.findBy.mockResolvedValue(employees);

        const result = await repository.generateModelView(models as any);

        expect(result[0]).toEqual(expect.objectContaining({
            id: 1,
            email: 'john@doe.com',
            branch: 'Branch 1',
            role: 'Admin'
        }));
        expect(result[1]).toEqual(expect.objectContaining({
            id: 2,
            email: 'jane@smith.com',
            branch: '',
            role: 'User'
        }));
    });
});