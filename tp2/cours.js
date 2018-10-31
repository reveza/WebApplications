Message {
    type:
    text:
}

recoit msg: json.parse(msg) // peut etre pas necessaire
let url = 'ws://log2420-nginx.info.polymtl.ca';
let ws = new WebSocket(url);
ws.onopen = function(e) {
    console.log('ce que je fais quand jouvre le websocket');
}

ws.onmessage = function(e) {
    let msg = event.data;
    //msg est un json
    parseMessage(msg);
};

function parseMessage(msg) {
    // plusieurs types de msg
    switch(msg) {
        case "onMessage":
            receiveMsg(msg.text);
            break;
        case "onLeaveGroup":
        // gerer modele et vues pour ca
            onLeaveGroup(msg.groupe);
            break;
        case "blabla"
    }
};

function sendMsg(text) {
    let msg = {
        type: "onMessage",
        text: text,
        username: model.username
    }
    ws.send(msg); //envoyer au serveur,att reception nouveau message, ensuite l'afficher
    // modifier la vue a partir du model
    // model seulement change par le websocket
}
