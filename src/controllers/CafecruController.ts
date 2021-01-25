import {Request, Response} from 'express';
import db from '../database/connection';


export default class CafecruController{

    async index(req: Request, res: Response){
        const cafe_cru = await db('cafe_cru').select('*')

        return res.json(cafe_cru)
    }

    async create(req: Request, res: Response){
        const {
            tipo,
            qtd_aval,
            qtd_minima,
            fazenda_id
    
        } = req.body;

        const trx = await db.transaction();
        

        try{
            await trx('cafe_cru').insert({
                tipo,
                qtd_aval,
                qtd_minima,
                fazenda_id
        
            })
            
            await trx.commit()

            console.log('Café cru cadastrado com sucesso!')
            return res.send()
        }
        catch(error){
            await trx.rollback()
            return res.status(400).json({error: "Ocorreu um erro ao cadastrar café cru!"})
        }
    }
    
    async filtro(req: Request, res: Response){

        const filters = req.query
        const id_cafe = filters.filtro as string

        const relacao =await db('cafe_cru')
        .where('cafe_cru.id', '=', id_cafe)
        .join('fazendas','cafe_cru.fazenda_id', '=','fazendas.id')
        .select(['cafe_cru.*','fazendas.*'])


        // .select('*').from('cafe_cru').where('fazenda_id', 1)
        return res.json(relacao)
    }

    async delete(req: Request, res: Response){
        const filters = req.query
        const id_cafe = filters.filtro as string

        await db('cafe_cru').delete('*').where('cafe_cru.id', id_cafe)

        console.log('Café cru deletado com sucesso!')
        return res.send()
    }

    async update(req: Request, res: Response){
        const {
            tipo,
            qtd_aval,
            qtd_minima,
            fazenda_id
    
        } = req.body;

        const filters = req.query
        const id_cafe = filters.filtro as string
        const trx = await db.transaction();
        
        
        try{
            await trx('cafe_cru').update({
                tipo,
                qtd_aval,
                qtd_minima,
                fazenda_id
        
            }).where('id', '=', id_cafe)
            
            await trx.commit()

            console.log('Dados de café cru atualizados com sucesso!')
            return res.json()
        }
        catch(error){
            await trx.rollback()
            return res.status(400).json({error: "Ocorreu um erro ao salvar alterações!"})
        }
    }
}