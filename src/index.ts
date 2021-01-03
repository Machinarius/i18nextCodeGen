import i18next from 'i18next';
import enStrings from "../assets/en.json";
import t from "./generated";

i18next.init({
  lng: "en",
  resources: {
    en: enStrings
  }
}).then(() => {
  var tFunction = i18next.t.bind(i18next); // Oh EcmaScript...
  console.log(t(tFunction, "makes:european:ferrari"));
});
