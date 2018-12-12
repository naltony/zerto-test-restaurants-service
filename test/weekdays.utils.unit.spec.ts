import * as chai from 'chai';
import 'mocha';
import { WeekdaysUtils } from '../lib/utils/weekdays.utils';

const expect = chai.expect;

describe('Weekdays utils test', () => {
    it('should return true for SUNDAY', () => {
        const result = WeekdaysUtils.isValidWeekDay('SUNDAY');
        expect(result).to.equal(true);
    })

    it('should return true for sunday - verify ignore case', () => {
        const result = WeekdaysUtils.isValidWeekDay('sunday');
        expect(result).to.equal(true);
    })

    it('should return true for MONDAY', () => {
        const result = WeekdaysUtils.isValidWeekDay('MONDAY');
        expect(result).to.equal(true);
    })

    it('should return true for TUESDAY', () => {
        const result = WeekdaysUtils.isValidWeekDay('TUESDAY');
        expect(result).to.equal(true);
    })

    it('should return true for WEDNESDAY', () => {
        const result = WeekdaysUtils.isValidWeekDay('WEDNESDAY');
        expect(result).to.equal(true);
    })

    it('should return true for THURSDAY', () => {
        const result = WeekdaysUtils.isValidWeekDay('THURSDAY');
        expect(result).to.equal(true);
    })

    it('should return true for FRIDAY', () => {
        const result = WeekdaysUtils.isValidWeekDay('FRIDAY');
        expect(result).to.equal(true);
    })

    it('should return true for SATURDAY', () => {
        const result = WeekdaysUtils.isValidWeekDay('SATURDAY');
        expect(result).to.equal(true);
    })

    it('should return false for 123', () => {
        const result = WeekdaysUtils.isValidWeekDay('123');
        expect(result).to.equal(false);
    })

    it('should return false for wefwef123', () => {
        const result = WeekdaysUtils.isValidWeekDay('wefwef123');
        expect(result).to.equal(false);
    })
})