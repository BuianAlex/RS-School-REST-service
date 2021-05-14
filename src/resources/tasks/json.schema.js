const Ajv = require('ajv');

const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

const schema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string', pattern: '^.{1,}$' },
    order: { type: 'number' },
    description: { type: 'string' },
    boardId: { type: ['string', 'null'] },
    userId: { type: ['string', 'null'] },
    columnId: { type: ['string', 'null'] },
  },
  additionalProperties: false,
};

const validate = ajv.compile(schema);

module.exports = validate;
