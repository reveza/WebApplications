model = {
  dates: [],
  users: []
};

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

function decodeModel(json) {
  var newModel = model;

  json_dates = json.Calendrier;
  json_users = json.Participants;

  json_dates.map(element => {
    var js_date = new Date(element[0]);
    var mydate = {
      day: js_date.toLocaleString("en-us", { weekday: "short" }),
      month: js_date.toLocaleString("en-us", { month: "short" }),
      date: js_date.toLocaleString("en-us", { day: "2-digit" }),
      time_from: js_date.toLocaleString("en-us", { hour: "2-digit" }),
      time_after: js_date.toLocaleString("en-us", { hour: "2-digit" })
    };
    newModel.dates.push(mydate);
  });
  json_users.map(element => {
    myuser = {
      name: element.Nom,
      status: element.Statut,
      availability: element.Disponibilité
    };
    newModel.users.push(myuser);
  });
  console.log(newModel);
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

function renderUserNumber() {
  return model.users.map(user => {
    var count = 0;
    return (count += user.status);
  });
}

function renderEditing(div_name) {
    div_name.style.color = "red";
}

function removeEditing(div_name) {
    div_name.style.color = "black";
}

function renderUser(container) {
  model.users.map((user, index) => {
    if (user.status === "Complété") {
      var div_name = document.createElement("div");
      div_name.classList.add("name");
      div_name.addEventListener("mouseover", renderEditing(div_name));
      div_name.addEventListener("mouseout", removeEditing(div_name));

      var myImg = document.createElement("IMG");
      myImg.classList.add("avatar");
      myImg.src = "particip2.png";
      div_name.appendChild(myImg);

      var name = document.createElement("SPAN");
      name.textContent = user.name;
      div_name.appendChild(name);
      container.appendChild(div_name);
    }
  });
}

function renderInProgressUser(container) {
  var div = document.createElement("div");
  div.classList.add("name");
  div.setAttribute("id", "blue-background");

  var img = document.createElement("IMG");
  img.src = "particip2.png";
  img.classList.add("avatar");

  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("name", "FirstName");
  input.setAttribute("value", "Michel");
  input.setAttribute("class", "box-name");

  div.appendChild(img);
  div.appendChild(input);
  container.appendChild(div);
}

async function renderUsers() {
  var container = document.getElementById("container");

  emptyHeader();

  var user_number = await renderUserNumber();

  var div_names = document.createElement("div");
  div_names.classList.add("header-name");
  div_names.textContent = user_number.length + "participants";
  container.appendChild(div_names);

  renderInProgressUser(container);

  renderUser(container);
}

function renderTime(date, header) {
  var time_wrapper = document.createElement("div");
  time_wrapper.classList.add("container-time");

  var time_from = document.createElement("div");
  time_from.classList.add("time");
  time_from.textContent = date.time_from;
  time_wrapper.appendChild(time_from);

  var time_after = document.createElement("div");
  time_after.textContent = date.time_after;
  time_wrapper.appendChild(time_after);

  header.appendChild(time_wrapper);
}

function countCheckNumber(i) {
  var count = 0;
  model.users.map(user => {
    count += user.availability[i];
  });
  return count;
}

function renderChecksNumber(my_div, i) {
  var count = countCheckNumber(i);

  var check_number = document.createElement("div");
  check_number.classList.add("item");
  var id = "number" + i;
  check_number.setAttribute("id", id);

  var img = document.createElement("IMG");
  img.src = "tick2.png";
  img.setAttribute("height", "18");
  img.setAttribute("width", "22");

  var number = document.createElement("SPAN");
  number.textContent = count;

  check_number.appendChild(img);
  check_number.appendChild(number);
  my_div.appendChild(check_number);
}

function renderModal() {
    setTimeout(function(){
        console.log("allo");
    },3000)
}

function renderAvailability(my_div, user, i) {
  if (user.availability[i] === 1) {
    var div = document.createElement("div");
    div.classList.add("item");
    div.addEventListener("mouseover", renderModal());

    var img = document.createElement("IMG");
    img.classList.add("icon");
    img.src = "tick1.png";

    div.appendChild(img);
    my_div.appendChild(div);
  } else {
    var div = document.createElement("div");
    div.classList.add("item");
    div.classList.add("box-red");
    div.addEventListener("mouseover", renderModal());

    my_div.appendChild(div);
  }
}

function renderInProgress(my_div, user, index) {
  var progress_img = document.createElement("IMG");
  progress_img.src = "check.png";
  progress_img.classList.add("icon");
  progress_img.setAttribute("id", "check" + index);

  var in_progress = document.createElement("div");
  in_progress.classList.add("item");
  in_progress.onclick = function() {
    checkButton("check" + index, "header" + index, "number" + index);
  };

//   in_progress.addEventListener("click", function() {
//       user.availability[index] = 1;
//       update(model);
//   })
  in_progress.appendChild(progress_img);
  my_div.appendChild(in_progress);
}

function renderRow(my_div, i) {
  model.users.map(user => {
    if (user.status === "Complété") {
      renderAvailability(my_div, user, i);
    } else {
      renderInProgress(my_div, user, i);
    }
  });
}

function renderSchedule() {
  var column = document.createElement("div");
  model.dates.map((d, index) => {
    var my_div = document.createElement("div");

    var header = document.createElement("div");
    header.classList.add("header");
    var id = "header" + index;
    header.setAttribute("id", id);

    var month = document.createElement("div");
    month.classList.add("month");
    month.textContent = d.month;
    header.appendChild(month);

    var div_date = document.createElement("div");
    div_date.classList.add("date");
    div_date.textContent = d.date;
    header.appendChild(div_date);

    var day = document.createElement("div");
    day.classList.add("day");
    day.textContent = d.day;
    header.appendChild(day);

    renderTime(d, header);

    my_div.appendChild(header);

    renderChecksNumber(my_div, index);

    renderRow(my_div, index);

    document.getElementById("wrapper").appendChild(my_div);
  });
}

function initView() {
  renderUsers();
  renderSchedule();
}

function initModel() {
  let path = "/cal-data.json";
  fetch(path)
    .then(resp => resp.json())
    .then(json => decodeModel(json))
    .then(newModel => update(newModel))
    .catch(function(err) {
      console.log(err);
    });
}

function init() {
  initModel();
}

function initListeners() {}

window.onload = init;
