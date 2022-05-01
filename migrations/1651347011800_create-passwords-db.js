exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('passwords', {
    id: 'id',
    userId:{
      type: 'integer',
      notNull: true,
      references: 'users',
      onDelete: 'cascade',
    },
    name: {
      type: 'varchar(256)',
      notNull: true
    },
    username: {
      type: 'varchar(256)',
      notNull: true
    },
    password: {
      type: 'varchar(256)',
      notNull: true
    },
    url: {
      type: 'varchar(256)',
      notNull: true
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
};

exports.down = pgm => {};
