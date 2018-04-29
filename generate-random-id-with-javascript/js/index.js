var randId = document.querySelector('.rand-id');
var btn = document.querySelector('button');

// Generate Pseudo Random String, if safety is important use dedicated crypto/math library for less possible collisions!
function generateID(length) {
    var text = "";
    // var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var possible = "abcdef0123456789";
    text = "0x";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

randId.innerText = generateID(40);

btn.addEventListener('click', function () {
    randId.innerText = generateID(40);
});