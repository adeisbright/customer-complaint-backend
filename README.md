# Customer Complaint Management Backend System

Customer Complaint Management System seeks to enable an organization manage
complaints from customers.

## Table of Contents

1. Overview
1. Project Constraints
1. Requirements
1. Downloading the Project
1. Dependencies
1. Environemnt Settings
1. Creating the Root User
1. Starting the App
1. Understanding Each Endpoint
1. Code Formatting
1. Static Code Analysis
1. Running Test
1. Making Contributions and Modifications

### Overview

This project is for a hypothetical organization that
wants to aggregate and resolve customer complaints.

To do this, the organization will assign managers to each of their branches.
In this project, the number of branches for the organization cannot exceed 3.

Each customer when created is attached to any but one of the branches.
No customer can belong to more than one branch.
Our customers can create complaints whenever they have one.

The organization has managers at each branch setup to resolve complaints.

### Project Constraints

The project adheres to the following constraints :

1. A root user will be created through seeding
1. This user is entrusted with adding branches, managers , and customers
1. The root user cannot add more than 3 branches except the configuration
   setting for the application is changed to allow that
1. Currently, the root user creates customers , this is allowed.
   Nevertheless, managers at each branch should be entrusted with that task.
   This is because a single root user cannot handle creation of customers
   1.To add a customer, the customers profile picture must be provided.
   Without that, the customer cannot be added.
1. We do not currently offer file type checking during profile upload.
   That will be handled in the next release
1. A customer cannot update a complaint.
   The duty of updating a complaint is delivered to either the manager or the admin
1. Deleting a branch deletes all dependent resources such as managers , customers , and
   complaints.
1. Deleting a customer removes all complaint of that customer
1. Retrieving branch related information currently uses multi queries to
   retrieve the data from our database.
   Data aggregation is currently the duty of the application

### Project Requirements

This project depends on certain technologies. They are necessary to get it running.
They include :

> [NodeJS](https://nodejs.org)

> [MongoDB](https://mongodb.org)

> [Typescript](https://typescript.lang)

Download the tools listed above to your local computer if you intend running the
app.

How to get the app running is discussed in a near section below

### Downloading the Project

Clone this project using the git clone command.
The stable branch is set to main and that is the branch you should run.
Other development branch as at the time of pushing the codes were short lived and
therefore deleted.

To get this project, do :

`git clone https://github.com/adeisbright/customer-complaint-backend`

### Dependencies

After cloning the repository, you are now a step closer to running the project.

The project dependencies are listed in package.json at the root of the directory.

After downloading and installing NodeJS , and MongoDB ; you can install the
dependencies using :

`npm install`

Run the command above at the root of this project directory.

Some of the dependencies needs explanation.

**_ ExpressJS _**

The HTTP Framework used for buiding the REST Endpoints

**_ MULTER _**
This library is a middleware that helps in handling multipart/form-data

**_ bcryptjs _**
We use this library to salt and hash a text (password) before saving that text to
the database.

We also use it to compare a raw text against our hashed value

**_ jsonwebtoken _**
This library is an implementation of JWT. It is used for signing
a resource to generate a token and also for validating tokens

**_ cors _**
Used for Cross Origin Request Handling
Currently, the project is configured to accept request from any origin

**_ dotenv _**
We use this library for reading environment variables at runtime

**_ mongoose _**
An Object Document Mapper for communicating with MongoDB

It allows us to define a Schema for our collections.
It provides helper query methods too

**_ morgan _**
Morgan is an HTTP request logging middleware

**_ Winston _**
Winston provides utilities to enable logging instead of using console.log

With Winston, we can centralize our logs whether to file or any other streaming
options.

When used with Morgan, it can be used to log http request to a file
or any preferred destination

We use Morgan and Winston to log requests and error to files

**_ Mocha _**
Mocha is a testing framework

**_ Chai _**
Chai is an assertion library used in connection with Mocha.
Chai is used to assert the truthiness of an expression

**_ chai-http _**

This library is a middleware for chai to assert http request

**_ joi _**
A data validation library.
In this project, we use joi to validate parts of a request body to ensure
the required fields are provided during a request session

**_ @ngneat/falso _**
Provides fake data

During testing, we need to create random fake data to test our endpoints.
This library generates fake data for us.

**_ helmet _**
Helps to cover sensistive HTTP header information

If not protected, HTTP headers information can be used by an attacker
to diagnose your server.

Make it hard for them to do this by hiding sensitive information

It covers the X-Powered-By HTTP header.
Without helmet, express will leak this information
**_ compression _**
Reduces the amount of downladable data that is sent to the client .
With Compression, Gzip is used automatically to make the size of our
response data smaller

**_ debug _**
Used by other libraries to log information about their processes

**_ eslint_**

This library is used for static code analysis.
It lints our codebase for possible problems

**_ eslint-typescript _**
Provides typescript support to eslint

**_ eslint-config-prettier _**

We want to be able to use prettier for code formatting and eslint for
linting.
Eslint can check for code formats too.
We do not want that, so this library helps to make eslint ignore formatting rules
during its check

**_ prettier _**
Prettier is a code formatting tool.
It helps a project to maintain a consistent style guide.
The rules of formatting are declared in .prettierc

In a section below, you will see how to run formatting

**_ @types/{lib} _**
{lib} can be any library.
The format above offers typescript support to {lib}
So, we will have access to types in {lib}

**_ ts-node _**
Typescript support for nodejs

**_ ts-node-dev _**
Same as ts_node , although this watches your file and does the transpilation
on the code once there is a change in code

**_ typescript _**
Installs the typescript installer

**_ source-map-support _**
It provides source mapp support for stack traces.

### Environment Settings

Provide appropriate values where needed as specified in env.sample file

Endeavour the provide the database urls for development , testing , and production

Other environment variables are also necessary.
Without values , the project will not run

If you need any help filling the values , kindly reach out to me

## Creating the Root User (Admin)

An admin should be seeded the first time you want to run the code in a new environment.

Do the following to create an admin :

1. Development

If you want to run the app in development mode using npm run devstart , kindly
seed the admin collection first by running :

` npm run seed && npm run devstart`

The command above does two things :

> It adds an admin record
> It launches the development server

2. Testing

You can run the tests and the get a report of the code coverage using :

`npm run test && npm run generate_code_coverage `

But before running the test, you need to seed the test database with the admin record

The database used for testing is different from the development ,
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

### Starting the APP

To run the app locally, use :

`npm run devstart`

To run in production, use :

`npm run start`

To see the logs while running the project, you should use :

`npm run debug`
to start the app

### Understanding Each Endpoint

Kindly check openapi.json , which is the swagger file that documents all endpoints

Or you can check the documentation endpoint which renders openapi.json

### Code Formatting

You can make contributions to this project using your style.

Since we want to maintain same style guide, we provide a script that runs formatting.
Use :
`npm run format`
This will format your code to meet the set standard

A pre-commit hook will be added later to automatically format your code before commiting

### Static Code Analysis

To lint the code , use :

`npm run lint`

### Running Test

Testing the endpoints were a top priority.
It is advisable you run the test even before you start the app.
This will give you a clue whether the app will run.

Also, after adding any new resource handler , kindly add a test for that  
and run the test script.

To run the test script :
`npm run test `

### Making Contributions and Modifications

Raise an issue on anything, and I will respond.
