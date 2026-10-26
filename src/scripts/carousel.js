(() => {
    const carousel = document.querySelector('.image-carousel');
    const track = carousel.querySelector('.carousel-track');
    const originalSlides = [...track.querySelectorAll('.carousel-slide')];
    const viewport = carousel.querySelector('.carousel-viewport');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    const nextButton = carousel.querySelector('.carousel-button--next');
    const previousButton = carousel.querySelector('.carousel-button--previous');
    const totalSlides = originalSlides.length;
    const cloneCount = 2;
    const autoAdvanceInterval = Number(carousel.dataset.autoplayInterval) || 4000;
    let currentSlide = 0;
    let trackPosition = cloneCount;
    let autoAdvance;

    // Clone edge slides so the track can move continuously in either direction.
    originalSlides.slice(-cloneCount).forEach((slide) => {
        track.prepend(slide.cloneNode(true));
    });
    originalSlides.slice(0, cloneCount).forEach((slide) => {
        track.append(slide.cloneNode(true));
    });
    const slides = [...track.querySelectorAll('.carousel-slide')];
    const dots = originalSlides.map((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', `Show image ${index + 1}`);
        dot.addEventListener('click', () => {
            currentSlide = index;
            trackPosition = currentSlide + cloneCount;
            updateCarousel();
            restartAutoAdvance();
        });
        dotsContainer.appendChild(dot);
        return dot;
    });

    const updateCarousel = (animate = true) => {
        track.style.transition = animate ? 'transform 0.6s ease' : 'none';
        const slideWidth = slides[0].getBoundingClientRect().width;
        // Center the active slide within the viewport while accounting for clones.
        const offset = (viewport.getBoundingClientRect().width - slideWidth) / 2
            - trackPosition * slideWidth;
        track.style.transform = `translateX(${offset}px)`;

        slides.forEach((slide, index) => {
            const isActive = index === trackPosition;
            slide.classList.toggle('carousel-slide--active', isActive);
            slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('is-active', index === currentSlide);
            dot.setAttribute('aria-current', index === currentSlide ? 'true' : 'false');
        });
    };

    const showNext = () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        trackPosition++;
        updateCarousel();
    };

    const showPrevious = () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        trackPosition--;
        updateCarousel();
    };

    const stopAutoAdvance = () => {
        window.clearInterval(autoAdvance);
    };

    const restartAutoAdvance = () => {
        stopAutoAdvance();
        autoAdvance = window.setInterval(showNext, autoAdvanceInterval);
    };

    nextButton.addEventListener('click', () => {
        showNext();
        restartAutoAdvance();
    });
    previousButton.addEventListener('click', () => {
        showPrevious();
        restartAutoAdvance();
    });
    carousel.addEventListener('mouseenter', stopAutoAdvance);
    carousel.addEventListener('mouseleave', restartAutoAdvance);

    updateCarousel();
    restartAutoAdvance();

    track.addEventListener('transitionend', () => {
        // Jump from a clone back to its matching real slide without animation.
        if (trackPosition === totalSlides + cloneCount) {
            trackPosition = cloneCount;
            updateCarousel(false);
        } else if (trackPosition === 1) {
            trackPosition = totalSlides + cloneCount - 1;
            updateCarousel(false);
        }
    });
    window.addEventListener('resize', () => updateCarousel(false));
})();