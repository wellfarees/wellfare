# Apollo Server Template

This is a boilerplate to build a graphql server with :

- Apollo server
  - https://www.apollographql.com/docs/apollo-server/
- Typescript
  - https://www.typescriptlang.org/docs/
- Nodemon for local development
  - https://github.com/remy/nodemon#nodemon
- Linting and formatting with standard typescript configuration
  - https://eslint.org/docs/user-guide/getting-started
  - https://github.com/standard/eslint-config-standard-with-typescript#readme
- Mongoose and TypeGoose for mongoDb modelling and querying
  - https://mongoosejs.com/docs/index.html
  - https://typegoose.github.io/typegoose/docs/guides/quick-start-guide
- Jest and mongodb-memory-server for unit and integration testing
  - https://jestjs.io/docs/getting-started
  - https://github.com/nodkz/mongodb-memory-server#readme
    
## Database credentials

Make sure your database connexion data is available as environment variables :
```
DB_PROTOCOL=mongodb+srv
DB_USER=your-mongo-user
DB_PASSWORD=your-mongo-user-password
DB_HOST=your-mongodb-host
DB_DATABASE=your-database-name
DB_QUERYSTRING=?some-additional-queries // to add at the end of the connexion string
```

If you're developing on a local machine, you can provide it through `dotenv` : make
an `.env` file at the root of the project where you fill these environment variables.
The `dotenv.config()` is already implemented in the main function. This .env file is
not versioned by git: https://github.com/motdotla/dotenv#readme

If you're on a server, you can either pass it via dotenv, or set these environment
variables directly on your server. If you deploy to a cloud function, you can set it
via your cloud's provider environment variables settings. If you deploy to a container,
you can set it in your container build file, based on secrets or settings of your CI
toolchain.

## Commands available

- `yarn build` compiles the app in the `dist` directory.
- `yarn start` runs the previously builded app.
- `yarn dev` builds and run the app with hot reload on files changes 
through nodemon.
- `yarn lint` detects and monitor linting and formatting errors.
- `yarn lint:fix` do the same and autofix what's possible.
- `yarn test` launch jest for all unit tests files in src directory. It runs with
coverage measurement.

## Suggestion for usage

The suggestion to use it for another project is to clone this,
rename the `main` branch to something else, then start an orphan
branch from there to start a fresh git history, and commit on this
new branch as an initial commit. When done you can, if you want,
remove this repository main branch, and rewrite your git and npm configs
(user, author, remotes, app name, etc..) to fit your wishes.

## Git hooks

Some hooks are implemented via husky :
- the pre-commit hook performs an eslint --fix on the staged files, and has to
pass to commit.
- the pre-push hooks runs all the tests suites, and has to pass to push

Both hooks can be bypassed by using the --no-verify modifier on the git command.

## Integration testing

The server is testable from an integration point of view, with the help of the apollo-server-testing
package. You can check how to do this in a pretty simple way in `integration-tests/ping.test.ts`.
