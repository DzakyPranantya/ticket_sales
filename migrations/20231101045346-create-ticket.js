'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tickets', {
      ticketID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "events",
          key: "eventID"
        }
      },
      userID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "userID"
        }
      },
      seatID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "seats",
          key: "seatID"
        }
        //Pada bagian attribut kita menambahkan key “allowNull” bernilai false yang
        //berarti kolom eventID, userID, dan seatID tidak boleh dikosongkan datanya.
// Selain itu terdapat tambahan key “references” yang digunakan untuk membuat
// relasi ke tabel lain dengan column reference-nya adalah “primary key” tabel
// tersebut.
      },
      bookedDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tickets');
  }
};