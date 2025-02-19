import { Request, Response } from "express";

import { HttpMethod, IRoute } from "../route";
import { ListProductInputDto, ListProductOutputDto, ListProductUseCase } from "../../../../../usecases/product/list-product/list-product.usecase";

export type ListProductResponseDto = {
    product: {
        id: string;
        name: string;
        price: number;
        quantity: number;
    }[];
};

export class ListProductRouteExpress implements IRoute {
    
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listProductUseCase: ListProductUseCase
  ) {}

  public static create(listProductUseCase: ListProductUseCase) {
    return new ListProductRouteExpress(
        "/products", 
        HttpMethod.GET,
        listProductUseCase
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const output: ListProductResponseDto =
        await this.listProductUseCase.execute();

      const responseBody = this.present(output);

      response.status(200).json(responseBody).send();
    };
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }

  private present(input: ListProductOutputDto): ListProductResponseDto {
    const response: ListProductResponseDto = {
      product: input.product.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      })),
    };

    return response;
  }
}