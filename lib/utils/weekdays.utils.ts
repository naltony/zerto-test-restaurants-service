enum Weekdays {
    SUNDAY = 'SUNDAY',
    MONDAY = 'MONDAY',
    TUESDAY = 'TUESDAY',
    WEDNESDAY = 'WEDNESDAY',
    THURSDAY = 'THURSDAY',
    FRIDAY = 'FRIDAY',
    SATURDAY = 'SATURDAY'
}

export class WeekdaysUtils {

    static isValidWeekDay(weekday: string) : boolean {
        return (<any>Object).values(Weekdays).includes(weekday.toUpperCase());
    }

}
