model = {
  dates: [],
  users: []
};

function checkButton(image, header, number, user, day_index) {
  let img = document.getElementById(image);
  let head = document.getElementById(header);
  let num = document.getElementById(number);

  if (img.src.includes("/check.png")) {
    img.src = "tick-check.png";
    head.style.backgroundColor = "#EBF7D4";
    num.style.backgroundColor = "#EBF7D4";
    user.availability[day_index] = 1;
    updateCheckNumberCount(day_index);
  } else {
    img.src = "check.png";
    head.style.backgroundColor = "#FFFFFF";
    num.style.backgroundColor = "#FFFFFF";
    user.availability[day_index] = 0;
    updateCheckNumberCount(day_index);
  }
}

function emptyHeader() {
  let div_empty = document.createElement("div");
  div_empty.classList.add("header-empty");
  container.appendChild(div_empty);
}

function renderEditing(div_name, index) {
  document.getElementById("pen" + index).style.display = "block";
}

function removeEditing(div_name, index) {
  document.getElementById("pen" + index).style.display = "none";
}

function updateName(index) {
  model.users.map(user => {
    if (user.status === "EnCours") {
      user.status = "Complété";
      updateCheckBoxes(user, index);
    }
  });
  updateInProgress();
  model.users[index].status = "EnCours";
  document.getElementById("user" + index).style.display = "none";
  document.getElementById("name_box" + index).style.display = "flex";
}

function updateCheckBoxes(user, index) {
  user.availability.map((day, day_index) => {
    document.getElementById("check" + index + day_index).style.display = "hidden";
    document.getElementById("box_item" + index + day_index).style.display = "visible";
  });
}

function updateInProgress(user) {

}

function editName(div_name, index) {
  document
    .getElementById("user" + index)
    .addEventListener("mouseenter", function () {
      renderEditing(div_name, index);
    });
  document
    .getElementById("user" + index)
    .addEventListener("click", function () {
      updateName(index);
    });
  document
    .getElementById("user" + index)
    .addEventListener("mouseleave", function () {
      removeEditing(div_name, index);
    });
}

function renderUser(container, user, index) {
  let div_name = document.createElement("div");
  div_name.classList.add("name");
  div_name.style.display = "visible";
  div_name.setAttribute("id", "user" + index);

  let myImg = document.createElement("IMG");
  myImg.classList.add("avatar");
  myImg.src = "particip2.png";
  div_name.appendChild(myImg);

  let name = document.createElement("SPAN");
  name.textContent = user.name;
  div_name.appendChild(name);
  container.appendChild(div_name);

  let pen = document.createElement("IMG");
  pen.src = "tick2.png";
  pen.setAttribute("id", "pen" + index);
  pen.style.display = "none";
  div_name.appendChild(pen);

  editName(div_name, index);
}

function renderInProgressUser(container, user, index) {
  let div = document.createElement("div");
  div.classList.add("name");
  div.setAttribute("id", "name_box" + index);
  div.style.display = "none";

  let img = document.createElement("IMG");
  img.src = "particip2.png";
  img.classList.add("avatar");

  let input = document.createElement("input");
  input.setAttribute("id", "input" + index);
  input.setAttribute("type", "text");
  input.setAttribute("name", "FirstName");
  input.setAttribute("value", user.name);
  input.setAttribute("class", "box-name");

  div.appendChild(img);
  div.appendChild(input);
  container.appendChild(div);

  if (user.status === "EnCours") {
    div.style.display = "flex";
  }
}

function renderUsers() {
  emptyHeader();

  let div_names = document.createElement("div");
  div_names.classList.add("header-name");
  div_names.textContent = model.users.length + "participants";

  let container = document.getElementById("container");
  container.appendChild(div_names);

  model.users.map((user, index) => {
    if (user.status === "Complété") {
      renderUser(container, user, index);
    }
    renderInProgressUser(container, user, index);
  });
}

function renderTime(date, header) {
  let time_wrapper = document.createElement("div");
  time_wrapper.classList.add("container-time");

  let time_from = document.createElement("div");
  time_from.classList.add("time");
  time_from.textContent = date.time_from;
  time_wrapper.appendChild(time_from);

  let time_after = document.createElement("div");
  time_after.textContent = date.time_after;
  time_wrapper.appendChild(time_after);

  header.appendChild(time_wrapper);
}

function countCheckNumber(i) {
  let count = 0;
  model.users.map(user => {
    count += user.availability[i];
  });
  return count;
}

function updateCheckNumberCount(i) {
  document.getElementById("checkCount" + i).textContent = countCheckNumber(i);

}

