class ConnectionHandler extends Observer {
    constructor (url, observers) {
        super();
        this.ws = new WebSocket(url);
        this.connect();
        this.addObservers(observers);
    }

    connect() {
        this.ws.onopen = () => {
            this.ws.onmessage = (e) => {
                let msg = JSON.parse(event.data);
                console.log(msg);
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
}