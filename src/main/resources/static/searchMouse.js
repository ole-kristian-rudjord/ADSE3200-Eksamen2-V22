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
    $('.burger-icon, #screen-cover-burger, #side-menu-close').on('click', function () {
        if ($('#side-menu').css('display') === 'none') {
            $('#side-menu').css('display', 'flex');
            setTimeout(function () {
                $('#side-menu').css('transform', 'translate(0)');
                $('#screen-cover-burger').css('display', 'flex');
            });
        } else {
            $('#side-menu').css('transform', 'translate(110%)');
            $('#screen-cover-burger').css('display', 'none');
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




/*-----------------------
    Mouse table - start
-----------------------*/

    $.get("/getAllMice", function (mouseList) {
        let result =
            "<thead>"+
                "<tr>" +
                    "<td class='string'>Brand</td>" +
                    "<td class='string'>Name</td>" +
                    "<td class='number'>Length</td>" +
                    "<td class='number'>Width</td>" +
                    "<td class='number'>Height</td>" +
                    "<td class='number'>Weight</td>" +
                    "<td class='string'>Shape</td>" +
                    "<td class='string'>Connectivity</td>" +
                    "<td class='string'>Sensor</td>" +
                    "<td class='number'>DPI</td>" +
                    "<td class='number'>Polling Rate</td>" +
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
                    "<td class='string'>" + mouse.brand + "</td>" +
                    "<td class='string'>" + mouse.name.replace(/\-/g, '&#8209;') + "</td>" + // &#8209; to avoid wrapping
                    "<td class='number'>" + parseFloat(mouse.length) + "</td>" +
                    "<td class='number'>" + parseFloat(mouse.width) + "</td>" +
                    "<td class='number'>" + parseFloat(mouse.height) + "</td>" +
                    "<td class='number'>" + parseFloat(mouse.weight) + "</td>" +
                    "<td class='string'>" + shape + "</td>" +
                    "<td class='string'>" + connectivity + "</td>" +
                    "<td class='string'>" + mouse.sensor + "</td>" +
                    "<td class='number'>" + parseFloat(mouse.maxDPI) + "</td>" +
                    "<td class='number'>" + parseFloat(mouse.pollingRate) + "</td>" +
                "</tr>"
        }
        result += "</tbody>";
        $('#mouse-table').html(result);
    });

/*---------------------
    Mouse table - End
---------------------*/



/*-------------------------------
    Filter main buttons - Start
-------------------------------*/

    $('#activate-filter-btn').on('click', function () {
        $('#filter-main').css('display', 'flex');
        setTimeout(function () {
            $('#filter-main').css('transform', 'translateX(0)');
        });
        $(this).css('display', 'none');
        $('#screen-cover-filter').css('display', 'block');
    });

    $('#filter-btn-apply').on('click', function () {

    });

    $('#filter-btn-reset').on('click', function () {

    });

    $('#filter-btn-close, #screen-cover-filter').on('click', function () {
        $('#activate-filter-btn').css('display', 'block');
        $('#filter-main').css('transform', 'translateX(-110%)');
        setTimeout(function () {
            $('#filter-main').css('display', 'none');
        }, 200);
        $('#screen-cover-filter').css('display', 'none');
    });

    $('#filter-btn-open').on('click', function () {
        $('.filter-expandable').each(function () {
            $(this).css('display', 'flex');
        })
    });

    $('#filter-btn-collapse').on('click', function () {
        $('.filter-expandable').each(function () {
            $(this).css('display', 'none');
        })
    });

    $('#filter-btn-help').on('click', function () {

    });

    $('.filter-buttons-div button').bind('mouseover focusin', function () {
        if (this.id === 'filter-btn-apply') {
            $(this).css({
                'outline-color': 'rgb(39, 93, 219)',
                'box-shadow': '0 3px 0 2px rgb(23,55,131)'
            });
            $(this).find('.icon').css({
                'color': 'rgb(39, 93, 219)',
                'font-size': '1.4rem'
            });
        } else if (this.id === 'filter-btn-reset') {
            $(this).css({
                'outline-color': 'orange',
                'box-shadow': '0 3px 0 2px rgb(183,118,0)'
            });
            $(this).find('.icon').css({
                'color': 'orange',
                'transform': 'translate(-50%, -50%) rotate(180deg)'
            });
        } else if (this.id === 'filter-btn-close') {
            $(this).css({
                'outline-color': 'red',
                'box-shadow': '0 3px 0 2px rgb(153,0,0)'
            });
            $(this).find('.icon').css({
                'color': 'red',
                'font-size': '1.3rem'
            });
        } else if (this.id === 'filter-btn-open') {
            $(this).css({
                'outline-color': 'rgb(39, 93, 219)',
                'box-shadow': '0 3px 0 2px rgb(23,55,131)'
            });
            $(this).find('.icon').css({
                'color': 'rgb(39, 93, 219)',
                'font-size': '1.2rem'
            });
        } else if (this.id === 'filter-btn-collapse') {
            $(this).css({
                'outline-color': 'red',
                'box-shadow': '0 3px 0 2px rgb(153,0,0)'
            });
            $(this).find('.icon').css({
                'color': 'red',
                'font-size': '1.2rem'
            });
        } else if (this.id === 'filter-btn-help') {
            $(this).css({
                'outline-color': 'rgb(64,167,19)',
                'box-shadow': '0 3px 0 2px rgb(38,100,11)'
            });
            $(this).find('.icon').css({
                'color': 'rgb(64,167,19)',
                'font-size': '1.2rem'
            });
        }
    }).bind('mouseout focusout', function () {
        $(this).css({
            'outline-color': 'var(--themeBorderColor)',
            'box-shadow': '0 3px 0 2px gray'
        });
        if (this.id === 'filter-btn-apply') {
            $(this).find('.icon').css({
                'color': 'var(--themeReverseColor)',
                'font-size': '1.1rem'
            });
        } else if (this.id === 'filter-btn-reset') {
            $(this).find('.icon').css({
                'color': 'var(--themeReverseColor)',
                'transform': 'translate(-50%, -50%) rotate(0deg)'
            });
        } else {
            $(this).find('.icon').css({
                'color': 'var(--themeReverseColor)',
                'font-size': '1rem'
            });
        }
    });

    $('.filter-heading-btn').bind('mouseover focusin', function () {
        $(this).find('i').css('color', 'var(--primaryColor)');
    }).bind('mouseout focusout', function () {
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

/*-----------------------------
    Filter main buttons - End
-----------------------------*/


/*----------------------
    Checkmarks - Start
----------------------*/

    $('.checkmark-option, .checkmarks-select-all').on('click', function (x) {
        if (!$(x.target).is('input') && !$(x.target).is('label')) {
            let checkbox = $(this).find('input');
            if (checkbox.prop('checked') === false) {
                checkbox.prop('checked', true);
            } else {
                checkbox.prop('checked', false);
            }
        }
    });

    $('.checkmark-option, .checkmark-option input, .checkmark-option label')
        .not($('.checkmarks-select-all, .checkmarks-select-all input, .checkmarks-select-all label'))
        .on('click', function () {
        let allBrandsSelected = true;
        $('#filter-expandable-brand input').not($('#brand-select-all')).each(function () {
            if ($(this).prop('checked') === false) {
                allBrandsSelected = false;
            }
        });
        $('#brand-select-all').prop('checked', allBrandsSelected);
        let allSensorsSelected = true;
        $('#filter-expandable-sensor input').not($('#sensor-select-all')).each(function () {
            if ($(this).prop('checked') === false) {
                allSensorsSelected = false;
            }
        });
        $('#sensor-select-all').prop('checked', allSensorsSelected);
    });

    $('.checkmarks-select-all, .checkmarks-select-all input, .checkmarks-select-all label').on('click', function () {
        let checkboxBrand = $('#brand-select-all');
        if (checkboxBrand.prop('checked') === false) {
            $('#filter-expandable-brand input').not(checkboxBrand).prop('checked', false);
        } else {
            $('#filter-expandable-brand input').not(checkboxBrand).prop('checked', true);
        }
        let checkboxSensor = $('#sensor-select-all');
        if (checkboxSensor.prop('checked') === false) {
            $('#filter-expandable-sensor input').not(checkboxSensor).prop('checked', false);
        } else {
            $('#filter-expandable-sensor input').not(checkboxSensor).prop('checked', true);
        }
    });

    $('.checkmark-option, .checkmarks-select-all').on('mouseover', function () {
        if (!isOnMobile()) {
            $(this).find('input').css({
                'border-width': '2px',
                'background-color': 'var(--themeHoverColor)'
            });
        }
    }).on('mouseleave', function () {
        if (!isOnMobile()) {
            $(this).find('input').css({
                'border-width': '1px',
                'background-color': 'var(--themeBackgroundColor)'
            });
        }
    });

/*--------------------
    Checkmarks - End
--------------------*/


/*-------------------
    Sliders - Start
-------------------*/

    $.get("/getSliderValues", function (sliderValues) {
        console.log(sliderValues);
    })

    const defaultMinLength = 0;
    const defaultMaxLength = 100;
    $('#slider-range-length').prev('input').val(defaultMinLength);
    $('#slider-range-length').next('input').val(defaultMaxLength);
    $('#slider-range-length').slider({
        range: true,
        min: 0,
        max: 100,
        values: [0,100],
        slide:function(event, ui) {
            $('#filter-length-min').val(ui.values[0]);
            $('#filter-length-max').val(ui.values[1]);
        },
        stop: function(event, ui) {
            $('#filter-length-min').val(ui.values[0]);
            $('#filter-length-max').val(ui.values[1]);
        }
    });

    const defaultMinWidth = 0;
    const defaultMaxWidth = 100;
    $('#slider-range-width').prev('input').val(defaultMinWidth);
    $('#slider-range-width').next('input').val(defaultMaxWidth);
    $('#slider-range-width').slider({
        range: true,
        min: 0,
        max: 100,
        values: [defaultMinWidth, defaultMaxWidth],
        slide:function(event, ui) {
            $('#filter-width-min').val(ui.values[0]);
            $('#filter-width-max').val(ui.values[1]);
        },
        stop: function(event, ui) {
            $('#filter-width-min').val(ui.values[0]);
            $('#filter-width-max').val(ui.values[1]);
        }
    });

    const defaultMinHeight = 0;
    const defaultMaxHeight = 100;
    $('#slider-range-height').prev('input').val(defaultMinHeight);
    $('#slider-range-height').next('input').val(defaultMaxHeight);
    $('#slider-range-height').slider({
        range: true,
        min: 0,
        max: 100,
        values: [0,100],
        slide:function(event, ui) {
            $('#filter-height-min').val(ui.values[0]);
            $('#filter-height-max').val(ui.values[1]);
        },
        stop: function(event, ui) {
            $('#filter-height-min').val(ui.values[0]);
            $('#filter-height-max').val(ui.values[1]);
        }
    });

    const defaultMinWeight = 0;
    const defaultMaxWeight = 100;
    $('#slider-range-weight').prev('input').val(defaultMinWeight);
    $('#slider-range-weight').next('input').val(defaultMaxWeight);
    $('#slider-range-weight').slider({
        range: true,
        min: 0,
        max: 100,
        values: [0,100],
        slide:function(event, ui) {
            $('#filter-weight-min').val(ui.values[0]);
            $('#filter-weight-max').val(ui.values[1]);
        },
        stop: function(event, ui) {
            $('#filter-weight-min').val(ui.values[0]);
            $('#filter-weight-max').val(ui.values[1]);
        }
    });

    const defaultMinDpi = 0;
    const defaultMaxDpi = 100;
    $('#slider-range-dpi').prev('input').val(defaultMinDpi);
    $('#slider-range-dpi').next('input').val(defaultMaxDpi);
    $('#slider-range-dpi').slider({
        range: true,
        min: 0,
        max: 100,
        values: [0,100],
        slide:function(event, ui) {
            $('#filter-dpi-min').val(ui.values[0]);
            $('#filter-dpi-max').val(ui.values[1]);
        },
        stop: function(event, ui) {
            $('#filter-dpi-min').val(ui.values[0]);
            $('#filter-dpi-max').val(ui.values[1]);
        }
    });

    const defaultMinPollingRate = 0;
    const defaultMaxPollingRate = 100;
    $('#slider-range-pollingRate').prev('input').val(defaultMinPollingRate);
    $('#slider-range-pollingRate').next('input').val(defaultMaxPollingRate);
    $('#slider-range-pollingRate').slider({
        range: true,
        min: defaultMinPollingRate,
        max: defaultMaxPollingRate,
        values: [defaultMinPollingRate,defaultMaxPollingRate],
        slide:function(event, ui) {
            $('#filter-pollingRate-min').val(ui.values[0]);
            $('#filter-pollingRate-max').val(ui.values[1]);
        },
        stop: function(event, ui) {
            $('#filter-pollingRate-min').val(ui.values[0]);
            $('#filter-pollingRate-max').val(ui.values[1]);
        }
    });

/*-----------------
    Sliders - End
-----------------*/


/*--------------------------
    Checkbox-buttons - End
--------------------------*/

    function activateCheckboxesShape() {
        $('input[name="filter-shape"], input[name="filter-connectivity"]').each(function () {
            if ($(this).prop('checked') === true) {
                $(this).prev('label').css({
                    'border': '2px solid var(--primaryColor)',
                    'box-shadow': '0 3px 0 0 var(--primaryDarkColor)'
                });
            } else if ($(this).prop('checked') === false) {
                $(this).prev('label').css({
                    'border': '2px solid var(--themeBorderColor)',
                    'box-shadow': '0 3px 0 0 gray'
                });
            }
        });
    }

    $('input[name="filter-shape"], input[name="filter-connectivity"]').on('change', function () {
        activateCheckboxesShape();
    });

/*--------------------------
    Checkbox-buttons - End
--------------------------*/


/*---------------------------
    Reset functions - Start
---------------------------*/





/*---------------------------
    Reset functions - Start
---------------------------*/



/*--------------------------------
    Call functions on load - start
--------------------------------*/

    setTheme();
    activateCheckboxesShape();

/*------------------------------
    Call functions on load - end
------------------------------*/
});