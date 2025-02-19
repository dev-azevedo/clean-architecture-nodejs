import { Product } from "../../../domain/product/entity/product.entity";
import { IProductGateway } from "../../../domain/product/gateway/product.gateway";
import { IUseCase } from "../../usecase";

export type ListProductInputDto = void;

export type ListProductOutputDto = {
    product: {
        id: string;
        name: string;
        price: number;
        quantity: number;
    }[];
};

export class ListProductUseCase implements IUseCase<ListProductInputDto, ListProductOutputDto> {

    private constructor(private readonly productGateway: IProductGateway) {}

    public static create(productGateway: IProductGateway) {
        return new ListProductUseCase(productGateway);
    }

    public async execute(): Promise<ListProductOutputDto> {
        const aProducts = await this.productGateway.list();

        const output = this.presentOutput(aProducts);

        return output;
    }

    private presentOutput(products: Product[]): ListProductOutputDto {
        const output: ListProductOutputDto = {
            product: products.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: product.quantity,
            })),
        };

        return output;
    }
}