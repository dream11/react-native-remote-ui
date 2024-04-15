'use strict';
var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
var _typeof = require('@babel/runtime/helpers/typeof');
Object.defineProperty(exports, '__esModule', { value: true });
exports['default'] = void 0;
var _slicedToArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/slicedToArray')
);
var _react = _interopRequireWildcard(require('react'));
var _reactNative = require('react-native');
var _this = void 0,
  _jsxFileName =
    '/Users/kunal.chavhan/workplace/react-native-server-component/server/Mocks/ExampleServerComponent.tsx';
function _getRequireWildcardCache(e) {
  if ('function' != typeof WeakMap) return null;
  var r = new WeakMap(),
    t = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(e) {
    return e ? t : r;
  })(e);
}
function _interopRequireWildcard(e, r) {
  if (!r && e && e.__esModule) return e;
  if (null === e || ('object' != _typeof(e) && 'function' != typeof e))
    return { default: e };
  var t = _getRequireWildcardCache(r);
  if (t && t.has(e)) return t.get(e);
  var n = { __proto__: null },
    a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var u in e)
    if ('default' !== u && {}.hasOwnProperty.call(e, u)) {
      var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
      i && (i.get || i.set) ? Object.defineProperty(n, u, i) : (n[u] = e[u]);
    }
  return (n['default'] = e), t && t.set(e, n), n;
}
var ExampleServerComponent = function ExampleServerComponent(_ref) {
  var onAction = _ref.onAction;
  var _useState = (0, _react.useState)(''),
    _useState2 = (0, _slicedToArray2['default'])(_useState, 2),
    catFact = _useState2[0],
    setCatFact = _useState2[1];
  var onPress = (0, _react.useCallback)(
    function () {
      if (onAction) {
        onAction('NAVIGATE', { route: 'DetailsScreen' });
      }
    },
    [onAction]
  );
  (0, _react.useEffect)(function () {
    fetch('https://catfact.ninja/fact')
      .then(function (resp) {
        return resp.json();
      })
      .then(function (json) {
        return json.fact;
      })
      .then(function (fact) {
        return setCatFact(fact);
      });
  }, []);
  return _react['default'].createElement(
    _reactNative.View,
    {
      style: styles.container,
      __self: _this,
      __source: { fileName: _jsxFileName, lineNumber: 24, columnNumber: 5 },
    },
    _react['default'].createElement(
      _reactNative.Text,
      {
        style: styles.hello,
        __self: _this,
        __source: { fileName: _jsxFileName, lineNumber: 25, columnNumber: 7 },
      },
      ' Hello Server Component'
    ),
    _react['default'].createElement(
      _reactNative.Text,
      {
        style: styles.catFactsTitle,
        __self: _this,
        __source: { fileName: _jsxFileName, lineNumber: 26, columnNumber: 7 },
      },
      ' Cat Facts '
    ),
    _react['default'].createElement(
      _reactNative.Text,
      {
        style: styles.facts,
        __self: _this,
        __source: { fileName: _jsxFileName, lineNumber: 27, columnNumber: 7 },
      },
      ' ',
      catFact,
      ' '
    ),
    _react['default'].createElement(
      _reactNative.Pressable,
      {
        onPress: onPress,
        __self: _this,
        __source: { fileName: _jsxFileName, lineNumber: 28, columnNumber: 7 },
      },
      _react['default'].createElement(
        _reactNative.View,
        {
          style: styles.button,
          __self: _this,
          __source: { fileName: _jsxFileName, lineNumber: 29, columnNumber: 9 },
        },
        _react['default'].createElement(
          _reactNative.Text,
          {
            style: styles.text,
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 30,
              columnNumber: 11,
            },
          },
          ' ',
          'Navigation',
          ' '
        )
      )
    )
  );
};
var styles = _reactNative.StyleSheet.create({
  container: { flex: 1, width: '100%', justifyContent: 'center', padding: 20 },
  hello: { color: 'red', fontWeight: 'bold' },
  catFactsTitle: { marginTop: 16, color: 'blue', fontWeight: 'bold' },
  facts: { marginTop: 10, color: 'black', fontWeight: '400' },
  text: {
    color: 'black',
    fontWeight: '400',
    alignContent: 'center',
    textAlign: 'center',
  },
  button: {
    height: 30,
    width: 100,
    marginTop: 20,
    borderRadius: 3,
    backgroundColor: '#65A765',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
});
var _default = (exports['default'] = ExampleServerComponent);
