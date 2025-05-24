import { BranchRepository } from "./branch.repository"

describe('BranchRepository Unit Tests', () => {
    let repository: BranchRepository;
    const managerMock = {
        findOneBy: jest.fn().mockResolvedValue({
            id: 1,
            name: 'Sucursal 1',
            address: 'Calle X'
        }),
        createQueryBuilder: jest.fn().mockReturnValue({
            where: jest.fn().mockReturnThis(),
            getMany: jest.fn().mockResolvedValue([
                { id: 1, name: 'Sucursal 1', address: 'Calle X' },
                { id: 2, name: 'Sucursal 2', address: 'Calle Y' }
            ]),
            select: jest.fn().mockReturnThis(),
            addSelect: jest.fn().mockReturnThis(),
        }),
        find: jest.fn().mockResolvedValue([
            { id: 1, name: 'Sucursal 1', address: 'Calle X' },
            { id: 2, name: 'Sucursal 2', address: 'Calle Y' }
        ])
    };

    const mapperMock = {
        fromEntityToDomain: jest.fn().mockImplementation(entity => entity),
        fromDomainToMv: jest.fn().mockImplementation((domain, opts?: any) => ({
            ...domain,
            restaurantName: opts?.restaurantName ?? 'Mocked'
        }))
    };

    const restaurantRepoMock = {
        findOneBy: jest.fn().mockResolvedValue({ id: 1, name: 'Restaurante Test' })
    };

    const dataSourceMock = {
        getRepository: jest.fn((entity) => {
            if (entity && entity.name === 'RestaurantEntity') {
                return restaurantRepoMock;
            }
            return managerMock;
        })
    };

    beforeEach(() => {
        jest.clearAllMocks();
        repository = new BranchRepository(dataSourceMock as any, mapperMock as any);
    });

    it('Should return model view by Branch ID', async () => {
        const result = await repository.getById(1);
        expect(result).toEqual(
            expect.objectContaining({
                id: 1,
                name: 'Sucursal 1',
                restaurantName: 'Mocked'
            })
        )
    });

    it('Should return null when Branch ID not found', async () => {
        managerMock.findOneBy.mockResolvedValueOnce(null);

        const result = await repository.getById(2);
        expect(result).toBeNull();
    });

    it('Should get available branches as IdValue array', async () => {
        const params = { query: 'Sucursal' };
        const result = await repository.getAvailable(params as any);
        expect(result).toEqual([
            { id: 1, value: 'Sucursal 1-Calle X' },
            { id: 2, value: 'Sucursal 2-Calle Y' }
        ]);
        expect(managerMock.createQueryBuilder).toHaveBeenCalledWith("b");
    });

    it('Should get can see branches as BranchModelView[]', async () => {
        const branchData = [
            { id: 1, name: 'Sucursal 1', address: 'Calle X', restaurantId: 1 }
        ];
        jest.spyOn(require('../strategy-context/branch.context'), 'BranchCanSeeContext')
            .mockReturnValue({
                getData: async () => branchData
            });

        const params = { role: 'admin', restaurantId: 1 };
        const result = await repository.getCanSee(params as any);

        expect(result[0]).toEqual(
            expect.objectContaining({
                id: 1,
                name: 'Sucursal 1',
                address: 'Calle X',
                restaurantName: 'Restaurante Test'
            })
        );
    });

    it('Should get empty array from getIdValueMany without ids', async () => {
        const result = await repository.getIdValueMany([]);

        expect(result).toEqual([]);
    });

    it('Should get IdValue array from getIdValueMany without query', async () => {
        const ids = [{ id: 1 }, { id: 2 }];
        const result = await repository.getIdValueMany(ids as any);
        expect(result).toEqual([
            { id: 1, value: 'Sucursal 1-Calle X' },
            { id: 2, value: 'Sucursal 2-Calle Y' }
        ]);
        expect(managerMock.find).toHaveBeenCalled();
    });

    it('Should get IdValue array from getIdValueMany with query', async () => {
        const ids = [{ id: 1 }, { id: 2 }];
        const queryMock = {
            select: jest.fn().mockReturnThis(),
            addSelect: jest.fn().mockReturnThis(),
            getMany: jest.fn().mockResolvedValue([
                { id: 1, name: 'Sucursal 1', address: 'Calle X' },
                { id: 2, name: 'Sucursal 2', address: 'Calle Y' }
            ])
        };
        const result = await repository.getIdValueMany(ids as any, queryMock as any);
        expect(result).toEqual([
            { id: 1, value: 'Sucursal 1-Calle X' },
            { id: 2, value: 'Sucursal 2-Calle Y' }
        ]);
        expect(queryMock.getMany).toHaveBeenCalled();
    });

    it('Should process filter and apply conditions', async () => {
        const queryMock = {
            andWhere: jest.fn().mockReturnThis(),
            addOrderBy: jest.fn().mockReturnThis()
        };
        const filter = {
            address: 'Calle',
            name: 'Sucursal',
            earningsLessThan: 1000,
            earningsGreatherThan: 100
        };
        await repository.processFilter(queryMock as any, filter as any);
        expect(queryMock.andWhere).toHaveBeenCalledTimes(4);
        expect(queryMock.addOrderBy).toHaveBeenCalledWith('s.earnings', "DESC");
    });
});
