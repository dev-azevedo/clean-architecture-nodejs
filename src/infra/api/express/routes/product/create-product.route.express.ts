import { Request, Response } from "express";
import { HttpMethod, IRoute } from "../route";
import { CreateProductInputDto, CreateProductUseCase } from "../../../../../usecases/product/create-product/create-product.usecase";
import { Product } from "@prisma/client";

export type CreateProductResponseDto = {
    id: string;
}

export class CreateProductRouteExpress implements IRoute {

    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createProductUseCase: CreateProductUseCase,
    ) {}

    public static create(createProductUseCase: CreateProductUseCase) {
        return new CreateProductRouteExpress("/products", HttpMethod.POST, createProductUseCase);
    }


    public getHandler() {
        return async (request: Request, response: Response) => {
          const { name, price } = request.body;

          const input: CreateProductInputDto = {
            name,
            price,
          };

          const output: CreateProductResponseDto =
            await this.createProductUseCase.execute(input);

          const responseBody = this.present(output);

          response.status(201).json(responseBody).send();
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(input: CreateProductResponseDto): CreateProductResponseDto {
        const response: CreateProductResponseDto = {
          id: input.id,
        };

        return response;
    }

}