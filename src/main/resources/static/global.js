/*------------------------------
    Checks user device - start
------------------------------*/

// Checks if user is on a mobile device (<= 850px wide screen)
function isOnMobile() {
    // 850 from media queries in CSS
    return $(window).width() <= 850;
}

// Checks if user is using a Firefox browser due to certain code not working the same as on chromium
function isOnFirefox() {
    return navigator.userAgent.indexOf('Firefox') !== -1;
}

/*----------------------------
    Checks user device - end
----------------------------*/





/*-----------------------
    Burger menu - start
-----------------------*/

function burgerIconMouseOver() {
    $('.burger-lines').css('background-color', 'var(--primaryColor)');
}

function burgerIconMouseOut() {
    $('.burger-lines').css('background-color', 'var(--themeReverseColor)');
}

function toggleSideMenu() {
    if ($('#side-menu').css('display') === 'none') {
        $('#side-menu').css('display', 'flex');
        setTimeout(function () {
            $('#side-menu').css('transform', 'translate(0)');
            $('#screen-cover').css('display', 'flex');
        });
    } else {
        $('#side-menu').css('transform', 'translate(110%)');
        $('#screen-cover').css('display', 'none');
        setTimeout(function () {
            $('#side-menu').css('display', 'none');
        }, 200);
    }
}

/*---------------------
    Burger menu - end
---------------------*/





/*-----------------
    Theme - start
-----------------*/




/*---------------
    Theme - end
---------------*/
