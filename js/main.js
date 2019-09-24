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
    window.quoteIndex = -1;
    function showNextQuote() {
      ++quoteIndex;
      quotes.eq(quoteIndex % quotes.length)
        .fadeIn(2000)
        .delay(delay)
        .fadeOut(2000, showNextQuote);
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



//generates an intwixt simulation using a JSON graph
if($("#viewport1").length) {

  //an instance of an Intwixt call graph
  var graph_data = {
    "nodes": {
      "activity_1": {
        "title": "On Slack File Upload",
        "star": "Slack.1",
        "definition": "trigger-file_event",
        "verb": "post",
        "p": {
          "x": 0.286,
          "y": 0.251
        },
        "trigger": true,
        "selected": true
      },
      "activity_3": {
        "title": "For Each File",
        "star": "Map.1",
        "definition": "map",
        "verb": "post",
        "p": {
          "x": 0.193,
          "y": 0.379
        },
        "iterate": true
      },
      "activity_4": {
        "title": "Read Slack File",
        "star": "Slack.1",
        "definition": "activity-get_file",
        "verb": "post",
        "p": {
          "x": 0.708,
          "y": 0.756
        },
        "async": true
      },
      "activity_5": {
        "title": "Save File to Box",
        "star": "Box.1",
        "definition": "fileUpload",
        "verb": "post",
        "p": {
          "x": 0.826,
          "y": 0.63
        },
        "async": true
      },
      "activity_2": {
        "title": "Ask to Start",
        "star": "Slack.1",
        "definition": "activity-respond_with_ask_choice_with_blockkit",
        "verb": "post",
        "p": {
          "x": 0.174,
          "y": 0.683
        },
        "async": true,
        "long_running": true,
        "error": null
      },
      "activity_9": {
        "title": "Get User Profile",
        "star": "Slack.1",
        "definition": "activity-get_user_info",
        "verb": "post",
        "p": {
          "x": 0.519,
          "y": 0.838
        },
        "async": true,
        "error": null
      },
      "activity_14": {
        "title": "Send 'OK' Message",
        "star": "Slack.1",
        "definition": "activity-send_message_with_blockkit",
        "verb": "post",
        "p": {
          "x": 0.295,
          "y": 0.817
        },
        "async": true,
        "error": null
      },
      "activity_7": {
        "title": "Send 'Cancel' Message",
        "star": "Slack.1",
        "definition": "activity-send_message_with_blockkit",
        "verb": "post",
        "p": {
          "x": 0.365,
          "y": 0.65
        },
        "credential": "intwixt-54829",
        "async": true,
        "error": null
      },
      "activity_6": {
        "title": "Start Approval Workflow",
        "star": ".intwixt-1-40050.1",
        "definition": "activity_1",
        "verb": "post",
        "p": {
          "x": 0.906,
          "y": 0.498
        },
        "icon_font": {
          "class": "fa-check",
          "code": "",
          "family": "FontAwesome"
        }
      },
      "activity_8": {
        "title": "Check if Resubmission",
        "star": ".intwixt-1-40122.1",
        "definition": "activity_3",
        "verb": "post",
        "p": {
          "x": 0.139,
          "y": 0.527
        },
        "icon_font": {
          "class": "fa-upload",
          "code": "",
          "family": "FontAwesome"
        }
      }
    },
    "edges": {
      "activity_1": {
        "activity_3": {
          "length": 1
        }
      },
      "activity_9": {
        "activity_4": {
          "length": 1
        }
      },
      "activity_4": {
        "activity_5": {
          "length": 1
        }
      },
      "activity_8": {
        "activity_2": {
          "length": 1,
          "error": null,
          "condition": true
        }
      },
      "activity_14": {
        "activity_9": {
          "length": 1,
          "error": null,
          "condition": null
        }
      },
      "activity_2": {
        "activity_14": {
          "length": 1,
          "error": null,
          "condition": true
        },
        "activity_7": {
          "length": 1,
          "error": null,
          "condition": true
        }
      },
      "activity_5": {
        "activity_6": {
          "length": 1
        }
      },
      "activity_3": {
        "activity_8": {
          "length": 1
        }
      }
    }
  };

  //initialize the canvas using the graph data
  var params = {animate: true, size: 80, fps: 20, line_width: 5, annotate: true};
  var target = "#viewport1";
  var class_for_width = ".fh5co-hero-smartphone";
  var class_for_height = ".fh5co-hero-smartphone";
  var renderer = drawStaticConstellation(graph_data, params, target, class_for_width, class_for_height);

  function traverse_graph(start, delay, next) {
    var target = next || start;
    renderer.beep(target);
    next = graph_data.edges[target];
    if (next) {
      var kids = Object.keys(next);
      var len = kids.length;
      if (len === 1) {
        setTimeout(function () {
          traverse_graph(start, delay, kids[0]);
        }, delay);
      } else {
        var amt = Math.random() * len;
        var index = parseInt(amt);
        setTimeout(function () {
          traverse_graph(start, delay, kids[index]);
        }, delay);
      }
    } else {
      //cycle again
      setTimeout(function () {
        traverse_graph(start, delay);
      }, delay * 2);
    }

  }
  //walk the graph to simulate the flow of information
  traverse_graph("activity_1", 4000);
}


