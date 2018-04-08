/**
 * Created by Admin on 5/11/2017.
 */
$(document).ready(function () {
    $("#myImgQuake").click(function () {
        $("#myModal")[0].style.display = "block";
        // $("#imgContent")[0].src = $("#myImgQuake")[0].src;
        $("#imgContent")[0].src = "images/EarthquakeMap.webp";
        $("#imgCaption").html($("#myImgQuake")[0].alt);
    });
    $("#myImgAlg").click(function () {
        $("#myModal")[0].style.display = "block";
        $("#imgContent")[0].src = "images/ShortestPath_full.webp";
        $("#imgCaption").html($("#myImgAlg")[0].alt);
    });
    $(".fa-close").click(function () {
        $("#myModal")[0].style.display = "none";
    });
    //close the modal with the escape key
    document.addEventListener('keyup', function(e) {
        if (e.keyCode === 27) {
            $("#myModal")[0].style.display = "none";
        }
    });
});
//email submit
function confirmMsg() {
    alert("Thank you for your interest. This page is under construction.");
    location.href = location.pathname;
    location.href = "#";
}
/**
 * Added by Admin on 4/07/2018.
 */
//target all the "CLOSE >>" buttons on the transition panels
const CLOSE_PANEL_BUTTON_LIST = document.querySelectorAll(".button");
//target all the project hexes on the main page
const SET_WINDOW_COORDS_HEXES = document.querySelectorAll(".overlay");
var x = 0;
var y = 0;
//assign the "scrollToWindowPosition" function after the sliding transition has completed
//this way, the hexes don't jump back to the top of the page after viewing the sliding detail panel
CLOSE_PANEL_BUTTON_LIST.forEach(function(closebutton){
    closebutton.addEventListener("transitionend", function(e) {scrollToWindowPosition(e);}, false);
});
//assign the current window coordinates to local variables every time the user clicks on one of the hexes
SET_WINDOW_COORDS_HEXES.forEach(function(hex){
    hex.addEventListener("click", function (e) {setWindowPosition(window.scrollX, window.scrollY);}, false);
});
function scrollToWindowPosition(e){
    window.scrollTo(x, y);
}
function setWindowPosition(x, y){
    this.x = x;
    this.y = y;
}
