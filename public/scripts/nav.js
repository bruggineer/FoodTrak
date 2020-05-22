$(document).ready(function () {
    $('.navbar-nav .nav-link').click(function (event) {
        event.stopPropagation();
        console.log(event.currentTarget + "//" + event.target + "//" + this);
        $('.navbar-nav .nav-link').removeClass('active');
        $(this).addClass('active');
    });
});