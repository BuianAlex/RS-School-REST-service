const Ajv = require('ajv');

const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

const schemaCreate = {
  type: 'object',
  properties: {
    name: { type: 'string', pattern: '^.{3,}$' },
    login: { type: 'string', pattern: '^.{3,}$' },
    password: { type: 'string', pattern: '^.{3,}$' },
  },
  required: ['name', 'login', 'password'],
  additionalProperties: false,
};

const schemaEdit = {
  type: 'object',
  properties: {
    id: { type: 'string', pattern: '^.{3,}$' },
    name: { type: 'string', pattern: '^.{3,}$' },
    login: { type: 'string', pattern: '^.{3,}$' },
    password: { type: 'string', pattern: '^.{3,}$' },
  },
  additionalProperties: false,
};

const create = ajv.compile(schemaCreate);
const edit = ajv.compile(schemaEdit);

module.exports = { create, edit };
