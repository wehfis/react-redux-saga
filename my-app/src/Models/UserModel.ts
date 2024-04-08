export interface IUserModel {
    id: string;
    username: string;
};

export class UserModel implements IUserModel{
    id: string;
    username: string;

    constructor(payload: IUserModel) {
        this.id = payload.id;
        this.username = payload.username;
    }
}
