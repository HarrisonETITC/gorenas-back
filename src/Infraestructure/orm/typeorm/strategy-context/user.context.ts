import { GetDataStrategy } from "@Application/core/strategies/available.strategy";
import { UserEntity } from "../entities/user.entity";
import { RoleModel } from "@Domain/models/role.model";
import { UserRepository } from "../repositories/user.repository";
import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { BranchEntity } from "../entities/branch.entity";
import { UserModelView } from "@Application/model-view/user.mv";

export const UserCanSeeContext = (role: string): GetDataStrategy<UserEntity, UserModelView> => {
    if (RoleModel.ROLE_ADMINISTRATOR == role)
        return new UserAdministratorCanSeeStrategy();
    if (RoleModel.ROLE_PROPIETARY == role)
        return new UserPropietaryCanSeeStrategy();
    if (RoleModel.ROLE_MANAGER == role)
        return new UserManagerCanSeeStrategy();

    return new UserBasicCanSeeStrategy();
}

class UserAdministratorCanSeeStrategy implements GetDataStrategy<UserEntity, UserModelView> {
    async getData(args: BasicSearchParams, repository: UserRepository): Promise<UserEntity[]> {
        return await repository.manager.find();
    }
}

class UserPropietaryCanSeeStrategy implements GetDataStrategy<UserEntity, UserModelView> {
    async getData(args: BasicSearchParams, repository: UserRepository): Promise<UserEntity[]> {
        return await repository.manager.createQueryBuilder("u")
            .innerJoin("u.person", "p")
            .innerJoin("p.role", "r")
            .where("r.name != :excluded", { excluded: RoleModel.ROLE_ADMINISTRATOR })
            .getMany();
    }
}

class UserManagerCanSeeStrategy implements GetDataStrategy<UserEntity, UserModelView> {
    async getData(args: BasicSearchParams, repository: UserRepository): Promise<UserEntity[]> {
        const branch = await repository.source.getRepository(BranchEntity).findOneBy({ employees: { person: { userId: args.userId } } });
        return await repository.manager.findBy({ person: { employee: { branchId: branch.id } } });
    }
}

class UserBasicCanSeeStrategy implements GetDataStrategy<UserEntity, UserModelView> {
    async getData(args: BasicSearchParams, repository: UserRepository): Promise<UserEntity[]> {
        return [await repository.manager.findOneBy({ id: args.userId })];
    }
}

export const UserAvailableContext = (role: string): GetDataStrategy<UserEntity, UserModelView> => {
    return null;
}

class UserAdministratorAvailableStrategy implements GetDataStrategy<UserEntity, UserModelView> {
    async getData(args: BasicSearchParams, repository: UserRepository): Promise<UserEntity[]> {
        return await repository.manager
            .createQueryBuilder('u')
            .leftJoin('u.person', 'p')
            .where('u.email LIKE :email', { email: `%${args.query}%` })
            .andWhere('p.id IS NULL')
            .getMany();
    }
}

class UserPropietaryAvailableStrategy implements GetDataStrategy<UserEntity, UserModelView> {
    async getData(args: BasicSearchParams, repository: UserRepository): Promise<UserEntity[]> {
        return await repository.manager
            .createQueryBuilder('u')
            .leftJoin('u.person', 'p')
            .leftJoin('p.role', 'r')
            .where('u.email LIKE :email', { email: `%${args.query}%` })
            .andWhere('p.id IS NULL')
            .andWhere('r.name != :excluded', { excluded: RoleModel.ROLE_ADMINISTRATOR })
            .getMany();
    }
}

class UserManagerAvailableStrategy implements GetDataStrategy<UserEntity, UserModelView> {
    async getData(args: BasicSearchParams, repository: UserRepository): Promise<UserEntity[]> {
        const branch = await repository.source.getRepository(BranchEntity).findOneBy({ employees: { person: { userId: args.userId } } });

        return await repository.manager
            .createQueryBuilder('u')
            .leftJoin('u.person', 'p')
            .leftJoin('p.employee', 'e')
            .where('u.email LIKE :email', { email: `%${args.query}%` })
            .andWhere('p.id IS NULL')
            .andWhere('e.branch_id = :branchId', { branchId: branch.id })
            .getMany();
    }
}
