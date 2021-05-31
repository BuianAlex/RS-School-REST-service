import { v4 as uuidv4 } from 'uuid';
/**
 * Class to create a user object
 * @class
 */
interface IUser{
  id: string;
  name: string,
  login: string,
  password: string,
}
class User implements IUser  {
    id: string;
    name: string;
    login: string;
    password: string;
  /**
   * @param {Object} object  User id automatically generated
   * @param {string} object.id  User id automatically generated
   * @param {string} object.name User name
   * @param {string} object.login User login
   * @param {string} object.password User password
   */
  

  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  }: IUser) {
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
  static toResponse(user:IUser) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
