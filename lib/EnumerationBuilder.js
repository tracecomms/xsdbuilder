'use strict';

var AnnotationBuilder = require('./AnnotationBuilder');

function EnumerationBuilder(parent, name, values) {
    this.parent = parent;
    this.name = name;
    this.values = values;
}

EnumerationBuilder.prototype.build = function () {
    this.element = this.parent.element('xs:simpleType', {
        name: this.name
    });
    if (this.doco || this.appInfo) {
        console.log(this.doco);
        AnnotationBuilder.addAnnotation(this.element, this.doco, this.appInfo);
    }
    this.restrictionElement = this.element.element('xs:restriction', {
        base: 'xs:string'
    });
    this.values.forEach(function (value) {
        this.restrictionElement.element('xs:enumeration', {
            value: value
        })
    }, this);
};

EnumerationBuilder.create = function (parent, name, values) {
    return new EnumerationBuilder(parent, name, values);
};

/**
 *
 * @param {String} doco
 * @param {Object.<String, String>} appInfo
 * @returns {EnumerationBuilder}
 */
EnumerationBuilder.prototype.addAnnotation = function (doco, appInfo) {
    console.log(doco);
    this.doco = doco;
    this.appInfo = appInfo;
    return this;
};

module.exports = EnumerationBuilder;