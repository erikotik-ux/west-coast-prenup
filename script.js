/* West Coast Prenup — minimal progressive enhancement */
(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     Marquee: clone the slide set once so the loop can restart seamlessly,
     and derive the exact scroll distance from the rendered geometry.
     --------------------------------------------------------------------- */
  var track = document.querySelector('.marquee__track');

  if (track) {
    var slides = Array.prototype.slice.call(track.children);

    slides.forEach(function (slide) {
      var clone = slide.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('img').forEach(function (img) { img.alt = ''; });
      track.appendChild(clone);
    });

    var setShift = function () {
      var first = slides[0];
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      var shift = slides.length * (first.getBoundingClientRect().width + gap);
      track.style.setProperty('--marquee-shift', shift + 'px');
    };

    setShift();
    window.addEventListener('resize', setShift);
  }

  /* ---------------------------------------------------------------------
     Mobile navigation
     --------------------------------------------------------------------- */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  if (header && toggle && nav) {
    var setOpen = function (open) {
      header.classList.toggle('is-nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });

    window.matchMedia('(min-width: 761px)').addEventListener('change', function (event) {
      if (event.matches) setOpen(false);
    });
  }
})();
