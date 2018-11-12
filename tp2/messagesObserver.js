class MessageObserver {
    constructor(observable, channel, username) {
        this.observable = observable;
        this.input = '';
        this.channel = channel;
        this.viewSendMessage();
        this.messages = [];
        this.username = username;
    }

    addEvent(msg) {
        if (msg.eventType === "onMessage") {
            this.renderChatBubbles(msg);
            console.log(msg);
        }
    }

    renderChatBubbles(msg) {
        let chat = document.getElementById('chat');

        let chatRow = document.createElement('div');
        chatRow.classList.add('chat-row');

        let chatBubble = document.createElement('div');
        chatBubble.classList.add('chat-bubble');
        chatBubble.textContent = msg.data;

        let chatSender = document.createElement('div');
        chatSender.textContent = msg.sender;
        
        let timestamp = new Date(msg.timestamp);
        let chatTime= document.createElement('div');
        let days = ["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"];
        let day = timestamp.getDay();
        let date = timestamp.getDate();
        let hour = timestamp.getHours();
        let minute = timestamp.getMinutes();

        let myDate = days[day] + ' ' + date + ', ' + hour + ':' + minute;

        chatTime.textContent = myDate;

        if (msg.sender === this.username) {
            chatRow.classList.add('chat-user');
        } else {
            chatRow.classList.add('external-chat-user');
        }

        chatRow.appendChild(chatSender);
        chatRow.appendChild(chatBubble);
        chatRow.appendChild(chatTime);
        chat.appendChild(chatRow);
    }

    sendMessage(text) {
        let date = new Date();
        let timestamp = date.getTime();
        let msg = new Message("onMessage", "dbf646dc-5006-4d9f-8815-fd37514818ee", text, this.username, timestamp);
        this.observable.sendMsg(msg);
    }

    viewSendMessage() {
        let sendButton = document.getElementById('send');
        sendButton.onclick = function () {
            this.input = document.getElementById('textbox').value;
            this.sendMessage(this.input);
            document.getElementById('textbox').value = '';
            this.input = '';
        }.bind(this);
    }
}