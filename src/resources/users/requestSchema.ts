import Ajv, { JTDDataType } from 'ajv/dist/jtd';

const ajv = new Ajv();

const schema = {
  properties: {
    foo: { type: 'int32' },
  },
  optionalProperties: {
    bar: { type: 'string' },
  },
} as const;

type MyData = JTDDataType<typeof schema>;

// type inference is not supported for JTDDataType yet
export const create = ajv.compile<MyData>(schema);
