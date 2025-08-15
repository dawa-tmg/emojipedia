exports.up = function(knex) {
  return knex.schema.createTable('emoji', function(table){
    table.increments();
    table.string('emoji', 45);
    table.string('title', 150);
    table.text('description');
    table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('emoji')
};
