'use strict';

var xmlbuilder = require('xmlbuilder');

var DataTypeBuilder = require('./DataTypeBuilder');
var AnnotationBuilder = require('./AnnotationBuilder');
var EnumerationBuilder = require('./EnumerationBuilder');
var ElementBuilder = require('./ElementBuilder');

function createSchema() {
    var schema = xmlbuilder.create('xs:schema', {version: '1.0', encoding: 'UTF-8'})
        .attribute('xmlns:xs', 'http://www.w3.org/2001/XMLSchema')
        .attribute('elementFormDefault', 'qualified');
    schema.raw('');

    return schema;
}

/**
 * @implements ElementContainer
 * @constructor
 */
function XMLSchemaBuilder() {
    this.schema = createSchema();
    this.dataTypes = {};
    this.enumerations = {};
    this.elements = {};
}

XMLSchemaBuilder.prototype._addComment = function (comment) {
    this.schema.raw('');
    this.schema.comment(comment);
    this.schema.raw('');
};

XMLSchemaBuilder.prototype.build = function () {
    this._addComment('Complex data types');
    Object.keys(this.dataTypes).sort().forEach(function (key) {
        var dataType = this.dataTypes[key];
        dataType.build();
    }, this);
    this._addComment('Enumerations');
    Object.keys(this.enumerations).sort().forEach(function (key) {
        var enumeration = this.enumerations[key];
        enumeration.build();
    }, this);
    this._addComment('Elements');
    Object.keys(this.elements).sort().forEach(function (key) {
        var element = this.elements[key];
        element.build(this.schema);
    }, this);
    return this.schema.end({ pretty: true, indent: '  ', newline: '\n' });
};

/**
 *
 * @param name
 * @returns {DataTypeBuilder}
 */
XMLSchemaBuilder.prototype.addType = function (name) {
    var dataTypeBuilder = new DataTypeBuilder(this.schema, name);
    this.dataTypes[name] = dataTypeBuilder;
    return dataTypeBuilder;
};

/**
 *
 * @param {String} name
 * @param {Array.<String>} values
 * @returns {EnumerationBuilder}
 */
XMLSchemaBuilder.prototype.addEnumeration = function (name, values) {
    this.enumerations[name] = EnumerationBuilder.create(this.schema, name, values);
    return this.enumerations[name];
};

/**
 *
 * @param {String} name
 * @param {String} type
 * @returns {ElementBuilder}
 */
XMLSchemaBuilder.prototype.addElement = function (name, type) {
    this.elements[name] = new ElementBuilder(name, type);
    return this.elements[name];
};

/**
 *
 * @param {String} name
 * @returns {ElementBuilder}
 */
XMLSchemaBuilder.prototype.addComplexElement = function (name) {
    this.elements[name] = new ElementBuilder(name);
    return this.elements[name];
};

/**
 *
 * @param {String} doco
 * @param {Object.<String, String>} appInfo
 * @returns {XMLSchemaBuilder}
 */
XMLSchemaBuilder.prototype.addAnnotation = function (doco, appInfo) {
    AnnotationBuilder.addAnnotation(this.schema, doco, appInfo);
    return this;
};

module.exports = XMLSchemaBuilder;