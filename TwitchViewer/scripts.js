/**
 * Created by Admin on 6/18/2017.
 */
$(document).ready(function () {
    //THANK YOU TO DYLAN ISRAEL OF CODING TUTORIALS 360 FOR GETTING ME STARTED!!!

    //clientID key: zjn501hhvebb7krqsmz58jh6w24rov
    //search channels URL: https://api.twitch.tv/kraken/search/channels?query=<searchTerm-no brackets>;client_id=zjn501hhvebb7krqsmz58jh6w24rov
    //search games URL: https://api.twitch.tv/kraken/search/games?query=<searchTerm-no brackets>;type=suggest;client_id=zjn501hhvebb7krqsmz58jh6w24rov
    //search streams URL: https://api.twitch.tv/kraken/search/streams?query=<searchTerm-no brackets>;client_id=zjn501hhvebb7krqsmz58jh6w24rov
    //users and channels are the same thing--streams are the content sessions

    //user story 1: I can see whether Free Code Camp is currently streaming on Twitch.tv.
    var logo;
    var status;
    var name;
    var displayNames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
    var urlChan = "https://api.twitch.tv/kraken/channels/";
    $.ajax({
        type:"GET",
        url: "https://api.twitch.tv/kraken/streams/freecodecamp",
        headers:{
            'Client-ID':'zjn501hhvebb7krqsmz58jh6w24rov',
            'Accept': 'application/vnd.twitchtv.v3+json'
        },
        success: function (data1) {
            //user story 2: I can click the status output and be sent directly to the Free Code Camp's Twitch.tv channel.
            var fccStatus = "<a href='https://www.twitch.tv/freecodecamp' style='text-decoration: none'>";
            if (data1.stream===null){
                fccStatus += "freeCodeCamp is OFFLINE";
            }else{
                fccStatus += "freeCodeCamp is ONLINE";
            }
            fccStatus += "</a>";
            $("#fccStatus").html(fccStatus);
            var test = "some text";
            $("fccStatus").append(test);
            getChannels();
        }
    });

    function getChannels() {
        for (var i = 0; i < displayNames.length; i++){
            $.ajax({
                type: "GET",
                url: urlChan + displayNames[i],
                headers: {
                    'Client-ID': 'zjn501hhvebb7krqsmz58jh6w24rov',
                    'Accept': 'application/vnd.twitchtv.v3+json'
                },
                success: function (data2) {
                    if (data2.status===null){
                        logo = "http://res.cloudinary.com/hieratikos/image/upload/v1497914499/offline_burned_va3nzk.png";
                        status = "<span style='color:red'>Channel Offline</span>";
                        name = "<a href='" + data2.url + "' target='_blank' style='text-decoration: none'>" + data2.display_name + "</a>";
                        printToScreen(logo, status, name);
                    }else {
                        logo = data2.logo;
                        //user story 3: if a Twitch user is currently streaming, I can see additional details about what they are streaming.
                        status = data2.status;
                        name = "<a href='" + data2.url + "' target='_blank' style='text-decoration: none'>" + data2.display_name + "</a>";
                        printToScreen(logo, status, name);
                    }
                },
                error: function (data3) {
                    //user story 4: I will see a placeholder notification if a streamer has closed their Twitch account (or the account never existed)
                    logo = "http://res.cloudinary.com/hieratikos/image/upload/v1497913727/error_zvrdsy.png";
                    status = "<span style='color:red'>" + data3.responseJSON.status + " " + data3.responseJSON.error + "</span>";
                    name = "<span style='color:red'>" + data3.responseJSON.message + "</span>";
                    printToScreen(logo, status, name);
                }
            });
        }
    }

    function printToScreen(logo, status, name){
        $("#followerInfo").prepend(
            "<div class='row'>" +
            "<div class='col-md-4'>" + "<img src='" + logo + "'>" + "</div>" +
            "<div class='col-md-4'>" + name + "</div>" +
            "<div class='col-md-4'>" + status + "</div></div>");
    }
});