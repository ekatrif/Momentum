const settings = [
    {
        name_en:"Language",
        name_ru:"Язык",
        options: ["English", "Русский"],    
    },
    {
        name_en:"Photo source",
        name_ru:"Источник фотографий",
        options: ['Github', "Unsplash API", "Flickr API"]
    },
    {
        name_en:"Hide/Show widgets",
        name_ru:"Скрыть/Показать блоки",
        options: ['Time', 'Date','Greeting', 'Quote', 'Weather', 'Audio', 'Todolist']},
    {
        name_en:"Player type",
        name_ru:"Тип плеера",
        options: ["Original","Pro"]
    }
]

const settingsDefault = [
    {
        name:"Language",
        option: "English",    
    },
    {
        name:"Photo source",
        option: "Github",
    },
    {
        name:"Hide/Show widgets",
        option: ['time', 'date','greeting', 'quote', 'weather', 'audio', 'todolist']
    },
    {
        name:"Player type",
        option: ["Pro"]
    }
]

saveDefaultSettings();

function saveDefaultSettings() {
settingsDefault.forEach(function(setting) {
    if (!localStorage.getItem(setting.name)) {
        localStorage.setItem(setting.name, setting.option);
    }
});
localStorage.removeItem("Tags");
}

export {settings};