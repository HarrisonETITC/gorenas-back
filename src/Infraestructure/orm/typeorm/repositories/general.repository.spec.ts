import { GeneralRepository } from "./general.repository"

describe('GeneralRepository Unit Test', () => {
    const mockManager = {
        find: jest.fn(),
        findOneBy: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        delete: jest.fn()

    }
    const mockDataSource = {
        getRepository: jest.fn().mockReturnValue(mockManager)
    }
    const mockMapper = {
        fromEntityToDomain: jest.fn(),
        fromDomainToEntity: jest.fn(),
        fromDomainToMv: jest.fn()
    }

    const repository = new GeneralRepository(mockDataSource as any, 'TestEntity', mockMapper as any);

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('Should return empty array when no data is found', async () => {
        mockManager.find.mockResolvedValue([]);
        const result = await repository.getAll();

        expect(result).toEqual([]);
    });
    it('Should return mapped domain models when data is found', async () => {
        const mockData = [{ id: 1, name: 'Test' }];
        mockManager.find.mockResolvedValue(mockData);
        mockMapper.fromEntityToDomain.mockImplementation((entity) => entity);

        const result = await repository.getAll();

        expect(result).toEqual(mockData);
        expect(mockMapper.fromEntityToDomain).toHaveBeenCalledWith(mockData[0]);
    });
    it('Should return null when no entity is found by ID', async () => {
        mockManager.findOneBy.mockResolvedValue(null);

        const result = await repository.getById(1);
        expect(mockManager.findOneBy).toHaveBeenCalledWith({ id: 1 });
        expect(result).toBeNull();
    });
    it('Should return mapped model view when entity is found by ID', async () => {
        const mockEntity = { id: 3, name: 'TestEntity' };
        const mockModelView = { id: 3, fullname: 'TestEntityMV' };

        mockManager.findOneBy.mockResolvedValue(mockEntity);
        mockMapper.fromEntityToDomain.mockReturnValue(mockEntity);
        mockMapper.fromDomainToMv.mockReturnValue(mockModelView);

        const result = await repository.getById(3);
        expect(mockManager.findOneBy).toHaveBeenCalledWith({ id: 3 });
        expect(mockMapper.fromDomainToMv).toHaveBeenCalledWith(mockEntity);
        expect(result).toEqual(mockModelView);
    });
    it('Should create and return mapped domain model', async () => {
        const mockEntity = { id: 1, name: 'TestEntity' };
        const mockDomainModel = { id: 1, name: 'TestModel' };
        mockMapper.fromDomainToEntity.mockReturnValue(mockEntity);
        mockManager.create.mockReturnValue(mockEntity);
        mockManager.save.mockReturnValue(mockEntity);
        mockMapper.fromEntityToDomain.mockReturnValue(mockDomainModel);

        const result = await repository.create(mockDomainModel);
        expect(result).toEqual(mockDomainModel);
        expect(mockMapper.fromDomainToEntity).toHaveBeenCalledWith(mockDomainModel);
        expect(mockManager.create).toHaveBeenCalledWith(mockEntity);
        expect(mockManager.save).toHaveBeenCalledWith(mockEntity);
        expect(mockMapper.fromEntityToDomain).toHaveBeenCalledWith(mockEntity);
    });
    it('Should update and return mapped domain model', async () => {
        const mockEntity = { id: 1, name: 'TestEntity' };
        const mockDomainModel = { id: 1, name: 'TestModel' };
        mockMapper.fromDomainToEntity.mockReturnValue(mockEntity);
        mockManager.save.mockReturnValue(mockEntity);
        mockMapper.fromEntityToDomain.mockReturnValue(mockDomainModel);

        const result = await repository.modify(1, mockDomainModel);
        expect(result).toEqual(mockDomainModel);
        expect(mockMapper.fromDomainToEntity).toHaveBeenCalledWith(mockDomainModel);
        expect(mockManager.save).toHaveBeenCalledWith(mockEntity);
        expect(mockMapper.fromEntityToDomain).toHaveBeenCalledWith(mockEntity);
    });
    it('Should delete entity by ID', async () => {
        await repository.delete(9);
        expect(mockManager.delete).toHaveBeenCalledWith({ id: 9 });
    });
    it('Should return generated model view', async () => {
        const mockDomainModel = { id: 1, name: 'TestModel' };
        const mockModelView = { id: 1, fullname: 'TestModelMV' };
        mockMapper.fromDomainToMv.mockReturnValue(mockModelView);

        const result = await repository.generateModelView([mockDomainModel]);
        expect(result).toEqual([mockModelView]);
        expect(mockMapper.fromDomainToMv).toHaveBeenCalledWith(mockDomainModel);
        expect(mockMapper.fromDomainToMv).toHaveBeenCalledTimes(1);
    })
})