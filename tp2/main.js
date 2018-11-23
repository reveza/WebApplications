/*******************************************************
CHANGE LANGUAGE FRENCH-ENGLISH 
********************************************************/

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

/*******************************************************
CHANGE USERNAME WHILE NAVIGATING ON THE APP
********************************************************/

function changeUserName(connection) {
    let user = document.getElementById('user');
    user.onclick = function() {
        connection.close();
        init();
    }
}

function getUserName() {
    let username = prompt('Please enter your username');
    if (username != null) {
        return username;
    }
}

/*******************************************************
VIEW
********************************************************/

function renderUsername(username) {
    let user = document.getElementById('username');
    user.textContent = username;
}

function renderLang() {
    let language = document.getElementById("language");
    language.onclick = async function () {
        await switchLang();
    };
};

function formatTime(time) {
    let timestamp = new Date(time);
    let days = ["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"];
    let day = timestamp.getDay();
    let date = timestamp.getDate();
    let hour = timestamp.getHours();
    let minute = timestamp.getMinutes();
    let myDate = days[day] + ' ' + date + ', ' + hour + ':' + minute;
    return myDate;
};

function setMessagePosition(chatRow, sender, username) {
    if (sender === username) {
        chatRow.classList.add('chat-user');
    } else if (sender === 'Admin') {
        chatRow.classList.add('admin');
    } else {
        chatRow.classList.add('external-chat-user');
    }
}

function setMessageType(chatBubble, sender, username) {
    if (sender === 'Admin') {
        chatBubble.classList.add('chat-admin')
    } else if (sender === username){
        chatBubble.classList.add('chat-bubble-user');
    } else {
        chatBubble.classList.add('chat-bubble-external');
    }
}

function renderChatBubbles(msg, username) {
    let chat = document.getElementById('chat');

    let chatRow = document.createElement('div');
    chatRow.classList.add('chat-row');
    setMessagePosition(chatRow, msg.sender, username);

    let chatBubble = document.createElement('div');
    setMessageType(chatBubble, msg.sender, username);
    chatBubble.textContent = msg.data;

    let chatSender = document.createElement('div');
    chatSender.textContent = msg.sender;
    chatSender.classList.add('grey-text');

    let chatTime = document.createElement('div');
    let myDate = formatTime(msg.timestamp);
    chatTime.classList.add('date');
    chatTime.textContent = myDate;

    chatRow.appendChild(chatSender);
    chatRow.appendChild(chatBubble);
    chatRow.appendChild(chatTime);
    chat.appendChild(chatRow);
};

/*******************************************************
REFRESH PAGE
********************************************************/

function refresh() {
    let logo = document.getElementById('logo');
    logo.onclick = function() {
        location.reload();
    }
}

/*******************************************************
SEND MSG BY PRESSING ENTER
********************************************************/

function pressEnter() {
    let input = document.getElementById('textbox');
    input.addEventListener("keyup", function(event) {
        // Cancel the default action, if needed
        event.preventDefault();
        if (event.keyCode === 13) {
            // Trigger the button element with a click
            document.getElementById("send").click();
        }
    });
}


/*******************************************************
PAGE INITIALIZATIONS
********************************************************/

function initSocket(username) {
    let url = 'ws://log2420-nginx.info.polymtl.ca/chatservice?username=';
    let generalChannel = 'dbf646dc-5006-4d9f-8815-fd37514818ee';
    let connection = new ConnectionHandler(url, username, generalChannel);
    let channel = new ChannelObserver(connection, generalChannel, username);
    let message = new MessageObserver(connection, generalChannel, username);
    const observers = [channel, message];
    connection.addObservers(observers);
    changeUserName(connection);
}

async function init() {
    let username = await getUserName();
    renderUsername(username);
    initSocket(username);
}

window.onload = async () => {
    refresh();
    pressEnter();
    init();
    await changeLang("fr");
    renderLang();
}