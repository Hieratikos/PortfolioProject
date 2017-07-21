/**
 * Created by Admin on 7/5/2017.
 */
$(document).ready(function () {
    var numCompTurns = 0;
    var curTurnNum = 0;
    var turns = [];
    var numTurn = 0;
    //change the maxTurnNum to however many turns you want to play
    var maxTurnNum = 3;
    var pulsed = 0;
    var aFace = "";
    //angry face
    var aFaceUnicode = "&#x1F620";
    var hFace = "";
    //happy face
    var hFaceUnicode = "&#x1F624";
    var sound0 = $("#sound1")[0];
    var sound1 = $("#sound2")[0];
    var sound2 = $("#sound3")[0];
    var sound3 = $("#sound4")[0];
    var buzzer = $("#Buzzer")[0];
    var woohoo = $("#WooHoo")[0];
    //isRunning is a limited way to reduce user errors
    var isRunning = false;

    //this is the interactive routine that runs when the user clicks one of the four colored buttons

    $(".regButton").click(function (e) {
        if (!isRunning) {
            //get the id# of the button
            var btnClicked = parseInt(e.target.id);
            //if that number isn't the same as the one stored in the array, notify the user
            if (btnClicked !== turns[numTurn]) {
                isRunning = true;
                setTimeout(function () {
                    wrongAnswer();
                }, 1000);
                buzzer.play();
                aFace = $(".cover").contents();
                $(".cover").html("<h1 class='face'>" + aFaceUnicode + "</h1>");
                numTurn = 0;
                //if the button id# is the same as the one stored in the array for this click sequence, flash the button, play the button's sound, and continue
            } else {
                $(".regButton[id=" + turns[numTurn] + "]").addClass("bright");
                eval("sound" + turns[numTurn] + ".play();");
                var removed = setTimeout(function () {
                    removeBright(turns[numTurn]);
                    numTurn++;
                    if (numTurn === numCompTurns) {
                        //if the user has successfully completed all turns, show a win
                        if (numCompTurns === maxTurnNum) {
                            setTimeout(function () {
                                winGame();
                            }, 1000);
                            hFace = $(".cover").contents();
                            $(".cover").html("<h1 class='face'>" + hFaceUnicode + "</h1>");
                            woohoo.play();
                        } else {
                            playTurn();
                        }
                    }
                }, 500);
            }
        }
   });
   //runs when the user completes all turns successfully
   function winGame() {
       $(".cover").html(hFace);
       reset();
       playTurn();
   }

   //runs when the user clicks a button out of sequence
   function wrongAnswer() {
       $(".cover").html(aFace);
   //if the strict option is used, reset the game completely
       if ($("input#chkStrict").prop("checked")){
           reset();
           $("input#chkPlay").prop("checked", false);
           $("input#chkStrict").prop("checked", false);
       }
       isRunning = false;
   }

   //flash the button
   function removeBright(idNum) {
       $(".regButton[id=" + idNum + "]").removeClass("bright");
   }

   //run a turn of the game
   function playTurn() {
       numCompTurns++;
       var sTurn = setInterval(function () {
           var retTurn = SimonTurn();
           if (retTurn === numCompTurns){
               clearInterval(sTurn);
               numTurn = 0;
           }
       }, 1000);
   }

   //persist the click event thru a game refresh
   $(document).on("click", "input[id=chkPlay]", function () {
       //start the game over if the user clicks the start button
        if (!$(this).prop("checked")){
            reset();
        }
        //begins a new game--if the user toggles the ON switch before clicking this button, the game will start
        else if ($(this).prop("checked") && $("#chkStart").prop("checked")){
            reset();
            playTurn();
        }
    });


   //persist the click event thru a game refresh
   $(document).on("click", "#chkStart", function(){
       //begins a new game--if the user clicks the Play button before toggling the ON switch, the game will start
        if ($(this).prop("checked") && $("input#chkPlay").prop("checked")){
            reset();
            playTurn();
        //if the user turns the game off, reset the game
        }else {
            reset();
            $("input#chkPlay").prop("checked", false);
            $("input#chkStrict").prop("checked", false);
        }
    });

   //reset all variables to their initial values
   function reset() {
       numCompTurns = 0;
       curTurnNum = 0;
       turns = [];
       numTurn = 0;
       pulsed = 0;
       $("#stepCount").html(numTurn);
       isRunning = true;
   }

   //the routine for flashing a button's color
   function pulseButton() {
       //if all buttons have been flashed, turn off the repeating interval
       if (curTurnNum === turns.length){
           console.log("curTurnNum === turns.length");
           isRunning = false;
           clearInterval(pulsed);
       //if not, flash the button, play that button's sound, and set the timeout for unflashing the button
       }else{
           $(".regButton[id=" + turns[curTurnNum] + "]").addClass("bright");
           eval("sound" + turns[curTurnNum] + ".play();");
           setTimeout(function () {
               removeBackground();
           }, 500);
           curTurnNum++;
       }
   }

   //remove the brighter color
   function removeBackground() {
       $(".regButton").removeClass("bright");
   }

   //print the turn number, generate a random number, store it in an array, and flash the button
   function SimonTurn() {
       numTurn++;
       $("#stepCount").html(numTurn);
       var choice = Math.floor(Math.random()*4);
       turns.push(choice);
       curTurnNum = 0;
       pulsed = setInterval(function () {
           pulseButton();
       }, 1000);
       return numTurn;
   }

});

