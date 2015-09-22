
// bind Global events on document ready
$(function() {
    // on load, hide the notification overlay object
    $('#loader-overlay').hide();


    // scroll notification overlay on mouse scroll
    /*$(window).on('scroll', function() {
     var screenTop = $(document).scrollTop();
     var topPx = (($(window).height() * 4) / 100) + screenTop;
     $('#loader-overlay').css('top', topPx);
     
     });
     */
    // validate session
    // If user is not logged In, redirect him to UserLogin.html
    (function validateUserSession() {

        var login = window.location.href.match('.*/login.html');
        var forgotPassword = window.location.href.match('.*/forgotPassword.html');
        if (!login && !forgotPassword) {
            if (typeof (window.localStorage.getItem('userId')) === 'undefined'
                    || window.localStorage.getItem('userId') === null) {

                window.location.href = 'login.html';
            }
        }
    })();

    // on page load, store the current state of the URL
    (function storeUrlState() {
        var pathName = window.location.pathname,
                hash = window.location.hash,
                search = window.location.search,
                url = (pathName ? pathName : '') + (hash ? hash : '') + (search ? search : '');
        // Only store urlState if current page is NOT UserLogin.html page
        if (!(url.toLowerCase().match('login.html'))) {
           
            window.localStorage.setItem('urlState', url);

        }

    })();

});
