import { IApi } from "../api";
import express, { Express } from "express";
import { IRoute } from "./routes/route";
import path from "path";

export class ApiExpress implements IApi {
  private app: Express;

  private constructor(routes: IRoute[]) {
    this.app = express();
    this.app.use(express.json());
    this.addRoutes(routes);
  }

  public static create(routes: IRoute[]) {
    return new ApiExpress(routes);
  }

  private addRoutes(routes: IRoute[]) {
    routes.forEach(route => {
        const path = route.getPath();
        const method = route.getMethod();
        const handler = route.getHandler();

        this.app[method](path, handler);
    });
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      this.listRoutes();
    });
  }

  private listRoutes() {
    const routes = this.app._router.stack.
        filter((route: any) => route.route).
        map((route: any) => {
            return {
            path: route.route.path,
            method: route.route.stack[0].method,
            };
        })

    console.log(routes);
  }
}