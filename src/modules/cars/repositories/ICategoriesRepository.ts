import { Category } from "../entities/Category";

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    findByName(name: string): Category;
    create({ name, description }: ICreateCategoryDTO): void
    list(): Category[];
}

export { ICategoriesRepository, ICreateCategoryDTO }