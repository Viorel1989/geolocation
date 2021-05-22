const { response } = require("express");

//Form processing Ajax and jQuery goes here
$(document).ready(function() {
    //get all of the data from the form using jQuery
    $("addressForm").submit(function (event){
        event.preventDefault();
        let formData = {address: $("address").val()};
    })
    //submit the form data to the new route using AJAX
    $.ajax({
        type: "GET",
        url: "/formProcess",
        data: formData,
        dataType: "json"
    }).done(function (data){
        let address = $("address").val();

        if(formData === ""){
            $("#address").addClass("form-control is-invalid");
            $("#address").append('div class="invalid-feedback"' + "Please provide an address");
        } else {
            response.data.features.forEach(feature => {
                document.createElement("li").textContent=`${feature.properties.address_line1}, ${feature.properties.city}, ${feature.properties.state}, ${feature.properties.country}`;
            });

        }
    });

    
})