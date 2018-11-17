class ConnectionHandler extends Observer {
    constructor(url, user, channelId) {
        super();
        this.ws = new WebSocket(url + user);
        this.connect();
        this.username = user;
        this.channelId = channelId;
    }

    connect() {
        this.ws.onopen = () => {
            this.ws.onmessage = (e) => {
                let msg = JSON.parse(event.data);
                this.notifyObserver(msg);
            }
            this.loadPreviousMessage(this.channelId);
        }
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
        this.ws.send(JSON.stringify(msg));
        console.log(msg)
    }

}