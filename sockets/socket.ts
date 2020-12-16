import { Socket } from 'socket.io';
import { UsuariosList } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosList();
export const usuariosConectadosByPin = new UsuariosList();

export const conectarCliente = (cliente: Socket, io: SocketIO.Server) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

export const desconectar = (cliente: Socket, io: SocketIO.Server) => {    
    cliente.on('disconnect', () => {
        usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getListaSinDocente());
    });
}

//Configurar usuario, se ejecuta con el login, así se agregan nuevos usuarios
export const ConfigurarUsuario = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('configurar-usuario', (payload: { id_usuario: number, nombre: string, pin: string }, callback: Function) => {        
        usuariosConectados.actualizarNombre( cliente.id, payload.id_usuario, payload.nombre, payload.pin.toLowerCase() );
        cliente.join(payload.pin.toLowerCase()); //CUANDO SE CONECTA UN USUARIO, CREAMOS UNA SALA CON ESE PIN, la usaremos para emitir a ese pin
        cliente.join('' + payload.id_usuario); //Creamos salas con las IDs de los usuarios
        // io.emit('usuarios-activos', usuariosConectadosByPin.getUsuariosByPin(payload.pin));
        // io.emit('usuarios-activos', usuariosConectados.getLista());
        io.emit('usuarios-activos', usuariosConectados.getListaSinDocente());
        callback({
            ok: true,
            mensaje: `Usuario ${payload.id_usuario, payload.nombre, payload.pin}, configurado`
        });

    });
}

//obtener usuarios byPin
export const obtenerUsuariosByPin = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('obtener-usuarios-by-pin', (payload) => {
        io.to(cliente.id).emit('usuarios-activos-by-pin', usuariosConectados.getUsuariosByPin(payload));
        // io.in( payload.pin ).emit('usuarios-activos-by-pin', usuariosConectados.getUsuariosByPin(payload)); 
    });
}

//Obtener usuarios
export const obtenerUsuarios = (cliente: Socket, io: SocketIO.Server) => {    
    cliente.on('obtener-usuarios', () => {
        // io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getListaSinDocente());
    });
}

//Escuchar orden para redirección de wait room
export const orden = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('orden', (payload) => {        
        io.to(payload.pin.toLowerCase()).emit('orden-ok', payload);
    });
}

export const stopActivity = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('stop-activity', (payload) =>{
        io.to(payload.pin.toLowerCase()).emit('stop-activity-ok', payload);
    });
}

export const standby = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('standby-activity', (payload) =>{
        // io.emit('standby-activity-ok', payload);
        io.to(payload.pin.toLowerCase()).emit('standby-activity-ok', payload);        
    });
}

export const repeatQuestion = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('repeat-question', (payload) =>{
        io.to(payload.pin.toLowerCase()).emit('repeat-question-ok', payload);
    });
}

//Ojo con esta sección, puede que tenga que modificar ese if
export const sendOrdenResultStudents = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('orden-result-students', (payload) =>{        
        if( payload.allow ){
            io.to(payload.pin.toLowerCase()).emit('orden-result-students-true', payload);
        } else {
            io.to(payload.pin.toLowerCase()).emit('orden-result-students-false', payload);
        }
    });
}

//                   ESTUDIANTE ------- PROFESOR
//Llega una emisión de que se hizo una respuesta y llega la respuesta.
export const answerVf = (cliente: Socket, io: SocketIO.Server ) => {
    cliente.on('answerVf', (payload) => {
        //Es por paprte de un estudiante a una profesor
        io.to(payload.pin.toLowerCase()).emit('answerVf-ok', payload);
        // io.emit('answerVf-ok', payload);
    });
}

//                   ESTUDIANTE ------- PROFESOR

export const ordenAnswered = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('student-answered', (payload) => {
        //La envía un estudiante a profesor
        io.to(payload.pin.toLowerCase()).emit('student-answered-ok', payload);
        // io.emit('student-answered-ok', payload);
    });
}

export const intentoActual = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('intento-actual', (payload) =>{
        io.to(payload.pin.toLowerCase()).emit('intento-actual-ok', payload);
    });
}

export const muestraRespuestasCorrectas = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('muestra-respuestas-correctas', (payload) => {
        io.to(payload.pin.toLowerCase()).emit('muestra-respuestas-correctas-ok', payload);
    });
}

export const finishActivity = (cliente: Socket, io: SocketIO.Server) =>{
    cliente.on('finish-activity', (payload) =>{        
        io.to(payload.pin.toLowerCase()).emit('finish-activity-ok', payload);
    });
}

export const mostrarResultadoAStudent = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('mostrar-resultado-a-student', (payload) =>{
        io.to(payload.pin.toLowerCase()).emit('mostrar-resultado-a-student-ok', payload);
    });
}

export const mostrarResultadoAStudentSurvey = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('mostrar-resultado-a-student-survey', (payload) =>{
        io.to(payload.pin.toLowerCase()).emit('mostrar-resultado-a-student-survey-ok', payload);
    });
}

export const addContador = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('add-contador', (payload) =>{
        io.to(payload.pin.toLowerCase()).emit('add-contador-ok', payload);
    });
}

export const subtracContador = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('subtrac-contador', (payload) =>{
        io.to(payload.pin.toLowerCase()).emit('subtrac-contador-ok', payload);
    });
}

//                   ESTUDIANTE ------- PROFESOR

//Método para emisiones de el arreglo con respuestas en un test clásico
export const arrayAnswerAndCont = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('arrayAnswerAndCont', (payload) =>{
        //De estudiante a profesor
        io.to(payload.pin.toLowerCase()).emit('arrayAnswerAndCont-ok', payload);
        // io.emit('arrayAnswerAndCont-ok', payload);
    });
}

//Esta función será reemplazada por la de abajo, con el stop
export const ordenSaveAllAnswersQuiz = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('orden-save-all-answers-quiz', (payload) =>{
        io.to(payload.pin.toLowerCase()).emit('orden-save-all-answers-quiz-ok', payload);
    });
}

export const stopQuizClassic = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('stop-quiz-classic', (payload) =>{
        io.to(payload.pin.toLowerCase()).emit('stop-quiz-classic-ok', payload);
    });
}

export const saveUltimaAnswer = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('save-ultima-answer', (payload) =>{
        io.to(payload.pin.toLowerCase()).emit('save-ultima-answer-ok', payload);
    });
}

export const questionActualPresentation = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('question-actual-presentation', (payload) =>{
        io.to(payload.pin.toLowerCase()).emit('question-actual-presentation-ok', payload);
    });
}

export const slideActualPresentation = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('slide-actual-presentation', (payload) =>{
        io.to(payload.pin.toLowerCase()).emit('slide-actual-presentation-ok', payload);
    });
}

export const ordenSaveAnswerPresentation = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('orden-save-answer-presentation', (payload) =>{
        io.to(payload.pin.toLowerCase()).emit('orden-save-answer-presentation-ok', payload);
    });
}

export const solicitarAcceso = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('solicitar-acceso', (payload) =>{
        io.to(payload.pin.toLowerCase()).emit('escuchando-solicitud-acceso', payload);
    });
}

export const permitirAcceso = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('permitir-acceso', (payload) =>{
        // io.to(payload.pin.toLowerCase()).emit('acceso-permitido', payload);
        io.to(''+ payload.usuario_id).emit('acceso-permitido', payload);
    });
}

export const denegarAcceso = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('denegar-acceso', (payload) =>{
        // io.to(payload.pin.toLowerCase()).emit('acceso-denegado', payload);
        io.to(''+ payload.usuario_id).emit('acceso-denegado', payload);
    });
}