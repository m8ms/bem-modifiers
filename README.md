# bemcx

Simple utility inspired by `classnames` that glues bem classes with --modifiers.

Basic usage:

```javascript
bemCx('some-block__some-element', modifiers, otherClasses);
```
...where `modifiers` & `otherClasses` can be:
* string
* array of strings
* cx-style map of booleans: {modifier: condition, modifier2: condition}

See tests for use cases.

Example:

```javascript
bemCx('block__lem', ['modifier-a', {'modifier-B': true}], 'other-class')
//will result in:
//'block_lem block_lem--modifier-a block_lem--modifier-B other-class'
```
