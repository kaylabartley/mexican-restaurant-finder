/* saves previously used zipcodes to local client-side storage */

function persistInput(input)
{
  var key = "input-" + input.id;

  var storedValue = localStorage.getItem(key);

  if (storedValue)
      input.value = storedValue;

  input.addEventListener('input', function ()
  {
      localStorage.setItem(key, input.value);
  });
}

var inputElement = document.getElementById("cit");

persistInput(inputElement);

/*----------------------------------------------------------------------*/

$(document).ready(function() {
    var input = document.getElementById('cit');
    var autocomplete = new google.maps.places.Autocomplete(input);
    var lat=0;
    var long = 3;
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        document.getElementById('cit').value = place.name;
        lat = place.geometry.location.lat();
        long = place.geometry.location.lng();
    });
    $("#submit").on("click", function() {
        select(lat, long);
    });

/*--------------------------------------------------------------------*/

    function select(a, b) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://developers.zomato.com/api/v2.1/search?lat=" + a +"&lon=" + b +"&cuisines=73&count=100",
            "method": "GET",
            "headers": {
                "user-key": "384dbc2b2ccd44eb60741dba023aaecf",
                'Content-Type': 'application/x-www-form-urlencoded'
            }

        }
    
        $.getJSON(settings, function(data) {
    
        data = data.restaurants;
        var html = "";
    
        $.each(data, function(index, value) {
            var x = data[index];
            // loop of data array
            $.each(x, function(index, value) {
            var location = x.restaurant.location;
            var userRating = x.restaurant.user_rating;
            html += "<div class='data'>";
            html +=     "<p class='votes' style= 'display:inline;float: left;'>" + userRating.votes + " votes</p>";
            html +=     "<span title='" + userRating.rating_text + "'><p style='color:white;background-color:#" + userRating.rating_color + ";padding:2px 10px 2px 10px;text-align: center;text-decoration:none;display:inline-block;font-size:16px;float:right;'><strong>" + userRating.aggregate_rating + "</strong></p></span><br>";
            html +=     "<a href=" + value.url + " target='_blank' class='hide-dec'><h2><strong>" + value.name + "</strong></h2></a>";
            html +=     "<h3>" + location.locality + "</h3>";
            html +=     "<h3 style='color:grey;'><strong>" + location.address + "</strong></h3>";
            html += "</div>";
        });
        });
        $(".scroll").css("background-color", "white");
        $(".print").html(html);
        });
    
    }
});