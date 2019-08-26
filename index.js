let moveToNextScreenGlobalEvent = null;

(function () {
    initializeTouchEvents();

    let currentShowingScreen = 0;

    const storedStart = {
        pageY: null
    };

    function initializeTouchEvents() {
        var el = document.getElementsByClassName("parallax")[0];
        el.addEventListener("touchstart", handleStart, false);
        el.addEventListener("touchend", handleEnd, false);
    }

    function handleEnd(event) {
        const range = storedStart.pageY - event.changedTouches[event.changedTouches.length - 1].pageY;

        if (range > 0) {
            moveToNextScreen();
        } else {
            moveToPreviousScreen();
        }
    }

    function handleStart(event) {
        storedStart.pageY = event.touches[0].pageY;
    }

    function moveToNextScreen() {
        if (currentShowingScreen < 2) {
            currentShowingScreen++;

            scrollToElement(currentShowingScreen)
        }
    }

    function moveToPreviousScreen() {
        if (currentShowingScreen > 0) {
            currentShowingScreen--;

            scrollToElement(currentShowingScreen);
        }
    }

    function scrollToElement(index) {
        const elements = document.getElementsByClassName("parallax__group");

        let totalOffset = 0;

        for (let i = 0; i < index; i++) {
            totalOffset += elements[i].scrollHeight
        }

        document.getElementsByClassName("parallax")[0].scrollTo({ top: totalOffset, behavior: "smooth" });

        updateActiveSlider(index);
        toggleScrollButtonIfNeed(index);
    }

    function updateActiveSlider(index) {
        const elements = document.getElementsByClassName('slider-element');
        
        const activeClass = 'slider-element__active';

        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove(activeClass);
        }

        elements[index].classList.add(activeClass);
    }

    function toggleScrollButtonIfNeed(index) {
        const hideClass = 'page-footer__hidden'
        const visibleClass = 'page-footer__visible'
        const element = document.getElementsByClassName('page-footer')[0];
        if (index >= 2) {
            element.classList.remove(visibleClass)
            element.classList.add(hideClass)
        } else {
            element.classList.add(visibleClass)
            element.classList.remove(hideClass)
        }
    }

    moveToNextScreenGlobalEvent = moveToNextScreen;
})();