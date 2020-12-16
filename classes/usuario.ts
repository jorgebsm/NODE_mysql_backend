
export class Usuario {

    public id: string;
    public id_usuario: number;
    public nombre: string;
    public pin: string;

    constructor(id: string){
        this.id = id;
        this.id_usuario = 0;
        this.nombre = 'sin-nombre';
        this.pin = 'sin-pin'
    }

}

