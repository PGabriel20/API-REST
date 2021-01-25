import express from 'express';
import FazendaController from './controllers/FazendaController';
import CafeCruController from './controllers/CafecruController';

const routes = express.Router();
const fazendaController = new FazendaController()
const cafeCruController = new CafeCruController()


//Rotas fazendas
routes.post('/fazendas', fazendaController.create)
routes.get('/fazendas', fazendaController.index)
routes.delete('/fazendas/:id', fazendaController.delete)
routes.put('/fazendas/:id', fazendaController.update)
routes.get('/fazendas/:id', fazendaController.single)

//Rotas café cru
routes.post('/cafe', cafeCruController.create)
routes.get('/cafe', cafeCruController.index)
routes.get('/cafe2', cafeCruController.filtro)
routes.delete('/cafe', cafeCruController.delete)
routes.put('/cafe', cafeCruController.update)



export default routes;