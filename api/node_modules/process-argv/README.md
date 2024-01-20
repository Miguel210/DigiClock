[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM pkg](https://img.shields.io/npm/v/process-argv.svg)](https://www.npmjs.com/package/process-argv)
[![NPM dm](https://img.shields.io/npm/dm/process-argv.svg)](https://www.npmjs.com/package/process-argv)
[![Gratipay](https://img.shields.io/gratipay/IvanGaravito.svg)](https://gratipay.com/IvanGaravito)

# process-argv

A really simple process argv parser for Node.js.

## How to use it

It's just so simple as adding the following lines:

```javascript
var argv = require('process-argv')()

if (argv.command === 'help') {
  showHelp()
} else if (argv.command === 'task') {
  doSomeTask(argv.options)
}
```

Don't need to define options, commands neither contextless params, just follow this rule:

* node app.js <command> <contextless-param1> --option1 [param-for-option1] -multipleoptions [param-for-option-s] -v

### Want more options

Just pass the following options to `require('process-argv')(yourOptions)`:

* `enable_commands`, by default it is **true** and uses the first non-option as the command. Set it to **false** to disable command and just allow contextless params.
* `single_hyphen_multioption`, by default it is **true** and parses each character defined after a single hyphen as multiple options (e.g. `-as` as options `a` and `s`). Set it to **false** if you want `-version` defined as the `version` option.

## License

(The MIT License)

Copyright (c) 2016 Ivan Garavito &lt;ivangaravito@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
