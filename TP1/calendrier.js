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

function renderEditing(div_name, index) {
  document.getElementById("pen" + index).style.display = "block";
}

function removeEditing(div_name, index) {
  document.getElementById("pen" + index).style.display = "none";
}

function renderUser(container) {
  model.users.map((user, index) => {
    if (user.status === "Complété") {
      var div_name = document.createElement("div");
      div_name.classList.add("name");
      div_name.setAttribute("id", "user" + index);

      var myImg = document.createElement("IMG");
      myImg.classList.add("avatar");
      myImg.src = "particip2.png";
      div_name.appendChild(myImg);

      var name = document.createElement("SPAN");
      name.textContent = user.name;
      div_name.appendChild(name);
      container.appendChild(div_name);

      var pen = document.createElement("IMG");
      pen.src = "tick2.png";
      pen.setAttribute("id", "pen" + index);
      pen.style.display = "none";
      div_name.appendChild(pen);

      document
        .getElementById("user" + index)
        .addEventListener("mouseenter", function() {
          renderEditing(div_name, index);
        });
      document
        .getElementById("user" + index)
        .addEventListener("mouseleave", function() {
          removeEditing(div_name, index);
        });
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

function renderModal(row_index, user_index) {
//   setTimeout(function() {
    var content = document.getElementById("modal-content"+row_index+user_index);
    content.style.visibility = "visible";
    
    var div_dates = document.createElement("div");
    div_dates.classList.add("modal_dates");
    content.appendChild(div_dates);

    var month = document.createElement("div");
    month.classList.add("month");
    month.textContent = model.dates[user_index].month;
    div_dates.appendChild(month);

    var div_date = document.createElement("div");
    div_date.classList.add("date");
    div_date.textContent = model.dates[row_index].date;
    div_dates.appendChild(div_date);

    var day = document.createElement("div");
    day.classList.add("day");
    day.textContent = model.dates[row_index].day;
    div_dates.appendChild(day);

    renderTime(model.dates[row_index], div_dates);

    var div_user = document.createElement("div");
    content.appendChild(div_user);

    var user_name = document.createElement("div");
    user_name.textContent = model.users[user_index].name;
    div_user.appendChild(user_name);

    var user_availability = document.createElement("div");
    user_availability.textContent = (model.users[user_index].availability[row_index]) === 1 ? 
    "Voted YES" : "Didn't vote for this";
    div_user.appendChild(user_availability);


    // console.log("Alo");
//   }, 3000);
}

function removeModal(row_index, user_index) {
    document.getElementById("modal-content"+row_index+user_index).style.visibility = "hidden";
}

function renderAvailability(my_div, user, row_index, user_index) {
  var div = document.createElement("div");
  div.classList.add("item");

  if (user.availability[row_index] === 1) {
    var img = document.createElement("IMG");
    img.classList.add("icon");
    img.src = "tick1.png";

    div.appendChild(img);
  } else {
    div.classList.add("box-red");
  }

  var modal = document.createElement("div");
  modal.classList.add("modal");

  var modal_content = document.createElement("div");
  modal_content.classList.add("modal-content");

  modal_content.setAttribute("id", "modal-content"+row_index+user_index);

  modal.appendChild(modal_content);
  div.appendChild(modal);

  div.addEventListener("mouseenter", function() {
    renderModal(row_index,user_index);
  });
  div.addEventListener("mouseleave", function(){removeModal(row_index,user_index)});
  my_div.appendChild(div);
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

function renderRow(my_div, row_index) {
  model.users.map((user, user_index) => {
    if (user.status === "Complété") {
      renderAvailability(my_div, user, row_index, user_index);
    } else {
      renderInProgress(my_div, user, row_index, user_index);
    }
  });
}

function renderSchedule() {
  //   var table = document.createElement("div");
  //   table.setAttribute("id", "table");

  model.dates.map((d, index) => {
    var my_div = document.createElement("div");
    my_div.setAttribute("id", "column" + index);

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

function renderTableView() {
  renderUsers();
  renderSchedule();
}

function renderTable() {
  var container = document.getElementById("container");
  if (container.style.display === "none") {
    container.style.display = "flex";
    for (i = 0; i < 8; i++) {
      var column = (document.getElementById("column" + i).style.display =
        "block");
    }
    document.getElementById("calendar").style.display = "none";
  }
}

function renderCalendarView() {
  var div = document.createElement("div");
  div.setAttribute("id", "calendar");
  div.textContent = "Allo";
  document.getElementById("wrapper").appendChild(div);
}

function renderCalendar() {
  var container = document.getElementById("container");
  container.style.display = "none";
  for (i = 0; i < 9; i++) {
    var column = (document.getElementById("column" + i).style.display = "none");
  }
  renderCalendarView();
}

async function initView() {
  renderTableView();
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
