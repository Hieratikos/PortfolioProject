/**
 * Created by Admin on 5/14/2017.
 */
var app = angular.module("WikiApp",[]).config(function($sceDelegateProvider){
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://en*.wikipedia.org/**'
    ]);
});
app.controller("WikiCtrl", function ($scope, $http) {
    var form = $('form');
    var close = $('.eks');
    var input = $('input');
    var search = $('#search');
    var help = $('#help');
    $scope.results = [];
    
    close.on('click', function () {
        form.toggleClass('open');
        if (!form.hasClass('open') && $scope.searchTxt !== '' && typeof $scope.searchTxt !== 'undefined'){
            search.toggleClass('fullHeight');
            help.toggleClass('hide');
            $scope.searchTxt = '';
        }
        $scope.results = [];
        $scope.$apply();
    });

    input.on('transitionend', function () {
        if (form.hasClass('open')) {
            input.focus();
        } else {
            return;
        }
    });

    $scope.search = function () {
        $scope.results = [];
        var outputData = {};
        outputData.title = "";
        outputData.body = "";
        outputData.page = "";
        outputData.thumb = "";
        var blankImgPath = "https://res.cloudinary.com/hieratikos/image/upload/v1494970037/ImageNA_mopexa.svg";
        help.addClass('hide');
        search.removeClass('fullHeight');
        var title = input.val();
        var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
        var cb = '&callback';
        var page = 'https://en.wikipedia.org/?curid=';

        $http.jsonp(api + title + cb).then(function (response) {
            results = response.data.query.pages;
            angular.forEach(results, function (v,k) {
                outputData = new Object();
                outputData.title = v.title;
                outputData.body = v.extract;
                outputData.page = page + v.pageid;
                if (typeof v.thumbnail !== 'undefined'){
                    outputData.thumb = v.thumbnail.source;
                }
                else{
                    outputData.thumb = blankImgPath;
                }
                $scope.results.push(outputData);
            })
        })
    }
});