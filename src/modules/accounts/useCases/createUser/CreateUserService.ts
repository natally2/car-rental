import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDto";

@injectable()
class CreateUserService {
    constructor(@inject("UsersRepository") private usersRepositories: IUsersRepository) {}

    async execute({name, email, password, driver_license}: ICreateUserDTO): Promise<void> {
        await this.usersRepositories.create({ 
            name, 
            email, 
            password,
            driver_license
        });
    }

}

export { CreateUserService }