import express, { json } from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

// Configurações
app.use(cors())
app.use(express.json());
app.use(routes);



//Outros
app.listen(3333, () => {
    console.log('Servidor Rodando...')
})