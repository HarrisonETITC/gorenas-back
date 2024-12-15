import { IdValue } from "@Domain/interfaces/id-value.interface";
import { GeneralEntity } from "@Infraestructure/orm/typeorm/entities/general/general.entity";

export class AppUtil {
    public static extractIds<T extends GeneralEntity>(data: Array<T>, field?: string): Array<number> {
        const uniques = new Set<number>();

        data.forEach(d => {
            if (!AppUtil.verifyEmpty(field))
                uniques.add(d[field])
            else
                uniques.add(d.id)
        });

        return Array.from(uniques);
    }

    public static verifyEmpty(value: any): boolean {
        const basic: boolean = (value === undefined || value === null);
        const emptyObject = {};
        if (typeof value === 'string')
            return basic || value === '' || value === "" || value === ``;
        else if (typeof value === 'number')
            return basic || isNaN(value);
        else if (value instanceof Array)
            return basic || value.length <= 0;
        else if (value === emptyObject)
            return true
        else if (value instanceof Map)
            return basic || value.size == 0;

        return basic;
    }

    public static findNumberField(assigns: Map<string, string>, fieldName: string) {
        if (!AppUtil.verifyEmpty(assigns) && !AppUtil.verifyEmpty(assigns.get(fieldName)) && !isNaN(Number(assigns.get(fieldName))))
            return Number(assigns.get(fieldName));

        return null;
    }

    public static transformToIdValue<T>(data: Array<T>, idField: string, valueField: string): Array<IdValue> {
        if (this.verifyEmpty(data))
            return [];

        if (this.verifyEmpty(idField) || this.verifyEmpty(valueField)) {
            throw new Error(`Hace falta uno de los 3 argumentos para realizar el procedimiento: 'idField' ó 'valueField'`);
        }

        return data.map(val => {
            return { id: val[idField], value: val[valueField] };
        })
    }
}