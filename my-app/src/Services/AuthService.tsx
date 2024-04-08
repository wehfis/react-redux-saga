import { IUserDto } from '../Dtos/UserDto';
import axios from 'axios';
import { serverUrl } from '../components/http';
import api from '../components/http';
import { IAuthResponseModel } from '../Models/AuthResponseModel';
import Cookies from 'js-cookie';


export interface IUserResult {
    accessToken: string | null;
    refreshToken: string | null;
    success: boolean;
    message: string;
}

class AuthService {

    async login(user: IUserDto): Promise<IUserResult> {
        try {
            console.log('call')
            const accessToken = await api.post<IAuthResponseModel>('/user/login', user);
            localStorage.setItem('token', accessToken.data.accessToken);
            Cookies.set('refreshToken', accessToken.data.refreshToken);
            return {
                accessToken: accessToken.data.accessToken,
                refreshToken: accessToken.data.refreshToken,
                success: true,
                message: 'Successfully logged in.'
            };
        } catch (error: any) {
            return {
                accessToken: null,
                refreshToken: null,
                success: false,
                message: `Error while logging: ${error.message}`
            };
        }
    }
    async register(user: IUserDto) {
        try {
            const accessToken = await api.post<IAuthResponseModel>('user/register', user);
            localStorage.setItem('token', accessToken.data.accessToken);
            Cookies.set('refreshToken', accessToken.data.refreshToken);
            return {
                accessToken: accessToken.data.accessToken,
                refreshToken: accessToken.data.refreshToken,
                success: true,
                message: 'Successfully signed up.'
            };
        } catch (error: any) {
            return {
                accessToken: null,
                refreshToken: null,
                success: false,
                message: `Error while signing up: ${error.message}`
            };
        }
    }
    async logout(): Promise<IUserResult> {
        try {
            await api.post('/user/logout');
            localStorage.setItem('token', '');
            Cookies.set('refreshToken', '');
            return {
                accessToken: null,
                refreshToken: null,
                success: true,
                message: 'Successfully logged out.'
            };
        } catch (error: any) {
            return {
                accessToken: null,
                refreshToken: null,
                success: false,
                message: `Error while logging out: ${error.message}`
            };
        }
    }
}

export const authApi = new AuthService();