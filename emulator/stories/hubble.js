var hubble = {

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
      "avatar": "a1.png"
    },
    "a1": {
      "id": "a1",
      "title": "Acme - Sales",
      "avatar": "hubble.png"
    },
    "a2": {
      "id": "a2",
      "title": "Aito.ai",
      "avatar": "aito.png"
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
          "title": "sales-mgrs",
          "private": true,
          "members": 17,
          "pins": 8,
          "description": "Manage sales teams",
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
          "title": "Acme - Sales",
          "avatar": "hubble.png",
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
          "title": "sales-reps",
          "private": true,
          "members": 17,
          "pins": 8,
          "description": "Shared channels for SRs",
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
          "title": "Acme - Sales",
          "avatar": "hubble.png",
          "private": true,
          "messages": {}
        }
      }
    },

    //this panel is used for showing a static image (like a screenshot of the box workspace)
    "p5": {
      "id": "p5",
      "type": "image",
      "src": "/img/screenshots/hubble_1.png"
    },

    //this panel shows the intwixt emulator (this is the one that depicts the file upload workflow)
    "p2": {
      "id": "p2",
      "type": "intwixt",
      "graph": {
        "nodes": {
          "activity_1": {
            "title": "HubSpot | Deal Created",
            "star": "HubSpot.1",
            "definition": "trigger-deal_created",
            "verb": "post",
            "p": {
              "x": 0.618,
              "y": 0.205
            },
            "trigger": true
          },
          "activity_2": {
            "title": "Get Company Details",
            "star": "HubSpot.1",
            "definition": "activity-getcompanyproperties",
            "verb": "get",
            "p": {
              "x": 0.347,
              "y": 0.277
            },
            "async": true,
            "iterable": true
          },
          "activity_3": {
            "title": "Get Deal Details",
            "star": "HubSpot.1",
            "definition": "activity-getdeal",
            "verb": "get",
            "p": {
              "x": 0.155,
              "y": 0.431
            },
            "async": true
          },
          "activity_4": {
            "title": "Aito | Predict Best Rep",
            "star": "Aito.1",
            "definition": "activity-predict",
            "verb": "post",
            "p": {
              "x": 0.132,
              "y": 0.655
            },
            "async": true
          },
          "activity_5": {
            "title": "Get Predicted Rep Profile",
            "star": "Slack.1",
            "definition": "activity-get_user_info",
            "verb": "get",
            "p": {
              "x": 0.305,
              "y": 0.723
            },
            "async": true
          },
          "activity_6": {
            "title": "Ask Managers to Assign",
            "star": "Slack.1",
            "definition": "activity-ask_choice_with_blockkit",
            "verb": "post",
            "p": {
              "x": 0.563,
              "y": 0.751
            },
            "async": true,
            "iterate": true
          },
          "activity_7": {
            "title": "Assign Deal",
            "star": "HubSpot.1",
            "definition": "activity-updatedeal",
            "verb": "put",
            "p": {
              "x": 0.67,
              "y": 0.893
            },
            "async": true
          },
          "activity_8": {
            "title": "Update Message | Show Chosen Rep",
            "star": "Slack.1",
            "definition": "activity-respond_with_ask_choice_with_blockkit",
            "verb": "post",
            "p": {
              "x": 0.42,
              "y": 0.969
            },
            "async": true
          },
          "activity_9": {
            "title": "Intercom | Get Company Detail",
            "star": "Intercom.1",
            "definition": "activity-getcompany",
            "verb": "get",
            "p": {
              "x": 0.734,
              "y": 0.642
            },
            "async": true
          },
          "activity_10": {
            "title": "Send Expanded Profile to Managers",
            "star": "Slack.1",
            "definition": "activity-send_message_with_blockkit",
            "verb": "post",
            "p": {
              "x": 0.892,
              "y": 0.475
            },
            "async": true
          },
          "activity_11": {
            "title": "Start Assignee Worfklow",
            "star": ".learning-1-36939.1",
            "definition": "activity_1",
            "verb": "post",
            "p": {
              "x": 0.864,
              "y": 0.972
            },
            "icon_font": {
              "class": "fa-check",
              "code": "",
              "family": "FontAwesome"
            }
          }
        },
        "edges": {
          "activity_1": {
            "activity_2": {
              "length": 1
            }
          },
          "activity_2": {
            "activity_3": {
              "length": 1
            }
          },
          "activity_3": {
            "activity_4": {
              "length": 1
            }
          },
          "activity_4": {
            "activity_5": {
              "length": 1
            }
          },
          "activity_5": {
            "activity_6": {
              "length": 1
            }
          },
          "activity_6": {
            "activity_7": {
              "length": 1,
              "condition": true
            },
            "activity_9": {
              "length": 1,
              "condition": true
            }
          },
          "activity_7": {
            "activity_8": {
              "length": 1
            },
            "activity_11": {
              "length": 1
            }
          },
          "activity_9": {
            "activity_10": {
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
        "annotation": {
          "user": "a0",
          "role": "Intwixt",
          "text": "turns Slack into a <b>business process engine</b>, optimizing the customer journey directly in Slack."
        },
        //when the user clicks 'play all' this defines how long to wait before running the next step
        "pause": 6000 //6000
      },

      //activate a channel
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

      //send a message
      {
        "action": {
          "type": "message.send",
          "channel": "c1",
          "message": {
            "id": "c1m1",
            "author": "a1",
            "timestamp": "9:21 AM",
            "text": "👍 A new deal was just created in HubSpot!<br>🤖 <b>Amit</b> usually closes deals like this in 6 weeks.",
            "fields": [
              {title: "Company"},
              {title: "Intel, Inc."},
              {title: "Employees"},
              {title: "110,000"}
            ],
            "actions": {
              "review": {
                "id": "review",
                "title": "View Deal"
              },
              "assign": {
                "id": "assign",
                "title": "Assign to Amit"
              },
              "choose": {
                "id": "choose",
                "type":"select",
                "title": "Choose SR"
              }
            }
          }
        },
        "annotation": {
          "user": "u1",
          "role": "Sales Managers",
          "text": "are notified when new deals are created in HubSpot. The <b>AI agent</b> recommends sales reps (SRs) based upon past performance."
        },
        "pause": 3500,
        "step_next": false
      },

      {
        "action": {
          "type": "annotation.hide"
        },
        "pause": 750,
        "step_next": true
      },

      {
        "action": {
          "type": "annotation.show"
        },
        "annotation": {
          "user": "u1",
          "role": "Sales Managers",
          "text": "can view deal details directly in Slack and can optionally choose a different SR. The AI agent augments the interaction, while <b>managers make the final call</b>."
        },
        "pause": 3500
      },

      {
        "action": {
          "type": "annotation.hide"
        },
        "pause": 250,
        "step_next": true
      },

      //click an action button in a message
      {
        "action": {
          "type": "action.click",
          "channel": "a1",
          "action": "assign",
          "message": {
            "id": "c1m1",
            "author": "a1",
            "timestamp": "9:30 AM",
            "text": "Intel Deal (HubSpot Deal <a href='#'>1025480752</a>) status:<br><b>✔ UPDATED</b> by @Ben at 09:30 AM<br><b>✔ ASSIGNED</b> to @Amit at 09:30 AM",
            "actions": {
              "review": {
                "id": "review",
                "title": "View Deal"
              }
            }
          }
        },
        "annotation": {
          "user": "u1",
          "role": "Sales Managers",
          "text": "see the deal update directly in Slack. Real-time updates to interactive messages are critical to conversational usability, helping avoid confusion on shared channels."
        },
        "pause": 3500
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
          "text": "use the visual designer to configure workflows. This 'no-code' approach makes it possible for even business users to define rules. This particular workflow is triggered when a deal is added to HubSpot."
        },
        "pause": 7500
      },

      {
        "action": {
          "type": "annotation.hide"
        },
        "pause": 750,
        "step_next": true
      },

      {
        "action": {
          "type": "graph.highlight",
          "activity": "activity_4"
        },
        "annotation": {
          "user": "a2",
          "role": "AI Services",
          "text": "can be integrated into any process to make predictions that sales managers might otherwise overlook."
        },
        "pause": 3500
      },

      {
        "action": {
          "type": "panel.activate",
          "id": "p3"
        },
        "annotation": {
          "user": "a2",
          "role": "AI Services",
          "text": "are trained in a separate workflow. Each time a deal successfully closes, information about the deal and the sales rep are passed along. The more data provided to the AI, the more accurate the predictions"
        },
        "pause": 6500
      },

      {
        "action": {
          "type": "panel.activate",
          "id": "p5"
        },
        "annotation": {
          "user": "a2",
          "role": "Aito.ai",
          "text": "is an AI-enabled database that can be updated using historical data to help make accurate predictions from the get-go."
        },
        "pause": 5000
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
          "type": "annotation.show"
        },
        "annotation": {
          "user": "a0",
          "role": "Intwixt",
          "text": "makes it easy to train the AI services, using the same conversational style. Here the information is sent to Aito for bulk updates."
        },
        "pause": 5000
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
          "id": "a1"
        },
        "annotation": {
          "user": "u3",
          "role": "Sales Reps",
          "text": "are contacted directly by the bot when deals are assigned."
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
            "author": "a1",
            "timestamp": "10:40 AM",
            "text": "📝 You were just assigned a deal. Press <b>Refresh</b> to begin.",
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