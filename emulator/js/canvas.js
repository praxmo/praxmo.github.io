//cache icons for repeated use by the canvas rendering engine
if (typeof(window.that_nodeImages) === "undefined") {
  window.that_nodeImages = {};
}

//constants
var API_SERVER = "https://my.intwixt.com";
var CACHE_BUST = "https://my.intwixt.com/static1";

/**
 * Renders a JSON graph using the HTML canvas element
 *
 * @param data {object} graph data to render
 * @param data.nodes {object} graph data to render
 * @param data.edges {object} graph data to render
 * @param params {object}
 * @param params.animate {boolean} true
 * @param params.size {number} 30
 * @param params.fps {number} 1100
 * @param params.line_width {number} 3
 * @param [params.error_intensity] {number} .5
 * @param [params.stroke_color] {string} HEX
 * @param [params.fill_color] {string} HEX
 * @param [params.annotate] {boolean} render the label
 * @param [params.annotation_color] {string} hex
 * @param target {string} a CSS selector to locate the canvas to draw upon such as `#viewport1`
 * @param class_for_width {string} a CSS selector to locate an element that defines the width for the canvas
 * @param class_for_height {string} a CSS selector to locate an element that defines the width for the canvas
 */
function drawStaticConstellation(data, params, target, class_for_width, class_for_height) {

  var default_image_size = 32;

  function Renderer(elm, class_for_width, class_for_height, graph) {
    elm = $(elm);
    var beeped_node;
    var minimum_anotation_width = 600; //only render labels on a larger canvas...too cluttered otherwise
    var base_color = "#a0b0c0";
    var fill_color = "#a0b0c0";
    var stroke_color = "#ffffff";
    var highlight_color = "#fafbfc";
    var highlight_fill = "#03A9F4";
    var canvas_width = 1;
    var canvas_height = 1;
    var animation_interval;
    var annotation_color = "#6a6b6c";
    var ifps = 85;
    var FPS_FAST = params.fps || 75; //redraw every 20ms; this can be reset by the user during configuration
    var FPS_SLOW = 150; //redraw every 500ms when the constellation isn't being actively modified by the user or engine
    var fps = FPS_FAST;
    var trigger_multiplier = 1.75; //make the star for a triggering activity larger than normal
    var global_alpha = 1;
    var pct_pulse = 0;             //will increment to 1 and then start over at 0

    var that = {

      init: function () {
        $(window).resize(that.resize);
        window.setInterval(function () {
          that.resize();
        }, parseInt(ifps * (1 + Math.random()), 10));
        that.start();
        that.resize();
      },

      stop: function (b) {
        window.clearInterval(animation_interval);
      },

      start: function (b) {
        if (params.animate !== false) {
          animation_interval = window.setInterval(function () {
            pct_pulse -= .01 * (10 * (fps / FPS_SLOW));
            if (pct_pulse <= 0)
              pct_pulse = 1;
            that.redraw();
          }, parseInt(fps * (1 + Math.random()), 10));
        } else {
          that.redraw();
        }
      },

      isSelected: function (node) {
        return false;
      },

      beep: function (node_or_name) {
        beeped_node = node_or_name;
      },

      unbeep: function () {
        beeped_node = null;
      },

      isBeeping: function (node) {
        return beeped_node && node === beeped_node;
      },

      renderEdge: function (edge, pt1, pt2) {
        var ctx = that.ctx;
        var baseStrokeColor = params.stroke_color || stroke_color;
        var def_line_width = params.line_width || 3;
        ctx.lineWidth = def_line_width;

        // edge: {source:Node, target:Node, length:#, data:{}}
        // pt1:  {x:#, y:#}  source position in screen coords
        // pt2:  {x:#, y:#}  target position in screen coords
        ctx.globalAlpha = 1;
        ctx.lineWidth = def_line_width;
        ctx.strokeStyle = base_color;
        if (edge.data && edge.data.condition && ctx.setLineDash) {
          ctx.setLineDash([2, 2]);
        } else if (ctx.setLineDash) {
          ctx.setLineDash([]);
        }

        //hide invocable lines (flows that reference other flows); only show the message moving, not the line
        ctx.beginPath();
        ctx.moveTo(pt1.x, pt1.y);
        ctx.lineTo(pt2.x, pt2.y);
        ctx.save();
        if (!(edge.data && edge.data.invocable)) {
          ctx.stroke();
        }
        ctx.closePath();

        var Point = {X: pt1.x, Y: pt1.y};
        var Target = {X: pt2.x, Y: pt2.y};
        var Vector_Pulse = {X: pct_pulse * (Target.X - Point.X), Y: pct_pulse * (Target.Y - Point.Y)};
        ctx.fillStyle = "#def";
        ctx.strokeStyle = "#def";
        ctx.globalAlpha = 0.175;
        ctx.arc(Target.X - Vector_Pulse.X, Target.Y - Vector_Pulse.Y, Math.max(2, params.size / 14), 0, Math.PI * 2, false);
        ctx.fill();
      },

      renderNode: function (node, pt) {
        // node: {mass:#, p:{x,y}, name:"", data:{}}
        // pt:   {x:#, y:#}  node position in screen coords
        var ctx = that.ctx;
        var baseFillColor = params.fill_color || fill_color;
        var baseStrokeColor = params.stroke_color || stroke_color;
        ctx.lineWidth = params.line_width || 3;
        var X, Y;
        X = pt.x;
        Y = pt.y;
        ctx.fillStyle = baseFillColor;
        ctx.strokeStyle = baseStrokeColor;
        ctx.globalAlpha = 1;
        ctx.lineWidth = 1.25;
        var _size = params.size;
        //make triggers twice as large..in a world of size, it moves them into the foreground on the z-index
        if (node.data.trigger) {
          _size = _size * trigger_multiplier;
        } else if (node.data.star === "Error.1" || node.data.error) {
          _size = _size / 2;
          if (node.data.star === "Error.1") {
            ctx.globalAlpha = params.error_intensity || .5;
          }
        }
        var circle_size = _size + 6;
        ctx.setLineDash([]);

        //pulse the size of the circle using the same animation pulse used to twinkle the icon's opacity
        if (that.isBeeping(node.data.label) && node.data.alpha) {
          circle_size = circle_size * (1 + (node.data.alpha ? node.data.alpha - .6 : 0));
          ctx.strokeStyle = highlight_fill;
          ctx.fillStyle = highlight_fill;
        }

        function handle_alpha() {
          if (node.data) {
            var alpha;
            var amt = .025;
            var min = .6;
            var max = 1;
            var delay = 80;
            var _now = new Date().valueOf();
            var _last = node.data.tick || _now;
            if (_now - _last > delay) {
              if (node.data.ticking) {
                alpha = node.data.alpha || Math.random();
                alpha += amt;
                if (alpha >= max) {
                  alpha = max;
                  node.data.ticking = false;
                }
              } else {
                alpha = node.data.alpha || Math.random();
                alpha -= amt;
                if (alpha <= min) {
                  alpha = min;
                  node.data.ticking = true;
                }
              }
              node.data.tick = _now;
            } else {
              if (!node.data.tick)
                node.data.tick = _now;
              alpha = node.data.alpha;
            }
            ctx.globalAlpha = 1;
            node.data.alpha = alpha;
          } else {
            ctx.globalAlpha = global_alpha;
          }
        }

        ctx.beginPath();
        ctx.arc(X, Y, circle_size / 2, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        function dtr(degrees) {
          return degrees * (Math.PI / 180);
        }

        if (node.data.signal) {
          ctx.closePath();
          ctx.beginPath();
          ctx.arc(X, Y, circle_size / 2, dtr(90), dtr(270), !node.data.trigger);
          ctx.fillStyle = '#f0f1f2';
          ctx.fill();
          ctx.stroke();
        }

        var text_left, text_top;
        if (node.data.icon_font) {
          var divide_by = node.data.icon_font.family === "'Material Icons'" ? 2 : 3;
          var container_size = (node.data.trigger && _size || (params.size * 1.4));
          var fontSize = container_size / Math.sqrt(2) - (node.data.icon_font.family === "'Material Icons'" ? 4 : 20);
          if (node.data.error) {
            fontSize = fontSize / 2;
          }
          fontSize = parseInt(fontSize);
          ctx.textAlign = "center";
          ctx.fillStyle = params.highlight_color || highlight_color;
          text_left = X;
          text_top = Y + fontSize / divide_by;
          ctx.font = fontSize + "px " + (node.data.icon_font.family || "FontAwesome"); //flows use the fa v4 font set
          ctx.fillText(node.data.icon_font.code, text_left, text_top);
        }

        //render the labels (suppress when smaller form factor)
        if (params.annotate && that.canvas.width > minimum_anotation_width) {
          ctx.beginPath();
          var label = node.data.title || "[ untitled ]";
          ctx.font = "300 20px 'Lato', sans-serif ";
          ctx.textAlign = "center";
          ctx.fillStyle = params.annotation_color || annotation_color;
          text_left = X;
          text_top = Y - (_size / 2) - 30;
          ctx.fillText(label, text_left, text_top);
          ctx.stroke();
        }

        //render image
        if (node.data && node.data.image && !node.data.icon_font) {
          var src = node.data.image.src;
          if (src in that_nodeImages) {
            if (that_nodeImages[src].loaded) {
              handle_alpha();
              //fit the square image in a round container
              var imgSize = _size / Math.sqrt(2) + (_size > 40 ? -2 : 0);
              ctx.drawImage(
                that_nodeImages[src].object,
                X - imgSize / 2,
                Y - imgSize / 2,
                imgSize, imgSize
              );
              ctx.restore();
            }
          } else {
            that_nodeImages[src] = {};
            var img = new Image();
            that_nodeImages[src].object = img;
            img.addEventListener("load", function () {
              that_nodeImages[src].loaded = true;
              that.redraw();
            });
            img.src = src;
          }
        } else {
          handle_alpha();
        }
        ctx.restore();
      },

      redraw: function () {
        var height_pad = .9;
        var width_pad = .9;
        var ctx = that.ctx;
        ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);
        ctx.beginPath();
        //draw the edges
        _(graph.edges).each(function (edges, p1) {
          _(edges).each(function (edge, p2) {
            //reducing height and width helps with bleed over with labels
            var pt1 = {x: data.nodes[p1].x * canvas_width * width_pad, y: data.nodes[p1].y * canvas_height * height_pad};
            var pt2 = {x: data.nodes[p2].x * canvas_width * width_pad, y: data.nodes[p2].y * canvas_height * height_pad};
            that.renderEdge({data: edge}, pt1, pt2);
          });
        });
        //draw the nodes
        _(graph.nodes).each(function (node, node_name) {
          var mod = .1;
          var x = x < .5 ? x + mod : (x > .5 ? x - mod : x);
          //reducing height and width helps with bleed over with labels
          var pt1 = {x: node.x * canvas_width * width_pad, y: node.y * canvas_height * height_pad};
          that.renderNode({data: node}, pt1);
        });
      },

      resize: function () {
        var w = $(class_for_width).width() * 2,
          h = (isNaN(class_for_height) ?
            $(class_for_height === "window" ? window : class_for_height).height() : class_for_height) * 2;
        if (w !== canvas_width || h !== canvas_height) {
          that.canvas.width = canvas_width = w;
          that.canvas.height = canvas_height = h;
          that.redraw()
        }
      },
      canvas: $(elm).get(0),
      ctx: null
    };
    that.ctx = that.canvas.getContext("2d");
    return that
  }

  //MASSAGE GRAPH DATA (add image paths and resolve points); LOAD GRAPH DATA
  if (!params.size)
    params.size = default_image_size;

  _(data.nodes).each(function (node, name) {
    if (!node.p) {
      node.p = {
        x: Math.random(),
        y: Math.random()
      };
    }
    if (node.p.x < 0) {
      node.p.x = Math.random();
    } else if (node.p.x >= 1) {
      node.p.x = Math.random();
    }
    if (node.p.y < 0) {
      node.p.y = Math.random();
    } else if (node.p.y >= 1) {
      node.p.y = Math.random();
    }
    node.x = node.p.x;
    node.y = node.p.y;
    node.label = name;
    if (!node.image) {
      node.image = {
        src: node.star && (API_SERVER + "/stars/" + node.star + "/image_96")
      };
    } else {
      node.image.src = fix_path(node.image.src);
    }
  });

  function fix_path(url) {
    if (url.indexOf("http://") === 0 || url.indexOf("https://") === 0) {
      return url;
    } else if (url.indexOf("/static") === 0 || url.indexOf("/stars/") === 0) {
      return API_SERVER + url;
    } else {
      return CACHE_BUST + url;
    }
  }

  var renderer = Renderer(target, class_for_width, class_for_height, data);
  renderer.init();
  return renderer;
}

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
var params = {animate: true, size: 80, fps: 20, line_width: 5, annotate:true};
var target = "#viewport1";
var class_for_width = ".fh5co-hero-smartphone";
var class_for_height = ".fh5co-hero-smartphone";

var renderer = drawStaticConstellation(graph_data, params, target, class_for_width, class_for_height);

function traverse_graph(start, delay, next) {
  var target = next || start;
  renderer.beep(target);
  next = graph_data.edges[target];
  if(next) {
    var kids = Object.keys(next);
    var len = kids.length;
    if(len === 1) {
      setTimeout(function() {
        traverse_graph(start, delay, kids[0]);
      }, delay);
    } else {
      var amt = Math.random() * len;
      var index = parseInt(amt);
      setTimeout(function() {
        traverse_graph(start, delay, kids[index]);
      }, delay);
    }
  } else {
    //cycle again
    setTimeout(function() {
      traverse_graph(start, delay);
    }, delay * 2);
  }

}
traverse_graph("activity_1", 2500);







