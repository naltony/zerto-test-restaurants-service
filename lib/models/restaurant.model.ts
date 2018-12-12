import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: 'Enter a restaurant name'
    },
    address: {
        type: String,
        required: 'Enter an address name'
    },
    contact_email: {
        type: String
    },
    phone: {
        type: String
    },
    website: {
        type: String,
        label: 'The website of the restaurant.',
        optional: true,
    },
    hours: {
        type: Array,
        label: 'The opening hours of the restaurant.'
    },
    'hours.$': {
        type: Object,
        label: 'A single day the restaurant is open.',
    },
    'hours.$.day': {
        type: String,
        label: 'The day of the week the restaurant is open.',
    },
    'hours.$.from': {
        type: String,
        label: 'The time the restaurant is open from on this day.',
    },
    'hours.$.to': {
        type: String,
        label: 'The time the restaurant is open until on this day.',
    },
    'hours.$.closed': {
        type: Boolean,
        label: 'Is the restaurant closed on this day?',
    },
    menu : {
        type: Array,
        label: 'The meals offered by the restaurant.'
    },
    'menu.$': {
        type: Object,
        label: 'A single menu item ',
    },
    'menu.$.category': {
        type: String,
        label: 'Menu category to which the meal is related to',
    },
    'menu.$.name': {
        type: String,
        label: 'Meal name',
    },
    'menu.$.description': {
        type: String,
        label: 'Meal description',
    },
    'menu.$.price': {
        type: String,
        label: 'Meal price',
        required: 'Meal price'

    },
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: Date.now
    }
});