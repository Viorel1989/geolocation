let input = document.getElementById("address");
let button = document.getElementById("bookmarkBtn");

input.addEventListener("input", statehandle);

function statehandle() {
  if (input.value.length <= 3) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}

$("#bookmarkSubmit").click(function () {
  let address = $("#address").val();
  let bookmarkName = $("#bookmarkName").val();

  $("#bookmarkModal").on("hidden.bs.modal", function (e) {
    $("#modalMessage").text("");
  });

  console.log(JSON.stringify(address));
  console.log(JSON.stringify(bookmarkName));

  $.ajax({
    type: "POST",
    url: "/users/bookmarks",
    dataType: "json",
    data: JSON.stringify({ address: address, bookmarkName: bookmarkName }),
    contentType: "application/json",
    success: function (data) {
      $("#modalMessage").text(data.message);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
      // $("#bookmarkFeedback").css("display", "inline");
    },
  }).done(function () {
    console.log("done");
    //$("#bookmarkBtn").prop("disabled", true);
  });
});
