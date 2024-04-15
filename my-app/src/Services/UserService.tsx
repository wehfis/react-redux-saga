import { serverUrl } from '../components/http';
import api from '../components/http';
import { IUserModel } from '../Models/UserModel';


interface IUserResult {
    success: boolean;
    message: string;
}

class UserService {
    readonly api: string;
    
    constructor(api: string) {
        this.api = api
    }

    async getCurrentUser(): Promise<IUserModel> {
        try {
            const userData = await api.get<IUserModel>('/user/me');
            return userData.data;
        } catch (error: any) {
            localStorage.setItem('token', '');
            throw new Error(error.message);
        }
    }
}

export const userApi = new UserService(serverUrl);