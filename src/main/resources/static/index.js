$(function() {

    $.ajax({
        url: "/Global/getAllMice",
        datatype: 'json',
        type: 'get',
        async: false,
        success: function (allMice) {
            mouseArray = allMice.sort((a, b) => (a.brand > b.brand) ? 1 : -1);
        },
        error: function (status) {
            createErrorMessage("Error: " + status.status + "\nCloud not retrieve mice from the database.");
        }
    });
/*-------------------------
    Shape compare - start
-------------------------*/
    /*-----------------------------------------------
        Slider, shape size, shape container - start
    -----------------------------------------------*/
    // Updates shape sizes on -/+ click
    $('.shape-settings-size-btn').on('click', function () {
        let slider = $('#shape-settings-size-slider');
        let stepValue = slider.attr('step');
        if (isOnMobile()) {
            stepValue *= 2;
        }

        if (slider.val() > slider.attr('min') && $(this).text() === '-') {
            slider.val($('#shape-settings-size-slider').val() - stepValue);
        } else if (slider.val() < slider.attr('max') && $(this).text() === '+') {
            slider.val(parseFloat($('#shape-settings-size-slider').val()) + parseFloat(stepValue));
        }

        updateShapeSize();
    });


    // Updates sliderSizeValue and shape sizes on slider input
    $('#shape-settings-size-slider').on('input', function () {
        updateShapeSize();
    });
    /*---------------------------------------------
        Slider, shape size, shape container - end
    ---------------------------------------------*/


    /*---------------------
        Alignment - start
    ---------------------*/
    // Click align-buttons to set alignment variables and call functions
    $('.shape-settings-align-btn').on('click', function () {

        // Vertical alignment
        if (this.id === 'shape-settings-align-vertical-btn-front') {
            verticalAlign = 'front';
        } else if (this.id === 'shape-settings-align-vertical-btn-center') {
            verticalAlign = 'center';
        } else if (this.id === 'shape-settings-align-vertical-btn-back') {
            verticalAlign = 'back';
        }

        // Horizontal alignment
        // bytt til else if
        if (this.id === 'shape-settings-align-horizontal-btn-left') {
            horizontalAlign = 'left';
        } else if (this.id === 'shape-settings-align-horizontal-btn-center') {
            horizontalAlign = 'center';
        } else if (this.id === 'shape-settings-align-horizontal-btn-right') {
            horizontalAlign = 'right';
        }

        setAlignment();
        setAlignButtonColor();
    });

    $('.shape-settings-align-btn').bind('mouseover focusin', function () {
        if (!isOnMobile()) {
            if (this.id === 'shape-settings-align-vertical-btn-front') {
                $('#shape-top-container .alignment-bar.horizontal').css({
                    'top' : '0%',
                    'opacity' : '1',
                    'transform' : 'translate(-50%, -100%)'
                });
                $('#shape-side-container .alignment-bar.vertical').css({
                    'left' : '0%',
                    'opacity' : '1',
                    'transform' : 'translate(-100%, -50%)'
                });
            } else if (this.id === 'shape-settings-align-vertical-btn-center') {
                $('#shape-top-container .alignment-bar.horizontal').css({
                    'top' : '50%',
                    'opacity' : '1',
                    'transform' : 'translate(-50%, -50%)'
                });
                $('#shape-side-container .alignment-bar.vertical').css({
                    'left' : '50%',
                    'opacity' : '1',
                    'transform' : 'translate(-50%, -50%)'
                });
            } else if (this.id === 'shape-settings-align-vertical-btn-back') {
                $('#shape-top-container .alignment-bar.horizontal').css({
                    'top' : '100%',
                    'opacity' : '1',
                    'transform' : 'translate(-50%, 0%)'
                });
                $('#shape-side-container .alignment-bar.vertical').css({
                    'left' : '100%',
                    'opacity' : '1',
                    'transform' : 'translate(0%, -50%)'
                });
            } else if (this.id === 'shape-settings-align-horizontal-btn-left') {
                $('#shape-top-container .alignment-bar.vertical, #shape-back-container .alignment-bar.vertical').css({
                    'left' : '0%',
                    'opacity' : '1',
                    'transform' : 'translate(-100%, -50%)'
                });
            } else if (this.id === 'shape-settings-align-horizontal-btn-center') {
                $('#shape-top-container .alignment-bar.vertical, #shape-back-container .alignment-bar.vertical').css({
                    'left' : '50%',
                    'opacity' : '1',
                    'transform' : 'translate(-50%, -50%)'
                });
            } else if (this.id === 'shape-settings-align-horizontal-btn-right') {
                $('#shape-top-container .alignment-bar.vertical, #shape-back-container .alignment-bar.vertical').css({
                    'left' : '100%',
                    'opacity' : '1',
                    'transform' : 'translate(0%, -50%)'
                });
            }
        }
    }).bind('mouseout focusout', function () {
        $('.alignment-bar').css('opacity', '0');
    });
    /*-------------------
        Alignment - end
    -------------------*/


    /*----------------------------------
        Reset size & alignment - start
    ----------------------------------*/
    // Reset shape-settings to default
    $('#shape-settings-reset').on('click', function () {
        shapeSizeAndAlignmentReset();
    });


    // Shape-settings-reset hover effect
    $('#shape-settings-reset').bind('mouseenter focusin', function () {
        $(this).css('background-color', 'var(--primaryColor)');
        $(this).find('i').css({
            'color' : 'white',
            'transform' : 'rotate(300deg)'
        });
    }).bind('mouseleave focusout', function () {
        $(this).css('background-color', 'var(--themeBackgroundColor)');
        $(this).find('i').css({
            'color' : 'var(--themeReverseColor)',
            'transform' : 'rotate(0deg)'
        });
    });
    /*--------------------------------
        Reset size & alignment - end
    --------------------------------*/


    /*-----------------------------
        Adding new shapes - start
    -----------------------------*/
    let previousBrand = null;
    let arrayCounter = 0;
    do {
        let modelOption = document.createElement('option');
        modelOption.value = mouseArray[arrayCounter].model;
        modelOption.className = 'shape-tool-list-option';
        $('#add-new-shape-list-model').append(modelOption);

        if (mouseArray[arrayCounter].brand !== previousBrand) {
            let brandOption = document.createElement('option');
            brandOption.value = mouseArray[arrayCounter].brand;
            brandOption.className = 'shape-tool-list-option';
            $('#add-new-shape-list-brand').append(brandOption);

            previousBrand = mouseArray[arrayCounter].brand;
        }
        arrayCounter++;
    } while (arrayCounter < mouseArray.length);


    $('#add-new-shape-brand').focusout(function () {
        getMatchingModels();
    });


    $('#add-new-shape-div input').on('change', function () {
        const brand = $('#add-new-shape-brand').val();
        const model = $('#add-new-shape-model').val();
        if (brand !== '' && model !== '') {
            $('#add-new-shape-div button').prop('title', 'Add ' + brand + ' ' + model);
        } else {
            $('#add-new-shape-div button').prop('title', 'Add mouse');
        }
    });


    // Adds mouse on button press
    $('#add-new-shape-div button').on('click', function () {
        const brand = $('#add-new-shape-brand');
        const model = $('#add-new-shape-model');

        if (brand.val() === '') {
            brand.focus();
        } else if (model.val() === '') {
            model.focus();
        } else {
            addMouse(brand.val(), model.val());
            brand.val('');
            model.val('');
            $(this).prop('title', 'Add mouse');
        }
    });
    /*---------------------------
        Adding new shapes - end
    ---------------------------*/


    /*-------------------------
        Remove shapes - start
    -------------------------*/
    // Removes mouse on close icon click
    $('body').on('click', '.shape-tool-close', function () {
        let closeBtnClass = ''+this.id;
        let mouseId = closeBtnClass.replace('shape-close-', '');
        removeMouse(mouseId);
    });


    // Removes mouse on information-sub-div click on mobile
    $('body').on('click', '.shape-information-sub-div', function () {
        if (isOnMobile()) { // media-queries activates when <= 850px
            let informationSubDivId = ''+this.id;
            let mouseId = informationSubDivId.replace('shape-sub-div-', '');
            removeMouse(mouseId);
        }
    });
    /*-----------------------
        Remove shapes - end
    -----------------------*/


    /*-------------------------------------------
        Shape information interactivity - start
    -------------------------------------------*/
    $('body').on('mouseenter', '.shape-information-div', function () {
        $(this).find('.shape-tool-close').css('opacity', '0.5');
        $(this).find('.view-missing-information').css('opacity', '0.5');
    }).on('mouseleave', '.shape-information-div', function () {
        $(this).find('.shape-tool-close').css('opacity', '0');
        $(this).find('.view-missing-information').css('opacity', '0');
    });

    $('body').on('mouseover', '.shape-tool-close', function () {
        $(this).css({
            'opacity' : '1',
            'color' : 'red'
        });
    }).on('mouseleave', '.shape-tool-close', function () {
        $(this).css({
            'opacity' : '0.5',
            'color' : 'var(--themeReverseColor)'
        });
    });

    $('body').on('focusin', '.shape-tool-close', function () {
        $(this).css({
            'opacity' : '1',
            'color' : 'red'
        });
    }).on('focusout', '.shape-tool-close', function () {
        $(this).css({
            'opacity' : '0',
            'color' : 'var(--themeReverseColor)'
        });
    });

    $('body').on('mouseover', '.view-missing-information', function () {
        $(this).css({
            'opacity' : '1',
            'color' : 'orange'
        });
        $(this).find('span').css('display', 'inline-block');
    }).on('mouseleave', '.view-missing-information', function () {
        $(this).css({
            'opacity' : '0.5',
            'color' : 'var(--themeReverseColor)'
        });
        $(this).find('span').css('display', 'none');
    });

    $('body').on('focusin', '.view-missing-information', function () {
        $(this).css({
            'opacity' : '1',
            'color' : 'orange'
        });
        $(this).find('span').css('display', 'inline-block');
    }).on('focusout', '.view-missing-information', function () {
        $(this).css({
            'opacity' : '0',
            'color' : 'var(--themeReverseColor)'
        });
        $(this).find('span').css('display', 'none');
    });

    // Changes outline color on color-input
    $('body').on('input', '.shape-tool-color', function () {
        let thisId = ''+this.id;
        let mouseId = thisId.replace('shape-color-', '');
        updateShapeOutlineColor(mouseId);
    });
    /*-----------------------------------------
        Shape information interactivity - end
    -----------------------------------------*/


    /*------------------------------------
        Automatic shape resizing - start
    ------------------------------------*/
    // Checks width and height of screen to compare and see if screen is being increased or decreased on window-resize
    let previousWidth = $(window).width();
    let previousHeight = $(window).height();

    let previousDisplayMode;
    if (isOnMobile()) {
        previousDisplayMode = 'mobile';
    } else {
        previousDisplayMode = 'desktop';
    }


    // let shapesDivMarginLeft = 0;
    $(window).on('resize', function () {
        currentMiceBottomPadding();

        let currentWidth = $(window).width();
        let currentHeight = $(window).height();

        let currentDisplayMode;
        if (isOnMobile()) {
            currentDisplayMode = 'mobile';
        } else {
            currentDisplayMode = 'desktop';
        }

        if (currentDisplayMode !== previousDisplayMode) {
            if (isOnMobile()) {
                removeDivToolCollideCSS();
                shapeSizeAndAlignmentReset();
                decreaseShapeSize();
            }
        }
        previousDisplayMode = currentDisplayMode;

        if (isOnMobile()) {
            if (currentWidth > previousWidth || currentHeight > previousHeight) {
                increaseShapeSize();
            } else if (currentWidth < previousWidth || currentHeight < previousHeight) {
                decreaseShapeSize();
            }
        } else {
            // addDivToolCollideCSS();
            if (+$('.shapes-div').offset().left + +($('.shapes-div').width() / 2) >= $(window).width() / 2) {
                removeDivToolCollideCSS();
            }
            addDivToolCollideCSS();
            increaseShapeSizeDesktop();
            decreaseShapeSizeDesktop();
        }

        previousWidth = currentWidth;
        previousHeight = currentHeight;
    });
    /*----------------------------------
        Automatic shape resizing - end
    ----------------------------------*/
/*--------------------------------
  Shape compare - end
--------------------------------*/


/*--------------------------------
  Call functions on load - start
--------------------------------*/
    // Default shapes
    addMouse('Glorious', 'Model O- Wireless');
    addMouse('Zowie', 'EC1-C');
    /*
    Lag en share shapes knapp for ?? lage custom URL med brand og model.
    Dersom noen ??pner nettsiden med en vanlig URL, kj??p default addMouse(),
    dersom det brukes en custom URL, finn brands og models og bruk koden under

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const brand = urlParams.get('brand');
    const model = urlParams.get('model');
    addMouse(brand, model);
    */

    setAlignButtonColor();

    currentMiceBottomPadding();

    // Decreases shape size until it fits on screen.
    if (isOnMobile()) {
        decreaseShapeSize();
    } else {
        addDivToolCollideCSS();
        increaseShapeSizeDesktop();
        decreaseShapeSizeDesktop();
    }
/*------------------------------
  Call functions on load - end
------------------------------*/
});


