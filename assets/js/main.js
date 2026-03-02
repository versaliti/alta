(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
 * Mobile nav toggle (melhorado)
 */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  const navBackdrop = document.querySelector('.nav-backdrop');

  function mobileNavToogle(forceClose = false) {
    const body = document.querySelector('body');
    const isOpen = body.classList.contains('mobile-nav-active');

    if (forceClose && !isOpen) return;

    body.classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');

    const nowOpen = body.classList.contains('mobile-nav-active');
    mobileNavToggleBtn.setAttribute('aria-expanded', nowOpen ? 'true' : 'false');
    mobileNavToggleBtn.setAttribute('aria-label', nowOpen ? 'Fechar menu' : 'Abrir menu');
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', () => mobileNavToogle());
  }

  /**
   * Fecha ao clicar no backdrop
   */
  if (navBackdrop) {
    navBackdrop.addEventListener('click', () => mobileNavToogle(true));
  }

  /**
   * Fecha com ESC
   */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.querySelector('body').classList.contains('mobile-nav-active')) {
      mobileNavToogle(true);
    }
  });

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle(true);
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns (mantém o seu funcionamento)
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button + Floating CTA
   */
  let scrollTop = document.querySelector('.scroll-top');
  const floatingCta = document.querySelector('.floating-cta');

  function toggleScrollTop() {
    const isActive = window.scrollY > -1;

    if (scrollTop) {
      isActive
        ? scrollTop.classList.add('active')
        : scrollTop.classList.remove('active');
    }

    if (floatingCta) {
      isActive
        ? floatingCta.classList.add('active')
        : floatingCta.classList.remove('active');
    }
  }

  // proteção para não dar erro se scroll-top não existir
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

})();