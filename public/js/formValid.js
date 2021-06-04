$(document).ready(function() {
    $("#addressForm").submit(function(event){
        event.preventDefault();
        let address = $("#address").val();


        if(address === ""){
            $("#address").addClass("form-control is-invalid");
            $("#address").append('<div class="invalid-feedback">Please provide an address</div>');
        } else {

            $.ajax({
                type: 'POST',
                url: '/',
                data: {address},
                success: function(data){
                  $("#addressForm").append('<h3 class ="mt-5">Result</h3>');
                  $("#addressForm").append('<ul class ="list-group list-group-flush" id="resultList"></ul>');
                  $.each(data.result, function(i, result) {
                    $("#resultList").append('<li class="list-group-item">'+ result +'</li>')
                  });
                }              
              });
            
            // $.post("/",function(data){
            //     console.log(data);
            // });
            
        }
    })
});
