'use strict';
let md5 = require('md5')
const now = new Date()
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        firstname: "sodik",   
        lastname: "sodikin",
        email: "sodikin@gmail.com",
        password: md5("54321"),
        role : "CEO",
        createdAt : now,
        updatedAt : now
        },
      {
        firstname: "heri",
        lastname: "poter",
        email: "herig@gmail.com",
        password: md5("4213"),
        role : "admin",
        createdAt : now,
        updatedAt : now
        },
        {
          firstname: "sir",
          lastname: "Martin",
          email: "martin@gmail.com",
          password: md5("5321"),
          role : "owner",
          createdAt : now,
          updatedAt : now
          },
    ])
  },



  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
