import i18next from 'i18next';
import enStrings from "../assets/en.json";

i18next.init({
  lng: "en",
  resources: {
    en: enStrings
  }
}).then(() => {
  console.log(i18next.t("sampleData:testString"));
});
