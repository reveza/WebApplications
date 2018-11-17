class MessageObserver {
    constructor(observable, channel, username) {
        this.observable = observable;
        this.input = '';
        this.channel = channel;
        this.viewSendMessage();
        this.messages = [];
        this.username = username;
    }
    /**
     * 
     * @param {Message} message 
     */
    addEvent(msg) {
        if (msg.eventType === "onMessage") {
            renderChatBubbles(msg);
        } else if (msg.eventType === "onGetChannel") {
            this.loadPreviousMessage(msg);
        }
    }

    loadPreviousMessage(messages) {
        this.emptyChatBox();
        messages.data.messages.forEach(msg => {
            renderChatBubbles(msg);
        })
    }

    emptyChatBox() {
        const myChatBox = document.getElementById("chat");
        while (myChatBox.firstChild) myChatBox.removeChild(myChatBox.firstChild);
    }

    sendMessage(text) {
        let date = new Date();
        let timestamp = date.getTime();
        let msg = new Message("onMessage", this.channel, text, this.username, timestamp);
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