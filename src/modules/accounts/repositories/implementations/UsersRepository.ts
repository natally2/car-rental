import { Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDto";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";
import AppDataSource from "../../../../database/data-source";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }
    
    async create({name, email, password, driver_license}: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            password,
            driver_license,
            email 
        });
        
        await this.repository.save(user);
    }
}

export { UsersRepository };