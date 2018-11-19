function renderChatBubbles(msg, username) {
    let chat = document.getElementById('chat');

    let chatRow = document.createElement('div');
    chatRow.classList.add('chat-row');

    let chatBubble = document.createElement('div');
    chatBubble.classList.add('chat-bubble');
    chatBubble.textContent = msg.data;
    let chatSender = document.createElement('div');
    chatSender.textContent = msg.sender;

    let timestamp = new Date(msg.timestamp);
    let chatTime = document.createElement('div');
    let days = ["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"];
    let day = timestamp.getDay();
    let date = timestamp.getDate();
    let hour = timestamp.getHours();
    let minute = timestamp.getMinutes();

    let myDate = days[day] + ' ' + date + ', ' + hour + ':' + minute;

    chatTime.textContent = myDate;

    if (msg.sender === username) {
        chatRow.classList.add('chat-user');
    } else {
        chatRow.classList.add('external-chat-user');
    }

    chatRow.appendChild(chatSender);
    chatRow.appendChild(chatBubble);
    chatRow.appendChild(chatTime);
    chat.appendChild(chatRow);
};

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

function refresh() {
    let logo = document.getElementById('logo');
    logo.onclick = function () {
        location.reload();
    }
}

window.onload = async () => {
    refresh();
    let username = await getUserName();
    let url = 'ws://log2420-nginx.info.polymtl.ca/chatservice?username=';
    let generalChannel = 'dbf646dc-5006-4d9f-8815-fd37514818ee';
    let connection = new ConnectionHandler(url, username, generalChannel);
    let channel = new ChannelObserver(connection, generalChannel, username);
    let message = new MessageObserver(connection, generalChannel, username);
    const observers = [channel, message];
    connection.addObservers(observers);
    await changeLang("fr");
    renderLang();
}