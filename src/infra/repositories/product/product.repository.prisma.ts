import { PrismaClient } from "@prisma/client";
import { Product } from "../../../domain/product/entity/product.entity";
import { IProductGateway } from "../../../domain/product/gateway/product.gateway";

export class ProductRepositoryPrsima implements IProductGateway {

    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new ProductRepositoryPrsima(prismaClient);
    }

    public async save(product: Product): Promise<void> {
        const data = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
        };

        try {
            await this.prismaClient.product.create({
                data,
            });
        } catch (error) {
            console.error(error);
        }
    }
    
    public async list(): Promise<Product[]> {
        const products = await this.prismaClient.product.findMany();

        const productList = products.map(product => Product.with({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
        }));

        return productList;
    }
    
}