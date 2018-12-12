import { Document, Schema, Model, model } from 'mongoose';
import { RestaurantInterface } from "../interfaces/restaurant.interface";
import { RestaurantSchema } from "../models/restaurant.model";
import { Request } from "express";
import { RestaurantUtils } from "../utils/restaurant.util";

export class RestaurantService {

    private Restaurant: Model<RestaurantInterface> = model<RestaurantInterface>('Restaurant', RestaurantSchema);
    private static instance: RestaurantService = new RestaurantService();

    constructor() { }

    public static getInstance(): RestaurantService {
        if (this.instance == undefined) {
            this.instance = new RestaurantService();
        }
        return this.instance;
    }

    public createRestaurant(req: Request, callback) {
        let newRestaurant = new this.Restaurant(req.body);

        try {
            RestaurantUtils.validateRestaurant(newRestaurant);
        } catch (e) {
            const result = e.validationResponse;
            console.error('Failed to create restaurant', JSON.stringify(result));
            console.error(e);
            callback(e, {});
            return;
        }

        newRestaurant.save(callback);
    }

    public getRestaurantByID (restaurantId: string, callback) {
        this.Restaurant.findById(restaurantId, callback);
    }

    public getAllRestaurants(callback) {
        this.Restaurant.find({}, callback);
    }

    public findOneAndUpdate (restaurantId: string, restaurant: RestaurantInterface, callback) {

        try {
            RestaurantUtils.validateRestaurant(restaurant);
        } catch (e) {
            const result = e.validationResponse;
            console.error('Failed to create restaurant', JSON.stringify(result));
            console.error(e);
            callback(e, {});
            return;
        }

        this.Restaurant.findOneAndUpdate({ _id: restaurantId }, restaurant, callback);
    }

    public deleteRestaurant (restaurantId: string, callback) {
        this.Restaurant.deleteOne({ _id: restaurantId }, callback);
    }

    public deleteAllRestaurants (callback) {
        this.Restaurant.deleteMany({}, callback);
    }
}