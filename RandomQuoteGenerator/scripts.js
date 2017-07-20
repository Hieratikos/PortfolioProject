var currentQuote = "", currentAuthor = "";

function openURL(url){
    window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,' +
        'location=0 ,statusbar=0,menubar=0, resizable=0');
}
$(document).ready(function () {
    getQuote();
    $("#new-quote").on("click", getQuote);
    $('#tweet-quote').on('click', function() {
        openURL('https://twitter.com/intent/tweet?hashtags=quotes&via=Hieratikos&related=freecodecamp&text=' +
            fixedEncodeURIComponent('"' + currentQuote + '" --' + currentAuthor));
    });
});
//this encodes per RFC 3986
function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
        return '%' + c.charCodeAt(0).toString(16);
    });
}
function getQuote() {
    $.ajax({
        url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
        success: function (data) {
            //parse away the <p></p> tags from the JSON stream so the content doesn't displace the fontawesome quotes in the display
            currentAuthor = data[0].title.replace(/<\/?[^>]+>/gi, ' ');
            currentQuote = data[0].content.replace(/<\/?[^>]+>/gi, ' ').trim();

            $('.quote-author').animate({
                    opacity: 0
                }, 500,
                function() {
                    $(this).animate({
                        opacity: 1
                    }, 500);
                    $('#author').html(data[0].title.replace(/<\/?[^>]+>/gi, ' '));
                });

            $('.quote-text').animate({
                    opacity: 0
                }, 500,
                function() {
                    $(this).animate({
                        opacity: 1
                    }, 500);
                    $('#text').html(data[0].content.replace(/<\/?[^>]+>/gi, ' ').trim());
                });

        },
        cache:false
    })
}
function inIframe () {
    try {
        return window.self !== window.top;
    }
    catch (e) {
        return true;
    }
}