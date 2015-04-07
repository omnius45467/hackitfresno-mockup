/**
 * Created by jeremyrobles on 4/7/15.
 */
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");

    if($("#wrapper").hasClass("toggled")){

        $("#menu-toggle").removeClass("fa-arrow-left");
        $("#wrapper").addClass("toggled");
        $("#menu-toggle").addClass("fa-arrow-right");

    }else{

        $("#menu-toggle").hasClass("fa-arrow-right");
        $("#menu-toggle").removeClass("fa-arrow-right");
        $("#menu-toggle").addClass("fa-arrow-left");
    }

});