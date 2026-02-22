document.addEventListener('DOMContentLoaded', () => {
    // Lightbox for gallery images and active carousel photo
    const zoomableImages = document.querySelectorAll('.gallery-item img, .carousel-slide');

    if (zoomableImages.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';

        const lightboxImg = document.createElement('img');

        const lightboxClose = document.createElement('div');
        lightboxClose.className = 'lightbox-close';
        lightboxClose.innerHTML = '&times;';

        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(lightboxClose);
        document.body.appendChild(lightbox);

        zoomableImages.forEach((item) => {
            item.addEventListener('click', () => {
                lightboxImg.src = item.currentSrc || item.src;
                lightbox.classList.add('active');
            });
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.classList.remove('active');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
            }
        });
    }

    // Home page carousel (one photo visible at a time)
    const carousel = document.querySelector('#worksCarousel');
    const dotsWrap = document.querySelector('#worksCarouselDots');

    if (carousel) {
        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll('.carousel-dot')) : [];

        let currentIndex = 0;
        let timer = null;
        const delayMs = 3500;

        const goTo = (index) => {
            if (slides.length === 0) return;
            currentIndex = (index + slides.length) % slides.length;

            slides.forEach((slide, i) => {
                slide.classList.toggle('is-active', i === currentIndex);
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('is-active', i === currentIndex);
            });
        };

        const next = () => goTo(currentIndex + 1);
        const prev = () => goTo(currentIndex - 1);

        const stopAuto = () => {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        };

        const startAuto = () => {
            stopAuto();
            timer = setInterval(next, delayMs);
        };

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prev();
                startAuto();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                next();
                startAuto();
            });
        }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                goTo(i);
                startAuto();
            });
        });

        carousel.addEventListener('mouseenter', stopAuto);
        carousel.addEventListener('mouseleave', startAuto);
        carousel.addEventListener('touchstart', stopAuto, { passive: true });
        carousel.addEventListener('touchend', startAuto);

        goTo(0);
        startAuto();
    }

    console.log('Leonamai.lt puslapis užkrautas.');
});
