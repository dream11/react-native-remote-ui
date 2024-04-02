'use strict';
var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
var _typeof = require('@babel/runtime/helpers/typeof');
Object.defineProperty(exports, '__esModule', { value: true });
exports.shouldHideJoinButton =
  exports.isPracticeContest =
  exports.headerText =
  exports.formatData =
  exports.displayEntryFee =
  exports.disabledJoinText =
  exports.diplayContestHeaderName =
  exports['default'] =
  exports.contestData =
    void 0;
var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
);
var _slicedToArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/slicedToArray')
);
var _react = _interopRequireWildcard(require('react'));
var _reactNative = require('react-native');
var _this = void 0,
  _jsxFileName =
    '/Users/kunal.chavhan/workplace/RNPlayground/src/rsc/ContestCard/ContestCard.tsx';
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
    if ('default' !== u && Object.prototype.hasOwnProperty.call(e, u)) {
      var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
      i && (i.get || i.set) ? Object.defineProperty(n, u, i) : (n[u] = e[u]);
    }
  return (n['default'] = e), t && t.set(e, n), n;
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r &&
      (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })),
      t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2
      ? ownKeys(Object(t), !0).forEach(function (r) {
          (0, _defineProperty2['default'])(e, r, t[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
        : ownKeys(Object(t)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
          });
  }
  return e;
}
var CatFactsComponent = function CatFactsComponent() {
  var _useState = (0, _react.useState)(null),
    _useState2 = (0, _slicedToArray2['default'])(_useState, 2),
    catFact = _useState2[0],
    setCatFact = _useState2[1];
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
  if (catFact !== null && catFact !== undefined) {
    return _react['default'].createElement(
      _reactNative.Text,
      {
        __self: _this,
        __source: { fileName: _jsxFileName, lineNumber: 22, columnNumber: 12 },
      },
      ' ',
      catFact,
      ' '
    );
  }
  return _react['default'].createElement(_react['default'].Fragment, null);
};
var ContestCard = function ContestCard(_ref) {
  var onAction = _ref.onAction,
    index = _ref.index;
  var data = contestData;
  var findPercent = function findPercent(currentSize, contestSize) {
    var size = currentSize / contestSize;
    if (isNaN(size)) {
      return 0.0;
    } else {
      return size * 100;
    }
  };
  var width = (0, _react.useMemo)(
    function () {
      return {
        width: ''.concat(findPercent(data.currentSize, data.contestSize), '%'),
      };
    },
    [data.contestSize, data.currentSize]
  );
  var action = (0, _react.useCallback)(function () {
    onAction('NAVIGATE', { route: 'Landing', params: { index: index } });
  }, []);
  return _react['default'].createElement(
    _reactNative.View,
    {
      style: styles.rootView,
      __self: _this,
      __source: { fileName: _jsxFileName, lineNumber: 55, columnNumber: 5 },
    },
    _react['default'].createElement(EntryHeader, {
      data: data,
      __self: _this,
      __source: { fileName: _jsxFileName, lineNumber: 56, columnNumber: 7 },
    }),
    _react['default'].createElement(_reactNative.View, {
      style: styles.ProgressBar,
      __self: _this,
      __source: { fileName: _jsxFileName, lineNumber: 57, columnNumber: 7 },
    }),
    _react['default'].createElement(
      _reactNative.View,
      {
        style: styles.cardSpot,
        __self: _this,
        __source: { fileName: _jsxFileName, lineNumber: 58, columnNumber: 7 },
      },
      _react['default'].createElement(
        _reactNative.Text,
        {
          style: styles.spotLeftText,
          __self: _this,
          __source: { fileName: _jsxFileName, lineNumber: 59, columnNumber: 9 },
        },
        data.contestSize - data.currentSize,
        'spots left'
      ),
      _react['default'].createElement(
        _reactNative.Text,
        {
          style: styles.totalSpotText,
          __self: _this,
          __source: { fileName: _jsxFileName, lineNumber: 63, columnNumber: 9 },
        },
        data.contestSize,
        ' ',
        'spots'
      )
    ),
    _react['default'].createElement(_reactNative.View, {
      style: { backgroundColor: '#000', height: 20 },
      __self: _this,
      __source: { fileName: _jsxFileName, lineNumber: 67, columnNumber: 7 },
    }),
    _react['default'].createElement(
      _reactNative.Pressable,
      {
        onPress: action,
        __self: _this,
        __source: { fileName: _jsxFileName, lineNumber: 68, columnNumber: 7 },
      },
      _react['default'].createElement(
        _reactNative.Text,
        {
          style: {
            color: 'red',
            fontWeight: '400',
            borderWidth: 2,
            borderColor: '#a1a1a1',
          },
          __self: _this,
          __source: { fileName: _jsxFileName, lineNumber: 69, columnNumber: 9 },
        },
        ' ',
        'Navigation',
        ' '
      )
    ),
    _react['default'].createElement(
      _react.Suspense,
      {
        fallback: _react['default'].createElement(
          _reactNative.Text,
          {
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 81,
              columnNumber: 27,
            },
          },
          ' Server Text Loading ...'
        ),
        __self: _this,
        __source: { fileName: _jsxFileName, lineNumber: 81, columnNumber: 7 },
      },
      _react['default'].createElement(CatFactsComponent, {
        __self: _this,
        __source: { fileName: _jsxFileName, lineNumber: 82, columnNumber: 9 },
      })
    )
  );
};
var contestData = (exports.contestData = {
  contestTypeDisplayText: '',
  spotsDisplayText: '66',
  isBulkJoinEnabled: false,
  explanation: null,
  joinedTeamsCount: null,
  contestName: 'Rs.5,000',
  contestCategory: 'PAID',
  contestType: 'public',
  contestSize: 66,
  currentSize: 7,
  isPartnerContest: false,
  behaviour: 'DYNAMIC',
  id: '4437828059',
  productId: '13598',
  inviteCode: '1auyr8qqydtg9-',
  isInfiniteEntry: false,
  isGuaranteed: false,
  isMultipleEntry: true,
  multiTeamJoinEnabled: null,
  numberOfWinners: 40,
  winnerPercent: 61,
  site: 'cricket',
  maxAllowedTeams: 6,
  isFreeEntry: false,
  prizeDisplayText: '₹5,000',
  hasJoined: false,
  isRecommended: false,
  invitationsInfo: null,
  entryFee: { amount: 89, code: 'INR', symbol: '₹' },
  effectiveEntryFee: { amount: 0, code: 'INR', symbol: '₹' },
  winnerBreakup: [{ prizeDisplayText: '₹1,000' }],
  prizeAmount: { amount: 5000, symbol: '₹', code: 'INR' },
  match: {
    name: 'GT vs CHE',
    id: 59879,
    startTime: '2023-05-23T14:00:00.000Z',
    status: 'NOT_STARTED',
  },
  tour: { id: 3197, name: 'TATA IPL' },
  myTeams: [],
  myNetworkInfo: { networkMemberTeams: [], totalCount: 0 },
});
var headerText = (exports.headerText = function headerText(data) {
  if (data === 'DYNAMIC') return '1000';
  else return '100';
});
var isPracticeContest = (exports.isPracticeContest = function isPracticeContest(
  contestType,
  contestCategory
) {
  return contestType === 'public' && contestCategory === 'FREE';
});
var diplayContestHeaderName = (exports.diplayContestHeaderName =
  function diplayContestHeaderName(
    contestType,
    isPartnerContest,
    contestName,
    contestCategory,
    prizeDisplayText
  ) {
    if (contestType.toLowerCase() === 'private') {
      return prizeDisplayText !== null && prizeDisplayText !== void 0
        ? prizeDisplayText
        : '';
    } else {
      if (isPartnerContest) {
        return contestName ? contestName : 'Practice Contest';
      } else if (contestCategory === 'FREE') {
        if (contestName && contestName !== 'skill') {
          return contestName;
        } else {
          return 'Practice Contest';
        }
      } else {
        return prizeDisplayText !== null && prizeDisplayText !== void 0
          ? prizeDisplayText
          : '';
      }
    }
  });
