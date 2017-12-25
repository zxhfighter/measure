const path = require('path');
const fs = require('fs');

module.exports = function (source) {
    if (this.cacheable) {
        this.cacheable();
    }

    const regex = /<!--\s+api\((\w+\-?\w+\.html)\)\s+-->/g;
    const matches = regex.exec(source);
    let apiPath, filename;
    let value = source;
    let apiContent;

    if (matches) {
        filename = matches[1];

        let isMarkdown = filename.indexOf('markdown-') === 0;
        if (isMarkdown) {
            let markdownFilename = filename.replace('markdown-', '');
            apiPath = path.join(__dirname, '../../dist/docs/guides', markdownFilename);
            apiContent = fs.readFileSync(apiPath, {encoding: 'utf-8'})
                .replace('<html><head></head><body>', '')
                .replace('</body></html>', '')
                .replace(/{/g, '&#123;')
                .replace(/{/g, '&#125;');
        }
        else {
            apiPath = path.join(__dirname, '../../dist/docs/api/component', filename);
            apiContent = fs.readFileSync(apiPath, {encoding: 'utf-8'});
        }

        value = value.replace(regex, apiContent);
    }

    return matches ? value : source;
}
