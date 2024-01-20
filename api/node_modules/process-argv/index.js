var transitionStateTable = {
  'init': { 'value': null, 'option': 'option' },
  'contextless_param': { 'value': 'contextless_param', 'option': 'option' },
  'command': { 'value': 'contextless_param', 'option': 'option' },
  'option': { 'value': 'option_param', 'option': 'option' },
  'option_param': { 'value': 'contextless_param', 'option': 'option' }
}

module.exports = function (opts) {
  var _argc, _argv, options, _opts, state

  _argv = process.argv.slice(2)
  _argc = _argv.length
  options = {}
  opts = opts || {}
  _opts = {
    'enable_commands': opts['enable_commands'] !== undefined ? opts['enable_commands'] : true,
    'single_hyphen_multioption': opts['single_hyphen_multioption'] !== undefined ? opts['single_hyphen_multioption'] : true
  }

  transitionStateTable['init'].value = _opts.enable_commands ? 'command' : 'contextless_param'
  state = 'init'

  for (var i = 0; i < _argc; i++) {
    var arg, input, lastOption, regex, res, toState

    arg = _argv[i]
    regex = /^([-][-]?)(.*)/
    res = regex.exec(arg)
    input = res === null ? 'value' : 'option'
    toState = transitionStateTable[state][input]

    if (toState === 'command') {
      options['command'] = arg
    } else if (toState === 'contextless_param') {
      if (options['params'] === undefined) {
        options['params'] = []
      }
      options['params'].push(arg)
    } else if (toState === 'option') {
      if (options['options'] === undefined) {
        options['options'] = {}
      }
      var type = res[1]
      var name = res[2]

      if (type === '-' && name.length > 1 && _opts.single_hyphen_multioption) {
        var chr
        for (var c = 0; c < name.length; c++) {
          if ((chr = getWholeChar(name, c)) === false) {
            continue
          }
          options['options'][chr] = null
        }
        lastOption = chr
      } else {
        options['options'][name] = null
        lastOption = name
      }
    } else if (toState === 'option_param') {
      options['options'][lastOption] = arg
    }

    state = toState
  }

  return options
}

// From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
function getWholeChar (str, i) {
  var code = str.charCodeAt(i)

  if (Number.isNaN(code)) {
    return '' // Position not found
  }
  if (code < 0xD800 || code > 0xDFFF) {
    return str.charAt(i)
  }

  // High surrogate (could change last hex to 0xDB7F to treat high private
  // surrogates as single characters)
  if (code >= 0xD800 && code <= 0xDBFF) {
    if (str.length <= (i + 1)) {
      throw new Error('High surrogate without following low surrogate')
    }
    var next = str.charCodeAt(i + 1)
    if (next < 0xDC00 || next > 0xDFFF) {
      throw new Error('High surrogate without following low surrogate')
    }
    return str.charAt(i) + str.charAt(i + 1)
  }
  // Low surrogate (0xDC00 <= code && code <= 0xDFFF)
  if (i === 0) {
    throw new Error('Low surrogate without preceding high surrogate')
  }
  var prev = str.charCodeAt(i - 1)

  // (could change last hex to 0xDB7F to treat high private
  // surrogates as single characters)
  if (prev < 0xD800 || prev > 0xDBFF) {
    throw new Error('Low surrogate without preceding high surrogate')
  }
  // We can pass over low surrogates now as the second component
  // in a pair which we have already processed
  return false
}
