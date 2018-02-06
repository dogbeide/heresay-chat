const _ = require('lodash');
const {expect} = require('chai');

const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'testing1',
      room: 'TestDev'
    }, {
      id: '2',
      name: 'testing2',
      room: 'DevTest'
    }, {
      id: '3',
      name: 'testing3',
      room: 'TestDev'
    }]
  });

  it('should add new user', (done) => {
    var users = new Users();
    var user = {
      id: 'asdf',
      name: 'testdev',
      room: 'ChattersRus'
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).to.deep.equal([user]);
    done();
  });

  it('should return names for TestDev room', (done) => {
    var userList = users.getUserList('TestDev');
    expect(userList).to.deep.equal(['testing1', 'testing3']);
    done();
  });

  it('should return names for DevTest room', (done) => {
    var userList = users.getUserList('DevTest');
    expect(userList).to.deep.equal(['testing2']);
    done();
  });

  it('should remove a user', () => {
    var toBeRemoved = _.cloneDeep(users.users[0]);
    var user = users.removeUser('1');
    var index = _.findIndex(users.users, (user) => user.id === toBeRemoved.id);

    expect(user).to.deep.equal(toBeRemoved);
    expect(users.users[index]).to.equal(undefined);
  });

  it('should not remove a user', () => {
    var toBeRemoved = _.cloneDeep(users.users[0]);
    var user = users.removeUser('99');
    var index = _.findIndex(users.users, (user) => user.id === toBeRemoved.id);

    expect(user).to.equal(undefined);
    expect(index).to.equal(0);
  });

  it('should find a user', () => {
    var user = users.getUser('1');
    expect(user).to.deep.equal(users.users[0]);
  });

  it('should not find a user', () => {
    var user = users.getUser('99');
    expect(user).to.equal(undefined);
  });

});
