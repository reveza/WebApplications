class ChannelObserver {
    constructor(observable, channelId, username) {
        this.observable = observable;
        this.channelId = channelId;
        this.channelIds = [];
        this.username = username;
    }

    addEvent(msg) {
        if (msg.eventType === "updateChannelsList") {
            this.updateChannelsList(msg);
        }
    }

    updateChannelsList(msg) {
        let channelsList = document.getElementById('chatColumn');
        msg.data.map( channel => {
            let isNotIncluded = !(this.channelIds.includes(channel.id));
            if (isNotIncluded) {
                let channelDiv = document.createElement('div');
                channelDiv.classList.add('row');

                let channelElement = document.createElement('a');
                channelElement.textContent = channel.name;
                channelElement.id = channel.id;
                channelElement.classList = 'channel';
                channelElement.onclick = function() {
                    this.switchChannel(channel.id)
                }.bind(this)

                channelDiv.appendChild(channelElement);
                channelsList.appendChild(channelDiv);

                this.channelIds.push(channel.id);
            }
        });
    }

    switchChannel(id) {
        const leaveMessage = new Message("onLeaveChannel", this.channelId, "", this.username, Date.now());
        this.observable.sendMsg(leaveMessage);
        this.channelId = id;
        this.observable.loadPreviousMessage(this.channelId);
        const joinnedMessage = new Message("onJoinChannel", this.channelId, "", this.username, Date.now());
        this.observable.sendMsg(joinnedMessage);

    }
}