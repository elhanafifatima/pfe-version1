import axios from 'axios';
const AUTH_API = 'http://localhost:8081/api/auth';
const authService = {
    login: async (creds) => {
        if (creds.email === 'user@vitalis.com' && creds.password === 'password') {
            return { id: '123', firstName: 'John', lastName: 'Doe', email: 'user@vitalis.com', token: 'mock-jwt' };
        }
        throw new Error('Invalid');
    },
    register: async (data) => ({ success: true }),
    getProfile: async () => ({ firstName: 'John', lastName: 'Doe', email: 'user@vitalis.com', phone: '0612345678', birthDate: '1990-05-15' })
};
export default authService;
