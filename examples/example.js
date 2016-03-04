'use strict';

var XMLSchemaBuilder = require('./../lib/XMLSchemaBuilder');

var xmlSchemaBuilder = new XMLSchemaBuilder();

xmlSchemaBuilder.addAnnotation('yeah\nbaby', {DataModelVersion: '1.0.0'});

xmlSchemaBuilder.addEnumeration('many', ['one', 'two'])
    .addAnnotation('one enum');


var yew = xmlSchemaBuilder.addType('yew')
    .addAnnotation('on yew');
yew.addElement('awesome', 'xs:string');
yew.addElement('number', 'xs:integer');

var spew = xmlSchemaBuilder.addType('spew');
spew.addElement('nine', 'xs:integer');
spew.addElement('five', 'xs:string');

var root = xmlSchemaBuilder.addComplexElement('root');
root.addAnnotation('on root');
root.addElement('fiver', 'yew')
    .addAnnotation('on root fiver');
var dropHat = root.addComplexElement('dropHat')
    .addAnnotation('on drop hat');
dropHat.addElement('nested', 'spew')
    .addAnnotation('on drop hat nested');


xmlSchemaBuilder.addElement('anotherRoot', 'xs:string')
    .addAnnotation('note this!');

console.log(xmlSchemaBuilder.build());