import * as chai from 'chai';
import * as chaiHttp from '../node_modules/chai-http';

import 'mocha';
import * as mochaLog from '../node_modules/mocha-report-log';
import { RestaurantInterface } from "../lib/interfaces/restaurant.interface";

const expect = chai.expect;
const assert = chai.assert;

describe('Service tests', () => {

    chai.use(chaiHttp);

    // beforeEach((done) => { //Before each test we empty the database
    //     RestaurantService.getInstance().deleteAllRestaurants((err) => {
    //         done();
    //     });
    // });

    describe('GET /api/v1/restaurant', () => {
        it('it should GET all the restaurants', (done) => {
            chai.request('localhost:3001')
                .get('/api/v1/restaurant')
                .end((err, result) => {
                    expect(result.status).to.equal(200);
                    // assert.isArray(resObj);
                    // res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('POST /api/v1/restaurant', () => {

        const restaurant: RestaurantInterface = {
            name: 'My test name112233',
            address: 'test address',
            contact_email: 'wefwef@de.de',
            phone: '+1-234-234-2343',
            website: 'www.rest.com',
            hours: [],
            menu: [],
            created_date: new Date()
        };
        let restId: string;

        it('it should create a new restaurant', (done) => {
            chai.request('localhost:3001')
                .post('/api/v1/restaurant')
                .send(restaurant)
                .end((err, result) => {
                    expect(result).to.have.status(200);
                    restId = result.body._id;

                    done();
                });
        });

        it('it should verify the restaurant creation', (done) => {
            chai.request('localhost:3001')
                .get('/api/v1/restaurant/'+restId)
                .send(restaurant)
                .end((err, result) => {
                    expect(result).to.have.status(200);
                    assert.notDeepEqual(result.body, restaurant);
                    done();
                });
        });

        it('it should update the restaurant', (done) => {

            restaurant.name += ' updated';
            chai.request('localhost:3001')
                .put('/api/v1/restaurant/'+restId)
                .send(restaurant)
                .end((err, result) => {
                    expect(result).to.have.status(200);
                    assert.notDeepEqual(result.body, restaurant);
                    done();
                });
        });

        it('it should delete the restaurant', (done) => {

            restaurant.name += ' updated';
            chai.request('localhost:3001')
                .del('/api/v1/restaurant/'+restId)
                .send(restaurant)
                .end((err, result) => {
                    expect(result).to.have.status(200);
                    done();
                });
        });
    });
})