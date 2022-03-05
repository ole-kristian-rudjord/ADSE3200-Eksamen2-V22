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


    function createErrorMessage(message) { /* fix transitions and layout */
        let errorMessageLi = document.createElement('li');
        errorMessageLi.className = 'error-message-li';
        let errorMessageSpan = document.createElement('span');
        errorMessageSpan.innerText = message;
        // errorMessageSpan.title = 'click to remove';
        errorMessageLi.append(errorMessageSpan);
        $('#error-messages-list').append(errorMessageLi);
        setTimeout(function () {
            $('.error-message-li').last().css({
                'opacity': '1',
                'transform': 'translateY(0)'
            });
        }, 0);
        setTimeout(function () {
            let translateX;
            if ($(window).width() > 850) { // media queries start at 850px
                translateX = 'translateX(100%)';
            } else {
                translateX = 'translateX(-100%)';
            }
            $('.error-message-li').first().css({
                'transform': translateX,
                'opacity': '0'
            });
        }, 5500);
        setTimeout(function () {
            $('.error-message-li').first().remove();
        }, 6100); // + transition time
    }


/*-----------------------
    Mouse table - start
-----------------------*/

    function formatTable(mouseList) {
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
            "</thead>";
        if (mouseList === 'fail: loading') {
            $('#mouse-table').html(result);
            createErrorMessage('Mouse information failed to load, please try again later'); /* fix transitions and layout */
        } else if (mouseList === 'fail: filter-search') {
            createErrorMessage('Filters did not match mice from the database'); /* fix transitions and layout */
        } else {
            result += "<tbody>";
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
                    "<td class='string'>" + mouse.model.replace(/-/g, '&#8209;') + "</td>" + // &#8209; to avoid wrapping
                    "<td class='number'>" + parseFloat(mouse.length) + "</td>" +
                    "<td class='number'>" + parseFloat(mouse.width) + "</td>" +
                    "<td class='number'>" + parseFloat(mouse.height) + "</td>" +
                    "<td class='number'>" + parseFloat(mouse.weight) + "</td>" +
                    "<td class='string'>" + shape + "</td>" +
                    "<td class='string'>" + connectivity + "</td>" +
                    "<td class='string'>" + mouse.sensor + "</td>" +
                    "<td class='number'>" + parseFloat(mouse.dpi) + "</td>" +
                    "<td class='number'>" + parseFloat(mouse.pollingRate) + "</td>" +
                    "</tr>"
            }
            result += "</tbody>";
            $('#mouse-table').html(result);
        }
    }

    $.get("/getAllMice", function (mouseList) {
        formatTable(mouseList);
    }).fail(function (status) {
        formatTable('fail: loading');
    })

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
        let brandList = [];
        $('.brand-option input').each(function () {
            if ($(this).prop('checked')) {
                brandList.push($(this).next('label').text());
            }
        });

        let sensorList = [];
        $('.sensor-option input').each(function () {
            if ($(this).prop('checked')) {
                sensorList.push($(this).next('label').text());
            }
        });

        const filteredMouseSearch = {
            brandList: brandList,
            lengthMin: $('#filter-length-min').val(),
            lengthMax: $('#filter-length-max').val(),
            widthMin: $('#filter-width-min').val(),
            widthMax: $('#filter-width-max').val(),
            heightMin: $('#filter-height-min').val(),
            heightMax: $('#filter-height-max').val(),
            weightMin: $('#filter-weight-min').val(),
            weightMax: $('#filter-weight-max').val(),
            wired: $('#filter-shape-wired').prop('checked'),
            wireless: $('#filter-shape-wireless').prop('checked'),
            ambidextrous: $('#filter-shape-ambidextrous').prop('checked'),
            ergonomic: $('#filter-shape-ergonomic').prop('checked'),
            sensorList: sensorList,
            dpiMin: $('#filter-dpi-min').val(),
            dpiMax: $('#filter-dpi-max').val(),
            pollingRateMin: $('#filter-pollingRate-min').val(),
            pollingRateMax: $('#filter-pollingRate-max').val()
        }
        console.log(filteredMouseSearch);
        $.get("/getFilteredMice", filteredMouseSearch, function(mouseList) {
            formatTable(mouseList);
        }).fail(function (status) {
            formatTable('fail: filter-search');
        });
    });

    $('#filter-btn-reset').on('click', function () {
        $('.filter-checkmarks input, .filter-checkbox-buttons input').prop('checked', true);
        activateCheckboxesShape();
        $('.filter-dimensions-slider').each(function() {
            const thisId = ''+this.id;
            const specificFilter = thisId.replace('slider-range-', '');
            const inputMin = 'filter-' + specificFilter + '-min';
            const inputMax = 'filter-' + specificFilter + '-max';
            let maxValue;
            switch (specificFilter) {
                case 'length':
                    maxValue = maxValues.length;
                    break;
                case 'width':
                    maxValue = maxValues.width;
                    break;
                case 'height':
                    maxValue = maxValues.height;
                    break;
                case 'weight':
                    maxValue = maxValues.weight;
                    break;
                case 'dpi':
                    maxValue = maxValues.dpi;
                    break;
                case 'pollingRate':
                    maxValue = maxValues.pollingRate;
                    break;
                default:
                    maxValue = null;
                    break;
            }
            $(this).slider({
                values: [0, maxValue]
            });
            $('#' + inputMin).val(0);
            $('#' + inputMax).val(maxValue);
        });
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

    function formatChecklist(list, category) {
        let selectAllDiv = document.createElement('div');
        selectAllDiv.id = category + '-select-all-div';
        selectAllDiv.className = 'checkmarks-select-all';
        $('#filter-expandable-' + category).append(selectAllDiv);

        let selectAllInput = document.createElement('input');
        selectAllInput.type = 'checkbox';
        selectAllInput.checked = true;
        selectAllInput.id = category + '-select-all';
        selectAllDiv.append(selectAllInput);

        let selectAllLabel = document.createElement('label');
        selectAllLabel.htmlFor = category + '-select-all'; // try: selectAllLabel.htmlFor = selectAllInput.id;
        selectAllLabel.textContent = 'Select All';
        selectAllDiv.append(selectAllLabel);

        let optionsDiv = document.createElement('div');
        optionsDiv.id = category + '-options-div';
        optionsDiv.className = 'checkmark-options-div';
        $('#filter-expandable-' + category).append(optionsDiv);

        for (const name of list) {
            let optionDiv = document.createElement('div');
            optionDiv.className = category + '-option checkmark-option';
            optionsDiv.append(optionDiv);

            let optionInput = document.createElement('input');
            optionInput.type = 'checkbox';
            optionInput.checked = true;
            optionInput.id = category + '-' + name;
            optionDiv.append(optionInput);

            let optionLabel = document.createElement('label');
            optionLabel.htmlFor = category + '-' + name; // try: optionLabel.htmlFor = optionInput.id;
            optionLabel.textContent = name;
            optionDiv.append(optionLabel);
        }
    }

    $.get('/getDistinctCategoryItems?category=' + 'brand', function (mouseList) {
        let brandList = [];
        for (const mouse of mouseList) {
            brandList.push(mouse.brand);
        }
        formatChecklist(brandList, 'brand');
    });

    $.get('/getDistinctCategoryItems?category=' + 'sensor', function (mouseList) {
        let sensorList = [];
        for (const mouse of mouseList) {
            sensorList.push(mouse.sensor);
        }
        formatChecklist(sensorList, 'sensor');
    });

    $('body').on('click', '.checkmark-option, .checkmarks-select-all', function (x) {
        if (!$(x.target).is('input') && !$(x.target).is('label')) {
            let checkbox = $(this).find('input');
            if (checkbox.prop('checked') === false) {
                checkbox.prop('checked', true);
            } else {
                checkbox.prop('checked', false);
            }
        }
    });

    $('body').on('click', '.checkmark-option, .checkmark-option input, .checkmark-option label', function () {
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

    $('body').on('click', '.checkmarks-select-all, .checkmarks-select-all input, .checkmarks-select-all label', function () {
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

    $('body').on('mouseover', '.checkmark-option, .checkmarks-select-all', function () {
        if (!isOnMobile()) {
            $(this).find('input').css({
                'border-width': '2px',
                'background-color': 'var(--themeHoverColor)'
            });
        }
    }).on('mouseleave', '.checkmark-option, .checkmarks-select-all', function () {
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
    let maxValues = {}

    $.ajax({
        url: "/getSliderValues",
        dataType: 'json',
        type: 'get',
        async: false,
        data: {},
        success: function (sliderValuesMax) {
            maxValues = sliderValuesMax;
        },
        error: function () {
            alert('error');
        }
    })

    $('#slider-range-length').prev('input').val(0);
    $('#slider-range-length').next('input').val(maxValues.length);
    $('#slider-range-length').slider({
        range: true,
        min: 0,
        max: maxValues.length,
        values: [0, maxValues.length],
        slide:function(event, ui) {
            $('#filter-length-min').val(ui.values[0]);
            $('#filter-length-max').val(ui.values[1]);
        },
        stop: function(event, ui) {
            $('#filter-length-min').val(ui.values[0]);
            $('#filter-length-max').val(ui.values[1]);
        }
    });

    $('#slider-range-width').prev('input').val(0);
    $('#slider-range-width').next('input').val(maxValues.width);
    $('#slider-range-width').slider({
        range: true,
        min: 0,
        max: maxValues.width,
        values: [0, maxValues.width],
        slide:function(event, ui) {
            $('#filter-width-min').val(ui.values[0]);
            $('#filter-width-max').val(ui.values[1]);
        },
        stop: function(event, ui) {
            $('#filter-width-min').val(ui.values[0]);
            $('#filter-width-max').val(ui.values[1]);
        }
    });

    $('#slider-range-height').prev('input').val(0);
    $('#slider-range-height').next('input').val(maxValues.height);
    $('#slider-range-height').slider({
        range: true,
        min: 0,
        max: maxValues.height,
        values: [0, maxValues.height],
        slide:function(event, ui) {
            $('#filter-height-min').val(ui.values[0]);
            $('#filter-height-max').val(ui.values[1]);
        },
        stop: function(event, ui) {
            $('#filter-height-min').val(ui.values[0]);
            $('#filter-height-max').val(ui.values[1]);
        }
    });

    $('#slider-range-weight').prev('input').val(0);
    $('#slider-range-weight').next('input').val(maxValues.weight);
    $('#slider-range-weight').slider({
        range: true,
        min: 0,
        max: maxValues.weight,
        values: [0, maxValues.weight],
        slide:function(event, ui) {
            $('#filter-weight-min').val(ui.values[0]);
            $('#filter-weight-max').val(ui.values[1]);
        },
        stop: function(event, ui) {
            $('#filter-weight-min').val(ui.values[0]);
            $('#filter-weight-max').val(ui.values[1]);
        }
    });

    $('#slider-range-dpi').prev('input').val(0);
    $('#slider-range-dpi').next('input').val(maxValues.dpi);
    $('#slider-range-dpi').slider({
        range: true,
        min: 0,
        max: maxValues.dpi,
        values: [0, maxValues.dpi],
        slide:function(event, ui) {
            $('#filter-dpi-min').val(ui.values[0]);
            $('#filter-dpi-max').val(ui.values[1]);
        },
        stop: function(event, ui) {
            $('#filter-dpi-min').val(ui.values[0]);
            $('#filter-dpi-max').val(ui.values[1]);
        }
    });

    $('#slider-range-pollingRate').prev('input').val(0);
    $('#slider-range-pollingRate').next('input').val(maxValues.pollingRate);
    $('#slider-range-pollingRate').slider({
        range: true,
        min: 0,
        max: maxValues.pollingRate,
        values: [0, maxValues.pollingRate],
        slide:function(event, ui) {
            $('#filter-pollingRate-min').val(ui.values[0]);
            $('#filter-pollingRate-max').val(ui.values[1]);
        },
        stop: function(event, ui) {
            $('#filter-pollingRate-min').val(ui.values[0]);
            $('#filter-pollingRate-max').val(ui.values[1]);
        }
    });

    $('.filter-dimensions-div input').on('keyup', function () {
        if ((''+this.id).includes('min') && $(this).val() - 1 < $(this).next().next('input').val()) {
            $(this).next(('.filter-dimensions-slider')).slider({
                values: [$(this).val(), $(this).next().next('input').val()]
            });
        } else if (('' + this.id).includes('max') && $(this).val() + 1 > $(this).prev().prev('input').val()) {
            $(this).prev(('.filter-dimensions-slider')).slider({
                values: [$(this).prev().prev('input').val(), $(this).val()]
            });
        }
    });
/*-----------------
    Sliders - End
-----------------*/


/*--------------------------
    Checkbox-buttons - End
--------------------------*/

    function activateCheckboxesShape() {
        $('.filter-checkbox-buttons input').each(function () {
            if ($(this).prop('checked') === true) {
                $(this).prev('label').css({
                    'border-color': 'var(--primaryColor)',
                    'box-shadow': '0 3px 0 0 var(--primaryDarkColor)'
                });
            } else if ($(this).prop('checked') === false) {
                $(this).prev('label').css({
                    'border-color': 'var(--themeBorderColor)',
                    'box-shadow': '0 3px 0 0 gray'
                });
            }
        });
    }

    $('.filter-checkbox-buttons input').on('change', function () {
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