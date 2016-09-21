'use strict';

const Sequelize = require('sequelize');
const credentials = require('./dbLogin');

// if there is a password, make it the third parameter after the username,
// otherwise, make it null and include a comma after it
const sequelize = new Sequelize(credentials.dbName, credentials.dbUser, credentials.dbPass, {
  host: 'elmer-01.db.elephantsql.com',
  dialect: 'postgres',
});

const User = sequelize.define('users', {
  _id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  username: Sequelize.STRING,
  profilepic: Sequelize.STRING,
  bio: Sequelize.STRING,
  password: Sequelize.STRING,
}, {
  timestamp: false,
});

const Activity = sequelize.define('activities', {
  _id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  actname: Sequelize.STRING,
  actdesc: Sequelize.STRING,
});

const UserActivity = sequelize.define('useractivities', {
  _id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  status: Sequelize.BOOLEAN, // if open, true, if completed false
});

Activity.belongsToMany(User, { through: 'useractivities' });
User.belongsToMany(Activity, { through: 'useractivities' });

// Sync all models that aren't already in the database
sequelize.sync()
// // Force sync all models
// sequelize.sync({force: true})
// // Drop all tables -- ran once 9/9 2:48pm
// sequelize.drop()
// emit handling:
.then(() => {
  // woot woot
}).catch((error) => {
  console.log(error);
});

module.exports = { sequelize, User, Activity, UserActivity }


