export class SucursalMv {
    id: number;
    direccion: string;
    estado: string;
    ganancias: number;
    creacion: Date;

    constructor(id: number, direccion: string, estado: string, ganancias: number, creacion: Date) {
        this.id = id;
        this.direccion = direccion;
        this.estado = estado;
        this.ganancias = ganancias;
        this.creacion = creacion;
    }
}