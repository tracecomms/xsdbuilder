/**
 * Created by daniel on 4/03/2016.
 */

(function () {
    'use strict';

    var path = require('path');


    module.exports = {

        entry: './index.js',

        devtool: 'source-map',

        context: path.resolve('./'),

        output: {
            path: path.resolve('./build'),
            filename: 'xsdbuilder.js',
            libraryTarget: 'umd',
            library: 'XMLSchemaBuilder'
        },

        resolve: {
            root: [
                path.resolve('./lib'),
                path.resolve('./node_modules')
            ]
        },

        module: {
        },

        plugins: [
        ]

    };

})();