var formatData = (exports.formatData = function formatData(data) {
  return data.symbol + '' + data.amount;
});
var displayEntryFee = (exports.displayEntryFee = function displayEntryFee(
  contestType,
  contestCategory,
  entryFee,
  effectiveEntryFee,
  discountedEntryTotal,
  shouldHideJoinText
) {
  if (shouldHideJoinText) return '';
  if (discountedEntryTotal) {
    if (discountedEntryTotal.amount === 0) return 'FREE';
    return formatData(discountedEntryTotal);
  }
  if (!effectiveEntryFee) {
    if (contestType.toLowerCase() !== 'private' && contestCategory === 'FREE')
      return 'join';
    return formatData(entryFee);
  } else {
    if (effectiveEntryFee.amount === 0) return 'FREE';
    return formatData(effectiveEntryFee);
  }
});
var shouldHideJoinButton = (exports.shouldHideJoinButton =
  function shouldHideJoinButton(
    contestSize,
    currentSize,
    isMultipleEntry,
    joinedTeamsCount,
    status,
    hasJoined,
    maxAllowedTeams,
    isNpuBottomSheet
  ) {
    if (isNpuBottomSheet) return true;
    if (contestSize === currentSize) return true;
    if (
      hasJoined === true &&
      (isMultipleEntry === false ||
        contestSize === currentSize ||
        status !== 'NOT_STARTED')
    ) {
      return true;
    } else if (joinedTeamsCount === maxAllowedTeams) {
      return true;
    }
    return false;
  });