/*-----------------------------------------------
    Slider, shape size, shape container - start
-----------------------------------------------*/
// Updates size of divs containing shapes
function updateShapeContainerSize() {
    let largestShapeLength = 0;
    for (let i = 0; i < currentlyViewedMiceSVG.length; i++) {
        if (currentlyViewedMiceSVG[i].length > largestShapeLength) {
            largestShapeLength = currentlyViewedMiceSVG[i].length;
        }
    }

    let largestImgWidthTop = 0;
    $('#shape-top-container svg').each(function () {
        if ($(this).width() > largestImgWidthTop) {
            largestImgWidthTop = $(this).width();
        }
    });

    let largestImgHeightBack = 0;
    let largestImgWidthBack = 0;
    $('#shape-back-container svg').each(function () {
        if ($(this).width() > largestImgWidthBack) {
            largestImgWidthBack = $(this).width();
        }
        if ($(this).height() > largestImgHeightBack) {
            largestImgHeightBack = $(this).height();
        }
    });

    let largestImgHeightSide = 0;
    $('#shape-side-container svg').each(function () {
        if ($(this).height() > largestImgHeightSide) {
            largestImgHeightSide = $(this).height();
        }
    });

    $('.shapes-div').css('height', (largestShapeLength * $('#shape-settings-size-slider').val()) + 'px');
    $('#shape-top').css('width', largestImgWidthTop);
    $('#shape-top-container').css({
        'height' : (largestShapeLength * $('#shape-settings-size-slider').val()) + 'px',
        'width' : largestImgWidthTop
    })
    $('#shape-back-and-side').css('width', (largestShapeLength * $('#shape-settings-size-slider').val())+'px');
    $('#shape-back-container').css({
        'height' : largestImgHeightBack + 'px',
        'width' : largestImgWidthBack + 'px'
    });
    $('#shape-side-container').css('height', largestImgHeightSide + 'px');
}

