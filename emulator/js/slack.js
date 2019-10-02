//copyright 2019 Intwixt, Inc. All rights reserved

/**
 * global pointer to all stories being told; each story is a Vue instance with its own UI and data source
 */
var stories = {};


/**
 * Call to initialize the emulator
 *
 * @param id {string} must be a unique identifier for the instance; do not call 'emulate' unless this is unique
 * @param selector {string} CSS selector ('#myhtmltagid')
 * @param story {object} story JSON
 * @param [config] {object} optional configuration
 * @param [config.autoplay] {boolean} start on render
 */
function emulate(id, selector, story, config) {
  //pointer to the canvas rendering engine
  var graph_renderer = "";
  story.id = id;
  story.graph = "";
  stories[id] = new Vue({
    el: selector,
    components: {
      "my-solution-emulator": {
        template: "#solution-emulator",
        data: function() {
          return story;
        },
        mounted: function () {
          this.$nextTick(function () {
            if(this.story_board.state === "playing") {
              this.play_all();
            }
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
              if (action.type === 'annotation.hide') {
                this.annotation.user = "";
                this.annotation.role = "";
                this.annotation.text = "";
              } else if (action.type === 'story.replay') {
                this.story_board.index = -1;
              } else if (action.type === 'panel.activate') {
                this.set_active_panel(action.id);
              } else if (action.type === 'channel.activate') {
                this.set_active_channel(this.activePanelId, action.id);
              } else if (action.type === 'message.send') {
                target = this.panels[this.activePanelId].channels[this.panels[this.activePanelId].activeChannelId].messages;
                this.send_formatted_message(target, action.message.id, this.clone(action.message));
              } else if (action.type === 'message.append') {
                target = this.panels[this.activePanelId].channels[this.panels[this.activePanelId].activeChannelId].messages[action.message.id];
                this.update_message(target, action.message, true);
              } else if (action.type === 'file.activate') {
                this.show_file_prompt(this.activePanelId, action.filename, action.message, event.pause);
                this.story_board.index = this.story_board.index + 1;
                return;
              } else if (action.type === 'file.upload') {
                this.before_file_upload(this.activePanelId, action.filename, action.message);
              } else if (action.type === 'action.click') {
                target = this.panels[this.activePanelId].channels[this.panels[this.activePanelId].activeChannelId].messages[action.message.id];
                this.do_act(target, this.clone(action.message), target.actions[action.action]);
              } else if (action.type === 'dialog.trigger') {
                target = this.panels[this.activePanelId].channels[this.panels[this.activePanelId].activeChannelId].messages[action.message];
                this.show_dialog(target, action.action, this.clone(action.dialog), event.pause);
                this.story_board.index = this.story_board.index + 1;
                return;
              } else if (action.type === 'dialog.submit') {
                this.before_dialog_submit(this.activePanelId, action.action, this.clone(action.message));
              } else if (action.type === 'channel.clear') {
                target = this.panels[action.panel].channels[action.channel];
                this.$set(target, "messages", {});
              } else if (action.type === 'graph.highlight') {
                this.highlight(action.activity);
              } else if (action.type === 'graph.walk') {
                this.highlight_each(action.activity);
              }
              this.story_board.index = this.story_board.index + 1;
              if(this.story_board.step && event.step_next) {
                var my = this;
                setTimeout(function() {
                  my.play(false, true);
                }, event.pause);
              } else {
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
              if(graph_renderer) {
                graph_renderer.stop();
              }
              this.graph = target.graph;
              graph_renderer = drawStaticConstellation(
                target.graph,
                {animate: true, size: 80, fps: 20, line_width: 5, annotate:true},
                '#viewport_runner_' + this.id + '_' + panel_id,
                '#viewport_' + this.id + '_' + panel_id,
                '#viewport_' + this.id + '_' + panel_id
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

          //when a dialog is triggered
          show_dialog: function(target, action_id, dialog, pause) {
            var my = this;
            this.emphasize(target.actions[action_id]);
            setTimeout(function () {
              dialog.active = true;
              my.$set(my.panels[my.activePanelId], "dialog", dialog);
              var target = my.panels[my.activePanelId].dialog;
              var target_field = target.fields[dialog.target_field];
              var value = target_field.value;
              target_field.value = "";
              setTimeout(function () {
                my.typing(target, "value", value, 0, 150, pause);
              }, 1000);
            }, 1250);
          },

          //when the submit button is clicked
          before_dialog_submit: function(panel_id, action_id, message) {
            this.emphasize(this.panels[panel_id].dialog, "submitting");
            var my = this;
            setTimeout(function() {
              my.do_dialog_submit(panel_id, action_id, message);
            },500);
          },

          //submit the dialog (dismiss the dialog panel)
          do_dialog_submit: function(panel_id, action_id, message) {
            this.panels[panel_id].dialog.active = false;
            var target = this.panels[panel_id].channels[this.panels[panel_id].activeChannelId].messages[message.id];
            var my = this;
            setTimeout(function() {
              my.update_message(target, message, false);
            }, 1500);
          },

          //dismiss the file upload panel
          cancel_dialog_submit: function(panel_id) {
            this.panels[panel_id].dialog.active = false;
          },

          //when the file upload paperclip is clicked
          show_file_prompt: function(panel_id, filename, message, pause) {
            var my = this;
            this.emphasize(this.panels[panel_id].file);
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

          //when the 'upload' button is clicked inside the modal
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
              my.update_message(target, {text:text}, false);
            },700);
          },

          //when an action button is clicked
          do_act: function(target, message, action) {
            var my = this;
            this.emphasize(action);
            setTimeout(function() {
              my.update_message(target, message, false);
            },700);
          },

          //update an existing message
          update_message: function(target, message, b_append) {
            target.timestamp = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
            //remove the buttons from the message (assume any update invalidates the action buttons)
            delete target.actions;
            delete target.fields;

            if(b_append) {
              target.text = target.text + "<br>" + message.text;
            } else {
              target.text = message.text;
              target.fields = message.fields;
              target.actions = message.actions;
            }
            this.emphasize(target);
            var my = this;
            Vue.nextTick(function() {
              my.scroll_to_end();
            });
          },

          //pulse an activity in the graph to draw attention
          highlight: function(activity_id) {
            graph_renderer.beep(activity_id);
          },

          //pulse the activities in a graph to draw attention to the flow/sequence
          highlight_each: function(start_activity_id) {
            this.traverse_graph(this.activePanelId, start_activity_id, 4000);
          },

          traverse_graph: function(target_panel, start, delay, next) {
            if(target_panel === this.activePanelId) {
              var my = this;
              var target = next || start;
              graph_renderer.beep(target);
              next = this.graph.edges[target];
              if (next) {
                var kids = Object.keys(next);
                var len = kids.length;
                if (len === 1) {
                  setTimeout(function () {
                    my.traverse_graph(target_panel, start, delay, kids[0]);
                  }, delay);
                } else {
                  var amt = Math.random() * len;
                  var index = parseInt(amt);
                  setTimeout(function () {
                    my.traverse_graph(target_panel, start, delay, kids[index]);
                  }, delay);
                }
              } else {
                //cycle again
                setTimeout(function () {
                  my.traverse_graph(target_panel, start, delay);
                }, delay * 2);
              }
            }
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
              setTimeout(function() {
                my.play();
              }, this.story_board.step ? 0 : pause);
            }
          }
        }
      }
    }
  });
}