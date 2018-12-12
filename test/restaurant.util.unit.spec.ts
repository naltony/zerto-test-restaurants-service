import * as chai from 'chai';
import 'mocha';
import * as mochaLog from '../node_modules/mocha-report-log';
import { RestaurantUtils } from '../lib/utils/restaurant.util';
import { RestaurantInterface } from "../lib/interfaces/restaurant.interface";
import { OpeningHoursInterface } from "../lib/interfaces/opening-hours.interface";

const expect = chai.expect;

describe('Restaurant validations - invalid inputs', () => {
    it('should return false, missing name', () => {
        const restaurant: RestaurantInterface = {
            name: '',
            address: '',
            contact_email: '',
            phone: '',
            website: '',
            hours: [],
            menu: [],
            created_date: new Date()
        };

        try {
            RestaurantUtils.validateRestaurant(restaurant);
        } catch (e) {
            const result = e.validationResponse;
            expect(result.isValid).to.equal(false);
            expect(result.responseCode).to.equal(2000);
            expect(result.message).to.equal('Missing name');

        }
    })

    it('should return false, missing address', () => {
        const restaurant: RestaurantInterface = {
            name: 'My test name',
            address: '',
            contact_email: '',
            phone: '',
            website: '',
            hours: [],
            menu: [],
            created_date: new Date()
        };

        try {
            RestaurantUtils.validateRestaurant(restaurant);
        } catch (e) {
            const result = e.validationResponse;
            expect(result.isValid).to.equal(false);
            expect(result.responseCode).to.equal(2001);
            expect(result.message).to.equal('Missing address');
        }
    })

    it('should return false, invalid contact_email', () => {
        const restaurant: RestaurantInterface = {
            name: 'My test name',
            address: 'test address',
            contact_email: 'wefwef',
            phone: '',
            website: '',
            hours: [],
            menu: [],
            created_date: new Date()
        };

        try {
            RestaurantUtils.validateRestaurant(restaurant);
        } catch (e) {
            const result = e.validationResponse;
            expect(result.isValid).to.equal(false);
            expect(result.responseCode).to.equal(2002);
            expect(result.message).to.equal('Invalid contact email');
        }
    })

    it('should return false, invalid phone format', () => {
        const restaurant: RestaurantInterface = {
            name: 'My test name',
            address: 'test address',
            contact_email: 'nirit@gmail.com',
            phone: 'dwe23',
            website: '',
            hours: [],
            menu: [],
            created_date: new Date()
        };

        try {
            RestaurantUtils.validateRestaurant(restaurant);
        } catch (e) {
            const result = e.validationResponse;
            expect(result.isValid).to.equal(false);
            expect(result.responseCode).to.equal(2003);
            expect(result.message).to.equal('Invalid phone format');
        }
    })

    it('should return false, invalid website format', () => {
        const restaurant: RestaurantInterface = {
            name: 'My test name',
            address: 'test address',
            contact_email: 'nirit@gmail.com',
            phone: '+1-1232-432',
            website: 'wewe!#$@',
            hours: [],
            menu: [],
            created_date: new Date()
        };


        try {
            RestaurantUtils.validateRestaurant(restaurant);
        } catch (e) {
            const result = e.validationResponse;
            expect(result.isValid).to.equal(false);
            expect(result.responseCode).to.equal(2004);
            expect(result.message).to.equal('Invalid website format');
        }

    })


    it('should return false, invalid hour format', () => {
        const restaurant: RestaurantInterface = {
            name: 'My test name',
            address: 'test address',
            contact_email: 'nirit@gmail.com',
            phone: '+1-1232-432',
            website: 'www.rest.co.il',
            hours: [<OpeningHoursInterface>{day:'SUNDAY', from: '12:00AM', to: '23:00'}],
            menu: [],
            created_date: new Date()
        };

        try {
            RestaurantUtils.validateRestaurant(restaurant);
        } catch (e) {
            const result = e.validationResponse;
            mochaLog('This is result: ' + JSON.stringify(result));

            expect(result.isValid).to.equal(false);
            expect(result.responseCode).to.equal(2005);
            expect(result.message).to.equal('Invalid opening hour format');
        }

    })

    it('should return false, invalid weekday', () => {
        const restaurant: RestaurantInterface = {
            name: 'My test name',
            address: 'test address',
            contact_email: 'nirit@gmail.com',
            phone: '+1-1232-432',
            website: 'www.rest.co.il',
            hours: [<OpeningHoursInterface>{day:'SUND', from: '12:00', to: '23:00'}],
            menu: [],
            created_date: new Date()
        };

        try {
            RestaurantUtils.validateRestaurant(restaurant);
        } catch (e) {
            const result = e.validationResponse;
            mochaLog('This is result: ' + JSON.stringify(result));

            expect(result.isValid).to.equal(false);
            expect(result.responseCode).to.equal(2006);
            expect(result.message).to.equal('Invalid weekday');
        }

    })
})

describe('Restaurant validations - valid inputs', () => {

    it('should return true, valid contact_email', () => {
        const restaurant: RestaurantInterface = {
            name: 'My test name',
            address: 'test address',
            contact_email: 'nirit@gmail.com',
            phone: '123',
            website: 'www.rest.com',
            hours: [],
            menu: [],
            created_date: new Date()
        };

        const result = RestaurantUtils.validateRestaurant(restaurant);
        mochaLog('This is result: ' + JSON.stringify(result));
        expect(result.isValid).to.equal(true);

    })

    it('should return true, valid phone number', () => {
        const restaurant: RestaurantInterface = {
            name: 'My test name',
            address: 'test address',
            contact_email: 'nirit@gmail.com',
            phone: '+1-23-123123-243',
            website: 'www.rest.co.il',
            hours: [],
            menu: [],
            created_date: new Date()
        };

        const result = RestaurantUtils.validateRestaurant(restaurant);
        mochaLog('This is result: ' + JSON.stringify(result));
        expect(result.isValid).to.equal(true);

    })

    it('should return true, valid website', () => {
        const restaurant: RestaurantInterface = {
            name: 'My test name',
            address: 'test address',
            contact_email: 'nirit@gmail.com',
            phone: '+1-23-123123-243',
            website: 'www.rest.co.il',
            hours: [],
            menu: [],
            created_date: new Date()
        };

        const result = RestaurantUtils.validateRestaurant(restaurant);
        mochaLog('This is result: ' + JSON.stringify(result));
        expect(result.isValid).to.equal(true);

    })

    it('should return true, valid opening hours', () => {
        const restaurant: RestaurantInterface = {
            name: 'My test name',
            address: 'test address',
            contact_email: 'nirit@gmail.com',
            phone: '+1-1232-432',
            website: 'www.rest.co.il',
            hours: [<OpeningHoursInterface>{day:'SUNDAY', from: '12:00', to: '23:00'}],
            menu: [],
            created_date: new Date()
        };

        const result = RestaurantUtils.validateRestaurant(restaurant);
        mochaLog('This is result: ' + JSON.stringify(result));
        expect(result.isValid).to.equal(true);
    })
})