// Updates size of shapes based on slider value
function updateShapeSize() {
    if (currentlyViewedMiceSVG.length > 0) {
        for (let i = 0; i < currentlyViewedMiceSVG.length; i++) {
            let currentMouse = currentlyViewedMiceSVG[i];

            $('#'+currentMouse.id+'-top').css('height', (currentMouse.length * $('#shape-settings-size-slider').val())+'px');
            $('#'+currentMouse.id+'-side').css('width', (currentMouse.length * $('#shape-settings-size-slider').val())+'px');
            $('#'+currentMouse.id+'-back').css('width', (currentMouse.width * $('#shape-settings-size-slider').val())+'px');
        }

        updateShapeContainerSize();
    }
}
/*---------------------------------------------
    Slider, shape size, shape container - end
---------------------------------------------*/

/*---------------------
    Alignment - start
---------------------*/
const defaultVerticalAlignment = 'back';
const defaultHorizontalAlignment = 'center';
let verticalAlign = defaultVerticalAlignment;
let horizontalAlign = defaultHorizontalAlignment;

function setAlignment() {
    // Vertical alignment
    let verticalAlignTopPercentage;
    let horizontalAlignSidePosition;
    if (verticalAlign === 'front') {
        verticalAlignTopPercentage = '0';
        horizontalAlignSidePosition = 'left';
    } else if (verticalAlign === 'center') {
        verticalAlignTopPercentage = '50'
        horizontalAlignSidePosition = 'center';
    } else if (verticalAlign === 'back') {
        verticalAlignTopPercentage = '100';
        horizontalAlignSidePosition = 'right';
    }

    // Horizontal alignment
    let horizontalAlignPosition;
    if (horizontalAlign === 'left') {
        horizontalAlignPosition = 'left';
    } else if (horizontalAlign === 'center') {
        horizontalAlignPosition = 'center';
    } else if (horizontalAlign === 'right') {
        horizontalAlignPosition = 'right';
    }

    // Changes shape-containers CSS values to match selected alignment
    $('#shape-top-container').css('justify-content', horizontalAlignPosition);
    $('#shape-top-container svg').css({
        'top' : verticalAlignTopPercentage + '%',
        'transform' : 'translateY(-' + verticalAlignTopPercentage + '%)'
    });
    $('#shape-top-container .alignment-bar.horizontal').css({
        'top' : verticalAlignTopPercentage + '%'
    });
    $('#shape-back-container').css('justify-content', horizontalAlignPosition);
    $('#shape-side-container').css('justify-content', horizontalAlignSidePosition);
}


