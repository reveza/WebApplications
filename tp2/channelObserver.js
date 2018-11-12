class ChannelObserver {
    constructor(observable, channelId, username) {
        this.observable = observable;
        this.channelId = channelId;
        this.channelIds = [];
        this.username = username;
    }

    addEvent(msg) {
        if (msg.eventType === "onJoinChannel") {

            // this.channel = 
            // let msg = new Channel(this.channelId, this.channelName, this.status, this.msg, this.nbOfUsers);
            console.log(msg.data, msg.sender);
        } else if (msg.eventType === "updateChannelsList") {
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

                channelDiv.appendChild(channelElement);
                channelsList.appendChild(channelDiv);

                this.channelIds.push(channel.id);
            }
        });
    }

    joinChannel() {
        let channelLink = document.getElementById('');
        sendButton.onclick = function() {
            this.input = document.getElementById('textbox').value;
            this.sendMessage(this.input);
        }.bind(this);
    }
}