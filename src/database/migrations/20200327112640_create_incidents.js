const TABLE_NAME = 'incidents'

exports.up = knex => knex.schema.createTable(TABLE_NAME, tbl => {
  tbl.increments()
  tbl.string('title').notNullable()
  tbl.string('description').notNullable()
  tbl.decimal('value').notNullable()

  // Creating relationship with ongs
  tbl.string('ong_id').notNullable()

  // Defining foreign key
  tbl.foreign('ong_id').references('id').inTable('ongs')
})

exports.down = knex => knex.schema.dropTable(TABLE_NAME)