// Sets color of alignment buttons based on selected alignment values
function setAlignButtonColor() {
    // First, sets all buttons back to default
    $('.shape-settings-align-btn').css({
        'border-color' : 'var(--themeBorderColor)',
        'background-color' : 'var(--themeBackgroundColor)',
        'color' : 'var(--themeReverseColor)',
        'z-index' : '0'
    });

    // changes active button colors
    $('#shape-settings-align-vertical-btn-' + verticalAlign).css({
        'border-color' : 'var(--primaryColor)',
        'background-color' : 'var(--primaryColor)',
        'color' : 'white',
        'z-index' : '1'
    });
    $('#shape-settings-align-horizontal-btn-' + horizontalAlign).css({
        'border-color' : 'var(--primaryColor)',
        'background-color' : 'var(--primaryColor)',
        'color' : 'white',
        'z-index' : '1'
    });
}

function shapeSizeAndAlignmentReset() {
    verticalAlign = defaultVerticalAlignment;
    horizontalAlign = defaultHorizontalAlignment;
    setAlignment();
    setAlignButtonColor();

    $('#shape-settings-size-slider').val($('#shape-settings-size-slider').attr('value')); // Sets slider-value back to HTML default
    updateShapeSize();
    decreaseShapeSizeDesktop();
}

