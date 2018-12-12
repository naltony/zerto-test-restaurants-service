import { RestaurantInterface } from "../interfaces/restaurant.interface";
import { ValidationResponse } from "./validation-response";
import { ValidationError } from "./validation.error";
import { WeekdaysUtils } from "./weekdays.utils";

export class RestaurantUtils {

    static regexValidations = {
        email: '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
        phone: '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$',
        url: '^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$',
        hour: '^(\\d{1,2}):(\\d{2})(?::(\\d{2}))?$'
    }

    static validationErrorCodes = {
        2000: { msg: 'Missing name' },
        2001: { msg: 'Missing address' },
        2002: { msg: 'Invalid contact email' },
        2003: { msg: 'Invalid phone format' },
        2004: { msg: 'Invalid website format' },
        2005: { msg: 'Invalid opening hour format' },
        2006: { msg: 'Invalid weekday' },
    }

    static validateRestaurant(restaurant: RestaurantInterface): ValidationResponse {
        // run validations

        if(restaurant.name.length == 0) {
            throw new ValidationError(this.validationErrorCodes[2000].msg,
                new ValidationResponse(false, 2000, this.validationErrorCodes[2000].msg));
        }

        if(restaurant.address.length == 0) {
            throw new ValidationError(this.validationErrorCodes[2001].msg,
                new ValidationResponse(false, 2001, this.validationErrorCodes[2001].msg));
        }

        if (!this.isValidRegex('email', restaurant.contact_email)) {
            throw new ValidationError(this.validationErrorCodes[2002].msg,
                new ValidationResponse(false, 2002, this.validationErrorCodes[2002].msg));
        }

        if (!this.isValidRegex('phone', restaurant.phone)) {
            throw new ValidationError(this.validationErrorCodes[2003].msg,
                new ValidationResponse(false, 2003, this.validationErrorCodes[2003].msg));
        }

        if (restaurant.website!=undefined && !this.isValidRegex('url', restaurant.website)) {
            throw new ValidationError(this.validationErrorCodes[2004].msg,
                new ValidationResponse(false, 2004, this.validationErrorCodes[2004].msg));
        }

        for (let hoursItem of restaurant.hours) {
            let weekday = hoursItem.day;
            if(!WeekdaysUtils.isValidWeekDay(weekday)) {
                throw new ValidationError(this.validationErrorCodes[2006].msg,
                    new ValidationResponse(false, 2006, this.validationErrorCodes[2006].msg));
            }

            if(!this.isValidRegex('hour', hoursItem.from) || !this.isValidRegex('hour', hoursItem.to)) {
                throw new ValidationError(this.validationErrorCodes[2005].msg,
                    new ValidationResponse(false, 2005, this.validationErrorCodes[2005].msg));
            }
        }

        return new ValidationResponse(true, undefined, undefined);

        // Unique restaurant name validation
    }

    static isValidRegex(regex: string, value: string): boolean {
        let regexp = new RegExp(this.regexValidations[regex]);
        return regexp.test(value);
    }
}