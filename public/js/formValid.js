$(document).ready(function() {
    $("addressForm").submit(function (event){
        let formData = {address: $("address").val()};
        event.preventDefault();
    $.ajax({
        type: "POST",
        url: "/ajaxForm",
        data: formData,
        dataType: "json"
    }).done(function (data){
        let address = $("address").val();
        if(address === ""){
            $("#address").addClass("form-control is-invalid");
            $("#address").append('div class="invalid-feedback"' + "Please provide an address");
        } else {
            response.data.features.forEach(feature => {
                document.createElement("li").textContent=`${feature.properties.address_line1}, ${feature.properties.city}, ${feature.properties.state}, ${feature.properties.country}`;
            });

        }
    })
    } 
});