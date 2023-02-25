/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('reviews', {
    id: 'id',
    prId: {
      type: 'varchar(256)',
      unique: true
    },
    userId: {
      type: 'integer',
      notNull: true,
      references: 'users',
      onDelete: 'cascade',
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
