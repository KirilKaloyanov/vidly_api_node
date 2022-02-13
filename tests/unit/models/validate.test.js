const { validate } = require('../../../models/user');
const Joi = require('joi');

describe('validate user', () => {
    it('should return true when given a valid user object', () => {
        const user = {
            name: 'User11',
            password: '123456',
            email: 'admin@userdomain.com'
        };
        const result = validate(user);
        expect(result).toBe(true);
    });
});