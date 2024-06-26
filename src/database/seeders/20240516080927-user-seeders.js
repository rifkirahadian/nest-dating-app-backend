/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const { faker } = require('@faker-js/faker');

    await queryInterface.bulkInsert(
      'users',
      [...Array(40).keys()].map(() => ({
        name: faker.person.fullName({ sex: 'male' }),
        email: faker.internet.email(),
        gender: 'male',
        password:
          '$2b$10$BPx/8DUduOQ8UVDYr2Gy7.jGzYn1zlKTQRImDyZ6X7qRf.yie05ZK',
      })),
      {},
    );
    console.log('Created 1');

    await queryInterface.bulkInsert(
      'users',
      [...Array(40).keys()].map(() => ({
        name: faker.person.fullName({ sex: 'male' }),
        email: faker.internet.email(),
        gender: 'male',
        password:
          '$2b$10$BPx/8DUduOQ8UVDYr2Gy7.jGzYn1zlKTQRImDyZ6X7qRf.yie05ZK',
      })),
      {},
    );
    console.log('Created 2');

    await queryInterface.bulkInsert(
      'users',
      [...Array(40).keys()].map(() => ({
        name: faker.person.fullName({ sex: 'female' }),
        email: faker.internet.email(),
        gender: 'female',
        password:
          '$2b$10$BPx/8DUduOQ8UVDYr2Gy7.jGzYn1zlKTQRImDyZ6X7qRf.yie05ZK',
      })),
      {},
    );
    console.log('Created 3');

    await queryInterface.bulkInsert(
      'users',
      [...Array(40).keys()].map(() => ({
        name: faker.person.fullName({ sex: 'female' }),
        email: faker.internet.email(),
        gender: 'female',
        password:
          '$2b$10$BPx/8DUduOQ8UVDYr2Gy7.jGzYn1zlKTQRImDyZ6X7qRf.yie05ZK',
      })),
      {},
    );
    console.log('Created 4');
  },

  async down() {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
