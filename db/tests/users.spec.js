require('dotenv').config();

const { 
  createUser,
  getAllUsers,
  getUserByUsername,
} = require('../index')
//const { buildTables } = require('../init_db')
const { handle } = require('../../index');
const client = require('../client');

describe('Users Table', () => {
  beforeAll(async () => {
    //await buildTables();
  })
  afterAll(async () => {
    await client.end();
    handle.close();
  });

  describe('createUser', () => {

    it('adds a user object to the users table', async () => {
      await createUser({
        username: 'FakeBob',
        password: 'FakeBobsPassword',
        email: 'fake-bob@email.com'
      });
      const {rows: [user]} = await client.query(`
        SELECT * FROM users
        WHERE username = ($1);
      `, ['FakeBob'])
      expect(user.username).toEqual('FakeBob');
    });

    it('returns not undefined', async () => {
      const {rows} = await client.query(`
        SELECT * FROM users;
      `);
      console.log('rows:', rows);

      const fakeUser = await createUser({
        username: 'FakeJeff',
        password: 'FakeJeffsPassword',
        email: 'fake-Jeff@email.com'
      });
      console.log('fakeUser:', fakeUser);
      expect(fakeUser).toBe(true);
    });
  });

  let usersForGetAllUsers;
  describe('getAllUsers', () => {
    it('returns an array', async () => {
      usersForGetAllUsers = await getAllUsers();
      expect(Array.isArray(users)).toBe(true);
    });
    it('contains only user objects', async () => {
      let allAreUsers = true;
      usersForGetAllUsers.forEach(user => {
        if (!user.username || !user.email) allAreUsers = false;
      });
      expect(allAreUsers).toBe(true);
    });
    it('contains the correct number of user objects', async () => {
      expect(usersForGetAllUsers.length).toEqual(3);
    });
    it('contains users without passwords', async () => {
      let noneContainPasswords = true;
      usersForGetAllUsers.forEach(user => {
        if (user.password) noneContainPasswords = false;
      });
      expect(noneContainPasswords).toBe(true);
    }); 
  });

  describe('getUserByUsername', () => {
    it('returns a user object', async () => {
      await createUser({
        username: 'FakeBob', 
        password: 'FakeBobsPassword',
        email: 'fake-bob@email.com',
        address: '123 Bob St'
      });

      const user = await getUserByUsername('FakeBob');
      expect(
        user.address 
        && user.email 
        && user.username
      ).toEqual(true);
    }); 
    it('returns the correct user object')
  });
});