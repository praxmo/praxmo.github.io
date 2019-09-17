
/**
 *
 * a data-driven emulator for slack; the static test model
 */
var slack_data = {

  activePanelId: "p1",
  panels: {
    "p1": {
      id: "p1",
      type: "slack",    //types include: slack, img, flow, call-to-action
      file: {           //file upload
        active: false,
        filename: "Acme RFP.pdf",
        message: "Here is the Acme proposal"
      },
      workspace: {
        id: "w1",
        title: "Acme Corp"
      },
      activeUserId: "u1",
      users: {
        a1: {
          id: "a1",
          title: "Intwixt",
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
      activeChannelId: "", //start with no channels selected
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
          title: "Intwixt",
          avatar: "a1.png",
          private: true,
          messages: { }  //starts empty, so the bot can send a welcome message
        }
      },
      input: ""
    },
    p2: {
      id:"p2",
      type:"intwixt",
      graph: {
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
      }
    }
  },

  //the storyboard tells a story to the user by moving through a scripted set of panel orchestrations
  story_board: {
    state: "idling", //other states: `playing`, `asking` (call to action)
    index: 0, //index of event to execute (all will be played in order)
    events: [
      {
        action: {
          type: "panel.activate",
          id: "p1"
        },
        pause: 1000
      },
      {
        action: {
          type: "channel.activate",
          id: "a1"
        },
        pause: 1000
      },
      {
        action: {
          type: "message.send",
          channel: "a1",
          message: {
            id: "a1m1",
            author: "a1",
            timestamp: "9:21 AM",
            text: "😊 Hi, I'm <b>Intwixt</b>! I manage Box document approvals!<br>Upload a file to get started."
          }
        },
        pause: 4500
      },
      {
        action: {
          type: "file.activate",
          filename: "Acme RFP.pdf",
          message: "Here is the Acme proposal."
        },
        pause: 2000
      },
      {
        action: {
          type: "file.upload",
          filename: "Acme RFP.pdf",
          message: "Here is the Acme proposal."
        },
        pause: 5000
      },
      {
        action: {
          type: "message.send",
          channel: "a1",
          message: {
            id: "a1m2",
            author: "a1",
            timestamp: "9:21 AM",
            text: "Would you like to <b>Submit</b> <i>Acme RFP.pdf</i> for review?",
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
        },
        pause: 6000
      },
      {
        action: {
          type: "action.click",
          channel: "a1",
          action: "submit",
          message: {
            id: "a1m2",
            author: "a1",
            timestamp: "9:22 AM",
            text: "Starting review...Return to this message for real-time status updates.<br><b>✔ SUBMITTED</b> <i>Acme RFP.pdf</i> for Review"
          }
        },
        pause: 4500
      },
      {
        action: {
          type: "panel.activate",
          id: "p2"
        },
        pause: 5000
      },
      {
        action: {
          type: "panel.activate",
          id: "p1"
        },
        pause: 2000
      },
      {
        action: {
          type: "channel.clear",
          panel: "p1",
          channel: "a1"
        },
        pause: 1000
      },
      {
        action: {
          type: "channel.activate",
          id: ""
        },
        pause: 1000
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
      //start the narration
      play: function(b_reset) {
        if(b_reset) {
          this.story_board.index = 0;
        }
        this.story_board.state = "playing";
        var event = this.story_board.events[this.story_board.index];
        if(event) {
          var target, action = event.action;
          if (action.type === 'panel.activate') {
            //todo: need a method to do this, so the animation/reveal slides the panel into view
            this.activePanelId = action.id;
          } else if (action.type === 'channel.activate') {
            this.set_active_channel(this.activePanelId, action.id);
          } else if (action.type === 'message.send') {
            target = this.panels[this.activePanelId].channels[this.panels[this.activePanelId].activeChannelId].messages;
            this.send_formatted_message(target, action.message.id, this.clone(action.message));
          } else if (action.type === 'file.activate') {
            this.show_file_prompt(this.activePanelId, action.filename, action.message, event.pause);
            //always exit early on file upload; once the message is typed out, the
            this.story_board.index = this.story_board.index + 1;
            return;
          } else if (action.type === 'file.upload') {
            this.before_file_upload(this.activePanelId, action.filename, action.message);
          } else if (action.type === 'action.click') {
            target = this.panels[this.activePanelId].channels[this.panels[this.activePanelId].activeChannelId].messages[action.message.id];
            this.do_act(target, action.message.text, target.actions[action.action]);
          } else if (action.type === 'channel.clear') {
            target = this.panels[action.panel].channels[action.channel];
            this.$set(target, "messages", {});
          }
          //pause until specified and then
          this.story_board.index = this.story_board.index + 1;
          setTimeout(this.play, event.pause);
        } else {
          console.log("Story told! All complete...user can now react to the CTA prompt");
          this.story_board.state = "played";
        }
      },

      set_active_channel: function(panel_id, channel_id) {
        var target = this.panels[panel_id];
        this.$set(target, "activeChannelId", channel_id);
        if(channel_id) {
          this.emphasize(this.panels[panel_id].channels[channel_id]);
          var my = this;
          Vue.nextTick(function() {
            my.scroll_to_end();
          });
        }
      },

      //when the paperclip is clicked
      show_file_prompt: function(panel_id, filename, message, pause) {
        var my = this;
        //highlight the paperclip
        this.emphasize(this.panels[panel_id].file);
        //pause and execute
        setTimeout(function() {
          my.panels[panel_id].file.active = true;
          my.panels[panel_id].file.filename = filename;
          my.panels[panel_id].file.message = "";
          if(message) {
            my.typing(my.panels[panel_id].file, "message", message, 0, 150, pause);
          }
        }, 1250);
      },

      //when the 'upload' button is clicked
      before_file_upload: function(panel_id, filename, message) {
        this.emphasize(this.panels[panel_id].file, "submitting");
        var my = this;
        setTimeout(function() {
          my.do_file_upload(panel_id, filename, message);
        },500);
      },

      //upload the file (dismiss the file upload panel)
      do_file_upload: function(panel_id, filename, message) {
        this.panels[panel_id].file.active = false;
        var target = this.panels[panel_id].channels[this.panels[panel_id].activeChannelId].messages;
        var id = this.panels[panel_id].activeChannelId + "m" + new Date().valueOf();
        var timestamp = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'});
        var new_message = {
          id: id,
          author: this.panels[panel_id].activeUserId,
          timestamp: timestamp,
          text: message,
          file: filename
        };
        //pause before showing the uploaded file in the channel...as if it is actually being uploaded...
        var my = this;
        setTimeout(function() {
          my.send_formatted_message(target, id, new_message);
        }, 1500);
      },

      //dismiss the file upload panel
      cancel_file_upload: function(panel_id) {
        this.panels[panel_id].file.active = false;
      },

      //add a new message
      send_message: function(panel_id) {
        var target = this.panels[panel_id].channels[this.panels[panel_id].activeChannelId].messages;
        var timestamp = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'});
        var id = this.panels[panel_id].activeChannelId + "m" + new Date().valueOf();
        var text = this.panels[panel_id].input;
        var new_message = {
          id: id,
          author: this.panels[panel_id].activeUserId,
          timestamp: timestamp,
          text: text
        };
        if (text.endsWith("?")) {
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
        this.panels[panel_id].input = "";
        this.send_formatted_message(target, id, new_message);
      },
      send_formatted_message: function(target, id, new_message) {
        this.$set(target, id, new_message);
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
        var text = "✔️ You clicked the "  + action.id.toUpperCase() + " button.!";
        var target = this.panels[panel_id].channels[this.panels[panel_id].activeChannelId].messages[message.id];
        setTimeout(function() {
          //update the message text
          my.update_message(target, text, false);
        },700);
      },

      //when an action button is clicked
      do_act: function(target, text, action) {
        var my = this;
        this.emphasize(action);
        setTimeout(function() {
          my.update_message(target, text, false);
        },700);
      },

      //update an existing message
      update_message: function(target, text, b_append) {
        target.timestamp = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
        //remove the buttons from the message (assume any update invalidates the action buttons)
        delete target.actions;
        if(b_append) {
          target.text = target.text + "<br>" + text;
        } else {
          target.text = text;
        }
        this.emphasize(target);
        var my = this;
        Vue.nextTick(function() {
          my.scroll_to_end();
        });
      },

      //add new/updated message highlighting
      emphasize: function(target, attribute) {
        //use set (not part of original data set, so will not be watched otherwise)
        this.$set(target, attribute || 'activating', true);
        var my = this;
        setTimeout(function() {
          my.deemphasize(target, attribute);
        },1000);
      },

      //remove new/updated message highlighting
      deemphasize: function(target, attribute) {
        this.$set(target, attribute || 'activating', false);
      },

      clone: function(obj) {
        return JSON.parse(JSON.stringify(obj));
      },

      //always reveal the latest message appended to the window
      scroll_to_end: function() {
        //todo: pass the panel id needed by the query selector to target the correct subitem
        var container = this.$el.querySelector(".messages");
        if(container) {
          Vue.nextTick(function() {
            container.scrollTop = container.scrollHeight + 1000;
          });
        }
      },

      //simulate typing text in real-time (like filling in a text field)
      typing: function (target, attribute, message, index, delay, pause) {
        var my = this;
        if (index < message.length) {
          index++;
          var _message = message.substr(0, index);
          this.$set(target, attribute, _message);
          setTimeout(function() {
            my.typing(target, attribute, message, index, delay, pause);
          }, parseInt(delay * Math.random()));
        } else {
          //after filling out the message, advance the player
          setTimeout(function() {
            my.play();
          }, pause);
        }
      }


    }
  });
}

//instance the 'unboxed' emulator demo
emulate("unboxed", "#unboxed", slack_data);
