import { dirname, join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { sync as glob } from 'glob';

export function inlineAssetForDirectory(folderPath: string) {
    glob(join(folderPath, '**/*.js')).forEach(filePath => inlineAsset(filePath));
    glob(join(folderPath, '**/*.json')).forEach(filePath => inlineAsset(filePath));
}

export function inlineAsset(filePath: string) {

    if (filePath.indexOf('.umd') !== -1) {
        return;
    }

    let fileContent = readFileSync(filePath, 'utf-8');
    fileContent = inlineTemplate(fileContent, filePath);
    // fileContent = inlineStyles(fileContent, filePath);
    fileContent = removeModuleId(fileContent);

    writeFileSync(filePath, fileContent, 'utf-8');
}

function inlineTemplate(fileContent: string, filePath: string) {
    return fileContent.replace(/['"]?templateUrl['"]?:\s*['"]([^']+?\.html)['"]/g, (_match, templateUrl) => {
        const templatePath = join(dirname(filePath), templateUrl);
        const templateContent = loadResourceFile(templatePath);

        return filePath.includes('.json')
            ? `"template": "${templateContent}"`
            : `template: "${templateContent}"`;
    });
}

function inlineStyles(fileContent: string, filePath: string) {
    return fileContent.replace(/['"]?styleUrls['"]?:\s*(\[[\s\S]*?])/gm, (_match, styleUrlsValue) => {
        // The RegExp matches the array of external style files. This is a string right now and
        // can to be parsed using the `eval` method. The value looks like "['AAA.css', 'BBB.css']"
        /* tslint:disable */
        const styleUrls = eval(styleUrlsValue) as string[];
        const styleContents = styleUrls
            .map(url => join(dirname(filePath), url.replace('.less', '.css')))
            .map(path => loadResourceFile(path));

        return filePath.includes('.json')
            ? `"styles": ["${styleContents.join(' ')}"]`
            : `styles: ["${styleContents.join(' ')}"]`;
    });
}

function loadResourceFile(filePath: string): string {
    return readFileSync(filePath, 'utf-8')
        .replace(/([\n\r]\s*)+/gm, ' ')
        .replace(/"/g, '\\"');
}

function removeModuleId(fileContent: string) {
    return fileContent.replace(/\s*moduleId:\s*module\.id\s*,?\s*/gm, '');
}
