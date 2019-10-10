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
  story.alert = "";
  story.story_board.href = story.story_board.href || {
    try: "",
    own: "javascript:alert('Please contact us to get started. We will copy the source files to your Intwixt account and give you tips for extending to make it your own.');"
  };
  stories[id] = new Vue({
    el: selector,
    components: {
      "my-solution-emulator": {
        template: '<div class="emulator"><div v-bind:class="[\'stepper\', { active: story_board.state === \'playing\' && story_board.step_next}]" title="Show next step" v-on:click="play(false, true);"><i class="fas fa-play fa-3x"></i></div><div class="runner"><div v-bind:class="[\'alert\', { active: alert}]"><div>{{alert}}</div></div><div v-bind:class="[\'story_overlay\', { active: story_board.state === \'idling\'}]"><div class="play"><div v-on:click="step_through()" title="Step through at my own pace" class="button step"><i class="fas fa-play fa-6x"></i><div class="label">Show Me</div></div></div></div><div v-bind:class="[{ active: story_board.state === \'played\' }]" class="story_overlay cta"><div class="blurb"> Multi-role. &nbsp; Multi-system. &nbsp; Unified in Slack. </div><div class="options"><div class="option try" v-if="story_board.cta === 1 || story_board.cta === 3 || story_board.cta === 5 || story_board.cta === 7"><label>Try the Slack App</label><div class="action"><a class="btn" target="_slack" v-bind:href="story_board.href.try">Add to Slack</a></div></div><div class="option own" v-if="story_board.cta === 2 || story_board.cta === 3 || story_board.cta === 5 || story_board.cta === 6 || story_board.cta === 7"><label>Own the Slack App*</label><div class="action"><a class="btn" v-bind:href="story_board.href.own">Get Started</a></div></div><div class="option call" v-if="story_board.cta === 4 || story_board.cta === 5 || story_board.cta === 6 || story_board.cta === 7"><label>Contact us</label><div class="links action"><div><a href="mailto:contact@intwixt.com"><i class="far fa-envelope"></i> contact@intwixt.com</a></div><div><a href="tel:650-603-0068"><i class="fas fa-phone"></i> 650-603-0068</a></div></div></div></div><div class="footnote" v-if="story_board.cta === 2 || story_board.cta === 3 || story_board.cta === 5 || story_board.cta === 6 || story_board.cta === 7">*Sign up for a free Intwixt account. We\'ll copy the source files and give you tips to get started. </div></div><div v-for="(panel, panel_id) in panels"><div :id="panel_id" class="imager panel" v-bind:class="[{ active: activePanelId === panel_id },{ hcenter: panel.halign === \'center\' },{ vcenter: panel.valign === \'center\' }]" v-if="panel.type === \'image\'"><img class="avatar" :src="panel.src"></div><div :id="panel_id" class="intwixter panel" v-bind:class="[{ active: activePanelId === panel_id }]" v-if="panel.type === \'intwixt\'"><div class="head"><label>Intwixt Designer</label><img src="https://my.intwixt.com/static1/css/img/logos/light_300.png"></div><div class="body" :id="\'viewport_\' + id + \'_\' + panel_id"><canvas :id="\'viewport_runner_\' + id + \'_\' + panel_id" width="666" height="500"></canvas><div class="plus"><span>+</span></div></div></div><div :id="panel_id" v-if="panel.type === \'slack\'" v-bind:class="[\'slacker\', \'panel\', { active: activePanelId === panel_id }]"><div class="slack"><div class="sidebar"><div class="workspace_selector"> {{panel.workspace.title}} <span class="carat"><i class="fas fa-angle-down"></i></span></div><div class="active_user"> {{users[panel.activeUserId].title}} </div><div class="label">Channels</div><div v-for="(channel, channel_id) in panel.channels" v-if="!channel.is_dm" v-on:click="set_active_channel(panel_id, channel.id)" v-bind:class="[\'channel\', { active: panel.activeChannelId === channel.id }, { private: channel.private }, { activating: channel.activating }]" v-bind:key="channel.id"> {{channel.title}} </div><div class="label">Apps</div><div v-for="(channel, channel_id) in panel.channels" v-if="channel.is_dm" v-on:click="set_active_channel(panel_id, channel.id)" v-bind:class="[\'channel\', \'app\', { active: panel.activeChannelId === channel.id }, { activating: channel.activating }]" v-bind:key="channel.id"> {{channel.title}} </div></div><div class="main" v-if="panel.channels[panel.activeChannelId]"><div class="chrome"><span class="signal"><i class="fas fa-signal"></i></span><span class="wifi"><i class="fas fa-wifi"></i></span><span class="time">3:27 PM</span><span class="battery"><small>75%</small>&nbsp;&nbsp;<i class="fas fa-battery-three-quarters"></i></span></div><div class="info"><span class="icon"></span><label v-bind:class="[panel.channels[panel.activeChannelId].id, { app: panel.channels[panel.activeChannelId].is_dm }, { private: panel.channels[panel.activeChannelId].private && !panel.channels[panel.activeChannelId].is_dm }, { public: !panel.channels[panel.activeChannelId].private }]">{{panel.channels[panel.activeChannelId].title}}</label><div class="channel_profile"><span class="star"><i class="far fa-star"></i></span><span class="members"><i class="fas fa-user"></i> {{panel.channels[panel.activeChannelId].members}}</span><span class="pins"><i class="fas fa-thumbtack"></i> {{panel.channels[panel.activeChannelId].pins}}</span><span class="more"><i class="fas fa-ellipsis-v"></i></span></div></div><div class="messages"><div v-for="(message, message_id) in panel.channels[panel.activeChannelId].messages" v-bind:class="[\'message\', { activating: message.activating }]" v-bind:key="message.id"><img class="avatar" :src="\'/img/avatars/\' + users[message.author].avatar"><div class="data"><div class="metadata"><span class="author">{{users[message.author].title}}</span><span class="timestamp">{{message.timestamp}}</span></div><div><img class="icon" v-if="message.icon" :src="message.icon" align="right"><div class="text" v-html="message.text"></div><div v-if="message.file" class="file"><i class="far fa-file-alt file_icon"></i> {{message.file}} </div><div v-if="message.fields" class="fields"><div v-for="field in message.fields" v-html="field.title" v-bind:class="[\'field\',{ full_width: field.full_width }]"></div></div><div v-if="message.actions" class="actions"><button v-for="(action, action_id) in message.actions" v-bind:key="action.id" v-on:click="act(panel_id, panel.channels[panel.activeChannelId], message, action)" v-bind:class="[action.style, { activating: action.activating }, { select: action.type == \'select\' }]"> {{action.title}} <i class="chevron fas fa-chevron-down"></i></button></div></div></div></div></div><div class="input"><i class="fas fa-paperclip" v-bind:class="[{ activating: panel.file.activating }]" v-on:click="show_file_prompt(panel_id)"></i><input type="text" v-model="panel.input" :placeholder="\'Message \' + panel.channels[panel.activeChannelId].title" v-on:keyup.enter="send_message(panel_id)"></div></div></div><div v-bind:class="[\'slack_overlay\', { active: panel.file.active }]"><div class="mask"></div><div class="file_upload"><h3 class="file_title">Upload a file</h3><i class="fas fa-times file_close" v-on:click="cancel_file_upload(panel_id)"></i><textarea class="file_message" v-model="panel.file.message" placeholder="Add a message about the file"></textarea><div class="file_wrapper"><span class="file"><i class="far fa-file-alt file_icon"></i><label class="file_name">{{panel.file.filename}}</label></span></div><button class="file_button btn" v-bind:class="[{ activating: panel.file.submitting }]" v-on:click="before_file_upload(panel_id, panel.file.filename, panel.file.message)"> Upload </button></div></div><div v-bind:class="[\'slack_overlay\', { active: panel.dialog.active }]"><div class="mask"></div><div class="dialog"><h3 class="dialog_title">{{panel.dialog.title}}</h3><i class="fas fa-times dialog_close"></i><textarea class="textarea" v-model="panel.dialog.value" :placeholder="panel.dialog.fields[panel.dialog.target_field].placeholder"></textarea><button class="cancel btn">Cancel</button><button class="submit btn" v-bind:class="[{ activating: panel.dialog.submitting }]" v-on:click="before_dialog_submit(panel_id, panel.dialog.action, panel.dialog.value)"> Submit </button></div></div></div></div></div><div class="annotation" v-bind:class="[{ active: annotation.user }]"><div class="triangle"></div><img class="avatar" v-if="annotation.user" :src="\'/img/avatars/\' + users[annotation.user].avatar"><p class="text"><label class="role">{{annotation.role}}</label><span v-html="annotation.text"></span></p></div></div>',
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
              } else if (action.type === 'story.alert') {
                return this.alert = action.text;
              } else if (action.type === 'panel.activate') {
                this.set_active_panel(action.id);
              } else if (action.type === 'channel.activate') {
                this.set_active_channel(this.activePanelId, action.id);
              } else if (action.type === 'message.send') {
                target = this.panels[this.activePanelId].channels[this.panels[this.activePanelId].activeChannelId].messages;
                this.send_formatted_message(target, action.message.id, this.clone(action.message));
              } else if (action.type === 'message.update') {
                target = this.panels[this.activePanelId].channels[this.panels[this.activePanelId].activeChannelId].messages[action.message.id];
                this.update_message(target, action.message, false);
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
            target.timestamp = message.timestamp ||
              new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
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