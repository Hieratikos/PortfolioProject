/**
 * Created by Admin on 4/30/2017.
 */

$(document).ready(function () {
    var lat = ""; var lon = ""; var country = ""; var city = ""; var state = ""; var temp = ""; var pic = "";
    var wkey = "134a2a3a1e2502e7415f6d6502a136ff/";
    var lockey = "AIzaSyBPfJzCZ-L3MGzaS3cLCqyV1wbS9pZ5T50";
    var geokey = "AIzaSyDY2_Bp1ICPX4-_HGHgokCAz67za-p6zG4";
    var geolockey = "AIzaSyD48iTPeJpCIyau5j6eRlXAHEYhrzNS1wY";


    if (navigator.geolocation.getCurrentPosition) {
        navigator.geolocation.getCurrentPosition(function(position) {
             lat = position.coords.latitude;
             lon = position.coords.longitude;
             //extra coords to play with:
            //Bergen, Norway
            // lat = 60.391920;
            // lon = 5.322118;
            //Lebanon, Missouri
            //  lat = 37.670487;
            //  lon = -92.752806;
            //Badwater, California (Death Valley)
            // lat = 36.22972;
            // lon = -116.7682987;
            //Santa Monica, California
            // lat = 34.011776;
            // lon = -118.494807;
            //Seattle, Washington
            // lat = 47.612329;
            // lon = -122.338294;
            //Rome, Italy
            // lat = 41.905314;
            // lon = 12.484865;
            //Johannesburg, South Africa
            // lat = -26.139839;
            // lon = 27.993798;
            //Pico Bolivar (summit), Merida, Venezuela
            // lat = 8.5408552;
            // lon = -71.0487095;
            var map = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lon +
                "&zoom=13&size=500x500&markers=color:0xFF7E5F|" + lat + "," + lon + "&key=" + lockey;
            $("#imgMap").attr("src", map);
            $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon +
                "&result_type=street_address&key=" + geokey, function (reply, status) {
                var stuff = status;
                if (reply.status === "ZERO_RESULTS"){
                    $("#city").hide();
                    $("#state").hide();
                    $("#country").html("You live in the middle of nowhere.<br/>Run. Swim. Fly. <br/>Get out of there.");
                }
                for (var i = 0; i < reply.results[0].address_components.length; i++){
                    for (var j = 0; j < reply.results[0].address_components[i].types.length; j++){
                        if (reply.results[0].address_components[i].types[j] === "locality"){
                            city = reply.results[0].address_components[i].long_name;
                        }
                        if (reply.results[0].address_components[i].types[j] === "administrative_area_level_1"){
                            state = reply.results[0].address_components[i].long_name;
                        }
                        if (reply.results[0].address_components[i].types[j] === "country"){
                            country = reply.results[0].address_components[i].long_name;
                        }
                    }
                }
                $("#city").html(city + ", ");
                $("#state").html(state);
                $("#country").html(country);
            });
             $.getJSON("https://crossorigin.me/https://api.darksky.net/forecast/" + wkey + lat + ',' + lon, function(reply) {
                temp = Math.round(reply.currently.temperature);
                pic = reply.currently.icon;
                desc = reply.currently.summary;
                $("#temp").html(temp);
                $("#desc").html(desc);
                $("#unit").html("F");
                 getIcon(pic);
                //console.log(reply);
            });
        });
    }
    $("#unit").click(function () {
        if ($(this)[0].innerHTML !== "F"){
            $("#temp").html(temp);
            $(this).html("F");
        }else{
            $(this).html("C");
            var cent = Math.round((parseFloat($("#temp")[0].innerHTML) -32)*5/9);
            $("#temp").html(cent);
        }
    })
});

function getIcon(weatherPic) {
    var wPic = weatherPic.toLowerCase();
    switch (wPic){
        case 'clear-day':
            wPic = "clear";
            displayIcon(wPic);
            break;
        case 'clear-night':
            wPic = "night-clear";
            displayIcon(wPic);
            break;
        case 'wind':
            displayIcon(wPic);
            break;
        case 'cloudy':
            displayIcon(wPic);
            break;
        case 'partly-cloudy-day':
            wPic = "partCloudDay";
            displayIcon(wPic);
            break;
        case 'partly-cloudy-night':
            wPic = "partCloudNight";
            displayIcon(wPic);
            break;
        case 'hail':
            displayIcon(wPic);
            break;
        case 'fog':
            displayIcon(wPic);
            break;
        case 'tornado':
            displayIcon(wPic);
            break;
        case 'rain':
            displayIcon(wPic);
            break;
        case 'snow':
            displayIcon(wPic);
            break;
        case 'sleet':
            displayIcon(wPic);
            break;
        case 'thunderstorm':
            displayIcon(wPic);
            break;
        default:
            $('div.clouds').removeClass('hide');
    }
}

function displayIcon(wPic){
    $('div.' + wPic).removeClass('hide');
}
