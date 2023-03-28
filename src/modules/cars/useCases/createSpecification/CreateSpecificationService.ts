import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationService {
    private specificationRepository: SpecificationsRepository;

    constructor(specificationRepository: SpecificationsRepository) {
        this.specificationRepository = specificationRepository;
    }

    execute({ name, description }: IRequest): void {
        const specificationAlreadyExists = this.specificationRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error('Specification already exists!');
        }

        this.specificationRepository.create({
            name, 
            description
        })
    }
}

export { CreateSpecificationService };