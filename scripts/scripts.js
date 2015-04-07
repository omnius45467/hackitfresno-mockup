/**
 * Created by jeremyrobles on 4/7/15.
 */
'use strict';

$( '.include' ).load( 'parts/include.html' );

var d = new Date();

var month = d.getMonth()+1;
var day = d.getDate();

var output =
    month + ((''+month).length<2 ? '' : '') + '|'+ day + '|' + ((''+day).length<2 ? '' : '') + d.getFullYear();
var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var weekday = weekdays[d.getDay()];

function clock() {
    var now = new Date();
    var outStr = now.getHours() + ':' + (now.getMinutes()<10?'0' + now.getMinutes() :''+ now.getMinutes()) + ':' + (now.getSeconds()<10?'0' + now.getSeconds() :'' + now.getSeconds());
    document.getElementById('clockDiv').innerHTML=outStr;
    setTimeout('clock()',1000);
}
clock();


$('.time').html(output);
$('.date').html(weekday);


function process_bookmark(bookmarks) {

    for (var i =0; i < bookmarks.length; i++) {
        var bookmark = bookmarks[i];
        if (bookmark.url) {
            console.log("bookmark: "+ bookmark.title + " ~  " + bookmark.url);
        }

        if (bookmark.children) {
            process_bookmark(bookmark.children);
        }
    }
}