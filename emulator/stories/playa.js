var playa = {

  //top-level annotation; declare these fields (empty strings are fine)
  "annotation": {
    "user": "",
    "role": "",
    "text": ""
  },

  //'users' is a rollup of all roles and apps used in the emulation; images are all located in the img/avatars directory
  "users": {
    "a1": {
      "id": "a1",
      "title": "Acme - Docs",
      "avatar": "unboxed.png"
    },
    "u1": {
      "id": "u1",
      "title": "Luke",
      "avatar": "u1.png"
    },
    "u2": {
      "id": "u2",
      "title": "Radhika",
      "avatar": "u2.png"
    },
    "u3": {
      "id": "u3",
      "title": "Sabin",
      "avatar": "u3.png"
    },
    "box": {
      "id": "box",
      "title": "Box.com",
      "avatar": "box.png"
    }
  },

  //declare the id of the panel you want to show in the background before the player starts
  "activePanelId": "p1",

  //this is the first slack workspace used in the demo (use for the submitter)
  "panels": {
    "p1": {
      "id": "p1",
      "type": "slack",

      //this is the targeted user for this slack workspace; this id MUST come from the users list above
      "activeUserId": "u1",

      //you must declare the dialog object; this is used to emulate a slack dialog prompt
      "dialog": {
        "active": false,
        "title": "",
        "target_field": "reason",
        "fields": {
          "reason": {
            "type": "",
            "title": "",
            "placeholder": "",
            "value": ""
          }
        }
      },

      //you must declare a file upload object; this is used to emulate a file being uploaded
      "file": {
        "active": false,
        "filename": "",
        "message": ""
      },

      //this is the textbox at the bottom for sending messages; leave empty for now...todo: need to add method for typing
      "input": "",

      //the workspace title
      "workspace": {
        "title": "Acme Corp"
      },

      //if you want to show a default channel in an active state set here; otherwise, leave as an empty string
      "activeChannelId": "",

      //the list of channels that will render in the sidebar; useful to add #general even if you don't activate it
      "channels": {
        "c1": {
          "id": "c1",
          "title": "reviewers",
          "private": true,
          "members": 17,
          "pins": 8,
          "description": "First-level document review",
          "unread": 2,
          "messages": {}
        },
        "c2": {
          "id": "c2",
          "title": "general",
          "private": false,
          "unread": 0,
          "members": 290,
          "pins": 12,
          "description": "Company-wide announcements.",
          "messages": {}
        },
        "a1": {
          "id": "a1",
          "is_dm": true,
          "title": "Acme - Docs",
          "avatar": "unboxed.png",
          "private": true,
          "messages": {}
        }
      }
    },

    //this is the second slack workspace used for the demo (used for the approver)
    "p4": {
      "id": "p4",
      "type": "slack",

      "activeUserId": "u3",

      "dialog": {
        "active": false,
        "title": "",
        "target_field": "reason",
        "fields": {
          "reason": {
            "type": "",
            "title": "",
            "placeholder": "",
            "value": ""
          }
        }
      },

      "file": {
        "active": false,
        "filename": "",
        "message": ""
      },

      "input": "",

      "workspace": {
        "title": "Acme Corp"
      },

      "activeChannelId": "",
      "channels": {
        "c1": {
          "id": "c1",
          "title": "reviewers",
          "private": true,
          "members": 17,
          "pins": 8,
          "description": "First-level document review",
          "unread": 2,
          "messages": {}
        },
        "c2": {
          "id": "c2",
          "title": "general",
          "private": false,
          "unread": 0,
          "members": 290,
          "pins": 12,
          "description": "Company-wide announcements.",
          "messages": {}
        },
        "a1": {
          "id": "a1",
          "is_dm": true,
          "title": "Acme - Docs",
          "avatar": "unboxed.png",
          "private": true,
          "messages": {}
        }
      }
    },

    //this panel is used for showing a static image (like a screenshot of the box workspace)
    "p5": {
      "id": "p5",
      "type": "image",
      "src": "img/screenshots/unboxed_1.png"
    }
  },

  //this is the story board. this is used to tell the story; it starts in an `idling` state (important!!)
  "story_board": {
    "state": "playing",

    //this is the index for which event to start at; it is possible to update this during testing to bypass prior steps
    "index": 0,

    //these are the events for the story; each event has a `type` that further defines the inputs needed
    "events": [

      //activate a panel
      {
        "action": {
          "type": "panel.activate",
          "id": "p1"
        },
        //when the user clicks 'play all' this defines how long to wait before running the next step
        "pause": 0
      },

      //activate a channel
      {
        "action": {
          "type": "channel.activate",
          "id": "a1"
        },
        "pause": 4500
      },

      //send a message
      {
        "action": {
          "type": "message.send",
          "channel": "a1",
          "message": {
            "id": "a1m1",
            "author": "a1",
            "timestamp": "9:21 AM",
            "text": "😊 Hi, I'm <b>Acme - Docs</b>! I manage Box.com document approvals!<br>Upload a file to get started."
          }
        },
        "pause": 4500
      },

      //activate the file upload form
      {
        "action": {
          "type": "file.activate",
          "filename": "Acme RFP.pdf",
          "message": "Here is the Acme proposal."
        },
        "pause": 3000
      },

      //submit the file upload form
      {
        "action": {
          "type": "file.upload",
          "filename": "Acme RFP.pdf",
          "message": "Here is the Acme proposal."
        },
        "pause": 5000
      },


      {
        "action": {
          "type": "message.send",
          "channel": "a1",
          "message": {
            "id": "a1m2",
            "author": "a1",
            "timestamp": "9:21 AM",
            "text": "Just to confirm...would you like to Submit <b>Acme RFP.pdf</b> for review?",
            "actions": {
              "submit": {
                "id": "submit",
                "title": "Submit",
                "style": "primary"
              },
              "cancel": {
                "id": "cancel",
                "title": "Cancel",
                "style": "danger"
              }
            }
          }
        },
        "pause": 5000
      },

      //click an action button in a message
      {
        "action": {
          "type": "action.click",
          "channel": "a1",
          "action": "submit",
          "message": {
            "id": "a1m2",
            "author": "a1",
            "timestamp": "9:22 AM",
            "text": "Starting review...Return to this message for real-time status updates.<br><b>✔ SUBMITTED</b> <b>Acme RFP.pdf</b> for Review"
          }
        },
        "pause": 3500
      },

      //append message content to an existing message
      {
        "action": {
          "type": "message.append",
          "channel": "a1",
          "message": {
            "id": "a1m2",
            "author": "a1",
            "timestamp": "9:21 AM",
            "text": "<b>✔ CLAIMED</b> at <i>10:45am</i> by Sabin"
          }
        },
        "pause": 3000
      },

      //clear the annotation that describes what's going on; good to hide to better draw attention when showing
      {
        "action": {
          "type": "annotation.hide"
        },
        "pause": 1500
      },

      {
        "action": {
          "type": "message.append",
          "channel": "a1",
          "message": {
            "id": "a1m2",
            "author": "a1",
            "timestamp": "9:21 AM",
            "text": "<b>🚫 REJECTED</b> at <i>10:50am</i> by Sabin<br><b>REASON</b>: You need to include more detail in the `maintenance and support` section."
          }
        },
        "pause": 3000
      },

      {
        "action": {
          "type": "message.append",
          "channel": "a1",
          "message": {
            "id": "a1m2",
            "author": "a1",
            "timestamp": "11:30 AM",
            "text": "<b>✔ RESUBMITTED</b> at <i>11:30am</i> by Luke"
          }
        },
        "pause": 3000
      },

      {
        "action": {
          "type": "message.append",
          "channel": "a1",
          "message": {
            "id": "a1m2",
            "author": "a1",
            "timestamp": "9:21 AM",
            "text": "<b>✔ APPROVED</b> at <i>11:00pm</i> by Sabin"
          }
        },
        "pause": 3000
      },

      {
        "action": {
          "type": "message.append",
          "channel": "a1",
          "message": {
            "id": "a1m2",
            "author": "a1",
            "timestamp": "9:21 AM",
            "text": "<b>✔ APPROVED</b> at <i>11:33pm</i> by Radhika<br><b>✔ COMPLETED</b> at <i>11:33pm</i>"
          }
        },
        "pause": 2000
      },

      {
        "action": {
          "type": "panel.activate",
          "id": "p4"
        },
        "pause": 0
      },

      {
        "action": {
          "type": "channel.activate",
          "id": "c1"
        },
        "pause": 500
      },

      {
        "action": {
          "type": "message.send",
          "channel": "c1",
          "message": {
            "id": "c1m1",
            "author": "a1",
            "timestamp": "10:40 AM",
            "text": "📝 A document needs review. Press <b>Claim Document</b> to begin.",
            "actions": {
              "claim": {
                "id": "claim",
                "title": "Claim Document",
                "style": "primary"
              }
            }
          }
        },
        "pause": 4500
      },

      {
        "action": {
          "type": "action.click",
          "channel": "c1",
          "action": "claim",
          "message": {
            "id": "c1m1",
            "author": "a1",
            "timestamp": "10:41 AM",
            "text": "📝 Check here for live status updates for document, <b>Acme RFP.pdf</b>.<br>✔ CLAIMED by @Sabin at 10:41 AM."
          }
        },
        "pause": 3500
      },

      {
        "action": {
          "type": "channel.activate",
          "id": "a1"
        },
        "pause": 1000
      },

      {
        "action": {
          "type": "message.send",
          "channel": "a1",
          "message": {
            "id": "a1m1",
            "author": "a1",
            "timestamp": "10:42 AM",
            "text": "Please review this Box.com document and then return here to <b>Approve</b> or <b>Reject</b> it. You have 24 hours to complete your review.",
            "actions": {
              "approve": {
                "id": "approve",
                "title": "Approve",
                "style": "primary"
              },
              "deny": {
                "id": "deny",
                "title": "Deny",
                "style": "danger"
              },
              "view": {
                "id": "view",
                "title": "Preview"
              }
            }
          }
        },
        "pause": 5000
      },

      //show the form dialog; for now hard-coded to just show a text area...can be extended to render forms.
      //include the id of the message and id of the action button that will trigger the dialog
      //make sure target_field is equal t the id of the single field ('reason' in this example)
      {
        "action": {
          "type": "dialog.trigger",
          "channel": "a1",
          "message": "a1m1",
          "action": "deny",
          "dialog": {
            "title": "Justification",
            "target_field": "reason",
            "fields": {
              "reason": {
                "type": "textarea",
                "title": "Reason",
                "placeholder": "Enter a reason",
                "value": "You need to include more detail in the `maintenance and support` section."
              }
            }
          }
        },
        "pause": 3500
      },

      //submit the dialog (the `text` replaces the message text and buttons for the message that launched the dialog)
      {
        "action": {
          "type": "dialog.submit",
          "channel": "a1",
          "action": "deny",
          "message": {
            "id": "a1m1",
            "author": "a1",
            "timestamp": "10:45 AM",
            "text": "🚫 You <b>REJECTED</b> document <b>Acme RFP.pdf</b> at 10:50AM<br><b>REASON</b>: You need to include more detail in the `maintenance and support` section."
          }
        },
        "pause": 3500
      },

      //clear all messages from a channel (used to reset a slack workspace in prep for re-running the simulation)
      {
        "action": {
          "type": "channel.clear",
          "panel": "p1",
          "channel": "a1"
        },
        "pause": 0
      },

      //clear all messages from a channel (used to reset a slack workspace in prep for re-running the simulation)
      {
        "action": {
          "type": "channel.clear",
          "panel": "p4",
          "channel": "a1"
        },
        "pause": 0
      },

      //clear all messages from a channel (used to reset a slack workspace in prep for re-running the simulation)
      {
        "action": {
          "type": "channel.clear",
          "panel": "p4",
          "channel": "c1"
        },
        "pause": 0
      },

      //set to a default state with no channels selected
      {
        "action": {
          "type": "story.replay"
        },
        "pause": 100
      }
    ]
  }
};