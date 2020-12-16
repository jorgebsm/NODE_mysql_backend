import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { SERVER_PORT } from './global/environment';
import http from 'http';
import activityRouter from './routes/activityRoutes';
import attemptRouter from './routes/attemptRoutes';
import presentationRouter from './routes/presentationRoutes';
import answersVfRouter from './routes/answersVfRoutes';
import answersRcRoutes from './routes/answersRcRoutes';
import questionsRouter from './routes/questionsRoutes';
import optionsQuestionSuRoutes from './routes/optionsQuestionSuRoutes';
import optionsQuestionRcRoutes from './routes/optionsQuestionRcRoutes';
import answersSuRoutes from './routes/answersSuRoutes';
import quizRoutes from './routes/quizRoutes';
import adminRouter from './routes/adminRoutes';
import tokenRouter from './routes/tokenRoutes'
import optionsQuestionVfRoutes from './routes/optionsQuestionVfRoutes';
import path from 'path';
import * as socket from './sockets/socket';
import socketIO from 'socket.io';
import userRouter from './routes/userRoutes';
import countriesRouter from './routes/countriesRoutes';
import authAPI from './libs/authAPI'

export default class Server {

    private static _intance: Server;
    public app: Application;
    private httpServer: http.Server;
    public port: number;
    public io: socketIO.Server;

    constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.config();
        this.routes();
        this.io = socketIO(this.httpServer);
        this.escucharSockets();
    }

    public static get instance() {
        return this._intance || (this._intance = new this());
    }

    config(): void {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json({}));
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes(): void {
        //lo estoy haciendo de 2 formas diferentes
        // this.app.use('/', router);
        this.app.use('/uploads', express.static(path.resolve('uploads')));
        this.app.use('/api/activities', authAPI.validator, activityRouter);
        this.app.use('/api/attempts', authAPI.validator, attemptRouter);
        this.app.use('/api/quizzes', authAPI.validator, quizRoutes);
        this.app.use('/api/presentations', presentationRouter);
        this.app.use('/api/questions', questionsRouter);
        this.app.use('/api/options_question_vf', authAPI.validator, optionsQuestionVfRoutes);
        this.app.use('/api/options_question_su', authAPI.validator, optionsQuestionSuRoutes);
        this.app.use('/api/options_question_rc', authAPI.validator, optionsQuestionRcRoutes);
        this.app.use('/api/answers_vf', authAPI.validator, answersVfRouter);
        this.app.use('/api/answers_su', authAPI.validator, answersSuRoutes);
        this.app.use('/api/answers_rc', authAPI.validator, answersRcRoutes);
        this.app.use('/api/admin', authAPI.validator, adminRouter);
        this.app.use('/api/token', tokenRouter);
        this.app.use('/api/users', userRouter);
        this.app.use('/api/countries', authAPI.validator, countriesRouter);
    }

    start(callback: any) {
        this.httpServer.listen(this.port, callback);
    }

    private escucharSockets() {
        this.io.on('connection', cliente => {
            socket.conectarCliente(cliente, this.io);
            socket.ConfigurarUsuario(cliente, this.io);
            socket.obtenerUsuarios(cliente, this.io);
            socket.obtenerUsuariosByPin(cliente, this.io);
            socket.desconectar(cliente, this.io);
            socket.orden(cliente, this.io);
            socket.stopActivity(cliente, this.io);
            socket.standby(cliente, this.io);
            socket.repeatQuestion(cliente, this.io);
            socket.sendOrdenResultStudents(cliente, this.io);
            socket.answerVf(cliente, this.io);
            socket.ordenAnswered(cliente, this.io);
            socket.intentoActual(cliente, this.io);
            socket.muestraRespuestasCorrectas(cliente, this.io);
            socket.finishActivity(cliente, this.io);
            socket.mostrarResultadoAStudent(cliente, this.io);
            socket.mostrarResultadoAStudentSurvey(cliente, this.io);
            socket.addContador(cliente, this.io);
            socket.subtracContador(cliente, this.io);
            socket.arrayAnswerAndCont(cliente, this.io);
            socket.ordenSaveAllAnswersQuiz(cliente, this.io);
            socket.stopQuizClassic(cliente, this.io);
            socket.saveUltimaAnswer(cliente, this.io);
            socket.questionActualPresentation(cliente, this.io);
            socket.slideActualPresentation(cliente, this.io);
            socket.ordenSaveAnswerPresentation(cliente, this.io);
            socket.solicitarAcceso(cliente, this.io);
            socket.permitirAcceso(cliente, this.io);
            socket.denegarAcceso(cliente, this.io);
        });
    }
}

//Correr el server
const server = new Server();
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`);
});