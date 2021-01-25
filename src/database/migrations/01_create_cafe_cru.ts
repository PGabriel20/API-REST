import Knex from 'knex';


export async function up(knex: Knex){
    return knex.schema.createTable('cafe_cru', table=>{
        table.increments('id').primary();
        table.string('tipo').notNullable();
        table.integer('qtd_aval').notNullable();
        table.integer('qtd_minima').notNullable();

        //Relação
        table.integer('fazenda_id')
        .notNullable()
        .references('id')
        .inTable('fazendas')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('cafe_cru');
}