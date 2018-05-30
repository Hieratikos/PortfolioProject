/**
 * Created by Admin on 5/11/2017.
 */
(function() {
    const   imgQuake = document.querySelector("#imgQuake"),
            modalPanel = document.querySelector("#modalPanel"),
            imgContent = document.querySelector("#imgContent"),
            imgCaption = document.querySelector("#imgCaption"),
            imgAlg = document.querySelector("#imgAlg"),
            btnClose = document.querySelector("#btnClose"),
            vertEslImg = document.querySelector("#vertEslImg"),
            PROJ_IMG_DETAIL_LIST = document.querySelectorAll(".projImgDetail"),
            HEX_COVER_LIST = document.querySelectorAll("#grid li a"),
            CLOSE_PANEL_BUTTON_LIST = document.querySelectorAll(".button"),
            SET_WINDOW_COORDS_HEXES = document.querySelectorAll(".overlay");
    //x & y are the window position coordinates (initialized)
    let x = 0,
        y = 0;

    //imgQuake is the image of the earthquake map (since I don't have a site for it)
    imgQuake.addEventListener("click", function () {
        modalPanel.style.display = "block";
        imgContent.src = "images/EarthquakeMap.jpg";
        imgCaption.innerHTML = imgQuake.alt;
    });

    //imgAlg is the image of the algorithm map (also since I don't have a site for it)
    imgAlg.addEventListener("click", function () {
        modalPanel.style.display = "block";
        imgContent.src = "images/ShortestPath.jpg";
        imgCaption.innerHTML = imgAlg.alt;
    });

    //btnClose is the big font-awesome "X" on the earthquake and algorithm image panels displays
    btnClose.addEventListener("click", function () {
        modalPanel.style.display = "none";
    });

    //so the user can hit the escape key to close the sliding panels
    window.addEventListener('keydown', function (e) {
        if (e.code === "Escape") {
            if (modalPanel.style.display === "block") {
                modalPanel.style.display = "none";
            } else {
                location.href = "#";
                scrollToWindowPosition(e);
            }
        }
    });

    //to center the image on the sliding panel when the user clicks the hex for that project
    HEX_COVER_LIST.forEach(function(hexCover){
        hexCover.addEventListener("click", function (e) {
            setPanelImageMargin(e);
        });
    });

    //setPanelImageMargin makes images on a sliding div responsive when they couldn't be otherwise
    //media queries change the widths so the effect is seamless.
    function setPanelImageMargin(e) {
        vertEslImg.style.marginLeft = ((window.innerWidth - vertEslImg.width)/2) + "px";
        PROJ_IMG_DETAIL_LIST.forEach(function(projImgDetail){
            projImgDetail.style.marginLeft = ((window.innerWidth - projImgDetail.width)/2) + "px";
        });
    }

    //email submit
    function confirmMsg() {
        alert("Thank you for your interest. This page is under construction.");
        location.href = location.pathname;
        location.href = "#";
    }

    //assign the "scrollToWindowPosition" function after the sliding transition has completed
    //this way, the hexes don't jump back to the top of the page after viewing the sliding detail panel
    CLOSE_PANEL_BUTTON_LIST.forEach(function (closebutton) {
        closebutton.addEventListener("click", function (e) {
            location.href = "#";
            scrollToWindowPosition();
        });
    });

    //assign the current window coordinates to local variables every time the user clicks on one of the hexes
    SET_WINDOW_COORDS_HEXES.forEach(function (hex) {
        hex.addEventListener("click", function (e) {
            setWindowPosition(window.scrollX, window.scrollY);
        });
    });

})();

//the window position functions are set outside the IIFE so the window doesn't reset to the default settings everytime the panels are clicked
//retrieve the stored x & y coordinates of the window position
function scrollToWindowPosition() {
    window.scrollTo(this.x, this.y);
}
//store the x & y coordinates of the window position
function setWindowPosition(x, y) {
    this.x = x;
    this.y = y;
}