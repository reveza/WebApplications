class ConnectionHandler extends Observer {
    constructor (url, user) {
        super();
        this.ws = new WebSocket(url+user);
        this.connect();
        this.username = user;
        this.channelId = "dbf646dc-5006-4d9f-8815-fd37514818ee";
    }

    connect() {
        this.ws.onopen = () => {
            this.ws.onmessage = (e) => {
                let msg = JSON.parse(event.data);
                this.notifyObserver(msg);
            }
        }
    }

    addObservers(observers) {
        observers.map( observer => {
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
    }
}