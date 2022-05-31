$(function() {
/*-----------------------
    Mouse table - start
-----------------------*/
    $.ajax({
        url: "/Global/getAllMice",
        datatype: 'json',
        type: 'get',
        async: false,
        success: function (allMice) {
            mouseList = allMice.sort((a, b) => (a.brand > b.brand) ? 1 : -1);
            formatTable();
        },
        error: function (status) {
            formatTable('fail: loading');
            createErrorMessage("Error: " + status.status + "\nCloud not retrieve mice from the database.");
        }
    });
/*---------------------
    Mouse table - End
---------------------*/


/*-------------------------------
    Filter main buttons - Start
-------------------------------*/
    $('#main-buttons-div button').bind('mouseenter focusin', function () {
        $(this).css({
            'color': 'white',
            'background-color': 'var(--primaryColor)'
        });
        if (!isOnMobile()) {
            const thisSpan = $(this).find('span');
            thisSpan.css('display', 'flex');
            setTimeout(function () {
                thisSpan.css({
                    'transform' : 'translate(-50%, 100%)',
                    'opacity' : '1'
                });
            }, 0);
        }
    }).bind('mouseleave focusout', function () {
        $(this).css({
            'color': 'var(--themeReverseColor)',
            'background-color': 'var(--themeBackgroundColor)'
        });
        const thisSpan = $(this).find('span');
        thisSpan.css({
            'transform' : 'translate(-50%, 0)',
            'opacity' : '0'
        });
        setTimeout(function () {
            thisSpan.css('display', 'none');
        }, 180);
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
        if ($('#help-div').css('display') === 'none') {
            openHelp();
        } else {
            closeHelp();
        }
    });

    $('#help-close, #keyboard-close-help').on('click', function () {
        closeHelp();
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

    $('#activate-search-btn').on('click', function () {
        if ($('#mouse-searching-div').css('display') === 'none') {
            $(this).find('i').replaceWith('<i class="icon fa-solid fa-xmark"></i>');
            $(this).find('span').text('Close');
            $('#mouse-searching-div').css('display', 'flex');
            setTimeout(function () {
                $('#mouse-searching-div').css('transform', 'translateX(100%)');
            }, 0);
        } else {
            resetMouseSearch();
            $(this).find('i').replaceWith('<i class="icon fa-solid fa-magnifying-glass"></i>');
            $(this).find('span').text('Search');
            $('#mouse-searching-div').css('transform', 'translateX(0)');
            setTimeout(function () {
                $('#mouse-searching-div').css('display', 'none');
            }, 180);
        }
    });

    $('#mouse-searching-div input').on('keyup', function () {
        underlineMatchingSearch();
    });

    $('#mouse-searching-reset').on('click', function () {
        resetMouseSearch();
    });

    $('#mouse-searching-reset').bind('mouseover focusin', function () {
        $(this).css('background-color', 'var(--primaryColor)');
        $(this).find('i').css({
            'color' : 'white',
            'transform' : 'rotate(300deg)'
        });
    }).bind('mouseout focusout', function () {
        $(this).css('background-color', 'var(--themeBackgroundColor)');
        $(this).find('i').css({
            'color' : 'var(--themeReverseColor)',
            'transform' : 'rotate(0deg)'
        });
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

    $('#filter-btn-apply').on('click', function () {
        if (formatTable('')) {
            closeFilter();
        }
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
                    maxValue = Math.ceil(maxValues.length);
                    break;
                case 'width':
                    maxValue = Math.ceil(maxValues.width);
                    break;
                case 'height':
                    maxValue = Math.ceil(maxValues.height);
                    break;
                case 'weight':
                    maxValue = Math.ceil(maxValues.weight);
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

    $('.filter-buttons-div button').on('click', function () {
        const thisBtn = $(this);
        thisBtn.css('outline', '6px solid var(--themeHoverColor)');
        setTimeout(function() {
            thisBtn.css('outline', '0px solid transparent');
        },120);
    });

    $('.filter-buttons-div button').bind('mouseover focusin', function () {
        $(this).css({
            'background-color': 'var(--themeHoverColor)'
        });
        if (this.id === 'filter-btn-apply') {
            $(this).css({
                'color' : 'white',
                'background-color': 'var(--primaryColor)',
                'border-color': 'var(--primaryColor)'
            });
            $(this).find('.icon').css({
                'color': 'white',
                'font-size': '1.2rem'
            });
        } else if (this.id === 'filter-btn-reset') {
            $(this).css({
                'color' : 'white',
                'background-color': 'orange',
                'border-color': 'orange'
            });
            $(this).find('.icon').css({
                'color': 'white',
                'transform': 'translate(-50%, -50%) rotate(300deg)'
            });
        } else if (this.id === 'filter-btn-close') {
            $(this).css({
                'color' : 'white',
                'background-color': 'rgb(224,36,36)',
                'border-color': 'rgb(224,36,36)'
            });
            $(this).find('.icon').css({
                'color': 'white',
                'font-size': '1.3rem'
            });
        } else if (this.id === 'filter-btn-open') {
            $(this).css({
                'color' : 'white',
                'background-color': 'var(--primaryColor)',
                'border-color': 'var(--primaryColor)'
            });
            $(this).find('.icon').css({
                'color': 'white',
                'font-size': '1.2rem'
            });
        } else if (this.id === 'filter-btn-collapse') {
            $(this).css({
                'color' : 'white',
                'background-color': 'rgb(224,36,36)',
                'border-color': 'rgb(224,36,36)'
            });
            $(this).find('.icon').css({
                'color': 'white',
                'font-size': '1.2rem'
            });
        } else if (this.id === 'filter-btn-help') {
            $(this).css({
                'color' : 'white',
                'background-color': 'rgb(64,167,19)',
                'border-color': 'rgb(64,167,19)'
            });
            $(this).find('.icon').css({
                'color': 'white',
                'font-size': '1.2rem'
            });
        }
    }).bind('mouseout focusout', function () {
        $(this).css({
            'color' : 'var(--themeReverseColor)',
            'background-color': 'var(--themeBackgroundColor)',
            'border-color': 'var(--themeBorderColor)'
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
    const mouseListSortedByBrand = mouseList;
    mouseListSortedByBrand.sort((a, b) => (a.brand > b.brand) ? 1 : -1);
    const brandList = [];
    let previousBrand = null;
    let brandListCounter = 0
    do {
        if (mouseListSortedByBrand[brandListCounter].brand !== previousBrand) {
            brandList.push(mouseListSortedByBrand[brandListCounter].brand);
            previousBrand = mouseListSortedByBrand[brandListCounter].brand;
        }
        brandListCounter++;
    } while (brandListCounter < mouseListSortedByBrand.length);
    formatChecklist(brandList, 'brand');

    const mouseListSortedBySensor = mouseList;
    mouseListSortedBySensor.sort((a, b) => (a.sensor > b.sensor) ? 1 : -1);
    const sensorList = [];
    let previousSensor = null;
    let sensorListCounter = 0
    do {
        if (mouseListSortedBySensor[sensorListCounter].sensor !== previousSensor) {
            sensorList.push(mouseListSortedBySensor[sensorListCounter].sensor);
            previousSensor = mouseListSortedBySensor[sensorListCounter].sensor;
        }
        sensorListCounter++;
    } while (sensorListCounter < mouseListSortedBySensor.length);
    formatChecklist(sensorList, 'sensor');

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
            $(this).find('input').css('outline', '2px solid var(--themeBorderColor)');
        }
    }).on('mouseleave', '.checkmark-option, .checkmarks-select-all', function () {
        if (!isOnMobile()) {
            $(this).find('input').css('outline', '0 solid transparent');
        }
    });
    // duplicate due to .bind not working
    $('body').on('focusin', '.checkmark-option, .checkmarks-select-all', function () {
        if (!isOnMobile()) {
            $(this).find('input').css('outline', '2px solid var(--themeBorderColor)');
        }
    }).on('focusout', '.checkmark-option, .checkmarks-select-all', function () {
        if (!isOnMobile()) {
            $(this).find('input').css('outline', '0 solid transparent');
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
    $('#slider-range-length').next('input').val(Math.ceil(maxValues.length));
    $('#slider-range-length').slider({
        range: true,
        min: 0,
        max: Math.ceil(maxValues.length),
        values: [0, Math.ceil(maxValues.length)],
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
    $('#slider-range-width').next('input').val(Math.ceil(maxValues.width));
    $('#slider-range-width').slider({
        range: true,
        min: 0,
        max: Math.ceil(maxValues.width),
        values: [0, Math.ceil(maxValues.width)],
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
    $('#slider-range-height').next('input').val(Math.ceil(maxValues.height));
    $('#slider-range-height').slider({
        range: true,
        min: 0,
        max: Math.ceil(maxValues.height),
        values: [0, Math.ceil(maxValues.height)],
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
    $('#slider-range-weight').next('input').val(Math.ceil(maxValues.weight));
    $('#slider-range-weight').slider({
        range: true,
        min: 0,
        max: Math.ceil(maxValues.weight),
        values: [0, Math.ceil(maxValues.weight)],
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
    $('.filter-checkbox-buttons label').on('mouseover', function () {
        $(this).css('outline', '2px solid var(--themeBorderColor)');
    }).on('mouseleave', function () {
        $(this).css('outline', '0 solid transparent');
    });

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
    $('#main-buttons-div button, #main-buttons-div input').attr('disabled', true);
    $('#filter-main').css('display', 'grid');
    $('#screen-cover-filter').css('display', 'block');
    setTimeout(function () {
        $('#filter-main').css('transform', 'translateX(0)');
        $('#screen-cover-filter').css('opacity', '1');
    });
}

function closeFilter() {
    $('#main-buttons-div button, #main-buttons-div input').attr('disabled', false);
    $('#filter-main').css('transform', 'translateX(-110%)');
    $('#screen-cover-filter').css('opacity', '0');
    setTimeout(function () {
        $('#filter-main').css('display', 'none');
        $('#screen-cover-filter').css('display', 'none');
    }, 200);
}

function openHelp() {
    $('#help-div').css('display', 'flex');
    setTimeout(function () {
        $('#help-div').css('transform', 'translate(-50%, -50%)');
    }, 0);
}

function closeHelp() {
    $('#help-div').css('transform', 'translate(-50%, 100%)');
    setTimeout(function () {
        $('#help-div').css('display', 'none');
    }, 400);
}

function resetMouseSearch() {
    $('#mouse-searching-div input').val('');
    $('#mouse-table tr').each(function () {
        $(this).children().slice(0,2).removeClass('matching-search');
    });
}
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
                    `<td class='string brand'>${mouse.brand}</td>` +
                    `<td class='string model'>${mouse.model}</td>` +
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
        underlineMatchingSearch();
        return true;
    }
}

function underlineMatchingSearch() {
    if ($('#matching-search-div').css('display') !== 'none') {
        $('#mouse-table tr').each(function () {
            if ($(this).children(':first').text().toLowerCase().includes($('#search-mouse-brand').val().toLowerCase())
                && $('#search-mouse-brand').val() !== ''
                && $('#search-mouse-model').val() === '') {
                $(this).children(':first').addClass('matching-search');
                $(this).children(':nth-child(2)').removeClass('matching-search');
            } else if ($(this).children(':nth-child(2)').text().toLowerCase().includes($('#search-mouse-model').val().toLowerCase())
                && $('#search-mouse-model').val() !== ''
                && $('#search-mouse-brand').val() === '') {
                $(this).children(':first').removeClass('matching-search');
                $(this).children(':nth-child(2)').addClass('matching-search');
            } else if ($(this).children(':first').text().toLowerCase().includes($('#search-mouse-brand').val().toLowerCase())
                && $(this).children(':nth-child(2)').text().toLowerCase().includes($('#search-mouse-model').val().toLowerCase())
                && $('#search-mouse-brand').val() !== ''
                && $('#search-mouse-model').val() !== '') {
                $(this).children().slice(0, 2).addClass('matching-search');
            } else {
                $(this).children().slice(0, 2).removeClass('matching-search');
            }
        });
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
                'color' : 'white',
                'background-color' : 'var(--primaryColor)',
                'border-color': 'var(--primaryColor)'
            });
        } else if ($(this).prop('checked') === false) {
            $(this).prev('label').css({
                'color' : 'var(--themeReverseColor)',
                'background-color' : 'var(--themeBackgroundColor)',
                'border-color': 'var(--themeBorderColor)'
            });
        }
    });
}
/*--------------------
    Checkboxes - end
--------------------*/
