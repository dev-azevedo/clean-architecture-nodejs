import { Product } from "../../../domain/product/entity/product.entity";
import { IProductGateway } from "../../../domain/product/gateway/product.gateway";
import { IUseCase } from "../../usecase";

export type CreateProductInputDto = {
    name: string;
    price: number;
}

export type CreateProductOutputDto = {
    id: string;
}


export class CreateProductUseCase implements IUseCase<CreateProductInputDto, CreateProductOutputDto> {

    private constructor(private readonly productGateway: IProductGateway) {}
    
    public static create(productGateway: IProductGateway) {
        return new CreateProductUseCase(productGateway);
    }
    
    public async execute({name, price}: CreateProductInputDto): Promise<CreateProductOutputDto> {
        const aProduct = Product.create(name, price);
        
        await this.productGateway.save(aProduct);

        const output = this.presentOutput(aProduct);

        return output;
    }

    private presentOutput(product: Product): CreateProductOutputDto {
        const output: CreateProductOutputDto = {
          id: product.id,
        };

        return output;
    }
}