export class UserCreateDto {
    email: string;
    password: string;
    state?: string;
    created?: Date;
}