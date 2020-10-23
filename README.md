# realestate-explorer-with-vue
### This project is under development

## First

### How to

Download and setup Docker and docker-compose

and use following command

-`git clone https://github.com/hakkisabah/realestate-explorer-with-vue`

-`cd realestate-explorer-with-vue`

-`docker-compose up --build`

Its ready to https://localhost:8080

#### Login Info

User name : hakkisabah
pass : test

## Note 
If you want to run without docker you should be change this:

change api addres what you want following files ( line number here ):

/realestate-explorer-with-vue/vue-app/src/store/index.js : 37
/realestate-explorer-with-vue/vue-app/src/modules/api.js : 3
/realestate-explorer-with-vue/node-app/serverside/db.js  : 1

an also navigate menus , maybe see apointments page its page here vue but not configured this on node.js, so getting error and  its may secureliy behaviour
