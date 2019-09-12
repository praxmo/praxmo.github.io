
/**
 *
 * a data-driven emulator for slack; the static test model
 */
var slack_data = {

  workspace: {
    id: "w1",
    title: "intwixt"
  },

  activeUserId: "u1",
  users: {
    a1: {
      id:"a1",
      title: "Unboxed",
      avatar: "a1.png"
    },
    u1: {
      id:"u1",
      title: "Luke",
      avatar: "u1.png"
    },
    u2: {
      id:"u2",
      title: "Thomas",
      avatar: "u2.png"
    },
    u3: {
      id:"u3",
      title: "Sabin",
      avatar: "u3.png"
    }
  },

  activeChannelId: 'c1',
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

  //text input value (used for submitting new content)
  input:""
};

/**
 * holds reference to the examples
 */
var examples = {};



//BOX example
examples.document = new Vue({
  el: '#slack',
  data: slack_data,
  computed: {
    activeChannelIdComponent: function () {
      return 'tab-' + this.activeChannelId.toLowerCase()
    }
  },
  methods: {
    addItem: function() {
      this.items.push("Item #"+this.items.length);
      this.scrollToEnd();
    },
    scrollToEnd: function() {
      var container = this.$el.querySelector(".messages");
      Vue.nextTick(function() {
        container.scrollTop = container.scrollHeight + 1000;
      });
    },
    setActiveChannel: function(channel_id) {
      this.activeChannelId = channel_id;
      this.scrollToEnd();
    },
    send_message: function() {
      var target = this.channels[this.activeChannelId].messages;
      var timestamp = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
      var id = this.activeChannelId + "m" + new Date();
      target[id] = {
        id: id,
        author: this.activeUserId,
        timestamp: timestamp,
        text: this.input
      };
      //clear out text
      this.input = "";
      this.scrollToEnd();
    },
    act: function(channel, message, action) {
      var my = this;
      setTimeout(function() {
        var text = "✔️ You clicked the "  + action.id.toUpperCase() + " button.!";
        my.update_message(channel.id, message.id, text);
      },150);
    },
    update_message: function(channel_id, message_id, text) {
      var target = this.channels[this.activeChannelId].messages[message_id];
      delete target.actions;
      target.timestamp = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
      target.text = text;
    }
  }
});