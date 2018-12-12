import { Document, Schema, Model, model } from 'mongoose';
import { Request, Response } from 'express';
import { RestaurantUtils } from "../utils/restaurant.util";
import { RestaurantService } from "../services/restaurant.service";

export class RestaurantController {

    public restaurantService: RestaurantService;

    constructor() {
        this.restaurantService = RestaurantService.getInstance();
    }

    public addNewRestaurant(req: Request, res: Response) {

        RestaurantService.getInstance().createRestaurant(req, (err, restaurant) => {
            if (err) {
                res.send(err);
            }
            res.json(restaurant);
        });
    }

    public getRestaurants(req: Request, res: Response) {

        RestaurantService.getInstance().getAllRestaurants((err, restaurant) => {

            if (err) {
                res.send(err);
            }
            res.json(restaurant);
        });
    }

    public getRestaurantByID(req: Request, res: Response) {

        return RestaurantService.getInstance().getRestaurantByID(req.params.restaurantId, (err, restaurant) => {
            if(err){
                res.send(err);
            }
            res.json(restaurant);
        });
    }

    public updateRestaurant(req: Request, res: Response) {

        if (!RestaurantUtils.validateRestaurant(req.body)) {
            res.send('Validation failed');
            return;
        }

        RestaurantService.getInstance().findOneAndUpdate(req.params.restaurantId, req.body,(err, restaurant) => {
            if(err){
                res.send(err);
            }
            res.json(restaurant);
        });
    }

    public deleteRestaurant(req: Request, res: Response) {
        RestaurantService.getInstance().deleteRestaurant(req.params.restaurantId, (err, restaurant) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted restaurant!'});
        });
    }

}