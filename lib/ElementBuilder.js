'use strict';

var AnnotationBuilder = require('./AnnotationBuilder');

function ElementBuilder(name, type) {
    this.name = name;
    this.type = type;
    this.elements = {};
}

ElementBuilder.prototype.build = function (parent) {
    var element = parent.element('xs:element', {name: this.name});
    if (this.doco || this.appInfo) {
        AnnotationBuilder.addAnnotation(element, this.doco, this.appInfo);
    }
    if (this.type) {
        element.attribute('type', this.type)
    } else {
        var complexType = element.element('xs:complexType');
        var sequenceElement = complexType.element('xs:sequence');
        Object.keys(this.elements).sort().forEach(function (key) {
            var elementBuilder = this.elements[key];
            elementBuilder.build(sequenceElement);
        }, this);
    }
};

ElementBuilder.prototype.addElement = function (name, type) {
    this.elements[name] = new ElementBuilder(name, type);
    return this.elements[name];
};
ElementBuilder.prototype.addComplexElement = function (name, type) {
    this.elements[name] = new ElementBuilder(name, type);
    return this.elements[name];
};

ElementBuilder.prototype.addAnnotation = function (doco, appInfo) {
    this.doco = doco;
    this.appInfo = appInfo;
    return this;
};

module.exports = ElementBuilder;