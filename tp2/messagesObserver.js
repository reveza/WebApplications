class MessageObserver {
    constructor(observable, channel) {
        this.observable = observable;
        this.input = '';
        this.channel = channel;
        this.viewSendMessage();
        this.messages = [];
    }

    addEvent(msg) {
        if (msg.eventType === "onMessage") {
            this.renderChatBubbles(msg);
        }
    }

    renderChatBubbles(msg) {
        let chat = document.getElementById('chat');
        let chatRow = document.createElement('div');
        chatRow.classList.add('chat-row');
        let chatBubble = document.createElement('div');
        chatBubble.classList.add('chat-bubble');
        chatBubble.textContent = msg.data;

        chatRow.appendChild(chatBubble);
        chat.appendChild(chatRow);
    }

    sendMessage(text) {
        let date = new Date();
        let timestamp = date.getTime();
        let msg = new Message("onMessage", "dbf646dc-5006-4d9f-8815-fd37514818ee", text, 'sylvainMartel', timestamp);
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