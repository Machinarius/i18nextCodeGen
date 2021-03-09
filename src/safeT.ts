import * as strings from "../assets/en.json";

type NestedKeys<T, k extends keyof T> = 
    // @ts-expect-error
    T[k] extends string ? k : `${k}.${keyof TranslationKeys<T[k]>}`;

type TranslationKeys<T> = {
    // @ts-expect-error
    [i in keyof T as `${NestedKeys<T, i>}`]: ""
}

type StringKeys = `content:${keyof TranslationKeys<typeof strings>}`;