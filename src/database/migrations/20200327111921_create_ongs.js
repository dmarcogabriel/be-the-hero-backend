const TABLE_NAME = 'ongs'

exports.up = knex => knex.schema.createTable(TABLE_NAME, tbl => {
    tbl.string('id').primary()
    tbl.string('name').notNullable()
    tbl.string('email').notNullable()
    tbl.string('whatsapp').notNullable()
    tbl.string('city').notNullable()
    tbl.string('uf', 2).notNullable()
  })

exports.down = knex => knex.schema.dropTable(TABLE_NAME)
