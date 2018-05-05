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

    //close the modal image with the escape key if it is open; otherwise, slide the panel back
    window.addEventListener('keydown', function(e) {
        if (e.code === "Escape") {
            if ($("#myModal")[0].style.display === "block"){
                $("#myModal")[0].style.display = "none";
            }else{
                location.href = "#";
                scrollToWindowPosition(e);
            }
        }
    });
    $("#grid li a").on("click", function(e){
        setPanelImageMargin();
    });
});
//the window's resize event has to be bound outside of the document.ready so the margin doesn't get set prematurely
$(window).on("resize", function(e){
    setPanelImageMargin();
});
// var x = 0;
// function printTest(e) {
//     console.log(e);
// }

//setPanelImageMargin makes images on a sliding div responsive when they couldn't be otherwise
//media queries change the widths so the effect is seamless.
function setPanelImageMargin(){
    $(".projImgDetail").css("margin-left", ($(window).width() - $(".projImgDetail").width())/2);
    $("#vertEslImg").css("margin-left", ($(window).width() - $("#vertEslImg").width())/2);
}

//email submit
function confirmMsg() {
    alert("Thank you for your interest. This page is under construction.");
    location.href = location.pathname;
    location.href = "#";
}

//target all the "CLOSE >>" buttons on the transition panels
const CLOSE_PANEL_BUTTON_LIST = document.querySelectorAll(".button");

//target all the project hexes on the main page
const SET_WINDOW_COORDS_HEXES = document.querySelectorAll(".overlay");
var x = 0;
var y = 0;

//assign the "scrollToWindowPosition" function after the sliding transition has completed
//this way, the hexes don't jump back to the top of the page after viewing the sliding detail panel
CLOSE_PANEL_BUTTON_LIST.forEach(function(closebutton){
    closebutton.addEventListener("click", function(e) {
        location.href = "#";
        scrollToWindowPosition();
    });
});

//assign the current window coordinates to local variables every time the user clicks on one of the hexes
SET_WINDOW_COORDS_HEXES.forEach(function(hex){
    hex.addEventListener("click", function (e) {
        setWindowPosition(window.scrollX, window.scrollY);
        });
});
function scrollToWindowPosition(){
    window.scrollTo(x, y);
}
function setWindowPosition(x, y){
    this.x = x;
    this.y = y;
}