import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/routes";
import * as mongoose from "mongoose";

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'mongodb://restUser:123qwe@ds125574.mlab.com:25574/restaurants';


    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // grabs the Controller from IoC container and registers all the endpoints
        // const controllers: RestaurantController[] = container.getAll<RestaurantController>(TYPES.Controller);
        // controllers.forEach(controller => controller.register(this.app));

        // setup express middleware logging and error handling
        this.app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
            console.error(err.stack);
            next(err);
        });

        this.app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
            res.status(500).send('Internal Server Error');
        });
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }

}

export default new App().app;