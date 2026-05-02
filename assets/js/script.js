/* ============================================
   PORTFOLIO SCRIPTS - Marvin L Francisco
   Animations, Interactions & UI Logic
   ============================================ */

$(document).ready(function () {

    // ======================== PRELOADER ========================
    $(window).on('load', function () {
        setTimeout(function () {
            $('#preloader').addClass('loaded');
        }, 800);
    });

    // Fallback: Remove preloader after 3 seconds max
    setTimeout(function () {
        $('#preloader').addClass('loaded');
    }, 3000);

    // ======================== AOS INITIALIZATION ========================
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        disable: 'mobile'
    });

    // ======================== NAVBAR SCROLL EFFECT ========================
    $(window).on('scroll', function () {
        var scrollPos = $(this).scrollTop();

        // Sticky navbar background
        if (scrollPos > 50) {
            $('#mainNav').addClass('scrolled');
        } else {
            $('#mainNav').removeClass('scrolled');
        }

        // Scroll to top button visibility
        if (scrollPos > 400) {
            $('#scrollToTop').addClass('visible');
        } else {
            $('#scrollToTop').removeClass('visible');
        }

        // Active nav link highlighting
        updateActiveNav();
    });

    // ======================== ACTIVE NAV LINK ========================
    function updateActiveNav() {
        var scrollPos = $(window).scrollTop() + 100;

        $('section[id]').each(function () {
            var sectionTop = $(this).offset().top;
            var sectionBottom = sectionTop + $(this).outerHeight();
            var sectionId = $(this).attr('id');

            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                $('.nav-link').removeClass('active');
                $('.nav-link[href="#' + sectionId + '"]').addClass('active');
            }
        });
    }

    // ======================== SMOOTH SCROLL FOR NAV LINKS ========================
    $('.nav-link, a[href^="#"]').on('click', function (e) {
        var target = $(this).attr('href');
        if (target && target.startsWith('#') && target.length > 1) {
            e.preventDefault();
            var $target = $(target);
            if ($target.length) {
                $('html, body').animate({
                    scrollTop: $target.offset().top - 70
                }, 600, 'swing');

                // Close mobile navbar
                $('.navbar-collapse').collapse('hide');
            }
        }
    });

    // ======================== SCROLL TO TOP ========================
    $('#scrollToTop').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 600, 'swing');
    });

    // ======================== TYPING ANIMATION ========================
    var typingTexts = [
        'Laravel Developer',
        'ASP.NET C#',
        'Full Stack Engineer',
        'Database Architect',
        'API Integration',
        'Enterprise Systems Builder'
    ];

    var textIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typingSpeed = 80;

    function typeText() {
        var currentText = typingTexts[textIndex];
        var $typingEl = $('#typing-text');

        if (isDeleting) {
            $typingEl.text(currentText.substring(0, charIndex - 1));
            charIndex--;
            typingSpeed = 40;
        } else {
            $typingEl.text(currentText.substring(0, charIndex + 1));
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end of word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            typingSpeed = 300;
        }

        setTimeout(typeText, typingSpeed);
    }

    // Start typing animation
    typeText();

    // ======================== CONTACT FORM ========================
    $('#contactForm').on('submit', function (e) {
        e.preventDefault();

        var $btn = $(this).find('button[type="submit"]');
        var originalText = $btn.html();

        // Show loading state
        $btn.html('<i class="bi bi-check-circle me-2"></i>Message Sent!');
        $btn.prop('disabled', true);
        $btn.css('opacity', '0.8');

        // Reset after 3 seconds
        setTimeout(function () {
            $btn.html(originalText);
            $btn.prop('disabled', false);
            $btn.css('opacity', '1');
            $('#contactForm')[0].reset();
        }, 3000);
    });

    // ======================== NAVBAR LINK HOVER EFFECT ========================
    $('.nav-link').on('mouseenter', function () {
        $(this).css('transform', 'translateY(-1px)');
    }).on('mouseleave', function () {
        $(this).css('transform', 'translateY(0)');
    });

    // ======================== PROJECT CARD TILT EFFECT ========================
    $('.project-card').on('mouseenter', function () {
        $(this).find('.carousel-control-prev, .carousel-control-next').css('opacity', '1');
    }).on('mouseleave', function () {
        $(this).find('.carousel-control-prev, .carousel-control-next').css('opacity', '0');
    });

    // ======================== COUNTER ANIMATION ========================
    var counted = false;
    $(window).on('scroll', function () {
        if (!counted && isInViewport($('.stat-item').first())) {
            counted = true;
            animateCounters();
        }
    });

    function animateCounters() {
        $('.stat-item h3').each(function () {
            var $this = $(this);
            var text = $this.text();
            var target = parseInt(text);

            if (!isNaN(target)) {
                var suffix = text.replace(/[0-9]/g, '');
                $({ count: 0 }).animate({ count: target }, {
                    duration: 1500,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.floor(this.count) + suffix);
                    },
                    complete: function () {
                        $this.text(target + suffix);
                    }
                });
            }
        });
    }

    function isInViewport($el) {
        if (!$el.length) return false;
        var elementTop = $el.offset().top;
        var elementBottom = elementTop + $el.outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }

    // ======================== INITIALIZE ========================
    updateActiveNav();
});
