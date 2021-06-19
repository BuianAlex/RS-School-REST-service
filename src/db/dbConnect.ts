import { createConnection } from 'typeorm';
import 'reflect-metadata';

import config from '../common/ormconfig';

export const connection = createConnection(config);
