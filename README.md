# Complaint Management System Backend System

Complaint MS is a system that enables organization to manage customers complaint.

## Seeding an Admin

An admin should be seeded whenever you want to run the code in a new environment.

Do the following to create an admin :

1. Development

If you want to run the app in development mode using npm run devstart , kindly
see the admin collection first by running :

` npm run seed && npm run devstart`

The command above does two things :

> It adds an admin record
> It launches the development server

2. Testing

You can run the tests and the get a report of the code coverage using :
`npm run test && npm run generate_code_coverage `

But before running the test, you need to seed the test database with the admin record

The database used for testing is different from the development , testing , staging ,
and production environment

To seed the database , kindly open ./src/config/index.ts

Uncomment line 1 from :

```
//process.env.NODE_ENV = "test" ;
```

to

```
process.env.NODE_ENV = "test" ;
```

After the seeding and testing, ensure you recomment that line
