
/**
 *
 * a data-driven emulator for slack; the static test model
 */
var slack_data = {

  annotation: {
    user:"",
    role: "",
    text: ""
  },

  users: {  //top-level list of users (and systems...overloaded to handle both)
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
    },
    box: {
      id: "box",
      title: "Box.com",
      avatar: "box.png"
    }
  },

  activePanelId: "p1",
  panels: {
    "p1": {
      id: "p1",
      type: "slack",    //types include: slack, img, intwixt, call-to-action
      file: {
        active: false,
        filename: "Acme RFP.pdf",
        message: "Here is the Acme proposal"
      },
      workspace: {
        id: "w1",
        title: "Acme Corp"
      },
      activeUserId: "u1",
      activeChannelId: "",
      channels: {
        c1: {
          id: "c1",
          title: "reviewers",
          private: true,
          members: 17,
          pins: 8,
          description: "First-level document review",
          unread: 2,
          messages: {}
        },
        c2: {
          id: "c2",
          title: "general",
          private: false,
          unread: 0,
          members: 290,
          pins: 12,
          description: "Company-wide announcements.",
          messages: {}
        },
        a1: {
          id: "a1",
          is_dm: true,
          title: "Intwixt",
          avatar: "a1.png",
          private: true,
          messages: {}
        }
      },
      input: ""
    },
    "p4": {
      id: "p4",
      type: "slack",    //types include: slack, img, intwixt, call-to-action
      file: {
        active: false,
        filename: "Acme RFP.pdf",
        message: "Here is the Acme proposal"
      },
      workspace: {
        id: "w1",
        title: "Acme Corp"
      },
      activeUserId: "u2",
      activeChannelId: "",
      channels: {
        c1: {
          id: "c1",
          title: "reviewers",
          private: true,
          members: 17,
          pins: 8,
          description: "First-level document review",
          unread: 2,
          messages: {}
        },
        c2: {
          id: "c2",
          title: "general",
          private: false,
          unread: 0,
          members: 290,
          pins: 12,
          description: "Company-wide announcements.",
          messages: {}
        },
        a1: {
          id: "a1",
          is_dm: true,
          title: "Intwixt",
          avatar: "a1.png",
          private: true,
          messages: {}
        }
      },
      input: ""
    },
    "p5": {
      id: "p5",
      type: "image",
      src: "img/screenshots/unboxed_1.png"
    },
    p2: {
      id: "p2",
      type:"intwixt",
      graph: {
        "nodes": {
          "activity_1": {
            "title": "On Slack File Upload",
            "star": "Slack.1",
            "definition": "trigger-file_event",
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
    },
    p3: {
      id:"p3",
      type:"intwixt",
      graph: {
        "nodes": {
          "activity_7": {
            "title": "Review Document",
            "star": "Receive.1",
            "definition": "receive",
            "p": {
              "x": 0.191,
              "y": 0.378
            },
            "trigger": true,
            "image": {
              "src": "/stars/Receive.1/image_96"
            },
            "icon_font": {
              "class": "fa-file-o",
              "code": "",
              "family": "FontAwesome"
            }
          },
          "activity_8": {
            "title": "Ask Review",
            "star": "Slack.1",
            "definition": "activity-ask_choice_with_blockkit",
            "p": {
              "x": 0.544,
              "y": 0.891
            },
            "async": true,
            "long_running": true
          },
          "activity_10": {
            "title": "Create Task",
            "star": "Box.1",
            "definition": "createTask",
            "p": {
              "x": 0.105,
              "y": 0.674
            },
            "async": true
          },
          "activity_13": {
            "title": "Create Task Assignment",
            "star": "Box.1",
            "definition": "createTaskAssignment",
            "p": {
              "x": 0.28,
              "y": 0.916
            },
            "async": true
          },
          "activity_20": {
            "title": "Complete Task Assignment",
            "star": "Box.1",
            "definition": "updateTaskAssignment",
            "p": {
              "x": 0.752,
              "y": 0.399
            },
            "async": true
          },
          "activity_22": {
            "title": "Send Confirmation Message",
            "star": "Slack.1",
            "definition": "activity-send_message_with_blockkit",
            "p": {
              "x": 0.924,
              "y": 0.873
            },
            "async": true
          },
          "activity_1": {
            "title": "Ask for Reason",
            "star": "Slack.1",
            "definition": "activity-respond_with_ask_data_with_dialog",
            "p": {
              "x": 0.743,
              "y": 0.652
            },
            "async": true,
            "long_running": true
          },
          "activity_3": {
            "title": "Return Response",
            "star": "Return.1",
            "definition": "return",
            "p": {
              "x": 0.684,
              "y": 0.177
            }
          }
        },
        "edges": {
          "activity_13": {
            "activity_8": {
              "length": 2
            }
          },
          "activity_7": {
            "activity_10": {
              "length": 2
            }
          },
          "activity_10": {
            "activity_13": {
              "length": 2
            }
          },
          "activity_1": {
            "activity_20": {
              "length": 2
            },
            "activity_22": {
              "length": 2
            }
          },
          "activity_8": {
            "activity_1": {
              "length": 2,
              "condition": true
            }
          },
          "activity_20": {
            "activity_3": {
              "length": 2
            }
          }
        }
      }
    }
  },

  //the storyboard tells a story to the user by moving through a scripted set of panel orchestrations
  story_board: {
    state: "idling", //other states: `playing`, `asking` (call to action)
    index: 0,        //index of event to execute (all will be played in order)
    events: [
      {
        action: {
          type: "panel.activate",
          id: "p1"
        },
        annotation: {
          user: "a1",
          role: "Intwixt",
          text: "turns Slack into a <b>business process engine</b>, enabling centralized management of document approval workflows."
        },
        pause: 6000
      },
      {
        action: {
          type: "channel.activate",
          id: "a1"
        },
        annotation: {
          user: "",
          role: "",
          text: ""
        },
        pause: 1000,
        step_next:true
      },
      {
        action: {
          type: "message.send",
          channel: "a1",
          message: {
            id: "a1m1",
            author: "a1",
            timestamp: "9:21 AM",
            text: "😊 Hi, I'm <b>Intwixt</b>! I manage Box.com document approvals!<br>Upload a file to get started."
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
        annotation: {
          user: "u1",
          role: "Submitters",
          text: "upload files directly to Slack. Intwixt responds in turn, triggering the document review."
        },
        pause: 3000
      },
      {
        action: {
          type: "file.upload",
          filename: "Acme RFP.pdf",
          message: "Here is the Acme proposal."
        },
        annotation: {
          user: "",
          role: "",
          text: ""
        },
        pause: 5000,
        step_next:true
      },
      {
        action: {
          type: "message.send",
          channel: "a1",
          message: {
            id: "a1m2",
            author: "a1",
            timestamp: "9:21 AM",
            text: "Just to confirm...would you like to Submit <b>Acme RFP.pdf</b> for review?",
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
        annotation: {
          user: "u1",
          role: "Submitters",
          text: "are prompted to confirm the upload request. Intwixt will then orchestrate the process entirely within Slack by calling the <b>Box.com</b> Task Assignment APIs."
        },
        pause: 5000
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
        annotation: {
          user: "",
          role: "",
          text: ""
        },
        pause: 3500,
        step_next:true
      },
      {
        action: {
          type: "message.append",
          channel: "a1",
          message: {
            id: "a1m2",
            author: "a1",
            timestamp: "9:21 AM",
            text: "<b>✔ CLAIMED</b> at <i>10:45am</i> by Sabin"
          }
        },
        annotation: {
          user: "u1",
          role: "Submitters",
          text: "can return for real-time status updates as the document moves through workflow. If the document is rejected, users can fix and upload a new document version."
        },
        pause: 2000,
        step_next:true
      },
      {
        action: {
          type: "message.append",
          channel: "a1",
          message: {
            id: "a1m2",
            author: "a1",
            timestamp: "9:21 AM",
            text: "<b>✔ APPROVED</b> at <i>11:00am</i> by Sabin"
          }
        },
        pause: 3000,
        step_next:true
      },
      {
        action: {
          type: "message.append",
          channel: "a1",
          message: {
            id: "a1m2",
            author: "a1",
            timestamp: "9:21 AM",
            text: "<b>✔ APPROVED</b> at <i>12:33pm</i> by Thomas<br><b>✔ COMPLETED</b> at <i>12:33pm</i>"
          }
        },
        annotation: {
          user: "",
          role: "",
          text: ""
        },
        pause: 2000
      },
      {
        action: {
          type: "panel.activate",
          id: "p2"
        },
        annotation: {
          user: "a1",
          role: "Intwixt Developers",
          text: "use the visual designer to configure the workflow. This 'no-code' approach makes it effortless for even business users to modify and extend a workflow. For example, this workflow is triggered when files are uploaded to slack."
        },
        pause: 9000
      },
      {
        action: {
          type: "panel.activate",
          id: "p3"
        },
        annotation: {
          user: "",
          role: "",
          text: ""
        },
        pause: 1500,
        step_next:true
      },
      {
        action: {
          type: "panel.activate",
          id: "p3"
        },
        annotation: {
          user: "a1",
          role: "Intwixt Developers",
          text: "are encouraged to create modular, conversational workflows. This one drives the review process. Now let's return to Slack to see the end user experience orchestrated by this flow."
        },
        pause: 6500
      },
      {
        action: {
          type: "panel.activate",
          id: "p4"
        },
        annotation: {
          user: "",
          role: "",
          text: ""
        },
        pause: 1500,
        step_next:true
      },
      {
        action: {
          type: "panel.activate",
          id: "p4"
        },
        annotation: {
          user: "u2",
          role: "Approvers",
          text: "can be named individuals or a Slack channel can be used instead. When a channel is used, members of that channel will be prompted to first claim the document."
        },
        pause: 4500
      },
      {
        action: {
          type: "channel.activate",
          id: "c1"
        },
        annotation: {
          user: "",
          role: "",
          text: ""
        },
        pause: 1000,
        step_next:true
      },
      {
        action: {
          type: "message.send",
          channel: "c1",
          message: {
            id: "c1m1",
            author: "a1",
            timestamp: "10:40 AM",
            text: "📝 A document needs review. Press <b>Claim Document</b> to begin.",
            actions: {
              claim: {
                id: "claim",
                title: "Claim Document",
                style: "primary"
              }
            }
          }
        },
        pause: 4500
      },
      {
        action: {
          type: "action.click",
          channel: "c1",
          action: "claim",
          message: {
            id: "c1m1",
            author: "a1",
            timestamp: "10:41 AM",
            text: "📝 Check here for live status updates for document, <b>Acme RFP.pdf</b>.<br>✔ CLAIMED by @Sabin at 10:41 AM."
          }
        },
        annotation: {
          user: "u2",
          role: "Approvers",
          text: "are notified when a document is claimed, giving other channel members a real-time view of everyone's efforts."
        },
        pause: 3500
      },
      {
        action: {
          type: "channel.activate",
          id: "a1"
        },
        annotation: {
          user: "",
          role: "",
          text: ""
        },
        pause: 1000,
        step_next:true
      },
      {
        action: {
          type: "message.send",
          channel: "a1",
          message: {
            id: "a1m1",
            author: "a1",
            timestamp: "10:42 AM",
            text: "Please review this Box.com document and then return here to <b>Approve</b> or <b>Reject</b> it. You have 24 hours to complete your review.",
            actions: {
              approve: {
                id: "approve",
                title: "Approve",
                style: "primary"
              },
              deny: {
                id: "deny",
                title: "Deny",
                style: "danger"
              },
              view: {
                id: "view",
                title: "View Document"
              }
            }
          }
        },
        annotation: {
          user: "u1",
          role: "Approvers",
          text: "can preview the document at Box.com and then complete the task by clicking <b>Approve</b> or <b>Deny</b>."
        },
        pause: 5000
      },
      {
        action: {
          type: "action.click",
          channel: "a1",
          action: "approve",
          message: {
            id: "a1m1",
            author: "a1",
            timestamp: "10:45 AM",
            text: "✔ You <b>APPROVED</b> document <i>Acme RFP.pdf</i> at 10:45PM<br><b>REASON</b>: Great writeup! Nice proposal!"
          }
        },
        annotation: {
          user: "",
          role: "",
          text: ""
        },
        pause: 3500
      },
      {
        action: {
          type: "panel.activate",
          id: "p5"
        },
        annotation: {
          user: "box",
          role: "Box.com",
          text: "is used for previewing the file and is also useful for auditing the review history once it's completed. Box.com also serves as the repository the final, approved version of the document."
        },
        pause: 5000
      },
      {
        action: {
          type: "channel.clear",
          panel: "p1",
          channel: "a1"
        },
        annotation: {
          user: "",
          role: "",
          text: ""
        },
        pause: 1000,
        step_next:true
      },
      {
        action: {
          type: "channel.activate",
          id: ""
        },
        pause: 1000,
        step_next:true
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
      //step through
      step_through: function(b_reset) {
        if(b_reset) {
          this.story_board.index = 0;
        }
        this.$set(this.story_board, "step", true);
        this.play(false, true);
      },

      //play all
      play_all: function(b_reset) {
        if(b_reset) {
          this.story_board.index = 0;
        }
        this.$set(this.story_board, "step", false);
        this.play();
      },

      //play the next step in the story_board
      play: function(b_reset, b_force) {
        if(b_reset) {
          this.story_board.index = 0;
        }
        //when using the step-through stepper either show the play button and exit or execute the action
        if(this.story_board.step) {
          if(b_force){
            this.$set(this.story_board, "step_next", false);
          } else {
            this.$set(this.story_board, "step_next", true);
            return;
          }
        }
        this.story_board.state = "playing";
        var event = this.story_board.events[this.story_board.index];
        if(event) {
          var target, action = event.action;
          if(event.annotation) {
            this.annotation.user = event.annotation.user;
            this.annotation.role = event.annotation.role;
            this.annotation.text = event.annotation.text;
          }
          if (action.type === 'panel.activate') {
            this.set_active_panel(action.id);
          } else if (action.type === 'channel.activate') {
            this.set_active_channel(this.activePanelId, action.id);
          } else if (action.type === 'message.send') {
            target = this.panels[this.activePanelId].channels[this.panels[this.activePanelId].activeChannelId].messages;
            this.send_formatted_message(target, action.message.id, this.clone(action.message));
          } else if (action.type === 'message.append') {
            target = this.panels[this.activePanelId].channels[this.panels[this.activePanelId].activeChannelId].messages[action.message.id];
            this.update_message(target, action.message.text, true);
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
          this.story_board.index = this.story_board.index + 1;
          if(this.story_board.step && event.step_next) {
            //force-click the next action...no need to force user to move forward for every little step
            var my = this;
            setTimeout(function() {
              my.play(false, true);
            }, event.pause);
          } else {
            //pause until specified and then loop back
            // (always pause for 3k ms if in stepper mode...some readers are fast and the delay can be frustrating)
            setTimeout(this.play, this.story_board.step ? Math.min(event.pause, 1750) :event.pause);
          }
        } else {
          console.log("Story told! All complete...user can now react to the CTA prompt");
          this.story_board.state = "played";
        }
      },

      set_active_panel: function(panel_id) {
        this.activePanelId = panel_id;
        var target = this.panels[panel_id];
        if(target.type === "intwixt") {
          //this is the 'intwixt' panel type; reset the canvas and bind the graph; no need to cycle if not shown!
          if(window.demo_renderer) {
            window.demo_renderer.stop();
          }
          window.demo_renderer = drawStaticConstellation(
            target.graph,
            {animate: true, size: 80, fps: 20, line_width: 5, annotate:true},
            '#viewport_runner_' + panel_id,
            ".body",
            ".body"
          );
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
            setTimeout(function() {
              my.typing(my.panels[panel_id].file, "message", message, 0, 150, pause);
            }, 1000);
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
        var selector = "#" + this.activePanelId + " .messages";
        var container = this.$el.querySelector(selector);
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
          }, this.story_board.step ? 0 : pause);
        }
      }
    }
  }); // end Vue initialization
}

//instance the 'unboxed' emulator demo
emulate("unboxed", "#unboxed", slack_data);