function updateAlignmentBars() {
    if ($('#shape-top-container svg').length <= 0) {
        $('#shape-top-container .alignment-bar').css('display', 'none');
    } else {
        $('#shape-top-container .alignment-bar').css('display', 'block');
    }
    if ($('#shape-back-container svg').length <= 0) {
        $('#shape-back-container .alignment-bar').css('display', 'none');
    } else {
        $('#shape-back-container .alignment-bar').css('display', 'block');
    }
    if ($('#shape-side-container svg').length <= 0) {
        $('#shape-side-container .alignment-bar').css('display', 'none');
    } else {
        $('#shape-side-container .alignment-bar').css('display', 'block');
    }
}
/*-------------------
    Alignment - end
-------------------*/

// Array with all mice
let mouseArray = [];

// Array with currently viewed mice
let currentlyViewedMiceSVG = [];


/*-----------------------------
    Adding new shapes - start
-----------------------------*/
// Default color values used in addMouse()
let colorValueArray = ['#FF3C19', '#19DCFF', '#AF19FF', '#69FF19', '#FEE801', '#0117FE', '#FE0196', '#01FE69'];
let colorValueCounter = 0;


function addMouse(inputBrand, inputModel) {
    $('#add-new-shape-input').val('');
    let mouseInUse = false;
    for (const viewedMouse of currentlyViewedMiceSVG) {
        if (viewedMouse.brand + ' ' + viewedMouse.model === inputBrand + ' ' + inputModel) {
            mouseInUse = true;
        }
    }
    if (!mouseInUse) {
        for (const mouse of mouseArray) {
            if (mouse.brand === inputBrand && mouse.model === inputModel) {
                currentlyViewedMiceSVG.push(mouse);
                let topViewMissing = false;
                if (mouse.svgTop !== null) {
                    $('#shape-top-container').append(addSVG(mouse.id, mouse.svgTop, 'top'));
                } else {
                    topViewMissing = true;
                }

                let sideViewMissing = false;
                if (mouse.svgSide !== null) {
                    $('#shape-side-container').append(addSVG(mouse.id, mouse.svgSide, 'side'));
                } else {
                    sideViewMissing = true;
                }

                let backViewMissing = false;
                if (mouse.svgBack !== null) {
                    $('#shape-back-container').append(addSVG(mouse.id, mouse.svgBack, 'back'));
                } else {
                    backViewMissing = true;
                }

                // Main div
                let newInformationDiv = document.createElement('div');
                newInformationDiv.id = 'shape-div-' + mouse.id;
                newInformationDiv.className = 'shape-information-div';
                $('#shape-tool-current-mice').append(newInformationDiv);

                // Sub-div, click to remove on mobile
                let newInformationSubDiv = document.createElement('div');
                newInformationSubDiv.id = 'shape-sub-div-' + mouse.id;
                newInformationSubDiv.className = 'shape-information-sub-div';
                newInformationDiv.append(newInformationSubDiv);

                // Close icon
                let newCloseIcon = document.createElement('button');
                newCloseIcon.id = 'shape-close-' + mouse.id;
                newCloseIcon.className = 'shape-tool-close';
                newCloseIcon.innerHTML = '&#10006;';
                newInformationSubDiv.append(newCloseIcon);

                // Adds hover-able information if mouse information/specification is missing
                let hoverText = document.createElement('span');
                let titleText = '';

                // Checks if images are missing
                if (topViewMissing === true && sideViewMissing === true && backViewMissing === true) {
                    titleText += 'No images currently available\n';
                } else {
                    if (topViewMissing === true) {
                        titleText += 'Top-view image not available\n';
                    }
                    if (sideViewMissing === true) {
                        titleText += 'Side-view image not available\n';
                    }
                    if (backViewMissing === true) {
                        titleText += 'Back-view image not available\n';
                    }
                }

                // Mouse name
                let newNameSpan = document.createElement('span');
                let mouseName = mouse.brand + ' ' + mouse.model;
                newNameSpan.id = 'shape-name-' + mouse.id;
                newNameSpan.className = 'shape-information-name';
                newNameSpan.title = 'Brand: ' + mouse.brand + '\nModel: ' + mouse.model;
                if (mouseName !== null) {
                    newNameSpan.textContent = mouseName;
                } else {
                    newNameSpan.textContent = 'NA';
                    newNameSpan.title = 'Mouse name is currently not available';
                    titleText += 'Mouse name is currently not available\n';
                }
                newInformationSubDiv.append(newNameSpan);

                // Dimensions
                let newInformationDimensions = document.createElement('span');
                newInformationDimensions.className = 'shape-information-dimensions';
                let mouseLengthTitle = mouse.length;
                if (mouseLengthTitle !== null) {
                    mouseLengthTitle += 'mm';
                } else {
                    mouseLengthTitle = 'Not Available';
                }
                let mouseWidthTitle = mouse.width;
                if (mouseWidthTitle !== null) {
                    mouseWidthTitle += 'mm';
                } else {
                    mouseWidthTitle = 'Not Available';
                }
                let mouseHeightTitle = mouse.height;
                if (mouseHeightTitle !== null) {
                    mouseHeightTitle += 'mm';
                } else {
                    mouseHeightTitle = 'Not Available';
                }
                let mouseWeightTitle = mouse.weight;
                if (mouseWeightTitle !== null) {
                    mouseWeightTitle += ' grams';
                } else {
                    mouseWeightTitle = 'Not Available';
                }
                newInformationDimensions.title = "Length: " + mouseLengthTitle +
                                                "\nWidth: " + mouseWidthTitle +
                                                "\nHeight: " + mouseHeightTitle +
                                                "\nWeight: " + mouseWeightTitle;

                // Length
                let mouseLengthSpan = document.createElement('span');
                let mouseLength = mouse.length;
                if (mouseLength !== null) {
                    mouseLength = Math.round(mouseLength);
                    // mouseLengthSpan.title = 'Length:\n' + mouse.length + ' mm';
                } else {
                    mouseLength = 'N/A';
                    // mouseLengthSpan.title = 'Length is currently not available';
                    titleText += 'Length is currently not available\n';
                }
                mouseLengthSpan.innerText = mouseLength;

                // Width
                let mouseWidthSpan = document.createElement('span');
                let mouseWidth = mouse.width;
                if (mouseWidth !== null) {
                    mouseWidth = Math.round(mouseWidth);
                    // mouseWidthSpan.title = 'Width:\n' + mouse.width + ' mm';
                } else {
                    mouseWidth = 'N/A';
                    // mouseWidthSpan.title = 'Width is currently not available';
                    titleText += 'Width is currently not available\n';
                }
                mouseWidthSpan.innerText = mouseWidth;

                // Height
                let mouseHeightSpan = document.createElement('span');
                let mouseHeight = mouse.height;
                if (mouseHeight !== null) {
                    mouseHeight = Math.round(mouseHeight);
                    // mouseHeightSpan.title = 'Height:\n' + mouse.height + ' mm';
                } else {
                    mouseHeight = 'N/A';
                    // mouseHeightSpan.title += 'Height is currently not available';
                    titleText += 'Height is currently not available\n';
                }
                mouseHeightSpan.innerText = mouseHeight;

                // Measurement
                let measurement = document.createElement('span');
                measurement.innerText = ' mm';
                // measurement.title = 'Measured in:\nmillimeters';

                newInformationDimensions.append(mouseLengthSpan, ' x ', mouseWidthSpan, ' x ', mouseHeightSpan, measurement);
                newInformationSubDiv.append(newInformationDimensions);

                // Weight
                let newInformationWeight = document.createElement('span');
                newInformationWeight.className = 'shape-information-weight';
                let mouseWeight = mouse.weight;
                if (mouseWeight !== null) {
                    mouseWeight = Math.round(mouseWeight) + 'g'; // mouseWeight = Math.round(mouse.weight) + 'g';
                    // newInformationWeight.title = 'Weight:\n' + mouse.weight + ' grams';
                } else {
                    mouseWeight = 'N/A';
                    // newInformationWeight.title += 'Weight is currently not available';
                    titleText += 'Weight is currently not available\n';
                }
                newInformationWeight.innerText = mouseWeight;
                newInformationSubDiv.append(newInformationWeight);

                // Color-input
                let newColorInput = document.createElement('input');
                newColorInput.type = 'color';
                newColorInput.value = colorValueArray[colorValueCounter];
                colorValueCounter++;
                if (colorValueCounter === colorValueArray.length) {
                    colorValueCounter = 0;
                }
                newColorInput.id = 'shape-color-' + mouse.id;
                newColorInput.className = 'shape-tool-color';
                newColorInput.title = 'change outline color';
                newInformationDiv.append(newColorInput);

                if (titleText !== '') {
                    let newViewMissingInformation = document.createElement('span');
                    newViewMissingInformation.id = 'view-missing-information-' + mouse.id;
                    newViewMissingInformation.className = 'view-missing-information';
                    newViewMissingInformation.innerText = '!';
                    newViewMissingInformation.tabIndex = '0';
                    hoverText.id = 'view-missing-hover-text-' + mouse.id;
                    hoverText.className = 'view-missing-hover-text';
                    hoverText.innerText = titleText;
                    newViewMissingInformation.append(hoverText);
                    newInformationSubDiv.append(newViewMissingInformation);
                }

                // Calls functions to update shapes, outline and alignment
                updateShapeOutlineColor(mouse.id);
                updateShapeSize();
                setAlignment();
                updateAlignmentBars();
                // Decreases shape size until it fits on screen.
                if (isOnMobile()) {
                    decreaseShapeSize();
                } else {
                    addDivToolCollideCSS();
                    increaseShapeSizeDesktop();
                    decreaseShapeSizeDesktop();
                }
                return true;
            }
        }
        createErrorMessage(inputBrand + ' ' + inputModel + ' does not exists in the database.');
    } else {
        createErrorMessage(inputBrand + ' ' + inputModel + ' is already selected.');
    }
}


