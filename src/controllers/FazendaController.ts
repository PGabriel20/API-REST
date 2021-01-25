import {Request, Response} from 'express';
import db from '../database/connection';


export default class  FazendaController{

    async index(req: Request, res: Response){

        const fazenda = await db('fazendas').select('*')

        return res.json(fazenda)
    }

    async create(req: Request, res: Response){
        const {
            razao,
            cnpj,
            regiao,
            latitude,
            longitude,
            altitude
    
        } = req.body;

        const trx = await db.transaction(); 

        try{
            await trx('fazendas').insert({
                razao,
                cnpj,
                regiao,
                latitude,
                longitude,
                altitude

            })
            
            await trx.commit()

            console.log("Fazenda cadastrada com sucesso!")
            return res.status(201).send()
        }
        catch(error){
            await trx.rollback()
            return res.status(400).json({error: "Ocorreu um erro inesperado ao cadastrar fazenda!"})
        }
    
    }

    async delete(req: Request, res: Response){
        const id_fazenda = req.params.id

        await db('fazendas').delete('*').where('fazendas.id', '=', id_fazenda)

        console.log('Fazenda deletada com sucesso!')
        return res.send()
    }


    async update(req: Request, res: Response){
        const {
            razao,
            cnpj,
            regiao,
            latitude,
            longitude,
            altitude
    
        } = req.body;

        const id_fazenda = req.params.id

        const trx = await db.transaction(); 

        try{
            await trx('fazendas').update({
                razao,
                cnpj,
                regiao,
                latitude,
                longitude,
                altitude
            }).where('id', id_fazenda)
            
            await trx.commit()

            console.log("Dados da fazenda atualizados com sucesso!")
            return res.status(201).send()
        }
        catch(error){
            await trx.rollback()
            return res.status(400).json({error: "Ocorreu um erro ao salvar alterações!"})
        }
    }

    async single(req: Request, res: Response){

        const id_fazenda = req.params.id

        const fazenda = await db('fazendas').select('*').from('fazendas').where('id', id_fazenda)

        return res.json(fazenda)
    }


}