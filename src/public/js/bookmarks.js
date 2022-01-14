$(document).ready(function () {
  function getBookmarks() {
    $.getJSON("users/bookmarks", (data) => {
      console.log(data.bookmarks);
      if (data.bookmarks.length > 0) {
        $("#bookmarksRows").empty();
        $.each(data.bookmarks, function (i, bookmarks) {
          $(
            '<tr><td><a href="#" class="bookmarkAnchor" data-bookmark-name="' +
              bookmarks.address +
              ' "> ' +
              bookmarks.name +
              '</a></td><td> <button class="btn btn-danger bookmarkDeleteButton" data-bookmark-id="' +
              bookmarks.id +
              '" >Delete</button></td>'
          ).appendTo($("#bookmarksRows"));
        });
      } else {
        $("#bookmarksRows").empty();
        $(
          "<tr><td><p>No bookmarks yet, feel free to ad one</p></td></tr>"
        ).appendTo($("#bookmarksRows"));
      }
    });
  }

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
        $("#bookmarkModal").modal("hide");
        getBookmarks();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
        // $("#bookmarkFeedback").css("display", "inline");
      },
      complete: function (jqXHR) {
        $("#modalMessage").text(jqXHR.responseJSON.message);
        getBookmarks();
      },
    });
  });

  $(document).on("click", ".bookmarkDeleteButton", function () {
    const id = $(this).data("bookmark-id");
    console.log(id);

    $.ajax({
      type: "delete",
      url: "users/bookmarks/" + id,
      contentType: "application/json",
      dataType: "json",
      success: function () {
        getBookmarks();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
      },
    });
  });

  getBookmarks();
});
