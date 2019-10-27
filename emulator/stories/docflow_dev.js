var docflow_dev = {

  //top-level annotation; declare these fields (empty strings are fine)
  "annotation": {
    "user": "",
    "role": "",
    "text": ""
  },

  //'users' is a rollup of all roles and apps used in the emulation; images are all located in the img/avatars directory
  "users": {
    "a0": {
      "id": "a0",
      "title": "Intwixt",
      "avatar": "a0.png"
    },
    "docflow": {
      "id": "docflow",
      "title": "Intwixt DocFlow",
      "avatar": "docflow_96.png"
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
      "title": "Sandy",
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
        "docflow": {
          "id": "docflow",
          "is_dm": true,
          "title": "Intwixt DocFlow",
          "avatar": "docflow_96.png",
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
        "docflow": {
          "id": "docflow",
          "is_dm": true,
          "title": "Intwixt DocFlow",
          "avatar": "docflow_96.png",
          "private": true,
          "messages": {}
        }
      }
    },

    //this panel is used for showing a static image (like a screenshot of the box workspace)
    "p5": {
      "id": "p5",
      "type": "image",
      "src": "/img/screenshots/docflow_1.png"
    },

    //this panel shows the intwixt emulator (this is the one that depicts the file upload workflow)
    "p2": {
      "id": "p2",
      "type": "intwixt",
      "graph": {
        "nodes": {
          "activity_1": {
            "title": "On Slack File Upload",
            "star": "Slack.1",
            "definition": "trigger-file_event",
            "p": {
              "x": 0.286,
              "y": 0.251
            },
            "trigger": true
          },
          "activity_3": {
            "title": "For Each File",
            "star": "Map.1",
            "definition": "map",
            "p": {
              "x": 0.143,
              "y": 0.369
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
              "y": 0.803
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
              "x": 0.315,
              "y": 0.917
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
              "y": 0.438
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
              "y": 0.597
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

    //this is the second intwixt emulator instance; this one shows the approval process
    "p3": {
      "id": "p3",
      "type": "intwixt",
      "graph": {
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

  //this is the story board. this is used to tell the story; it starts in an `idling` state (important!!)
  "story_board": {
    "state": "idling",

    //1, 2, 3 (binary add) (1) use slack app, (2) own slack app, (4) contact us
    "cta": 7,

    "href": {
      //direct user to the app home landing page to 'try' it; if there is no app home landing,the 'add to slack' link can be used instead
      "try":"https://www.intwixt.com/solutions/twix",

      //todo: when the `/setup` suffix is added to the above link (this will serve the developer landing page), point developers there to 'own' the intiwxt app
      //todo: enable cookie xfer from my.intwixt.com domain to www.intwixt.com domain; can now safely share, since we host both
      "own":"javascript:alert('Please contact us to get started. We will copy the source files to your Intwixt account and give you tips for extending to make it your own.');"
    },

    //this is the index for which event to start at; it is possible to update this during testing to bypass prior steps
    "index": 0, //use 14 to start emulator at graph 1

    //these are the events for the story; each event has a `type` that further defines the inputs needed
    "events": [

      //activate a panel
      {
        "action": {
          "type": "panel.activate",
          "id": "p1"
        },
        "annotation": {
          "user": "a0",
          "role": "Intwixt",
          "text": "turns Slack into a <b>business process engine</b>, enabling centralized management of document approval workflows."
        },
        //when the user clicks 'play all' this defines how long to wait before running the next step
        "pause": 6000
      },

      //activate a channel
      {
        "action": {
          "type": "channel.activate",
          "id": "docflow"
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
          "channel": "docflow",
          "message": {
            "id": "a1m1",
            "author": "docflow",
            "timestamp": "9:21 AM",
            "text": "😊 Hi, I'm <b>Intwixt DocFlow</b>! I manage Box.com document approvals!<br>Upload a file to get started."
          }
        },
        "annotation": {
          "user": "u1",
          "role": "Submitters",
          "text": "upload files directly to Slack. Intwixt-built Slackbots (like the one shown here) can orchestrate sophisticated business processes in response."
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
          "channel": "docflow",
          "message": {
            "id": "a1m2",
            "author": "docflow",
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
          "text": "are prompted to confirm the upload request. Intwixt will then orchestrate the process entirely within Slack by calling the necessary <b>Box.com</b> APIs."
        },
        "pause": 5000
      },

      //click an action button in a message
      {
        "action": {
          "type": "action.click",
          "channel": "docflow",
          "action": "submit",
          "message": {
            "id": "a1m2",
            "author": "docflow",
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
          "channel": "docflow",
          "message": {
            "id": "a1m2",
            "author": "docflow",
            "timestamp": "9:21 AM",
            "text": "<b>✔ CLAIMED</b> at <i>10:45am</i> by Sandy"
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
          "channel": "docflow",
          "message": {
            "id": "a1m2",
            "author": "docflow",
            "timestamp": "9:21 AM",
            "text": "<b>🚫 REJECTED</b> at <i>10:50am</i> by Sandy<br><b>REASON</b>: You need to include more detail in the `maintenance and support` section."
          }
        },
        "annotation": {
          "user": "u1",
          "role": "Submitters",
          "text": "are told how to address outstanding issues for rejected documents. They can then resubmit the document to Slack, and the review process will resume."
        },
        "pause": 3000
      },

      {
        "action": {
          "type": "message.append",
          "channel": "docflow",
          "message": {
            "id": "a1m2",
            "author": "docflow",
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
          "channel": "docflow",
          "message": {
            "id": "a1m2",
            "author": "docflow",
            "timestamp": "9:21 AM",
            "text": "<b>✔ APPROVED</b> at <i>11:00pm</i> by Sandy"
          }
        },
        "pause": 3000,
        "step_next": true
      },

      {
        "action": {
          "type": "message.append",
          "channel": "docflow",
          "message": {
            "id": "a1m2",
            "author": "docflow",
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
          "user": "a0",
          "role": "Intwixt Developers",
          "text": "use the visual designer to configure the workflow. This 'no-code' approach makes it possible for even business users to modify and extend a workflow. This particular workflow is triggered when files are uploaded to slack."
        },
        "pause": 0,
        "step_next": true
      },

      {
        "action": {
          "type": "graph.highlight",
          "activity": "activity_1"
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
          "user": "a0",
          "role": "Intwixt Developers",
          "text": "are encouraged to create modular, conversational workflows. This one drives the review process. Now let's return to Slack to see the end user experience when claiming and reviewing documents."
        },
        "pause": 0,
        "step_next": true
      },

      {
        "action": {
          "type": "graph.highlight",
          "activity": "activity_7"
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
        "pause": 0,
        "step_next":true
      },

      {
        "action": {
          "type": "channel.activate",
          "id": "c1"
        },
        "annotation": {
          "user": "u3",
          "role": "Reviewers",
          "text": "can be named individuals or a Slack channel can be used instead (as is shown here). When a channel is used, members of that channel will be prompted to first claim the document."
        },
        "pause": 4500
      },

      {
        "action": {
          "type": "annotation.hide"
        },
        "pause": 500,
        "step_next": true
      },

      {
        "action": {
          "type": "message.send",
          "channel": "c1",
          "message": {
            "id": "c1m1",
            "author": "docflow",
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
            "author": "docflow",
            "timestamp": "10:41 AM",
            "text": "📝 Check here for live status updates for document, <b>Acme RFP.pdf</b>.<br>✔ CLAIMED by Sandy at 10:41 AM."
          }
        },
        "annotation": {
          "user": "u3",
          "role": "Reviewers",
          "text": "are notified when a document is claimed, giving other channel members a real-time view of everyone's efforts. Importantly, the interactive Slack message is updated to remove buttons that no longer apply. This is essential to conversational usability."
        },
        "pause": 3500
      },

      {
        "action": {
          "type": "channel.activate",
          "id": "docflow"
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
          "channel": "docflow",
          "message": {
            "id": "a1m1",
            "author": "docflow",
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
        "annotation": {
          "user": "u2",
          "role": "Reviewers",
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
          "channel": "docflow",
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
          "role": "Reviewers",
          "text": "are prompted to provide additional details for their decision, including steps to remedy rejected documents. The submitter will then be notified to resubmit the fixed document."
        },
        "pause": 3500
      },

      //submit the dialog (the `text` replaces the message text and buttons for the message that launched the dialog)
      {
        "action": {
          "type": "dialog.submit",
          "channel": "docflow",
          "action": "deny",
          "message": {
            "id": "a1m1",
            "author": "docflow",
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
          "channel": "docflow"
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