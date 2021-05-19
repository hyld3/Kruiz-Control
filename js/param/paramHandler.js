class ParamHandler extends Handler {
  /**
   * Create a new Param handler.
   */
  constructor() {
    super('Param', []);
    this.success();
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   * @param {array} parameters current trigger parameters
   */
  async handleData(triggerData, parameters) {
    var action = triggerData[1].toLowerCase();
    var name = triggerData[2];

    switch (action) {
      case 'lower':
        if (parameters.hasOwnProperty(name)) {
          return { [name]: parameters[name].toLowerCase() };
        }
        break;
      case 'upper':
        if (parameters.hasOwnProperty(name)) {
          return { [name]: parameters[name].toUpperCase() };
        }
        break;
      case 'proper':
        if (parameters.hasOwnProperty(name)) {
          return { [name]: parameters[name].toProperCase() };
        }
        break;
      case 'add':
        if (parameters.hasOwnProperty(name)) {
          var value = parseFloat(triggerData[3]);
          var paramValue = parseFloat(parameters[name]);
          if (!isNaN(value) && !isNaN(paramValue)) {
            return { [name]: paramValue + value };
          }
        }
        break;
      case 'subtract':
        if (parameters.hasOwnProperty(name)) {
          var value = parseFloat(triggerData[3]);
          var paramValue = parseFloat(parameters[name]);
          if (!isNaN(value) && !isNaN(paramValue)) {
            return { [name]: paramValue - value };
          }
        }
        break;
      case 'exists':
        return { exists: parameters.hasOwnProperty(name) };
        break;
      case 'copy':
        var toName = triggerData[3];
        if (parameters.hasOwnProperty(name)) {
          return { [toName]: parameters[name] };
        }
        break;
      case 'replace':
        if (parameters.hasOwnProperty(name)) {
          var toReplace = triggerData[3];
          var replacement = triggerData.slice(4).join(' ');
          return { [name]: parameters[name].replace(new RegExp(escapeRegExp(toReplace), 'g'), replacement) };
        }
        break;
    }
  }
}

/**
 * Create a handler
 */
function paramHandlerExport() {
  var param = new ParamHandler();
}
paramHandlerExport();
