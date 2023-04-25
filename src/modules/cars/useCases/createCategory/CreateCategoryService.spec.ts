import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryService } from "./CreateCategoryService";

let createCategoryService: CreateCategoryService;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create category", () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryService = new CreateCategoryService(categoriesRepositoryInMemory);
    });

    it("should be able to create a new category", async () => {
        const category = {
            name: "category test",
            description: "testing"
        }

        await createCategoryService.execute({
            name: category.name,
            description: category.description
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);
        
        expect(categoryCreated).toHaveProperty("id");
        expect(categoryCreated.name).toEqual(category.name);
    });

    it("should not be able to create a new category with existant name", async() => {
        expect(async () => {
            const category = {
                name: "category test",
                description: "testing"
            }
    
            await createCategoryService.execute({
                name: category.name,
                description: category.description
            });
    
            await createCategoryService.execute({
                name: category.name,
                description: category.description
            });
        }).rejects.toBeInstanceOf(AppError);
    });

});