const btnCloseModalWarning = document.getElementById("close-modal-warning");
const modalWarningElm = document.getElementById("modal-warning");



btnCloseModalWarning.addEventListener("click", function () {
  modalWarningElm.classList.remove("open");
});


// Get the modal 
var modalWarning = document.getElementById('modal-warning'); 
var goBack=document.getElementById("warning-go-back");
var newOrder=document.getElementById("warning-start-new-order");
 
// When the user clicks anywhere outside of the modal, close it 
window.onclick = function(event) { 
  if (event.target == modalWarning ) { 
    modalWarningElm.classList.remove("open");
  } 
}

goBack.addEventListener("click", function()
{
  //window.history.go(-1);
  modalWarningElm.classList.remove("open");
});

