import * as strings from "../assets/en.json";

type TranslationKeys<TStrings> = {
    //@ts-expect-error
    [k in keyof TStrings as `${k}.${keyof TStrings[k]}`]: ""
}

type AllKeys = `content:${keyof TranslationKeys<typeof strings>}`;
