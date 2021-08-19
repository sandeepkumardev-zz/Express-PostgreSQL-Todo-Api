npm init
sequelize init
yarn add express sequelize pg pg-hstore

// setup config file

sequelize db:create
sequelize model:generate --name Todo --attributes id:string,name:string,isCompleted:boolean

sequelize db:migrate

