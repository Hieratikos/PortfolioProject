/**
 * Created by Admin on 6/20/2017.
 */
/* Thank you to Christopher Joshua's hourglass idea at: https://codepen.io/xiell/pen/aOxwBE */
/* Thank you (again) to Dylan Israel's videos at Code360 for getting me started */
$(document).ready(function () {
   var buzzer = $("#buzzer")[0];
   //buzzer.play();
   $("#reset").hide();
   var count = parseFloat($("#num").html());
   var countBreak = parseFloat($("#breakNum").html());
   var animationStarted = false;
   var isFlipped = false;
   var startBreak;

   $("#minus5Clock").click(function () {
       if (count > 5){
           count -= 5;
       }
       $("#num").html(count);
   });
    $("#add5Clock").click(function () {
        count += 5;
        $("#num").html(count);
    });
    $("#minus5Break").click(function () {
        if (countBreak > 5){
            countBreak -= 5;
        }
        $("#breakNum").html(countBreak);
    });
    $("#add5Break").click(function () {
        countBreak += 5;
        $("#breakNum").html(countBreak);
    });
    function startAnimation(numSecs) {
        $("#id_sand-bottom, #id_sand-top").css("animation-duration", numSecs + "ms");
        animationStarted = true;
    }
    function setHourglass() {
        $("#id_hourglass-bottom").addClass("hourglass-bottom");
        $("#id_hourglass-top").addClass("hourglass-top");
        $("#id_loading").addClass("loading");
        $("#id_sand-bottom").addClass("sand-bottom").css("animation-name", "bottomsand");
        $("#id_sand-top").addClass("sand-top").css("animation-name", "topsand");
    }
    function flipHourglass() {
        $("#id_loading").removeClass("spin");
        $("#id_sand-bottom").removeClass("sand-bottom");
        $("#id_sand-top").removeClass("sand-top");
        $("#id_sand-bottom").addClass("sand-top");
        $("#id_sand-top").addClass("sand-bottom");
        $("#id_sand-bottom").css("animation-name", "topsand");
        $("#id_sand-top").css("animation-name", "bottomsand");
        //clone the entire hourglass to more easily repeat the animation
        var loadOrig = $("#id_loading"), loadClone = loadOrig.clone(true);
        loadOrig.before(loadClone);
        //then remove the old one
        $("." + loadOrig.attr("class") + ":last").remove();
        isFlipped = true;
    }
    $("#start").click(function () {
        count *= 60;
        countBreak *= 60;
        var counter = setInterval(timer, 1000);
        var timerCount = parseFloat(count * 1000 - 1000);
        var breakCount = parseFloat(countBreak * 1000 - 1000);
        function timer() {
            //hide variables
            $("#start, #minus5Clock, #add5Clock, #minus5Break, #add5Break, #breakNum, #sessionTitle, #breakTitle").hide();
            $("#timeType").show();
            $("#timeType").html("Session Time: ");
            count -= 1;
            if (count === 0) {
                buzzer.play();
                clearInterval(counter);
                $("#id_sand-bottom").one("animationend", function (e) {
                    $("#id_loading").addClass("spin");
                    $("#num").html();
                    startBreak = setInterval(breakTimer, 1000);
                });
            }
            if (count % 60 >= 10) {
                $("#num").html(Math.floor(count / 60) + " : " + count % 60);
                if (animationStarted===false){
                    setHourglass();
                    startAnimation(timerCount);
                }
            } else {
                $("#num").html(Math.floor(count / 60) + " : " + "0" + count % 60);
                if (animationStarted===false){
                    setHourglass();
                    startAnimation(timerCount);
                }
            }
            function breakTimer() {
                $("#timeType").html("Break Time: ");
                countBreak -= 1;
                if (countBreak === 0) {
                    buzzer.play();
                    clearInterval(startBreak);
                    $("#reset").show();
                    $("#num, #timeType").hide();
                }
                if (countBreak % 60 >= 10) {
                    $("#num").html(Math.floor(countBreak / 60) + " : " + countBreak % 60);
                    if (isFlipped===false){
                        flipHourglass();
                        startAnimation(breakCount);
                    }
                } else {
                    $("#num").html(Math.floor(countBreak / 60) + " : " + "0" + countBreak % 60);
                    if (isFlipped===false){
                        flipHourglass();
                        startAnimation(breakCount);
                    }
                }
            }
        }
    });
    $("#reset").click(function () {
        location.reload();
    });
});