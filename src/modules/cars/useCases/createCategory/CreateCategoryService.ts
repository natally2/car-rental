import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryService {
    private categoriesRepository: ICategoriesRepository;

    constructor(@inject("CategoriesRepository") categoriesRepository: ICategoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

        if(categoryAlreadyExists) {
            throw new AppError('Category already exists!');
        }
    
        await this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryService }
