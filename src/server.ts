import os from 'os';

import options from './common/config';
import app from './app';

app.listen(options.PORT, () =>
  process.stdout.write(
    `App is running on http://localhost:${options.PORT}${os.EOL}`
  )
);
