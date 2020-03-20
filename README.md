# Suiso
It's on development, but it meant to be a video plataform for courses.

## Entities

### User
It's the client and the one that is willing to watch the courses.

### Sellers
They make and sell courses in this platform. they are also a user.

### Courses
It's the product made by the sellers.

------

### Steps to run this project:

1. Run `yarn i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `yarn start` command

### Tecnical choises

* TypeORM, i was thinking of using Sequelize, but it's lacking typescript documentation and TypeORM have a beaultiful migration generator.
* TypeScript, because it has a great support for classes and the static typing make unit test easier to code.