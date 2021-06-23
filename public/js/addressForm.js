$(document).ready(function () {
  $("#addressForm").submit(function (event) {
    event.preventDefault();
    let address = $("#address").val();


    if (address === "") {
      $("#addressFeedback").css('display', 'inline');
    } else {
      $("#addressFeedback").css('display', 'none')

      function drawResult(data) {

        const dataContainerId = 'addressFormResults';
        const listId = 'addressFormResultsData';

        if (!$("#" + dataContainerId).length) {
          $("#addressForm").append('<div id="' + dataContainerId + '"></div>')
          $("#" + dataContainerId).append('<h3 class="mt-5">Result</h3>');
          $("#" + dataContainerId).append('<ul class="list-group-flush" id="' + listId + '"></ul>');

        }

        $("#" + listId).empty()

        $.each(data.result, function (i, result) {
          $("#" + listId).append('<li class="list-group-item">' + result + "</li>");
        });
      }

      $.ajax({
        type: 'POST',
        url: '/',
        data: { address },
        success: drawResult,
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR, textStatus, errorThrown);
          $("#serverFeedback").css('display', 'inline');
        }
      });
    }



  })
});
