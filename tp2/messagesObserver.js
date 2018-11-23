class MessageObserver {
    constructor(connectionHandler, channel, username) {
        this.connectionHandler = connectionHandler;
        this.input = '';
        this.channel = channel;
        this.messages = [];
        this.username = username;
        this.sendMessage();
    }

    addEvent(msg) {
        if (msg.eventType === "onMessage") {
            if (this.channel === msg.channelId) {
                renderChatBubbles(msg, this.username);
            }
        } else if (msg.eventType === "onGetChannel") {
            this.loadPreviousMessage(msg, this.username);
            this.setChannel(msg.channelId);
        } else if (msg.eventType === "onJoinChannel" || msg.eventType === "onLeaveChannel") {
            renderChatBubbles(msg, this.username);
        }
    }

    setChannel(id) {
        this.channel = id;
    }

    loadPreviousMessage(messages) {
        emptyChatBubbles();
        messages.data.messages.forEach(msg => {
            renderChatBubbles(msg, this.username);
        });
    }

    sendToSocket(text) {
        let date = new Date();
        let timestamp = date.getTime();
        let msg = new Message("onMessage", "", text, this.username, timestamp);
        this.connectionHandler.sendMsg(msg);
    }

    sendMessage() {
        let sendButton = document.getElementById('send');
        let input = document.getElementById('textbox');
    
        sendButton.onclick = function () {
            this.input = input.value;
            this.sendToSocket(this.input);
            document.getElementById('textbox').value = '';
            this.input = '';
        }.bind(this);
    }
}