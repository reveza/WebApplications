class ChannelObserver {
    constructor(connectionHandler, channelId, username) {
        this.connectionHandler = connectionHandler;
        this.channelId = channelId;
        this.channelIds = {};
        this.username = username;
        this.generalChannel = 'dbf646dc-5006-4d9f-8815-fd37514818ee';
        this.createChannel();
    }

    addEvent(msg) {
        if (msg.eventType === "updateChannelsList") {
            this.updateChannelsList(msg);
        }
    }

    switchChannel(id) {
        this.channelIds[id] === 'active' ? this.leaveChannel(id) : this.joinChannel(id);
    }

    sendMessage(type, id, name) {
        const message = new Message(type, id, name, this.username, Date.now());
        this.connectionHandler.sendMsg(message);
    }

    setChannelStatus(id, status) {
        this.channelIds[id] = status;
    }

    leaveChannel(id) {
        this.sendMessage("onLeaveChannel", id);
        this.setChannelStatus(id, 'disabled');
        if (id !== this.generalChannel) {
            let icon = document.getElementById(id);
            icon.classList = 'icon-navbar glyphicon glyphicon-plus';
            document.getElementById('textbox').disabled = true;
        }
    }

    displayChannel(id) {
        if (id === this.generalChannel || this.channelIds[id] === "active") {
            document.getElementById('textbox').disabled = false;
        } else if (this.channelIds[id] === "disabled") {
            document.getElementById('textbox').disabled = true;
        }
        this.channelId = id;
        this.connectionHandler.setChannelId(id);
        this.connectionHandler.loadPreviousMessage(this.channelId);
    }

    joinChannel(id) {
        this.sendMessage("onJoinChannel", id);
        this.setChannelStatus(id, 'active');
        if (id !== this.generalChannel) {
            let icon = document.getElementById(id);
            icon.classList = 'icon-navbar glyphicon glyphicon-minus';
            document.getElementById('textbox').disabled = false;
        }
    }

    createChannel() {
        let newChannel = document.getElementById('add-channel');
        newChannel.onclick = function () {
            let name = prompt('Please enter a channel name');
            if (name !== null) {
                this.sendMessage("onCreateChannel", "", name);
            }
        }.bind(this)
    }

    updateChannelsList(msg) {
        let channelsList = document.getElementById('chatColumn');
        msg.data.map(channel => {
            let isNotIncluded = !(this.channelIds[channel.id]);
            if (isNotIncluded) {
                let channelDiv = document.createElement('div');
                channelDiv.classList.add('row');

                let channelElement = document.createElement('a');
                channelElement.textContent = channel.name;
                channelElement.id = channel.id;
                channelElement.classList = 'channel';
                channelElement.onclick = function () {
                    this.displayChannel(channel.id);
                }.bind(this)

                let icon = this.renderChannelIcons(channel.id);

                channelDiv.appendChild(icon);
                channelDiv.appendChild(channelElement);
                channelsList.appendChild(channelDiv);
            }
        });
    }

    renderChannelIcons(id) {
        let icon = document.createElement('a');
        icon.id = id;
        if (id === this.generalChannel) {
            icon.classList = 'icon-navbar glyphicon glyphicon-star'
            this.setChannelStatus(id, 'active');
            document.getElementById('textbox').disabled = false;
            this.displayChannel(id);
        } else {
            icon.classList = 'icon-navbar glyphicon glyphicon-plus'
            this.channelIds[id] = 'disabled';
        }

        icon.onclick = function () {
            this.switchChannel(id)
        }.bind(this)

        return icon;
    }
}