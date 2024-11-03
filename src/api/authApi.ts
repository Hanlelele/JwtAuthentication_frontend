import customAxios from './customApi';
import { UserSignup, UserLogIn } from '../types';

class AuthApi {
    async register(data: UserSignup) {
        try {
            const response = await customAxios.post(`/auth/register`, data);
            return response;
        } catch (error: any) {
            return error.response;
        }
    }

    async login(data: UserLogIn) {
        try {
            const response = await customAxios.post(`/auth/login`, data);
            return response;
        } catch (error: any) {
            return error.response;
        }
    }

    async getProfile() {
        try {
            const response = await customAxios.get(`/auth/profile`, {});
            return response;
        } catch (error: any) {
            return error.response;
        }
    }

    async logout() {
        try {
            const response = await customAxios.post(`/auth/logout`, {});
            return response;
        } catch (error: any) {
            return error.response;
        }
    }
}

export default new AuthApi();
