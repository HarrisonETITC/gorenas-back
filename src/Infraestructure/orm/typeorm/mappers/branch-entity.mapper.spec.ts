import { BranchEntityMapper } from './branch-entity.mapper';
import { BranchEntity } from '../entities/branch.entity';
import { StateModel } from '@Domain/models/general/state.model';
import { BranchModel } from '@Domain/models/branch.model';

describe('BranchEntityMapper', () => {
	let mapper: BranchEntityMapper;

	beforeEach(() => {
		mapper = new BranchEntityMapper();
	});

	describe('fromEntityToDomain', () => {
		it('maps all fields from entity to domain (happy path)', () => {
			const entity: BranchEntity = {
				id: 1,
				state: StateModel.STATE_ACTIVE,
				name: 'Sucursal Centro',
				address: 'Calle 123',
				earnings: 999.5,
				created: new Date('2025-01-01'),
				modified: new Date('2025-02-01'),
			};

			const domain = mapper.fromEntityToDomain(entity);
			expect(domain).toEqual({
				id: 1,
				state: StateModel.STATE_ACTIVE,
				name: 'Sucursal Centro',
				address: 'Calle 123',
				earnings: 999.5,
				created: new Date('2025-01-01'),
				modified: new Date('2025-02-01'),
			});
		});

		it('coalesces undefined fields to null', () => {
			const entity = {} as BranchEntity;
			const domain = mapper.fromEntityToDomain(entity);
			expect(domain).toEqual({
				id: null,
				state: null,
				name: null,
				address: null,
				earnings: null,
				created: null,
				modified: null,
			});
		});
	});

	describe('fromDomainToEntity', () => {
		it('maps all fields from domain to entity (happy path)', () => {
			const domain: BranchModel = {
				id: 2,
				state: StateModel.STATE_INACTIVE,
				name: 'Sucursal Norte',
				address: 'Avenida 45',
				earnings: 1200,
				created: new Date('2025-03-03'),
				modified: new Date('2025-03-10'),
			};

			const entity = mapper.fromDomainToEntity(domain);
			expect(entity).toEqual({
				id: 2,
				state: StateModel.STATE_INACTIVE,
				name: 'Sucursal Norte',
				address: 'Avenida 45',
				earnings: 1200,
				created: new Date('2025-03-03'),
				modified: new Date('2025-03-10'),
			});
		});

		it('coalesces undefined fields to null when mapping to entity', () => {
			const domain = {} as any;
			const entity = mapper.fromDomainToEntity(domain);
			expect(entity).toEqual({
				id: null,
				state: null,
				name: null,
				address: null,
				earnings: null,
				created: null,
				modified: null,
			});
		});
	});

	describe('fromDomainToMv', () => {
		it('maps fields to model view with restaurantName from extra', () => {
			const domain: BranchModel = {
				id: 3,
				state: StateModel.STATE_ACTIVE,
				name: 'Sucursal Sur',
				address: 'Carrera 7',
				earnings: 321.45,
				created: new Date('2025-04-01'),
                modified: null
			};

			const mv = mapper.fromDomainToMv(domain, { restaurantName: 'Restaurante XYZ' });
			expect(mv).toEqual({
				id: 3,
				name: 'Sucursal Sur',
				address: 'Carrera 7',
				state: StateModel.STATE_ACTIVE,
				earnings: 321.45,
				created: new Date('2025-04-01'),
				restaurantName: 'Restaurante XYZ',
			});
		});

		it('coalesces undefined fields and missing extra to null', () => {
			const domain = {} as any;
			const mv = mapper.fromDomainToMv(domain);
			expect(mv).toEqual({
				id: null,
				name: null,
				address: null,
				state: null,
				earnings: null,
				created: null,
				restaurantName: null,
			});
		});
	});
});

