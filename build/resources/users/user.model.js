"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
/**
 * Class to create a user object
 * @class
 */
class User {
    /**
     * @param {Object} object  User data
     * @param {string} object.id  User id automatically generated
     * @param {string} object.name User name
     * @param {string} object.login User login
     * @param {string} object.password User password
     */
    constructor({ id = uuid_1.v4(), name = 'USER', login = 'user', password = 'P@55w0rd', }) {
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
}
exports.default = User;
