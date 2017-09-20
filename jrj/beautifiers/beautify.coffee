fs = require('fs');
path = require('path');

Beautifiers = require("./atom-beautify/src/beautifiers");

grammarMap = {
  'vue':'Vue',
  'js':'JavaScript'
}

beautifier = new Beautifiers()

# filepath = 'src/components/app.vue'
filepath = path.resolve process.argv[2]

content = fs.readFileSync filepath

fn = (text) ->
  fs.writeFileSync(filepath,text)

options = {
  _default:{
    indent_char: ' '
    indent_size: 2
    indent_with_tabs: false
  }
}
beautifier.beautify(content.toString(),[
  options
],grammarMap[path.extname(filepath).substring(1)],filepath).then(fn).catch(fn)
