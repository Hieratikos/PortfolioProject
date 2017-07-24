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