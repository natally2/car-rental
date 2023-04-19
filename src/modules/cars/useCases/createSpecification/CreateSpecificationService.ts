import { inject, injectable } from "tsyringe";
import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationService {
    private specificationRepository: SpecificationsRepository;

    constructor(@inject("SpecificationsRepository") specificationRepository: SpecificationsRepository) {
        this.specificationRepository = specificationRepository;
    }

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadyExists = await this.specificationRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new AppError('Specification already exists!');
        }

        this.specificationRepository.create({
            name, 
            description
        })
    }
}

export { CreateSpecificationService };