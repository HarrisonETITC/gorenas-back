import { setSeederFactory } from "typeorm-extension";
import { UserEntity } from "../../entities/user.entity";
import { StateModel } from "@Domain/models/general/state.model";

export const UserFactory = setSeederFactory(UserEntity, (faker) => {
    const user = new UserEntity();
    user.email = faker.internet.email();
    user.state = StateModel.STATE_ACTIVE;
    user.password = '00000000';

    return user;
})