function getMatchingModels() {
    $('#add-new-shape-list-model').empty();
    const selectedBrand = $('#add-new-shape-brand').val();

    let mouseArraySortModel = mouseArray.sort((a, b) => (a.model > b.model) ? 1 : -1);
    if (selectedBrand === "") {
        for (const mouse of mouseArraySortModel) {
            let modelOption = document.createElement('option');
            modelOption.value = mouse.model;
            modelOption.className = 'shape-tool-list-option';
            $('#add-new-shape-list-model').append(modelOption);
        }
    } else {
        for (const mouse of mouseArraySortModel) {
            if (mouse.brand === selectedBrand) {
                let modelOption = document.createElement('option');
                modelOption.value = mouse.model;
                modelOption.className = 'shape-tool-list-option';
                $('#add-new-shape-list-model').append(modelOption);
            }
        }
    }
}

function updateShapeOutlineColor(mouseId) {
    let colorInputId = 'shape-color-' + mouseId;
    let currentColorValue = $('#'+colorInputId).val();
    $(`.${mouseId}-class path`).css('stroke', currentColorValue);
    $('#shape-color-'+mouseId).css('background-color', currentColorValue);
}

function addSVG(id, svgCode, view) {
    let svgImage;
    // Needs to check if browser is Firefox due to SVG path-clipping not working.
    if (isOnFirefox() === false) {
        svgImage = svgCode.replace(/<svg /g, `<svg id="${id}-${view}" class="${id}-class SVG-main SVG-main-${view}"`).replace(/<path /g, `<path id="${id}-${view}-path" `).replace(/<path /g,'<defs> <path ').replace(/<\/svg>/g, ` <\/path> <clipPath id="${id}-${view}-clip"> <use xlink:href="#${id}-${view}-path"/> </clipPath> </defs> <g> <use xlink:href="#${id}-${view}-path" clip-path="url(#${id}-${view}-clip)"/> </g> </svg>`);
    } else {
        // Does not include path-clipping, resulting in outlines partially cutting off near edges.
        svgImage = svgCode.replace(/<svg /g, `<svg id="${id}-${view}" class="${id}-class SVG-main SVG-main-${view}"`);
        // Set timeout due to stroke-width not applying to final loading SVG.
        setTimeout(function () {
            $('.SVG-main path').css('stroke-width', '3');
            $('.SVG-main-side path').css('stroke-width', '3.2');
        }, 0);
    }
    return svgImage;
}

