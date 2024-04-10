import { serverUrl } from '../components/http';
import api from '../components/http';
import { ITaskModel } from '../Models/TaskModel';
import { ITaskDto } from '../Dtos/TaskDto';

class TaskService {
    readonly api: string;

    constructor(api: string) {
        this.api = api;
    }

    async getAllTasks(board_id: string): Promise<ITaskModel[]> {
        try {
            const taskData = await api.get<ITaskModel[]>(
                `/tasks/${board_id}`
            );
            console.log(taskData.data);
            return taskData.data;
        } catch (error: any) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }

    async getTask(id: string): Promise<ITaskModel> {
        try {
            const taskData = await api.get<ITaskModel>(
                `/task/${id}`
            );
            console.log(taskData.data);
            return taskData.data;
        } catch (error: any) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }
    async createTask(task: ITaskDto): Promise<ITaskModel> {
        try {
            const taskData = await api.post<ITaskModel>(
                `/task`,
                task
            );
            console.log(taskData.data);
            return taskData.data;
        } catch (error: any) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }
    async updateTask(
        newTask: ITaskDto,
        task_id: string
    ): Promise<ITaskModel> {
        try {
            const taskData = await api.put<ITaskModel>(
                `/task/${task_id}`,
                newTask
            );
            console.log(taskData.data);
            return taskData.data;
        } catch (error: any) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }
    async deleteTask(task_id: string): Promise<boolean> {
        try {
            const taskData = await api.delete<boolean>(
                `/task/${task_id}`
            );
            console.log(taskData.data);
            return taskData.data;
        } catch (error: any) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }
}

export const taskApi = new TaskService(serverUrl);
