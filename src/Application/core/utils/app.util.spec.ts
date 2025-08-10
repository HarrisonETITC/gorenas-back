import { AppUtil } from './app.util';

describe('AppUtil Unit Test', () => {
    it('Should extract IDs from an array using id field', async () => {
        const data = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
            { id: 3, name: 'Item 3' }
        ];
        const result = AppUtil.extractIds(data);
        expect(result).toEqual([1, 2, 3]);
    });
    it('Should extract IDs from an array using custom field', async () => {
        const data = [
            { id: 6, customId: 10, name: 'Item A' },
            { id: 6, customId: 20, name: 'Item B' },
            { id: 6, customId: 30, name: 'Item C' }
        ];
        const result = AppUtil.extractIds(data, 'customId');
        expect(result).toEqual([10, 20, 30]);
    });
    it('Should verify not empty value', async () => {
        expect(AppUtil.verifyEmpty('Hello')).toBe(false);
    });
    it('Should verify empty string types', async () => {
        expect(AppUtil.verifyEmpty('')).toBe(true);
        expect(AppUtil.verifyEmpty("")).toBe(true);
        expect(AppUtil.verifyEmpty(``)).toBe(true);
    });
    it('Should verify empty number type', async () => {
        expect(AppUtil.verifyEmpty(NaN)).toBe(true);
    });
    it('Should verify empty array', async () => {
        expect(AppUtil.verifyEmpty([])).toBe(true);
    });
    it('Should verify empty object', async () => {
        expect(AppUtil.verifyEmpty({})).toBe(true);
    });
    it('Should verify empty map', async () => {
        expect(AppUtil.verifyEmpty(new Map())).toBe(true);
    });
    it('Should verify null and undefined as empty values', async () => {
        expect(AppUtil.verifyEmpty(null)).toBe(true);
        expect(AppUtil.verifyEmptySimple(null)).toBe(true);
        expect(AppUtil.verifyEmpty(undefined)).toBe(true);
        expect(AppUtil.verifyEmptySimple(undefined)).toBe(true);
    });
    it('Should return false for non-empty values', async () => {
        expect(AppUtil.verifyEmpty('Non-empty string')).toBe(false);
        expect(AppUtil.verifyEmpty(42)).toBe(false);
        expect(AppUtil.verifyEmpty([1, 2, 3])).toBe(false);
        expect(AppUtil.verifyEmpty({ key: 'value' })).toBe(false);
        expect(AppUtil.verifyEmpty(new Map([['key', 'value']]))).toBe(false);
        expect(AppUtil.verifyEmptySimple('Non-empty string')).toBe(false);
        expect(AppUtil.verifyEmptySimple(42)).toBe(false);
    });
})