// Adds padding on bottom of current mice div to make sure it does not under-/over-lap with shape-settings-grid
function currentMiceBottomPadding() {
    if (isOnMobile()) {
        $('#shape-tool-current-mice').css({
            'height' : window.innerHeight - $('#shape-tool-current-mice').offset().top - $('#shape-settings-grid').outerHeight(),
            'padding-bottom' : '3vh'
        });
    } else {
       /* let shapeSettingsGridHeight = $('#shape-settings-grid').outerHeight() + 12;*/
        $('#shape-tool-current-mice').css({
            'padding-bottom' : $('#shape-settings-grid').outerHeight() + 30,
            'height' : 'inherit'
        });
    }
}
/*---------------------------
    Adding new shapes - end
---------------------------*/

/*-------------------------
    Remove shapes - start
-------------------------*/
function removeMouse(mouseId) {
    // Removes shape images
    $(`.${mouseId}-class`).remove();

    // Removed information div
    $(`#shape-div-${mouseId}`).remove();

    // Removes mouse from currentlyViewedMice[]
    currentlyViewedMiceSVG = currentlyViewedMiceSVG.filter(function(Mouse) {
        return Mouse.id !== parseInt(mouseId);
    });
    if (currentlyViewedMiceSVG.length > 0) {
        updateShapeContainerSize();
    }

    updateAlignmentBars();
}
/*-------------------------
    Remove shapes - start
-------------------------*/


