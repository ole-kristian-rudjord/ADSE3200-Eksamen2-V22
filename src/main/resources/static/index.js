/*-------------------------------------------------------
---------------------------------------------------------

                JS content: Compare Shapes

---------------------------------------------------------
---------------------------------------------------------

    Checks user device

    Burger menu

    Theme

---------------------------------------------------------

    Shape Compare
        -Slider, shape size, shape container
        -Alignment
        -Reset size & alignment
        -Adding new shapes
        -Remove shapes
        -Shape information interactivity
        -Automatic shape resizing

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
    $('.burger-icon').on('mouseover', function() {
        $('.burger-lines').css('background-color', 'var(--primaryColor)');
    }).on('mouseout', function() {
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
        }
        else if (theme === 'gray') {
            backgroundColor = 'rgb(32,32,32)';
            reverseColor = 'rgb(220,220,220)';
            borderColor = 'rgb(220,220,220)';
            hoverColor = 'rgb(45,45,45)';
        }
        else if (theme === 'dark') {
            backgroundColor = 'black';
            reverseColor = 'rgb(220,220,220)';
            borderColor = 'rgb(190,190,190)';
            hoverColor = 'rgb(35,35,35)';
        }

        $(':root').css({
            '--themeHoverColor' : hoverColor,
            '--themeBackgroundColor' : backgroundColor,
            '--themeReverseColor' : reverseColor,
            '--themeBorderColor' : borderColor
        });

        $('body').css('background-color', backgroundColor);

        // Changes current theme icon
        $('.theme-options-btn').css('border', 'var(--themeBorderColor) solid 2px');
        $('#theme-option-'+theme).css('border', 'var(--primaryColor) solid 4px');

        // Changes only applied to "Compare Shapes" page
        if ($('body').is('#compare-shapes')) {
            // Sets align button color due to border-color changes overwriting currently active alignment outline.
            setAlignButtonColor();
        }
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





/*-------------------------
    Shape compare - start
-------------------------*/

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

            // Not currently needed due to mice already loading from the start. If added later, try setTimeout() instead.
            /*$('.shapes-div svg').on('load', function () {
                console.log('testing1');
                updateShapeContainerSize();
            });*/
        }
    }

    // Updates shape sizes on -/+ click
    $('.shape-settings-size-btn').on('click', function () {
        let slider = $('#shape-settings-size-slider');
        let stepValue = slider.attr('step');
        if (isOnMobile()) {
            stepValue *= 2;
        }

        if (slider.val() > slider.attr('min') && this.id === 'shape-settings-size-text-minus') {
            slider.val($('#shape-settings-size-slider').val() - stepValue);
        } else if (slider.val() < slider.attr('max') && this.id === 'shape-settings-size-text-plus') {
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
        $('#shape-back-container').css('justify-content', horizontalAlignPosition);
        $('#shape-side-container').css('justify-content', horizontalAlignSidePosition);
    }


    // Sets color of alignment buttons based on selected alignment values
    function setAlignButtonColor() {
        // First, sets all buttons back to default
        $('.shape-settings-align-btn').css({
            'outline-color' : 'var(--themeBorderColor)',
            'z-index' : '0'
        });

        // changes active button colors
        $('#shape-settings-align-vertical-btn-' + verticalAlign).css({
            'outline-color' : 'var(--primaryColor)',
            'background-color' : 'var(--themeBackgroundColor)',
            'z-index' : '1'
        });
        $('#shape-settings-align-horizontal-btn-' + horizontalAlign).css({
            'outline-color' : 'var(--primaryColor)',
            'background-color' : 'var(--themeBackgroundColor)',
            'z-index' : '1'
        });
    }


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


    $('.shape-settings-align-btn').on('mouseover', function () {
        $(this).css('background-color', 'var(--themeHoverColor)');
    }).on('mouseout', function () {
        $(this).css('background-color', 'var(--themeBackgroundColor)');
    });


    function shapeSizeAndAlignmentReset() {
        verticalAlign = defaultVerticalAlignment;
        horizontalAlign = defaultHorizontalAlignment;
        setAlignment();
        setAlignButtonColor();

        $('#shape-settings-size-slider').val($('#shape-settings-size-slider').attr('value')); // Sets slider-value back to HTML default
        updateShapeSize();
        decreaseShapeSizeDesktop();
    }

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
        $(this).css('background-color', 'var(--themeHoverColor)');
        $(this).find('span').css('color', 'var(--primaryColor)');
    }).bind('mouseleave focusout', function () {
        $(this).css('background-color', 'var(--themeBackgroundColor)');
        $(this).find('span').css('color', 'var(--themeTextColor)');
    });

    /*--------------------------------
        Reset size & alignment - end
    --------------------------------*/





    /*-----------------------------
        Adding new shapes - start
    -----------------------------*/

    /*// Mouse object class
    class MouseSVG {
        constructor(name, length, width, height, weight, svgCodeTop, svgCodeSide, svgCodeBack) {
            this.name = name;
            this.length = length;
            this.width = width;
            this.height = height;
            this.weight = weight;
            this.svgCodeTop = svgCodeTop;
            this.svgCodeSide = svgCodeSide;
            this.svgCodeBack = svgCodeBack;
        }
    }

    // Array with mouse objects
    let mouseArraySVG = [];

    /!*------------------------------------------------------------
    --------------------------------------------------------------
        Objects will be replaced with JSON/SQL information later
        Current objects/classes are placeholders for testing
    ---------------------------------------------------------------
    -------------------------------------------------------------*!/

    // Creating mice and pushing them to the array
    const Zowie_FK1rpPlusIconrpMinusIconC = new MouseSVG('Zowie_FK1rpPlusIconrpMinusIconC', 129, 69, 39, 77, '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 362.68631 693.23523"><path d="m167.39138 0-8.95898 1.125c-5.73968.721267-10.57173 1.446728-10.73633 1.611328-.1646.1646-.37811 2.385648-.47461 4.935547-.18895 4.995434-1.6981 6.465037-4.70703 4.585937-3.49776-2.184394-41.75049 5.50299-60.64648 12.1875-34.68872 12.271231-57.38034 33.140741-67.07422 61.689451-6.90629 20.33924-6.93244 20.65318-6.86524 82.51367.0526 48.42762-.13237 55.75-1.41015 55.75-2.17593 0-.99302 78.91082 1.20703 80.51954 1.9672 1.43845 2.41171 5.84716.78711 7.80468-1.10835 1.33548-1.05715 7.99679.30664 39.89063.90041 21.05724 2.13527 39.96152 2.74414 42.00976 2.06647 6.95153-.15286 32.65632-5.20508 60.27539-4.74256 25.92618-6.26262 39.79289-6.35352 58-.11067 22.15999 1.72993 34.96535 7.83399 54.5 15.14419 48.4655 45.63195 85.3511 88.0293 106.50391 18.93462 9.44683 41.05899 16.05881 61.5 18.38281 12.52316 1.4238 37.0859 1.2172 49.69726-.41797 71.34541-9.25057 124.95593-53.9494 147.21094-122.74023 6.47722-20.02126 8.41316-32.7338 8.41015-55.22852-.003-19.98694-1.03452-29.05953-7.27734-64-5.02261-28.11102-5.40799-34.86763-4.72461-82.9707.34404-24.21663.82841-45.1543 1.07422-46.5293.7984-4.46609 3.10981-131.49136 3.06641-168.5-.0348-29.67273-.34691-37.6697-1.77344-45.5-7.47088-41.00813-29.88526-66.57124-71.63477-81.691402-19.01512-6.88658-57.62956-14.67796-61.32031-12.373047-2.86407 1.78864-4.72851-.356407-4.72851-5.4375V2.640625l-7.54102-1.121094C203.67947.902673 198.98059.398437 197.38552.398437c-1.0131 0-2.00508-.159363-2.67187-.398437z"/></svg>', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1077.6389 332.0773"><path d="M579.37889.00113c-29.51608-.0768-77.42444 3.77337-111 8.91992-30.57652 4.68685-72.38909 13.91731-99.5 21.9668-4.95 1.4697-10.85975 2.62024-13.13282 2.55664-2.27308-.0636-7.22308.83961-11 2.00586-11.91205 3.67824-57.20714 20.45447-73.86718 27.35937-25.21443 10.45035-24.46739 10.1983-25.44336 8.61914-.46825-.75765-3.0554-1.55226-5.76563-1.76953-3.9903-.31989-5.26471-.009-6.75976 1.64258-2.31754 2.56085-6.28039 2.61208-8.9668.11719-1.66767-1.54878-3.00526-1.80858-6.95703-1.35352-4.18811.48228-5.04167.96193-5.93555 3.33008-1.38365 3.6657-5.93899 4.70127-8.83008 2.00781-1.88673-1.75776-2.36162-1.79425-6.10742-.47265-5.20883 1.83778-6.98312 3.34459-6.42969 5.46093.30552 1.16831-.62379 2.20355-2.99023 3.33203-3.06379 1.46102-3.59583 1.47448-4.94531.125-2.02787-2.02788-2.74554-1.93108-7.38867 1-2.51338 1.58663-3.98047 3.26364-3.98047 4.54883 0 3.1489-4.75685 7.0383-7.70313 6.29883-1.88752-.47373-3.21905.14248-5.87304 2.71484-2.18453 2.1173-3.23713 3.93846-2.89649 5.01172.74817 2.35729-4.15609 7.91406-6.98437 7.91406-3.0335 0-8.04432 7.28336-6.6836 9.71485 1.67277 2.98907-.76382 5.69313-9.66015 10.7168-16.00797 9.03952-53.27043 31.61036-74.08985 44.8789-31.88401 20.32017-39.15285 28.86867-47.56836 55.93945-.0959.30848-.15133.42299-.24218.70899-.20253 1.01682-.49313 2.02148-.72071 3.0293-.14591.33373-.0851.69912-.14453 1.04492-.0487.28313-.10935.59314-.17969.90625-.013.12561-.0234.25167-.0391.37695-.024.19146-.0942.37539-.13281.56445-.0235.11515-.0349.2315-.0527.34766-.0997.77442-.26671 1.52871-.48046 2.2793-.19442.683-.1564.32597-.1836.68945-.13589 1.19042-.60909 2.30556-.83203 3.47461-.0307.16248-.0519.3278-.0918.48828-.42297 1.70258-.1939.70967-.58789 1.99805-.33624 1.09953-.62768 2.21669-.93554 3.32422-.0678.28177-.15021.55847-.23633.83398-.022.14604-.0374.29295-.0566.43945-.11393.79624-.25065 1.58926-.35547 2.38672-.1607 1.22271.0197.24672-.25 1.83594-.0316.18656-.0768.3694-.11524.55469-.21796 1.10927-.28469 2.24605-.58398 3.33984-.11574.38254-.10679.75228-.15039 1.16992-.0433.4144-.0926.82983-.15235 1.24219-.0187.12902-.0548.25336-.082.38086-.0496.22784-.0969.45616-.14843.68359-.0269.11884-.005.26467-.0859.35547-.0431.0481-.0633-.24388-.0703-.17968-.0733.67281.18554 1.29739-.11524 1.98632-.17708.97209-.23875 1.96434-.43945 2.9336-.0425.26291-.0946.52412-.13672.78711-.0578.82132-.12399 1.6421-.21094 2.46093-.0617.57866-.18779 1.15608-.21679 1.73829-.0254.50971.0379.15163.0273.58203-.0112.45616-.0366.9132-.0547 1.36914-.0222.29044-.0356.58143-.0664.87109-.11183 1.05317-.10455.81472-.25391 1.67383-.0196.11296-.0328.22677-.0527.33984.0478.0673-.0104.22716-.002.32813.006.0763.0156.15201.0176.22851.0184.57546.0114 1.14745.004 1.72266.02.51263-.0783 1.01479-.17383 1.51562.0935.78793-.008 1.56303-.10156 2.34571-.0369.35716-.0374.29436-.0508.37305.00056.0327.004.0402.006.0605.005.0648.0167.13041.0137.19531-.0212.45842-.057.91505-.0859 1.37305-.0243.14073-.0498.28114-.0742.42188v.002c.0109.21288.0203.42571.0293.63867.005.87695-.01 1.75388-.008 2.63086.00024.12574-.00027.25121 0 .37695.00047.21399.002.49068.002.71485-.00003.11074.00011.2213 0 .33203-.00007.0676-.0159.13702-.002.20312.004.017.0236-.0262.0352-.0391.0183.10829.0408.21528.0547.32422.0383.30128.0618.59446.0742.88867.1232.22983.18534.68326.33593.80469 1.32605 1.0693 14.10755 3.08158 34.31446 5.40234l11 1.26367 8.5 8.62891c9.67534 9.82381 13.88107 11.88536 29.5 14.46094 28.0823 4.63075 46.14901 5.08319 181.5 4.53515 183.16312-.74153 305.34198-.6093 361.5.39063 27.5.48965 70.475 1.19548 95.5 1.56836 97.51834 1.45306 195.33512.83183 231.49992-1.46875 44.0677-2.80331 70.0471-5.78143 82.3301-9.43945 5.2329-1.55841 9.9237-4.23184 20.2403-11.53125 7.386-5.22597 15.1763-10.97423 17.3105-12.77539l3.8789-3.27539-4.8789-6.83008c-2.6842-3.75699-5.3309-7.55129-5.8809-8.43164-8.0461-12.87879-29.5254-40.48478-49-62.97657-12.2912-14.19554-53.4622-54.24232-71.0195-69.08007C853.26579 66.39079 751.55647 17.83763 652.37912 4.91125c-19.66541-2.56311-53.8119-4.86025-73-4.91015zM.4492 279.88003c-.007.0595-.0235.11791-.0273.17774-.003.0461.0232-.0882.0352-.13281-.00002-.0114-.006-.0312-.008-.0449zm-.14453 3.69141c-.0138.0736-.0283.14716-.041.2207-.007.0386.0302-.0725.0352-.11132.007-.0517.003-.0676.006-.10938zM.041 288.17691c-.0139.0801-.0272.16016-.041.24023.001.0203.00046.0826.004.0625.0155-.0989.028-.43913.0371-.30273z"/></svg>', null);
    mouseArraySVG.push(Zowie_FK1rpPlusIconrpMinusIconC);

    const Zowie_FK2rpMinusIconC = new MouseSVG('Zowie_FK2rpMinusIconC', 125, 65, 36, 70, '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 424.0563 844.43567"><path d="M194.95211 0c-1.0754.19619-2.72439.39401-4.57227.51563-7.38712.4862-16.4355 2.39259-18.49219 3.89648-1.25687.91904-1.75433 2.74484-1.79883 6.6211-.0736 6.40864-.80893 7.83789-4.03711 7.83789-1.9571 0-2.4414-.51-2.4414-2.57813 0-2.28164-.3175-2.51563-2.75-2.02539-1.5125.30482-7.025 1.26511-12.25 2.13477-13.52176 2.2506-36.64099 7.89701-49.5 12.08984-30.92446 10.08325-59.55035 29.46975-65.14063 44.11328-1.00091 2.62186-3.97085 8.59063-6.59961 13.26563-5.73619 10.20129-10.16167 21.32606-13.32617 33.5-4.63383 17.82652-4.94599 23.83087-4.74023 91.18945l.19336 63.1875-2.19336.3125c-2.61476.3721-2.59811-.36785-1.25 55.31055 1.08591 44.84944.9405 42.57723 2.80078 43.9375 2.24746 1.64338 2.52124 5.05353.57812 7.20508-1.57075 1.73924-1.55796 4.63362.19727 45.35742 2.16679 50.27274 2.36998 53.05073 4.09961 55.82031 1.7026 2.7263-.2443 35.91919-3.06641 52.26367-1.08412 6.27879-2.6415 15.24102-3.45898 19.91602-6.00381 34.33453-8.55379 70.00476-6.50781 91 4.50064 46.18407 23.11591 93.60758 49.4746 126.0332 7.09472 8.7277 24.17862 25.13203 33.44532 32.11523 28.97516 21.83515 66.50908 36.54357 104.04492 40.77344 11.65972 1.31392 44.35359.49877 56.44922-1.4082 34.8187-5.48942 68.63525-19.76357 96-40.52148 26.50436-20.10527 50.27695-51.079 62.92969-81.99219 1.46324-3.575 3.02741-7.4 3.47656-8.5.44915-1.1 1.52467-3.63757 2.38867-5.64063 2.12212-4.91987 8.19903-27.16219 10.61719-38.85937 4.99081-24.14171 5.77004-42.87937 2.78711-67-3.11597-25.19636-4.58423-35.51109-7.61524-53.52149-5.05381-30.02994-6.33066-44.54509-6.46289-73.47851-.11338-24.80876.92343-63.74536 1.87695-70.5 1.06229-7.52507 3.43517-151.94328 3.47657-211.57617.0336-48.46729-1.73376-65.37174-8.84375-84.59375-5.3067-14.34676-9.97178-22.68578-20.51367-36.66407-16.86967-22.36877-49.38347-39.21691-96.11719-49.80664-11.59119-2.62653-30.358-5.66738-31.00196-5.02344-.27418.27419-.49804 1.35381-.49804 2.4004 0 1.40137-.59299 1.81931-2.25 1.58398-2.03117-.28847-2.29863-1.00112-2.75-7.32031l-.5-7-3.60352-1.17578c-1.98255-.64711-7.12664-1.66686-11.43164-2.26563C233.70317.59978 231.59537.26813 230.08882 0z"/></svg>', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 837.46954 248.94896"><path d="M454.338868.00003c-19.43129-.005-39.6899.69829-55.39258 2.10937-29.23253 2.6269-58.01031 7.60899-95 16.44727-12.375 2.95687-25.425 5.91434-29 6.57226-8.62305 1.58692-37.45703 11.21199-58.16602 19.41602-9.16566 3.63105-17.30715 6.60156-18.09375 6.60156s-2.24474-.9-3.24023-2c-1.95433-2.15951-9.84031-2.87641-11-1-.83717 1.35457-6.21331 1.27291-7.06641-.10742-.99123-1.60385-8.19164-.22821-11.20312 2.14062-2.78054 2.18718-5.28356 2.51332-6.89844.89844-1.4436-1.4436-7.15071.97688-10.72266 4.54883-1.89162 1.89162-3.37384 2.55203-4.85742 2.16406-2.80214-.73278-9.75195 3.17448-9.75195 5.48242 0 2.13657-3.66943 4.87305-6.53516 4.87305-2.55675 0-7.46484 4.9159-7.46484 7.47656 0 2.43688-2.83612 5.52344-5.07422 5.52344-1.94773 0-6.40696 6.41516-5.49024 7.89844.87148 1.41008-1.18945 6.06873-2.99023 6.75976-.87093.3342-2.78884 1.72862-4.26367 3.09766-1.47483 1.36903-7.85664 5.38685-14.18164 8.92969-6.325 3.54285-21.85 12.60158-34.5 20.1289-27.72525 16.49778-32.53145 20.7584-39.14453 34.71875-2.23736 4.72312-4.21478 9.6603-4.76954 11.76563-.012.0278-.0475.14114-.0723.21094-.0135.038-.0149.0367-.041.11914-.0698.21993-.19359.62532-.43554 1.45508-.26428.90632-.51453 1.81618-.77149 2.7246-.87278 3.19561-.47852 1.85321-1.95703 6.43946-.375594 1.1651-.740086 2.33425-1.148437 3.48828-.0023.006-.0036.0131-.0059.0195-.150867.5485-.314863 1.08649-.416016 1.48828-.224574.89204-.433867 1.78761-.65039 2.68164-.212357.91993-.311157 1.38463-.402344 1.78321-.01214.0628-.04503.21846-.06641.29882-.131969.58051-.237217 1.01445-.615235 2.72461-.0305.13799-.06156.27595-.0918.41407-.11252.66977-.211549 1.34248-.316406 2.01367-.38556 2.6173-.256123 1.6926-.71875 5.14258-.11184.83403-.207822 1.66938-.330078 2.50195-.198808 1.3539-.41564 2.70556-.632813 4.05664-.148625.92462-.283663 1.8523-.46289 2.77148-.03758.19275-.08142.38388-.121094.57618-.548873 5.28951-.433998 5.7788 1.78125 6.68359 1.31347.53647 10.263673 1.92539 19.888673 3.08594l17.5 2.10937 5.74218 6.35938c7.02137 7.77578 10.2959 9.06057 28.25782 11.09375 25.90665 2.93248 41.81077 3.20664 150.5 2.58789 125.93053-.7169 241.43133-.43528 302 .73633 61.73734 1.19422 171.08921 1.26094 199 .12109 41.99858-1.71519 70.59013-4.36124 82-7.58789 3.99041-1.12846 8.56912-3.88716 16.68164-10.04883 6.14983-4.67095 11.9243-9.62636 12.83203-11.01172 1.59561-2.43521 1.53202-2.69572-1.88867-7.84765-1.946-2.93088-4.43526-5.61308-5.53125-5.96094-1.17956-.37437-1.77204-1.20407-1.45313-2.03516 1.09481-2.85302-22.58073-32.16533-43.03906-53.28515-80.51071-83.11391-182.36029-137.07068-279.7793-148.21875C492.373678.71834 473.770038.00505 454.338798 0z"/></svg>', null);
    mouseArraySVG.push(Zowie_FK2rpMinusIconC);

    const Zowie_EC1rpMinusIconC = new MouseSVG('Zowie_EC1rpMinusIconC', 130, 69, 42, 80, '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 370.66376 686.93884"><path d="M163.32587.00004c-.92823.0507-1.93259.0781-2.96875.0781-8.92173 0-12.24051 1.09938-12.67969 4.19726-.25287 1.7837-1.05997 2.37458-3.57617 2.61719-3.02758.29191-3.25.10371-3.25-2.75 0-2.79055-.28944-3.06359-3.25-3.05859-10.67504.0178-49.68746 7.49273-66.25 12.69336-24.15015 7.58314-46.55579 23.82488-55.87305 40.50195-5.44658 9.74889-7.60487 16.69009-9.73047 31.29883-2.5192 17.3139-2.38766 31.83355.58399 64.6289 3.12179 34.4522 4.10163 47.79238 3.71289 50.51954-.16841 1.18144-1.18091 2.37668-2.25 2.65624-1.26225.3301-1.94336 1.37304-1.94336 2.97461 0 1.35648 1.60245 18.16124 3.56054 37.34375 1.95808 19.1825 3.76643 42.9532 4.01954 52.82227.36313 14.1585.7813 18.29624 1.97851 19.61914 1.13702 1.25639 1.2729 2.27336.54102 4.05664-.78823 1.92062-3.67871 67.14408-3.29492 74.35156.0577 1.08473-1.46298 13.68473-3.37891 28-7.83939 58.57366-8.41531 64.12204-9.10547 87.5625-1.10499 37.52996 3.00298 59.93257 15.95312 86.97852 5.3667 11.20811 9.5602 17.56375 18.88086 28.61523 24.80893 29.41588 69.25249 53.01251 112.5879 59.77735 12.22697 1.90873 38.92108 1.94567 51.51562.0703 37.1975-5.53882 69.2769-22.17685 99.07031-51.38086 31.07347-30.45875 51.81493-68.1792 63.5625-115.5957 6.96893-28.12857 8.34284-40.33162 8.84571-78.5.49872-37.85392-1.34334-62.18699-8.74414-115.5-8.52916-61.44128-10.49899-103.27228-7.86329-167 1.16952-28.27747 1.15411-28.72547-2.13086-61.5-1.47171-14.68336-7.34529-29.3716-17.39648-43.5-12.13989-17.06436-30.84983-30.01602-54.10156-37.45508-16.16058-5.17036-44.34939-11.21615-57-12.22461-3.8341-.30564-4.01157-.18792-4.30469 2.83008-.28045 2.88766-.52907 3.08822-3 2.43164-1.8273-.48556-2.80698-1.49851-3.04492-3.14844-.47886-3.32065-1.20361-3.61787-10.78516-4.41601L195.05048 0z"/></svg>', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1065.1033 366.30081"><path d="M522.83207.00718c-18.33335-.0814-36.49171.52903-47.72656 1.86133-18.20621 2.159-39.52187 5.35959-48 7.20703-3.575.77901-11.675 2.54777-18 3.93164-9.79064 2.14213-22.80376 5.52117-40.5 10.51563-2.2.62092-13.45 4.20355-25 7.96093-11.55 3.75739-30.45 9.87796-42 13.60157-23.21878 7.48553-53.65955 18.21381-65 22.9082-14.03822 5.81113-19.76177 7.69354-21.75586 7.15234-1.234-.3349-4.60747-.0895-7.49609.54493-3.95912.86976-5.8732.8686-7.77539.004-3.31171-1.50891-16.71891.39906-20.95508 2.98242-1.65957 1.01206-4.68086 1.84175-6.71289 1.84375-3.83247.004-17.97174 5.84871-19.28321 7.97071-.4077.65967-2.8157 2.08768-5.3496 3.17382-2.53396 1.08619-6.64571 3.63181-9.13868 5.65821-6.59034 5.35692-18.47146 17.83562-22.24218 23.36133-1.98088 2.90282-5.08689 5.77251-7.91993 7.31445-4.03581 2.19656-18.66672 11.78522-29.88086 19.58398-21.85832 15.20115-49.89338 40.76722-59.32617 54.10157-8.74939 12.36829-13.5472 25.24595-13.8164 37.08007-.13652 6.0016 1.31018 7.75977 6.39062 7.75977 3.68461 0 3.94026.17439 3.28906 2.25-.38825 1.2375-1.078 4.5-1.5332 7.25-.5749 3.47317-1.62307 7.23517-2.57226 10.96484-.0115.0814-.0192.16332-.0352.24414-.65744 3.33084-1.51961 6.62718-2.33399 9.91993-1.38102 5.58381-1.86222 7.02642-2.89648 10.58203-.23965 1.60436-.48165 3.2081-.8418 4.78906-.44233 1.94177-.93358 3.87199-1.4375 5.79883-.005.13552-.009.27103-.0195.40625-.0101.12989-.0403.25745-.0566.38672-.001.0113.002.0462.006.0351-.0525.56324-.0318.42536-.10547.95899-.30362 1.48875.0202-.0515-.21094.9082-.00025.0184-.003.037-.004.0547.00099-.0156.002-.0311.002-.0469-.005.0195-.003.01-.008.0312-.006.0273-.002.0562-.006.084-.007.048-.0461.18538-.0234.14258.0156-.0293.0205-.0708.0254-.11133-.0284.73889-.17004 1.45239-.33789 2.16992-.0228.0976-.0551.19226-.0723.29102-.004.0236.0117.0463.0117.0703-.001.0579-.009.11613-.0137.17383-.024.15427-.0525.35291-.0879.54882-.025.28049-.0354.56258-.084.83985-.0366.20852-.11718.40791-.17578.61133.0167-.0243.0449-.10119.0469-.0723.006.0773-.024.15202-.0371.22852-.0233.13633-.0482.272-.0723.4082-.0492.27836-.0795.55702-.11133.83789-.28388 1.62175.0679-.3171-.19727.94922-.004.0226.006.0474.004.0703-.007.0672-.0174.13272-.0293.19922-.0747.41633-.0751.4028-.1582.75586-.009.0569-.0183.11497-.0273.17187-.0403.24169-.0513.2927-.10743.54493-.0178.5145-.0942 1.00083-.24414 1.49414-.004.0741-.006.14864-.0117.22265-.007.10364-.0309.20613-.0488.3086-.004.0417-.009.0666-.0117.0996-.00037-.01-.004-.0195-.002-.0293.003-.0235.008-.0469.0117-.0703.003-.0285.01-.0908.006-.0684-.17941 1.04582-.0378.47154-.20312 1.08593.009-.0295-.009.0504-.0254.12305.009-.13734.0176-.4446.006-.33398-.0406.33917-.0402.40687-.0488.54687-.001.005-.002.0104-.004.0156-.0169.26543-.0309.36573-.0586.49804-.006.0481-.012.0963-.0176.14454-.00015.00099.00014.003 0 .004-.0299.0919-.0803.23518-.16797.50391-.0103.31392-.002.41847.0117.43554-.0113.0529-.0205.10554-.0312.15821.016-.18725.013-.44013-.002-.32617-.0458.34846-.0447.70329-.0937 1.05078.004.009.008.0117.0117.0215.0238.43053.003.76301-.0899 1.2168.0181.16888.0312.33814.0117.50586-.0539.46272-.0796.61572-.11328.77539-.005.0703-.0118.14059-.0176.21094.0192.15338.0264.47.0273.52929-.004.25083-.01.50109-.008.75196.001.3092 0 .61853 0 .92773.00013.1443.00002.2893 0 .43359-.00001.0274 0 .0547 0 .082.025.42629.084.74787.084 1.23438 0 5.68134 2.36475 9 6.41211 9 1.32636 0 12.01386 1.38349 23.75 3.07422 11.73614 1.69074 24.28028 3.46567 27.87695 3.94531 4.63507.61812 8.24011 1.89565 12.37695 4.38672 14.21443 8.55949 35.03177 13.84758 63.08399 16.02344 3.85.29862 11.5.88664 17 1.30664 5.5.42005 68.725.61562 140.5.43555 71.775-.18012 163.575.14894 204 .73046 122.88935 1.76776 143.65046 2.0933 166 2.59961 11.825.26789 39.725.7628 62 1.10157 22.275.33877 40.68435.78897 40.91015 1 .60915.56929 149.93826-.39808 161.58976-1.04688 5.5-.30625 19.675-1.02362 31.5-1.59375 58.9432-2.84187 81.8431-8.12421 95.8145-22.09961 5.8722-5.87389 12.1855-16.33868 12.1855-20.19922 0-3.14951-19.1038-29.98891-36.4179-51.16406-32.0328-39.1761-67.2528-73.48004-114.5821-111.60156-9.8885-7.9647-34.9047-26.92569-41.5-31.45508-1.65-1.13315-5.25-3.6451-8-5.58203-46.779-32.94861-98.25784-61.21311-148.49991-81.53516-49.02607-19.8302-93.70892-31.44306-144.4961-37.55273C559.67592.86284 541.16714.08874 522.83377.00715zM2.59379 301.02671c.001-.005.00001-.003.002-.008.00033-.0236.00036-.0509.002-.0703-.00009.0263-.003.0519-.004.0781z"/></svg>', null);
    mouseArraySVG.push(Zowie_EC1rpMinusIconC);

    const Pulsar_Xlite = new MouseSVG('Pulsar_Xlite', 122.66, null, /!*42*!/null, null, null, null, null);
    mouseArraySVG.push(Pulsar_Xlite);


    // Sorting array alphabetically by name
    mouseArraySVG.sort(function (a, b) {
        return a.name.localeCompare(b.name);
    });*/


    // Adds mice from array to drop-down list for select-input
    /*for (let i = 0; i < mouseArraySVG.length; i++) {
        let newOption = document.createElement('option');
        newOption.value = mouseArraySVG[i].name.replace(/_/g, ' ').replace(/rpPlusIcon/g, '+').replace(/rpMinusIcon/g, '-');
        newOption.className = 'shape-tool-list-option';

        $('#add-new-shape-list').append(newOption);
    }*/

    /*$.get('/getAllMice', function (mouseList) {
        for (const mouse of mouseList) {
            let brandOption = document.createElement('option');
            let modelOption = document.createElement('option');
            brandOption.value = mouse.brand;
            modelOption.value = mouse.model;
            brandOption.className = 'shape-tool-list-option';
            modelOption.className = 'shape-tool-list-option';
            $('#add-new-shape-list-brand').append(brandOption);
            $('#add-new-shape-list-model').append(modelOption);
        }
    }).fail(function (status) {
        createErrorMessage('There was an error with retrieving mice information from the database, please try again later.\nError: ' + status.status);
    });*/
    $.get('/getDistinctCategoryItems?category=' + 'brand', function (brandList) { // gjør om til List<String>
        for (const mouse of brandList) {
            let brandOption = document.createElement('option');
            brandOption.value = mouse.brand;
            brandOption.className = 'shape-tool-list-option';
            $('#add-new-shape-list-brand').append(brandOption);
        }
    }).fail(function (status) {
        createErrorMessage('Error: ' + status.status + '\nCould not retrieve brand information from database, please try again later.');
    });

    function getMatchingModels() {
        const mouseObject = {
            brand: $('#add-new-shape-list-brand').val()
        }
        $.get('/getMatchingModels', mouseObject, function (modelList) { // gjør om til List<String>
            console.log(modelList);
            $('#add-new-shape-list-model').empty();
            for (const mouse of modelList) {
                console.log(mouse);
                let modelOption = document.createElement('option');
                modelOption.value = mouse.model;
                modelOption.className = 'shape-tool-list-option';
                $('#add-new-shape-list-model').append(modelOption);
            }
        }).fail(function (status) {
            createErrorMessage('There was an error with retrieving model information from the database,\nplease try again later.\nError: ' + status.status);
        });
    }




    // Array with currently viewed mice
    let currentlyViewedMiceSVG = [];


    // Creates an automatically disappearing errormessage
    function createErrorMessage(message) {
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


    // Changes shape outline color based on color-selector input
    /*function updateShapeOutlineColor(mouseName) {
        let colorInputId = mouseName + '-color';
        let currentColorValue = $('#'+colorInputId).val();
        $(`.${mouseName}-class path`).css('stroke', currentColorValue);
    }*/

    function updateShapeOutlineColor(mouseId) {
        let colorInputId = 'shape-color-' + mouseId;
        let currentColorValue = $('#'+colorInputId).val();
        $(`.${mouseId}-class path`).css('stroke', currentColorValue);
        $('#shape-color-'+mouseId).css('background-color', currentColorValue);
    }


    // Default color values used in addMouse()
    let colorValueArray = ['#FF3C19', '#19DCFF', '#AF19FF', '#69FF19', '#FEE801', '#0117FE', '#FE0196', '#01FE69'];
    let colorValueCounter = 0;


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

    function addMouse(brand, model) {
        $('#add-new-shape-input').val('');
        let mouseInUse = false;
        for (const viewedMouse of currentlyViewedMiceSVG) {
            if (viewedMouse.brand + ' ' + viewedMouse.model === brand + ' ' + model) {
                mouseInUse = true;
            }
        }
        if (!mouseInUse) {
            const mouseObject = {
                brand: brand,
                model: model
            }
            /*const replacedMouseName = mouseName.replace(/\s/g, 'RPspace').replace(/\+/g, 'RPplus').replace(/\-/g, 'RPminus');
            console.log(replacedMouseName);*/
            $.get('/getMouse'/*?mouse='+replacedMouseName*/, mouseObject, function (mouse) {
                currentlyViewedMiceSVG.push(mouse);
                /*currentlyViewedMiceSVG.sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                });*/

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

                // Length
                let mouseLengthSpan = document.createElement('span');
                let mouseLength = mouse.length;
                if (mouseLength !== null) {
                    mouseLength = Math.round(mouseLength);
                    mouseLengthSpan.title = 'Length:\n' + mouse.length + ' mm';
                } else {
                    mouseLength = 'N/A';
                    mouseLengthSpan.title = 'Length is currently not available';
                    titleText += 'Length is currently not available\n';
                }
                mouseLengthSpan.innerText = mouseLength;

                // Width
                let mouseWidthSpan = document.createElement('span');
                let mouseWidth = mouse.width;
                if (mouseWidth !== null) {
                    mouseWidth = Math.round(mouseWidth);
                    mouseWidthSpan.title = 'Width:\n' + mouse.width + ' mm';
                } else {
                    mouseWidth = 'N/A';
                    mouseWidthSpan.title = 'Width is currently not available';
                    titleText += 'Width is currently not available\n';
                }
                mouseWidthSpan.innerText = mouseWidth;

                // Height
                let mouseHeightSpan = document.createElement('span');
                let mouseHeight = mouse.height;
                if (mouseHeight !== null) {
                    mouseHeight = Math.round(mouseHeight);
                    mouseHeightSpan.title = 'Height:\n' + mouse.height + ' mm';
                } else {
                    mouseHeight = 'N/A';
                    mouseHeightSpan.title += 'Height is currently not available';
                    titleText += 'Height is currently not available\n';
                }
                mouseHeightSpan.innerText = mouseHeight;

                // Measurement
                let measurement = document.createElement('span');
                measurement.innerText = ' mm';
                measurement.title = 'Measured in:\nmillimeters';

                newInformationDimensions.append(mouseLengthSpan, ' x ', mouseWidthSpan, ' x ', mouseHeightSpan, measurement);
                newInformationSubDiv.append(newInformationDimensions);

                // Weight
                let newInformationWeight = document.createElement('span');
                newInformationWeight.className = 'shape-information-weight';
                let mouseWeight = mouse.weight;
                if (mouseWeight !== null) {
                    mouseWeight = Math.round(mouseWeight) + 'g'; // mouseWeight = Math.round(mouse.weight) + 'g';
                    newInformationWeight.title = 'Weight:\n' + mouse.weight + ' grams';
                } else {
                    mouseWeight = 'N/A';
                    newInformationWeight.title += 'Weight is currently not available';
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
                // Decreases shape size until it fits on screen.
                if (isOnMobile()) {
                    decreaseShapeSize();
                } else {
                    addDivToolCollideCSS();
                    increaseShapeSizeDesktop();
                    decreaseShapeSizeDesktop();
                }
            }).fail(function (status) {
                if (status.status === 404) {
                    createErrorMessage(brand + ' ' + model + ' does not exists in the database.');
                } else {
                    createErrorMessage('There was an error while retrieving information from the database,\nplease try again later.\n Error: ' + status.status);
                }
            })
        } else {
            createErrorMessage(brand + ' ' + model + ' is already selected.');
        }
    }


    // Method for adding mouse. Function made because same code was used twice below.
    /*function addMouseMethod(inputValue) {
        if (inputValue !== '') {
            let mouseFound = false;
            $('#add-new-shape-list option').each(function () {
                if ($(this).val() == inputValue) {
                    let mouseNameInput = $(this).val().replace(/\s/g, '_').replace(/\+/g, 'rpPlusIcon').replace(/-/g, 'rpMinusIcon');
                    addMouse(mouseNameInput);
                    mouseFound = true;
                    return false;
                }
            });
            if (mouseFound === false) {
                createErrorMessage('Unfortunately, this shape is not in the database');
            }
            $('#add-new-shape-input').val('');
        }
    }*/


    $('#add-new-shape-brand').focusout(function () {
        getMatchingModels();
    });

    // Adds mouse on button press
    $('#add-new-shape-div button').on('click', function () {
        const brand = $('#add-new-shape-brand');
        const model = $('#add-new-shape-model');
        if (brand.val() !== '' || brand.val() !== '') {
            addMouse(brand.val(), model.val());
            brand.val('');
            model.val('');
        }

        /*$('#add-new-shape-list option').each(function () {
            if ($(this).val() === $('#add-new-shape-input').val()) {
                /!*addMouseMethod($(this).val());*!/
                addMouseFromDB($(this).val());
                return false;
            }
        });
        $(this).blur();*/
    });/*.on('keypress', function (key) {
        // If user presses enter
        if (key.which === '13') {
            addMouse($('#add-new-shape-brand').val, $('#add-new-shape-model').val());
            $('#add-new-shape-div input').blur();
        }
    });*/


    // Adds padding on bottom of current mice div to make sure it does not under-/over-lap with shape-settings-grid
    function currentMiceBottomPadding() {
        let shapeSettingsGridHeight = $('#shape-settings-grid').outerHeight() + 12;
        $('#shape-tool-current-mice').css('padding-bottom', shapeSettingsGridHeight + 'px');
    }

    /*---------------------------
        Adding new shapes - end
    ---------------------------*/





    /*-------------------------
        Remove shapes - start
    -------------------------*/

    // Function to remove mouse shape and information
    /*function removeMouse(mouseName) {
        // Removes shape images
        $(`.${mouseName}-class`).remove();

        // Removes information-div
        let fadeOutTime = 180;
        if (isOnMobile()) {
            fadeOutTime = 0;
        }
        $(`#${mouseName}-div`).fadeOut(fadeOutTime, function () {
            $(this).remove();
        });

        // Removes mouse from currentlyViewedMice[]
        currentlyViewedMiceSVG = currentlyViewedMiceSVG.filter(function(Mouse) {
            return Mouse.name !== mouseName;
        });
        if (currentlyViewedMiceSVG.length > 0) {
            updateShapeContainerSize();
        }
    }*/

    function removeMouse(mouseId) {
        // Removes shape images
        $(`.${mouseId}-class`).remove();

        // Removes information-div
        let fadeOutTime = 180;
        if (isOnMobile()) {
            fadeOutTime = 0;
        }
        $(`#shape-div-${mouseId}`).fadeOut(fadeOutTime, function () {
            $(this).remove();
        });

        // Removes mouse from currentlyViewedMice[]
        currentlyViewedMiceSVG = currentlyViewedMiceSVG.filter(function(Mouse) {
            return Mouse.id !== parseInt(mouseId);
        });
        if (currentlyViewedMiceSVG.length > 0) {
            updateShapeContainerSize();
        }
    }


    // Removes mouse on close icon click
    $('body').on('click', '.shape-tool-close', function () {
        /*let closeBtnClass = ''+this.id;
        let mouseName = closeBtnClass.replace('-close', '');
        removeMouse(mouseName);*/
        let closeBtnClass = ''+this.id;
        let mouseId = closeBtnClass.replace('shape-close-', '');
        removeMouse(mouseId);
    });


    // Removes mouse on information-sub-div click on mobile
    $('body').on('click', '.shape-information-sub-div', function () {
        if (isOnMobile() === true) { // media-queries activates when <= 850px
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

    // Highlights close-button & shape information div on hover
    $('body').on('mouseenter', '.shape-tool-close', function () {
        $(this).css({
            'color' : 'red',
            'opacity' : '1'
        });
        let closeBtnClass = ''+this.id;
        let mouseId = closeBtnClass.replace('shape-close-', '');
        $(`#shape-div-${mouseId}`).css('outline', 'var(--themeHoverColor) solid 3px');
    }).on('mouseleave', '.shape-tool-close', function () {
        $(this).css({
            'color' : 'var(--themeReverseColor)',
            'opacity' : '0.4'
        });
        let closeBtnClass = ''+this.id;
        let mouseId = closeBtnClass.replace('shape-close-', '');
        $(`#shape-div-${mouseId}`).css('outline', 'transparent solid 0');
        $(`.${mouseId}-class`).css('filter', 'none');
    });


    // Shows exclamation-mark information on hover
    $('body').on('mouseenter', '.view-missing-information', function () {
        $(this).css({
            'color' : 'var(--primaryColor)',
            'opacity' : '1'
        });
        let thisId = ''+this.id;
        let viewMissingHoverTextId = thisId.replace(/information/g, 'hover-text');
        $('#'+viewMissingHoverTextId).css('display', 'inline-block');
        setTimeout(function () {
            $('#'+viewMissingHoverTextId).css('opacity', '1');
        }, 0);
    }).on('mouseleave', '.view-missing-information', function () {
        $(this).css({
            'color': 'var(--themeReverseColor)',
            'opacity': '0.3'
        });
        let thisId = '' + this.id;
        let viewMissingHoverTextId = thisId.replace(/information/g, 'hover-text');
        $('#' + viewMissingHoverTextId).css({
            'display' : 'none',
            'opacity' : '0'
        });
    });


    // Shows information on exclamation-mark focus (duplicate due to .bind not working above).
    $('body').on('focusin', '.view-missing-information', function () {
        $(this).css({
            'color' : 'var(--primaryColor)',
            'opacity' : '1'
        });
        let thisId = ''+this.id;
        let viewMissingHoverTextId = thisId.replace(/information/g, 'hover-text');
        $('#'+viewMissingHoverTextId).css('display', 'inline-block');
        setTimeout(function () {
            $('#'+viewMissingHoverTextId).css('opacity', '1');
        }, 0);
    }).on('focusout', '.view-missing-information', function () {
        $(this).css({
            'color': 'var(--themeReverseColor)',
            'opacity': '0.3'
        });
        let thisId = ''+this.id;
        let viewMissingHoverTextId = thisId.replace(/information/g, 'hover-text');
        $('#' + viewMissingHoverTextId).css({
            'display' : 'none',
            'opacity' : '0'
        });
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
            console.log('+++');
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
            console.log('---');
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

    setTheme();

    // Only on 'compare-shapes' page
    if ($('body').is('#compare-shapes')) {
        // Default shapes
        /*addMouse('Zowie_EC1rpMinusIconC');
        addMouse('Zowie_FK2rpMinusIconC');*/
        addMouse('Zowie', 'FK1+-C');
        addMouse('Zowie', 'EC1-C');

        setAlignment();

        currentMiceBottomPadding();

        getMatchingModels();

        // Decreases shape size until it fits on screen.
        if (isOnMobile()) {
            decreaseShapeSize();
        } else {
            addDivToolCollideCSS();
            increaseShapeSizeDesktop();
            decreaseShapeSizeDesktop();
        }
    }

/*------------------------------
  Call functions on load - end
------------------------------*/
});