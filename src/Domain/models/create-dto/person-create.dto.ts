export class PersonCreateDto {
    names: string;
    surnames?: string;
    identification: string;
    typeIdentification: string;
    phoneNumber?: string;
    rh?: string;
    address?: string;
    born?: Date;
    role: string;
    user: string;
}