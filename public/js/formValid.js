$(document).ready(function() {
    $("#addressForm").submit(function(event){
        event.preventDefault();
        let address = $("#address").val();
        console.log(address);

        if(address === ""){
            $("#address").addClass("form-control is-invalid");
            $("#address").append('div class="invalid-feedback"' + "Please provide an address");
        } else {

            $.ajax({
                type: 'POST',
                url: '/ajaxPost',
                data: {address},
              });
            
            $.post("/ajaxPost",function(response){
                console.log(response);
            });
            
        }
    })
});