'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.modifiers = exports.bemCx = exports.normalize = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ramda = require('ramda');

var _propTypes = require('prop-types');

var PropTypes = _interopRequireWildcard(_propTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function p(stem) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    return prefix ? prefix + '--' + stem : stem;
}

/**
 * Normalizes items (ex. modifiers), to array format. Attaches base class prefix to each item if provided.
 *
 * Memoized.
 *
 * @param {*} items - strings in any 'cx style' format (i.e. string, map of booleans, array, nested array)
 * @param {string} [prefix] - attached before each processed string to create bem classes with modifiers
 * @return {string[]} - array of strings
 */
var normalize = exports.normalize = (0, _ramda.memoize)(function (items, prefix) {

    if (typeof items === 'string') {
        return [p(items, prefix)];
    }

    if (Array.isArray(items)) {
        return items.reduce(function (acc, item) {

            if (typeof item === 'string') {
                acc.push(p(item, prefix));
                return acc;
            }
            return acc.concat(normalize(item, prefix));
        }, []);
    }

    if ((typeof items === 'undefined' ? 'undefined' : _typeof(items)) === 'object') {
        var arr = [];

        for (var key in items) {
            if (items.hasOwnProperty(key) && items[key]) {
                arr.push(p(key, prefix));
            }
        }
        return arr;
    }

    return [];
});

/**
 * Wraps `classnames.cx` to make bem classes.
 *
 * Returns BEM main class (can be block root or __element),
 * and adds modifier classes using same convention as `classnames.cx`.
 *
 * @param {string} baseClass - block or element class
 * @param {*} modifiers - `cx` style modifiers list with toggle flags or array
 * @param {*} otherClasses - `cx` style other classes
 * @returns {*}
 */
var bemCx = exports.bemCx = function bemCx(baseClass) {
    var modifiers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var otherClasses = arguments[2];

    return (0, _classnames2.default)(baseClass, normalize(modifiers, baseClass), otherClasses);
};
/**
 * Convenience const for easily setting propTypes = { modifiers }.
 *
 * @type {shim}
 */
var modifiers = exports.modifiers = PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.object]);