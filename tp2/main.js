function createWebSocket() {
    let url = 'ws://log2420-nginx.info.polymtl.ca';
    let ws = new WebSocket(url);

    ws.onopen = () => {
        console.log('ce que je fais quand jouvre le websocket');
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
    createWebSocket();
    await changeLang("fr");
    renderLang();
}