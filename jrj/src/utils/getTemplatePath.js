export default function getTemplatePath() {
  const templatePath = eval(`let path = require('path');path.join(__dirname,'../')`);
  return templatePath;
}