function renderChecksNumber(my_div, i) {
  let count = countCheckNumber(i);

  let check_number = document.createElement("div");
  check_number.classList.add("item");
  let id = "number" + i;
  check_number.setAttribute("id", id);

  let img = document.createElement("IMG");
  img.src = "tick2.png";
  img.setAttribute("height", "18");
  img.setAttribute("width", "22");

  let number = document.createElement("SPAN");
  number.setAttribute("id", "checkCount" + i);
  number.textContent = count;

  check_number.appendChild(img);
  check_number.appendChild(number);
  my_div.appendChild(check_number);
}

function renderModalDateInfo(modal_content, day_index) {
  let div_dates = document.createElement("div");
  div_dates.classList.add("modal_dates");
  modal_content.appendChild(div_dates);

  let month = document.createElement("div");
  month.classList.add("month");
  month.textContent = model.dates[day_index].month;
  div_dates.appendChild(month);

  let div_date = document.createElement("div");
  div_date.classList.add("date");
  div_date.textContent = model.dates[day_index].date;
  div_dates.appendChild(div_date);

  let div_day = document.createElement("div");
  div_day.classList.add("day");
  div_day.textContent = model.dates[day_index].day;
  div_dates.appendChild(div_day);

  renderTime(model.dates[day_index], div_dates);
}

function renderModalUserInfo(modal_content, day_index, user_index) {
  let div_user = document.createElement("div");
  modal_content.appendChild(div_user);

  let user_name = document.createElement("div");
  user_name.textContent = model.users[user_index].name;
  div_user.appendChild(user_name);

  let user_availability = document.createElement("div");
  user_availability.textContent = (model.users[user_index].availability[day_index]) === 1 ?
    "Voted YES" :
    "Didn't vote for this";
  div_user.appendChild(user_availability);
}

function createModalView(modal, user_index, day_index) {
  let modal_content = document.createElement("div");
  modal_content.classList.add("modal-content");
  modal_content.setAttribute("id", "modal-content" + user_index + day_index);
  modal_content.style.visibility = "invisible";

  renderModalDateInfo(modal_content, day_index);

  renderModalUserInfo(modal_content, day_index, user_index);

  modal.appendChild(modal_content);
}

function displayModal(user_index, day_index) {
  let modal_content = document.getElementById("modal-content" + user_index + day_index);
  modal_content.style.visibility = "visible";
}

function hideModal(user_index, day_index) {
  let modal_content = document.getElementById("modal-content" + user_index + day_index);
  modal_content.style.visibility = "hidden";
}

function updateModalView(box_item, user_index, day_index) {
  var timeout;
  box_item.addEventListener("mouseenter", function () {
    timeout = setTimeout(function () {
      displayModal(user_index, day_index);
    }, 3000);
  });

  box_item.addEventListener("mouseleave", function () {
    timeout = clearTimeout(timeout);
    hideModal(user_index, day_index);
  });
}

function createAvailabilityModal(box_item, day_index, user_index) {
  let modal = document.createElement("div");
  modal.classList.add("modal");
  box_item.appendChild(modal);

  createModalView(modal, user_index, day_index);
  updateModalView(box_item, user_index, day_index);
}

function renderAvailability(schedule, user, day_index, user_index) {
  let box_item = document.createElement("div");
  box_item.classList.add("item");
  box_item.style.display = "flex";
  box_item.setAttribute("id", "box_item" + user_index + day_index);

  if (user.availability[day_index] === 1) {
    let img = document.createElement("IMG");
    img.classList.add("icon");
    img.src = "tick1.png";

    box_item.appendChild(img);
  } else {
    box_item.classList.add("box-red");
  }

  createAvailabilityModal(box_item, day_index, user_index);

  schedule.appendChild(box_item);
}

function renderInProgressBox(my_div, user, user_index, day_index) {
  let progress_img = document.createElement("IMG");
  progress_img.src = "check.png";
  progress_img.classList.add("icon");
  progress_img.setAttribute("id", "check" + day_index);

  let in_progress = document.createElement("div");
  in_progress.classList.add("item");
  in_progress.onclick = function () {
    checkButton("check" + day_index, "header" + day_index, "number" + day_index, user, day_index);
  };

  in_progress.appendChild(progress_img);
  my_div.appendChild(in_progress);
}

function renderUsersRow(my_div, day_index) {
  model.users.map((user, user_index) => {
    if (user.status === "Complété") {
      renderAvailability(my_div, user, day_index, user_index);
    } else {
      renderInProgressBox(my_div, user, user_index, day_index);
    }
  });
}

