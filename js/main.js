;(function () {

  'use strict';

  var owlCarousel = function () {

    new WOW().init();

    $('.owl-carousel').owlCarousel({
      items: 4,
      loop: true,
      margin: 170,
      center: true,
      smartSpeed: 900,
      nav: true,
      navText: [
        "<i class='fa carousel-left-arrow fa-chevron-left'></i>",
        "<i class='fa carousel-right-arrow fa-chevron-right'></i>"
      ], responsiveClass: true,
      responsive: {
        0: {
          items: 1,
          nav: true
        },
        600: {
          items: 1,
          nav: true,
          margin: 120
        },
        1000: {
          items: 3,
          nav: true,
          loop: true,
          autoplay: true,
          autoplayTimeout: 1500,
          navText: [
            "<i class='fa carousel-left-arrow fa-chevron-left'></i>",
            "<i class='fa carousel-right-arrow fa-chevron-right'></i>"
          ]
        }
      }
    });

  };

  //scroll a section into view (by ID)
  $.fn.goTo = function (bm) {
    $('html, body').animate({
      scrollTop: $(this).offset().top + 'px'
    }, 'slow');
    setTimeout(function () {
      location.hash = bm
    }, 500);
    return this; // for chaining...
  };

  $(function () {
    owlCarousel();
  });

}());

//TYPE-AHEAD (simulates typing on a keyboard, one key at a time (includes a blinking cursor))
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};
TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];
  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
  var that = this;
  var delta = 200 - Math.random() * 100;
  if (this.isDeleting) {
    delta /= 3;
  }
  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }
  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {

  //HERO TYPE-AHEAD (for small form-factors/mobile)
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }

  //HERO QUOTES (for large form-factors/desktop)
  (function() {
    var delay = 6000;
    var quotes = $(".quotes li");
    window.quoteIndex = -1;
    function showNextQuote() {
      ++quoteIndex;
      quotes.eq(quoteIndex % quotes.length)
        .fadeIn(1000)
        .delay(delay)
        .fadeOut(1000, showNextQuote);
    }
    showNextQuote();
  })();
};
    