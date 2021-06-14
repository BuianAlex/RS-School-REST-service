import os from 'os';

import options from './common/config';
import sequelize from './dbConnect';
import app from './app';

sequelize
  .authenticate()
  .then(() => {
    process.stdout.write(`Connected to DB${os.EOL}`);
    app.listen(options.PORT, () =>
      process.stdout.write(
        `App is running on http://localhost:${options.PORT}${os.EOL}`
      )
    );
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
    process.exit(1);
  });
