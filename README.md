# Budding API

An API for Budding, a mobile app that helps horticulturists to keep track of their plants and measure their progress as they grow.

The project was created by Stephanie Thornley, ([thorners55](https://github.com/thorners55)),
Zach Pinfold ([ZachPinfold](https://github.com/ZachPinfold)),
Joao Mak ([joao-mak](https://github.com/joao-mak)) and
Richard Bacon ([RichardBacon](https://github.com/RichardBacon)) during the [Northcoders](https://northcoders.com/) coding bootcamp.

For more information about our approach and a demonstration of the app, see our Northcoders graduation presentation: [budding | Northcoders Graduation Showcase](https://www.youtube.com/watch?v=llKXad2gF8c).

The hosted API: [Budding API](https://budding-api.herokuapp.com/api).

The repo for the frontend mobile app: [Budding](https://github.com/RichardBacon/budding).

## Development

### Technical Features

- A backend RESTful API built on Node with Express, using an MVC architecture.

- CRUD operations performed on a PostgreSQL database using Knex.

#### Dev Tools

- Code formatting with Prettier.

- Linting with ESLint.

- Test-driven development with Jest and Supertest.

## Getting Started

```bash
git clone https://github.com/RichardBacon/budding-api.git
```

### Prerequisites

```
node v12
postgresql v12.2
```

### Installing

```
npm install
```

### Database Setup

Add a knexfile.js in the root directory

- user and password should be your postgres credentials (not required for mac users)

```js
// knexfile.js

const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};

const customConfig = {
  development: {
    connection: {
      database: 'budding',
      // user,
      // password
    },
  },
  test: {
    connection: {
      database: 'budding_test',
      // user,
      // password
    },
  },
};

module.exports = { ...customConfig[ENV], ...baseConfig };
```

Create databases

```
npm run setup-dbs
```

Seed databases

```
npm run seed:test
npm run seed:dev
```

### Starting The Server

```
npm run dev-server
```

## Running Tests

```
npm test
```

## Built With

- [Express](https://expressjs.com/)
- [Jest](https://jestjs.io/)
- [Knex](http://knexjs.org/)
- [Node](https://nodejs.org/en/)
- [Node Postgres](https://node-postgres.com/)
- [Supertest](https://github.com/visionmedia/supertest)

## Authors

- **Stephanie Thornley** - [thorners55](https://github.com/thorners55)
- **Zach Pinfold** - [ZachPinfold](https://github.com/ZachPinfold)
- **Joao Mak** - [joao-mak](https://github.com/joao-mak)
- **Richard Bacon** - [RichardBacon](https://github.com/RichardBacon)

## License

This project is licensed under the MIT License, see the [LICENSE](LICENSE) file for details.
