import i18next from 'i18next';
import enStrings from "../assets/en.json";
import makeCheckedT from "./checkedT";

i18next.init({
  lng: "en",
  resources: {
    en: enStrings
  }
}).then(() => {
  var tFunction = makeCheckedT(i18next.t.bind(i18next)); // Oh EcmaScript...
  console.log(tFunction("colors:blue"));
});
