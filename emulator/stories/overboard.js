var overboard = {

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
      "title": "Intwixt",
      "avatar": "a1.png"
    },
    "u1": {
      "id": "u1",
      "title": "Ben",
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
          "title": "Acme - Hire",
          "avatar": "a1.png",
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
          "title": "Intwixt",
          "avatar": "a1.png",
          "private": true,
          "messages": {}
        }
      }
    },

    //this panel is used for showing a static image (like a screenshot of the box workspace)
    "p5": {
      "id": "p5",
      "type": "image",
      "src": "img/screenshots/overboard_1.png"
    },

    //this panel shows the intwixt emulator (this is the one that depicts the file upload workflow)
    "p2": {
      "id": "p2",
      "type": "intwixt",
      "graph": {}
    },

    //this is the second intwixt emulator instance; this one shows the approval process
    "p3": {
      "id": "p3",
      "type": "intwixt",
      "graph": {}
    }
  },

  //this is the story board. this is used to tell the story; it starts in an `idling` state (important!!)
  "story_board": {
    "state": "idling",

    //1, 2, 3 (binary add) (1) use slack app, (2) own slack app, (4) contact us
    "cta": 4,

    //this is the index for which event to start at; it is possible to update this during testing to bypass prior steps
    "index": 0,

    //these are the events for the story; each event has a `type` that further defines the inputs needed
    "events": [

      //alert
      {
        "action": {
          "type": "story.alert",
          "text": "Demo server unavailable for this example. Please try again later."
        },
        "pause": 0
      },

      //activate a panel
      {
        "action": {
          "type": "panel.activate",
          "id": "p1"
        },
        "annotation": {
          "user": "a1",
          "role": "Intwixt",
          "text": "turns Slack into a <b>business process engine</b>, enabling centralized management of document approval workflows."
        },
        //when the user clicks 'play all', 'pause' defines how long to wait before running the next step
        "pause": 6000
      },

      //activate a channel
      {
        "action": {
          "type": "channel.activate",
          "id": "a1"
        },
        "annotation": {
          "user": "",
          "role": "",
          "text": ""
        },
        "pause": 1000,
        "step_next": true
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
            "text": "😊 Hi, I'm <b>Intwixt</b>! I manage Box.com document approvals!<br>Upload a file to get started."
          }
        },
        "annotation": {
          "user": "u1",
          "role": "Submitters",
          "text": "upload files directly to Slack. Intwixt listens for this event and begins the document review workflow in response."
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
        "annotation": {
          "user": "",
          "role": "",
          "text": ""
        },
        "pause": 5000,
        "step_next": true
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
        "annotation": {
          "user": "u1",
          "role": "Submitters",
          "text": "are prompted to confirm the upload request. Intwixt will then orchestrate the process entirely within Slack by calling the <b>Box.com</b> Task Assignment APIs."
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
            "text": "Starting review...Return to this message for real-time status updates.<br><b>✔ SUBMITTED</b> <i>Acme RFP.pdf</i> for Review"
          }
        },
        "annotation": {
          "user": "",
          "role": "",
          "text": ""
        },
        "pause": 3500,
        "step_next": true
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
        "annotation": {
          "user": "u1",
          "role": "Submitters",
          "text": "can return for real-time status updates as the document moves through workflow."
        },
        "pause": 3000
      },

      //clear the annotation that describes what's going on; good to hide to better draw attention when showing
      {
        "action": {
          "type": "annotation.hide"
        },
        "pause": 1500,
        "step_next": true
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
        "annotation": {
          "user": "u1",
          "role": "Submitters",
          "text": "are told how to address outstanding issues for rejected documents. They can then resubmit the document to Slack and the review process will resume."
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
            "text": "<b>✔ RESUBMITTED</b> at <i>11:30am</i> by Ben"
          }
        },
        "pause": 3000,
        "step_next": true
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
        "pause": 3000,
        "step_next": true
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
          "type": "annotation.hide"
        },
        "pause": 1500,
        "step_next": true
      },

      {
        "action": {
          "type": "panel.activate",
          "id": "p2"
        },
        "annotation": {
          "user": "a1",
          "role": "Intwixt Developers",
          "text": "use the visual designer to configure the workflow. This 'no-code' approach makes it effortless for even business users to modify and extend a workflow. For example, this workflow is triggered when files are uploaded to slack."
        },
        "pause": 7500
      },

      {
        "action": {
          "type": "annotation.hide"
        },
        "pause": 1500,
        "step_next": true
      },

      {
        "action": {
          "type": "panel.activate",
          "id": "p3"
        },
        "annotation": {
          "user": "a1",
          "role": "Intwixt Developers",
          "text": "are encouraged to create modular, conversational workflows. This one drives the review process. Now let's return to Slack to see the end user experience orchestrated by this flow."
        },
        "pause": 6500
      },

      {
        "action": {
          "type": "annotation.hide"
        },
        "pause": 1500,
        "step_next": true
      },

      {
        "action": {
          "type": "panel.activate",
          "id": "p4"
        },
        "annotation": {
          "user": "u3",
          "role": "Approvers",
          "text": "can be named individuals or a Slack channel can be used instead. When a channel is used, members of that channel will be prompted to first claim the document."
        },
        "pause": 4500
      },

      {
        "action": {
          "type": "channel.activate",
          "id": "c1"
        },
        "annotation": {
          "user": "",
          "role": "",
          "text": ""
        },
        "pause": 1000,
        "step_next": true
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
        "annotation": {
          "user": "u3",
          "role": "Approvers",
          "text": "are notified when a document is claimed, giving other channel members a real-time view of everyone's efforts."
        },
        "pause": 3500
      },

      {
        "action": {
          "type": "channel.activate",
          "id": "a1"
        },
        "annotation": {
          "user": "",
          "role": "",
          "text": ""
        },
        "pause": 1000,
        "step_next": true
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
                "title": "View Document"
              }
            }
          }
        },
        "annotation": {
          "user": "u2",
          "role": "Approvers",
          "text": "can preview the document at Box.com and then complete the task by clicking <b>Approve</b> or <b>Deny</b>."
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
        "annotation": {
          "user": "u2",
          "role": "Approvers",
          "text": "are prompted to provide additional details for their decision, including steps to remedy rejected documents. The submitter will then be notified to resubmit the fixed document."
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
            "text": "🚫 You <b>REJECTED</b> document <i>Acme RFP.pdf</i> at 10:50AM<br><b>REASON</b>: You need to include more detail in the `maintenance and support` section."
          }
        },
        "annotation": {
          "user": "",
          "role": "",
          "text": ""
        },
        "pause": 3500
      },

      {
        "action": {
          "type": "panel.activate",
          "id": "p5"
        },
        "annotation": {
          "user": "box",
          "role": "Box.com",
          "text": "is used for previewing the file and is also useful for auditing the review history once it's completed. Box.com also serves as the repository for the final, approved version of the document."
        },
        "pause": 5000
      },

      //clear all messages from a channel (used to reset a slack workspace in prep for re-running the simulation)
      {
        "action": {
          "type": "channel.clear",
          "panel": "p1",
          "channel": "a1"
        },
        "annotation": {
          "user": "",
          "role": "",
          "text": ""
        },
        "pause": 100,
        "step_next": true
      },

      //set to a default state with no channels selected
      {
        "action": {
          "type": "channel.activate",
          "id": ""
        },
        "pause": 100,
        "step_next": true
      }
    ]
  }
};