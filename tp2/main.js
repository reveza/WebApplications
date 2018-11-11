function parseMessage(msg) {
    switch (msg) {
        case "onMessage":
            console.log(msg.text);
            receiveMsg(msg.text);
            break;
        case "onLeaveGroup":
            // gerer modele et vues pour ca
            onLeaveGroup(msg.groupe);
            break;
    }
}

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
    let url = 'ws://log2420-nginx.info.polymtl.ca/chatservice?username=rebecca';
    const channel = new ChannelObserver();
    const message = new MessageObserver();
    const observers = [channel, message];
    const connection = new ConnectionHandler(url, observers);
    await changeLang("fr");
    renderLang();
}