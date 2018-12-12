import { Request, Response } from "express";
import { RestaurantController } from "../controllers/restaurant.controller";

export class Routes {

    public restaurantController: RestaurantController = new RestaurantController();

    public routes(app): void {

        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'service is up'
                })
            })

        // restaurant
        app.route('/api/v1/restaurant')
        // GET endpoint
            .get(this.restaurantController.getRestaurants)
            // POST endpoint
            .post(this.restaurantController.addNewRestaurant)

        // Contact detail
        app.route('/api/v1/restaurant/:restaurantId')
        // get specific contact
            .get(this.restaurantController.getRestaurantByID)
            .put(this.restaurantController.updateRestaurant)
            .delete(this.restaurantController.deleteRestaurant)
    }
}