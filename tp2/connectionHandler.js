class ConnectionHandler extends Observer {
    constructor(url, user, channelId) {
        super();
        this.ws = new WebSocket(url + user);
        this.username = user;
        this.channelId = channelId;
        this.observers = []
        this.connect();
    }

    connect() {
        this.ws.onopen = () => {
            this.ws.onmessage = (event) => {
                let msg = JSON.parse(event.data);
                this.notifyObserver(msg);
            }
        }
    }

    close() {
        emptyChannelList();
        this.ws.close();
    }

    loadPreviousMessage(channelId) {
        this.channelId = channelId;
        var message = new Message("onGetChannel", this.channelId, "", this.username, Date.now());
        this.sendMsg(message);
    }

    addObservers(observers) {
        observers.map(observer => {
            this.observers.push(observer);
        });
    }

    notifyObserver(msg) {
        this.observers.map(observer => {
            observer.addEvent(msg);
        })
    }

    sendMsg(msg) {
        if (msg.channelId === "") {
            msg.channelId = this.channelId;
        }
        this.ws.send(JSON.stringify(msg));
    }

    setChannelId(id) {
        this.channelId = id;
    }
}