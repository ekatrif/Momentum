function getLanguage() {
    const language = localStorage.getItem("Language");
    if (language==="English") {
        return "en";
    } else if (language==="Русский") {
        return "ru";
    } 
}

export {getLanguage};