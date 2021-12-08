let input = document.getElementById("address");
let button = document.getElementById("bookmarkBtn");
var data = input.value;

button.disabled = true;

input.addEventListener("input", statehandle);

function statehandle() {
  if (input.value.length <= 3) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}
