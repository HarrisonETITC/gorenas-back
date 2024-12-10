export class ValidationUtil {
    public static getStateErrorMessage(initial: string, states: Array<string>) {
        return `${initial} ${states.join(' ó ')}`
    }
}