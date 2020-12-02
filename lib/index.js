"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.modifiers = exports.normalize = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _ramda = require("ramda");

var PropTypes = _interopRequireWildcard(require("prop-types"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function p(stem) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return prefix ? "".concat(prefix, "--").concat(stem) : stem;
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


var normalize = (0, _ramda.memoize)(function (items, prefix) {
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

  if (_typeof(items) === 'object') {
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
 * Convenience const for easily setting propTypes = { modifiers }.
 *
 * @type {shim}
 */

exports.normalize = normalize;
var modifiers = PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.object]);
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

exports.modifiers = modifiers;

var bemCx = function bemCx(baseClass) {
  var modifiers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var otherClasses = arguments.length > 2 ? arguments[2] : undefined;
  return (0, _classnames["default"])(baseClass, normalize(modifiers, baseClass), otherClasses);
};

var _default = bemCx;
exports["default"] = _default;