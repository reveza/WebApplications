class ChannelObserver {
    constructor() {}

    addEvent(msg) {
        if (msg.eventType === "onJoinChannel") {
            console.log(msg.data, msg.sender);
        }
    }
}