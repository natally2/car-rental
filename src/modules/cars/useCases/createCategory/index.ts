import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryService } from "./CreateCategoryService";

export default() => {
    const categoriesRepository = new CategoriesRepository();
    const createCategoryService = new CreateCategoryService(categoriesRepository);
    
    const createCategoryController = new CreateCategoryController(createCategoryService);

    return createCategoryController;
}