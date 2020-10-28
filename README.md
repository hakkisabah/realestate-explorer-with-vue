# realestate-explorer-with-vue
### This project is under development

## Requirements
- smtp mail account information
- Docker
- .env.local file (  required to change the name .env.local.example file in node-app folder )


### How to

Download and setup Docker and docker-compose

and use following command

-`git clone https://github.com/hakkisabah/realestate-explorer-with-vue`

-`cd realestate-explorer-with-vue`

-`docker-compose up --build`

Its ready to http://localhost:8080

After that you can check on your browser http://localhost:8081 address for mongodb data
 

#### Login Info

User name : hakkisabah
pass : test

## Developed What ?

- Login system
- Input validator
- Post code verifier
- Employee id creator
- After the employee id and send information to he/she mail for complete registration
- env files getting compatible

#Configuration
- After the change name example of .env.local ( in node-app folder ) file enter the smtp information 
- All required configurations included .env files in the apps folder ( For example, in the node-app folde have .env file and you can change JWT expire time)
 