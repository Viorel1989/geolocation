$(document).ready(function () {
  $("#addressForm").submit(function (event) {
    event.preventDefault();

    let address = $("#address").val();

    if (address === "") {
      $("#addressFeedback").css("display", "inline");
    } else {
      $("#addressFeedback").css("display", "none");

      $("#findBtn").prop("disabled", true);

      $("#loadingSpinner").show();

      function drawResult(data) {
        const headerID = "adressFormResultHeader";
        const listId = "addressFormResults";

        if (!$("#" + headerID).length) {
          $('<h3 class="mt-5" id="' + headerID + '">Result</h3>').appendTo(
            $("#resultsSection")
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

        if ($("#addressFormResults li").length > 0) {
          $("#bookmarkBtn").prop("disabled", false);
        } else {
          $("#bookmarkBtn").prop("disabled", true);
        }
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
        $("#findBtn").prop("disabled", false);
        $("#loadingSpinner").hide();
      });
    }
  });
});
