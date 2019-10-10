window.onload = function () {

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
    var delay = 10000;
    var quotes = $(".quotes li");
    var selectors = $(".quotes .selector");
    selectors.click(function() {
      showNextQuote(selectors.index(this));
    });
    var counter = 1;
    var quoteIndex = -1;
    var lastIndex = -1;
    function showNextQuote(idx) {
      counter++;
      var local = counter;
      if(!isNaN(lastIndex)) {
        quotes.eq(lastIndex).hide();
      }
      if(!isNaN(idx)) {
        quoteIndex = idx;
        quotes
          .eq(quoteIndex % quotes.length)
          .fadeIn(2000)
          .delay(delay)
          .fadeOut(2000, function () {
            if (local === counter) {
              showNextQuote();
            }
          });
      } else {
        quoteIndex = lastIndex + 1;
        quotes
          .eq(quoteIndex % quotes.length)
          .fadeIn(2000)
          .delay(delay)
          .fadeOut(2000, function () {
            if (local === counter) {
              showNextQuote();
            }
          });
      }
      lastIndex = quoteIndex % quotes.length;
      selectors
        .removeClass("selected")
        .eq(lastIndex)
        .addClass("selected");
    }
    showNextQuote();
  })();

  //initialize the 'wow' animation set
  new WOW().init();

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

};
