var omni = {

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
    "slack": {
      "id": "slack",
      "title": "Slack",
      "avatar": "slack.png"
    },
    "box": {
      "id": "box",
      "title": "Box.com",
      "avatar": "box.png"
    },
    "twilio": {
      "id": "twilio",
      "title": "Twilio",
      "avatar": "twilio.png"
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
          "pins": 6,
          "description": "Manage sales teams",
          "unread": 2,
          "messages": {}
        },
        "c3": {
          "id": "c3",
          "title": "sales-reps",
          "private": true,
          "members": 32,
          "pins": 12,
          "description": "Sales team members",
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

      "activeUserId": "u2",

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

      "activeChannelId": "a1",
      "channels": {
        "c1": {
          "id": "c1",
          "title": "sales-mgrs",
          "private": true,
          "members": 17,
          "pins": 6,
          "description": "Sales team managers",
          "unread": 2,
          "messages": {}
        },
        "c3": {
          "id": "c3",
          "title": "sales-reps",
          "private": true,
          "members": 32,
          "pins": 12,
          "description": "Sales team members",
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
      "src": "/img/screenshots/omni_2.png",
      "halign": "center"
    },

    //this panel shows the intwixt emulator (this is the one that depicts the file upload workflow)
    "p2": {
      "id": "p2",
      "type": "intwixt",
      "graph": {
        "nodes": {
          "activity_1": {
            "title": "Ask Rep to Accept Lead",
            "star": "Receive.1",
            "definition": "receive",
            "verb": "post",
            "p": {
              "x": 0.324,
              "y": 0.223
            },
            "trigger": true,
            "image": {
              "src": "/stars/Receive.1/image_96"
            },
            "icon_font": {
              "class": "fa-question",
              "code": "",
              "family": "FontAwesome"
            }
          },
          "activity_2": {
            "title": "Get Deal Profile",
            "star": "HubSpot.1",
            "definition": "activity-getdeal",
            "verb": "get",
            "p": {
              "x": 0.584,
              "y": 0.247
            }
          },
          "activity_3": {
            "title": "Get Sales Rep Profile",
            "star": "Slack.1",
            "definition": "activity-get_user_info",
            "verb": "get",
            "p": {
              "x": 0.67,
              "y": 0.456
            },
            "async": true
          },
          "activity_4": {
            "title": "Ask to Accept (SMS)",
            "star": "Twilio.1",
            "definition": "ask_choice",
            "verb": "post",
            "p": {
              "x": 0.411,
              "y": 0.518
            },
            "long_running": true
          },
          "activity_5": {
            "title": "Ask to Accept (Slack)",
            "star": "Slack.1",
            "definition": "activity-respond_with_ask_choice_with_blockkit",
            "verb": "post",
            "p": {
              "x": 0.903,
              "y": 0.541
            },
            "long_running": true
          },
          "activity_6": {
            "title": "Audit | Get Slack Message ID",
            "star": "Audit.1",
            "definition": "audit",
            "verb": "get",
            "p": {
              "x": 0.146,
              "y": 0.576
            }
          },
          "activity_7": {
            "title": "Cleanup Slack Message",
            "star": "Slack.1",
            "definition": "activity-send_message_with_blockkit",
            "verb": "post",
            "p": {
              "x": 0.158,
              "y": 0.849
            }
          },
          "activity_8": {
            "title": "Cleanup Slack Message",
            "star": "Slack.1",
            "definition": "activity-send_message_with_blockkit",
            "verb": "post",
            "p": {
              "x": 0.885,
              "y": 0.849
            }
          },
          "activity_9": {
            "title": "Accept Lead",
            "star": ".intwixt-1-41266.1",
            "definition": "activity_1",
            "verb": "post",
            "p": {
              "x": 0.306,
              "y": 0.928
            },
            "icon_font": {
              "class": "fa-check",
              "code": "",
              "family": "FontAwesome"
            }
          },
          "activity_10": {
            "title": "Accept Lead",
            "star": ".intwixt-1-41266.1",
            "definition": "activity_1",
            "verb": "post",
            "p": {
              "x": 0.764,
              "y": 0.928
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
            },
            "activity_5": {
              "length": 1
            }
          },
          "activity_4": {
            "activity_6": {
              "length": 1
            }
          },
          "activity_6": {
            "activity_7": {
              "length": 1
            }
          },
          "activity_5": {
            "activity_8": {
              "length": 1
            }
          },
          "activity_7": {
            "activity_9": {
              "length": 1
            }
          },
          "activity_8": {
            "activity_10": {
              "length": 1
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
    "cta": 4,

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
          "text": "turns any messaging channel into a <b>business process engine</b>, extending the capabilities of even legacy channels like email and SMS."
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
          "user": "u1",
          "role": "Sales Managers",
          "text": "are notified when new leads are added to HubSpot and need to be assigned."
        },
        "pause": 1500,
        "step_next":true
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
            "text": "❗Please assign the <a href='#'>Intel</a> lead.<br>🤖 The AI service recommends <b>Sandy</b> as the best Sales Rep to close this deal.",
            "fields": [
              {title: "Company"},
              {title: "Intel, Inc."},
              {title: "Employees"},
              {title: "110,000"}
            ],
            "actions": {
              "review": {
                "id": "review",
                "title": "View Lead"
              },
              "assign": {
                "id": "assign",
                "title": "Assign to Sandy"
              },
              "choose": {
                "id": "choose",
                "type":"select",
                "title": "Choose SR"
              }
            }
          }
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

      //click an action button in a message
      {
        "action": {
          "type": "action.click",
          "channel": "a1",
          "action": "assign",
          "message": {
            "id": "c1m1",
            "author": "a1",
            "timestamp": "9:50 AM",
            "text": "<a href='#'>Intel, Inc</a> deal status:<br><b>✔ CREATED</b> at 08:20 AM<br><b>✔ ASSIGNED</b> to Sandy at 09:50 AM",
            "actions": {
              "review": {
                "id": "review",
                "title": "View in HubSpot"
              }
            }
          }
        },
        "annotation": {
          "user": "u1",
          "role": "Sales Managers",
          "text": "see immediate updates when other managers assign a lead, ensuring there is no confusion in the shared channel."
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
          "role": "Intwixt",
          "text": "provides a visual designer that can be used to design sophisticated business processes. This particular workflow is triggered when a sales manager assigns a lead to a sales rep."
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
          "activity": "activity_1"
        },
        "annotation": {
          "user": "u2",
          "role": "Sales Reps",
          "text": "often travel and can have unpredictable Internet access when they're away. When deal flow matters most, it's possible to send multiple messages for optimal channel coverage."
        },
        "pause": 5500
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
          "user": "twilio",
          "role": "SMS",
          "text": "can be used to reach traveling sales reps with limited Internet connectivity."
        },
        "pause": 5500
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
          "activity": "activity_5"
        },
        "annotation": {
          "user": "slack",
          "role": "Slack",
          "text": "is also used, given its superior APIs and robust interactive messages. The sales rep will ultimately receive two real-time, interactive messages: one on Slack and one on SMS."
        },
        "pause": 5500
      },

      {
        "action": {
          "type": "panel.activate",
          "id": "p5"
        },
        "annotation": {
          "user": "twilio",
          "role": "SMS",
          "text": "messages have fewer bells-and-whistles than Slack messages. But Intwixt's <b>Enterprise Conversation Platform</b> (ECP) is still able to provide stateful, long-running interactions like asking a question."
        },
        "pause": 5000
      },

      {
        "action": {
          "type": "panel.activate",
          "id": "p2"
        },
        "pause": 750,
        "step_next": true
      },

      {
        "action": {
          "type": "graph.highlight",
          "activity": "activity_6"
        },
        "annotation": {
          "user": "a0",
          "role": "Intwixt",
          "text": "provides specialized activities that can audit the active workflow and properly cleanup pending interactive messages. In this case the the sales rep responded over SMS, necessitating cleanup of the Slack message."
        },
        "pause": 3500
      },

      {
        "action": {
          "type": "panel.activate",
          "id": "p4"
        },
        "annotation": {
          "user": "u2",
          "role": "Sales Reps",
          "text": "are often very busy, receiving multiple interactive messages at a time."
        },
        "pause": 2500,
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
            "text": "❗You've been assigned the the <a href='#'>Intel</a> lead. Please respond within the hour.",
            "fields": [
              {title: "Company"},
              {title: "Intel, Inc."},
              {title: "Employees"},
              {title: "110,000"}
            ],
            "actions": {
              "review": {
                "id": "review",
                "title": "View Lead"
              },
              "accept": {
                "id": "accept",
                "title": "Accept"
              },
              "decline": {
                "id": "decline",
                "title": "Decline"
              }
            }
          }
        },
        "pause": 3500
      },

      {
        "action": {
          "type": "annotation.hide"
        },
        "pause": 750,
        "step_next": true
      },

      //click an action button in a message
      {
        "action": {
          "type": "action.click",
          "channel": "a1",
          "action": "accept",
          "message": {
            "id": "a1m1",
            "author": "a1",
            "timestamp": "9:55 AM",
            "text": "You've claimed the <a href='#'>Intel, Inc</a> deal:<br><b>✔ CREATED</b> at 08:20 AM<br><b>✔ ASSIGNED</b> to you at 09:50 AM<br><b>✔ CLAIMED</b> by you at 09:55 AM",
            "actions": {
              "review": {
                "id": "review",
                "title": "View in HubSpot"
              }
            }
          }
        },
        "annotation": {
          "user": "u2",
          "role": "Sales Reps",
          "text": "see real-time updates and cleanup of all interactive messages--even when another channel like SMS is used. This helps to avoid confusion and keep the sales rep focused on their deals."
        },
        "pause": 3500
      },

      {
        "action": {
          "type": "annotation.hide"
        },
        "pause": 750,
        "step_next": true
      }

    ]
  }
};