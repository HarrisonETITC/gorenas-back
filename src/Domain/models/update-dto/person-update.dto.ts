export class PersonUpdateDto {
    id: number;
    names?: string;
    surnames?: string;
    identification?: string;
    typeIdentification?: string;
    phoneNumber?: string;
    rh?: string;
    address?: string;
    born?: Date;
    rol?: string;
    user?: string;
}