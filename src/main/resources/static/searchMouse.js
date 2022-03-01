/*-------------------------------------------------------
---------------------------------------------------------

                JS content: Search Mouse

---------------------------------------------------------
---------------------------------------------------------

    Checks user device

    Burger menu

    Theme

---------------------------------------------------------



---------------------------------------------------------

    Call functions on load

-------------------------------------------------------*/





$(function() {
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

    // Changes burger icon lines color on hover
    $('.burger-icon').on('mouseover', function () {
        $('.burger-lines').css('background-color', 'var(--primaryColor)');
    }).on('mouseout', function () {
        $('.burger-lines').css('background-color', 'var(--themeReverseColor)');
    });


    // Toggle burger menu on click
    $('.burger-icon, #screen-cover, #side-menu-close').on('click', function () {
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
    });

/*---------------------
    Burger menu - end
---------------------*/


/*-----------------
    Theme - start
-----------------*/

    let systemTheme;
    // Checks system color scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        systemTheme = 'light';
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        systemTheme = 'dark';
    } else {
        systemTheme = 'gray';
    }

    // Sets website theme based on system color scheme (systemTheme)
    let theme = localStorage.getItem('theme') || systemTheme;
    let backgroundColor;
    let reverseColor;
    let borderColor;
    let hoverColor;

    function setTheme() {
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

        // Changes only applied to "Compare Shapes" page
        /*if ($('body').is('#compare-shapes')) {
            // Sets align button color due to border-color changes overwriting currently active alignment outline.
            setAlignButtonColor();
        }*/
    }


    // Change theme on theme-button click
    $('.theme-options-btn').on('click', function () {
        if (this.id === 'theme-option-light') {
            theme = 'light';
        } else if (this.id === 'theme-option-gray') {
            theme = 'gray';
        } else if (this.id === 'theme-option-dark') {
            theme = 'dark';
        }
        localStorage.setItem('theme', theme);
        setTheme();
    });


    // Shows what theme is being hovered
    $('.theme-options-btn').on('mouseenter mouseleave', function () {
        let text;
        if (this.id === 'theme-option-light') {
            text = 'light';
        } else if (this.id === 'theme-option-gray') {
            text = 'gray';
        } else if (this.id === 'theme-option-dark') {
            text = 'dark';
        }
        $('#theme-text-hover').text(text).toggle();
    });

/*---------------
    Theme - end
---------------*/



    $.get("/getAllMice", function (mouseList) {
        let result =
            "<thead>"+
                "<tr>" +
                    "<td>Brand</td>" +
                    "<td>Name</td>" +
                    "<td>Length</td>" +
                    "<td>Width</td>" +
                    "<td>Height</td>" +
                    "<td>Weight</td>" +
                    "<td>Shape</td>" +
                    "<td>Connectivity</td>" +
                    "<td>Sensor</td>" +
                    "<td>DPI</td>" +
                    "<td>Polling Rate</td>" +
                "</tr>" +
            "</thead>" +
            "<tbody>";
        for (const mouse of mouseList) {
            let shape;
            if (mouse.shape) {
                shape = 'ergonomic';
            } else {
                shape = 'ambidextrous';
            }

            let connectivity;
            if (mouse.wireless) {
                connectivity = 'wireless';
            } else {
                connectivity = 'wired';
            }

            result +=
                "<tr>" +
                    "<td>" + mouse.brand + "</td>" +
                    "<td>" + mouse.name + "</td>" +
                    "<td>" + parseFloat(mouse.length) + "</td>" +
                    "<td>" + parseFloat(mouse.width) + "</td>" +
                    "<td>" + parseFloat(mouse.height) + "</td>" +
                    "<td>" + parseFloat(mouse.weight) + "</td>" +
                    "<td>" + shape + "</td>" +
                    "<td>" + connectivity + "</td>" +
                    "<td>" + mouse.sensor + "</td>" +
                    "<td>" + parseFloat(mouse.maxDPI) + "</td>" +
                    "<td>" + parseFloat(mouse.pollingRate) + "</td>" +
                "</tr>"
        }
        result += "</tbody>";
        $('#mouse-table').html(result);
    });



    $('#filter-btn-apply').on('mouseover', function () {
        $(this).css({
            'outline-color': 'rgb(39, 93, 219)',
            'box-shadow': '0 3px 0 2px rgb(23,55,131)'
        });
        $('.fa-filter').css({
            'color': 'rgb(39, 93, 219)',
            'font-size': '1.4rem'
        });
    }).on('mouseout', function () {
        $(this).css({
            'outline-color': 'var(--themeBorderColor)',
            'box-shadow': '0 3px 0 2px gray'
        });
        $('.fa-filter').css({
            'color': 'var(--themeReverseColor)',
            'font-size': '1.1rem'
        });
    });

    $('#filter-btn-reset').on('mouseover', function () {
        $(this).css({
            'outline-color': 'orange',
            'box-shadow': '0 3px 0 2px rgb(183,118,0)'
        });
        $('.fa-arrows-rotate').css({
            'color': 'orange',
            'transform': 'translate(-50%, -50%) rotate(180deg)'
        });
    }).on('mouseout', function () {
        $(this).css({
            'outline-color': 'var(--themeBorderColor)',
            'box-shadow': '0 3px 0 2px gray'
        });
        $('.fa-arrows-rotate').css({
            'color': 'var(--themeBorderColor)',
            'transform': 'translate(-50%, -50%) rotate(0deg)'
        });
        $('.fa-arrows-rotate').css('color', 'var(--themeReverseColor)');
    });

    $('#filter-btn-close').on('mouseover', function () {
        $(this).css({
            'outline-color': 'red',
            'box-shadow': '0 3px 0 2px rgb(153,0,0)'
        });
        $('.fa-xmark').css({
            'color': 'red',
            'font-size': '1.3rem'
        });
    }).on('mouseout', function () {
        $(this).css({
            'outline-color': 'var(--themeBorderColor)',
            'box-shadow': '0 3px 0 2px gray'
        });
        $('.fa-xmark').css({
            'color': 'var(--themeReverseColor)',
            'font-size': '1rem'
        });
    });

    $('.filter-heading-btn').on('mouseover', function () {
        $(this).find('i').css('color', 'var(--primaryColor)');
    }).on('mouseout', function () {
        $(this).find('i').css('color', 'var(--themeReverseColor)');
    });

    $('.filter-heading-btn').each(function () {
        $(this).on('click', function () {
            if ($(this).next().css('display') === 'none') {
                $(this).next().css('display', 'flex');
                $(this).find('.fa-angle-down').css('transform', 'translateY(-50%) rotate(-180deg)');
            } else {
                $(this).next().css('display', 'none');
                $(this).find('.fa-angle-down').css('transform', 'translateY(-50%) rotate(0)');
            }
        });
    });

    $('.brand-option, #brand-select-all-div').on('click', function (x) {
        if (!$(x.target).is('input') && !$(x.target).is('label')) {
            let checkbox = $(this).find('input');
            if (checkbox.prop('checked') === false) {
                checkbox.prop('checked', true);
            } else {
                checkbox.prop('checked', false);
            }
        }
    });

    $('.brand-option, .brand-option input, .brand-option label').not($('#brand-select-all-div, #brand-select-all, #brand-select-all-div label')).on('click', function () {
        let allSelected = true;
        $('#filter-expandable-brand input').not($('#brand-select-all')).each(function () {
            if ($(this).prop('checked') === false) {
                allSelected = false;
            }
        });
        $('#brand-select-all').prop('checked', allSelected);
    });

    $('#brand-select-all-div, #brand-select-all, #brand-select-all-div label').on('click', function () {
        let checkbox = $('#brand-select-all');
        if (checkbox.prop('checked') === false) {
            $('#filter-expandable-brand input').not(checkbox).prop('checked', false);
        } else {
            $('#filter-expandable-brand input').not(checkbox).prop('checked', true);
        }
    });

    $('.brand-option, #brand-select-all-div').on('mouseover', function () {
        $(this).find('input').css({
            'border-width': '2px',
            'background-color': 'var(--themeHoverColor)'
        });
    }).on('mouseleave', function () {
        $(this).find('input').css({
            'border-width': '1px',
            'background-color': 'var(--themeBackgroundColor)'
        });
    });

    $('#activate-filter-btn').on('click', function () {
        $('#filter-main').css('display', 'flex');
        setTimeout(function () {
            $('#filter-main').css('transform', 'translateX(0)');
        });
    });

    $('#filter-btn-close').on('click', function () {
        $('#filter-main').css('transform', 'translateX(-110%)');
        setTimeout(function () {
            $('#filter-main').css('display', 'none');
        }, 200);
    });


    $('#slider-range-length').slider({
        range: true,
        min: 0,
        max: 100,
        values: [0,100],
        slide:function(event, ui) {
            $('#filter-length-min').val($('#slider-range-length').slider('values', 0));
            $('#filter-length-max').val($('#slider-range-length').slider('values', 1));
        },
        stop: function(event, ui) {
            $('#filter-length-min').val(ui.values[0]);
            $('#filter-length-max').val(ui.values[1]);
        }
    });

    $('#slider-range-width').slider({
        range: true,
        min: 0,
        max: 100,
        values: [0,100],
        slide:function(event, ui) {
            $('#filter-width-min').val($('#slider-range-width').slider('values', 0));
            $('#filter-width-max').val($('#slider-range-width').slider('values', 1));
        },
        stop: function(event, ui) {
            $('#filter-width-min').val(ui.values[0]);
            $('#filter-width-max').val(ui.values[1]);
        }
    });

    $('#slider-range-height').slider({
        range: true,
        min: 0,
        max: 100,
        values: [0,100],
        slide:function(event, ui) {
            $('#filter-height-min').val($('#slider-range-height').slider('values', 0));
            $('#filter-height-max').val($('#slider-range-height').slider('values', 1));
        },
        stop: function(event, ui) {
            $('#filter-height-min').val(ui.values[0]);
            $('#filter-height-max').val(ui.values[1]);
        }
    });

    $('#slider-range-weight').slider({
        range: true,
        min: 0,
        max: 100,
        values: [0,100],
        slide:function(event, ui) {
            $('#filter-weight-min').val($('#slider-range-weight').slider('values', 0));
            $('#filter-weight-max').val($('#slider-range-weight').slider('values', 1));
        },
        stop: function(event, ui) {
            $('#filter-weight-min').val(ui.values[0]);
            $('#filter-weight-max').val(ui.values[1]);
        }
    });




/*--------------------------------
    Call functions on load - start
--------------------------------*/

    setTheme();

/*------------------------------
    Call functions on load - end
------------------------------*/
});