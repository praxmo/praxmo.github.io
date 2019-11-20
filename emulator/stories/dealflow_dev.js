var dealflow_dev = {

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
    "dealflow": {
      "id": "dealflow",
      "title": "Intwixt DealFlow",
      "avatar": "dealflow_96.png"
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
  "activePanelId": "p4",

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
        "dealflow": {
          "id": "dealflow",
          "is_dm": true,
          "title": "Intwixt DealFlow",
          "avatar": "dealflow_96.png",
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
        "dealflow": {
          "id": "dealflow",
          "is_dm": true,
          "title": "Intwixt DealFlow",
          "avatar": "dealflow_96.png",
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

    //this panel is used for showing a static image (like a screenshot of the box workspace)
    "p6": {
      "id": "p6",
      "type": "image",
      "src": "/img/screenshots/hubble_2.png"
    },

    //this panel shows the intwixt emulator (this is the one that depicts the file upload workflow)
    "p2": {
      "id": "p2",
      "type": "intwixt",
      "graph": {
        "nodes": {
          "activity_1": {
            "title": "Lead Claim Timeout",
            "star": "Receive.1",
            "definition": "receive",
            "verb": "post",
            "p": {
              "x": 0.618,
              "y": 0.205
            },
            "trigger": true,
            "image": {
              "src": "/stars/Receive.1/image_96"
            },
            "icon_font": {
              "id": "ic_alarm",
              "class": "alarm",
              "group_id": "action",
              "keywords": [
                "action",
                "alarm"
              ],
              "ligature": "alarm",
              "code": "",
              "family": "'Material Icons'"
            }
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
            "title": "Get Lead Details",
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
            "title": "AI | Predict Best Rep",
            "star": "Aito.1",
            "definition": "activity-predict",
            "verb": "post",
            "p": {
              "x": 0.162,
              "y": 0.655
            },
            "async": true
          },
          "activity_5": {
            "title": "Get Rep Profile",
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
            "iterable": true
          },
          "activity_7": {
            "title": "Assign Lead",
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
              "x": 0.32,
              "y": 0.969
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
              "y": 0.988
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
            }
          },
          "activity_7": {
            "activity_8": {
              "length": 1
            },
            "activity_11": {
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
          "activity_13": {
            "title": "HubSpot | On Deal Closed",
            "star": "HubSpot.1",
            "definition": "trigger-deal_updated",
            "verb": "post",
            "p": {
              "x": 0.461,
              "y": 0.204
            },
            "trigger": true
          },
          "activity_14": {
            "title": "Get User Info",
            "star": "Slack.1",
            "definition": "activity-get_user_info",
            "verb": "get",
            "p": {
              "x": 0.626,
              "y": 0.961
            },
            "async": true
          },
          "activity_17": {
            "title": "Deal Closed | Get Info",
            "star": "HubSpot.1",
            "definition": "activity-getdeal",
            "verb": "get",
            "p": {
              "x": 0.202,
              "y": 0.301
            },
            "async": true
          },
          "activity_18": {
            "title": "Get Company Info",
            "star": "HubSpot.1",
            "definition": "activity-getcompany",
            "verb": "get",
            "p": {
              "x": 0.138,
              "y": 0.63
            },
            "async": true
          },
          "activity_19": {
            "title": "Get Company Info",
            "star": "Intercom.1",
            "definition": "activity-getcompany",
            "verb": "get",
            "p": {
              "x": 0.334,
              "y": 0.879
            },
            "async": true
          },
          "activity_20": {
            "title": "Train AI",
            "star": "Aito.1",
            "definition": "activity-add_data_entry",
            "verb": "post",
            "p": {
              "x": 0.882,
              "y": 0.804
            },
            "async": true
          }
        },
        "edges": {
          "activity_19": {
            "activity_14": {
              "length": 1
            }
          },
          "activity_13": {
            "activity_17": {
              "length": 1,
              "condition": true
            }
          },
          "activity_17": {
            "activity_18": {
              "length": 1
            }
          },
          "activity_18": {
            "activity_19": {
              "length": 1
            }
          },
          "activity_14": {
            "activity_20": {
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

    "href": {
      "try":"",
      "own":"javascript:alert('Please contact us to get started. We will copy the source files to your Intwixt account and give you tips for extending to make it your own.');"
    },

    //this is the index for which event to start at; it is possible to update this during testing to bypass prior steps
    "index": 20,

    //these are the events for the story; each event has a `type` that further defines the inputs needed
    "events": [

      //activate a panel
      {
        "action": {
          "type": "panel.activate",
          "id": "p4"
        },
        "annotation": {
          "user": "dealflow",
          "role": "Intwixt DealFlow",
          "text": "optimizes new lead qualification, escalation and ownership, optimizing the customer journey directly in Slack."
        },
        //when the user clicks 'play all' this defines how long to wait before running the next step
        "pause": 6000 //6000
      },

      //activate a channel
      {
        "action": {
          "type": "channel.activate",
          "id": "c3"
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
          "channel": "c3",
          "message": {
            "id": "c3m1",
            "author": "dealflow",
            "timestamp": "8:20 AM",
            "text": "🔥 A new lead was added to HubSpot. Please claim if it's a match.",
            "fields": [
              {title: "<b>Company</b>"},
              {title: "Intel, Inc."},
              {title: "<b>Employees</b>"},
              {title: "110,000"},
              {title: "<b>Location</b>"},
              {title: "Santa Clara, CA"},
              {title: "...", full_width:true}
            ],
            "actions": {
              "claim": {
                "id": "claim",
                "title": "Claim Lead"
              },
              "review": {
                "id": "review",
                "title": "Check Intercom"
              }
            }
          }
        },
        "annotation": {
          "user": "u2",
          "role": "Sales Reps",
          "text": "are notified when new leads are created in CRM systems like <b>HubSpot</b>. They can view merged details directly in-channel, including content sourced from data enrichment systems like <b>Intercom</b>."
        },
        "pause": 6000,
        "step_next": false
      },

      {
        "action": {
          "type": "annotation.hide"
        },
        "pause": 250,
        "step_next": true
      },

      {
        "action": {
          "type": "action.click",
          "channel": "dealflow",
          "action": "review",
          "message": {
            "id": "c3m1",
            "author": "dealflow",
            "timestamp": "8:30 AM",
            "text": "🔥 A new lead was added to HubSpot. Please claim if it's a match.",
            "fields": [
              {title: "<b><a href='#'>HUBSPOT PROFILE</a></b>", full_width:true},
              {title: "<b>Company</b>"},
              {title: "Intel, Inc."},
              {title: "<b><a href='#'>INTERCOM PROFILE</a></b>", full_width:true},
              {title: "<b>Web Sessions</b>"},
              {title: "22"},
              {title: "<b>Last Visit</b>"},
              {title: "Oct 2, 2019"},
              {title: "...", full_width:true}
            ],
            "actions": {
              "claim": {
                "id": "claim",
                "title": "Claim Lead"
              }
            }
          }
        },
        "annotation": {
          "user": "u2",
          "role": "Sales Reps",
          "text": "work together in the same Slack channel. This keeps the information flowing regardless of who's online or away from their desk."
        },
        "pause": 6000
      },

      {
        "action": {
          "type": "annotation.hide"
        },
        "pause": 250,
        "step_next": true
      },

      {
        "action": {
          "type": "message.update",
          "channel": "dealflow",
          "message": {
            "id": "c3m1",
            "author": "dealflow",
            "timestamp": "8:30 AM",
            "text": "🔥 A new lead was added to HubSpot. Please claim if it's a match.",
            "fields": [
              {title: "<b><a href='#'>HUBSPOT PROFILE</a></b>", full_width:true},
              {title: "<b>Company</b>"},
              {title: "Intel, Inc."},
              {title: "<b><a href='#'>INTERCOM PROFILE</a></b>", full_width:true},
              {title: "<b>Web Sessions</b>"},
              {title: "22"},
              {title: "...", full_width:true},
              {title: "❗ This lead was not claimed in time and has been escalated to the sales management team.", full_width:true}
            ]
          }
        },
        "annotation": {
          "user": "u2",
          "role": "Sales Reps",
          "text": "are notified directly in-channel whenever the lead is updated. In this case, no one claimed the lead in time, causing the issue to escalate. Timeouts and exception handling are critical components of a well-designed business process."
        },
        "pause": 3500
      },

      {
        "action": {
          "type": "annotation.hide"
        },
        "pause": 1000,
        "step_next": true
      },

      //activate a panel
      {
        "action": {
          "type": "panel.activate",
          "id": "p1"
        },
        "pause": 1750,
        "step_next": true
      },

      //activate a channel
      {
        "action": {
          "type": "channel.activate",
          "id": "c1"
        },
        "pause": 1500,
        "step_next": true
      },

      //send a message
      {
        "action": {
          "type": "message.send",
          "channel": "c1",
          "message": {
            "id": "c1m1",
            "author": "dealflow",
            "timestamp": "9:21 AM",
            "text": "🔥 A new lead was created in HubSpot but was not claimed in time.",
            "fields": [
              {title: "Company"},
              {title: "Intel, Inc."},
              {title: "Employees"},
              {title: "110,000"},
              {title: "🤖 The AI service suggests <b>Sandy</b> is the best rep to own it.", full_width:true}
            ],
            "actions": {
              "assign": {
                "id": "assign",
                "title": "Assign to Sandy"
              },
              "choose": {
                "id": "choose",
                "type":"select",
                "title": "Choose"
              }
            }
          }
        },
        "annotation": {
          "user": "u1",
          "role": "Sales Managers",
          "text": "are notified when new leads aren't claimed in time. The integrated <b>AI service</b> augments the interaction to help expedite the process. In this case, the AI service recommends a sales rep based upon company size, industry, and other factors. The more data, the more accurate the prediction."
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

      {
        "action": {
          "type": "annotation.show"
        },
        "annotation": {
          "user": "u1",
          "role": "Sales Managers",
          "text": "can choose to assign the lead to the suggested sales rep or they can override the suggestion. Their choice is used to further train the AI service, leading to better future predictions."
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
          "channel": "dealflow",
          "action": "assign",
          "message": {
            "id": "c1m1",
            "author": "dealflow",
            "timestamp": "9:21 AM",
            "text": "🔥 A new lead was created in HubSpot but was not claimed in time.",
            "fields": [
              {title: "Company"},
              {title: "Intel, Inc."},
              {title: "Employees"},
              {title: "110,000"},
              {title: "🤖 The AI service suggests <b>Sandy</b> is the best rep to own it.", full_width:true},
              {title: "✔  Assigned to <b>Sandy Newsom</b>", full_width:true}
            ]
          }
        },
        "annotation": {
          "user": "u1",
          "role": "Sales Managers",
          "text": "see the lead update directly in Slack. Real-time updates to interactive messages are critical to conversational usability, helping avoid confusion on shared channels."
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
        "pause": 1500,
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
          "text": "can be integrated into any process to make predictions that end users might otherwise overlook. This particular process drives the <b>sales manager</b> interactions shown on the previous panel."
        },
        "pause": 3500,
        "step_next": false
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
          "type": "annotation.show"
        },
        "annotation": {
          "user": "dealflow",
          "role": "Intwixt DealFlow",
          "text": "is designed using Intwixt's modular, no-code platform. Please ask us about an enterprise license for a fully customized experience that matches how your organization manages the entire customer journey from qualification to close."
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

      //re-activate the sales manager workspace
      {
        "action": {
          "type": "panel.activate",
          "id": "p1"
        },
        "pause": 1500,
        "step_next": true
      },

      //activate the direct message channel with the bot
      {
        "action": {
          "type": "channel.activate",
          "id": "dealflow"
        },
        "pause": 1500,
        "step_next": true
      },

      //type a message to query the bot using NLP; it will be bound to the active user (sent by)
      {
        "action": {
          "type": "message.type",
          "channel": "dealflow",
          "message":  "How many leads came in today?"
        },
        "annotation": {
          "user": "u1",
          "role": "Sales Managers",
          "text": "can query DealFlow using natural language to get insight into new leads."
        },
        "pause": 2500,
        "step_next": true
      },

      //send a response message from the bot
      {
        "action": {
          "type": "message.send",
          "channel": "dealflow",
          "message": {
            "id": "dealflowm2",
            "author": "dealflow",
            "timestamp": "9:30 AM",
            "text": "So far, you've had 11 new leads come in today."
          }
        },
        "pause": 2500,
        "step_next": true
      },

      //type a message to query the bot using NLP; it will be bound to the active user (sent by)
      {
        "action": {
          "type": "message.type",
          "channel": "dealflow",
          "message":  "How many leads came in this month?"
        },
        "pause": 2500,
        "step_next":true
      },

      //send a response message from the bot
      {
        "action": {
          "type": "message.send",
          "channel": "dealflow",
          "message": {
            "id": "dealflowm4",
            "author": "dealflow",
            "timestamp": "9:30 AM",
            "text": "So far, you've had 423 new leads come in this month."
          }
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
          "id": "p4"
        },
        "pause": 0,
        "step_next":true
      },

      //set to a default state with no channels selected
      {
        "action": {
          "type": "channel.activate",
          "id": ""
        },
        "pause": 0,
        "step_next": true
      }
    ]
  }
};