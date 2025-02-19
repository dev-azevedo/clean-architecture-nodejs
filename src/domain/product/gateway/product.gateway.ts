import { Product } from "../entity/product.entity";

export interface IProductGateway {
    save(product: Product): Promise<void>;
    list(): Promise<Product[]>;
}