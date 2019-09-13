
/**
 *
 * a data-driven emulator for slack; the static test model
 */
var slack_data = {

  activePanelId: "p1",
  panels: {
    "p1": {
      id: "p1",
      type: "slack",  //types include: slack, img, flow, call-to-action
      overlay: true,   //start out in overlay mode to show the 'play' button; when clicked, move through the scripts
      workspace: {
        id: "w1",
        title: "intwixt"
      },
      activeUserId: "u1",
      users: {
        a1: {
          id: "a1",
          title: "Unboxed",
          avatar: "a1.png"
        },
        u1: {
          id: "u1",
          title: "Luke",
          avatar: "u1.png"
        },
        u2: {
          id: "u2",
          title: "Thomas",
          avatar: "u2.png"
        },
        u3: {
          id: "u3",
          title: "Sabin",
          avatar: "u3.png"
        }
      },
      activeChannelId: 'null',
      channels: {
        c1: {
          id: "c1",
          title: "reviewers",
          private: true,
          members: 17,
          pins: 8,
          description: "First-level document review",
          unread: 2,
          messages: {
            "c1m1": {
              id: "c1m1",
              author: "a1",
              timestamp: "9:21 AM",
              text: "😊 Markup and text goes here and is styled using standard <i>&lt;HTML&gt; markup</i>.",
              actions: {
                submit: {
                  id: "submit",
                  title: "Submit",
                  style: "primary"
                },
                cancel: {
                  id: "cancel",
                  title: "Cancel",
                  style: "danger"
                }
              }
            }
          }
        },
        c2: {
          id: "c2",
          title: "general",
          private: false,
          unread: 0,
          members: 290,
          pins: 12,
          description: "Company-wide, non-critical announcements.",
          messages: {
            "c2m1": {
              id: "c2m1",
              author: "u1",
              timestamp: "9:21 AM",
              text: "😊 Some content <b>markup</b>."
            },
            "c2m2": {
              id: "c2m2",
              author: "u2",
              timestamp: "9:21 AM",
              text: "<b>Styling stuff here!!</b>.",
              actions: {
                ok: {
                  id: "ok",
                  title: "OK",
                  style: "primary"
                }
              }
            },
            "c2m3": {
              id: "c2m3",
              author: "u3",
              timestamp: "9:21 AM",
              text: "This is a regular message with nothing special to add."
            }
          }
        },
        a1: {
          id: "a1",
          is_dm: true,
          title: "Unboxed",
          avatar: "a1.png",
          private: true,
          messages: {
            "a1m1": {
              id: "a1m1",
              author: "a1",
              timestamp: "9:21 AM",
              text: "😊 How are you? Here are some buttons. Go ahead and click one!",
              actions: {
                submit: {
                  id: "submit",
                  title: "Submit",
                  style: "primary"
                },
                cancel: {
                  id: "cancel",
                  title: "Cancel",
                  style: "danger"
                }
              }
            },
            "a1m2": {
              id: "a1m2",
              author: "u2",
              timestamp: "9:21 AM",
              text: "<b>Styling stuff here!!</b>. <img class='image' src=''>"
            }
          }
        }
      },
      input: ""
    },
    p2: {
      id:"p2",
      type:"flow",
      activeImageId: "i1",
      images: {
        i1: {
          src: ""
        }
      }
    }
  },

  //the storyboard tells a story to the user by moving through a scripted set of panel orchestrations
  story_board: {
    state: "paused", //other states: playing, played
    event_id: 0, //index of event to execute (all will be played in order)
      events: [
        {
          action: {
            type: "panel.activate",
            id: "p1"
          },
          pause:2000
        },
        {
          action: {
            type: "channel.activate",
            id: "a1"
          },
          pause:5000
        },
        {
          action: {
            type: "file.activate",
            title: "september-expenses.pdf"
          },
          pause:3000
        },
        {
          action: {
            type: "file.upload",
            title: "september-expenses.pdf"
          },
          pause:100
        },
        {
          action: {
            type: "message.send",
            channel: "a1",
            message: {
              id: "a1m1",
              author: "a1",
              timestamp: "9:21 AM",
              text: "😊 Hi! Thanks for submitting your file. I'll send you alerts each step of the way and notify you of issues that need to be addressed."
            }
          },
          pause:5000
        },
        {
          action: {
            type: "panel.activate",
            id: "p2"
          },
          pause:2000
        }
      ]
  }
};

/**
 * holds reference to the examples
 */
var examples = {};


function emulate(id, selector, slack_data) {
  //instance Vue
  examples[id] = new Vue({
    el: selector,
    data: slack_data,
    computed: {
      activeChannelIdComponent: function () {
        return 'tab-' + this.activeChannelId.toLowerCase()
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.scrollToEnd();
      });
    },
    methods: {
      addItem: function() {
        this.items.push("Item #"+this.items.length);
        this.scrollToEnd();
      },
      scrollToEnd: function() {
        //todo: pass the panel id needed by the query selector to target the correct subitem
        var container = this.$el.querySelector(".messages");
        if(container) {
          Vue.nextTick(function() {
            container.scrollTop = container.scrollHeight + 1000;
          });
        }
      },
      setActiveChannel: function(panel_id, channel_id) {
        this.panels[panel_id].activeChannelId = channel_id;
        this.scrollToEnd();
      },
      set_overlay: function(panel_id, b_show) {
        this.panels[panel_id].overlay = b_show;
      },
      send_message: function(panel_id) {
        var target = this.panels[panel_id].channels[this.panels[panel_id].activeChannelId].messages;
        var timestamp = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
        var id = this.panels[panel_id].activeChannelId + "m" + new Date();
        target[id] = {
          id: id,
          author: this.panels[panel_id].activeUserId,
          timestamp: timestamp,
          text: this.panels[panel_id].input
        };
        //clear out text
        this.panels[panel_id].input = "";
        this.scrollToEnd();
      },
      act: function(panel_id, channel, message, action) {
        var my = this;
        setTimeout(function() {
          var text = "✔️ You clicked the "  + action.id.toUpperCase() + " button.!";
          my.update_message(panel_id, channel.id, message.id, text);
        },150);
      },
      update_message: function(panel_id, channel_id, message_id, text) {
        var target = this.panels[panel_id].channels[this.panels[panel_id].activeChannelId].messages[message_id];
        delete target.actions;
        target.timestamp = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
        target.text = text;
      }
    }
  });
}

//instance the 'unboxed' emulator demo
emulate("unboxed", "#unboxed", slack_data);
