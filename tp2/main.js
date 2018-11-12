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

function getUserName() {
    let username = prompt('Please enter your username');
    if (username != null) {
        return username;
    }
}

window.onload = async () => {
    // createWebSocket();
    let username = await getUserName();
    let url = 'ws://log2420-nginx.info.polymtl.ca/chatservice?username=';
    // let user = 'SylvainMartel';
    let generalChannel = 'dbf646dc-5006-4d9f-8815-fd37514818ee';
    let connection = new ConnectionHandler(url, username);
    let channel = new ChannelObserver(connection, generalChannel, username);
    let message = new MessageObserver(connection, generalChannel, username);
    const observers = [channel, message];
    connection.addObservers(observers);
    await changeLang("fr");
    renderLang();
}