function renderScheduleHeader(schedule, d, day_index) {
  let header = document.createElement("div");
  header.classList.add("header");
  let id = "header" + day_index;
  header.setAttribute("id", id);

  let month = document.createElement("div");
  month.classList.add("month");
  month.textContent = d.month;
  header.appendChild(month);

  let div_date = document.createElement("div");
  div_date.classList.add("date");
  div_date.textContent = d.date;
  header.appendChild(div_date);

  let day = document.createElement("div");
  day.classList.add("day");
  day.textContent = d.day;
  header.appendChild(day);

  renderTime(d, header);

  schedule.appendChild(header);
}

function renderSchedule() {
  model.dates.map((d, day_index) => {
    let schedule = document.createElement("div");
    schedule.setAttribute("id", "column" + day_index);

    renderScheduleHeader(schedule, d, day_index);

    renderChecksNumber(schedule, day_index);

    renderUsersRow(schedule, day_index);

    document.getElementById("wrapper").appendChild(schedule);
  });
}

function renderTableView() {
  renderUsers();
  renderSchedule();

  // Table Button is selected view mode by default when page loading
  document.getElementById("table-btn").style.borderBottomColor = "black";
}

function renderCalendarView() {
  let div = document.createElement("div");
  div.setAttribute("id", "calendar");
  div.textContent = "Allo";
  div.style.display = "none";
  document.getElementById("wrapper").appendChild(div);
}

function clickedTableButton() {
  document.getElementById("calendar-btn").style.borderBottom = "none";
  document.getElementById("table-btn").style.borderBottomColor = "black";
  document.getElementById("table-btn").style.borderBottom = "solid";
}

function hideCalendarView() {
  document.getElementById("calendar").style.display = "none";
}

function displayTableView() {
  let container = document.getElementById("container");

  if (container.style.display === "none") {
    container.style.display = "flex";
    for (i = 0; i < 8; i++) {
      let column = (document.getElementById("column" + i).style.display =
        "block");
    }
  }
}

function renderTable() {
  hideCalendarView();
  displayTableView();
  clickedTableButton();
}

function clickedCalendarButton() {
  document.getElementById("table-btn").style.borderBottom = "none";
  document.getElementById("calendar-btn").style.borderBottomColor = "black";
  document.getElementById("calendar-btn").style.borderBottom = "solid";
}

function hideTableView() {
  let container = document.getElementById("container");
  container.style.display = "none";

  for (i = 0; i < 9; i++) {
    let column = (document.getElementById("column" + i).style.display = "none");
  }
}

function displayCalendarView() {
  let calendar_div = document.getElementById("calendar");
  if (calendar_div.style.display === "none") {
    calendar_div.style.display = "flex";
  }
}

function renderCalendar() {
  hideTableView();
  displayCalendarView();
  clickedCalendarButton();
}

function decodeDates(json_dates, newModel) {
  let offset = -4;

  json_dates.map(element => {
    let js_date = new Date(element[0]);

    // adjust timezone
    let utc = js_date.getTime() + (js_date.getTimezoneOffset() * 60000);
    let date = new Date(utc + (3600000 * offset));

    // each event is two hours long
    var time_length = new Date(date);
    time_length.setHours(date.getHours() + 2);

    let mydate = {
      day: date.toLocaleString("en-us", { weekday: "short" }),
      month: date.toLocaleString("en-us", { month: "short" }),
      date: date.toLocaleString("en-us", { day: "2-digit" }),
      time_from: date.toLocaleString("en-us", { hour: "2-digit" }),
      time_after: time_length.toLocaleString("en-us", { hour: "2-digit" })
    };
    newModel.dates.push(mydate);
  });
}

function decodeUsers(json_users, newModel) {
  json_users.map(element => {
    myuser = {
      name: element.Nom,
      status: element.Statut,
      availability: element.Disponibilité
    };
    newModel.users.push(myuser);
  });
}

function decodeModel(json) {
  let newModel = model;

  json_dates = json.Calendrier;
  json_users = json.Participants;

  decodeDates(json_dates, newModel);
  decodeUsers(json_users, newModel);
}

function update(newModel) {
  if (newModel != model) {
    renderTableView();
    renderCalendarView();
  }
}

function initModel() {
  let path = "/cal-data.json";
  fetch(path)
    .then(resp => resp.json())
    .then(json => decodeModel(json))
    .then(newModel => update(newModel))
    .catch(function (err) {
      console.log(err);
    });
}

function init() {
  initModel();
}

function initListeners() { }

window.onload = init;
