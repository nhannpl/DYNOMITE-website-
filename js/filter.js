var filterDivID = "filters";

var isListView = location.href.substring(location.href.lastIndexOf('/') + 1).split('?')[0] == 'listview.html';
var isMapView = location.href.substring(location.href.lastIndexOf('/') + 1).split('?')[0] == 'mapview.html';
var isRestaurantPage = location.href.substring(location.href.lastIndexOf('/') + 1).split('?')[0] == 'restaurantview.html';

// Select all checkboxes with the name 'settings' using querySelectorAll.
var checkboxes = document.getElementById(filterDivID).querySelectorAll("input[type=checkbox]");
var enabledSettings = []

// Add an eventListener to each checkbox in checkboxes
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    console.log("Updating Filter");
    console.log(enabledSettings);

    enabledSettings = Array.from(checkboxes).filter(i => i.checked).map(i => i.value);
    
    if(isListView)
      executeSearch(document.getElementById(searchBarID).value);
    else if(isMapView)
      filterMarkers(enabledSettings);
    else if(isRestaurantPage)
      renderMenu();

    console.log("Filter Updated");
    console.log(enabledSettings);
  })
});