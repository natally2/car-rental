import { Request, Response } from 'express';
import { ListCategoriesService } from './ListCategoriesService';

class ListCategoriesController {
    constructor(private listCategoriesService: ListCategoriesService) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const all = await this.listCategoriesService.execute();

        return response.json(all);
    }
}

export { ListCategoriesController };