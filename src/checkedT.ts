import * as strings from "../assets/en.json";
import { TFunction } from "i18next";

type NestedKeys<T, k extends keyof T> = 
    // This errors out because reasons... but it works regardless.
    // @ts-expect-error
    T[k] extends string ? k : `${k}:${keyof TranslationKeys<T[k]>}`;

type TranslationKeys<T> = {
    // This errors out because reasons... but it works regardless.
    // @ts-expect-error
    [k in keyof T as `${NestedKeys<T, k>}`]: ""
}

type StringKeys = `${keyof TranslationKeys<typeof strings>}`;

export default function makeCheckedT(t: TFunction) {
    return (key: StringKeys) => t(key);
}