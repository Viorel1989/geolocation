$(document).ready(function () {
  $("#bookmarksMenu").click(function () {
    $.getJSON("users/bookmarks", (bookmarks) => {
      //console.log(bookmarks);
      $.each(bookmarks, function (i, bookmark) {
        console.log(bookmark);
        $(".dropdown-menu").append(
          '<button class="dropdown-item" type="button"> ' +
            bookmark +
            " </button>"
        );
      });
    });
  });

  $("#addressForm").submit(function (event) {
    event.preventDefault();

    let address = $("#address").val();

    if (address === "") {
      $("#addressFeedback").css("display", "inline");
    } else {
      $("#addressFeedback").css("display", "none");

      $(".btn").prop("disabled", true);

      $("#loadingSpinner").show();

      function drawResult(data) {
        const headerID = "adressFormResultHeader";
        const listId = "addressFormResults";

        if (!$("#" + headerID).length) {
          $('<h3 class="mt-5" id="' + headerID + '">Result</h3>').insertAfter(
            $("#addressForm")
          );
        }

        if (!$("#" + listId).length) {
          $(
            '<ul class="list-group list-group-flush" id="' + listId + '"></ul>'
          ).insertAfter("#" + headerID);
        }

        $("#" + listId).empty();

        $.each(data.result, function (i, result) {
          $("#" + listId).append(
            '<li class="list-group-item">' + result + "</li>"
          );
        });
      }

      $.ajax({
        type: "POST",
        url: "/",
        data: { address },
        success: drawResult,
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR, textStatus, errorThrown);
          $("#serverFeedback").css("display", "inline");
          $("#loadingSpinner").hide();
        },
      }).done(function () {
        $(".btn").prop("disabled", false);
        $("#loadingSpinner").hide();
      });
    }
  });
});
