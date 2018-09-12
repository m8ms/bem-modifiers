var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import cx from 'classnames';
import { memoize } from 'ramda';
import * as PropTypes from 'prop-types';

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
export var normalize = memoize(function (items, prefix) {

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
export var bemCx = function bemCx(baseClass) {
    var modifiers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var otherClasses = arguments[2];

    return cx(baseClass, normalize(modifiers, baseClass), otherClasses);
};
/**
 * Convenience const for easily setting propTypes = { modifiers }.
 *
 * @type {shim}
 */
export var modifiers = PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.object]);