var disabledJoinText = (exports.disabledJoinText = function disabledJoinText(
  contestType,
  contestCategory,
  isPartnerContest,
  entryFee,
  hasJoined
) {
  if (isPracticeContest(contestType, contestCategory) || isPartnerContest) {
    return hasJoined ? 'Joined' : 'join';
  }
  return hasJoined
    ? 'joined' + ' ' + formatData(entryFee)
    : formatData(entryFee);
});
var EntryHeader = function EntryHeader(_ref2) {
  var data = _ref2.data;
  var handlePress = _react['default'].useCallback(function () {}, []);
  return _react['default'].createElement(
    _reactNative.View,
    {
      style: styles.entryHeaderContainer,
      __self: _this,
      __source: { fileName: _jsxFileName, lineNumber: 279, columnNumber: 5 },
    },
    _react['default'].createElement(
      _reactNative.Text,
      {
        style:
          isPracticeContest(data.contestType, data.contestCategory) ||
          data.isPartnerContest
            ? _objectSpread(
                _objectSpread({}, styles.headerNameText),
                {},
                { fontSize: 14 }
              )
            : styles.headerNameText,
        __self: _this,
        __source: { fileName: _jsxFileName, lineNumber: 280, columnNumber: 7 },
      },
      diplayContestHeaderName(
        data.contestType,
        data.isPartnerContest,
        data.contestName,
        data.contestCategory,
        data.prizeDisplayText
      )
    ),
    _react['default'].createElement(_reactNative.View, {
      style: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1,
      },
      __self: _this,
      __source: { fileName: _jsxFileName, lineNumber: 297, columnNumber: 7 },
    }),
    data.effectiveEntryFee &&
      !shouldHideJoinButton(
        data.contestSize,
        data.currentSize,
        data.isMultipleEntry,
        data.joinedTeamsCount,
        data.match.status,
        data.hasJoined,
        data.maxAllowedTeams
      )
      ? _react['default'].createElement(
          _reactNative.View,
          {
            style: styles.dashedView,
            accessible: false,
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 320,
              columnNumber: 9,
            },
          },
          _react['default'].createElement(
            _reactNative.Text,
            {
              style: styles.dashedText,
              __self: _this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 321,
                columnNumber: 11,
              },
            },
            formatData(data.entryFee)
          )
        )
      : null,
    _react['default'].createElement(
      _reactNative.Pressable,
      {
        onPress: handlePress,
        __self: _this,
        __source: { fileName: _jsxFileName, lineNumber: 324, columnNumber: 7 },
      },
      _react['default'].createElement(
        _reactNative.View,
        {
          style: [styles.entryFeeContainer, styles.blackBackground],
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 325,
            columnNumber: 9,
          },
        },
        _react['default'].createElement(
          _reactNative.Text,
          {
            style: [styles.entryFeeText],
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 326,
              columnNumber: 11,
            },
          },
          '',
          displayEntryFee(
            data.contestType,
            data.contestCategory,
            data.entryFee,
            data.effectiveEntryFee
          )
        )
      )
    )
  );
};
var styles = _reactNative.StyleSheet.create({
  rootView: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#1a1a1a',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    padding: 10,
    marginBottom: 10,
  },
  ProgressBar: {
    height: 4,
    width: '100%',
    borderRadius: 2,
    backgroundColor: '#FFE0E0',
  },
  whiteBg: { backgroundColor: '#000' },
  cardBox: { marginVertical: 12, marginBottom: 0 },
  cardTag: { marginBottom: -8 },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#1a1a1a',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  dashedText: {
    color: '#109e38',
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  dashedView: { marginLeft: 'auto', marginRight: 8 },
  entryHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 2,
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
  entryFeeText: { color: '#fff', fontSize: 14 },
  entryFeeContainer: {
    backgroundColor: '#109e38',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 76,
  },
  headerNameText: { color: '#1a1a1a', fontSize: 20 },
  headerText: { color: '#797979', fontSize: 12 },
  joinedText: { color: '#797979', fontSize: 14 },
  footer: { borderBottomLeftRadius: 8, borderBottomRightRadius: 8 },
  headerContainer: { justifyContent: 'space-between', flexDirection: 'row' },
  cardSpot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    width: '100%',
  },
  spotLeftText: { color: '#e10000', fontSize: 12, lineHeight: 16 },
  totalSpotText: { color: '#797979', fontSize: 12, lineHeight: 16 },
  upperCardContainer: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
  },
  greenBackground: { backgroundColor: '#333333' },
  blackBackground: { backgroundColor: '#109e38' },
});
var _default = (exports['default'] = ContestCard);
