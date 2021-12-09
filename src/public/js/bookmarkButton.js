let input = document.getElementById("address");
let button = document.getElementById("bookmarkBtn");

button.disabled = true;

input.addEventListener("input", statehandle);

function statehandle() {
  if (input.value.length <= 3) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}

$("#bookmarkBtn").click(function () {
  let address = $("#address").val();

  $.ajax({
    type: "POST",
    url: "/users/bookmarks",
    dataType: "json",
    data: { address },
    success: console.log("success"),
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    },
  }).done(function () {
    console.log("done");
  });
});
