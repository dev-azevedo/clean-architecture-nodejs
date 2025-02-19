import { ApiExpress } from "./infra/api/express/api.express";
import { CreateProductRouteExpress } from "./infra/api/express/routes/product/create-product.route.express";
import { ListProductRouteExpress } from "./infra/api/express/routes/product/list-product.route.express";
import { ProductRepositoryPrsima } from "./infra/repositories/product/product.repository.prisma";
import { prisma } from "./package/prisma/prisma";
import { CreateProductUseCase } from "./usecases/product/create-product/create-product.usecase";
import { ListProductUseCase } from "./usecases/product/list-product/list-product.usecase";

const main = async () => {
    const aRepository = ProductRepositoryPrsima.create(prisma);
    const createProductUseCase = CreateProductUseCase.create(aRepository);
    const listProductUseCase = ListProductUseCase.create(aRepository);
    

    const createProductRoute = CreateProductRouteExpress.create(createProductUseCase);
    const listProductRoute = ListProductRouteExpress.create(listProductUseCase);

    
    const port = 8000;
    const api = ApiExpress.create([createProductRoute, listProductRoute]);
    api.start(port);
};

main();