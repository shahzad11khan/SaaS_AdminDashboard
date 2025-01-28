import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import languageDetector from "i18next-browser-languagedetector";
import en from '../public/en.json';
import sp from '../public/sp.json'
import ur from '../public/ur.json'


i18n.use(languageDetector)
.use(initReactI18next)
.init({
 resources:{
    en:{
        translation:en
    },
    sp:{
        translation:sp
    },
    ur:{ 
        translation:ur
    }
},
 fallbackLng : "en"
})
 
export default i18n