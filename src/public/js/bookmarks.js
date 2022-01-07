$(document).ready(function () {
  function getBookmarks() {
    $.getJSON("users/bookmarks", (data) => {
      $.each(data.bookmarks, function (i, bookmarks) {
        $(
          "<tr><td> " +
            bookmarks.name +
            '</td><td> <button class="btn btn-danger" value="' +
            bookmarks.id +
            '" >Delete</button></td>'
        ).appendTo($("tbody"));
      });
    });
  }

  $("button").click(function () {
    let bookmarkId = $(this).val();
    console.log(bookmarkId);

    $.ajax({
      type: "DELETE",
      url: "/users/bookmarks",
      dataType: "json",
      data: JSON.stringify({ address: address, bookmarkName: bookmarkName }),
      contentType: "application/json",
      success: function (data) {
        getBookmarks();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
        // $("#bookmarkFeedback").css("display", "inline");
      },
      complete: function (jqXHR) {
        $("#modalMessage").text(jqXHR.responseJSON.message);
      },
    });
  });

  $("#bookmarkSubmit").click(function () {
    let address = $("#address").val();
    let bookmarkName = $("#bookmarkName").val();

    $("#bookmarkModal").on("hidden.bs.modal", function (e) {
      $("#modalMessage").text("");
      $("#bookmarkNameForm").trigger("reset");
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
        getBookmarks();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
        // $("#bookmarkFeedback").css("display", "inline");
      },
      complete: function (jqXHR) {
        $("#modalMessage").text(jqXHR.responseJSON.message);
      },
    });
  });

  getBookmarks();
});
