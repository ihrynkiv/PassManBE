/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('users', {
    id: 'id',
    username: {
      type: 'varchar(100)',
      notNull: true,
      unique: true
    },
    password: {
      type: 'varchar(256)',
      notNull: true
    },
    configuration: {
      type: 'json'
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updatedAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
};

exports.down = pgm => {};
