var searchDisplayID = "listViewContent";
var searchBarID = "searchBar";
var searchButtonID = "searchButton";

// Is the current page listview.html?
var isListView = location.href.substring(location.href.lastIndexOf('/') + 1).split('?')[0] == 'listview.html';

var restaurantKey = "restaurant";
// Update selected restaurant  
var updateRestaurant = (newRestaurant) => { 
  if(localStorage.getItem("orderRestaurant") != null && localStorage.orderRestaurant != newRestaurant){  
    document.getElementById("modal-warning").classList.add("open");  
    document.getElementById("warning-start-new-order").addEventListener("click", ()=>confirmUpdateRestaurant(newRestaurant));  
  }else{  
    localStorage.setItem(restaurantKey, newRestaurant);  
    location.href = "restaurantview.html";  
  }  
}  
  
// Confirm from warning modal  
var confirmUpdateRestaurant = (newRestaurant) => {  
  localStorage.removeItem("basket");  
  localStorage.removeItem("orderRestaurant");
  localStorage.setItem(restaurantKey, newRestaurant);  

  location.href = "restaurantview.html";  
}



// Render data
var renderList = (data) => {
    console.log("Rendering List");
    console.log(data);
    var app = document.getElementById(searchDisplayID);
    var listHTMLString = ''+
        data.map(function(restaurantData){
            return '<div id="'+restaurantData["restaurantID"]+'" onclick="updateRestaurant('+restaurantData["restaurantID"]+')" class="restaurant">'+
        '<div class="restaurant-design">'+
          '<div class = "restaurant-name">'+
              restaurantData["name"]+
          '</div>'+
          '<div>'+
            '<img class="logo" src = "pictures/'+restaurantData["logo"]+'">'+
          '</div>'+
        '</div>'+

        '<div class="restaurant-info">'+
          '<div class = "restaurant-hours">'+
            '<div class = "title-hours">'+
              'Hours'+
            '</div>'+

            '<div>'+
              '<div class = "info">'+
                'Monday - Friday: '+restaurantData["mfHours"]+
              '</div>'+
  
              '<div class = "info">'+
                'Saturday - Sunday: '+restaurantData["ssHours"]+
              '</div>'+
            '</div>'+
          '</div>'+
        
          '<div class = "restaurant-location">'+
            '<div class = "title-location">'+
              'Location'+
            '</div>'+

            '<div class = "info">'+
                restaurantData["location"]+
            '</div>'+
          '</div>'+
        '</div>'+
        '<div class="restaurant-picture">'+
        '<img class = "picture" src="pictures/'+restaurantData["img"]+'">'+
        '</div>'+
      '</div>';
        }).join('');
        + '';
    app.innerHTML = listHTMLString;
    console.log("List Rendered");
    console.log(data);
}




// Handle the search query
var handleSearch = () => {
    console.log("Handling Search");
    var searchTerm = document.getElementById(searchBarID).value;
    if(isListView)
        executeSearch(searchTerm);
    else{ //if(searchTerm != ''){
        redirectSearch(searchTerm);
    }
    console.log("Search Handled");
}

// Redirect the search
var redirectSearch = (searchTerm) => {
    console.log("Redirecting Search");
    console.log(searchTerm);
    location.href = "listview.html?search=" + encodeURI(searchTerm)
    console.log("Search Redirected");
    console.log(searchTerm);
}

// Execute the search
var executeSearch = (searchTerm) => {
    console.log("Executing Search");
    console.log(searchTerm);
    if(searchTerm == ''){
        renderList(restaurantData.filter((x) => enabledSettings.every((y) => x["tags"].includes(y))));
    }else{
        // Tokenize searchTerm and trim spaces
        var tokens = searchTerm.toLowerCase().split(' ').filter(function(token){
                        return token.trim() !== '';
                        });
        if(tokens.length){
            // Create a regex of all the search terms
            var searchTermRegex = new RegExp(tokens.join('|'), 'gim');
            var filteredList = restaurantData.filter(function(restaurantData){
                // Create a string of all object values
                var listString = '';
                for(var key in restaurantData){
                    if(restaurantData.hasOwnProperty(key) && restaurantData[key] !== ''){
                        listString += restaurantData[key].toString().toLowerCase().trim() + ' ';
                    }
                }
                // Return book objects where a match with the search regex if found
                return listString.match(searchTermRegex);
            });
            // Render the search results
            renderList(filteredList.filter((x) => enabledSettings.every((y) => x["tags"].includes(y))));
        }
    }
    console.log("Search Executed");
    console.log(searchTerm);
}

if(isListView)
    renderList(restaurantData);

// On search button click, handle the search bar input
document.getElementById(searchButtonID).addEventListener("click", handleSearch);

document.getElementById(searchBarID).addEventListener("keypress", (e) => {
    if(e.key === 'Enter'){
        handleSearch();
    }
})

// Parse URI to execute search
window.onload = () => {
    if(isListView && location.search.indexOf('?search=') == 0){
        var search = location.search.substring(1);
        data = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) });
        document.getElementById(searchBarID).value = data.search;
        executeSearch(data.search);
    }
}




  

