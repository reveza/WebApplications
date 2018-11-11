class MessageObserver {
    constructor() {
    }

    addEvent(msg) {
        if (msg.eventType === "onMessage") {
            console.log(msg.data, msg.sender);
        }
    }
}