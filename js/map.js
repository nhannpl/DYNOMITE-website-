var mapDisplayID = "mapViewContent";

var markers = restaurantData;
var gmarkers1 = [];

/*style for the map, turn off all poi*/
var myStyles = [{
    featureType: "poi",
    elementType: "labels",
    stylers: [{
        visibility: "off"
    }]
}];

/*init map*/
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(49.80944854002616, -97.13445789403056),
        zoom: 17,
        styles: myStyles
    };

    /*pop up window when click*/
    var infowindow = new google.maps.InfoWindow;
    var map = new google.maps.Map(document.getElementById(mapDisplayID), mapProp);
    var marker;//each marker(?)
    var count;//for looping

    var infoFn = function (count) {
        return function (e) {
        
        /*show name, hours and location*/
        var content = 
            '<div style = "cursor: pointer" onclick="updateRestaurant('+restaurantData[count]["restaurantID"]+')">'+
            "<p>" + restaurantData[count]["name"] + "<p>" +
            "<p></p>"+
            "<p>" + restaurantData[count]["mfHours"] + "</p>" + 
            "<p>" + restaurantData[count]["ssHours"] + "</p>"+
            "<p></p>"+
            "<p>" + restaurantData[count]["location"] + "</p>"+
            "</div>";
        infowindow.setContent(content);
        infowindow.open(map);
        infowindow.setPosition(new google.maps.LatLng(restaurantData[count]["lat"], restaurantData[count]["long"]));
        }
    };
    
    /*for adding markers*/ 
    let i = 0;
    for (let restaurant of restaurantData) {
        marker = new google.maps.Marker({
        title: restaurant["name"],
        position: new google.maps.LatLng(restaurant["lat"], restaurant["long"]),
        category: [''],
        map: map,
        content: restaurant["name"]
        });
        gmarkers1.push(marker);
        let fn = infoFn(i++);
        google.maps.event.addListener(marker, 'click', fn);
    }

    }
    /*for filter at the bottom of the map*/
    filterMarkers = function (category) {
    for (i = 0; i < gmarkers1.length; i++) {
        marker = gmarkers1[i];
        // If is same category or category not picked
        // if ((typeof marker.category == 'object' && marker.category.indexOf(category) >= 0) || category.length ==
        // 0) {
        // marker.setVisible(true);
        // }
        if(category.every((x) => restaurantData[i]["tags"].includes(x))){
            marker.setVisible(true);
        // Categories don't match 
        } else {
        marker.setVisible(false);
        }
    }
}