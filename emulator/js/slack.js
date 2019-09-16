
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
      overlay: false,   //when true, the 'file upload' overlay covers the slack UI to simulate sending a file
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
    state: "idling", //other states: playing, asking (CTA)
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
        this.scroll_to_end();
      });
    },
    methods: {
      scroll_to_end: function() {
        //todo: pass the panel id needed by the query selector to target the correct subitem
        var container = this.$el.querySelector(".messages");
        if(container) {
          Vue.nextTick(function() {
            container.scrollTop = container.scrollHeight + 1000;
          });
        }
      },
      set_active_channel: function(panel_id, channel_id) {
        this.panels[panel_id].activeChannelId = channel_id;
        //bind property that initiates the ripple effect
        this.emphasize(this.panels[panel_id].channels[channel_id]);
        var my = this;
        Vue.nextTick(function() {
          my.scroll_to_end();
        });
        //this.scroll_to_end();
      },
      //upload a file
      set_overlay: function(panel_id, b_show) {
        this.panels[panel_id].overlay = b_show;
        this.emphasize(this.panels[panel_id]);
      },
      //start the narration
      play: function() {
        console.log('start playing');
        this.story_board.state = "playing";
      },
      //add a new message
      send_message: function(panel_id) {
        var target = this.panels[panel_id].channels[this.panels[panel_id].activeChannelId].messages;
        var timestamp = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
        var id = this.panels[panel_id].activeChannelId + "m" + new Date().valueOf();
        var text = this.panels[panel_id].input;
        var new_message = {
          id: id,
          author: this.panels[panel_id].activeUserId,
          timestamp: timestamp,
          text: text
        };
        if(text.endsWith("?")) {
          //simulate a question with buttons if a question
          new_message.actions = {
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
        //add using $set to bind the watcher
        this.$set(target, id, new_message);
        //clear out text from the input
        this.panels[panel_id].input = "";
        this.scroll_to_end();
        var my = this;
        Vue.nextTick(function() {
          my.emphasize(new_message);
        });
      },
      //when an action button is clicked
      act: function(panel_id, channel, message, action) {
        var my = this;
        this.emphasize(action);
        setTimeout(function() {
          var text = "✔️ You clicked the "  + action.id.toUpperCase() + " button.!";
          my.update_message(panel_id, channel.id, message.id, text);
        },900);
      },
      //update an existing message
      update_message: function(panel_id, channel_id, message_id, text) {
        var target = this.panels[panel_id].channels[this.panels[panel_id].activeChannelId].messages[message_id];
        delete target.actions;
        target.timestamp = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
        target.text = text;
        this.emphasize(target);
      },
      //add new/updated message highlighting
      emphasize: function(target) {
        //use set (not part of original data set, so will not be watched otherwise)
        this.$set(target, 'activating', true);
        var my = this;
        setTimeout(function() {
          my.deemphasize(target);
        },1500);
      },
      //remove new/updated message highlighting
      deemphasize: function(target) {
        this.$set(target, 'activating', false);
      }
    }
  });
}

//instance the 'unboxed' emulator demo
emulate("unboxed", "#unboxed", slack_data);
