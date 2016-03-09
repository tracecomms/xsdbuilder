'use strict';

function AnnotationBuilder(parent) {
    this.annotationElement = parent.element('xs:annotation');
}


function wrap(string) {
    var words = string.split(/\s+/);
    var lines = [];
    var line;
    while(words.length > 0) {
        line = words.shift();
        while (line.length < 100 && words.length > 0) {
            line = line + ' ' + words.shift();
        }
        lines.push(line);
    }
    return lines;
}

function splitAndWrap(string) {
    var paras = string.split(/\n+/);
    var lines = [];
    paras.forEach(function (p, index) {
        lines = lines.concat(wrap(p));
        if (index < paras.length -1) {
            lines.push('');
        }
    });
    return lines;
}

/**
 *
 * @param {String} doco
 */
AnnotationBuilder.prototype.setDocumentation = function (doco) {
    if (!this.documentationElement) {
        this.documentationElement = this.annotationElement.element('xs:documentation');
        splitAndWrap(doco).forEach(this.documentationElement.text.bind(this.documentationElement));
    }
};

/**
 *
 * @param {Object.<String, String>} obj
 */
AnnotationBuilder.prototype.addAppInfo = function (obj) {
    if (!this.appinfoElement) {
        var appinfoElement = this.appinfoElement = this.annotationElement.element('xs:appinfo');
        Object.keys(obj).forEach(function (key) {
            var text = obj[key];
            var element = appinfoElement.element(key);
            if (text) {
                element.text(text);
            }
        });
    }
};

/**
 *
 * @param {XMLElement} parent
 * @param {String} doco
 * @param {Object.<String, String>} appInfo
 * @returns {AnnotationBuilder}
 */
AnnotationBuilder.addAnnotation = function (parent, doco, appInfo) {
    var annotationBuilder = new AnnotationBuilder(parent);
    if (doco) {
        annotationBuilder.setDocumentation(doco);
    }
    if (appInfo) {
        annotationBuilder.addAppInfo(appInfo);
    }
    return annotationBuilder;
};

module.exports = AnnotationBuilder;