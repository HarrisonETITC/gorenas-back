import { EmployeeRepository } from './employee.repository';
import { In } from 'typeorm';
import { PersonEntity } from '../entities/person.entity';
import { UserEntity } from '../entities/user.entity';
import { BranchEntity } from '../entities/branch.entity';
import { EmployeeAvailableContext, EmployeeCanSeeContext } from '../strategy-context/employee.context';
import { AppUtil } from '@Application/core/utils/app.util';

jest.mock('../strategy-context/employee.context');
jest.mock('@Application/core/utils/app.util');

describe('EmployeeRepository', () => {
    let repository: EmployeeRepository;
    let dataSourceMock: any;
    let mapperMock: any;
    let personRepoMock: any;
    let userRepoMock: any;
    let branchRepoMock: any;
    let managerMock: any;

    beforeEach(() => {
        personRepoMock = { findBy: jest.fn() };
        userRepoMock = { findBy: jest.fn() };
        branchRepoMock = { findBy: jest.fn() };
        managerMock = {
            createQueryBuilder: jest.fn().mockReturnValue({
                innerJoin: jest.fn().mockReturnThis(),
                select: jest.fn().mockReturnThis(),
                addSelect: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                andWhere: jest.fn().mockReturnThis(),
                groupBy: jest.fn().mockReturnThis(),
                orderBy: jest.fn().mockReturnThis(),
                addOrderBy: jest.fn().mockReturnThis(),
                getRawMany: jest.fn().mockResolvedValue([
                    { id: 1, branchId: 2, personId: 3 }
                ])
            })
        };
        dataSourceMock = {
            getRepository: jest.fn((entity) => {
                if (entity === PersonEntity) return personRepoMock;
                if (entity === UserEntity) return userRepoMock;
                if (entity === BranchEntity) return branchRepoMock;
                return null;
            }),
            manager: managerMock
        };
        mapperMock = {
            fromDomainToMv: jest.fn((e, opts) => ({
                ...e,
                ...opts
            }))
        };

        (AppUtil.extractIds as jest.Mock).mockImplementation((arr, field) => {
            if (!arr) return [];
            if (field) return arr.map(e => e[field]);
            return arr.map(e => e.id);
        });

        repository = new EmployeeRepository(dataSourceMock, mapperMock);
        repository.manager = managerMock;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get available employees as IdValue array', async () => {
        const employees = [
            { id: 1, personId: 10 },
            { id: 2, personId: 20 }
        ];
        const persons = [
            { id: 10, names: 'John', surnames: 'Doe' },
            { id: 20, names: 'Jane', surnames: 'Smith' }
        ];
        (EmployeeAvailableContext as jest.Mock).mockReturnValue({
            getData: jest.fn().mockResolvedValue(employees)
        });
        personRepoMock.findBy.mockResolvedValue(persons);

        const params = { role: 'admin' };
        const result = await repository.getAvailable(params as any);

        expect(result).toEqual([
            { id: 1, value: 'John Doe' },
            { id: 2, value: 'Jane Smith' }
        ]);
        expect(EmployeeAvailableContext).toHaveBeenCalledWith('admin');
        expect(personRepoMock.findBy).toHaveBeenCalledWith({ id: In([10, 20]) });
    });

    it('should get can see employees as EmployeeModelView[]', async () => {
        const employees = [
            { id: 1, personId: 10, branchId: 2 }
        ];
        const persons = [
            { id: 10, names: 'John', surnames: 'Doe', userId: 100 }
        ];
        const users = [
            { id: 100, email: 'john@doe.com' }
        ];
        const branches = [
            { id: 2, name: 'Main Branch' }
        ];
        const sales = [
            { id: 1, branchId: 2, personId: 3 }
        ];

        (EmployeeCanSeeContext as jest.Mock).mockReturnValue({
            getData: jest.fn().mockResolvedValue(employees)
        });
        managerMock.createQueryBuilder().getRawMany.mockResolvedValue(sales);
        personRepoMock.findBy.mockResolvedValue(persons);
        userRepoMock.findBy.mockResolvedValue(users);
        branchRepoMock.findBy.mockResolvedValue(branches);

        const params = { role: 'admin' };
        const result = await repository.getCanSee(params as any);

        expect(result[0]).toEqual(
            expect.objectContaining({
                id: 1,
                branch: 'Main Branch',
                name: 'John Doe',
                sales: expect.any(Number),
                salesAmmounth: expect.any(Number),
                user: 'john@doe.com'
            })
        );
        expect(EmployeeCanSeeContext).toHaveBeenCalledWith('admin');
        expect(personRepoMock.findBy).toHaveBeenCalled();
        expect(userRepoMock.findBy).toHaveBeenCalled();
        expect(branchRepoMock.findBy).toHaveBeenCalled();
    });

    it('should throw error for getIdValueMany', async () => {
        await expect(repository.getIdValueMany([])).rejects.toThrow('Method not implemented.');
    });
});