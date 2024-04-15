import { serverUrl } from '../components/http';
import api from '../components/http';
import { IBoardModel } from '../Models/BoardModel';
import { IBoardDto } from '../Dtos/BoardDto';

class BoardService {
    readonly api: string;

    constructor(api: string) {
        this.api = api;
    }

    async getAllBoards(): Promise<IBoardModel[]> {
        try {
            const boardData = await api.get<IBoardModel[]>('/boards');
            return boardData.data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getBoard(id: string): Promise<IBoardModel> {
        try {
            const boardData = await api.get<IBoardModel>(`/board/${id}`);
            return boardData.data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async createBoard(board: IBoardDto): Promise<IBoardModel> {
        try {
            const boardData = await api.post<IBoardModel>(
                `/board`,
                board
            );
            return boardData.data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async updateBoard(
        newBoard: IBoardDto,
        board_id: string
    ): Promise<IBoardModel> {
        try {
            const boardData = await api.put<IBoardModel>(
                `/board/${board_id}`,
                newBoard
            );
            return boardData.data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async deleteBoard(board_id: string): Promise<boolean> {
        try {
            const boardData = await api.delete<boolean>(
                `/board/${board_id}`
            );
            return boardData.data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export const boardApi = new BoardService(serverUrl);
