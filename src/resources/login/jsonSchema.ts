import Ajv, { JTDDataType } from 'ajv/dist/jtd';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv, ['regex']);

ajv.addFormat('date-time', {
  validate: (dateTimeString: string) => /dfd/.test(dateTimeString),
});

const schema = {
  properties: {
    login: { type: 'string' },
    password: { type: 'string' },
  },
} as const;

type MyData = JTDDataType<typeof schema>;

// type inference is not supported for JTDDataType yet
export const validate = ajv.compile<MyData>(schema);
