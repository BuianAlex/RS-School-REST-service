const Ajv = require('ajv');

const ajv = new Ajv({ strictTuples: false }); // options can be passed, e.g. {allErrors: true}

const schema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    columns: {
      type: 'array',
      default: [],
      items: [
        {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            order: { type: 'integer' },
          },
        },
      ],
    },
  },
  additionalProperties: false,
};

const validate = ajv.compile(schema);

module.exports = validate;
