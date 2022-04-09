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
/*-----------------------
    Mouse table - start
-----------------------*/
    $.get("/Global/getAllMice", function (listOfMice) {
        mouseList = listOfMice;
        formatTable('');
    }).fail(function (status) {
        formatTable('fail: loading');
    })
/*---------------------
    Mouse table - End
---------------------*/


/*-------------------------------
    Filter main buttons - Start
-------------------------------*/
    $('#main-buttons-div button').bind('mouseenter focusin', function () {
        $(this).css({
            'color': 'var(--primaryColor)',
            'background-color': 'var(--themeHoverColor)'
        });
        if (!isOnMobile()) {
            const thisSpan = $(this).find('span');
            thisSpan.css('display', 'flex');
            setTimeout(function () {
                thisSpan.css('transform', 'translateX(0)');
            });
        }
    }).bind('mouseleave focusout', function () {
        $(this).css({
            'color': 'var(--themeReverseColor)',
            'background-color': 'var(--themeBackgroundColor)'
        });
        const thisSpan = $(this).find('span');
        thisSpan.css('transform', 'translateX(-100%)');
        setTimeout(function () {
            thisSpan.css('display', 'none');
        });
    });

    $('#table-sort-btn').on('click', function () {
        if ($('#table-sort-div').css('display') === 'none') {
            $('#table-sort-div').css('display', 'flex');
            setTimeout(function () {
                $('#table-sort-div').css('transform', 'translate(50px, -100%)');
            }, 0);
        } else {
            $('#table-sort-div').css('transform', 'translate(-100%, -100%)');
            setTimeout(function () {
                $('#table-sort-div').css('display', 'none');
            }, 180);
        }
    });

    $('#activate-filter-btn').on('click', function () {
        openFilter();
    });

    $('.show-help-btn').on('click', function () {
        $('#help-div').css('display', 'flex');
        setTimeout(function () {
            $('#help-div').css('transform', 'translate(-50%, -50%)');
        }, 0);
    });

    $('#activate-search-btn').on('click', function () {
        if ($('#mouse-searching-div').css('display') === 'none') {
            $('#mouse-searching-div').css('display', 'flex');
            setTimeout(function () {
                $('#mouse-searching-div').css('transform', 'translateX(100%)');
            }, 0);
        } else {
            $('#mouse-searching-div').css('transform', 'translateX(0)');
            setTimeout(function () {
                $('#mouse-searching-div').css('display', 'none');
            }, 180);
        }
    });

    $('body').on('click', '#mouse-table thead tr td button', function () {
        if ($(this).val() === formatByCategory) {
            if (formatAscending) {
                formatAscending = false;
            } else {
                formatAscending = true;
            }
        } else {
            formatAscending = true;
        }
        formatByCategory = $(this).val();
        formatTable('');
    });

    $('#help-close, #keyboard-close-help').on('click', function () {
        $('#help-div').css('transform', 'translate(-50%, 100%)');
        setTimeout(function () {
            $('#help-div').css('display', 'none');
        }, 400);
    });

    $('#help-close').bind('mouseenter focusin', function () {
        $(this).css({
            'opacity': '1',
            'background-color': 'var(--themeHoverColor)',
            'color': 'red'
        });
    }).bind('mouseleave focusout', function () {
        $(this).css({
            'opacity': '0.5',
            'background-color': 'transparent',
            'color': 'var(--themeReverseColor)'
        });
    });



    $('#filter-btn-apply').on('click', function () {
        if (formatTable('')) {
            closeFilter();
        }
        /*let brandList = [];
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
        $.get("/SearchMouse/getFilteredMice", filteredMouseSearch, function(listOfMice) {
            // mouseList = listOfMice;
            formatTable('');
            closeFilter();
        }).fail(function (status) {
            formatTable('fail: filter-search');
        });*/
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

    $('#filter-btn-close, #screen-cover-filter, #filter-btn-keyboard-close').on('click', function () {
        closeFilter();
        if (this.id === 'filter-btn-keyboard-close') {
            $('#activate-help-btn').focus();
        }
    });

    $('#filter-btn-open').on('click', function () {
        $('.filter-heading-btn .fa-angle-down').each(function () {
            $(this).css('transform', 'translateY(-50%) rotate(-180deg)');
        });
        $('.filter-expandable').each(function () {
            $(this).css('display', 'flex');
        });
    });

    $('#filter-btn-collapse').on('click', function () {
        $('.filter-heading-btn .fa-angle-down').each(function () {
            $(this).css('transform', 'translateY(-50%) rotate(-0deg)');
        });
        $('.filter-expandable').each(function () {
            $(this).css('display', 'none');
        });
    });

    $('.filter-buttons-div button').bind('mouseover focusin', function () {
        $(this).css({
            'background-color': 'var(--themeHoverColor)'
        });
        if (this.id === 'filter-btn-apply') {
            $(this).css({
                'outline-color': 'rgb(39, 93, 219)'/*,
                'box-shadow': '0 3px 0 2px rgb(23,55,131)'*/
            });
            $(this).find('.icon').css({
                'color': 'rgb(39, 93, 219)',
                'font-size': '1.4rem'
            });
        } else if (this.id === 'filter-btn-reset') {
            $(this).css({
                'outline-color': 'orange'/*,
                'box-shadow': '0 3px 0 2px rgb(183,118,0)'*/
            });
            $(this).find('.icon').css({
                'color': 'orange',
                'transform': 'translate(-50%, -50%) rotate(180deg)'
            });
        } else if (this.id === 'filter-btn-close') {
            $(this).css({
                'outline-color': 'red'/*,
                'box-shadow': '0 3px 0 2px rgb(153,0,0)'*/
            });
            $(this).find('.icon').css({
                'color': 'red',
                'font-size': '1.3rem'
            });
        } else if (this.id === 'filter-btn-open') {
            $(this).css({
                'outline-color': 'rgb(39, 93, 219)'/*,
                'box-shadow': '0 3px 0 2px rgb(23,55,131)'*/
            });
            $(this).find('.icon').css({
                'color': 'rgb(39, 93, 219)',
                'font-size': '1.2rem'
            });
        } else if (this.id === 'filter-btn-collapse') {
            $(this).css({
                'outline-color': 'red'/*,
                'box-shadow': '0 3px 0 2px rgb(153,0,0)'*/
            });
            $(this).find('.icon').css({
                'color': 'red',
                'font-size': '1.2rem'
            });
        } else if (this.id === 'filter-btn-help') {
            $(this).css({
                'outline-color': 'rgb(64,167,19)'/*,
                'box-shadow': '0 3px 0 2px rgb(38,100,11)'*/
            });
            $(this).find('.icon').css({
                'color': 'rgb(64,167,19)',
                'font-size': '1.2rem'
            });
        }
    }).bind('mouseout focusout', function () {
        $(this).css({
            'outline-color': 'var(--themeBorderColor)',
            'background-color': 'var(--themeBackgroundColor)'/*,
            'box-shadow': '0 3px 0 2px gray'*/
        });
        if (this.id === 'filter-btn-reset') {
            $(this).find('.icon').css({
                'color': 'var(--themeReverseColor)',
                'transform': 'translate(-50%, -50%) rotate(0deg)'
            });
        } else if (this.id === 'filter-btn-close') {
            $(this).find('.icon').css({
                'color': 'var(--themeReverseColor)',
                'font-size': '1.1rem'
            });
        } else {
            $(this).find('.icon').css({
                'color': 'var(--themeReverseColor)',
                'font-size': '1rem'
            });
        }
    });

    /*$('.filter-buttons-div button').bind('mouseover focusin', function () {
        $(this).css({
            'border-radius': '8px'
        });
        if (this.id === 'filter-btn-apply') {
            $(this).css({
                'box-shadow': '0 0 0 3px rgb(39, 93, 219)'
            });
            $(this).find('.icon').css({
                'color': 'rgb(39, 93, 219)',
                'font-size': '1.4rem'
            });
        } else if (this.id === 'filter-btn-reset') {
            $(this).css({
                'box-shadow': '0 0 0 3px orange'
            });
            $(this).find('.icon').css({
                'color': 'orange',
                'transform': 'translate(-50%, -50%) rotate(180deg)'
            });
        } else if (this.id === 'filter-btn-close') {
            $(this).css({
                'box-shadow': '0 0 0 3px red'
            });
            $(this).find('.icon').css({
                'color': 'red',
                'font-size': '1.3rem'
            });
        } else if (this.id === 'filter-btn-open') {
            $(this).css({
                'box-shadow': '0 0 0 3px rgb(39, 93, 219)'
            });
            $(this).find('.icon').css({
                'color': 'rgb(39, 93, 219)',
                'font-size': '1.2rem'
            });
        } else if (this.id === 'filter-btn-collapse') {
            $(this).css({
                'box-shadow': '0 0 0 3px red'
            });
            $(this).find('.icon').css({
                'color': 'red',
                'font-size': '1.2rem'
            });
        } else if (this.id === 'filter-btn-help') {
            $(this).css({
                'box-shadow': '0 0 0 3px rgb(64,167,19)'
            });
            $(this).find('.icon').css({
                'color': 'rgb(64,167,19)',
                'font-size': '1.2rem'
            });
        }
    }).bind('mouseout focusout', function () {
        $(this).css({
            'box-shadow': '0 0 0 0 transparent',
            'border-radius': '6px'
        });
        if (this.id === 'filter-btn-reset') {
            $(this).find('.icon').css({
                'color': 'var(--themeBackgroundColor)',
                'transform': 'translate(-50%, -50%) rotate(0deg)'
            });
        } else if (this.id === 'filter-btn-close') {
            $(this).find('.icon').css({
                'color': 'var(--themeBackgroundColor)',
                'font-size': '1.1rem'
            });
        } else {
            $(this).find('.icon').css({
                'color': 'var(--themeBackgroundColor)',
                'font-size': '1rem'
            });
        }
    });*/

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
    $.get('/Global/getDistinctCategoryItems?category=' + 'brand', function (listOfMice) {
        let brandList = [];
        for (const mouse of listOfMice) {
            brandList.push(mouse.brand);
        }
        formatChecklist(brandList, 'brand');
    });

    $.get('/Global/getDistinctCategoryItems?category=' + 'sensor', function (listOfMice) {
        let sensorList = [];
        for (const mouse of listOfMice) {
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
        url: "/SearchMouse/getSliderValues",
        dataType: 'json',
        type: 'get',
        async: false,
        data: {},
        success: function (sliderValuesMax) {
            maxValues = sliderValuesMax;
        },
        error: function () {
            createErrorMessage('Could not create proper filter-sliders, please try again later');
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
    $('.filter-checkbox-buttons input').on('change', function () {
        activateCheckboxesShape();
    });
/*--------------------------
    Checkbox-buttons - End
--------------------------*/


/*--------------------------------
    Call functions on load - start
--------------------------------*/
    activateCheckboxesShape();
/*------------------------------
    Call functions on load - end
------------------------------*/
});



/*-------------------
    Filters - start
-------------------*/
function openFilter() {
    $('#filter-main').css('display', 'flex');
    $('#screen-cover-filter').css('display', 'block');
    setTimeout(function () {
        $('#filter-main').css('transform', 'translateX(0)');
        $('#screen-cover-filter').css('opacity', '1');
    });
    $('#main-buttons-div').css('display', 'none');
}

function closeFilter() {
    $('#filter-main').css('transform', 'translateX(-110%)');
    $('#screen-cover-filter').css('opacity', '0');
    setTimeout(function () {
        $('#filter-main').css('display', 'none');
        $('#screen-cover-filter').css('display', 'none');
    }, 200);
    $('#main-buttons-div').css('display', 'flex');
}

/*function filterMice() {
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

    const filteredMouseList = [];
    for (const mouse of mouseList) {
        if (
            brandList.isArray(mouse.brand)
            && mouse.length >= $('#filter-length-min').val() && mouse.length <= $('#filter-length-max').val()
            && mouse.width >= $('#filter-width-min').val() && mouse.width <= $('#filter-width-max').val()
            && mouse.height >= $('#filter-height-min').val() && mouse.height <= $('#filter-height-max').val()
            && mouse.weight >= $('#filter-weight-min').val() && mouse.weight <= $('#filter-weight-max').val()
            && (($('#filter-shape-wired').prop('checked') && mouse.wireless === 1)
                || $('#filter-shape-wireless').prop('checked') && mouse.wireless === 0)
            && (($('#filter-shape-ambidextrous').prop('checked') && mouse.shape === 0)
                || $('#filter-shape-ergonomic').prop('checked') && mouse.shape === 1)
            && sensorList.isArray(mouse.sensor)
            && mouse.dpi >= $('#filter-dpi-min').val() && mouse.dpi <= $('#filter-dpi-max').val()
            && mouse.pollingRate >= $('#filter-pollingRate-min').val() && mouse.pollingRate <= $('#filter-pollingRate-max').val()
        ) {
            filteredMouseList.push(mouse);
        }
    }
    if (filteredMouseList.length <= 0) {
        formatTable('fail: filter-search');
    } else {
        formatTable('');
    }
}*/
/*-----------------
    Filters - end
-----------------*/


/*---------------------
    Formating - start
---------------------*/
let mouseList = [];
let formatByCategory = 'brand';
let formatAscending = true;
let firstTimeLoadingTable = true;

function formatTable(status) {
    /*let sortDirection;
    if (formatAscending) {
        sortDirection = '>';
    } else {
        sortDirection = '<';
    }
    if (formatByCategory === 'brand') {
        mouseList.sort((a, b) => (a[formatByCategory] > b[formatByCategory]) ? 1 : (a[formatByCategory] === b[formatByCategory]) ? ((a.model > b.model) ? 1 : -1) : -1);
    } else if (formatByCategory === 'model') {
        mouseList.sort((a, b) => (a[formatByCategory] > b[formatByCategory]) ? 1 : (a[formatByCategory] === b[formatByCategory]) ? ((a.brand > b.brand) ? 1 : -1) : -1);
    } else {
        mouseList.sort((a, b) => (a[formatByCategory] > b[formatByCategory]) ? 1 : (a[formatByCategory] === b[formatByCategory]) ? ((a.brand > b.brand) ? 1 : (a.brand === b.brand) ? ((a.model > b.model) ? 1 : -1) : -1) : -1);
    }*/
    if (formatAscending === true) {
        if (formatByCategory === 'brand') {
            mouseList.sort((a, b) => (a[formatByCategory] > b[formatByCategory]) ? 1 : (a[formatByCategory] === b[formatByCategory]) ? ((a.model > b.model) ? 1 : -1) : -1);
        } else if (formatByCategory === 'model') {
            mouseList.sort((a, b) => (a[formatByCategory] > b[formatByCategory]) ? 1 : (a[formatByCategory] === b[formatByCategory]) ? ((a.brand > b.brand) ? 1 : -1) : -1);
        } else {
            mouseList.sort((a, b) => (a[formatByCategory] > b[formatByCategory]) ? 1 : (a[formatByCategory] === b[formatByCategory]) ? ((a.brand > b.brand) ? 1 : (a.brand === b.brand) ? ((a.model > b.model) ? 1 : -1) : -1) : -1);
        }
    } else {
        if (formatByCategory === 'brand') {
            mouseList.sort((a, b) => (a[formatByCategory] < b[formatByCategory]) ? 1 : (a[formatByCategory] === b[formatByCategory]) ? ((a.model > b.model) ? 1 : -1) : -1);
        } else if (formatByCategory === 'model') {
            mouseList.sort((a, b) => (a[formatByCategory] < b[formatByCategory]) ? 1 : (a[formatByCategory] === b[formatByCategory]) ? ((a.brand > b.brand) ? 1 : -1) : -1);
        } else {
            mouseList.sort((a, b) => (a[formatByCategory] < b[formatByCategory]) ? 1 : (a[formatByCategory] === b[formatByCategory]) ? ((a.brand > b.brand) ? 1 : (a.brand === b.brand) ? ((a.model > b.model) ? 1 : -1) : -1) : -1);
        }
    }

    if (status === 'fail: loading') {
        $('#mouse-table').html(status);
        createErrorMessage('Mouse information failed to load, please try again later');
        return false;
    } else if (status === 'fail: filter-search') {
        createErrorMessage('Filters did not match mice from the database');
        return false;
    } else {
        let filteredMouseList = [];
        if (!firstTimeLoadingTable) {
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

            for (const mouse of mouseList) {
                if (
                    brandList.includes(mouse.brand)
                    && mouse.length >= $('#filter-length-min').val() && mouse.length <= $('#filter-length-max').val()
                    && mouse.width >= $('#filter-width-min').val() && mouse.width <= $('#filter-width-max').val()
                    && mouse.height >= $('#filter-height-min').val() && mouse.height <= $('#filter-height-max').val()
                    && mouse.weight >= $('#filter-weight-min').val() && mouse.weight <= $('#filter-weight-max').val()
                    && (($('#filter-shape-wired').prop('checked') && !mouse.wireless)
                        || $('#filter-shape-wireless').prop('checked') && mouse.wireless)
                    && (($('#filter-shape-ambidextrous').prop('checked') && !mouse.shape)
                        || $('#filter-shape-ergonomic').prop('checked') && mouse.shape)
                    && sensorList.includes(mouse.sensor)
                    && mouse.dpi >= $('#filter-dpi-min').val() && mouse.dpi <= $('#filter-dpi-max').val()
                    && mouse.pollingRate >= $('#filter-pollingRate-min').val() && mouse.pollingRate <= $('#filter-pollingRate-max').val()
                ) {
                    filteredMouseList.push(mouse);
                }
            }
            if (filteredMouseList.length <= 0) {
                createErrorMessage('Filters did not match mice from the database');
                return false;
            }
        } else {
            filteredMouseList = mouseList;
            firstTimeLoadingTable = false;
        }
        let result = '';
        for (const mouse of filteredMouseList) {
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

            const mouseName = mouse.brand + " " + mouse.model;

            result +=
                `<tr>` +
                    `<td class='string'>${mouse.brand}</td>` +
                    `<td class='string'>${mouse.model}</td>` +
                    `<td class='number' title='${mouseName}\nLength: ${parseFloat(mouse.length)}mm'>${parseFloat(mouse.length)}</td>` +
                    `<td class='number' title='${mouseName}\nWidth: ${parseFloat(mouse.width)}mm'>${parseFloat(mouse.width)}</td>` +
                    `<td class='number' title='${mouseName}\nHeight: ${parseFloat(mouse.height)}mm'>${parseFloat(mouse.height)}</td>` +
                    `<td class='number' title='${mouseName}\nWeight: ${parseFloat(mouse.weight)}g'>${parseFloat(mouse.weight)}</td>` +
                    `<td class='string' title='${mouseName}\nShape: ${shape}'>${shape}</td>` +
                    `<td class='string' title='${mouseName}\nConnectivity: ${connectivity}'>${connectivity}</td>` +
                    `<td class='string' title='${mouseName}\nSensor: ${mouse.sensor}'>${mouse.sensor}</td>` +
                    `<td class='number' title='${mouseName}\nDPI: ${parseFloat(mouse.dpi)}'>${parseFloat(mouse.dpi)}</td>` +
                    `<td class='number' title='${mouseName}\nPolling Rate: ${parseFloat(mouse.pollingRate)}'>${parseFloat(mouse.pollingRate)}</td>` +
                `</tr>`
        }
        $('#mouse-table tbody').html(result);

        $('#mouse-table thead tr td button').each(function () {
            if ($(this).val() !== formatByCategory) {
                $(this).css({
                    'text-decoration': 'none',
                    'text-decoration-color': 'var(--primaryColor)',
                    'text-decoration-thickness': '2px',
                    'text-underline-offset': '1px'
                });
                if ($(this).attr('class') === 'string') {
                    $(this).attr('title', 'Sort by ' + $(this).text() + ' | A-Z');
                } else {
                    $(this).attr('title', 'Sort by ' + $(this).text() + ' | Low-High');
                }
                $(this).find('i').css('opacity', '0');
            } else {
                $(this).css({
                    'text-decoration': 'underline',
                    'text-decoration-color': 'var(--primaryColor)',
                    'text-decoration-thickness': '2px',
                    'text-underline-offset': '1px'
                });

                if (formatAscending) {
                    if ($(this).attr('class') === 'string') {
                        $(this).attr('title', 'Sorted by ' + $(this).text() + ' | A-Z');
                    } else {
                        $(this).attr('title', 'Sorted by ' + $(this).text() + ' | Low-High');
                    }
                } else {
                    if ($(this).attr('class') === 'string') {
                        $(this).attr('title', 'Sorted by ' + $(this).text() + ' | Z-A');
                    } else {
                        $(this).attr('title', 'Sorted by ' + $(this).text() + ' | High-Low');
                    }
                }

                $(this).find('i').css('opacity', '1');
                if (formatAscending) {
                    $(this).find('i').css('transform', 'rotate(0deg)');
                } else {
                    $(this).find('i').css('transform', 'rotate(180deg)');
                }
            }
        });
        return true;
    }
}

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
/*-------------------
    Formating - end
-------------------*/


/*----------------------
    Checkboxes - start
----------------------*/
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
/*--------------------
    Checkboxes - end
--------------------*/