async function changeLang(lang) {
    document.documentElement.lang = lang;
    const resp = await fetch(`/${lang}.json`);
    languageSelector = await resp.json();
    Object.keys(languageSelector).forEach(key => {
        const doc = document.getElementById(key)
        if (doc) {
            doc.textContent = languageSelector[key];
        }
    });
};

async function switchLang() {
    if (document.documentElement.lang === "fr") {
        await changeLang("en");
    } else {
        await changeLang("fr");
    }
};

function renderLang() {
    let language = document.getElementById("language");
    language.onclick = async function () {
        await switchLang();
    };
};

window.onload = async () => {
    // createWebSocket();
    let url = 'ws://log2420-nginx.info.polymtl.ca/chatservice?username=SylvainMartel';
    let generalChannel = 'dbf646dc-5006-4d9f-8815-fd37514818ee';
    const connection = new ConnectionHandler(url);
    const channel = new ChannelObserver(connection, generalChannel);
    const message = new MessageObserver(connection, generalChannel);
    const observers = [channel, message];
    connection.addObservers(observers);
    await changeLang("fr");
    renderLang();
}