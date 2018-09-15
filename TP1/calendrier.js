
function checkButton(image, header, number) {
    var img = document.getElementById(image);
    var head = document.getElementById(header);
    var num = document.getElementById(number);

    if (img.src.includes("/check.png")) {
        img.src = "tick-check.png";
        head.style.backgroundColor = "#EBF7D4";
        num.style.backgroundColor = "#EBF7D4";
    } else {
        img.src = "check.png";
        head.style.backgroundColor = "#FFFFFF";
        num.style.backgroundColor = "#FFFFFF";
    }
}

// generateParticipants() {
//         var res = loadJSON();
// }

// generateSchedule() {
//     var res = loadJSON();
//     forEach result in res
// }
date = {
    day: "",
    month: "",
    date: "",
    time_from: "",
    time_after: ""
};

user = {
    name: "",
    status: true,
    availability: []
};

model = {dates:[], users:[]};

function decodeModel(json) {
        var newModel = model;
        json_dates = json.Calendrier;
        json_users = json.Participants;
        json_dates.map( (element, index) => {
            var js_date = new Date(element[0]);
            newModel.dates.push(date);
            newModel.dates[index].day = js_date.toLocaleString("en-us", { weekday: "short"});
            newModel.dates[index].month = js_date.toLocaleString("en-us", { month: "short"});
            newModel.dates[index].date = js_date.toLocaleString("en-us", { day: "2-digit"});
            newModel.dates[index].time_from = js_date.toLocaleString("en-us", { hour: "2-digit"});
            newModel.dates[index].time_after = js_date.toLocaleString("en-us", { hour: "2-digit"});
        });
        json_users.map((element, index) => {
            newModel.users.push(user);
            newModel.users[index].name = element.Nom;
            newModel.users[index].status = true;
            newModel.users[index].availability = element.Disponibilités;
        })
}

function update(newModel) {
    if (newModel != model) {
        initView();
    }
}

function emptyHeader() {
    var div_empty = document.createElement("div");
    div_empty.classList.add("header-empty");
    container.appendChild(div_empty);
}

function renderUserNumber(){
    return model.users.map( user => {
        var count = 0;
        return (count += user.status);
    });
}

function renderUser(container) {
    model.users.map( (user, index) => {
        var div_name = document.createElement("div");
        div_name.classList.add("name");
        var myImg = document.createElement("IMG");
        myImg.classList.add("avatar");
        myImg.src = "particip2.png";
        div_name.appendChild(myImg);
        var name = document.createElement("SPAN");
        name.textContent = user.name;
        div_name.appendChild(name);
        container.appendChild(div_name);
    })
}
async function renderUsers() {
    var container = document.getElementById("container");

    emptyHeader();

    var user_number = await renderUserNumber();

    var div_names = document.createElement("div");
    div_names.classList.add("header-name");
    div_names.textContent=user_number.length + "participants";
    container.appendChild(div_names);

    renderUser(container);
    
}

function initView() {
    renderUsers();
}

function initModel(){
    let path = '/cal-data.json'
    fetch (path)
    .then(resp => resp.json())
    .then(json => decodeModel(json))
    .then(newModel => update(newModel))
    .catch (function(err) {
        console.log(err)
    })
}

function init() {
    initModel();
}

function initListeners(){

}

window.onload = init;
