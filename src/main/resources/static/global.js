$(function () {
/*-----------------
    Theme - start
-----------------*/
    // Sets locally stored theme to gray if none are detected
    if (localStorage.getItem('theme') === null) {
        localStorage.setItem('theme', 'gray');
    }


    // Change theme on theme-button click
    $('.theme-options-btn').on('click', function () {
        if (this.id === 'theme-option-light') {
            localStorage.setItem('theme', 'light');
        } else if (this.id === 'theme-option-gray') {
            localStorage.setItem('theme', 'gray');
        } else if (this.id === 'theme-option-dark') {
            localStorage.setItem('theme', 'dark');
        }
        setTheme();
    });


    // Shows what theme is being hovered
    $('.theme-options-btn').bind('mouseenter focusin', function () {
        let text;
        if (this.id === 'theme-option-light') {
            text = 'light';
        } else if (this.id === 'theme-option-gray') {
            text = 'gray';
        } else if (this.id === 'theme-option-dark') {
            text = 'dark';
        }
        $('#theme-text-hover').text(text);
        $('#theme-text-hover').css('display', 'block');
    }).bind('mouseleave focusout', function () {
        $('#theme-text-hover').text('');
        $('#theme-text-hover').css('display', 'none');
    });
/*---------------
    Theme - end
---------------*/


/*--------------------------------------
        Call functions on load - start
--------------------------------------*/
    setTheme();
/*--------------------------------
    Call functions on load - end
--------------------------------*/


/*-----------------------
    Burger menu - start
-----------------------*/
    // Changes burger icon lines color on hover
    $('.burger-icon').on('mouseover', function () {
        $('.burger-lines').css('background-color', 'var(--primaryColor)');
    }).on('mouseout', function () {
        $('.burger-lines').css('background-color', 'var(--themeReverseColor)');
    });


    // Toggle burger menu on click
    $('.burger-icon, #screen-cover-burger, #side-menu-close').on('click', function () {
        if ($('#side-menu').css('display') === 'none') {
            $('#side-menu').css('display', 'flex');
            $('#screen-cover-burger').css('display', 'flex');
            setTimeout(function () {
                $('#side-menu').css('transform', 'translate(0)');
                $('#screen-cover-burger').css('opacity', '1');
            });
        } else {
            $('#side-menu').css('transform', 'translate(110%)');
            $('#screen-cover-burger').css('opacity', '0');
            setTimeout(function () {
                $('#side-menu').css('display', 'none');
                $('#screen-cover-burger').css('display', 'none');
            }, 200);
        }
    });
/*---------------------
    Burger menu - end
---------------------*/
});



/*-----------------
    Theme - start
-----------------*/
function setTheme() {
    let theme = localStorage.getItem('theme');

    let backgroundColor;
    let reverseColor;
    let borderColor;
    let hoverColor;

    // Checks active theme
    if (theme === 'light') {
        backgroundColor = 'white';
        reverseColor = 'black';
        borderColor = 'black';
        hoverColor = 'rgb(230,230,230)';
    } else if (theme === 'gray') {
        backgroundColor = 'rgb(32,32,32)';
        reverseColor = 'rgb(220,220,220)';
        borderColor = 'rgb(220,220,220)';
        hoverColor = 'rgb(45,45,45)';
    } else if (theme === 'dark') {
        backgroundColor = 'black';
        reverseColor = 'rgb(220,220,220)';
        borderColor = 'rgb(190,190,190)';
        hoverColor = 'rgb(35,35,35)';
    }

    $(':root').css({
        '--themeHoverColor': hoverColor,
        '--themeBackgroundColor': backgroundColor,
        '--themeReverseColor': reverseColor,
        '--themeBorderColor': borderColor
    });

    $('body').css('background-color', backgroundColor);

    // Changes current theme icon
    $('.theme-options-btn').css('border', 'var(--themeBorderColor) solid 2px');
    $('#theme-option-' + theme).css('border', 'var(--primaryColor) solid 4px');
}
/*---------------
    Theme - end
---------------*/


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


/*--------------------------
    Error Messages - start
--------------------------*/
function createErrorMessage(message) {
    let errorMessageLi = document.createElement('li');
    errorMessageLi.className = 'error-message-li';
    let errorMessageSpan = document.createElement('span');
    errorMessageSpan.innerText = message;
    // errorMessageSpan.title = 'click to remove';
    errorMessageLi.append(errorMessageSpan);
    $('#error-messages-list').append(errorMessageLi);
    if ($('body').is('#compare-shapes')) {
        if (!isOnMobile()) {
            setTimeout(function () {
                $('.error-message-li').first().css({
                    'transform': 'translateX(100%)',
                    'opacity': '0'
                });
            }, 5500);
            setTimeout(function () {
                $('.error-message-li').first().remove();
            }, 6100); // + transition time
        } else {
            setTimeout(function () {
                $('.error-message-li').first().css({
                    'transform': 'translateX(-100%)',
                    'opacity': '0'
                });
            }, 5000);
            setTimeout(function () {
                $('.error-message-li').first().remove();
            }, 6100); // + transition time
        }
    } else if ($('body').is('#search-mouse')) {
        if (!isOnMobile()) {
            setTimeout(function () {
                $('.error-message-li').first().css({
                    'color': 'var(--themeHoverColor)'
                });
            }, 5000);
            setTimeout(function () {
                $('.error-message-li').first().remove();
            }, 5200); // + transition time
        } else {
            setTimeout(function () {
                $('.error-message-li').first().css({
                    'color': 'var(--themeHoverColor)'
                });
            }, 5000);
            setTimeout(function () {
                $('.error-message-li').first().remove();
            }, 5200); // + transition time
        }
    }
}
/*------------------------
    Error Messages - end
------------------------*/