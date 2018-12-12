import { OpeningHoursInterface } from "./opening-hours.interface";
import { MenuItemInterface } from "./menu-item.interface";

export interface RestaurantInterface {
    name: string,
    address: string,
    phone: string,
    contact_email: string,
    website: string,
    hours: OpeningHoursInterface[],
    menu: MenuItemInterface[],
    created_date: Date
}