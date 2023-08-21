import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';

const translations = {
    en: {
        textInstruction:'Choose the quantity of gears that you have',
        rearText:'Rear gears',
        frontText: 'Front gears',
        continueButton: 'Continue',
        instructionHdr:'Before start, follow instructions below',
        instructionText1:'1. Fix phone on bicycle stem holder',
        instructionText2: '2. Press calibrate when you did first step',
        deviation:'deviation',
        calibrate:'CALIBRATE',
        getStarted:'GET STARTED',





    },
    uk: {
        textInstruction:'Виберіть кількість передач, яку ви маєте',
        rearText:'Задні передачі',
        frontText: 'Передні передачі',
        continueButton: 'Продовжити',
        instructionHdr:'Перед початком, дотримуйтесь інструкції нижче',
        instructionText1:'1. Зафіксуйте пристрій на тримачі',
        instructionText2: '2. Натисніть "Калібрувати", коли ви виконали 1ий крок',
        deviation:'нахил',
        calibrate:'КАЛІБРУВАТИ',
        getStarted:'ПРОДОВЖИТИ',






    },
    // Add more languages here
};

const fallback = { languageTag: 'en', isRTL: false };

const { languageTag } =
RNLocalize.findBestAvailableLanguage(Object.keys(translations)) ||
fallback;

i18n.translations = translations;
i18n.locale = languageTag;

export default i18n;