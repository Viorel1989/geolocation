$(document).ready(function () {
  $("#addressForm").submit(function (event) {
    event.preventDefault();
    let address = $("#address").val();

    if (address === "") {
      $("#addressFeedback").css('display', 'inline');
    } else {
      $("#addressFeedback").css('display', 'none')

      function drawResult(data) {
        if (!$("#addressFormResultHeader").length) {
          $("#addressForm").append('<h3 class = "mt-5" id="addressFormResultHeader">Result</h3>');
        }

        if (!$("#addressFormResultData").length) {
          $("#addressForm").append('<ul class="list-group-flush" id="addressFormResultData"></ul>');

          $.each(data.result, function (i, result) {
            $("#addressFormResultData").append('<li class="list-group-item">' + result + "</li>");
          });
        } else {
          $.each(data.result, function (i, result) {
            $("#addressFormResultData").replaceAll('<li class="list-group-item">' + result + "</li>");
          });
        }
      }
    }

    $.ajax({
      type: 'POST',
      url: '/',
      data: { address },
      success: drawResult,
      error: function (jqXHR, textStatus, errorThrown) {
        drawResult([errorThrown]);
        console.log(errorThrown);
      }
    });

  })
});
