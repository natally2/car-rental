import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDto";
import { hash } from "bcryptjs";

@injectable()
class CreateUserService {
    constructor(@inject("UsersRepository") private usersRepositories: IUsersRepository) {}

    async execute({name, email, password, driver_license}: ICreateUserDTO): Promise<void> {

        const userAlreadyExists = this.usersRepositories.findByEmail(email);

        if(!userAlreadyExists) {
            throw new Error("User already exists");
        }
        
        const passwordHash = await hash(password, 8);

        await this.usersRepositories.create({ 
            name, 
            email, 
            password: passwordHash,
            driver_license
        });
    }

}

export { CreateUserService }