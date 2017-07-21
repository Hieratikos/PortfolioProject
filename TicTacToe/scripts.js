/**
 * Created by Admin on 6/30/2017.
 */
$(document).ready(function(){
    //set up the win conditions for both players: 3 row wins, 3 column wins, 1 diag and 1 reverse diag
    var human = {cols:[0,0,0], rows:[0,0,0], diag:0, rdiag:0, X:0, Y:0, name:"Human"};
    var computer = {cols:[0,0,0], rows:[0,0,0], diag:0, rdiag:0, X:0, Y:0, name:"Computer"};
    var lastTurn = false;
    var drawCondition = 0;
    var player = $("#Xs_AND_Os")[0];

    //persist the player's choice of X or O thru the refresh
    if (sessionStorage.getItem("XorO") !== null){
        if ($("input[name=optXYRadio]")[0].defaultValue === sessionStorage.getItem("XorO")){
            $("input:radio[name=optXYRadio]").val(["X"]);
        }else{
            $("input:radio[name=optXYRadio]").val(["O"]);
        }
    }

    $(".tic").click(function(){
        //when the user clicks a button, make sure they have chosen a side first
        if (!$("input[name=optXYRadio][id=idX]").prop("checked") && !$("input[name=optXYRadio][id=idO]").prop("checked")){
            $("#win")[0].innerHTML = "Please choose a side";
        }else {
            $("input[name=optXYRadio]").attr('disabled', true);
            lastTurn = false;
            $(this)[0].text = sessionStorage.getItem("XorO");
            human.X = $(this)[0].dataset.x;
            human.Y = $(this)[0].dataset.y;
            //keep track of how many squares are chosen in case we don't get a winner
            drawCondition++;
            //check if the human player won
            isWinner(human);
        }
    });

    $("input[name=optXYRadio]").click(function () {
        //make sure a space exists for the label so the table doesn't bounce when the player selects a side
        $("#win")[0].innerHTML = "&nbsp;";
        //when the user selects a side, store the value in a session variable since the page completely refreshes after each game
        sessionStorage.setItem("XorO", $("input[name=optXYRadio]:checked").val());
    });

    //toggle the music
    $("input[name=optMusicRadio]").click(function () {
        if ($("input[id=mON]").prop("checked")){
            player.play();
        }else {
            player.pause();
        }
    });

    //check the winning conditions for each player
    function isWinner(player) {
        //increment the rows array based on the X position
        player.rows[player.X]++;
        //increment the columns array based on the Y position
        player.cols[player.Y]++;
        //if X equals Y, we have a diag position
        if (player.X===player.Y){
            player.diag++;
        }
        //if X & Y add up to 2, we have a reverse diag position
        if (parseInt(player.X)+parseInt(player.Y)===2){
            player.rdiag++;
        }
        //store all the values in an array to separate the board animation from the win condition check
        var winChecker = [player.rows[player.X], player.cols[player.Y], player.diag, player.rdiag];
        for (var i = 0; i < winChecker.length; i++){
            if (winChecker[i] === 3){
                $("#win")[0].textContent = "Winner " + player.name;
                //if one of the three win conditions exists (equals 3), pass that parameter to animateBoard()
                animateBoard(i);
                lastTurn = true;
                setTimeout(function () {
                    reset();
                    },2000);
                break;
            }
            //if no win condition exists after filling the board, we have a draw
            else if (drawCondition===9){
                $("#win")[0].textContent = "Draw";
                setTimeout(function () {
                    reset();
                },2000);
            }
        }
        if (lastTurn === false){
            compTurn();
        }
    }
    function animateBoard(i) {
        //if i === 0, we have a row win: check id's 0,1,2; 3,4,5; 6,7,8
        if (i === 0) {
            //top row
            if ($("#0").text() === $("#1").text() && $("#1").text() === $("#2").text()){
                $("#0").addClass("pulse");
                $("#1").addClass("pulse");
                $("#2").addClass("pulse");
            }
            //middle row
            if ($("#3").text() === $("#4").text() && $("#4").text() === $("#5").text()){
                $("#3").addClass("pulse");
                $("#4").addClass("pulse");
                $("#5").addClass("pulse");
            }
            //bottom row
            if ($("#6").text() === $("#7").text() && $("#7").text() === $("#8").text()){
                $("#6").addClass("pulse");
                $("#7").addClass("pulse");
                $("#8").addClass("pulse");
            }
        }
        //if i === 1, we have a column win: check id's 0,3,6; 1,4,7; 2,5,8
        if (i === 1){
            //left column
            if ($("#0").text() === $("#3").text() && $("#3").text() === $("#6").text()){
                $("#0").addClass("pulse");
                $("#3").addClass("pulse");
                $("#6").addClass("pulse");
            }
            //center column
            if ($("#1").text() === $("#4").text() && $("#4").text() === $("#7").text()){
                $("#1").addClass("pulse");
                $("#4").addClass("pulse");
                $("#7").addClass("pulse");
            }
            //right column
            if ($("#2").text() === $("#5").text() && $("#5").text() === $("#8").text()){
                $("#2").addClass("pulse");
                $("#5").addClass("pulse");
                $("#8").addClass("pulse");
            }
        }
        //if i === 2, we have a diagonal win: set id's 0,4,8
        if (i === 2){
            $("#0").addClass("pulse");
            $("#4").addClass("pulse");
            $("#8").addClass("pulse");
        }
        //if i === 3, we have a reverse diagonal win: set id's 2,4,6
        if (i === 3){
            $("#2").addClass("pulse");
            $("#4").addClass("pulse");
            $("#6").addClass("pulse");
        }
    }

    function compTurn() {
        var compOpt = Math.floor(Math.random() * 9);
        if ($("a")[compOpt].text === ""){
            $("a")[compOpt].text = $("input[name=optXYRadio]:not(:checked)").val();
            computer.X = $("a")[compOpt].dataset.x;
            computer.Y = $("a")[compOpt].dataset.y;
            lastTurn = true;
            drawCondition++;
            //check if the computer player won
            isWinner(computer);
        }else{
            compTurn();
        }
    }

    function reset() {
        //wipe the slate clean
        location.href = location.pathname;
    }
});