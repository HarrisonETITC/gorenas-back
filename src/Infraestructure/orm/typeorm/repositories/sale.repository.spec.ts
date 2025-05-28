import { SaleRepository } from './sale.repository';
import { AppUtil } from '@Application/core/utils/app.util';
import { SaleCanSeeContext } from '../strategy-context/sale.context';
import { EmployeeEntity } from '../entities/employee.entity';
import { PersonEntity } from '../entities/person.entity';
import { BranchEntity } from '../entities/branch.entity';

jest.mock('@Application/core/utils/app.util');
jest.mock('../strategy-context/sale.context');

describe('SaleRepository Unit Test', () => {
    let repository: SaleRepository;
    let dataSourceMock: any;
    let mapperMock: any;
    let employeeRepoMock: any;
    let personRepoMock: any;
    let branchRepoMock: any;
    let managerMock: any;

    beforeEach(() => {
        employeeRepoMock = { findBy: jest.fn() };
        personRepoMock = { findBy: jest.fn() };
        branchRepoMock = { findBy: jest.fn() };
        managerMock = {
            find: jest.fn(),
            findOneBy: jest.fn()
        };
        dataSourceMock = {
            getRepository: jest.fn((entity) => {
                if (entity === EmployeeEntity) return employeeRepoMock;
                if (entity === PersonEntity) return personRepoMock;
                if (entity === BranchEntity) return branchRepoMock;
                return managerMock;
            }),
            manager: managerMock
        };
        mapperMock = {
            fromDomainToMv: jest.fn((model, opts) => ({ ...model, ...opts }))
        };

        (AppUtil.extractIds as jest.Mock).mockImplementation((arr, field) => {
            if (!arr) return [];
            if (field) return arr.map(e => e[field]);
            return arr.map(e => e.id);
        });

        repository = new SaleRepository(dataSourceMock, mapperMock);
        repository.manager = managerMock;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should throw error for getAvailable', async () => {
        await expect(repository.getAvailable({} as any)).rejects.toThrow('Method not implemented.');
    });

    it('Should get can see sales as SaleModelView[]', async () => {
        const params = { role: 'admin' };
        const basicData = [
            { id: 1, employeeId: 10, amount: 100 },
            { id: 2, employeeId: 20, amount: 200 }
        ];
        const employees = [
            { id: 10, personId: 100, branchId: 1000 },
            { id: 20, personId: 200, branchId: 2000 }
        ];
        const persons = [
            { id: 100, names: 'John', surnames: 'Doe' },
            { id: 200, names: 'Jane', surnames: 'Smith' }
        ];
        const branches = [
            { id: 1000, name: 'Branch A' },
            { id: 2000, name: 'Branch B' }
        ];

        (SaleCanSeeContext as any).mockReturnValue({
            getData: jest.fn().mockResolvedValue(basicData)
        });
        employeeRepoMock.findBy.mockResolvedValue(employees);
        personRepoMock.findBy.mockResolvedValue(persons);
        branchRepoMock.findBy.mockResolvedValue(branches);

        const result = await repository.getCanSee(params as any);
        const callArgsPersonRepoMock = personRepoMock.findBy.mock.calls[0][0];
        const callArgsBranchRepoMock = branchRepoMock.findBy.mock.calls[0][0];

        expect(employeeRepoMock.findBy).toHaveBeenCalledWith({ id: expect.any(Object) });
        expect(callArgsPersonRepoMock.id).toMatchObject({
            _type: 'in',
            _value: [100, 200]
        });
        expect(callArgsBranchRepoMock.id).toMatchObject({
            _type: 'in',
            _value: [1000, 2000]
        });
        expect(mapperMock.fromDomainToMv).toHaveBeenCalledTimes(2);
        expect(result[0]).toEqual(expect.objectContaining({
            id: 1,
            branch: 'Branch A',
            employee: 'John Doe',
            amount: 100
        }));
        expect(result[1]).toEqual(expect.objectContaining({
            id: 2,
            branch: 'Branch B',
            employee: 'Jane Smith',
            amount: 200
        }));
    });

    it('Should handle missing employee, person, or branch gracefully', async () => {
        const params = { role: 'admin' };
        const basicData = [
            { id: 1, employeeId: 10, amount: 100 }
        ];
        // No employees, persons, or branches found
        employeeRepoMock.findBy.mockResolvedValue([]);
        personRepoMock.findBy.mockResolvedValue([]);
        branchRepoMock.findBy.mockResolvedValue([]);
        mapperMock.fromDomainToMv.mockImplementation((model: any, opts: any) => ({
            branch: '',
            employee: '',
            ...model
        }));

        (SaleCanSeeContext as any).mockReturnValue({
            getData: jest.fn().mockResolvedValue(basicData)
        });

        const result = await repository.getCanSee(params as any);

        expect(result[0]).toEqual(expect.objectContaining({
            id: 1,
            branch: '',
            employee: '',
            amount: 100
        }));
    });

    it('Should return empty array from getIdValueMany', async () => {
        const result = await repository.getIdValueMany([]);
        expect(result).toEqual([]);
    });
});