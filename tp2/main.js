model = {
    username: '',
    channels: [
        general:
        {
            username:
            isActive:
        }
    ]
    messages: {
        username:
            text:
        timestamp:
    }
}

function createWebSocket() {
    let url = 'ws://log2420-nginx.info.polymtl.ca/chatservice?username=rebecca';
    let ws = new WebSocket(url);

    ws.onopen = () => {
        console.log('ce que je fais quand jouvre le websocket');
    }
}

function viewSendMessage() {
    sendButton = document.getElementById('send');
    sendButton.onclick = () => {
        sendTextMsg(channelId, sendButton.value);
    }
}

function sendTextMsg(channelId, data) {
    let date = new Date();
    let timestamp = date.getTime();
    let msg = Message('message', channelId, data, model.username, timestamp);
    ws.send(JSON.stringify(msg)); //envoyer au serveur,att reception nouveau message, ensuite l'afficher
    // modifier la vue a partir du model
    // model seulement change par le websocket
}

function parseMessage(msg) {
    switch (msg) {
        case "onMessage":
            receiveMsg(msg.text);
            break;
        case "onLeaveGroup":
            // gerer modele et vues pour ca
            onLeaveGroup(msg.groupe);
            break;
        case "blabla"
    }
}

function wsOnMessage() {
    we.onmessage = (e) => {
        let msg = event.data;
        parseMessage(msg);
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