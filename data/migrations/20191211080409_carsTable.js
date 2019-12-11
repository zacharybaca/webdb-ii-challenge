exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments();

    tbl
      .string('VIN', 255)
      .unique()
      .notNullable()
      .index();
    tbl
      .string('MAKE', 255)
      .notNullable()
      .index();

    tbl
      .string('MODEL', 255)
      .notNullable()
      .index();

    tbl
      .bigInteger('MILEAGE')
      .notNullable()
      .index();

    tbl.string('TRANSMISSION', 255).index();

    tbl.string('TITLE', 255).index();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
