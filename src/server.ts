import options from './common/config';
import app from './app';

app.listen(options.PORT, () =>
  console.log(`App is running on http://localhost:${options.PORT}`)
);
