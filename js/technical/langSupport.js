var langData = {}

function registerLanguage(langCode, translateData) {
    langData[langCode] = translateData;
}

function getLangData(){
    return getLang()
}