function checkButton(myId) {
    var img = document.getElementById(myId);
    if (img.src.includes("/check.png")) {
        img.src = "tick-check.png";
    } else {
        img.src = "check.png";
    }
}
