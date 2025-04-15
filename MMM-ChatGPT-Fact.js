Module.register("MMM-ChatGPT-Fact", {
  defaults: {
    updateInterval: 3600000,  // Run the command every hour
    safetyFilter: false,
    model: "gpt-4o-mini",
    apiKey: "<your-api-key>",
  },

  start: function() {
    console.log("Starting module: " + this.name);
    this.getCommandOutput();
    setInterval(() => {
      this.getCommandOutput();
    }, this.config.updateInterval);
  },

  getHeader: function() {
    return this.header;
  },

  getCommandOutput: function() {
    this.sendSocketNotification('RUN_COMMAND', this.config);
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === 'COMMAND_OUTPUT') {
      this.fact = payload.text;
      this.header = payload.title;
      this.updateDom();
    }
  },

  getDom: function() {
    const wrapper = document.createElement("div");
    const AIfact = document.createElement("div");
    AIfact.className = "bright";
    if (this.fact) {
      AIfact.innerHTML = this.fact;
    } else {
      AIfact.innerHTML = "Waiting for ChatGPT...";
    }
    wrapper.appendChild(AIfact);
    return wrapper;
  }
});

