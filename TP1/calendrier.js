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
