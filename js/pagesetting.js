const btnOpenModal = document.getElementById("page-setting");
const btnCloseModal = document.getElementById("close-modal");
const modalElm = document.getElementById("modal");

btnOpenModal.addEventListener("click", function () {
  modalElm.classList.add("open");
});

btnCloseModal.addEventListener("click", function () {
  modalElm.classList.remove("open");
});



// Get the modal 
var modal = document.getElementById('modal'); 
 
// When the user clicks anywhere outside of the modal, close it 
window.onclick = function(event) { 
  if (event.target == modal) { 
    console.log("Users just clicked outside the page setting model.");
    modalElm.classList.remove("open");

  } 
}


var loginOK=document.getElementById("login-OK");

loginOK.addEventListener("click", function () {
  modalElm.classList.remove("open");
});



var modalContent=document.getElementById("modal-content");

var pageSetting=document.getElementById("modal");
/*
var renderModelPageSetting=()=> {
    console.log("Rendering Page setting pop up ")
     modalContent.innerHTML=` 
        <p class="login-text">You are already logged in!</p>
        <button id="loginOK" class="login-OK-button">OK</button>
    `;




}
renderModelPageSetting();
*/

