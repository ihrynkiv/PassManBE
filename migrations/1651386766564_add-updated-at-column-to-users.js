/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.addColumn('users',  {
    updatedAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
  }}, {
      ifNotExists: true
    })
};

exports.down = pgm => {};