/*------------------------------------
    Automatic shape resizing - start
------------------------------------*/
// Changes shape size on load and window-resize to fit screen without manual input.
// Increase, used mostly for mobile
function increaseShapeSize() {
    let slider = $('#shape-settings-size-slider');
    if (slider.val() < slider.attr('max')) {
        let stepValue = slider.attr('step');
        while ($('.shapes-div').width() < $(window).width() - 10
        && $('.shapes-div').height() < $('#mobile-shapes-div').height() - 20
        && slider.val() < slider.attr('max')) {
            slider.val(+$('#shape-settings-size-slider').val() + +stepValue);
            updateShapeSize();
        }
    }
}


// Decrease, used mostly for mobile
function decreaseShapeSize() {
    let slider = $('#shape-settings-size-slider');
    if (slider.val() > slider.attr('min')) {
        let stepValue = slider.attr('step');
        while (($('.shapes-div').width() > $(window).width() - 10
            || $('.shapes-div').height() > $('#mobile-shapes-div').height() - 20)
        && slider.val() > slider.attr('min')) {
            slider.val($('#shape-settings-size-slider').val() - stepValue);
            updateShapeSize();
        }
    }
}


// Increase, used on desktop
function increaseShapeSizeDesktop() {
    let slider = $('#shape-settings-size-slider');
    let stepValue = slider.attr('step');
    while (($('.shapes-div').offset().top + $('.shapes-div').height()) <= $('#shape-settings-grid').offset().top - 10
    && slider.val() < slider.attr('value')
    && $('.shapes-div').offset().left >= 0) {
        slider.val(+$('#shape-settings-size-slider').val() + +stepValue);
        updateShapeSize();
    }
}


// Decrease, used on desktop
function decreaseShapeSizeDesktop() {
    let slider = $('#shape-settings-size-slider');
    let stepValue = slider.attr('step');
    while (((($('.shapes-div').offset().top + $('.shapes-div').height()) >= $('#shape-settings-grid').offset().top - 10) || $('.shapes-div').offset().left <= 0)
    && slider.val() > slider.attr('min')) {
        slider.val($('#shape-settings-size-slider').val() - stepValue);
        updateShapeSize();
    }
}


let divToolColliding;

function addDivToolCollideCSS() {
    if (divToolColliding !== true && +$('.shapes-div').offset().left + +$('.shapes-div').width() >= $('#shape-tool').offset().left) {
        $('.shapes-div').css({
            'left' : 'inherit',
            'right' : $('#shape-tool').outerWidth() + 'px',
            'transform' : 'translate(0, -50%)'
        });
        divToolColliding = true;
    }
}


function removeDivToolCollideCSS() {
    if (divToolColliding !== false) {
        $('.shapes-div').css({
            'left' : '50%',
            'right' : 'inherit',
            'transform' : 'translate(-50%, -50%)'
        });
        divToolColliding = false;
    }
}
/*----------------------------------
    Automatic shape resizing - end
----------------------------------*/
