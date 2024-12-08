export class UserUpdateDto {
    id: number;
    email?: string;
    password?: string;
    state?: string;
    created?: Date;
    oldPassword?: string;
}