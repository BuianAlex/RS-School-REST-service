const { v4: uuidv4 } = require('uuid');
/**
 * Class to create a user object
 */
class User {
  /**
   * @param {uuidv4} id  User id automatically generated
   * @param {string} name User name
   * @param {string} login User login
   * @param {string} password User password
   */
  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Function toResponse clearing object user for response
   *
   * @param {Object} user User object
   * @returns {Object} user id, name, login
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }

  // static deleteUser(userId){

  // }
}

module.exports = User;
