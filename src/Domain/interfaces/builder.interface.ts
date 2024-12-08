export interface IBuilder<T> {
    build(): T;
    reset(): void;
}