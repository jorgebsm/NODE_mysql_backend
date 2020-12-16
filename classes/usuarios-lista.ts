import { Usuario } from "./usuario";

//Se utiliza en sockets para alamacenar usuarios

export class UsuariosList {

    private lista: Usuario[] = [];

    constructor(){}

    //Obtener un usuario
    public agregar( usuario: Usuario ){
        this.lista.push( usuario );
        return usuario;
    }

    //Actualizar nombre de un usuario
    public actualizarNombre( id: string, id_usuario: number, nombre: string, pin: string ){
        
        for(let usuario of this.lista){
            if( usuario.id === id ){
                usuario.id_usuario = id_usuario;
                usuario.nombre = nombre;
                usuario.pin = pin;
                break;
            }
        }
    }

    //Obtener lista de usuarios
    public getLista(){
        return this.lista.filter( usuario => usuario.nombre != 'sin-nombre');
    }

    public getListaSinDocente() {
        return this.lista.filter( usuario => usuario.nombre != 'Docente' )
    }

    //Regresar un usuario
    public getUsuario( id: string ){
        return this.lista.find( usuario => usuario.id === id );
    }

    //Obtener usuarios en un pin en particular
    public getUsuariosByPin( pin: string ){
        return this.lista.filter( usuario => usuario.pin.toLowerCase() == pin.toLowerCase() );
    }

    public borrarUsuario( id: string ){
        
        const tempUsuario = this.getUsuario( id );
        return this.lista = this.lista.filter( usuario => {
            return usuario.id != id;
        });

        return tempUsuario;
    }


}