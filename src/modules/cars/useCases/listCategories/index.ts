import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesService } from "./ListCategoriesService";


export default() => {
    const categoriesRepository = new CategoriesRepository();
    const listCategoriesService = new ListCategoriesService(categoriesRepository);
    const listCategoriesController = new ListCategoriesController(listCategoriesService);

    return listCategoriesController;
}