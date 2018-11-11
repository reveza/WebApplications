class MessageObserver {
    constructor(observable, channel) {
        this.observable = observable;
        this.input = '';
        this.channel = channel;
        this.viewSendMessage();
    }

    addEvent(msg) {
        if (msg.eventType === "onMessage") {
            console.log(msg.data, msg.sender);
        }
    }

    sendMessage(text) {
        let date = new Date();
        let timestamp = date.getTime();
        let msg = new Message("onMessage", "dbf646dc-5006-4d9f-8815-fd37514818ee", text, 'sylvainMartel', timestamp);
        this.observable.sendMsg(msg);
    }

    viewSendMessage() {
        let sendButton = document.getElementById('send');
        sendButton.onclick = function() {
            this.input = document.getElementById('textbox').value;
            this.sendMessage(this.input);
        }.bind(this);
    }
}