import { serverUrl } from '../components/http';
import api from '../components/http';
import { ICategoryModel } from '../Models/CategoryModel';
import { ICategoryDto } from '../Dtos/CategoryDto';

class CategoryService {
    readonly api: string;

    constructor(api: string) {
        this.api = api;
    }

    async getAllCategories(board_id: string): Promise<ICategoryModel[]> {
        try {
            const categoryData = await api.get<ICategoryModel[]>(
                `/categories/${board_id}`
            );
            return categoryData.data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getCategory(id: string): Promise<ICategoryModel> {
        try {
            const categoryData = await api.get<ICategoryModel>(
                `/category/${id}`
            );
            return categoryData.data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async createCategory(category: ICategoryDto): Promise<ICategoryModel> {
        try {
            const categoryData = await api.post<ICategoryModel>(
                `/category`,
                category
            );
            return categoryData.data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async updateCategory(
        newCategory: ICategoryDto,
        category_id: string
    ): Promise<ICategoryModel> {
        try {
            const categoryData = await api.put<ICategoryModel>(
                `/category/${category_id}`,
                newCategory
            );
            return categoryData.data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async deleteCategory(category_id: string): Promise<boolean> {
        try {
            const categoryData = await api.delete<boolean>(
                `/category/${category_id}`
            );
            return categoryData.data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export const categoryApi = new CategoryService(serverUrl);
