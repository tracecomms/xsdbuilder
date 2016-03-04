'use strict';

var AnnotationBuilder = require('./AnnotationBuilder');
var ElementBuilder = require('./ElementBuilder');

/**
 *
 * @param {XMLElement} parent
 * @param {String} name
 * @constructor
 * @implements ElementContainer
 */
function DataTypeBuilder(parent, name) {
    this.name = name;
    this.parent = parent;
    this.elements = {};
}

DataTypeBuilder.prototype.build = function () {
    this.element = this.parent.element('xs:complexType', {
        name: this.name
    });
    if (this.doco || this.appInfo) {
        AnnotationBuilder.addAnnotation(this.element, this.doco, this.appInfo);
    }
    this.sequenceElement = this.element.element('xs:sequence');
    Object.keys(this.elements).sort().forEach(function (key) {
        var elementBuilder = this.elements[key];
        elementBuilder.build(this.sequenceElement);
    }, this);
};

/**
 *
 * @param {String} name
 * @param {String} type
 * @returns {ElementBuilder}
 */
DataTypeBuilder.prototype.addElement = function (name, type) {
    this.elements[name] = new ElementBuilder(name, type);
    return this.elements[name];
};

/**
 *
 * @param {String} name
 * @returns {ElementBuilder}
 */
DataTypeBuilder.prototype.addComplexElement = function (name) {
    this.elements[name] = new ElementBuilder(name);
    return this.elements[name];
};

/**
 *
 * @param {String} doco
 * @param {Object.<String, String>} appInfo
 * @returns {DataTypeBuilder}
 */
DataTypeBuilder.prototype.addAnnotation = function (doco, appInfo) {
    this.doco = doco;
    this.appInfo = appInfo;
    return this;
};

module.exports = DataTypeBuilder;