export abstract class StateModel {
    public static STATE_ACTIVE = 'A';
    public static STATE_INACTIVE = 'I';
    public static BASIC_STATES: Array<string> = [];

    static {
        this.BASIC_STATES.push(this.STATE_ACTIVE);
        this.BASIC_STATES.push(this.STATE_INACTIVE);
    }

    state: string;
}