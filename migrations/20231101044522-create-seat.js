'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('seats', {
      seatID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventID: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'events',
          key: 'eventID'
        },
        allowNull: false
        //Pada bagian attribut kita menambahkan key “allowNull” bernilai false yang
        //berarti kolom eventID tidak boleh dikosongkan datanya. Selain itu terdapat
        //tambahan key “references” yang digunakan untuk membuat relasi ke tabel lain
        //dengan column reference-nya adalah “primary key” tabel tersebut.
      },
      rowNum: {
        type: Sequelize.STRING
      },
      seatNum: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('seats');
  }
};