import Knex from 'knex';


export async function up(knex: Knex){
    return knex.schema.createTable('fazendas', table=>{
        table.increments('id').primary();
        table.string('razao').notNullable();
        table.integer('cnpj').notNullable();
        table.string('regiao').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.decimal('altitude').notNullable();
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('fazendas');
}