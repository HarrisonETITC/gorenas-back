import { RestaurantRepository } from './restaurant.repository';
import { AppUtil } from '@Application/core/utils/app.util';

jest.mock('@Application/core/utils/app.util');

describe('RestaurantRepository Unit Test', () => {
    let repository: RestaurantRepository;
    let dataSourceMock: any;
    let mapperMock: any;
    let managerMock: any;

    beforeEach(() => {
        managerMock = {
            find: jest.fn(),
            findOneBy: jest.fn()
        };
        dataSourceMock = {
            getRepository: jest.fn().mockReturnValue(managerMock),
            manager: managerMock
        };
        mapperMock = {
            fromEntityToDomain: jest.fn((entity) => ({ ...entity })),
            fromDomainToMv: jest.fn((model, opts) => ({ ...model, ...opts }))
        };

        function mapValueFields(d: any, valueFields: any[]) {
            return valueFields.map((f: any) => d[f]).join(' ');
        }
        (AppUtil.transformToIdValue as jest.Mock).mockImplementation((data, idField, valueFields) =>
            data.map((d: any) => ({
                id: d[idField],
                value: mapValueFields(d, valueFields)
            }))
        );
        (AppUtil.extractIds as jest.Mock).mockImplementation((arr, field) => {
            if (!arr) return [];
            if (field) return arr.map((e: any) => e[field]);
            return arr.map((e: any) => e.id);
        });
        (AppUtil.verifyEmpty as jest.Mock).mockImplementation((val) => val == null);

        repository = new RestaurantRepository(dataSourceMock, mapperMock);
        repository.manager = managerMock;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should throw error for getAvailable', async () => {
        try {
            await repository.getAvailable({} as any)
        } catch (error) {
            expect(error.message).toBe("Method not implemented.");
        }
    });

    it('Should throw error for getCanSee', async () => {
        try {
            await repository.getCanSee({} as any)
        } catch (error) {
            expect(error.message).toBe("Method not implemented.");
        }
    });

    it('Should throw error for getIdValueMany', async () => {
        try {
            await repository.getIdValueMany({} as any)
        } catch (error) {
            expect(error.message).toBe("Method not implemented.");
        }
    });
});