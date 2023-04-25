import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDto";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserService } from "../createUser/CreateUserService";
import { AuthenticateUserService } from "./AuthenticateUserService";


let userRepositoryInMemory: UserRepositoryInMemory;
let authenticatedUserService: AuthenticateUserService;
let createUserserivce: CreateUserService;

describe("Authenticated User", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        authenticatedUserService = new AuthenticateUserService(userRepositoryInMemory); 
        createUserserivce = new CreateUserService(userRepositoryInMemory);
    });

    it("should be able to authenticated an user", async() => {
        const user: ICreateUserDTO = {
            driver_license: "000123",
            email: "user@test.com",
            password: "1234",
            name: "user test"
        }

        await createUserserivce.execute(user);

        const result = await authenticatedUserService.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an nonexistent user", async() => {
        expect(async () => {
            await authenticatedUserService.execute({
                email: "wrong@test.com",
                password: "123"
            })
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate with incorrect password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "1111",
                email: "user@user.com",
                password: "1234",
                name: "User test"
            }

            await createUserserivce.execute(user);

            await authenticatedUserService.execute({
                email: user.email,
                password: "incorrectPassword"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

});