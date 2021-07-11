# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## How to use with docker

Create .env file

#### Environment variables for test

```
NODE_ENV=development
PORT=4000
AUTH_MODE=false
JWT_SECRET_KEY=this-is-a-strong-secret-key
DB_HOST_NAME=db-host
DB_PORT=5433
DB=test-db
DB_USER=dbUser
DB_PASSWORD=test
HOST_LOG_PATH=./log
HOST_PERSISTS_PGDATA=./pg-db
HOST_API_PORT=4000
```
For use app with Fastify add to .env 
```
USE_FASTIFY=true
```
Start app

```
docker-compose up -d
```

How to create database tables and user for the tests with login: admin password: admin

```
docker container exec -it node-api /bin/sh
# npm run migration:run
```

How to clean up the database

```
docker container exec -it node-api /bin/sh
# npm run migration:revert
```

Stop app

```
docker-compose down
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
