/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.7.0 (2021-02-10)
 */
(function () {
    'use strict';

    var noop = function () {
    };
    var noarg = function (f) {
      return function () {
        return f();
      };
    };
    var compose = function (fa, fb) {
      return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return fa(fb.apply(null, args));
      };
    };
    var compose1 = function (fbc, fab) {
      return function (a) {
        return fbc(fab(a));
      };
    };
    var constant = function (value) {
      return function () {
        return value;
      };
    };
    var identity = function (x) {
      return x;
    };
    function curry(fn) {
      var initialArgs = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        initialArgs[_i - 1] = arguments[_i];
      }
      return function () {
        var restArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          restArgs[_i] = arguments[_i];
        }
        var all = initialArgs.concat(restArgs);
        return fn.apply(null, all);
      };
    }
    var not = function (f) {
      return function (t) {
        return !f(t);
      };
    };
    var die = function (msg) {
      return function () {
        throw new Error(msg);
      };
    };
    var never = constant(false);
    var always = constant(true);

    var global$1 = tinymce.util.Tools.resolve('tinymce.ThemeManager');

    var __assign = function () {
      __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
      var t = {};
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === 'function')
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    }
    function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++)
        s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
      return r;
    }

    var none = function () {
      return NONE;
    };
    var NONE = function () {
      var eq = function (o) {
        return o.isNone();
      };
      var call = function (thunk) {
        return thunk();
      };
      var id = function (n) {
        return n;
      };
      var me = {
        fold: function (n, _s) {
          return n();
        },
        is: never,
        isSome: never,
        isNone: always,
        getOr: id,
        getOrThunk: call,
        getOrDie: function (msg) {
          throw new Error(msg || 'error: getOrDie called on none.');
        },
        getOrNull: constant(null),
        getOrUndefined: constant(undefined),
        or: id,
        orThunk: call,
        map: none,
        each: noop,
        bind: none,
        exists: never,
        forall: always,
        filter: none,
        equals: eq,
        equals_: eq,
        toArray: function () {
          return [];
        },
        toString: constant('none()')
      };
      return me;
    }();
    var some = function (a) {
      var constant_a = constant(a);
      var self = function () {
        return me;
      };
      var bind = function (f) {
        return f(a);
      };
      var me = {
        fold: function (n, s) {
          return s(a);
        },
        is: function (v) {
          return a === v;
        },
        isSome: always,
        isNone: never,
        getOr: constant_a,
        getOrThunk: constant_a,
        getOrDie: constant_a,
        getOrNull: constant_a,
        getOrUndefined: constant_a,
        or: self,
        orThunk: self,
        map: function (f) {
          return some(f(a));
        },
        each: function (f) {
          f(a);
        },
        bind: bind,
        exists: bind,
        forall: bind,
        filter: function (f) {
          return f(a) ? me : NONE;
        },
        toArray: function () {
          return [a];
        },
        toString: function () {
          return 'some(' + a + ')';
        },
        equals: function (o) {
          return o.is(a);
        },
        equals_: function (o, elementEq) {
          return o.fold(never, function (b) {
            return elementEq(a, b);
          });
        }
      };
      return me;
    };
    var from = function (value) {
      return value === null || value === undefined ? NONE : some(value);
    };
    var Optional = {
      some: some,
      none: none,
      from: from
    };

    var typeOf = function (x) {
      var t = typeof x;
      if (x === null) {
        return 'null';
      } else if (t === 'object' && (Array.prototype.isPrototypeOf(x) || x.constructor && x.constructor.name === 'Array')) {
        return 'array';
      } else if (t === 'object' && (String.prototype.isPrototypeOf(x) || x.constructor && x.constructor.name === 'String')) {
        return 'string';
      } else {
        return t;
      }
    };
    var isType = function (type) {
      return function (value) {
        return typeOf(value) === type;
      };
    };
    var isSimpleType = function (type) {
      return function (value) {
        return typeof value === type;
      };
    };
    var eq = function (t) {
      return function (a) {
        return t === a;
      };
    };
    var isString = isType('string');
    var isObject = isType('object');
    var isArray = isType('array');
    var isBoolean = isSimpleType('boolean');
    var isUndefined = eq(undefined);
    var isNullable = function (a) {
      return a === null || a === undefined;
    };
    var isNonNullable = function (a) {
      return !isNullable(a);
    };
    var isFunction = isSimpleType('function');
    var isNumber = isSimpleType('number');
    var isArrayOf = function (value, pred) {
      if (isArray(value)) {
        for (var i = 0, len = value.length; i < len; ++i) {
          if (!pred(value[i])) {
            return false;
          }
        }
        return true;
      }
      return false;
    };

    var nativeSlice = Array.prototype.slice;
    var nativeIndexOf = Array.prototype.indexOf;
    var nativePush = Array.prototype.push;
    var rawIndexOf = function (ts, t) {
      return nativeIndexOf.call(ts, t);
    };
    var indexOf = function (xs, x) {
      var r = rawIndexOf(xs, x);
      return r === -1 ? Optional.none() : Optional.some(r);
    };
    var contains = function (xs, x) {
      return rawIndexOf(xs, x) > -1;
    };
    var exists = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          return true;
        }
      }
      return false;
    };
    var range = function (num, f) {
      var r = [];
      for (var i = 0; i < num; i++) {
        r.push(f(i));
      }
      return r;
    };
    var chunk = function (array, size) {
      var r = [];
      for (var i = 0; i < array.length; i += size) {
        var s = nativeSlice.call(array, i, i + size);
        r.push(s);
      }
      return r;
    };
    var map = function (xs, f) {
      var len = xs.length;
      var r = new Array(len);
      for (var i = 0; i < len; i++) {
        var x = xs[i];
        r[i] = f(x, i);
      }
      return r;
    };
    var each = function (xs, f) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        f(x, i);
      }
    };
    var eachr = function (xs, f) {
      for (var i = xs.length - 1; i >= 0; i--) {
        var x = xs[i];
        f(x, i);
      }
    };
    var partition = function (xs, pred) {
      var pass = [];
      var fail = [];
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        var arr = pred(x, i) ? pass : fail;
        arr.push(x);
      }
      return {
        pass: pass,
        fail: fail
      };
    };
    var filter = function (xs, pred) {
      var r = [];
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          r.push(x);
        }
      }
      return r;
    };
    var foldr = function (xs, f, acc) {
      eachr(xs, function (x) {
        acc = f(acc, x);
      });
      return acc;
    };
    var foldl = function (xs, f, acc) {
      each(xs, function (x) {
        acc = f(acc, x);
      });
      return acc;
    };
    var findUntil = function (xs, pred, until) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          return Optional.some(x);
        } else if (until(x, i)) {
          break;
        }
      }
      return Optional.none();
    };
    var find = function (xs, pred) {
      return findUntil(xs, pred, never);
    };
    var findIndex = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          return Optional.some(i);
        }
      }
      return Optional.none();
    };
    var flatten = function (xs) {
      var r = [];
      for (var i = 0, len = xs.length; i < len; ++i) {
        if (!isArray(xs[i])) {
          throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs);
        }
        nativePush.apply(r, xs[i]);
      }
      return r;
    };
    var bind = function (xs, f) {
      return flatten(map(xs, f));
    };
    var forall = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; ++i) {
        var x = xs[i];
        if (pred(x, i) !== true) {
          return false;
        }
      }
      return true;
    };
    var reverse = function (xs) {
      var r = nativeSlice.call(xs, 0);
      r.reverse();
      return r;
    };
    var difference = function (a1, a2) {
      return filter(a1, function (x) {
        return !contains(a2, x);
      });
    };
    var mapToObject = function (xs, f) {
      var r = {};
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        r[String(x)] = f(x, i);
      }
      return r;
    };
    var sort = function (xs, comparator) {
      var copy = nativeSlice.call(xs, 0);
      copy.sort(comparator);
      return copy;
    };
    var get = function (xs, i) {
      return i >= 0 && i < xs.length ? Optional.some(xs[i]) : Optional.none();
    };
    var head = function (xs) {
      return get(xs, 0);
    };
    var last = function (xs) {
      return get(xs, xs.length - 1);
    };
    var from$1 = isFunction(Array.from) ? Array.from : function (x) {
      return nativeSlice.call(x);
    };
    var findMap = function (arr, f) {
      for (var i = 0; i < arr.length; i++) {
        var r = f(arr[i], i);
        if (r.isSome()) {
          return r;
        }
      }
      return Optional.none();
    };

    var value = function (o) {
      var is = function (v) {
        return o === v;
      };
      var or = function (_opt) {
        return value(o);
      };
      var orThunk = function (_f) {
        return value(o);
      };
      var map = function (f) {
        return value(f(o));
      };
      var mapError = function (_f) {
        return value(o);
      };
      var each = function (f) {
        f(o);
      };
      var bind = function (f) {
        return f(o);
      };
      var fold = function (_, onValue) {
        return onValue(o);
      };
      var exists = function (f) {
        return f(o);
      };
      var forall = function (f) {
        return f(o);
      };
      var toOptional = function () {
        return Optional.some(o);
      };
      return {
        is: is,
        isValue: always,
        isError: never,
        getOr: constant(o),
        getOrThunk: constant(o),
        getOrDie: constant(o),
        or: or,
        orThunk: orThunk,
        fold: fold,
        map: map,
        mapError: mapError,
        each: each,
        bind: bind,
        exists: exists,
        forall: forall,
        toOptional: toOptional
      };
    };
    var error = function (message) {
      var getOrThunk = function (f) {
        return f();
      };
      var getOrDie = function () {
        return die(String(message))();
      };
      var or = function (opt) {
        return opt;
      };
      var orThunk = function (f) {
        return f();
      };
      var map = function (_f) {
        return error(message);
      };
      var mapError = function (f) {
        return error(f(message));
      };
      var bind = function (_f) {
        return error(message);
      };
      var fold = function (onError, _) {
        return onError(message);
      };
      return {
        is: never,
        isValue: never,
        isError: always,
        getOr: identity,
        getOrThunk: getOrThunk,
        getOrDie: getOrDie,
        or: or,
        orThunk: orThunk,
        fold: fold,
        map: map,
        mapError: mapError,
        each: noop,
        bind: bind,
        exists: never,
        forall: always,
        toOptional: Optional.none
      };
    };
    var fromOption = function (opt, err) {
      return opt.fold(function () {
        return error(err);
      }, value);
    };
    var Result = {
      value: value,
      error: error,
      fromOption: fromOption
    };

    var SimpleResultType;
    (function (SimpleResultType) {
      SimpleResultType[SimpleResultType['Error'] = 0] = 'Error';
      SimpleResultType[SimpleResultType['Value'] = 1] = 'Value';
    }(SimpleResultType || (SimpleResultType = {})));
    var fold = function (res, onError, onValue) {
      return res.stype === SimpleResultType.Error ? onError(res.serror) : onValue(res.svalue);
    };
    var partition$1 = function (results) {
      var values = [];
      var errors = [];
      each(results, function (obj) {
        fold(obj, function (err) {
          return errors.push(err);
        }, function (val) {
          return values.push(val);
        });
      });
      return {
        values: values,
        errors: errors
      };
    };
    var mapError = function (res, f) {
      if (res.stype === SimpleResultType.Error) {
        return {
          stype: SimpleResultType.Error,
          serror: f(res.serror)
        };
      } else {
        return res;
      }
    };
    var map$1 = function (res, f) {
      if (res.stype === SimpleResultType.Value) {
        return {
          stype: SimpleResultType.Value,
          svalue: f(res.svalue)
        };
      } else {
        return res;
      }
    };
    var bind$1 = function (res, f) {
      if (res.stype === SimpleResultType.Value) {
        return f(res.svalue);
      } else {
        return res;
      }
    };
    var bindError = function (res, f) {
      if (res.stype === SimpleResultType.Error) {
        return f(res.serror);
      } else {
        return res;
      }
    };
    var svalue = function (v) {
      return {
        stype: SimpleResultType.Value,
        svalue: v
      };
    };
    var serror = function (e) {
      return {
        stype: SimpleResultType.Error,
        serror: e
      };
    };
    var toResult = function (res) {
      return fold(res, Result.error, Result.value);
    };
    var fromResult = function (res) {
      return res.fold(serror, svalue);
    };
    var SimpleResult = {
      fromResult: fromResult,
      toResult: toResult,
      svalue: svalue,
      partition: partition$1,
      serror: serror,
      bind: bind$1,
      bindError: bindError,
      map: map$1,
      mapError: mapError,
      fold: fold
    };

    var keys = Object.keys;
    var hasOwnProperty = Object.hasOwnProperty;
    var each$1 = function (obj, f) {
      var props = keys(obj);
      for (var k = 0, len = props.length; k < len; k++) {
        var i = props[k];
        var x = obj[i];
        f(x, i);
      }
    };
    var map$2 = function (obj, f) {
      return tupleMap(obj, function (x, i) {
        return {
          k: i,
          v: f(x, i)
        };
      });
    };
    var tupleMap = function (obj, f) {
      var r = {};
      each$1(obj, function (x, i) {
        var tuple = f(x, i);
        r[tuple.k] = tuple.v;
      });
      return r;
    };
    var objAcc = function (r) {
      return function (x, i) {
        r[i] = x;
      };
    };
    var internalFilter = function (obj, pred, onTrue, onFalse) {
      var r = {};
      each$1(obj, function (x, i) {
        (pred(x, i) ? onTrue : onFalse)(x, i);
      });
      return r;
    };
    var filter$1 = function (obj, pred) {
      var t = {};
      internalFilter(obj, pred, objAcc(t), noop);
      return t;
    };
    var mapToArray = function (obj, f) {
      var r = [];
      each$1(obj, function (value, name) {
        r.push(f(value, name));
      });
      return r;
    };
    var find$1 = function (obj, pred) {
      var props = keys(obj);
      for (var k = 0, len = props.length; k < len; k++) {
        var i = props[k];
        var x = obj[i];
        if (pred(x, i, obj)) {
          return Optional.some(x);
        }
      }
      return Optional.none();
    };
    var values = function (obj) {
      return mapToArray(obj, function (v) {
        return v;
      });
    };
    var get$1 = function (obj, key) {
      return has(obj, key) ? Optional.from(obj[key]) : Optional.none();
    };
    var has = function (obj, key) {
      return hasOwnProperty.call(obj, key);
    };
    var hasNonNullableKey = function (obj, key) {
      return has(obj, key) && obj[key] !== undefined && obj[key] !== null;
    };

    var generate = function (cases) {
      if (!isArray(cases)) {
        throw new Error('cases must be an array');
      }
      if (cases.length === 0) {
        throw new Error('there must be at least one case');
      }
      var constructors = [];
      var adt = {};
      each(cases, function (acase, count) {
        var keys$1 = keys(acase);
        if (keys$1.length !== 1) {
          throw new Error('one and only one name per case');
        }
        var key = keys$1[0];
        var value = acase[key];
        if (adt[key] !== undefined) {
          throw new Error('duplicate key detected:' + key);
        } else if (key === 'cata') {
          throw new Error('cannot have a case named cata (sorry)');
        } else if (!isArray(value)) {
          throw new Error('case arguments must be an array');
        }
        constructors.push(key);
        adt[key] = function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var argLength = args.length;
          if (argLength !== value.length) {
            throw new Error('Wrong number of arguments to case ' + key + '. Expected ' + value.length + ' (' + value + '), got ' + argLength);
          }
          var match = function (branches) {
            var branchKeys = keys(branches);
            if (constructors.length !== branchKeys.length) {
              throw new Error('Wrong number of arguments to match. Expected: ' + constructors.join(',') + '\nActual: ' + branchKeys.join(','));
            }
            var allReqd = forall(constructors, function (reqKey) {
              return contains(branchKeys, reqKey);
            });
            if (!allReqd) {
              throw new Error('Not all branches were specified when using match. Specified: ' + branchKeys.join(', ') + '\nRequired: ' + constructors.join(', '));
            }
            return branches[key].apply(null, args);
          };
          return {
            fold: function () {
              var foldArgs = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                foldArgs[_i] = arguments[_i];
              }
              if (foldArgs.length !== cases.length) {
                throw new Error('Wrong number of arguments to fold. Expected ' + cases.length + ', got ' + foldArgs.length);
              }
              var target = foldArgs[count];
              return target.apply(null, args);
            },
            match: match,
            log: function (label) {
              console.log(label, {
                constructors: constructors,
                constructor: key,
                params: args
              });
            }
          };
        };
      });
      return adt;
    };
    var Adt = { generate: generate };

    var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
    var shallow = function (old, nu) {
      return nu;
    };
    var deep = function (old, nu) {
      var bothObjects = isObject(old) && isObject(nu);
      return bothObjects ? deepMerge(old, nu) : nu;
    };
    var baseMerge = function (merger) {
      return function () {
        var objects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          objects[_i] = arguments[_i];
        }
        if (objects.length === 0) {
          throw new Error('Can\'t merge zero objects');
        }
        var ret = {};
        for (var j = 0; j < objects.length; j++) {
          var curObject = objects[j];
          for (var key in curObject) {
            if (hasOwnProperty$1.call(curObject, key)) {
              ret[key] = merger(ret[key], curObject[key]);
            }
          }
        }
        return ret;
      };
    };
    var deepMerge = baseMerge(deep);
    var merge = baseMerge(shallow);

    var cached = function (f) {
      var called = false;
      var r;
      return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (!called) {
          called = true;
          r = f.apply(null, args);
        }
        return r;
      };
    };

    var adt = Adt.generate([
      { strict: [] },
      { defaultedThunk: ['fallbackThunk'] },
      { asOption: [] },
      { asDefaultedOptionThunk: ['fallbackThunk'] },
      { mergeWithThunk: ['baseThunk'] }
    ]);
    var defaulted = function (fallback) {
      return adt.defaultedThunk(constant(fallback));
    };
    var mergeWith = function (base) {
      return adt.mergeWithThunk(constant(base));
    };
    var strict = adt.strict;
    var asOption = adt.asOption;
    var defaultedThunk = adt.defaultedThunk;
    var asDefaultedOptionThunk = adt.asDefaultedOptionThunk;
    var mergeWithThunk = adt.mergeWithThunk;

    var comparison = Adt.generate([
      {
        bothErrors: [
          'error1',
          'error2'
        ]
      },
      {
        firstError: [
          'error1',
          'value2'
        ]
      },
      {
        secondError: [
          'value1',
          'error2'
        ]
      },
      {
        bothValues: [
          'value1',
          'value2'
        ]
      }
    ]);
    var partition$2 = function (results) {
      var errors = [];
      var values = [];
      each(results, function (result) {
        result.fold(function (err) {
          errors.push(err);
        }, function (value) {
          values.push(value);
        });
      });
      return {
        errors: errors,
        values: values
      };
    };

    var exclude = function (obj, fields) {
      var r = {};
      each$1(obj, function (v, k) {
        if (!contains(fields, k)) {
          r[k] = v;
        }
      });
      return r;
    };

    var wrap = function (key, value) {
      var _a;
      return _a = {}, _a[key] = value, _a;
    };
    var wrapAll = function (keyvalues) {
      var r = {};
      each(keyvalues, function (kv) {
        r[kv.key] = kv.value;
      });
      return r;
    };

    var exclude$1 = function (obj, fields) {
      return exclude(obj, fields);
    };
    var wrap$1 = function (key, value) {
      return wrap(key, value);
    };
    var wrapAll$1 = function (keyvalues) {
      return wrapAll(keyvalues);
    };
    var mergeValues = function (values, base) {
      return values.length === 0 ? Result.value(base) : Result.value(deepMerge(base, merge.apply(undefined, values)));
    };
    var mergeErrors = function (errors) {
      return Result.error(flatten(errors));
    };
    var consolidate = function (objs, base) {
      var partitions = partition$2(objs);
      return partitions.errors.length > 0 ? mergeErrors(partitions.errors) : mergeValues(partitions.values, base);
    };

    var mergeValues$1 = function (values, base) {
      return values.length > 0 ? SimpleResult.svalue(deepMerge(base, merge.apply(undefined, values))) : SimpleResult.svalue(base);
    };
    var mergeErrors$1 = function (errors) {
      return compose(SimpleResult.serror, flatten)(errors);
    };
    var consolidateObj = function (objects, base) {
      var partition = SimpleResult.partition(objects);
      return partition.errors.length > 0 ? mergeErrors$1(partition.errors) : mergeValues$1(partition.values, base);
    };
    var consolidateArr = function (objects) {
      var partitions = SimpleResult.partition(objects);
      return partitions.errors.length > 0 ? mergeErrors$1(partitions.errors) : SimpleResult.svalue(partitions.values);
    };
    var ResultCombine = {
      consolidateObj: consolidateObj,
      consolidateArr: consolidateArr
    };

    var formatObj = function (input) {
      return isObject(input) && keys(input).length > 100 ? ' removed due to size' : JSON.stringify(input, null, 2);
    };
    var formatErrors = function (errors) {
      var es = errors.length > 10 ? errors.slice(0, 10).concat([{
          path: [],
          getErrorInfo: function () {
            return '... (only showing first ten failures)';
          }
        }]) : errors;
      return map(es, function (e) {
        return 'Failed path: (' + e.path.join(' > ') + ')\n' + e.getErrorInfo();
      });
    };

    var nu = function (path, getErrorInfo) {
      return SimpleResult.serror([{
          path: path,
          getErrorInfo: getErrorInfo
        }]);
    };
    var missingStrict = function (path, key, obj) {
      return nu(path, function () {
        return 'Could not find valid *strict* value for "' + key + '" in ' + formatObj(obj);
      });
    };
    var missingKey = function (path, key) {
      return nu(path, function () {
        return 'Choice schema did not contain choice key: "' + key + '"';
      });
    };
    var missingBranch = function (path, branches, branch) {
      return nu(path, function () {
        return 'The chosen schema: "' + branch + '" did not exist in branches: ' + formatObj(branches);
      });
    };
    var unsupportedFields = function (path, unsupported) {
      return nu(path, function () {
        return 'There are unsupported fields: [' + unsupported.join(', ') + '] specified';
      });
    };
    var custom = function (path, err) {
      return nu(path, function () {
        return err;
      });
    };

    var adt$1 = Adt.generate([
      {
        field: [
          'key',
          'okey',
          'presence',
          'prop'
        ]
      },
      {
        state: [
          'okey',
          'instantiator'
        ]
      }
    ]);
    var strictAccess = function (path, obj, key) {
      return get$1(obj, key).fold(function () {
        return missingStrict(path, key, obj);
      }, SimpleResult.svalue);
    };
    var fallbackAccess = function (obj, key, fallbackThunk) {
      var v = get$1(obj, key).fold(function () {
        return fallbackThunk(obj);
      }, identity);
      return SimpleResult.svalue(v);
    };
    var optionAccess = function (obj, key) {
      return SimpleResult.svalue(get$1(obj, key));
    };
    var optionDefaultedAccess = function (obj, key, fallback) {
      var opt = get$1(obj, key).map(function (val) {
        return val === true ? fallback(obj) : val;
      });
      return SimpleResult.svalue(opt);
    };
    var cExtractOne = function (path, obj, field, strength) {
      return field.fold(function (key, okey, presence, prop) {
        var bundle = function (av) {
          var result = prop.extract(path.concat([key]), strength, av);
          return SimpleResult.map(result, function (res) {
            return wrap(okey, strength(res));
          });
        };
        var bundleAsOption = function (optValue) {
          return optValue.fold(function () {
            var outcome = wrap(okey, strength(Optional.none()));
            return SimpleResult.svalue(outcome);
          }, function (ov) {
            var result = prop.extract(path.concat([key]), strength, ov);
            return SimpleResult.map(result, function (res) {
              return wrap(okey, strength(Optional.some(res)));
            });
          });
        };
        return function () {
          return presence.fold(function () {
            return SimpleResult.bind(strictAccess(path, obj, key), bundle);
          }, function (fallbackThunk) {
            return SimpleResult.bind(fallbackAccess(obj, key, fallbackThunk), bundle);
          }, function () {
            return SimpleResult.bind(optionAccess(obj, key), bundleAsOption);
          }, function (fallbackThunk) {
            return SimpleResult.bind(optionDefaultedAccess(obj, key, fallbackThunk), bundleAsOption);
          }, function (baseThunk) {
            var base = baseThunk(obj);
            var result = SimpleResult.map(fallbackAccess(obj, key, constant({})), function (v) {
              return deepMerge(base, v);
            });
            return SimpleResult.bind(result, bundle);
          });
        }();
      }, function (okey, instantiator) {
        var state = instantiator(obj);
        return SimpleResult.svalue(wrap(okey, strength(state)));
      });
    };
    var cExtract = function (path, obj, fields, strength) {
      var results = map(fields, function (field) {
        return cExtractOne(path, obj, field, strength);
      });
      return ResultCombine.consolidateObj(results, {});
    };
    var valueThunk = function (getDelegate) {
      var extract = function (path, strength, val) {
        return getDelegate().extract(path, strength, val);
      };
      var toString = function () {
        return getDelegate().toString();
      };
      return {
        extract: extract,
        toString: toString
      };
    };
    var value$1 = function (validator) {
      var extract = function (path, strength, val) {
        return SimpleResult.bindError(validator(val, strength), function (err) {
          return custom(path, err);
        });
      };
      var toString = function () {
        return 'val';
      };
      return {
        extract: extract,
        toString: toString
      };
    };
    var getSetKeys = function (obj) {
      return keys(filter$1(obj, function (value) {
        return value !== undefined && value !== null;
      }));
    };
    var objOfOnly = function (fields) {
      var delegate = objOf(fields);
      var fieldNames = foldr(fields, function (acc, f) {
        return f.fold(function (key) {
          return deepMerge(acc, wrap$1(key, true));
        }, constant(acc));
      }, {});
      var extract = function (path, strength, o) {
        var keys = isBoolean(o) ? [] : getSetKeys(o);
        var extra = filter(keys, function (k) {
          return !hasNonNullableKey(fieldNames, k);
        });
        return extra.length === 0 ? delegate.extract(path, strength, o) : unsupportedFields(path, extra);
      };
      return {
        extract: extract,
        toString: delegate.toString
      };
    };
    var objOf = function (fields) {
      var extract = function (path, strength, o) {
        return cExtract(path, o, fields, strength);
      };
      var toString = function () {
        var fieldStrings = map(fields, function (field) {
          return field.fold(function (key, okey, presence, prop) {
            return key + ' -> ' + prop.toString();
          }, function (okey, _instantiator) {
            return 'state(' + okey + ')';
          });
        });
        return 'obj{\n' + fieldStrings.join('\n') + '}';
      };
      return {
        extract: extract,
        toString: toString
      };
    };
    var arrOf = function (prop) {
      var extract = function (path, strength, array) {
        var results = map(array, function (a, i) {
          return prop.extract(path.concat(['[' + i + ']']), strength, a);
        });
        return ResultCombine.consolidateArr(results);
      };
      var toString = function () {
        return 'array(' + prop.toString() + ')';
      };
      return {
        extract: extract,
        toString: toString
      };
    };
    var oneOf = function (props) {
      var extract = function (path, strength, val) {
        var errors = [];
        for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
          var prop = props_1[_i];
          var res = prop.extract(path, strength, val);
          if (res.stype === SimpleResultType.Value) {
            return res;
          }
          errors.push(res);
        }
        return ResultCombine.consolidateArr(errors);
      };
      var toString = function () {
        return 'oneOf(' + map(props, function (prop) {
          return prop.toString();
        }).join(', ') + ')';
      };
      return {
        extract: extract,
        toString: toString
      };
    };
    var setOf = function (validator, prop) {
      var validateKeys = function (path, keys) {
        return arrOf(value$1(validator)).extract(path, identity, keys);
      };
      var extract = function (path, strength, o) {
        var keys$1 = keys(o);
        var validatedKeys = validateKeys(path, keys$1);
        return SimpleResult.bind(validatedKeys, function (validKeys) {
          var schema = map(validKeys, function (vk) {
            return adt$1.field(vk, vk, strict(), prop);
          });
          return objOf(schema).extract(path, strength, o);
        });
      };
      var toString = function () {
        return 'setOf(' + prop.toString() + ')';
      };
      return {
        extract: extract,
        toString: toString
      };
    };
    var thunk = function (desc, processor) {
      var getP = cached(function () {
        return processor();
      });
      var extract = function (path, strength, val) {
        return getP().extract(path, strength, val);
      };
      var toString = function () {
        return getP().toString();
      };
      return {
        extract: extract,
        toString: toString
      };
    };
    var anyValue = constant(value$1(SimpleResult.svalue));
    var arrOfObj = compose(arrOf, objOf);
    var state = adt$1.state;
    var field = adt$1.field;

    var chooseFrom = function (path, strength, input, branches, ch) {
      var fields = get$1(branches, ch);
      return fields.fold(function () {
        return missingBranch(path, branches, ch);
      }, function (vp) {
        return vp.extract(path.concat(['branch: ' + ch]), strength, input);
      });
    };
    var choose = function (key, branches) {
      var extract = function (path, strength, input) {
        var choice = get$1(input, key);
        return choice.fold(function () {
          return missingKey(path, key);
        }, function (chosen) {
          return chooseFrom(path, strength, input, branches, chosen);
        });
      };
      var toString = function () {
        return 'chooseOn(' + key + '). Possible values: ' + keys(branches);
      };
      return {
        extract: extract,
        toString: toString
      };
    };

    var _anyValue = value$1(SimpleResult.svalue);
    var arrOfObj$1 = function (objFields) {
      return arrOfObj(objFields);
    };
    var arrOfVal = function () {
      return arrOf(_anyValue);
    };
    var valueThunkOf = valueThunk;
    var valueOf = function (validator) {
      return value$1(function (v) {
        return validator(v).fold(SimpleResult.serror, SimpleResult.svalue);
      });
    };
    var setOf$1 = function (validator, prop) {
      return setOf(function (v) {
        return SimpleResult.fromResult(validator(v));
      }, prop);
    };
    var extract = function (label, prop, strength, obj) {
      var res = prop.extract([label], strength, obj);
      return SimpleResult.mapError(res, function (errs) {
        return {
          input: obj,
          errors: errs
        };
      });
    };
    var asRaw = function (label, prop, obj) {
      return SimpleResult.toResult(extract(label, prop, identity, obj));
    };
    var getOrDie = function (extraction) {
      return extraction.fold(function (errInfo) {
        throw new Error(formatError(errInfo));
      }, identity);
    };
    var asRawOrDie = function (label, prop, obj) {
      return getOrDie(asRaw(label, prop, obj));
    };
    var formatError = function (errInfo) {
      return 'Errors: \n' + formatErrors(errInfo.errors).join('\n') + '\n\nInput object: ' + formatObj(errInfo.input);
    };
    var chooseProcessor = function (key, branches) {
      return choose(key, branches);
    };
    var choose$1 = function (key, branches) {
      return choose(key, map$2(branches, objOf));
    };
    var thunkOf = function (desc, schema) {
      return thunk(desc, schema);
    };
    var anyValue$1 = constant(_anyValue);
    var typedValue = function (validator, expectedType) {
      return value$1(function (a) {
        var actualType = typeof a;
        return validator(a) ? SimpleResult.svalue(a) : SimpleResult.serror('Expected type: ' + expectedType + ' but got: ' + actualType);
      });
    };
    var number = typedValue(isNumber, 'number');
    var string = typedValue(isString, 'string');
    var boolean = typedValue(isBoolean, 'boolean');
    var functionProcessor = typedValue(isFunction, 'function');
    var isPostMessageable = function (val) {
      var every = function (iter, callbackFn) {
        var result = iter.next();
        while (!result.done) {
          if (!callbackFn(result.value)) {
            return false;
          }
          result = iter.next();
        }
        return true;
      };
      if (Object(val) !== val) {
        return true;
      }
      switch ({}.toString.call(val).slice(8, -1)) {
      case 'Boolean':
      case 'Number':
      case 'String':
      case 'Date':
      case 'RegExp':
      case 'Blob':
      case 'FileList':
      case 'ImageData':
      case 'ImageBitmap':
      case 'ArrayBuffer':
        return true;
      case 'Array':
      case 'Object':
        return Object.keys(val).every(function (prop) {
          return isPostMessageable(val[prop]);
        });
      case 'Map':
        return every(val.keys(), isPostMessageable) && every(val.values(), isPostMessageable);
      case 'Set':
        return every(val.keys(), isPostMessageable);
      default:
        return false;
      }
    };
    var postMessageable = value$1(function (a) {
      return isPostMessageable(a) ? SimpleResult.svalue(a) : SimpleResult.serror('Expected value to be acceptable for sending via postMessage');
    });

    var validateEnum = function (values) {
      return valueOf(function (value) {
        return contains(values, value) ? Result.value(value) : Result.error('Unsupported value: "' + value + '", choose one of "' + values.join(', ') + '".');
      });
    };
    var strict$1 = function (key) {
      return field(key, key, strict(), anyValue());
    };
    var strictOf = function (key, schema) {
      return field(key, key, strict(), schema);
    };
    var strictNumber = function (key) {
      return strictOf(key, number);
    };
    var strictString = function (key) {
      return strictOf(key, string);
    };
    var strictStringEnum = function (key, values) {
      return field(key, key, strict(), validateEnum(values));
    };
    var strictBoolean = function (key) {
      return strictOf(key, boolean);
    };
    var strictFunction = function (key) {
      return strictOf(key, functionProcessor);
    };
    var forbid = function (key, message) {
      return field(key, key, asOption(), value$1(function (_v) {
        return SimpleResult.serror('The field: ' + key + ' is forbidden. ' + message);
      }));
    };
    var strictObjOf = function (key, objSchema) {
      return field(key, key, strict(), objOf(objSchema));
    };
    var strictArrayOfObj = function (key, objFields) {
      return field(key, key, strict(), arrOfObj(objFields));
    };
    var strictArrayOf = function (key, schema) {
      return field(key, key, strict(), arrOf(schema));
    };
    var option = function (key) {
      return field(key, key, asOption(), anyValue());
    };
    var optionOf = function (key, schema) {
      return field(key, key, asOption(), schema);
    };
    var optionNumber = function (key) {
      return optionOf(key, number);
    };
    var optionString = function (key) {
      return optionOf(key, string);
    };
    var optionFunction = function (key) {
      return optionOf(key, functionProcessor);
    };
    var optionArrayOf = function (key, schema) {
      return optionOf(key, arrOf(schema));
    };
    var optionObjOf = function (key, objSchema) {
      return optionOf(key, objOf(objSchema));
    };
    var optionObjOfOnly = function (key, objSchema) {
      return optionOf(key, objOfOnly(objSchema));
    };
    var defaulted$1 = function (key, fallback) {
      return field(key, key, defaulted(fallback), anyValue());
    };
    var defaultedOf = function (key, fallback, schema) {
      return field(key, key, defaulted(fallback), schema);
    };
    var defaultedNumber = function (key, fallback) {
      return defaultedOf(key, fallback, number);
    };
    var defaultedString = function (key, fallback) {
      return defaultedOf(key, fallback, string);
    };
    var defaultedStringEnum = function (key, fallback, values) {
      return defaultedOf(key, fallback, validateEnum(values));
    };
    var defaultedBoolean = function (key, fallback) {
      return defaultedOf(key, fallback, boolean);
    };
    var defaultedFunction = function (key, fallback) {
      return defaultedOf(key, fallback, functionProcessor);
    };
    var defaultedPostMsg = function (key, fallback) {
      return defaultedOf(key, fallback, postMessageable);
    };
    var defaultedArrayOf = function (key, fallback, schema) {
      return defaultedOf(key, fallback, arrOf(schema));
    };
    var defaultedObjOf = function (key, fallback, objSchema) {
      return defaultedOf(key, fallback, objOf(objSchema));
    };
    var state$1 = function (okey, instantiator) {
      return state(okey, instantiator);
    };

    var Cell = function (initial) {
      var value = initial;
      var get = function () {
        return value;
      };
      var set = function (v) {
        value = v;
      };
      return {
        get: get,
        set: set
      };
    };

    var fromHtml = function (html, scope) {
      var doc = scope || document;
      var div = doc.createElement('div');
      div.innerHTML = html;
      if (!div.hasChildNodes() || div.childNodes.length > 1) {
        console.error('HTML does not have a single root node', html);
        throw new Error('HTML must have a single root node');
      }
      return fromDom(div.childNodes[0]);
    };
    var fromTag = function (tag, scope) {
      var doc = scope || document;
      var node = doc.createElement(tag);
      return fromDom(node);
    };
    var fromText = function (text, scope) {
      var doc = scope || document;
      var node = doc.createTextNode(text);
      return fromDom(node);
    };
    var fromDom = function (node) {
      if (node === null || node === undefined) {
        throw new Error('Node cannot be null or undefined');
      }
      return { dom: node };
    };
    var fromPoint = function (docElm, x, y) {
      return Optional.from(docElm.dom.elementFromPoint(x, y)).map(fromDom);
    };
    var SugarElement = {
      fromHtml: fromHtml,
      fromTag: fromTag,
      fromText: fromText,
      fromDom: fromDom,
      fromPoint: fromPoint
    };

    var DeviceType = function (os, browser, userAgent, mediaMatch) {
      var isiPad = os.isiOS() && /ipad/i.test(userAgent) === true;
      var isiPhone = os.isiOS() && !isiPad;
      var isMobile = os.isiOS() || os.isAndroid();
      var isTouch = isMobile || mediaMatch('(pointer:coarse)');
      var isTablet = isiPad || !isiPhone && isMobile && mediaMatch('(min-device-width:768px)');
      var isPhone = isiPhone || isMobile && !isTablet;
      var iOSwebview = browser.isSafari() && os.isiOS() && /safari/i.test(userAgent) === false;
      var isDesktop = !isPhone && !isTablet && !iOSwebview;
      return {
        isiPad: constant(isiPad),
        isiPhone: constant(isiPhone),
        isTablet: constant(isTablet),
        isPhone: constant(isPhone),
        isTouch: constant(isTouch),
        isAndroid: os.isAndroid,
        isiOS: os.isiOS,
        isWebView: constant(iOSwebview),
        isDesktop: constant(isDesktop)
      };
    };

    var firstMatch = function (regexes, s) {
      for (var i = 0; i < regexes.length; i++) {
        var x = regexes[i];
        if (x.test(s)) {
          return x;
        }
      }
      return undefined;
    };
    var find$2 = function (regexes, agent) {
      var r = firstMatch(regexes, agent);
      if (!r) {
        return {
          major: 0,
          minor: 0
        };
      }
      var group = function (i) {
        return Number(agent.replace(r, '$' + i));
      };
      return nu$1(group(1), group(2));
    };
    var detect = function (versionRegexes, agent) {
      var cleanedAgent = String(agent).toLowerCase();
      if (versionRegexes.length === 0) {
        return unknown();
      }
      return find$2(versionRegexes, cleanedAgent);
    };
    var unknown = function () {
      return nu$1(0, 0);
    };
    var nu$1 = function (major, minor) {
      return {
        major: major,
        minor: minor
      };
    };
    var Version = {
      nu: nu$1,
      detect: detect,
      unknown: unknown
    };

    var detect$1 = function (candidates, userAgent) {
      var agent = String(userAgent).toLowerCase();
      return find(candidates, function (candidate) {
        return candidate.search(agent);
      });
    };
    var detectBrowser = function (browsers, userAgent) {
      return detect$1(browsers, userAgent).map(function (browser) {
        var version = Version.detect(browser.versionRegexes, userAgent);
        return {
          current: browser.name,
          version: version
        };
      });
    };
    var detectOs = function (oses, userAgent) {
      return detect$1(oses, userAgent).map(function (os) {
        var version = Version.detect(os.versionRegexes, userAgent);
        return {
          current: os.name,
          version: version
        };
      });
    };
    var UaString = {
      detectBrowser: detectBrowser,
      detectOs: detectOs
    };

    var checkRange = function (str, substr, start) {
      return substr === '' || str.length >= substr.length && str.substr(start, start + substr.length) === substr;
    };
    var contains$1 = function (str, substr) {
      return str.indexOf(substr) !== -1;
    };
    var endsWith = function (str, suffix) {
      return checkRange(str, suffix, str.length - suffix.length);
    };
    var blank = function (r) {
      return function (s) {
        return s.replace(r, '');
      };
    };
    var trim = blank(/^\s+|\s+$/g);

    var normalVersionRegex = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/;
    var checkContains = function (target) {
      return function (uastring) {
        return contains$1(uastring, target);
      };
    };
    var browsers = [
      {
        name: 'Edge',
        versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
        search: function (uastring) {
          return contains$1(uastring, 'edge/') && contains$1(uastring, 'chrome') && contains$1(uastring, 'safari') && contains$1(uastring, 'applewebkit');
        }
      },
      {
        name: 'Chrome',
        versionRegexes: [
          /.*?chrome\/([0-9]+)\.([0-9]+).*/,
          normalVersionRegex
        ],
        search: function (uastring) {
          return contains$1(uastring, 'chrome') && !contains$1(uastring, 'chromeframe');
        }
      },
      {
        name: 'IE',
        versionRegexes: [
          /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
          /.*?rv:([0-9]+)\.([0-9]+).*/
        ],
        search: function (uastring) {
          return contains$1(uastring, 'msie') || contains$1(uastring, 'trident');
        }
      },
      {
        name: 'Opera',
        versionRegexes: [
          normalVersionRegex,
          /.*?opera\/([0-9]+)\.([0-9]+).*/
        ],
        search: checkContains('opera')
      },
      {
        name: 'Firefox',
        versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
        search: checkContains('firefox')
      },
      {
        name: 'Safari',
        versionRegexes: [
          normalVersionRegex,
          /.*?cpu os ([0-9]+)_([0-9]+).*/
        ],
        search: function (uastring) {
          return (contains$1(uastring, 'safari') || contains$1(uastring, 'mobile/')) && contains$1(uastring, 'applewebkit');
        }
      }
    ];
    var oses = [
      {
        name: 'Windows',
        search: checkContains('win'),
        versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
      },
      {
        name: 'iOS',
        search: function (uastring) {
          return contains$1(uastring, 'iphone') || contains$1(uastring, 'ipad');
        },
        versionRegexes: [
          /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
          /.*cpu os ([0-9]+)_([0-9]+).*/,
          /.*cpu iphone os ([0-9]+)_([0-9]+).*/
        ]
      },
      {
        name: 'Android',
        search: checkContains('android'),
        versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
      },
      {
        name: 'OSX',
        search: checkContains('mac os x'),
        versionRegexes: [/.*?mac\ os\ x\ ?([0-9]+)_([0-9]+).*/]
      },
      {
        name: 'Linux',
        search: checkContains('linux'),
        versionRegexes: []
      },
      {
        name: 'Solaris',
        search: checkContains('sunos'),
        versionRegexes: []
      },
      {
        name: 'FreeBSD',
        search: checkContains('freebsd'),
        versionRegexes: []
      },
      {
        name: 'ChromeOS',
        search: checkContains('cros'),
        versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/]
      }
    ];
    var PlatformInfo = {
      browsers: constant(browsers),
      oses: constant(oses)
    };

    var edge = 'Edge';
    var chrome = 'Chrome';
    var ie = 'IE';
    var opera = 'Opera';
    var firefox = 'Firefox';
    var safari = 'Safari';
    var unknown$1 = function () {
      return nu$2({
        current: undefined,
        version: Version.unknown()
      });
    };
    var nu$2 = function (info) {
      var current = info.current;
      var version = info.version;
      var isBrowser = function (name) {
        return function () {
          return current === name;
        };
      };
      return {
        current: current,
        version: version,
        isEdge: isBrowser(edge),
        isChrome: isBrowser(chrome),
        isIE: isBrowser(ie),
        isOpera: isBrowser(opera),
        isFirefox: isBrowser(firefox),
        isSafari: isBrowser(safari)
      };
    };
    var Browser = {
      unknown: unknown$1,
      nu: nu$2,
      edge: constant(edge),
      chrome: constant(chrome),
      ie: constant(ie),
      opera: constant(opera),
      firefox: constant(firefox),
      safari: constant(safari)
    };

    var windows = 'Windows';
    var ios = 'iOS';
    var android = 'Android';
    var linux = 'Linux';
    var osx = 'OSX';
    var solaris = 'Solaris';
    var freebsd = 'FreeBSD';
    var chromeos = 'ChromeOS';
    var unknown$2 = function () {
      return nu$3({
        current: undefined,
        version: Version.unknown()
      });
    };
    var nu$3 = function (info) {
      var current = info.current;
      var version = info.version;
      var isOS = function (name) {
        return function () {
          return current === name;
        };
      };
      return {
        current: current,
        version: version,
        isWindows: isOS(windows),
        isiOS: isOS(ios),
        isAndroid: isOS(android),
        isOSX: isOS(osx),
        isLinux: isOS(linux),
        isSolaris: isOS(solaris),
        isFreeBSD: isOS(freebsd),
        isChromeOS: isOS(chromeos)
      };
    };
    var OperatingSystem = {
      unknown: unknown$2,
      nu: nu$3,
      windows: constant(windows),
      ios: constant(ios),
      android: constant(android),
      linux: constant(linux),
      osx: constant(osx),
      solaris: constant(solaris),
      freebsd: constant(freebsd),
      chromeos: constant(chromeos)
    };

    var detect$2 = function (userAgent, mediaMatch) {
      var browsers = PlatformInfo.browsers();
      var oses = PlatformInfo.oses();
      var browser = UaString.detectBrowser(browsers, userAgent).fold(Browser.unknown, Browser.nu);
      var os = UaString.detectOs(oses, userAgent).fold(OperatingSystem.unknown, OperatingSystem.nu);
      var deviceType = DeviceType(os, browser, userAgent, mediaMatch);
      return {
        browser: browser,
        os: os,
        deviceType: deviceType
      };
    };
    var PlatformDetection = { detect: detect$2 };

    var mediaMatch = function (query) {
      return window.matchMedia(query).matches;
    };
    var platform = cached(function () {
      return PlatformDetection.detect(navigator.userAgent, mediaMatch);
    });
    var detect$3 = function () {
      return platform();
    };

    var compareDocumentPosition = function (a, b, match) {
      return (a.compareDocumentPosition(b) & match) !== 0;
    };
    var documentPositionContainedBy = function (a, b) {
      return compareDocumentPosition(a, b, Node.DOCUMENT_POSITION_CONTAINED_BY);
    };

    var DOCUMENT = 9;
    var DOCUMENT_FRAGMENT = 11;
    var ELEMENT = 1;
    var TEXT = 3;

    var is = function (element, selector) {
      var dom = element.dom;
      if (dom.nodeType !== ELEMENT) {
        return false;
      } else {
        var elem = dom;
        if (elem.matches !== undefined) {
          return elem.matches(selector);
        } else if (elem.msMatchesSelector !== undefined) {
          return elem.msMatchesSelector(selector);
        } else if (elem.webkitMatchesSelector !== undefined) {
          return elem.webkitMatchesSelector(selector);
        } else if (elem.mozMatchesSelector !== undefined) {
          return elem.mozMatchesSelector(selector);
        } else {
          throw new Error('Browser lacks native selectors');
        }
      }
    };
    var bypassSelector = function (dom) {
      return dom.nodeType !== ELEMENT && dom.nodeType !== DOCUMENT && dom.nodeType !== DOCUMENT_FRAGMENT || dom.childElementCount === 0;
    };
    var all = function (selector, scope) {
      var base = scope === undefined ? document : scope.dom;
      return bypassSelector(base) ? [] : map(base.querySelectorAll(selector), SugarElement.fromDom);
    };
    var one = function (selector, scope) {
      var base = scope === undefined ? document : scope.dom;
      return bypassSelector(base) ? Optional.none() : Optional.from(base.querySelector(selector)).map(SugarElement.fromDom);
    };

    var eq$1 = function (e1, e2) {
      return e1.dom === e2.dom;
    };
    var regularContains = function (e1, e2) {
      var d1 = e1.dom;
      var d2 = e2.dom;
      return d1 === d2 ? false : d1.contains(d2);
    };
    var ieContains = function (e1, e2) {
      return documentPositionContainedBy(e1.dom, e2.dom);
    };
    var contains$2 = function (e1, e2) {
      return detect$3().browser.isIE() ? ieContains(e1, e2) : regularContains(e1, e2);
    };

    var ensureIsRoot = function (isRoot) {
      return isFunction(isRoot) ? isRoot : never;
    };
    var ancestor = function (scope, transform, isRoot) {
      var element = scope.dom;
      var stop = ensureIsRoot(isRoot);
      while (element.parentNode) {
        element = element.parentNode;
        var el = SugarElement.fromDom(element);
        var transformed = transform(el);
        if (transformed.isSome()) {
          return transformed;
        } else if (stop(el)) {
          break;
        }
      }
      return Optional.none();
    };
    var closest = function (scope, transform, isRoot) {
      var current = transform(scope);
      var stop = ensureIsRoot(isRoot);
      return current.orThunk(function () {
        return stop(scope) ? Optional.none() : ancestor(scope, transform, stop);
      });
    };

    var isSource = function (component, simulatedEvent) {
      return eq$1(component.element, simulatedEvent.event.target);
    };

    var nu$4 = function (parts) {
      if (!hasNonNullableKey(parts, 'can') && !hasNonNullableKey(parts, 'abort') && !hasNonNullableKey(parts, 'run')) {
        throw new Error('EventHandler defined by: ' + JSON.stringify(parts, null, 2) + ' does not have can, abort, or run!');
      }
      return asRawOrDie('Extracting event.handler', objOfOnly([
        defaulted$1('can', always),
        defaulted$1('abort', never),
        defaulted$1('run', noop)
      ]), parts);
    };
    var all$1 = function (handlers, f) {
      return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return foldl(handlers, function (acc, handler) {
          return acc && f(handler).apply(undefined, args);
        }, true);
      };
    };
    var any = function (handlers, f) {
      return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return foldl(handlers, function (acc, handler) {
          return acc || f(handler).apply(undefined, args);
        }, false);
      };
    };
    var read = function (handler) {
      return isFunction(handler) ? {
        can: always,
        abort: never,
        run: handler
      } : handler;
    };
    var fuse = function (handlers) {
      var can = all$1(handlers, function (handler) {
        return handler.can;
      });
      var abort = any(handlers, function (handler) {
        return handler.abort;
      });
      var run = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        each(handlers, function (handler) {
          handler.run.apply(undefined, args);
        });
      };
      return nu$4({
        can: can,
        abort: abort,
        run: run
      });
    };

    var constant$1 = constant;
    var touchstart = constant$1('touchstart');
    var touchmove = constant$1('touchmove');
    var touchend = constant$1('touchend');
    var touchcancel = constant$1('touchcancel');
    var mousedown = constant$1('mousedown');
    var mousemove = constant$1('mousemove');
    var mouseout = constant$1('mouseout');
    var mouseup = constant$1('mouseup');
    var mouseover = constant$1('mouseover');
    var focusin = constant$1('focusin');
    var focusout = constant$1('focusout');
    var keydown = constant$1('keydown');
    var keyup = constant$1('keyup');
    var input = constant$1('input');
    var change = constant$1('change');
    var click = constant$1('click');
    var transitionend = constant$1('transitionend');
    var selectstart = constant$1('selectstart');

    var prefixName = function (name) {
      return constant('alloy.' + name);
    };
    var alloy = { tap: prefixName('tap') };
    var focus = prefixName('focus');
    var postBlur = prefixName('blur.post');
    var postPaste = prefixName('paste.post');
    var receive = prefixName('receive');
    var execute = prefixName('execute');
    var focusItem = prefixName('focus.item');
    var tap = alloy.tap;
    var longpress = prefixName('longpress');
    var sandboxClose = prefixName('sandbox.close');
    var typeaheadCancel = prefixName('typeahead.cancel');
    var systemInit = prefixName('system.init');
    var documentTouchmove = prefixName('system.touchmove');
    var documentTouchend = prefixName('system.touchend');
    var windowScroll = prefixName('system.scroll');
    var windowResize = prefixName('system.resize');
    var attachedToDom = prefixName('system.attached');
    var detachedFromDom = prefixName('system.detached');
    var dismissRequested = prefixName('system.dismissRequested');
    var repositionRequested = prefixName('system.repositionRequested');
    var focusShifted = prefixName('focusmanager.shifted');
    var slotVisibility = prefixName('slotcontainer.visibility');
    var changeTab = prefixName('change.tab');
    var dismissTab = prefixName('dismiss.tab');
    var highlight = prefixName('highlight');
    var dehighlight = prefixName('dehighlight');

    var emit = function (component, event) {
      dispatchWith(component, component.element, event, {});
    };
    var emitWith = function (component, event, properties) {
      dispatchWith(component, component.element, event, properties);
    };
    var emitExecute = function (component) {
      emit(component, execute());
    };
    var dispatch = function (component, target, event) {
      dispatchWith(component, target, event, {});
    };
    var dispatchWith = function (component, target, event, properties) {
      var data = __assign({ target: target }, properties);
      component.getSystem().triggerEvent(event, target, data);
    };
    var dispatchEvent = function (component, target, event, simulatedEvent) {
      component.getSystem().triggerEvent(event, target, simulatedEvent.event);
    };

    var derive = function (configs) {
      return wrapAll$1(configs);
    };
    var abort = function (name, predicate) {
      return {
        key: name,
        value: nu$4({ abort: predicate })
      };
    };
    var can = function (name, predicate) {
      return {
        key: name,
        value: nu$4({ can: predicate })
      };
    };
    var preventDefault = function (name) {
      return {
        key: name,
        value: nu$4({
          run: function (component, simulatedEvent) {
            simulatedEvent.event.prevent();
          }
        })
      };
    };
    var run = function (name, handler) {
      return {
        key: name,
        value: nu$4({ run: handler })
      };
    };
    var runActionExtra = function (name, action, extra) {
      return {
        key: name,
        value: nu$4({
          run: function (component, simulatedEvent) {
            action.apply(undefined, [
              component,
              simulatedEvent
            ].concat(extra));
          }
        })
      };
    };
    var runOnName = function (name) {
      return function (handler) {
        return run(name, handler);
      };
    };
    var runOnSourceName = function (name) {
      return function (handler) {
        return {
          key: name,
          value: nu$4({
            run: function (component, simulatedEvent) {
              if (isSource(component, simulatedEvent)) {
                handler(component, simulatedEvent);
              }
            }
          })
        };
      };
    };
    var redirectToUid = function (name, uid) {
      return run(name, function (component, simulatedEvent) {
        component.getSystem().getByUid(uid).each(function (redirectee) {
          dispatchEvent(redirectee, redirectee.element, name, simulatedEvent);
        });
      });
    };
    var redirectToPart = function (name, detail, partName) {
      var uid = detail.partUids[partName];
      return redirectToUid(name, uid);
    };
    var runWithTarget = function (name, f) {
      return run(name, function (component, simulatedEvent) {
        var ev = simulatedEvent.event;
        var target = component.getSystem().getByDom(ev.target).fold(function () {
          var closest$1 = closest(ev.target, function (el) {
            return component.getSystem().getByDom(el).toOptional();
          }, never);
          return closest$1.getOr(component);
        }, function (c) {
          return c;
        });
        f(component, target, simulatedEvent);
      });
    };
    var cutter = function (name) {
      return run(name, function (component, simulatedEvent) {
        simulatedEvent.cut();
      });
    };
    var stopper = function (name) {
      return run(name, function (component, simulatedEvent) {
        simulatedEvent.stop();
      });
    };
    var runOnSource = function (name, f) {
      return runOnSourceName(name)(f);
    };
    var runOnAttached = runOnSourceName(attachedToDom());
    var runOnDetached = runOnSourceName(detachedFromDom());
    var runOnInit = runOnSourceName(systemInit());
    var runOnExecute = runOnName(execute());

    var Global = typeof window !== 'undefined' ? window : Function('return this;')();

    var name = function (element) {
      var r = element.dom.nodeName;
      return r.toLowerCase();
    };
    var type = function (element) {
      return element.dom.nodeType;
    };
    var isType$1 = function (t) {
      return function (element) {
        return type(element) === t;
      };
    };
    var isElement = isType$1(ELEMENT);
    var isText = isType$1(TEXT);
    var isDocument = isType$1(DOCUMENT);
    var isDocumentFragment = isType$1(DOCUMENT_FRAGMENT);

    var owner = function (element) {
      return SugarElement.fromDom(element.dom.ownerDocument);
    };
    var documentOrOwner = function (dos) {
      return isDocument(dos) ? dos : owner(dos);
    };
    var documentElement = function (element) {
      return SugarElement.fromDom(documentOrOwner(element).dom.documentElement);
    };
    var defaultView = function (element) {
      return SugarElement.fromDom(documentOrOwner(element).dom.defaultView);
    };
    var parent = function (element) {
      return Optional.from(element.dom.parentNode).map(SugarElement.fromDom);
    };
    var parentNode = function (element) {
      return parent(element);
    };
    var offsetParent = function (element) {
      return Optional.from(element.dom.offsetParent).map(SugarElement.fromDom);
    };
    var nextSibling = function (element) {
      return Optional.from(element.dom.nextSibling).map(SugarElement.fromDom);
    };
    var children = function (element) {
      return map(element.dom.childNodes, SugarElement.fromDom);
    };
    var child = function (element, index) {
      var cs = element.dom.childNodes;
      return Optional.from(cs[index]).map(SugarElement.fromDom);
    };
    var firstChild = function (element) {
      return child(element, 0);
    };

    var isShadowRoot = function (dos) {
      return isDocumentFragment(dos) && isNonNullable(dos.dom.host);
    };
    var supported = isFunction(Element.prototype.attachShadow) && isFunction(Node.prototype.getRootNode);
    var isSupported = constant(supported);
    var getRootNode = supported ? function (e) {
      return SugarElement.fromDom(e.dom.getRootNode());
    } : documentOrOwner;
    var getContentContainer = function (dos) {
      return isShadowRoot(dos) ? dos : SugarElement.fromDom(documentOrOwner(dos).dom.body);
    };
    var isInShadowRoot = function (e) {
      return getShadowRoot(e).isSome();
    };
    var getShadowRoot = function (e) {
      var r = getRootNode(e);
      return isShadowRoot(r) ? Optional.some(r) : Optional.none();
    };
    var getShadowHost = function (e) {
      return SugarElement.fromDom(e.dom.host);
    };
    var getOriginalEventTarget = function (event) {
      if (isSupported() && isNonNullable(event.target)) {
        var el = SugarElement.fromDom(event.target);
        if (isElement(el) && isOpenShadowHost(el)) {
          if (event.composed && event.composedPath) {
            var composedPath = event.composedPath();
            if (composedPath) {
              return head(composedPath);
            }
          }
        }
      }
      return Optional.from(event.target);
    };
    var isOpenShadowHost = function (element) {
      return isNonNullable(element.dom.shadowRoot);
    };

    var before = function (marker, element) {
      var parent$1 = parent(marker);
      parent$1.each(function (v) {
        v.dom.insertBefore(element.dom, marker.dom);
      });
    };
    var after = function (marker, element) {
      var sibling = nextSibling(marker);
      sibling.fold(function () {
        var parent$1 = parent(marker);
        parent$1.each(function (v) {
          append(v, element);
        });
      }, function (v) {
        before(v, element);
      });
    };
    var prepend = function (parent, element) {
      var firstChild$1 = firstChild(parent);
      firstChild$1.fold(function () {
        append(parent, element);
      }, function (v) {
        parent.dom.insertBefore(element.dom, v.dom);
      });
    };
    var append = function (parent, element) {
      parent.dom.appendChild(element.dom);
    };
    var appendAt = function (parent, element, index) {
      child(parent, index).fold(function () {
        append(parent, element);
      }, function (v) {
        before(v, element);
      });
    };

    var before$1 = function (marker, elements) {
      each(elements, function (x) {
        before(marker, x);
      });
    };
    var append$1 = function (parent, elements) {
      each(elements, function (x) {
        append(parent, x);
      });
    };

    var empty = function (element) {
      element.dom.textContent = '';
      each(children(element), function (rogue) {
        remove(rogue);
      });
    };
    var remove = function (element) {
      var dom = element.dom;
      if (dom.parentNode !== null) {
        dom.parentNode.removeChild(dom);
      }
    };
    var unwrap = function (wrapper) {
      var children$1 = children(wrapper);
      if (children$1.length > 0) {
        before$1(wrapper, children$1);
      }
      remove(wrapper);
    };

    var fromHtml$1 = function (html, scope) {
      var doc = scope || document;
      var div = doc.createElement('div');
      div.innerHTML = html;
      return children(SugarElement.fromDom(div));
    };

    var get$2 = function (element) {
      return element.dom.innerHTML;
    };
    var set = function (element, content) {
      var owner$1 = owner(element);
      var docDom = owner$1.dom;
      var fragment = SugarElement.fromDom(docDom.createDocumentFragment());
      var contentElements = fromHtml$1(content, docDom);
      append$1(fragment, contentElements);
      empty(element);
      append(element, fragment);
    };
    var getOuter = function (element) {
      var container = SugarElement.fromTag('div');
      var clone = SugarElement.fromDom(element.dom.cloneNode(true));
      append(container, clone);
      return get$2(container);
    };

    var rawSet = function (dom, key, value) {
      if (isString(value) || isBoolean(value) || isNumber(value)) {
        dom.setAttribute(key, value + '');
      } else {
        console.error('Invalid call to Attribute.set. Key ', key, ':: Value ', value, ':: Element ', dom);
        throw new Error('Attribute value was not simple');
      }
    };
    var set$1 = function (element, key, value) {
      rawSet(element.dom, key, value);
    };
    var setAll = function (element, attrs) {
      var dom = element.dom;
      each$1(attrs, function (v, k) {
        rawSet(dom, k, v);
      });
    };
    var get$3 = function (element, key) {
      var v = element.dom.getAttribute(key);
      return v === null ? undefined : v;
    };
    var getOpt = function (element, key) {
      return Optional.from(get$3(element, key));
    };
    var has$1 = function (element, key) {
      var dom = element.dom;
      return dom && dom.hasAttribute ? dom.hasAttribute(key) : false;
    };
    var remove$1 = function (element, key) {
      element.dom.removeAttribute(key);
    };

    var clone = function (original, isDeep) {
      return SugarElement.fromDom(original.dom.cloneNode(isDeep));
    };
    var shallow$1 = function (original) {
      return clone(original, false);
    };

    var getHtml = function (element) {
      if (isShadowRoot(element)) {
        return '#shadow-root';
      } else {
        var clone = shallow$1(element);
        return getOuter(clone);
      }
    };

    var element = function (elem) {
      return getHtml(elem);
    };

    var isRecursive = function (component, originator, target) {
      return eq$1(originator, component.element) && !eq$1(originator, target);
    };
    var events = derive([can(focus(), function (component, simulatedEvent) {
        var event = simulatedEvent.event;
        var originator = event.originator;
        var target = event.target;
        if (isRecursive(component, originator, target)) {
          console.warn(focus() + ' did not get interpreted by the desired target. ' + '\nOriginator: ' + element(originator) + '\nTarget: ' + element(target) + '\nCheck the ' + focus() + ' event handlers');
          return false;
        } else {
          return true;
        }
      })]);

    var DefaultEvents = /*#__PURE__*/Object.freeze({
        __proto__: null,
        events: events
    });

    var unique = 0;
    var generate$1 = function (prefix) {
      var date = new Date();
      var time = date.getTime();
      var random = Math.floor(Math.random() * 1000000000);
      unique++;
      return prefix + '_' + random + unique + String(time);
    };

    var prefix = constant('alloy-id-');
    var idAttr = constant('data-alloy-id');

    var prefix$1 = prefix();
    var idAttr$1 = idAttr();
    var write = function (label, elem) {
      var id = generate$1(prefix$1 + label);
      writeOnly(elem, id);
      return id;
    };
    var writeOnly = function (elem, uid) {
      Object.defineProperty(elem.dom, idAttr$1, {
        value: uid,
        writable: true
      });
    };
    var read$1 = function (elem) {
      var id = isElement(elem) ? elem.dom[idAttr$1] : null;
      return Optional.from(id);
    };
    var generate$2 = function (prefix) {
      return generate$1(prefix);
    };

    var make = identity;

    var NoContextApi = function (getComp) {
      var fail = function (event) {
        return function () {
          throw new Error('The component must be in a context to send: ' + event + (getComp ? '\n' + element(getComp().element) + ' is not in context.' : ''));
        };
      };
      return {
        debugInfo: constant('fake'),
        triggerEvent: fail('triggerEvent'),
        triggerFocus: fail('triggerFocus'),
        triggerEscape: fail('triggerEscape'),
        build: fail('build'),
        addToWorld: fail('addToWorld'),
        removeFromWorld: fail('removeFromWorld'),
        addToGui: fail('addToGui'),
        removeFromGui: fail('removeFromGui'),
        getByUid: fail('getByUid'),
        getByDom: fail('getByDom'),
        broadcast: fail('broadcast'),
        broadcastOn: fail('broadcastOn'),
        broadcastEvent: fail('broadcastEvent'),
        isConnected: never
      };
    };
    var singleton = NoContextApi();

    var markAsBehaviourApi = function (f, apiName, apiFunction) {
      var delegate = apiFunction.toString();
      var endIndex = delegate.indexOf(')') + 1;
      var openBracketIndex = delegate.indexOf('(');
      var parameters = delegate.substring(openBracketIndex + 1, endIndex - 1).split(/,\s*/);
      f.toFunctionAnnotation = function () {
        return {
          name: apiName,
          parameters: cleanParameters(parameters.slice(0, 1).concat(parameters.slice(3)))
        };
      };
      return f;
    };
    var cleanParameters = function (parameters) {
      return map(parameters, function (p) {
        return endsWith(p, '/*') ? p.substring(0, p.length - '/*'.length) : p;
      });
    };
    var markAsExtraApi = function (f, extraName) {
      var delegate = f.toString();
      var endIndex = delegate.indexOf(')') + 1;
      var openBracketIndex = delegate.indexOf('(');
      var parameters = delegate.substring(openBracketIndex + 1, endIndex - 1).split(/,\s*/);
      f.toFunctionAnnotation = function () {
        return {
          name: extraName,
          parameters: cleanParameters(parameters)
        };
      };
      return f;
    };
    var markAsSketchApi = function (f, apiFunction) {
      var delegate = apiFunction.toString();
      var endIndex = delegate.indexOf(')') + 1;
      var openBracketIndex = delegate.indexOf('(');
      var parameters = delegate.substring(openBracketIndex + 1, endIndex - 1).split(/,\s*/);
      f.toFunctionAnnotation = function () {
        return {
          name: 'OVERRIDE',
          parameters: cleanParameters(parameters.slice(1))
        };
      };
      return f;
    };

    var premadeTag = generate$1('alloy-premade');
    var premade = function (comp) {
      return wrap$1(premadeTag, comp);
    };
    var getPremade = function (spec) {
      return get$1(spec, premadeTag);
    };
    var makeApi = function (f) {
      return markAsSketchApi(function (component) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          rest[_i - 1] = arguments[_i];
        }
        return f.apply(void 0, __spreadArrays([
          component.getApis(),
          component
        ], rest));
      }, f);
    };

    var NoState = {
      init: function () {
        return nu$5({
          readState: function () {
            return 'No State required';
          }
        });
      }
    };
    var nu$5 = function (spec) {
      return spec;
    };

    var generateFrom = function (spec, all) {
      var schema = map(all, function (a) {
        return optionObjOf(a.name(), [
          strict$1('config'),
          defaulted$1('state', NoState)
        ]);
      });
      var validated = asRaw('component.behaviours', objOf(schema), spec.behaviours).fold(function (errInfo) {
        throw new Error(formatError(errInfo) + '\nComplete spec:\n' + JSON.stringify(spec, null, 2));
      }, function (v) {
        return v;
      });
      return {
        list: all,
        data: map$2(validated, function (optBlobThunk) {
          var output = optBlobThunk.map(function (blob) {
            return {
              config: blob.config,
              state: blob.state.init(blob.config)
            };
          });
          return function () {
            return output;
          };
        })
      };
    };
    var getBehaviours = function (bData) {
      return bData.list;
    };
    var getData = function (bData) {
      return bData.data;
    };

    var byInnerKey = function (data, tuple) {
      var r = {};
      each$1(data, function (detail, key) {
        each$1(detail, function (value, indexKey) {
          var chain = get$1(r, indexKey).getOr([]);
          r[indexKey] = chain.concat([tuple(key, value)]);
        });
      });
      return r;
    };

    var nu$6 = function (s) {
      return {
        classes: s.classes !== undefined ? s.classes : [],
        attributes: s.attributes !== undefined ? s.attributes : {},
        styles: s.styles !== undefined ? s.styles : {}
      };
    };
    var merge$1 = function (defnA, mod) {
      return __assign(__assign({}, defnA), {
        attributes: __assign(__assign({}, defnA.attributes), mod.attributes),
        styles: __assign(__assign({}, defnA.styles), mod.styles),
        classes: defnA.classes.concat(mod.classes)
      });
    };

    var combine = function (info, baseMod, behaviours, base) {
      var modsByBehaviour = __assign({}, baseMod);
      each(behaviours, function (behaviour) {
        modsByBehaviour[behaviour.name()] = behaviour.exhibit(info, base);
      });
      var byAspect = byInnerKey(modsByBehaviour, function (name, modification) {
        return {
          name: name,
          modification: modification
        };
      });
      var combineObjects = function (objects) {
        return foldr(objects, function (b, a) {
          return __assign(__assign({}, a.modification), b);
        }, {});
      };
      var combinedClasses = foldr(byAspect.classes, function (b, a) {
        return a.modification.concat(b);
      }, []);
      var combinedAttributes = combineObjects(byAspect.attributes);
      var combinedStyles = combineObjects(byAspect.styles);
      return nu$6({
        classes: combinedClasses,
        attributes: combinedAttributes,
        styles: combinedStyles
      });
    };

    var sortKeys = function (label, keyName, array, order) {
      try {
        var sorted = sort(array, function (a, b) {
          var aKey = a[keyName];
          var bKey = b[keyName];
          var aIndex = order.indexOf(aKey);
          var bIndex = order.indexOf(bKey);
          if (aIndex === -1) {
            throw new Error('The ordering for ' + label + ' does not have an entry for ' + aKey + '.\nOrder specified: ' + JSON.stringify(order, null, 2));
          }
          if (bIndex === -1) {
            throw new Error('The ordering for ' + label + ' does not have an entry for ' + bKey + '.\nOrder specified: ' + JSON.stringify(order, null, 2));
          }
          if (aIndex < bIndex) {
            return -1;
          } else if (bIndex < aIndex) {
            return 1;
          } else {
            return 0;
          }
        });
        return Result.value(sorted);
      } catch (err) {
        return Result.error([err]);
      }
    };

    var uncurried = function (handler, purpose) {
      return {
        handler: handler,
        purpose: purpose
      };
    };
    var curried = function (handler, purpose) {
      return {
        cHandler: handler,
        purpose: purpose
      };
    };
    var curryArgs = function (descHandler, extraArgs) {
      return curried(curry.apply(undefined, [descHandler.handler].concat(extraArgs)), descHandler.purpose);
    };
    var getCurried = function (descHandler) {
      return descHandler.cHandler;
    };

    var behaviourTuple = function (name, handler) {
      return {
        name: name,
        handler: handler
      };
    };
    var nameToHandlers = function (behaviours, info) {
      var r = {};
      each(behaviours, function (behaviour) {
        r[behaviour.name()] = behaviour.handlers(info);
      });
      return r;
    };
    var groupByEvents = function (info, behaviours, base) {
      var behaviourEvents = __assign(__assign({}, base), nameToHandlers(behaviours, info));
      return byInnerKey(behaviourEvents, behaviourTuple);
    };
    var combine$1 = function (info, eventOrder, behaviours, base) {
      var byEventName = groupByEvents(info, behaviours, base);
      return combineGroups(byEventName, eventOrder);
    };
    var assemble = function (rawHandler) {
      var handler = read(rawHandler);
      return function (component, simulatedEvent) {
        var rest = [];
        for (var _i = 2; _i < arguments.length; _i++) {
          rest[_i - 2] = arguments[_i];
        }
        var args = [
          component,
          simulatedEvent
        ].concat(rest);
        if (handler.abort.apply(undefined, args)) {
          simulatedEvent.stop();
        } else if (handler.can.apply(undefined, args)) {
          handler.run.apply(undefined, args);
        }
      };
    };
    var missingOrderError = function (eventName, tuples) {
      return Result.error(['The event (' + eventName + ') has more than one behaviour that listens to it.\nWhen this occurs, you must ' + 'specify an event ordering for the behaviours in your spec (e.g. [ "listing", "toggling" ]).\nThe behaviours that ' + 'can trigger it are: ' + JSON.stringify(map(tuples, function (c) {
          return c.name;
        }), null, 2)]);
    };
    var fuse$1 = function (tuples, eventOrder, eventName) {
      var order = eventOrder[eventName];
      if (!order) {
        return missingOrderError(eventName, tuples);
      } else {
        return sortKeys('Event: ' + eventName, 'name', tuples, order).map(function (sortedTuples) {
          var handlers = map(sortedTuples, function (tuple) {
            return tuple.handler;
          });
          return fuse(handlers);
        });
      }
    };
    var combineGroups = function (byEventName, eventOrder) {
      var r = mapToArray(byEventName, function (tuples, eventName) {
        var combined = tuples.length === 1 ? Result.value(tuples[0].handler) : fuse$1(tuples, eventOrder, eventName);
        return combined.map(function (handler) {
          var assembled = assemble(handler);
          var purpose = tuples.length > 1 ? filter(eventOrder[eventName], function (o) {
            return exists(tuples, function (t) {
              return t.name === o;
            });
          }).join(' > ') : tuples[0].name;
          return wrap$1(eventName, uncurried(assembled, purpose));
        });
      });
      return consolidate(r, {});
    };

    var baseBehaviour = 'alloy.base.behaviour';
    var toInfo = function (spec) {
      var _a;
      return asRaw('custom.definition', objOf([
        field('dom', 'dom', strict(), objOf([
          strict$1('tag'),
          defaulted$1('styles', {}),
          defaulted$1('classes', []),
          defaulted$1('attributes', {}),
          option('value'),
          option('innerHtml')
        ])),
        strict$1('components'),
        strict$1('uid'),
        defaulted$1('events', {}),
        defaulted$1('apis', {}),
        field('eventOrder', 'eventOrder', mergeWith((_a = {}, _a[execute()] = [
          'disabling',
          baseBehaviour,
          'toggling',
          'typeaheadevents'
        ], _a[focus()] = [
          baseBehaviour,
          'focusing',
          'keying'
        ], _a[systemInit()] = [
          baseBehaviour,
          'disabling',
          'toggling',
          'representing'
        ], _a[input()] = [
          baseBehaviour,
          'representing',
          'streaming',
          'invalidating'
        ], _a[detachedFromDom()] = [
          baseBehaviour,
          'representing',
          'item-events',
          'tooltipping'
        ], _a[mousedown()] = [
          'focusing',
          baseBehaviour,
          'item-type-events'
        ], _a[touchstart()] = [
          'focusing',
          baseBehaviour,
          'item-type-events'
        ], _a[mouseover()] = [
          'item-type-events',
          'tooltipping'
        ], _a[receive()] = [
          'receiving',
          'reflecting',
          'tooltipping'
        ], _a)), anyValue$1()),
        option('domModification')
      ]), spec);
    };
    var toDefinition = function (detail) {
      return __assign(__assign({}, detail.dom), {
        uid: detail.uid,
        domChildren: map(detail.components, function (comp) {
          return comp.element;
        })
      });
    };
    var toModification = function (detail) {
      return detail.domModification.fold(function () {
        return nu$6({});
      }, nu$6);
    };
    var toEvents = function (info) {
      return info.events;
    };

    var read$2 = function (element, attr) {
      var value = get$3(element, attr);
      return value === undefined || value === '' ? [] : value.split(' ');
    };
    var add = function (element, attr, id) {
      var old = read$2(element, attr);
      var nu = old.concat([id]);
      set$1(element, attr, nu.join(' '));
      return true;
    };
    var remove$2 = function (element, attr, id) {
      var nu = filter(read$2(element, attr), function (v) {
        return v !== id;
      });
      if (nu.length > 0) {
        set$1(element, attr, nu.join(' '));
      } else {
        remove$1(element, attr);
      }
      return false;
    };

    var supports = function (element) {
      return element.dom.classList !== undefined;
    };
    var get$4 = function (element) {
      return read$2(element, 'class');
    };
    var add$1 = function (element, clazz) {
      return add(element, 'class', clazz);
    };
    var remove$3 = function (element, clazz) {
      return remove$2(element, 'class', clazz);
    };

    var add$2 = function (element, clazz) {
      if (supports(element)) {
        element.dom.classList.add(clazz);
      } else {
        add$1(element, clazz);
      }
    };
    var cleanClass = function (element) {
      var classList = supports(element) ? element.dom.classList : get$4(element);
      if (classList.length === 0) {
        remove$1(element, 'class');
      }
    };
    var remove$4 = function (element, clazz) {
      if (supports(element)) {
        var classList = element.dom.classList;
        classList.remove(clazz);
      } else {
        remove$3(element, clazz);
      }
      cleanClass(element);
    };
    var has$2 = function (element, clazz) {
      return supports(element) && element.dom.classList.contains(clazz);
    };

    var add$3 = function (element, classes) {
      each(classes, function (x) {
        add$2(element, x);
      });
    };
    var remove$5 = function (element, classes) {
      each(classes, function (x) {
        remove$4(element, x);
      });
    };

    var isSupported$1 = function (dom) {
      return dom.style !== undefined && isFunction(dom.style.getPropertyValue);
    };

    var inBody = function (element) {
      var dom = isText(element) ? element.dom.parentNode : element.dom;
      if (dom === undefined || dom === null || dom.ownerDocument === null) {
        return false;
      }
      var doc = dom.ownerDocument;
      return getShadowRoot(SugarElement.fromDom(dom)).fold(function () {
        return doc.body.contains(dom);
      }, compose1(inBody, getShadowHost));
    };
    var body = function () {
      return getBody(SugarElement.fromDom(document));
    };
    var getBody = function (doc) {
      var b = doc.dom.body;
      if (b === null || b === undefined) {
        throw new Error('Body is not available yet');
      }
      return SugarElement.fromDom(b);
    };

    var internalSet = function (dom, property, value) {
      if (!isString(value)) {
        console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
        throw new Error('CSS value must be a string: ' + value);
      }
      if (isSupported$1(dom)) {
        dom.style.setProperty(property, value);
      }
    };
    var internalRemove = function (dom, property) {
      if (isSupported$1(dom)) {
        dom.style.removeProperty(property);
      }
    };
    var set$2 = function (element, property, value) {
      var dom = element.dom;
      internalSet(dom, property, value);
    };
    var setAll$1 = function (element, css) {
      var dom = element.dom;
      each$1(css, function (v, k) {
        internalSet(dom, k, v);
      });
    };
    var setOptions = function (element, css) {
      var dom = element.dom;
      each$1(css, function (v, k) {
        v.fold(function () {
          internalRemove(dom, k);
        }, function (value) {
          internalSet(dom, k, value);
        });
      });
    };
    var get$5 = function (element, property) {
      var dom = element.dom;
      var styles = window.getComputedStyle(dom);
      var r = styles.getPropertyValue(property);
      return r === '' && !inBody(element) ? getUnsafeProperty(dom, property) : r;
    };
    var getUnsafeProperty = function (dom, property) {
      return isSupported$1(dom) ? dom.style.getPropertyValue(property) : '';
    };
    var getRaw = function (element, property) {
      var dom = element.dom;
      var raw = getUnsafeProperty(dom, property);
      return Optional.from(raw).filter(function (r) {
        return r.length > 0;
      });
    };
    var getAllRaw = function (element) {
      var css = {};
      var dom = element.dom;
      if (isSupported$1(dom)) {
        for (var i = 0; i < dom.style.length; i++) {
          var ruleName = dom.style.item(i);
          css[ruleName] = dom.style[ruleName];
        }
      }
      return css;
    };
    var isValidValue = function (tag, property, value) {
      var element = SugarElement.fromTag(tag);
      set$2(element, property, value);
      var style = getRaw(element, property);
      return style.isSome();
    };
    var remove$6 = function (element, property) {
      var dom = element.dom;
      internalRemove(dom, property);
      if (getOpt(element, 'style').map(trim).is('')) {
        remove$1(element, 'style');
      }
    };
    var reflow = function (e) {
      return e.dom.offsetWidth;
    };

    var get$6 = function (element) {
      return element.dom.value;
    };
    var set$3 = function (element, value) {
      if (value === undefined) {
        throw new Error('Value.set was undefined');
      }
      element.dom.value = value;
    };

    var renderToDom = function (definition) {
      var subject = SugarElement.fromTag(definition.tag);
      setAll(subject, definition.attributes);
      add$3(subject, definition.classes);
      setAll$1(subject, definition.styles);
      definition.innerHtml.each(function (html) {
        return set(subject, html);
      });
      var children = definition.domChildren;
      append$1(subject, children);
      definition.value.each(function (value) {
        set$3(subject, value);
      });
      if (!definition.uid) {
        debugger;
      }
      writeOnly(subject, definition.uid);
      return subject;
    };

    var getBehaviours$1 = function (spec) {
      var behaviours = get$1(spec, 'behaviours').getOr({});
      var keys$1 = filter(keys(behaviours), function (k) {
        return behaviours[k] !== undefined;
      });
      return map(keys$1, function (k) {
        return behaviours[k].me;
      });
    };
    var generateFrom$1 = function (spec, all) {
      return generateFrom(spec, all);
    };
    var generate$3 = function (spec) {
      var all = getBehaviours$1(spec);
      return generateFrom$1(spec, all);
    };

    var getDomDefinition = function (info, bList, bData) {
      var definition = toDefinition(info);
      var infoModification = toModification(info);
      var baseModification = { 'alloy.base.modification': infoModification };
      var modification = bList.length > 0 ? combine(bData, baseModification, bList, definition) : infoModification;
      return merge$1(definition, modification);
    };
    var getEvents = function (info, bList, bData) {
      var baseEvents = { 'alloy.base.behaviour': toEvents(info) };
      return combine$1(bData, info.eventOrder, bList, baseEvents).getOrDie();
    };
    var build = function (spec) {
      var getMe = function () {
        return me;
      };
      var systemApi = Cell(singleton);
      var info = getOrDie(toInfo(spec));
      var bBlob = generate$3(spec);
      var bList = getBehaviours(bBlob);
      var bData = getData(bBlob);
      var modDefinition = getDomDefinition(info, bList, bData);
      var item = renderToDom(modDefinition);
      var events = getEvents(info, bList, bData);
      var subcomponents = Cell(info.components);
      var connect = function (newApi) {
        systemApi.set(newApi);
      };
      var disconnect = function () {
        systemApi.set(NoContextApi(getMe));
      };
      var syncComponents = function () {
        var children$1 = children(item);
        var subs = bind(children$1, function (child) {
          return systemApi.get().getByDom(child).fold(function () {
            return [];
          }, function (c) {
            return [c];
          });
        });
        subcomponents.set(subs);
      };
      var config = function (behaviour) {
        var b = bData;
        var f = isFunction(b[behaviour.name()]) ? b[behaviour.name()] : function () {
          throw new Error('Could not find ' + behaviour.name() + ' in ' + JSON.stringify(spec, null, 2));
        };
        return f();
      };
      var hasConfigured = function (behaviour) {
        return isFunction(bData[behaviour.name()]);
      };
      var getApis = function () {
        return info.apis;
      };
      var readState = function (behaviourName) {
        return bData[behaviourName]().map(function (b) {
          return b.state.readState();
        }).getOr('not enabled');
      };
      var me = {
        getSystem: systemApi.get,
        config: config,
        hasConfigured: hasConfigured,
        spec: spec,
        readState: readState,
        getApis: getApis,
        connect: connect,
        disconnect: disconnect,
        element: item,
        syncComponents: syncComponents,
        components: subcomponents.get,
        events: events
      };
      return me;
    };

    var buildSubcomponents = function (spec) {
      var components = get$1(spec, 'components').getOr([]);
      return map(components, build$1);
    };
    var buildFromSpec = function (userSpec) {
      var _a = make(userSpec), specEvents = _a.events, spec = __rest(_a, ['events']);
      var components = buildSubcomponents(spec);
      var completeSpec = __assign(__assign({}, spec), {
        events: __assign(__assign({}, DefaultEvents), specEvents),
        components: components
      });
      return Result.value(build(completeSpec));
    };
    var text = function (textContent) {
      var element = SugarElement.fromText(textContent);
      return external({ element: element });
    };
    var external = function (spec) {
      var extSpec = asRawOrDie('external.component', objOfOnly([
        strict$1('element'),
        option('uid')
      ]), spec);
      var systemApi = Cell(NoContextApi());
      var connect = function (newApi) {
        systemApi.set(newApi);
      };
      var disconnect = function () {
        systemApi.set(NoContextApi(function () {
          return me;
        }));
      };
      extSpec.uid.each(function (uid) {
        writeOnly(extSpec.element, uid);
      });
      var me = {
        getSystem: systemApi.get,
        config: Optional.none,
        hasConfigured: never,
        connect: connect,
        disconnect: disconnect,
        getApis: function () {
          return {};
        },
        element: extSpec.element,
        spec: spec,
        readState: constant('No state'),
        syncComponents: noop,
        components: constant([]),
        events: {}
      };
      return premade(me);
    };
    var uids = generate$2;
    var build$1 = function (spec) {
      return getPremade(spec).fold(function () {
        var userSpecWithUid = spec.hasOwnProperty('uid') ? spec : __assign({ uid: uids('') }, spec);
        return buildFromSpec(userSpecWithUid).getOrDie();
      }, function (prebuilt) {
        return prebuilt;
      });
    };
    var premade$1 = premade;

    var Dimension = function (name, getOffset) {
      var set = function (element, h) {
        if (!isNumber(h) && !h.match(/^[0-9]+$/)) {
          throw new Error(name + '.set accepts only positive integer values. Value was ' + h);
        }
        var dom = element.dom;
        if (isSupported$1(dom)) {
          dom.style[name] = h + 'px';
        }
      };
      var get = function (element) {
        var r = getOffset(element);
        if (r <= 0 || r === null) {
          var css = get$5(element, name);
          return parseFloat(css) || 0;
        }
        return r;
      };
      var getOuter = get;
      var aggregate = function (element, properties) {
        return foldl(properties, function (acc, property) {
          var val = get$5(element, property);
          var value = val === undefined ? 0 : parseInt(val, 10);
          return isNaN(value) ? acc : acc + value;
        }, 0);
      };
      var max = function (element, value, properties) {
        var cumulativeInclusions = aggregate(element, properties);
        var absoluteMax = value > cumulativeInclusions ? value - cumulativeInclusions : 0;
        return absoluteMax;
      };
      return {
        set: set,
        get: get,
        getOuter: getOuter,
        aggregate: aggregate,
        max: max
      };
    };

    var api = Dimension('height', function (element) {
      var dom = element.dom;
      return inBody(element) ? dom.getBoundingClientRect().height : dom.offsetHeight;
    });
    var get$7 = function (element) {
      return api.get(element);
    };
    var getOuter$1 = function (element) {
      return api.getOuter(element);
    };
    var setMax = function (element, value) {
      var inclusions = [
        'margin-top',
        'border-top-width',
        'padding-top',
        'padding-bottom',
        'border-bottom-width',
        'margin-bottom'
      ];
      var absMax = api.max(element, value, inclusions);
      set$2(element, 'max-height', absMax + 'px');
    };

    var r = function (left, top) {
      var translate = function (x, y) {
        return r(left + x, top + y);
      };
      return {
        left: left,
        top: top,
        translate: translate
      };
    };
    var SugarPosition = r;

    var boxPosition = function (dom) {
      var box = dom.getBoundingClientRect();
      return SugarPosition(box.left, box.top);
    };
    var firstDefinedOrZero = function (a, b) {
      if (a !== undefined) {
        return a;
      } else {
        return b !== undefined ? b : 0;
      }
    };
    var absolute = function (element) {
      var doc = element.dom.ownerDocument;
      var body = doc.body;
      var win = doc.defaultView;
      var html = doc.documentElement;
      if (body === element.dom) {
        return SugarPosition(body.offsetLeft, body.offsetTop);
      }
      var scrollTop = firstDefinedOrZero(win === null || win === void 0 ? void 0 : win.pageYOffset, html.scrollTop);
      var scrollLeft = firstDefinedOrZero(win === null || win === void 0 ? void 0 : win.pageXOffset, html.scrollLeft);
      var clientTop = firstDefinedOrZero(html.clientTop, body.clientTop);
      var clientLeft = firstDefinedOrZero(html.clientLeft, body.clientLeft);
      return viewport(element).translate(scrollLeft - clientLeft, scrollTop - clientTop);
    };
    var viewport = function (element) {
      var dom = element.dom;
      var doc = dom.ownerDocument;
      var body = doc.body;
      if (body === dom) {
        return SugarPosition(body.offsetLeft, body.offsetTop);
      }
      if (!inBody(element)) {
        return SugarPosition(0, 0);
      }
      return boxPosition(dom);
    };

    var api$1 = Dimension('width', function (element) {
      return element.dom.offsetWidth;
    });
    var set$4 = function (element, h) {
      return api$1.set(element, h);
    };
    var get$8 = function (element) {
      return api$1.get(element);
    };
    var getOuter$2 = function (element) {
      return api$1.getOuter(element);
    };
    var setMax$1 = function (element, value) {
      var inclusions = [
        'margin-left',
        'border-left-width',
        'padding-left',
        'padding-right',
        'border-right-width',
        'margin-right'
      ];
      var absMax = api$1.max(element, value, inclusions);
      set$2(element, 'max-width', absMax + 'px');
    };

    var mkEvent = function (target, x, y, stop, prevent, kill, raw) {
      return {
        target: target,
        x: x,
        y: y,
        stop: stop,
        prevent: prevent,
        kill: kill,
        raw: raw
      };
    };
    var fromRawEvent = function (rawEvent) {
      var target = SugarElement.fromDom(getOriginalEventTarget(rawEvent).getOr(rawEvent.target));
      var stop = function () {
        return rawEvent.stopPropagation();
      };
      var prevent = function () {
        return rawEvent.preventDefault();
      };
      var kill = compose(prevent, stop);
      return mkEvent(target, rawEvent.clientX, rawEvent.clientY, stop, prevent, kill, rawEvent);
    };
    var handle = function (filter, handler) {
      return function (rawEvent) {
        if (filter(rawEvent)) {
          handler(fromRawEvent(rawEvent));
        }
      };
    };
    var binder = function (element, event, filter, handler, useCapture) {
      var wrapped = handle(filter, handler);
      element.dom.addEventListener(event, wrapped, useCapture);
      return { unbind: curry(unbind, element, event, wrapped, useCapture) };
    };
    var bind$2 = function (element, event, filter, handler) {
      return binder(element, event, filter, handler, false);
    };
    var capture = function (element, event, filter, handler) {
      return binder(element, event, filter, handler, true);
    };
    var unbind = function (element, event, handler, useCapture) {
      element.dom.removeEventListener(event, handler, useCapture);
    };

    var get$9 = function (_DOC) {
      var doc = _DOC !== undefined ? _DOC.dom : document;
      var x = doc.body.scrollLeft || doc.documentElement.scrollLeft;
      var y = doc.body.scrollTop || doc.documentElement.scrollTop;
      return SugarPosition(x, y);
    };
    var to = function (x, y, _DOC) {
      var doc = _DOC !== undefined ? _DOC.dom : document;
      var win = doc.defaultView;
      if (win) {
        win.scrollTo(x, y);
      }
    };

    var get$a = function (_win) {
      var win = _win === undefined ? window : _win;
      return Optional.from(win['visualViewport']);
    };
    var bounds = function (x, y, width, height) {
      return {
        x: x,
        y: y,
        width: width,
        height: height,
        right: x + width,
        bottom: y + height
      };
    };
    var getBounds = function (_win) {
      var win = _win === undefined ? window : _win;
      var doc = win.document;
      var scroll = get$9(SugarElement.fromDom(doc));
      return get$a(win).fold(function () {
        var html = win.document.documentElement;
        var width = html.clientWidth;
        var height = html.clientHeight;
        return bounds(scroll.left, scroll.top, width, height);
      }, function (visualViewport) {
        return bounds(Math.max(visualViewport.pageLeft, scroll.left), Math.max(visualViewport.pageTop, scroll.top), visualViewport.width, visualViewport.height);
      });
    };

    var walkUp = function (navigation, doc) {
      var frame = navigation.view(doc);
      return frame.fold(constant([]), function (f) {
        var parent = navigation.owner(f);
        var rest = walkUp(navigation, parent);
        return [f].concat(rest);
      });
    };
    var pathTo = function (element, navigation) {
      var d = navigation.owner(element);
      var paths = walkUp(navigation, d);
      return Optional.some(paths);
    };

    var view = function (doc) {
      var _a;
      var element = doc.dom === document ? Optional.none() : Optional.from((_a = doc.dom.defaultView) === null || _a === void 0 ? void 0 : _a.frameElement);
      return element.map(SugarElement.fromDom);
    };
    var owner$1 = function (element) {
      return owner(element);
    };

    var Navigation = /*#__PURE__*/Object.freeze({
        __proto__: null,
        view: view,
        owner: owner$1
    });

    var find$3 = function (element) {
      var doc = SugarElement.fromDom(document);
      var scroll = get$9(doc);
      var path = pathTo(element, Navigation);
      return path.fold(curry(absolute, element), function (frames) {
        var offset = viewport(element);
        var r = foldr(frames, function (b, a) {
          var loc = viewport(a);
          return {
            left: b.left + loc.left,
            top: b.top + loc.top
          };
        }, {
          left: 0,
          top: 0
        });
        return SugarPosition(r.left + offset.left + scroll.left, r.top + offset.top + scroll.top);
      });
    };

    var pointed = function (point, width, height) {
      return {
        point: point,
        width: width,
        height: height
      };
    };
    var rect = function (x, y, width, height) {
      return {
        x: x,
        y: y,
        width: width,
        height: height
      };
    };
    var bounds$1 = function (x, y, width, height) {
      return {
        x: x,
        y: y,
        width: width,
        height: height,
        right: x + width,
        bottom: y + height
      };
    };
    var box = function (element) {
      var xy = absolute(element);
      var w = getOuter$2(element);
      var h = getOuter$1(element);
      return bounds$1(xy.left, xy.top, w, h);
    };
    var absolute$1 = function (element) {
      var position = find$3(element);
      var width = getOuter$2(element);
      var height = getOuter$1(element);
      return bounds$1(position.left, position.top, width, height);
    };
    var win = function () {
      return getBounds(window);
    };

    function ClosestOrAncestor (is, ancestor, scope, a, isRoot) {
      if (is(scope, a)) {
        return Optional.some(scope);
      } else if (isFunction(isRoot) && isRoot(scope)) {
        return Optional.none();
      } else {
        return ancestor(scope, a, isRoot);
      }
    }

    var ancestor$1 = function (scope, predicate, isRoot) {
      var element = scope.dom;
      var stop = isFunction(isRoot) ? isRoot : never;
      while (element.parentNode) {
        element = element.parentNode;
        var el = SugarElement.fromDom(element);
        if (predicate(el)) {
          return Optional.some(el);
        } else if (stop(el)) {
          break;
        }
      }
      return Optional.none();
    };
    var closest$1 = function (scope, predicate, isRoot) {
      var is = function (s, test) {
        return test(s);
      };
      return ClosestOrAncestor(is, ancestor$1, scope, predicate, isRoot);
    };
    var descendant = function (scope, predicate) {
      var descend = function (node) {
        for (var i = 0; i < node.childNodes.length; i++) {
          var child_1 = SugarElement.fromDom(node.childNodes[i]);
          if (predicate(child_1)) {
            return Optional.some(child_1);
          }
          var res = descend(node.childNodes[i]);
          if (res.isSome()) {
            return res;
          }
        }
        return Optional.none();
      };
      return descend(scope.dom);
    };

    var closest$2 = function (scope, predicate, isRoot) {
      return closest$1(scope, predicate, isRoot).isSome();
    };

    var ancestor$2 = function (scope, selector, isRoot) {
      return ancestor$1(scope, function (e) {
        return is(e, selector);
      }, isRoot);
    };
    var descendant$1 = function (scope, selector) {
      return one(selector, scope);
    };
    var closest$3 = function (scope, selector, isRoot) {
      var is$1 = function (element, selector) {
        return is(element, selector);
      };
      return ClosestOrAncestor(is$1, ancestor$2, scope, selector, isRoot);
    };

    var find$4 = function (queryElem) {
      var dependent = closest$1(queryElem, function (elem) {
        if (!isElement(elem)) {
          return false;
        }
        var id = get$3(elem, 'id');
        return id !== undefined && id.indexOf('aria-owns') > -1;
      });
      return dependent.bind(function (dep) {
        var id = get$3(dep, 'id');
        var dos = getRootNode(dep);
        return descendant$1(dos, '[aria-owns="' + id + '"]');
      });
    };
    var manager = function () {
      var ariaId = generate$1('aria-owns');
      var link = function (elem) {
        set$1(elem, 'aria-owns', ariaId);
      };
      var unlink = function (elem) {
        remove$1(elem, 'aria-owns');
      };
      return {
        id: ariaId,
        link: link,
        unlink: unlink
      };
    };

    var isAriaPartOf = function (component, queryElem) {
      return find$4(queryElem).exists(function (owner) {
        return isPartOf(component, owner);
      });
    };
    var isPartOf = function (component, queryElem) {
      return closest$2(queryElem, function (el) {
        return eq$1(el, component.element);
      }, never) || isAriaPartOf(component, queryElem);
    };

    var unknown$3 = 'unknown';
    var EventConfiguration;
    (function (EventConfiguration) {
      EventConfiguration[EventConfiguration['STOP'] = 0] = 'STOP';
      EventConfiguration[EventConfiguration['NORMAL'] = 1] = 'NORMAL';
      EventConfiguration[EventConfiguration['LOGGING'] = 2] = 'LOGGING';
    }(EventConfiguration || (EventConfiguration = {})));
    var eventConfig = Cell({});
    var makeEventLogger = function (eventName, initialTarget) {
      var sequence = [];
      var startTime = new Date().getTime();
      return {
        logEventCut: function (_name, target, purpose) {
          sequence.push({
            outcome: 'cut',
            target: target,
            purpose: purpose
          });
        },
        logEventStopped: function (_name, target, purpose) {
          sequence.push({
            outcome: 'stopped',
            target: target,
            purpose: purpose
          });
        },
        logNoParent: function (_name, target, purpose) {
          sequence.push({
            outcome: 'no-parent',
            target: target,
            purpose: purpose
          });
        },
        logEventNoHandlers: function (_name, target) {
          sequence.push({
            outcome: 'no-handlers-left',
            target: target
          });
        },
        logEventResponse: function (_name, target, purpose) {
          sequence.push({
            outcome: 'response',
            purpose: purpose,
            target: target
          });
        },
        write: function () {
          var finishTime = new Date().getTime();
          if (contains([
              'mousemove',
              'mouseover',
              'mouseout',
              systemInit()
            ], eventName)) {
            return;
          }
          console.log(eventName, {
            event: eventName,
            time: finishTime - startTime,
            target: initialTarget.dom,
            sequence: map(sequence, function (s) {
              if (!contains([
                  'cut',
                  'stopped',
                  'response'
                ], s.outcome)) {
                return s.outcome;
              } else {
                return '{' + s.purpose + '} ' + s.outcome + ' at (' + element(s.target) + ')';
              }
            })
          });
        }
      };
    };
    var processEvent = function (eventName, initialTarget, f) {
      var status = get$1(eventConfig.get(), eventName).orThunk(function () {
        var patterns = keys(eventConfig.get());
        return findMap(patterns, function (p) {
          return eventName.indexOf(p) > -1 ? Optional.some(eventConfig.get()[p]) : Optional.none();
        });
      }).getOr(EventConfiguration.NORMAL);
      switch (status) {
      case EventConfiguration.NORMAL:
        return f(noLogger());
      case EventConfiguration.LOGGING: {
          var logger = makeEventLogger(eventName, initialTarget);
          var output = f(logger);
          logger.write();
          return output;
        }
      case EventConfiguration.STOP:
        return true;
      }
    };
    var path = [
      'alloy/data/Fields',
      'alloy/debugging/Debugging'
    ];
    var getTrace = function () {
      var err = new Error();
      if (err.stack !== undefined) {
        var lines = err.stack.split('\n');
        return find(lines, function (line) {
          return line.indexOf('alloy') > 0 && !exists(path, function (p) {
            return line.indexOf(p) > -1;
          });
        }).getOr(unknown$3);
      } else {
        return unknown$3;
      }
    };
    var ignoreEvent = {
      logEventCut: noop,
      logEventStopped: noop,
      logNoParent: noop,
      logEventNoHandlers: noop,
      logEventResponse: noop,
      write: noop
    };
    var monitorEvent = function (eventName, initialTarget, f) {
      return processEvent(eventName, initialTarget, f);
    };
    var noLogger = constant(ignoreEvent);

    var menuFields = constant([
      strict$1('menu'),
      strict$1('selectedMenu')
    ]);
    var itemFields = constant([
      strict$1('item'),
      strict$1('selectedItem')
    ]);
    var schema = constant(objOf(itemFields().concat(menuFields())));
    var itemSchema = constant(objOf(itemFields()));

    var _initSize = strictObjOf('initSize', [
      strict$1('numColumns'),
      strict$1('numRows')
    ]);
    var itemMarkers = function () {
      return strictOf('markers', itemSchema());
    };
    var tieredMenuMarkers = function () {
      return strictObjOf('markers', [strict$1('backgroundMenu')].concat(menuFields()).concat(itemFields()));
    };
    var markers = function (required) {
      return strictObjOf('markers', map(required, strict$1));
    };
    var onPresenceHandler = function (label, fieldName, presence) {
      var trace = getTrace();
      return field(fieldName, fieldName, presence, valueOf(function (f) {
        return Result.value(function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return f.apply(undefined, args);
        });
      }));
    };
    var onHandler = function (fieldName) {
      return onPresenceHandler('onHandler', fieldName, defaulted(noop));
    };
    var onKeyboardHandler = function (fieldName) {
      return onPresenceHandler('onKeyboardHandler', fieldName, defaulted(Optional.none));
    };
    var onStrictHandler = function (fieldName) {
      return onPresenceHandler('onHandler', fieldName, strict());
    };
    var onStrictKeyboardHandler = function (fieldName) {
      return onPresenceHandler('onKeyboardHandler', fieldName, strict());
    };
    var output = function (name, value) {
      return state$1(name, constant(value));
    };
    var snapshot = function (name) {
      return state$1(name, identity);
    };
    var initSize = constant(_initSize);

    var nu$7 = function (x, y, bubble, direction, boundsRestriction, label) {
      return {
        x: x,
        y: y,
        bubble: bubble,
        direction: direction,
        boundsRestriction: boundsRestriction,
        label: label
      };
    };

    var adt$2 = Adt.generate([
      { southeast: [] },
      { southwest: [] },
      { northeast: [] },
      { northwest: [] },
      { south: [] },
      { north: [] },
      { east: [] },
      { west: [] }
    ]);
    var cata = function (subject, southeast, southwest, northeast, northwest, south, north, east, west) {
      return subject.fold(southeast, southwest, northeast, northwest, south, north, east, west);
    };
    var cataVertical = function (subject, south, middle, north) {
      return subject.fold(south, south, north, north, south, north, middle, middle);
    };
    var cataHorizontal = function (subject, east, middle, west) {
      return subject.fold(east, west, east, west, middle, middle, east, west);
    };
    var southeast = adt$2.southeast;
    var southwest = adt$2.southwest;
    var northeast = adt$2.northeast;
    var northwest = adt$2.northwest;
    var south = adt$2.south;
    var north = adt$2.north;
    var east = adt$2.east;
    var west = adt$2.west;

    var getRestriction = function (anchor, restriction) {
      switch (restriction) {
      case 1:
        return anchor.x;
      case 0:
        return anchor.x + anchor.width;
      case 2:
        return anchor.y;
      case 3:
        return anchor.y + anchor.height;
      }
    };
    var boundsRestriction = function (anchor, restrictions) {
      return mapToObject([
        'left',
        'right',
        'top',
        'bottom'
      ], function (dir) {
        return get$1(restrictions, dir).map(function (restriction) {
          return getRestriction(anchor, restriction);
        });
      });
    };
    var adjustBounds = function (bounds, boundsRestrictions, bubbleOffsets) {
      var applyRestriction = function (dir, current) {
        var bubbleOffset = dir === 'top' || dir === 'bottom' ? bubbleOffsets.top : bubbleOffsets.left;
        return get$1(boundsRestrictions, dir).bind(identity).bind(function (restriction) {
          if (dir === 'left' || dir === 'top') {
            return restriction >= current ? Optional.some(restriction) : Optional.none();
          } else {
            return restriction <= current ? Optional.some(restriction) : Optional.none();
          }
        }).map(function (restriction) {
          return restriction + bubbleOffset;
        }).getOr(current);
      };
      var adjustedLeft = applyRestriction('left', bounds.x);
      var adjustedTop = applyRestriction('top', bounds.y);
      var adjustedRight = applyRestriction('right', bounds.right);
      var adjustedBottom = applyRestriction('bottom', bounds.bottom);
      return bounds$1(adjustedLeft, adjustedTop, adjustedRight - adjustedLeft, adjustedBottom - adjustedTop);
    };

    var eastX = function (anchor) {
      return anchor.x;
    };
    var middleX = function (anchor, element) {
      return anchor.x + anchor.width / 2 - element.width / 2;
    };
    var westX = function (anchor, element) {
      return anchor.x + anchor.width - element.width;
    };
    var northY = function (anchor, element) {
      return anchor.y - element.height;
    };
    var southY = function (anchor) {
      return anchor.y + anchor.height;
    };
    var centreY = function (anchor, element) {
      return anchor.y + anchor.height / 2 - element.height / 2;
    };
    var eastEdgeX = function (anchor) {
      return anchor.x + anchor.width;
    };
    var westEdgeX = function (anchor, element) {
      return anchor.x - element.width;
    };
    var southeast$1 = function (anchor, element, bubbles) {
      return nu$7(eastX(anchor), southY(anchor), bubbles.southeast(), southeast(), boundsRestriction(anchor, {
        left: 1,
        top: 3
      }), 'layout-se');
    };
    var southwest$1 = function (anchor, element, bubbles) {
      return nu$7(westX(anchor, element), southY(anchor), bubbles.southwest(), southwest(), boundsRestriction(anchor, {
        right: 0,
        top: 3
      }), 'layout-sw');
    };
    var northeast$1 = function (anchor, element, bubbles) {
      return nu$7(eastX(anchor), northY(anchor, element), bubbles.northeast(), northeast(), boundsRestriction(anchor, {
        left: 1,
        bottom: 2
      }), 'layout-ne');
    };
    var northwest$1 = function (anchor, element, bubbles) {
      return nu$7(westX(anchor, element), northY(anchor, element), bubbles.northwest(), northwest(), boundsRestriction(anchor, {
        right: 0,
        bottom: 2
      }), 'layout-nw');
    };
    var north$1 = function (anchor, element, bubbles) {
      return nu$7(middleX(anchor, element), northY(anchor, element), bubbles.north(), north(), boundsRestriction(anchor, { bottom: 2 }), 'layout-n');
    };
    var south$1 = function (anchor, element, bubbles) {
      return nu$7(middleX(anchor, element), southY(anchor), bubbles.south(), south(), boundsRestriction(anchor, { top: 3 }), 'layout-s');
    };
    var east$1 = function (anchor, element, bubbles) {
      return nu$7(eastEdgeX(anchor), centreY(anchor, element), bubbles.east(), east(), boundsRestriction(anchor, { left: 0 }), 'layout-e');
    };
    var west$1 = function (anchor, element, bubbles) {
      return nu$7(westEdgeX(anchor, element), centreY(anchor, element), bubbles.west(), west(), boundsRestriction(anchor, { right: 1 }), 'layout-w');
    };
    var all$2 = function () {
      return [
        southeast$1,
        southwest$1,
        northeast$1,
        northwest$1,
        south$1,
        north$1,
        east$1,
        west$1
      ];
    };
    var allRtl = function () {
      return [
        southwest$1,
        southeast$1,
        northwest$1,
        northeast$1,
        south$1,
        north$1,
        east$1,
        west$1
      ];
    };
    var aboveOrBelow = function () {
      return [
        northeast$1,
        northwest$1,
        southeast$1,
        southwest$1,
        north$1,
        south$1
      ];
    };
    var aboveOrBelowRtl = function () {
      return [
        northwest$1,
        northeast$1,
        southwest$1,
        southeast$1,
        north$1,
        south$1
      ];
    };
    var belowOrAbove = function () {
      return [
        southeast$1,
        southwest$1,
        northeast$1,
        northwest$1,
        south$1,
        north$1
      ];
    };
    var belowOrAboveRtl = function () {
      return [
        southwest$1,
        southeast$1,
        northwest$1,
        northeast$1,
        south$1,
        north$1
      ];
    };

    var chooseChannels = function (channels, message) {
      return message.universal ? channels : filter(channels, function (ch) {
        return contains(message.channels, ch);
      });
    };
    var events$1 = function (receiveConfig) {
      return derive([run(receive(), function (component, message) {
          var channelMap = receiveConfig.channels;
          var channels = keys(channelMap);
          var receivingData = message;
          var targetChannels = chooseChannels(channels, receivingData);
          each(targetChannels, function (ch) {
            var channelInfo = channelMap[ch];
            var channelSchema = channelInfo.schema;
            var data = asRawOrDie('channel[' + ch + '] data\nReceiver: ' + element(component.element), channelSchema, receivingData.data);
            channelInfo.onReceive(component, data);
          });
        })]);
    };

    var ActiveReceiving = /*#__PURE__*/Object.freeze({
        __proto__: null,
        events: events$1
    });

    var ReceivingSchema = [strictOf('channels', setOf$1(Result.value, objOfOnly([
        onStrictHandler('onReceive'),
        defaulted$1('schema', anyValue$1())
      ])))];

    var executeEvent = function (bConfig, bState, executor) {
      return runOnExecute(function (component) {
        executor(component, bConfig, bState);
      });
    };
    var loadEvent = function (bConfig, bState, f) {
      return runOnInit(function (component, _simulatedEvent) {
        f(component, bConfig, bState);
      });
    };
    var create = function (schema, name, active, apis, extra, state) {
      var configSchema = objOfOnly(schema);
      var schemaSchema = optionObjOf(name, [optionObjOfOnly('config', schema)]);
      return doCreate(configSchema, schemaSchema, name, active, apis, extra, state);
    };
    var createModes = function (modes, name, active, apis, extra, state) {
      var configSchema = modes;
      var schemaSchema = optionObjOf(name, [optionOf('config', modes)]);
      return doCreate(configSchema, schemaSchema, name, active, apis, extra, state);
    };
    var wrapApi = function (bName, apiFunction, apiName) {
      var f = function (component) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          rest[_i - 1] = arguments[_i];
        }
        var args = [component].concat(rest);
        return component.config({ name: constant(bName) }).fold(function () {
          throw new Error('We could not find any behaviour configuration for: ' + bName + '. Using API: ' + apiName);
        }, function (info) {
          var rest = Array.prototype.slice.call(args, 1);
          return apiFunction.apply(undefined, [
            component,
            info.config,
            info.state
          ].concat(rest));
        });
      };
      return markAsBehaviourApi(f, apiName, apiFunction);
    };
    var revokeBehaviour = function (name) {
      return {
        key: name,
        value: undefined
      };
    };
    var doCreate = function (configSchema, schemaSchema, name, active, apis, extra, state) {
      var getConfig = function (info) {
        return hasNonNullableKey(info, name) ? info[name]() : Optional.none();
      };
      var wrappedApis = map$2(apis, function (apiF, apiName) {
        return wrapApi(name, apiF, apiName);
      });
      var wrappedExtra = map$2(extra, function (extraF, extraName) {
        return markAsExtraApi(extraF, extraName);
      });
      var me = __assign(__assign(__assign({}, wrappedExtra), wrappedApis), {
        revoke: curry(revokeBehaviour, name),
        config: function (spec) {
          var prepared = asRawOrDie(name + '-config', configSchema, spec);
          return {
            key: name,
            value: {
              config: prepared,
              me: me,
              configAsRaw: cached(function () {
                return asRawOrDie(name + '-config', configSchema, spec);
              }),
              initialConfig: spec,
              state: state
            }
          };
        },
        schema: constant(schemaSchema),
        exhibit: function (info, base) {
          return getConfig(info).bind(function (behaviourInfo) {
            return get$1(active, 'exhibit').map(function (exhibitor) {
              return exhibitor(base, behaviourInfo.config, behaviourInfo.state);
            });
          }).getOr(nu$6({}));
        },
        name: constant(name),
        handlers: function (info) {
          return getConfig(info).map(function (behaviourInfo) {
            var getEvents = get$1(active, 'events').getOr(function () {
              return {};
            });
            return getEvents(behaviourInfo.config, behaviourInfo.state);
          }).getOr({});
        }
      });
      return me;
    };

    var derive$1 = function (capabilities) {
      return wrapAll$1(capabilities);
    };
    var simpleSchema = objOfOnly([
      strict$1('fields'),
      strict$1('name'),
      defaulted$1('active', {}),
      defaulted$1('apis', {}),
      defaulted$1('state', NoState),
      defaulted$1('extra', {})
    ]);
    var create$1 = function (data) {
      var value = asRawOrDie('Creating behaviour: ' + data.name, simpleSchema, data);
      return create(value.fields, value.name, value.active, value.apis, value.extra, value.state);
    };
    var modeSchema = objOfOnly([
      strict$1('branchKey'),
      strict$1('branches'),
      strict$1('name'),
      defaulted$1('active', {}),
      defaulted$1('apis', {}),
      defaulted$1('state', NoState),
      defaulted$1('extra', {})
    ]);
    var createModes$1 = function (data) {
      var value = asRawOrDie('Creating behaviour: ' + data.name, modeSchema, data);
      return createModes(choose$1(value.branchKey, value.branches), value.name, value.active, value.apis, value.extra, value.state);
    };
    var revoke = constant(undefined);

    var Receiving = create$1({
      fields: ReceivingSchema,
      name: 'receiving',
      active: ActiveReceiving
    });

    var exhibit = function (base, posConfig) {
      return nu$6({
        classes: [],
        styles: posConfig.useFixed() ? {} : { position: 'relative' }
      });
    };

    var ActivePosition = /*#__PURE__*/Object.freeze({
        __proto__: null,
        exhibit: exhibit
    });

    var getDocument = function () {
      return SugarElement.fromDom(document);
    };

    var focus$1 = function (element) {
      return element.dom.focus();
    };
    var blur = function (element) {
      return element.dom.blur();
    };
    var hasFocus = function (element) {
      var root = getRootNode(element).dom;
      return element.dom === root.activeElement;
    };
    var active = function (root) {
      if (root === void 0) {
        root = getDocument();
      }
      return Optional.from(root.dom.activeElement).map(SugarElement.fromDom);
    };
    var search = function (element) {
      return active(getRootNode(element)).filter(function (e) {
        return element.dom.contains(e.dom);
      });
    };

    var preserve = function (f, container) {
      var dos = getRootNode(container);
      var refocus = active(dos).bind(function (focused) {
        var hasFocus = function (elem) {
          return eq$1(focused, elem);
        };
        return hasFocus(container) ? Optional.some(container) : descendant(container, hasFocus);
      });
      var result = f(container);
      refocus.each(function (oldFocus) {
        active(dos).filter(function (newFocus) {
          return eq$1(newFocus, oldFocus);
        }).fold(function () {
          focus$1(oldFocus);
        }, noop);
      });
      return result;
    };

    var NuPositionCss = function (position, left, top, right, bottom) {
      return {
        position: position,
        left: left,
        top: top,
        right: right,
        bottom: bottom
      };
    };
    var applyPositionCss = function (element, position) {
      var addPx = function (num) {
        return num + 'px';
      };
      setOptions(element, {
        position: Optional.some(position.position),
        left: position.left.map(addPx),
        top: position.top.map(addPx),
        right: position.right.map(addPx),
        bottom: position.bottom.map(addPx)
      });
    };

    var adt$3 = Adt.generate([
      { none: [] },
      {
        relative: [
          'x',
          'y',
          'width',
          'height'
        ]
      },
      {
        fixed: [
          'x',
          'y',
          'width',
          'height'
        ]
      }
    ]);
    var positionWithDirection = function (posName, decision, x, y, width, height) {
      var decisionX = decision.x - x;
      var decisionY = decision.y - y;
      var decisionWidth = decision.width;
      var decisionHeight = decision.height;
      var decisionRight = width - (decisionX + decisionWidth);
      var decisionBottom = height - (decisionY + decisionHeight);
      var left = Optional.some(decisionX);
      var top = Optional.some(decisionY);
      var right = Optional.some(decisionRight);
      var bottom = Optional.some(decisionBottom);
      var none = Optional.none();
      return cata(decision.direction, function () {
        return NuPositionCss(posName, left, top, none, none);
      }, function () {
        return NuPositionCss(posName, none, top, right, none);
      }, function () {
        return NuPositionCss(posName, left, none, none, bottom);
      }, function () {
        return NuPositionCss(posName, none, none, right, bottom);
      }, function () {
        return NuPositionCss(posName, left, top, none, none);
      }, function () {
        return NuPositionCss(posName, left, none, none, bottom);
      }, function () {
        return NuPositionCss(posName, left, top, none, none);
      }, function () {
        return NuPositionCss(posName, none, top, right, none);
      });
    };
    var reposition = function (origin, decision) {
      return origin.fold(function () {
        return NuPositionCss('absolute', Optional.some(decision.x), Optional.some(decision.y), Optional.none(), Optional.none());
      }, function (x, y, width, height) {
        return positionWithDirection('absolute', decision, x, y, width, height);
      }, function (x, y, width, height) {
        return positionWithDirection('fixed', decision, x, y, width, height);
      });
    };
    var toBox = function (origin, element) {
      var rel = curry(find$3, element);
      var position = origin.fold(rel, rel, function () {
        var scroll = get$9();
        return find$3(element).translate(-scroll.left, -scroll.top);
      });
      var width = getOuter$2(element);
      var height = getOuter$1(element);
      return bounds$1(position.left, position.top, width, height);
    };
    var viewport$1 = function (origin, getBounds) {
      return getBounds.fold(function () {
        return origin.fold(win, win, bounds$1);
      }, function (b) {
        return origin.fold(b, b, function () {
          var bounds = b();
          var pos = translate(origin, bounds.x, bounds.y);
          return bounds$1(pos.left, pos.top, bounds.width, bounds.height);
        });
      });
    };
    var translate = function (origin, x, y) {
      var pos = SugarPosition(x, y);
      var removeScroll = function () {
        var outerScroll = get$9();
        return pos.translate(-outerScroll.left, -outerScroll.top);
      };
      return origin.fold(constant(pos), constant(pos), removeScroll);
    };
    var cata$1 = function (subject, onNone, onRelative, onFixed) {
      return subject.fold(onNone, onRelative, onFixed);
    };
    var none$1 = adt$3.none;
    var relative = adt$3.relative;
    var fixed = adt$3.fixed;

    var anchor = function (anchorBox, origin) {
      return {
        anchorBox: anchorBox,
        origin: origin
      };
    };
    var box$1 = function (anchorBox, origin) {
      return anchor(anchorBox, origin);
    };

    var cycleBy = function (value, delta, min, max) {
      var r = value + delta;
      if (r > max) {
        return min;
      } else if (r < min) {
        return max;
      } else {
        return r;
      }
    };
    var clamp = function (value, min, max) {
      return Math.min(Math.max(value, min), max);
    };

    var adt$4 = Adt.generate([
      { fit: ['reposition'] },
      {
        nofit: [
          'reposition',
          'deltaW',
          'deltaH'
        ]
      }
    ]);
    var calcReposition = function (newX, newY, width, height, bounds) {
      var boundsX = bounds.x;
      var boundsY = bounds.y;
      var boundsWidth = bounds.width;
      var boundsHeight = bounds.height;
      var xInBounds = newX >= boundsX;
      var yInBounds = newY >= boundsY;
      var originInBounds = xInBounds && yInBounds;
      var xFit = newX + width <= boundsX + boundsWidth;
      var yFit = newY + height <= boundsY + boundsHeight;
      var sizeInBounds = xFit && yFit;
      var deltaW = Math.abs(Math.min(width, xInBounds ? boundsX + boundsWidth - newX : boundsX - (newX + width)));
      var deltaH = Math.abs(Math.min(height, yInBounds ? boundsY + boundsHeight - newY : boundsY - (newY + height)));
      var maxX = Math.max(bounds.x, bounds.right - width);
      var maxY = Math.max(bounds.y, bounds.bottom - height);
      var limitX = clamp(newX, bounds.x, maxX);
      var limitY = clamp(newY, bounds.y, maxY);
      return {
        originInBounds: originInBounds,
        sizeInBounds: sizeInBounds,
        limitX: limitX,
        limitY: limitY,
        deltaW: deltaW,
        deltaH: deltaH
      };
    };
    var attempt = function (candidate, width, height, bounds) {
      var candidateX = candidate.x;
      var candidateY = candidate.y;
      var bubbleOffsets = candidate.bubble.offset;
      var bubbleLeft = bubbleOffsets.left;
      var bubbleTop = bubbleOffsets.top;
      var adjustedBounds = adjustBounds(bounds, candidate.boundsRestriction, bubbleOffsets);
      var boundsY = adjustedBounds.y;
      var boundsBottom = adjustedBounds.bottom;
      var boundsX = adjustedBounds.x;
      var boundsRight = adjustedBounds.right;
      var newX = candidateX + bubbleLeft;
      var newY = candidateY + bubbleTop;
      var _a = calcReposition(newX, newY, width, height, adjustedBounds), originInBounds = _a.originInBounds, sizeInBounds = _a.sizeInBounds, limitX = _a.limitX, limitY = _a.limitY, deltaW = _a.deltaW, deltaH = _a.deltaH;
      var upAvailable = constant(limitY + deltaH - boundsY);
      var downAvailable = constant(boundsBottom - limitY);
      var maxHeight = cataVertical(candidate.direction, downAvailable, downAvailable, upAvailable);
      var westAvailable = constant(limitX + deltaW - boundsX);
      var eastAvailable = constant(boundsRight - limitX);
      var maxWidth = cataHorizontal(candidate.direction, eastAvailable, eastAvailable, westAvailable);
      var reposition = {
        x: limitX,
        y: limitY,
        width: deltaW,
        height: deltaH,
        maxHeight: maxHeight,
        maxWidth: maxWidth,
        direction: candidate.direction,
        classes: {
          on: candidate.bubble.classesOn,
          off: candidate.bubble.classesOff
        },
        label: candidate.label,
        candidateYforTest: newY
      };
      return originInBounds && sizeInBounds ? adt$4.fit(reposition) : adt$4.nofit(reposition, deltaW, deltaH);
    };
    var attempts = function (candidates, anchorBox, elementBox, bubbles, bounds) {
      var panelWidth = elementBox.width;
      var panelHeight = elementBox.height;
      var attemptBestFit = function (layout, reposition, deltaW, deltaH) {
        var next = layout(anchorBox, elementBox, bubbles);
        var attemptLayout = attempt(next, panelWidth, panelHeight, bounds);
        return attemptLayout.fold(adt$4.fit, function (newReposition, newDeltaW, newDeltaH) {
          var improved = newDeltaH > deltaH || newDeltaW > deltaW;
          return improved ? adt$4.nofit(newReposition, newDeltaW, newDeltaH) : adt$4.nofit(reposition, deltaW, deltaH);
        });
      };
      var abc = foldl(candidates, function (b, a) {
        var bestNext = curry(attemptBestFit, a);
        return b.fold(adt$4.fit, bestNext);
      }, adt$4.nofit({
        x: anchorBox.x,
        y: anchorBox.y,
        width: elementBox.width,
        height: elementBox.height,
        maxHeight: elementBox.height,
        maxWidth: elementBox.width,
        direction: southeast(),
        classes: {
          on: [],
          off: []
        },
        label: 'none',
        candidateYforTest: anchorBox.y
      }, -1, -1));
      return abc.fold(identity, identity);
    };

    var elementSize = function (p) {
      return {
        width: getOuter$2(p),
        height: getOuter$1(p)
      };
    };
    var layout = function (anchorBox, element, bubbles, options) {
      remove$6(element, 'max-height');
      remove$6(element, 'max-width');
      var elementBox = elementSize(element);
      return attempts(options.preference, anchorBox, elementBox, bubbles, options.bounds);
    };
    var setClasses = function (element, decision) {
      var classInfo = decision.classes;
      remove$5(element, classInfo.off);
      add$3(element, classInfo.on);
    };
    var setHeight = function (element, decision, options) {
      var maxHeightFunction = options.maxHeightFunction;
      maxHeightFunction(element, decision.maxHeight);
    };
    var setWidth = function (element, decision, options) {
      var maxWidthFunction = options.maxWidthFunction;
      maxWidthFunction(element, decision.maxWidth);
    };
    var position = function (element, decision, options) {
      applyPositionCss(element, reposition(options.origin, decision));
    };

    var setMaxHeight = function (element, maxHeight) {
      setMax(element, Math.floor(maxHeight));
    };
    var anchored = constant(function (element, available) {
      setMaxHeight(element, available);
      setAll$1(element, {
        'overflow-x': 'hidden',
        'overflow-y': 'auto'
      });
    });
    var expandable = constant(function (element, available) {
      setMaxHeight(element, available);
    });

    var defaultOr = function (options, key, dephault) {
      return options[key] === undefined ? dephault : options[key];
    };
    var simple = function (anchor, element, bubble, layouts, getBounds, overrideOptions) {
      var maxHeightFunction = defaultOr(overrideOptions, 'maxHeightFunction', anchored());
      var maxWidthFunction = defaultOr(overrideOptions, 'maxWidthFunction', noop);
      var anchorBox = anchor.anchorBox;
      var origin = anchor.origin;
      var options = {
        bounds: viewport$1(origin, getBounds),
        origin: origin,
        preference: layouts,
        maxHeightFunction: maxHeightFunction,
        maxWidthFunction: maxWidthFunction
      };
      go(anchorBox, element, bubble, options);
    };
    var go = function (anchorBox, element, bubble, options) {
      var decision = layout(anchorBox, element, bubble, options);
      position(element, decision, options);
      setClasses(element, decision);
      setHeight(element, decision, options);
      setWidth(element, decision, options);
    };

    var allAlignments = [
      'valignCentre',
      'alignLeft',
      'alignRight',
      'alignCentre',
      'top',
      'bottom',
      'left',
      'right'
    ];
    var nu$8 = function (width, yoffset, classes) {
      var getClasses = function (prop) {
        return get$1(classes, prop).getOr([]);
      };
      var make = function (xDelta, yDelta, alignmentsOn) {
        var alignmentsOff = difference(allAlignments, alignmentsOn);
        return {
          offset: SugarPosition(xDelta, yDelta),
          classesOn: bind(alignmentsOn, getClasses),
          classesOff: bind(alignmentsOff, getClasses)
        };
      };
      return {
        southeast: function () {
          return make(-width, yoffset, [
            'top',
            'alignLeft'
          ]);
        },
        southwest: function () {
          return make(width, yoffset, [
            'top',
            'alignRight'
          ]);
        },
        south: function () {
          return make(-width / 2, yoffset, [
            'top',
            'alignCentre'
          ]);
        },
        northeast: function () {
          return make(-width, -yoffset, [
            'bottom',
            'alignLeft'
          ]);
        },
        northwest: function () {
          return make(width, -yoffset, [
            'bottom',
            'alignRight'
          ]);
        },
        north: function () {
          return make(-width / 2, -yoffset, [
            'bottom',
            'alignCentre'
          ]);
        },
        east: function () {
          return make(width, -yoffset / 2, [
            'valignCentre',
            'left'
          ]);
        },
        west: function () {
          return make(-width, -yoffset / 2, [
            'valignCentre',
            'right'
          ]);
        },
        innerNorthwest: function () {
          return make(-width, yoffset, [
            'top',
            'alignRight'
          ]);
        },
        innerNortheast: function () {
          return make(width, yoffset, [
            'top',
            'alignLeft'
          ]);
        },
        innerNorth: function () {
          return make(-width / 2, yoffset, [
            'top',
            'alignCentre'
          ]);
        },
        innerSouthwest: function () {
          return make(-width, -yoffset, [
            'bottom',
            'alignRight'
          ]);
        },
        innerSoutheast: function () {
          return make(width, -yoffset, [
            'bottom',
            'alignLeft'
          ]);
        },
        innerSouth: function () {
          return make(-width / 2, -yoffset, [
            'bottom',
            'alignCentre'
          ]);
        },
        innerWest: function () {
          return make(width, -yoffset / 2, [
            'valignCentre',
            'right'
          ]);
        },
        innerEast: function () {
          return make(-width, -yoffset / 2, [
            'valignCentre',
            'left'
          ]);
        }
      };
    };
    var fallback = function () {
      return nu$8(0, 0, {});
    };

    var nu$9 = function (x) {
      return x;
    };

    var onDirection = function (isLtr, isRtl) {
      return function (element) {
        return getDirection(element) === 'rtl' ? isRtl : isLtr;
      };
    };
    var getDirection = function (element) {
      return get$5(element, 'direction') === 'rtl' ? 'rtl' : 'ltr';
    };

    var AttributeValue;
    (function (AttributeValue) {
      AttributeValue['TopToBottom'] = 'toptobottom';
      AttributeValue['BottomToTop'] = 'bottomtotop';
    }(AttributeValue || (AttributeValue = {})));
    var Attribute = 'data-alloy-vertical-dir';
    var isBottomToTopDir = function (el) {
      return closest$2(el, function (current) {
        return isElement(current) && get$3(current, 'data-alloy-vertical-dir') === AttributeValue.BottomToTop;
      });
    };

    var schema$1 = function () {
      return optionObjOf('layouts', [
        strict$1('onLtr'),
        strict$1('onRtl'),
        option('onBottomLtr'),
        option('onBottomRtl')
      ]);
    };
    var get$b = function (elem, info, defaultLtr, defaultRtl, defaultBottomLtr, defaultBottomRtl, dirElement) {
      var isBottomToTop = dirElement.map(isBottomToTopDir).getOr(false);
      var customLtr = info.layouts.map(function (ls) {
        return ls.onLtr(elem);
      });
      var customRtl = info.layouts.map(function (ls) {
        return ls.onRtl(elem);
      });
      var ltr = isBottomToTop ? info.layouts.bind(function (ls) {
        return ls.onBottomLtr.map(function (f) {
          return f(elem);
        });
      }).or(customLtr).getOr(defaultBottomLtr) : customLtr.getOr(defaultLtr);
      var rtl = isBottomToTop ? info.layouts.bind(function (ls) {
        return ls.onBottomRtl.map(function (f) {
          return f(elem);
        });
      }).or(customRtl).getOr(defaultBottomRtl) : customRtl.getOr(defaultRtl);
      var f = onDirection(ltr, rtl);
      return f(elem);
    };

    var placement = function (component, anchorInfo, origin) {
      var hotspot = anchorInfo.hotspot;
      var anchorBox = toBox(origin, hotspot.element);
      var layouts = get$b(component.element, anchorInfo, belowOrAbove(), belowOrAboveRtl(), aboveOrBelow(), aboveOrBelowRtl(), Optional.some(anchorInfo.hotspot.element));
      return Optional.some(nu$9({
        anchorBox: anchorBox,
        bubble: anchorInfo.bubble.getOr(fallback()),
        overrides: anchorInfo.overrides,
        layouts: layouts,
        placer: Optional.none()
      }));
    };
    var HotspotAnchor = [
      strict$1('hotspot'),
      option('bubble'),
      defaulted$1('overrides', {}),
      schema$1(),
      output('placement', placement)
    ];

    var placement$1 = function (component, anchorInfo, origin) {
      var pos = translate(origin, anchorInfo.x, anchorInfo.y);
      var anchorBox = bounds$1(pos.left, pos.top, anchorInfo.width, anchorInfo.height);
      var layouts = get$b(component.element, anchorInfo, all$2(), allRtl(), all$2(), allRtl(), Optional.none());
      return Optional.some(nu$9({
        anchorBox: anchorBox,
        bubble: anchorInfo.bubble,
        overrides: anchorInfo.overrides,
        layouts: layouts,
        placer: Optional.none()
      }));
    };
    var MakeshiftAnchor = [
      strict$1('x'),
      strict$1('y'),
      defaulted$1('height', 0),
      defaulted$1('width', 0),
      defaulted$1('bubble', fallback()),
      defaulted$1('overrides', {}),
      schema$1(),
      output('placement', placement$1)
    ];

    var adt$5 = Adt.generate([
      { screen: ['point'] },
      {
        absolute: [
          'point',
          'scrollLeft',
          'scrollTop'
        ]
      }
    ]);
    var toFixed = function (pos) {
      return pos.fold(identity, function (point, scrollLeft, scrollTop) {
        return point.translate(-scrollLeft, -scrollTop);
      });
    };
    var toAbsolute = function (pos) {
      return pos.fold(identity, identity);
    };
    var sum = function (points) {
      return foldl(points, function (b, a) {
        return b.translate(a.left, a.top);
      }, SugarPosition(0, 0));
    };
    var sumAsFixed = function (positions) {
      var points = map(positions, toFixed);
      return sum(points);
    };
    var sumAsAbsolute = function (positions) {
      var points = map(positions, toAbsolute);
      return sum(points);
    };
    var screen = adt$5.screen;
    var absolute$2 = adt$5.absolute;

    var getOffset = function (component, origin, anchorInfo) {
      var win = defaultView(anchorInfo.root).dom;
      var hasSameOwner = function (frame) {
        var frameOwner = owner(frame);
        var compOwner = owner(component.element);
        return eq$1(frameOwner, compOwner);
      };
      return Optional.from(win.frameElement).map(SugarElement.fromDom).filter(hasSameOwner).map(absolute);
    };
    var getRootPoint = function (component, origin, anchorInfo) {
      var doc = owner(component.element);
      var outerScroll = get$9(doc);
      var offset = getOffset(component, origin, anchorInfo).getOr(outerScroll);
      return absolute$2(offset, outerScroll.left, outerScroll.top);
    };

    var capRect = function (left, top, width, height) {
      var newLeft = left, newTop = top, newWidth = width, newHeight = height;
      if (left < 0) {
        newLeft = 0;
        newWidth = width + left;
      }
      if (top < 0) {
        newTop = 0;
        newHeight = height + top;
      }
      var point = screen(SugarPosition(newLeft, newTop));
      return Optional.some(pointed(point, newWidth, newHeight));
    };
    var calcNewAnchor = function (optBox, rootPoint, anchorInfo, origin, elem) {
      return optBox.map(function (box) {
        var points = [
          rootPoint,
          box.point
        ];
        var topLeft = cata$1(origin, function () {
          return sumAsAbsolute(points);
        }, function () {
          return sumAsAbsolute(points);
        }, function () {
          return sumAsFixed(points);
        });
        var anchorBox = rect(topLeft.left, topLeft.top, box.width, box.height);
        var layoutsLtr = anchorInfo.showAbove ? aboveOrBelow() : belowOrAbove();
        var layoutsRtl = anchorInfo.showAbove ? aboveOrBelowRtl() : belowOrAboveRtl();
        var layouts = get$b(elem, anchorInfo, layoutsLtr, layoutsRtl, layoutsLtr, layoutsRtl, Optional.none());
        return nu$9({
          anchorBox: anchorBox,
          bubble: anchorInfo.bubble.getOr(fallback()),
          overrides: anchorInfo.overrides,
          layouts: layouts,
          placer: Optional.none()
        });
      });
    };

    var placement$2 = function (component, anchorInfo, origin) {
      var rootPoint = getRootPoint(component, origin, anchorInfo);
      return anchorInfo.node.filter(inBody).bind(function (target) {
        var rect = target.dom.getBoundingClientRect();
        var nodeBox = capRect(rect.left, rect.top, rect.width, rect.height);
        var elem = anchorInfo.node.getOr(component.element);
        return calcNewAnchor(nodeBox, rootPoint, anchorInfo, origin, elem);
      });
    };
    var NodeAnchor = [
      strict$1('node'),
      strict$1('root'),
      option('bubble'),
      schema$1(),
      defaulted$1('overrides', {}),
      defaulted$1('showAbove', false),
      output('placement', placement$2)
    ];

    var zeroWidth = '\uFEFF';
    var nbsp = '\xA0';

    var create$2 = function (start, soffset, finish, foffset) {
      return {
        start: start,
        soffset: soffset,
        finish: finish,
        foffset: foffset
      };
    };
    var SimRange = { create: create$2 };

    var adt$6 = Adt.generate([
      { before: ['element'] },
      {
        on: [
          'element',
          'offset'
        ]
      },
      { after: ['element'] }
    ]);
    var cata$2 = function (subject, onBefore, onOn, onAfter) {
      return subject.fold(onBefore, onOn, onAfter);
    };
    var getStart = function (situ) {
      return situ.fold(identity, identity, identity);
    };
    var before$2 = adt$6.before;
    var on = adt$6.on;
    var after$1 = adt$6.after;
    var Situ = {
      before: before$2,
      on: on,
      after: after$1,
      cata: cata$2,
      getStart: getStart
    };

    var adt$7 = Adt.generate([
      { domRange: ['rng'] },
      {
        relative: [
          'startSitu',
          'finishSitu'
        ]
      },
      {
        exact: [
          'start',
          'soffset',
          'finish',
          'foffset'
        ]
      }
    ]);
    var exactFromRange = function (simRange) {
      return adt$7.exact(simRange.start, simRange.soffset, simRange.finish, simRange.foffset);
    };
    var getStart$1 = function (selection) {
      return selection.match({
        domRange: function (rng) {
          return SugarElement.fromDom(rng.startContainer);
        },
        relative: function (startSitu, _finishSitu) {
          return Situ.getStart(startSitu);
        },
        exact: function (start, _soffset, _finish, _foffset) {
          return start;
        }
      });
    };
    var domRange = adt$7.domRange;
    var relative$1 = adt$7.relative;
    var exact = adt$7.exact;
    var getWin = function (selection) {
      var start = getStart$1(selection);
      return defaultView(start);
    };
    var range$1 = SimRange.create;
    var SimSelection = {
      domRange: domRange,
      relative: relative$1,
      exact: exact,
      exactFromRange: exactFromRange,
      getWin: getWin,
      range: range$1
    };

    var setStart = function (rng, situ) {
      situ.fold(function (e) {
        rng.setStartBefore(e.dom);
      }, function (e, o) {
        rng.setStart(e.dom, o);
      }, function (e) {
        rng.setStartAfter(e.dom);
      });
    };
    var setFinish = function (rng, situ) {
      situ.fold(function (e) {
        rng.setEndBefore(e.dom);
      }, function (e, o) {
        rng.setEnd(e.dom, o);
      }, function (e) {
        rng.setEndAfter(e.dom);
      });
    };
    var relativeToNative = function (win, startSitu, finishSitu) {
      var range = win.document.createRange();
      setStart(range, startSitu);
      setFinish(range, finishSitu);
      return range;
    };
    var exactToNative = function (win, start, soffset, finish, foffset) {
      var rng = win.document.createRange();
      rng.setStart(start.dom, soffset);
      rng.setEnd(finish.dom, foffset);
      return rng;
    };
    var toRect = function (rect) {
      return {
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height
      };
    };
    var getFirstRect = function (rng) {
      var rects = rng.getClientRects();
      var rect = rects.length > 0 ? rects[0] : rng.getBoundingClientRect();
      return rect.width > 0 || rect.height > 0 ? Optional.some(rect).map(toRect) : Optional.none();
    };

    var adt$8 = Adt.generate([
      {
        ltr: [
          'start',
          'soffset',
          'finish',
          'foffset'
        ]
      },
      {
        rtl: [
          'start',
          'soffset',
          'finish',
          'foffset'
        ]
      }
    ]);
    var fromRange = function (win, type, range) {
      return type(SugarElement.fromDom(range.startContainer), range.startOffset, SugarElement.fromDom(range.endContainer), range.endOffset);
    };
    var getRanges = function (win, selection) {
      return selection.match({
        domRange: function (rng) {
          return {
            ltr: constant(rng),
            rtl: Optional.none
          };
        },
        relative: function (startSitu, finishSitu) {
          return {
            ltr: cached(function () {
              return relativeToNative(win, startSitu, finishSitu);
            }),
            rtl: cached(function () {
              return Optional.some(relativeToNative(win, finishSitu, startSitu));
            })
          };
        },
        exact: function (start, soffset, finish, foffset) {
          return {
            ltr: cached(function () {
              return exactToNative(win, start, soffset, finish, foffset);
            }),
            rtl: cached(function () {
              return Optional.some(exactToNative(win, finish, foffset, start, soffset));
            })
          };
        }
      });
    };
    var doDiagnose = function (win, ranges) {
      var rng = ranges.ltr();
      if (rng.collapsed) {
        var reversed = ranges.rtl().filter(function (rev) {
          return rev.collapsed === false;
        });
        return reversed.map(function (rev) {
          return adt$8.rtl(SugarElement.fromDom(rev.endContainer), rev.endOffset, SugarElement.fromDom(rev.startContainer), rev.startOffset);
        }).getOrThunk(function () {
          return fromRange(win, adt$8.ltr, rng);
        });
      } else {
        return fromRange(win, adt$8.ltr, rng);
      }
    };
    var diagnose = function (win, selection) {
      var ranges = getRanges(win, selection);
      return doDiagnose(win, ranges);
    };
    var asLtrRange = function (win, selection) {
      var diagnosis = diagnose(win, selection);
      return diagnosis.match({
        ltr: function (start, soffset, finish, foffset) {
          var rng = win.document.createRange();
          rng.setStart(start.dom, soffset);
          rng.setEnd(finish.dom, foffset);
          return rng;
        },
        rtl: function (start, soffset, finish, foffset) {
          var rng = win.document.createRange();
          rng.setStart(finish.dom, foffset);
          rng.setEnd(start.dom, soffset);
          return rng;
        }
      });
    };
    var ltr = adt$8.ltr;
    var rtl = adt$8.rtl;

    var NodeValue = function (is, name) {
      var get = function (element) {
        if (!is(element)) {
          throw new Error('Can only get ' + name + ' value of a ' + name + ' node');
        }
        return getOption(element).getOr('');
      };
      var getOption = function (element) {
        return is(element) ? Optional.from(element.dom.nodeValue) : Optional.none();
      };
      var set = function (element, value) {
        if (!is(element)) {
          throw new Error('Can only set raw ' + name + ' value of a ' + name + ' node');
        }
        element.dom.nodeValue = value;
      };
      return {
        get: get,
        getOption: getOption,
        set: set
      };
    };

    var api$2 = NodeValue(isText, 'text');
    var get$c = function (element) {
      return api$2.get(element);
    };
    var getOption = function (element) {
      return api$2.getOption(element);
    };

    var getEnd = function (element) {
      return name(element) === 'img' ? 1 : getOption(element).fold(function () {
        return children(element).length;
      }, function (v) {
        return v.length;
      });
    };
    var isTextNodeWithCursorPosition = function (el) {
      return getOption(el).filter(function (text) {
        return text.trim().length !== 0 || text.indexOf(nbsp) > -1;
      }).isSome();
    };
    var elementsWithCursorPosition = [
      'img',
      'br'
    ];
    var isCursorPosition = function (elem) {
      var hasCursorPosition = isTextNodeWithCursorPosition(elem);
      return hasCursorPosition || contains(elementsWithCursorPosition, name(elem));
    };

    var last$1 = function (element) {
      return descendantRtl(element, isCursorPosition);
    };
    var descendantRtl = function (scope, predicate) {
      var descend = function (element) {
        var children$1 = children(element);
        for (var i = children$1.length - 1; i >= 0; i--) {
          var child = children$1[i];
          if (predicate(child)) {
            return Optional.some(child);
          }
          var res = descend(child);
          if (res.isSome()) {
            return res;
          }
        }
        return Optional.none();
      };
      return descend(scope);
    };

    var descendants = function (scope, selector) {
      return all(selector, scope);
    };

    var makeRange = function (start, soffset, finish, foffset) {
      var doc = owner(start);
      var rng = doc.dom.createRange();
      rng.setStart(start.dom, soffset);
      rng.setEnd(finish.dom, foffset);
      return rng;
    };
    var after$2 = function (start, soffset, finish, foffset) {
      var r = makeRange(start, soffset, finish, foffset);
      var same = eq$1(start, finish) && soffset === foffset;
      return r.collapsed && !same;
    };

    var getNativeSelection = function (win) {
      return Optional.from(win.getSelection());
    };
    var readRange = function (selection) {
      if (selection.rangeCount > 0) {
        var firstRng = selection.getRangeAt(0);
        var lastRng = selection.getRange