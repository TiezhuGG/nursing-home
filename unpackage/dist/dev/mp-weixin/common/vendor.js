(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
          function (value) {return promise.resolve(callback()).then(function () {return value;});},
          function (reason) {return promise.resolve(callback()).then(function () {
              throw reason;
            });});

        };
      }
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var protocols = {
  previewImage: previewImage };

var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = {
    multipleSlots: true,
    addGlobalClass: true };


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin']['options']) {
      Object.assign(options, vueOptions['mp-weixin']['options']);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 105:
/*!***************************************************************!*\
  !*** /Users/92afa/Desktop/nursing-home/static/images/off.png ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAFl0lEQVRYR52Ya2wUVRTH/+fOhK1Cu4SICEH0g4WYiNnO3LGtCUGIMUoUIwhGEnzED/oBJPIwSngFBaNRnhpJNDEaYlSg8pDgB58Eau3emaWpfABMNDytilBfbbMz95jbzCIs+5jtJE3TzD3n/ube8/ifEmp4giAYzczTmXkqM0shhPl7NAAB4DwR/cLMipm/01rvb25uPp/UPSVZ6Pt+CzM/S0SzmXlYEhsiGmDmvcy82fO8w9VsKoIopcYS0VZmnh07yhPRF1rrb2zbPsTMZyzL+r2hoSHq6em5LpVKTYiiqBXAdAD3ALCJiAG0hWG4rLm5+adyQGVBcrncnCiK3gGQBvAngC22bW/LZDJnqn2deR9/xNPMvATACCK6COAp13XbStmXBFFKLSGi15jZ3P2ntm0vTApQvElnZ+cNlmVtYeY5AJiZV3qet6543VUgSqkXAawHoJl5qed5G5OcQLU1SqmFADaY6wKwXEr5yuU2V4DkcrkHtdZtBpuI5rmu+0m1DWp5r5Sax8wfCCEEEc1xHGdXwf4SSGdn541CiKMA6gEslVK+UcsmSdf6vr+AmbcCuJjP55taW1t/NraXQLLZ7EdE9AgR7XBdd25Sx0NZ5/v+TpOJRNTmuu5gRg6C5HK5O6MoOgTgX9u2Jw01MJNCdXR0jLFt+0cAwwG0Sim/HwRRSn0I4FEAa6WUq0s59H3/FgBPEtEmx3F+q7Rpe3v7NalU6nnLsg5kMpnOUmuDIFirtV7JzG2e582mXC43MoqiswCGhWF4c0tLy+kyIOuYeTmAH4QQ08vBxBCmot4NYIeUsuQ1d3d3jxkYGDB7RX19fWMpm80+RkTvE9HnruveV+5LTZ/RWn8F4LZyMEUQ52zbviuTyRwv59P3/QPMfC+AJ8j3fVPCFwBYJqV8vdKRV4IphmDmaZ7nHavkL5vNPkdEpra8bUDamXmwP0gpv64WcKVg+vv7/06lUoXrOJcEwuzj+/4UZj5IRFlSSpn4GAtgnJTyXDUQ874Yhoh+NfIAQGKIQj8CYPY/a0AuABiZTqfTjY2NprkleopgjE1NEDHItQD+MT8GpA9AXTqdrmtsbBxIRAEgjonP4pMwZhWzqZTfEydOpHp7e/sBDBiQUwDGA7hJSnkyCUhxYBp1Vimbyvns6uoan8/nTzHzaROsB5l5ihBiquM4B6uBlMoOy7L+qJbapfzGFf1wIVjfNYKFiBa7rlux5VdK0SR1phjG6B4ApmRsMycyl5k/JqIvXdc11bDkk6RO1AqjlNoPYAYRzTcxYqSg6R1sNOfkyZN7ypT41cy8plp2XA5DRNtd151fyp+RkgBOElHEzOMLTW8HgIcBvCqlfKGU4ZEjR+4Iw3CpbdsrKpXtQp1h5g1a652e5+0p82FrmNk02MF+VABxiMjMI3+FYTixpaWl5KlUC+Sk7+PTOE5Ew7XWU8y4cUkY+b6/h5lnMvM+z/NmJnU6lHVKKSNBjZjeKaU0v/9XaEEQjIuiqJuIRhHRQtd13xzKJtVslFKLAGwC0GtZVqapqelKqWgcxBn0kQlcInrcdd3t1RzX8j6elYwIswDMklLuLthfNU4EQbBYa22EcxiL6M21bFZurVJqsUmGeJxYJaV86fK1JQesbDa7nIhejq9udxiGzww1gOMB6y1mnmVOWgixynEc4/uKp+zIGQTBTK31ewBGxR1yqxBiQzW9WvDe1dV1fRiGi5jZxIQRyRfi695X6tSqDeETmHkjET0Un05IRN8S0V6tdbcQ4pjW+mJdXZ0ZTUf09/ffCuB2Zn6AiKbG12CG8F35fH5ZYYapGaRgoJQydWYFM88AkEoYM6a9HxBCrHccR1WzSfT/kYKTjo6OBtu27wcwDcAkABMBGHGjBzUF0TFmPiqEaK+vr99Ti9D6Dyx8GkAGO/IWAAAAAElFTkSuQmCC"

/***/ }),

/***/ 106:
/*!******************************************************************!*\
  !*** /Users/92afa/Desktop/nursing-home/static/images/hidden.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAADD0lEQVRYR+1WQWgUVxj+vjdbFW1WoWrSQqlUIkEryc68KXsrUUMghUJBI17UixcP6sHeRA+inhQt9SR4UAgSLAVpU1tKC14adt4kWbNIIAE1IMoqoe4ixEx2/vJkIxt3kxU1kMO+yzDv/e973/v+72OGWCaDy4QHGkTe7ERDkYYi9dLZ8MiCHgmC4HeSzQC+1Vo/rifl+6yPjo42z8zM/Akg73lel8V63RpjzASAzQDGEonEro6Ojkfvc9hCe7PZ7MYoiv4CsB3Afa31l/OIBEHwFcl/AKwn+TCKop50On3vQ5IZHh7eVCqV/gCwheTTOI53+L6fm0fEvoyMjGybnZ21kn0mIkWl1AHP8375EGSMMZ0A+u1FAUwC6NZaj81hV6Umk8l8rpS6BaADgIjIlaampuNtbW3FdyE0MDCwsqWl5VQcxz8ASJC8Q3K367pPK/GqiBhjVpMcEJFvKgonlVInJiYm+np7e0tvS2hoaOi7OI7PAdhasSenlNqxKBFLAsCvAKyMzwFcAHAEwCdloDGSF0SkX2tt16tG+SLfx3F8jKQuF0yKyEWSJwGsI3lXRHZqrZ9VtWZ8fHxloVD4zRYAKJDs9jxv0BhjzXtGRA4CWFHeGAHIiMgIySfluY3lJKQBrCrPWZyfEonE2fb29hdBEHxN0npwLcmsVX3uQpXx3WPNZE3qOE6367r/Vl7XGPMpgMMkj4nIx3XaM0XydBRFV9PpdKGyNgzDtIjY5CRFZLfv+z/PS83g4GDScZyzAK75vp+pdVAul1sxPT1tTZYEcJ5kSURetY3klH2KiDXlVLFYbO7s7JythRMEQUop1ZVMJi+1tra+rIpvPROGYdgtIrcBFPP5/Iaenp5XIHPDGPMRybyIWB/s9Dzv73qYC8Z3sY1hGF4WkcMAbmqtbStrmbUPwD6l1I+u6x5dEiLGmAcAvhCR/b7vX691SBiGe0XkBslxz/O2LBUR+wnY5DhOKpVK/VfrkGw2uyaKojsAhrTWh5aEyNuCvktd48foTdUaijQUqZekhkeWrUf+B5nBLDJwp8rDAAAAAElFTkSuQmCC"

/***/ }),

/***/ 107:
/*!****************************************************************!*\
  !*** /Users/92afa/Desktop/nursing-home/static/images/show.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAADhUlEQVRYR+2XQWgUZxTH/+/bTXbArtBAYqHgxR6zbHfmmyB4cUvTg2gQbLWnglrShtKmRREsVNMUFMTSqIgaxEJPrW2hqHjQ4vZSKJlvZrMkx3opBNoIFVyF3Wz2e/KF2WU7yW42CTR78N1m5n1vfvN/73vzPkKHGHUIB16ARDOxZkU8z8sIIfZorbNEtANAbxj0ETM/FELktNZ3XdfNryXtbYN4njdERCcA7GrzBb8z8znXdW+1478qiFJqO4DLAPaagMz8rxDiewC/Li4uTluWNW/ul0qlvng8/jqAN7XW7xJRTwhwB8BHUsq/WgG1BMnn84Na6x+Y+WUABmAsFovdSKfTz1oFLRQKWyqVylEApwH0ENFjIcShTCZzv9m6piBKqREAFwHEAfyitR4ZGBj4ux2Zaz5TU1OvCCGuANgPYBHAJ1JKc73MVgQJIUw6jH3lOM4YEfFaIGq+zEy+748B+CK8Z9K0DGYZSBAE7zHztyZALBYbzmQy16MAQRD0aq0/BrAPgNk5xh4CuC2EuGTb9qPomnw+/361Wp00H0REh23b/q7R5z8gvu/vBPAbMycAfCqlvBAN6HneASK6AWBrE4WeMPMR13V/jj5XSo0CmCCiMoDdjuP8UfOpg8zMzGxbWFjwmflVAF9LKY+vBCGEuMnMgohuM/M3lmV54a5xiegzZt5HRFprfbAJzHkAx4horru720mlUv+Y9XUQpdQ9AINGkWKxOJjNZk1x1S1Mx5+hEp9LKc+upIhS6iSAMwCeCCFei6Ypl8vFk8mk2T27AdyXUr5VB/F9f5iZrwGY7+rqSqXT6aXe0GhKqXFTcEYJx3GGWhWu7/u3jDKm0KWUp6K+hUKhr1KpzADoI6IPHMeZpLBhmZtbmfkd13V/avKlpmWbhvWGlDLXCkQplQXwAMC0lDKzkq/neW8T0Y9GOQAps7UmmHmUiG46jnOo2QuUUmZB0rKsZH9//9NWILOzsy+VSqUigKKUsllRw/d90ywPArjQOSAdkxojcUcUay3XHbF9Dcz/3dAAzCUSieUNLUzR5rf4Woo64qfXUC9mFlkaA4ho3LbtLzcyBgRBcJqZax22vTEgAlMfjBKJxIe1H1SrZtb4zNRduVy+uu7BqBZsI6NitVo9orU2A9HGRsUGZTZ/eG6UedOPE9F62PQDVrsFul6/VQ9Y6w281nUvQKKKPQfiFWMtsfU9nQAAAABJRU5ErkJggg=="

/***/ }),

/***/ 14:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    options.components = Object.assign(components, options.components || {})
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 19:
/*!*****************************************************************!*\
  !*** /Users/92afa/Desktop/nursing-home/static/images/heart.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    } else {
      console.error(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!*****************************************************************!*\
  !*** /Users/92afa/Desktop/nursing-home/static/images/medal.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 21:
/*!******************************************************************!*\
  !*** /Users/92afa/Desktop/nursing-home/static/images/notice.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAkCAYAAACe0YppAAAELklEQVRYR+2Xf2hbVRTHv+c1bdO1na4rjm6MKvtB3YauCv4YiEWluuYHY5LXVpuX+GuIUMNQOnSimQ4HXZ0/UCeyP5Zk65Y82JhJW5WhDhHnD6RqV/9YocJYVcZsa9fVpck98vLeStqmy2vTgX/0/HnvOd/PPeeed9+9hNkZ1ds9bgY/A/BGgJhA3YL4IzUabJ+NFJl1rqmpsdxUUnkU4EczxRDo8K2xWxQ//MKMpmlwvcOzi5lf1UX5ZwaOEiQi8OMMrDfGX47EQnvmDeyt8Vovl4i/ACwm0Fdg0cwslXGeIAvRYFLgPQD3MzCEorFlqqrGs8FNZeyyK3cR8J0hlgSQN0V4YoyBu9VY8PucwbLd6wDEBwBWZhMz5rVt2JYNfs2MZYfyOjO/QiDDj/4mcAeDvwZwnogYwApmvg8gG4ClegtgnEC+cEdg/0yLnRFcb/PsZuKdRuBlgPYUxsXboc9Do5nEHA7HoiIu84F5JwjFKR8iXyQa0PZ/mmUEyw7vFrA4poUCOEcktoSjh34yU+pGp3JbQvAnBKoEkGTiWjUa+mJq7DSwu9ZdfKWQzoJRAeZhtohN6onDvWagV33q65S1LPFpgJaA8fuIuFDV1dV1JV1jGli2eV4AcVuqUiBPOBYIzgY6Abe5G5joiL7laFZjwfevCXbZlR4C1jPwixoLbtTj5mQk25UfANwJoDsSC1bPCN76cFOFJV8a0LNFSzgW3DsnpBHksis+At5JZS2kCrXz4J9X9SaV2lXX9AhJUpfhWK12HuzOCbz5iXWUlzyja7AtEgt1ZgTLNqUJhJA2OZ6P8uPHgxdzATudT5ZaReIfnQtvpCMYyJyxw/0UMR1I+RWNWVRV1Y7CnEy2KwntiGWm59S0A2VyqRfAC6WeQ5stNNf/4zveWvdYZZ5keYOABwEsvx4HCAFnmHDCIhJt7R3tg9TgVKqF4C8BuiG9d+b75ErTHiDmh8hlV04amSYZ6CLCkOYUjgYUQupOlZPJdk8AxBJYS4w3A7AAOKn9My8B2h2JWiOxwI6cKFmCXTbPbtLvcXGSbUo/CDeD+FO2lrpU9UNtIfNuqStVgXQEYAeAAZLtnpcAftMgaX+jSXejeVxBYdpDwE9++KVeW38bk2gmkFb/62kJEPazdWz7xG+x0dm4THD+HYJhnUoeXVm8/EL1khZtfHHfpQNlvUM96T7DVTdWDa4teVYbW/rr8Ful/SPnpmpIhH/H46L72GeH/tDmTL2d1vW8VhAfWXQeQDlApwpKR2t7N+zSH2Y/bstflVjdqX0iAC6ivGhF35rns26XKbCmv/rb1u0A7zMy+Y1A7QKsPcwbAN5gZOE7e++OjC+HqRUwDQaD1pxufZfBzdOaQH9D7eu7p+VFsw1iHmworvpm7wPIE08T8+36kNQNxsd9m1pOmYVqfv8B/LkFhZxI10sAAAAASUVORK5CYII="

/***/ }),

/***/ 22:
/*!*********************************************************************!*\
  !*** /Users/92afa/Desktop/nursing-home/static/images/item-img1.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 23:
/*!*********************************************************************!*\
  !*** /Users/92afa/Desktop/nursing-home/static/images/item-img2.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAE0UlEQVR4Xu3cTYwTZRgH8P87ZY2sUWMQTfyM7IQLKIkh0CFBo4SDuppI2JqIcFEvfiYi7eLFetFtV038wIt4ATFhm2Ciqx6MH1FCu4YLflzI7BpBTRCJEeKauHYeM7t02t2dMlNn5pnp9OmVd95n3t/895m3TFsFebEIKJYqUgQCzRQCgRZoJgGmMpJogWYSYCojiY4TOje4g5jqp7LM2Pi+RQF2TbRAB7v+Ah3Mz/fRAu2bKthAgQ7m5/togfZNFWxgGNAnCagFO410HK2ALIDr3VYTGJqASmV8Xy4dVMFWMTS4Y0wBQwIdzNHzaIH2JApnACu0Xi311DtI0yg4b/AEOpzAus4i0BHitk4t0ALNJMBURhIt0EwCTGXSmOhTgHoBoLeYDH2VSR00kbVlcsPu9/Vq6SCAxLzlTxe0Uu+a2fx2O2L6Vy8uR1/mewBX+YpcxIPSA0349Z+6tfrExt1/NMz0WmkrCJWIDX1Nnw5opcgCBqey+Y8XrjopLSQd0MA7plF4xC1aSWkhKYBWP0FN32Jmi2dt6JVfFK+0lvYXzWz+iWYLeXkrqB5rC+l2aLIy2Dy1rvCZg1otHwDoQWgqZ67PO7hxt5DuhlZqz7zkVkfuBdQHs+hEp3Gxtcq89bnTSdiFdDP05Ll+bc2pNbv+siFXHB25XJvRfgDo2mavVhXTyDt7ab0WXwvpSmgCrExf5vbja5893GwZpbcBLL4hJqSFxAd9pOz6cNLPppQy6szk+l2fN8au+OaVTVr9308Bl28hBGgh9gVVCk/CUrPtJ8jL3NC8X7A+YQly0q3HXn1s9JJLp63vANzUfk6qmMZws4XYF1nRmNc5EPD6pFF42mtcp//eldAD1dJrCnjKc7GLWsjIGKAu9Ff147l+7ebGPcBz/g4GsELrAVqHsyaNlhPhDQVonuvsrIWQlVmyeWrdTmfbODAxeqeq0zLPOm0GxNY64nkK7ruF7DWNwqMNs5UT5Y11i770dUHbQffcU3DPFqJ+sfqsVVNrh/+0zc7fA44BGPi/abaPi2/XEdfnOjxbCN1nGsMftmwb9wB4LAhyb0LPirVrIeo908hva24bS5u0Oty3jR3K916iG0Ckcq03KL1WflP7e7p4/I7i7/YQvVa8DNT/LUA3dmjqOrx3oYHfMFNfbd42938hC196tbQXwMNhIPdw63BiPe+NjNMyauW7NWAcRKF9xa+XEz3nuqCF3PD1S1dctESznzVeE1aaJdFzkvNaiF4r7wfRQ2EiC7SjObcLGZgYvV9Z1qGwkQW6VVThcRCej+rjCdKjo4ivy5wCLdBMAkxlJNECzSTAVEYSLdBMAkxlYks00/oSWYb1mWEiBZhOSqDTAA1Afkbi/IWM9GckmMLS9WUC/15H1wswLUCgBZpJgKmMJFqgmQSYyvhOdLvzeeCe7UOklOtHZRVR7uBH+2P9Mk/YjmGut6NH8WEWDhslivnCXK9AX+AKCXQU8XWZU6AFWm6G7TIQXo8GXgVRun63VKksAc+44XW6ywoNmumvOTFlBJrpUgi0QDMJMJWRRAs0kwBTmUgTveWubdf1aZrBtJZEl5mxrOqhTw787PckO9re+Z1Uxi0WEGimVAi0QDMJMJWRRAs0kwBTGUm0QDMJMJX5D1G5bJdlLcDCAAAAAElFTkSuQmCC"

/***/ }),

/***/ 24:
/*!*********************************************************************!*\
  !*** /Users/92afa/Desktop/nursing-home/static/images/item-img4.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAADgElEQVR4Xu2cv2tTURTHz0lSxYS6dBCrEgg6qItLsToFRBAaKSpJiz8i4uriorg5dnLVSWoEscmWphbsYDb9Hyw4ZNLFoakUbXvlJalEmrS5591337vpN/P93nPu530597z73gsTflYIsJUoCEIAbckEAA3QlghYCqPl6EKuqCzlFekwiqhSqZUKOkkCtA6tzliAFkCTSABaQk2gAWgBNIkEoCXUBJowQTcU0RdBzpGWMFG+V4KhgZYEjjThTnL92lnJeo20d5LAAL0HAZNXGKAB+h8Bk8ZC6bBkLIB2CTQRob3bZ9Mx4mgXNjaTOUq6LIAWXAGAFkCTSABaQk2gAWgBNIkEoCXUBJrAQXfnlM8Vy/1Ot8q1ktYmK1hrIJKZqXt5xVzuNTkrVVhYeluRBhYDAWg95ADdxQuO1jOPeDRAi9HpCQFaj5d4NECL0ekJAVqPl3g0QIvR6QkBWo+XeLRzoMUr7Qglt7h+Y3p6gDZBcYA5AHoASCaGHDjQa+lU4+vdtJ1XzJhfrE4+bcU6cKB/nj1K326eMmHS/edQXFi9/KR1KgfQ++OSj3AZtNc17Ky8mU5NbibjWvZcP5GkHxfH5PB0lC6D7j74P/15rkzEPV9/1eER2FiADgzt/xMDNEC3CAz6KAulo22YwB9lATRAtwm4XKPR3u3eXwIpHX63MdwZdhHcazMEaDh6NwGXazQcDUfD0d0EsBkOuBniUMlS6QBogB6uGg1Hw9FwtN/eW6x3+YbF+95jZ+GNa8cf/0klLumA+D06QusnkzoS+ViXQctX3Vaijx6wjwZoS5shQAP0cHUdcDQcPVyORntnydG4BQfo4SodcDQcDUf7bQnFepfPOlA6QigdYqeFIHTuGxb81Y8lR8dinHtffbMUginFIbPZbOLYaPqVUuphr0ki+Z9KSinFMf6gFP0Sr9yykInPEKkL/cJGErRlRlbChQZ65vqdiW0VX2YiS9+pWeHZL8injVhiulp9vSbNQvx+tBcwP/3gHG9trRDRuDSB6Ot4Mdnkwnx9fsNPrr5Ae4FvTd3OxDi+wsQZP4lEUctE7743M/fr9eebfvPzDdpLYPbq7Lg6fOijIjrvN6Go6Jnp5cJi6RERbZvIyQhoL5EbV4pjI0d4mUhNmEgszDkU0VylVnpmMgdjoE0mNYxzAbSlqwrQAG2JgKUwcLQl0H8BupUylz9wcgEAAAAASUVORK5CYII="

/***/ }),

/***/ 25:
/*!*********************************************************************!*\
  !*** /Users/92afa/Desktop/nursing-home/static/images/item-img5.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 26:
/*!*********************************************************************!*\
  !*** /Users/92afa/Desktop/nursing-home/static/images/item-img6.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!****************************************************!*\
  !*** /Users/92afa/Desktop/nursing-home/pages.json ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Stat).call(this));
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 59:
/*!****************************************************************!*\
  !*** /Users/92afa/Desktop/nursing-home/static/images/more.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAQCAYAAAAMJL+VAAAA0ElEQVQ4T7WUQQqDMBAAs+TW4gdyl4X27ndqX1b7He8tBO9+ILQ32bLSiEqsG5LmKsmYGbJgrb0RUa3+sACggb7vD865lojOORkA8CiKogI+tOu60zAMrVLqmAny0lpXZVk+RwAva+2FiJocAACoEfHOZ02ALyS5B3tHxKv/0QUgtYf3box5BwGJPSbvc82LG6T0mHvfBcT2WHsXAaQ9Qt5FAGGPoHcxYO99bHmPAmz1+OU9GrDusec9GrDqofyckYyV4DvY2sjzir/5OSMBfABokYz3uo6VUQAAAABJRU5ErkJggg=="

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@alpha","_id":"@dcloudio/uni-stat@2.0.0-alpha-25120200103005","_inBundle":false,"_integrity":"sha512-nYoIrRV2e5o/vzr6foSdWi3Rl2p0GuO+LPY3JctyY6uTKgPnuH99d7aL/QQdJ1SacQjBWO+QGK1qankN7oyrWw==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@alpha","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"alpha","saveSpec":null,"fetchSpec":"alpha"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-alpha-25120200103005.tgz","_shasum":"a77a63481f36474f3e86686868051219d1bb12df","_spec":"@dcloudio/uni-stat@alpha","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/alpha/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"6be187a3dfe15f95dd6146d9fec08e1f81100987","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-alpha-25120200103005"};

/***/ }),

/***/ 60:
/*!**********************************************************************!*\
  !*** /Users/92afa/Desktop/nursing-home/static/images/back-green.png ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAABoklEQVQ4T42TT0sbURTFz30xn8RJP0EDE92KBUtsaGsVQQQRoRV0IZMECoVCoXnTgkIoRUTElWsRFfwDbpqZduHCZZzoBxChlJKaQHPKJJk0qZOkb3cv58e799x7Bf/xHri5qRpV0rsrz0o/fezrh2nWatsABijY6QkYrp4hsSVABIKqEjXVFRh09CyAzboYqELUC8+0dkMBo2DPUbghgAJQATjhJbJ7fvn3AMOx5wGuoyG+kxqfXw5n94NeO4CYqxcIfAYbYoJPS4nsYbsxLcBw7JcAPzV//QWRlGemj/51sQ4Yrr0IMu+LKShHIupJMW6dhFkuMUcvEViri8EyKeNXQ5nTbvMRw9EfAaw0BTe/RY1cm9ZFV6BeUiH3HiLZpugWURn1HqbPQ0sKkoabewvKGz8m8T0SxaNiPPMttOkgOejo1wK8a8T8wQE1Voqnv4Ta2oIK2hIlGqTv4E9AJb2EdRY6uCAZc+1lkqsN51BWgtSlmTkOXY2/PelXAPLB1JXIs6KZPui93p17VYGoyb4H1L7mfQ+o1VMhN01Rj/0T/QPgXpdgCI5T3AAAAABJRU5ErkJggg=="

/***/ }),

/***/ 61:
/*!********************************************************************!*\
  !*** /Users/92afa/Desktop/nursing-home/static/images/go-green.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAABpUlEQVQ4T4XTTWsTURTG8f+Tin1BRBA/gCbN0oULncSNoBZsKcWlKxERKVLQhTMRBEUQkgwuXFhBRCiF0hcq1aKgCK5sRuInMJNP0uYemUmiVifp3Z77u9xz73PE18eHCmMTSzm57Z9eZZUDlvJRbUXGNWBPudz11rn7K8OMit/Dq87cKsZhg47EjdgLlgchJYVCFM5hbh26CLjZLgVLWSgFKWpUZ0EbwKiBk+lWXPbf/It+g6Qw+a06Y9ImYhRwoNtxyX/9N9oHkkK+Ub0i9BYYQzjBfMsLXvXRf6DbU30Ksy1gHDDQnbjkv0xqmSApFJvhpU7HvZMxkSJpIfb8FwNBgk7t1C5K9l4oRYK7Q8HJKDw9Yu4LcKLXw7OBoPCjfoZd+wwcTzebVeNy5UEmKDZrZzu7fJI4lm6WPYm9yqPMpvPN+nntuY+go+nB8LBdCp5mPmuhEV4Atw0cQTJzFrTLQZj5cZNR7bIztkT3GSXda3n+88xoFKP6tDPb7P8usBB7wWJm+HpJXUtCNyg/+67UH6CDYv2n6d6IytyHVrkydNoS9AsRtZz4vUtlWQAAAABJRU5ErkJggg=="

/***/ }),

/***/ 7:
/*!*********************************************************************!*\
  !*** /Users/92afa/Desktop/nursing-home/pages.json?{"type":"style"} ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/workbench/workbench": { "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#24C789" }, "pages/notice/notice": { "navigationBarTitleText": "公告信息" }, "pages/personal/personal": { "navigationBarTitleText": "个人信息", "navigationBarBackgroundColor": "#FFFFFF" }, "pages/video/video": { "navigationBarTitleText": "视频监控", "navigationBarBackgroundColor": "#FFFFFF" }, "pages/blood-status/blood-status": { "navigationBarTitleText": "血压 血氧 血糖" }, "pages/electrocardiogram/electrocardiogram": { "navigationBarTitleText": "心电图", "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#24C789" }, "pages/heart-rate/heart-rate": { "navigationBarTitleText": "实时心率", "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#24C789" }, "pages/management/management": { "navigationBarTitleText": "客户管理" }, "pages/warning/warning": { "navigationBarTitleText": "报警" }, "pages/login/login": {}, "pages/index/index": { "navigationBarTitleText": "" } }, "globalStyle": { "navigationBarTextStyle": "black", "navigationBarBackgroundColor": "#F8F8F8", "backgroundColor": "#F8F8F8" } };exports.default = _default;

/***/ }),

/***/ 70:
/*!*****************************************************************!*\
  !*** /Users/92afa/Desktop/nursing-home/static/images/back2.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAkCAYAAACNBsqdAAACXElEQVRIS63X3YtNURjH8e8vIpH3vOQl5KWElAulXJgrUyQUMdEkSqZG4oIwypSa0jQXiiIkIcwkSd4vuFAu/R9cECUzflq1znTOnrXP2fucWZdnn+fT2ns9z7OfLcZh2Z4FPAZ6JH0OpFp1bc8F3gIbgZ/ADkkfW4JtzwfeAeuqNvgL2NU0bHsR8B5Yk7jroaZg20sjujKBPgP2l4Ztr4josgQaDrBD0nAp2PYq4AOwOIHeBzoljZTKCttr40EtTKC3gWOS/lWuFdqx7Q0xpeYl0OtAlyRXX2sI294EvAbmJNABSadStVAXtr0ZeAXMTAT3STqbV2C5sO2twAtgeiL4sqRL9ao2CdtuA54DUxPB5yVdadQKxsC2twNDwJRMcDicM5L6G6Fj0s32TuAJMDmBdku6VgStgW3vBR4AkzLBITePS7pZFB2FbR8A7gETM8Ghio5ICtdKLdnuBG4BEzKRw8AhSY9KifHPAQ7PrSsR/A1ok/S1KTgE2b4KnE4A34F2SV/K4qPpZrsXuJAAfsTXzacyeE0e2w4lGpI/m9+/gd2S3hTFUwXSDQwk8D/APkmhIhuuvJI+CtxIZMpf4HCRTKnXhDqAuzm5HZr6ndJNqBJgew/wMKcaT9Yr8SKNvh0YzGlK5yT1pXbeEI55vi220WkJpFdST/b3QnDEtwAvgRkJvF9STYEVhiNe7/0XsuhE5aVaCo54mNPCELggsfPQBUM3HCkNR3x1nDGWJPCnwMGm4Igvj3gYubJrsGk44qmJs7UxtqqIwowcnvn6cRu8q/DZ8VPhYuVT4T+W8cn9slNPQgAAAABJRU5ErkJggg=="

/***/ }),

/***/ 8:
/*!********************************************************************!*\
  !*** /Users/92afa/Desktop/nursing-home/pages.json?{"type":"stat"} ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "" };exports.default = _default;

/***/ }),

/***/ 89:
/*!********************************************************!*\
  !*** /Users/92afa/Desktop/nursing-home/common/city.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var cityObj = [{ 'id': '35', 'provincecode': '150000', 'city': "\u963F\u62C9\u5584\u76DF", 'code': '152900', 'initial': 'A' },
{ 'id': '38', 'provincecode': '210000', 'city': "\u978D\u5C71\u5E02", 'code': '210300', 'initial': 'A' },
{ 'id': '105', 'provincecode': '340000', 'city': "\u5B89\u5E86\u5E02", 'code': '340800', 'initial': 'A' },
{ 'id': '156', 'provincecode': '410000', 'city': "\u5B89\u9633\u5E02", 'code': '410500', 'initial': 'A' },
{ 'id': '256', 'provincecode': '510000', 'city': "\u963F\u575D\u85CF\u65CF\u7F8C\u65CF\u81EA\u6CBB\u5DDE", 'code': '513200', 'initial': 'A' },
{ 'id': '262', 'provincecode': '520000', 'city': "\u5B89\u987A\u5E02", 'code': '520400', 'initial': 'A' },
{ 'id': '289', 'provincecode': '540000', 'city': "\u963F\u91CC\u5730\u533A", 'code': '542500', 'initial': 'A' },
{ 'id': '299', 'provincecode': '610000', 'city': "\u5B89\u5EB7\u5E02", 'code': '610900', 'initial': 'A' },
{ 'id': '335', 'provincecode': '650000', 'city': "\u963F\u514B\u82CF\u5730\u533A", 'code': '652900', 'initial': 'A' },
{ 'id': '341', 'provincecode': '650000', 'city': "\u963F\u52D2\u6CF0\u5730\u533A", 'code': '654300', 'initial': 'A' },
{ 'id': '1', 'provincecode': '110000', 'city': "\u5317\u4EAC\u5E02", 'code': '110000', 'initial': 'B' }, { 'id': '7', 'provincecode': '130000', 'city': "\u4FDD\u5B9A\u5E02", 'code': '130600', 'initial': 'B' }, { 'id': '25', 'provincecode': '150000', 'city': "\u5305\u5934\u5E02", 'code': '150200', 'initial': 'B' }, { 'id': '31', 'provincecode': '150000', 'city': "\u5DF4\u5F66\u6DD6\u5C14\u5E02", 'code': '150800', 'initial': 'B' }, { 'id': '40', 'provincecode': '210000', 'city': "\u672C\u6EAA\u5E02", 'code': '210500', 'initial': 'B' }, { 'id': '55', 'provincecode': '220000', 'city': "\u767D\u5C71\u5E02", 'code': '220600', 'initial': 'B' }, { 'id': '57', 'provincecode': '220000', 'city': "\u767D\u57CE\u5E02", 'code': '220800', 'initial': 'B' }, { 'id': '100', 'provincecode': '340000', 'city': "\u868C\u57E0\u5E02", 'code': '340300', 'initial': 'B' }, { 'id': '150', 'provincecode': '370000', 'city': "\u6EE8\u5DDE\u5E02", 'code': '371600', 'initial': 'B' }, { 'id': '222', 'provincecode': '450000', 'city': "\u5317\u6D77\u5E02", 'code': '450500', 'initial': 'B' }, { 'id': '227', 'provincecode': '450000', 'city': "\u767E\u8272\u5E02", 'code': '451000', 'initial': 'B' }, { 'id': '254', 'provincecode': '510000', 'city': "\u5DF4\u4E2D\u5E02", 'code': '511900', 'initial': 'B' }, { 'id': '265', 'provincecode': '520000', 'city': "\u6BD5\u8282\u5730\u533A", 'code': '522400', 'initial': 'B' }, { 'id': '271', 'provincecode': '530000', 'city': "\u4FDD\u5C71\u5E02", 'code': '530500', 'initial': 'B' }, { 'id': '293', 'provincecode': '610000', 'city': "\u5B9D\u9E21\u5E02", 'code': '610300', 'initial': 'B' }, { 'id': '304', 'provincecode': '620000', 'city': "\u767D\u94F6\u5E02", 'code': '620400', 'initial': 'B' }, { 'id': '333', 'provincecode': '650000', 'city': "\u535A\u5C14\u5854\u62C9\u8499\u53E4\u81EA\u6CBB\u5DDE", 'code': '652700', 'initial': 'B' }, { 'id': '334', 'provincecode': '650000', 'city': "\u5DF4\u97F3\u90ED\u695E\u8499\u53E4\u81EA\u6CBB\u5DDE", 'code': '652800', 'initial': 'B' }, { 'id': '', 'provincecode': '500000', 'city': "\u91CD\u5E86\u5E02", 'code': '500000', 'initial': 'C' }, { 'id': '9', 'provincecode': '130000', 'city': "\u627F\u5FB7\u5E02", 'code': '130800', 'initial': 'C' }, { 'id': '10', 'provincecode': '130000', 'city': "\u6CA7\u5DDE\u5E02", 'code': '130900', 'initial': 'C' }, { 'id': '16', 'provincecode': '140000', 'city': "\u957F\u6CBB\u5E02", 'code': '140400', 'initial': 'C' }, { 'id': '27', 'provincecode': '150000', 'city': "\u8D64\u5CF0\u5E02", 'code': '150400', 'initial': 'C' }, { 'id': '48', 'provincecode': '210000', 'city': "\u671D\u9633\u5E02", 'code': '211300', 'initial': 'C' }, { 'id': '50', 'provincecode': '220000', 'city': "\u957F\u6625\u5E02", 'code': '220100', 'initial': 'C' }, { 'id': '77', 'provincecode': '320000', 'city': "\u5E38\u5DDE\u5E02", 'code': '320400', 'initial': 'C' }, { 'id': '107', 'provincecode': '340000', 'city': "\u6EC1\u5DDE\u5E02", 'code': '341100', 'initial': 'C' }, { 'id': '110', 'provincecode': '340000', 'city': "\u5DE2\u6E56\u5E02", 'code': '341400', 'initial': 'C' }, { 'id': '113', 'provincecode': '340000', 'city': "\u6C60\u5DDE\u5E02", 'code': '341700', 'initial': 'C' }, { 'id': '183', 'provincecode': '430000', 'city': "\u957F\u6C99\u5E02", 'code': '430100', 'initial': 'C' }, { 'id': '189', 'provincecode': '430000', 'city': "\u5E38\u5FB7\u5E02", 'code': '430700', 'initial': 'C' }, { 'id': '192', 'provincecode': '430000', 'city': "\u90F4\u5DDE\u5E02", 'code': '431000', 'initial': 'C' }, { 'id': '215', 'provincecode': '440000', 'city': "\u6F6E\u5DDE\u5E02", 'code': '445100', 'initial': 'C' }, { 'id': '231', 'provincecode': '450000', 'city': "\u5D07\u5DE6\u5E02", 'code': '451400', 'initial': 'C' }, { 'id': '238', 'provincecode': '510000', 'city': "\u6210\u90FD\u5E02", 'code': '510100', 'initial': 'C' }, { 'id': '276', 'provincecode': '530000', 'city': "\u695A\u96C4\u5F5D\u65CF\u81EA\u6CBB\u5DDE", 'code': '532300', 'initial': 'C' }, { 'id': '285', 'provincecode': '540000', 'city': "\u660C\u90FD\u5730\u533A", 'code': '542100', 'initial': 'C' }, { 'id': '332', 'provincecode': '650000', 'city': "\u660C\u5409\u56DE\u65CF\u81EA\u6CBB\u5DDE", 'code': '652300', 'initial': 'C' }, { 'id': '14', 'provincecode': '140000', 'city': "\u5927\u540C\u5E02", 'code': '140200', 'initial': 'D' }, { 'id': '37', 'provincecode': '210000', 'city': "\u5927\u8FDE\u5E02", 'code': '210200', 'initial': 'D' }, { 'id': '41', 'provincecode': '210000', 'city': "\u4E39\u4E1C\u5E02", 'code': '210600', 'initial': 'D' }, { 'id': '64', 'provincecode': '230000', 'city': "\u5927\u5E86\u5E02", 'code': '230600', 'initial': 'D' }, { 'id': '71', 'provincecode': '230000', 'city': "\u5927\u5174\u5B89\u5CAD\u5730\u533A", 'code': '232700', 'initial': 'D' }, { 'id': '139', 'provincecode': '370000', 'city': "\u4E1C\u8425\u5E02", 'code': '370500', 'initial': 'D' }, { 'id': '148', 'provincecode': '370000', 'city': "\u5FB7\u5DDE\u5E02", 'code': '371400', 'initial': 'D' }, { 'id': '213', 'provincecode': '440000', 'city': "\u4E1C\u839E\u5E02", 'code': '441900', 'initial': 'D' }, { 'id': '242', 'provincecode': '510000', 'city': "\u5FB7\u9633\u5E02", 'code': '510600', 'initial': 'D' }, { 'id': '252', 'provincecode': '510000', 'city': "\u8FBE\u5DDE\u5E02", 'code': '511700', 'initial': 'D' }, { 'id': '280', 'provincecode': '530000', 'city': "\u5927\u7406\u767D\u65CF\u81EA\u6CBB\u5DDE", 'code': '532900', 'initial': 'D' }, { 'id': '281', 'provincecode': '530000', 'city': "\u5FB7\u5B8F\u50A3\u65CF\u666F\u9887\u65CF\u81EA\u6CBB\u5DDE", 'code': '533100', 'initial': 'D' }, { 'id': '283', 'provincecode': '530000', 'city': "\u8FEA\u5E86\u85CF\u65CF\u81EA\u6CBB\u5DDE", 'code': '533400', 'initial': 'D' }, { 'id': '311', 'provincecode': '620000', 'city': "\u5B9A\u897F\u5E02", 'code': '621100', 'initial': 'D' }, { 'id': '29', 'provincecode': '150000', 'city': "\u9102\u5C14\u591A\u65AF\u5E02", 'code': '150600', 'initial': 'E' }, { 'id': '174', 'provincecode': '420000', 'city': "\u9102\u5DDE\u5E02", 'code': '420700', 'initial': 'E' }, { 'id': '181', 'provincecode': '420000', 'city': "\u6069\u65BD\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE", 'code': '422800', 'initial': 'E' }, { 'id': '39', 'provincecode': '210000', 'city': "\u629A\u987A\u5E02", 'code': '210400', 'initial': 'F' }, { 'id': '44', 'provincecode': '210000', 'city': "\u961C\u65B0\u5E02", 'code': '210900', 'initial': 'F' }, { 'id': '108', 'provincecode': '340000', 'city': "\u961C\u9633\u5E02", 'code': '341200', 'initial': 'F' }, { 'id': '115', 'provincecode': '350000', 'city': "\u798F\u5DDE\u5E02", 'code': '350100', 'initial': 'F' }, { 'id': '133', 'provincecode': '360000', 'city': "\u629A\u5DDE\u5E02", 'code': '361000', 'initial': 'F' }, { 'id': '202', 'provincecode': '440000', 'city': "\u4F5B\u5C71\u5E02", 'code': '440600', 'initial': 'F' }, { 'id': '223', 'provincecode': '450000', 'city': "\u9632\u57CE\u6E2F\u5E02", 'code': '450600', 'initial': 'F' }, { 'id': '130', 'provincecode': '360000', 'city': "\u8D63\u5DDE\u5E02", 'code': '360700', 'initial': 'G' }, { 'id': '197', 'provincecode': '440000', 'city': "\u5E7F\u5DDE\u5E02", 'code': '440100', 'initial': 'G' }, { 'id': '220', 'provincecode': '450000', 'city': "\u6842\u6797\u5E02", 'code': '450300', 'initial': 'G' }, { 'id': '225', 'provincecode': '450000', 'city': "\u8D35\u6E2F\u5E02", 'code': '450800', 'initial': 'G' }, { 'id': '244', 'provincecode': '510000', 'city': "\u5E7F\u5143\u5E02", 'code': '510800', 'initial': 'G' }, { 'id': '251', 'provincecode': '510000', 'city': "\u5E7F\u5B89\u5E02", 'code': '511600', 'initial': 'G' }, { 'id': '257', 'provincecode': '510000', 'city': "\u7518\u5B5C\u85CF\u65CF\u81EA\u6CBB\u5DDE", 'code': '513300', 'initial': 'G' }, { 'id': '259', 'provincecode': '520000', 'city': "\u8D35\u9633\u5E02", 'code': '520100', 'initial': 'G' }, { 'id': '314', 'provincecode': '620000', 'city': "\u7518\u5357\u85CF\u65CF\u81EA\u6CBB\u5DDE", 'code': '623000', 'initial': 'G' }, { 'id': '320', 'provincecode': '630000', 'city': "\u679C\u6D1B\u85CF\u65CF\u81EA\u6CBB\u5DDE", 'code': '632600', 'initial': 'G' }, { 'id': '326', 'provincecode': '640000', 'city': "\u56FA\u539F\u5E02", 'code': '640400', 'initial': 'G' }, { 'id': '5', 'provincecode': '130000', 'city': "\u90AF\u90F8\u5E02", 'code': '130400', 'initial': 'H' }, { 'id': '12', 'provincecode': '130000', 'city': "\u8861\u6C34\u5E02", 'code': '131100', 'initial': 'H' }, { 'id': '24', 'provincecode': '150000', 'city': "\u547C\u548C\u6D69\u7279\u5E02", 'code': '150100', 'initial': 'H' }, { 'id': '30', 'provincecode': '150000', 'city': "\u547C\u4F26\u8D1D\u5C14\u5E02", 'code': '150700', 'initial': 'H' }, { 'id': '49', 'provincecode': '210000', 'city': "\u846B\u82A6\u5C9B\u5E02", 'code': '211400', 'initial': 'H' }, { 'id': '59', 'provincecode': '230000', 'city': "\u54C8\u5C14\u6EE8\u5E02", 'code': '230100', 'initial': 'H' }, { 'id': '62', 'provincecode': '230000', 'city': "\u9E64\u5C97\u5E02", 'code': '230400', 'initial': 'H' }, { 'id': '69', 'provincecode': '230000', 'city': "\u9ED1\u6CB3\u5E02", 'code': '231100', 'initial': 'H' }, { 'id': '81', 'provincecode': '320000', 'city': "\u6DEE\u5B89\u5E02", 'code': '320800', 'initial': 'H' }, { 'id': '87', 'provincecode': '330000', 'city': "\u676D\u5DDE\u5E02", 'code': '330100', 'initial': 'H' }, { 'id': '91', 'provincecode': '330000', 'city': "\u6E56\u5DDE\u5E02", 'code': '330500', 'initial': 'H' }, { 'id': '98', 'provincecode': '340000', 'city': "\u5408\u80A5\u5E02", 'code': '340100', 'initial': 'H' }, { 'id': '101', 'provincecode': '340000', 'city': "\u6DEE\u5357\u5E02", 'code': '340400', 'initial': 'H' }, { 'id': '103', 'provincecode': '340000', 'city': "\u6DEE\u5317\u5E02", 'code': '340600', 'initial': 'H' }, { 'id': '106', 'provincecode': '340000', 'city': "\u9EC4\u5C71\u5E02", 'code': '341000', 'initial': 'H' }, { 'id': '112', 'provincecode': '340000', 'city': "\u4EB3\u5DDE\u5E02", 'code': '341600', 'initial': 'H' }, { 'id': '151', 'provincecode': '370000', 'city': "\u8377\u6CFD\u5E02", 'code': '371700', 'initial': 'H' }, { 'id': '157', 'provincecode': '410000', 'city': "\u9E64\u58C1\u5E02", 'code': '410600', 'initial': 'H' }, { 'id': '170', 'provincecode': '420000', 'city': "\u9EC4\u77F3\u5E02", 'code': '420200', 'initial': 'H' }, { 'id': '178', 'provincecode': '420000', 'city': "\u9EC4\u5188\u5E02", 'code': '421100', 'initial': 'H' }, { 'id': '186', 'provincecode': '430000', 'city': "\u8861\u9633\u5E02", 'code': '430400', 'initial': 'H' }, { 'id': '194', 'provincecode': '430000', 'city': "\u6000\u5316\u5E02", 'code': '431200', 'initial': 'H' }, { 'id': '207', 'provincecode': '440000', 'city': "\u60E0\u5DDE\u5E02", 'code': '441300', 'initial': 'H' }, { 'id': '210', 'provincecode': '440000', 'city': "\u6CB3\u6E90\u5E02", 'code': '441600', 'initial': 'H' }, { 'id': '228', 'provincecode': '450000', 'city': "\u8D3A\u5DDE\u5E02", 'code': '451100', 'initial': 'H' }, { 'id': '229', 'provincecode': '450000', 'city': "\u6CB3\u6C60\u5E02", 'code': '451200', 'initial': 'H' }, { 'id': '232', 'provincecode': '460000', 'city': "\u6D77\u53E3\u5E02", 'code': '460100', 'initial': 'H' }, { 'id': '277', 'provincecode': '530000', 'city': "\u7EA2\u6CB3\u54C8\u5C3C\u65CF\u5F5D\u65CF\u81EA\u6CBB\u5DDE", 'code': '532500', 'initial': 'H' }, { 'id': '297', 'provincecode': '610000', 'city': "\u6C49\u4E2D\u5E02", 'code': '610700', 'initial': 'H' }, { 'id': '316', 'provincecode': '630000', 'city': "\u6D77\u4E1C\u5730\u533A", 'code': '632100', 'initial': 'H' }, { 'id': '317', 'provincecode': '630000', 'city': "\u6D77\u5317\u85CF\u65CF\u81EA\u6CBB\u5DDE", 'code': '632200', 'initial': 'H' }, { 'id': '318', 'provincecode': '630000', 'city': "\u9EC4\u5357\u85CF\u65CF\u81EA\u6CBB\u5DDE", 'code': '632300', 'initial': 'H' }, { 'id': '319', 'provincecode': '630000', 'city': "\u6D77\u5357\u85CF\u65CF\u81EA\u6CBB\u5DDE", 'code': '632500', 'initial': 'H' }, { 'id': '322', 'provincecode': '630000', 'city': "\u6D77\u897F\u8499\u53E4\u65CF\u85CF\u65CF\u81EA\u6CBB\u5DDE", 'code': '632800', 'initial': 'H' }, { 'id': '331', 'provincecode': '650000', 'city': "\u54C8\u5BC6\u5730\u533A", 'code': '652200', 'initial': 'H' }, { 'id': '338', 'provincecode': '650000', 'city': "\u548C\u7530\u5730\u533A", 'code': '653200', 'initial': 'H' }, { 'id': '17', 'provincecode': '140000', 'city': "\u664B\u57CE\u5E02", 'code': '140500', 'initial': 'J' }, { 'id': '19', 'provincecode': '140000', 'city': "\u664B\u4E2D\u5E02", 'code': '140700', 'initial': 'J' }, { 'id': '42', 'provincecode': '210000', 'city': "\u9526\u5DDE\u5E02", 'code': '210700', 'initial': 'J' }, { 'id': '51', 'provincecode': '220000', 'city': "\u5409\u6797\u5E02", 'code': '220200', 'initial': 'J' }, { 'id': '61', 'provincecode': '230000', 'city': "\u9E21\u897F\u5E02", 'code': '230300', 'initial': 'J' }, { 'id': '66', 'provincecode': '230000', 'city': "\u4F73\u6728\u65AF\u5E02", 'code': '230800', 'initial': 'J' }, { 'id': '90', 'provincecode': '330000', 'city': "\u5609\u5174\u5E02", 'code': '330400', 'initial': 'J' }, { 'id': '93', 'provincecode': '330000', 'city': "\u91D1\u534E\u5E02", 'code': '330700', 'initial': 'J' }, { 'id': '125', 'provincecode': '360000', 'city': "\u666F\u5FB7\u9547\u5E02", 'code': '360200', 'initial': 'J' }, { 'id': '127', 'provincecode': '360000', 'city': "\u4E5D\u6C5F\u5E02", 'code': '360400', 'initial': 'J' }, { 'id': '131', 'provincecode': '360000', 'city': "\u5409\u5B89\u5E02", 'code': '360800', 'initial': 'J' }, { 'id': '135', 'provincecode': '370000', 'city': "\u6D4E\u5357\u5E02", 'code': '370100', 'initial': 'J' }, { 'id': '142', 'provincecode': '370000', 'city': "\u6D4E\u5B81\u5E02", 'code': '370800', 'initial': 'J' }, { 'id': '159', 'provincecode': '410000', 'city': "\u7126\u4F5C\u5E02", 'code': '410800', 'initial': 'J' }, { 'id': '175', 'provincecode': '420000', 'city': "\u8346\u95E8\u5E02", 'code': '420800', 'initial': 'J' }, { 'id': '177', 'provincecode': '420000', 'city': "\u8346\u5DDE\u5E02", 'code': '421000', 'initial': 'J' }, { 'id': '203', 'provincecode': '440000', 'city': "\u6C5F\u95E8\u5E02", 'code': '440700', 'initial': 'J' }, { 'id': '216', 'provincecode': '440000', 'city': "\u63ED\u9633\u5E02", 'code': '445200', 'initial': 'J' }, { 'id': '302', 'provincecode': '620000', 'city': "\u5609\u5CEA\u5173\u5E02", 'code': '620200', 'initial': 'J' }, { 'id': '303', 'provincecode': '620000', 'city': "\u91D1\u660C\u5E02", 'code': '620300', 'initial': 'J' }, { 'id': '309', 'provincecode': '620000', 'city': "\u9152\u6CC9\u5E02", 'code': '620900', 'initial': 'J' }, { 'id': '153', 'provincecode': '410000', 'city': "\u5F00\u5C01\u5E02", 'code': '410200', 'initial': 'K' }, { 'id': '268', 'provincecode': '530000', 'city': "\u6606\u660E\u5E02", 'code': '530100', 'initial': 'K' }, { 'id': '329', 'provincecode': '650000', 'city': "\u514B\u62C9\u739B\u4F9D\u5E02", 'code': '650200', 'initial': 'K' }, { 'id': '336', 'provincecode': '650000', 'city': "\u514B\u5B5C\u52D2\u82CF\u67EF\u5C14\u514B\u5B5C\u81EA\u6CBB\u5DDE", 'code': '653000', 'initial': 'K' }, { 'id': '337', 'provincecode': '650000', 'city': "\u5580\u4EC0\u5730\u533A", 'code': '653100', 'initial': 'K' }, { 'id': '11', 'provincecode': '130000', 'city': "\u5ECA\u574A\u5E02", 'code': '131000', 'initial': 'L' }, { 'id': '22', 'provincecode': '140000', 'city': "\u4E34\u6C7E\u5E02", 'code': '141000', 'initial': 'L' }, { 'id': '23', 'provincecode': '140000', 'city': "\u5415\u6881\u5E02", 'code': '141100', 'initial': 'L' }, { 'id': '45', 'provincecode': '210000', 'city': "\u8FBD\u9633\u5E02", 'code': '211000', 'initial': 'L' }, { 'id': '53', 'provincecode': '220000', 'city': "\u8FBD\u6E90\u5E02", 'code': '220400', 'initial': 'L' }, { 'id': '80', 'provincecode': '320000', 'city': "\u8FDE\u4E91\u6E2F\u5E02", 'code': '320700', 'initial': 'L' }, { 'id': '97', 'provincecode': '330000', 'city': "\u4E3D\u6C34\u5E02", 'code': '331100', 'initial': 'L' }, { 'id': '111', 'provincecode': '340000', 'city': "\u516D\u5B89\u5E02", 'code': '341500', 'initial': 'L' }, { 'id': '122', 'provincecode': '350000', 'city': "\u9F99\u5CA9\u5E02", 'code': '350800', 'initial': 'L' }, { 'id': '146', 'provincecode': '370000', 'city': "\u83B1\u829C\u5E02", 'code': '371200', 'initial': 'L' }, { 'id': '147', 'provincecode': '370000', 'city': "\u4E34\u6C82\u5E02", 'code': '371300', 'initial': 'L' }, { 'id': '149', 'provincecode': '370000', 'city': "\u804A\u57CE\u5E02", 'code': '371500', 'initial': 'L' }, { 'id': '154', 'provincecode': '410000', 'city': "\u6D1B\u9633\u5E02", 'code': '410300', 'initial': 'L' }, { 'id': '162', 'provincecode': '410000', 'city': "\u6F2F\u6CB3\u5E02", 'code': '411100', 'initial': 'L' }, { 'id': '195', 'provincecode': '430000', 'city': "\u5A04\u5E95\u5E02", 'code': '431300', 'initial': 'L' }, { 'id': '219', 'provincecode': '450000', 'city': "\u67F3\u5DDE\u5E02", 'code': '450200', 'initial': 'L' }, { 'id': '230', 'provincecode': '450000', 'city': "\u6765\u5BBE\u5E02", 'code': '451300', 'initial': 'L' }, { 'id': '241', 'provincecode': '510000', 'city': "\u6CF8\u5DDE\u5E02", 'code': '510500', 'initial': 'L' }, { 'id': '247', 'provincecode': '510000', 'city': "\u4E50\u5C71\u5E02", 'code': '511100', 'initial': 'L' }, { 'id': '258', 'provincecode': '510000', 'city': "\u51C9\u5C71\u5F5D\u65CF\u81EA\u6CBB\u5DDE", 'code': '513400', 'initial': 'L' }, { 'id': '260', 'provincecode': '520000', 'city': "\u516D\u76D8\u6C34\u5E02", 'code': '520200', 'initial': 'L' }, { 'id': '273', 'provincecode': '530000', 'city': "\u4E3D\u6C5F\u5E02", 'code': '530700', 'initial': 'L' }, { 'id': '275', 'provincecode': '530000', 'city': "\u4E34\u6CA7\u5E02", 'code': '530900', 'initial': 'L' }, { 'id': '284', 'provincecode': '540000', 'city': "\u62C9\u8428\u5E02", 'code': '540100', 'initial': 'L' }, { 'id': '290', 'provincecode': '540000', 'city': "\u6797\u829D\u5730\u533A", 'code': '542600', 'initial': 'L' }, { 'id': '301', 'provincecode': '620000', 'city': "\u5170\u5DDE\u5E02", 'code': '620100', 'initial': 'L' }, { 'id': '312', 'provincecode': '620000', 'city': "\u9647\u5357\u5E02", 'code': '621200', 'initial': 'L' }, { 'id': '313', 'provincecode': '620000', 'city': "\u4E34\u590F\u56DE\u65CF\u81EA\u6CBB\u5DDE", 'code': '622900', 'initial': 'L' }, { 'id': '68', 'provincecode': '230000', 'city': "\u7261\u4E39\u6C5F\u5E02", 'code': '231000', 'initial': 'M' }, { 'id': '102', 'provincecode': '340000', 'city': "\u9A6C\u978D\u5C71\u5E02", 'code': '340500', 'initial': 'M' }, { 'id': '205', 'provincecode': '440000', 'city': "\u8302\u540D\u5E02", 'code': '440900', 'initial': 'M' }, { 'id': '208', 'provincecode': '440000', 'city': "\u6885\u5DDE\u5E02", 'code': '441400', 'initial': 'M' }, { 'id': '243', 'provincecode': '510000', 'city': "\u7EF5\u9633\u5E02", 'code': '510700', 'initial': 'M' }, { 'id': '249', 'provincecode': '510000', 'city': "\u7709\u5C71\u5E02", 'code': '511400', 'initial': 'M' }, { 'id': '74', 'provincecode': '320000', 'city': "\u5357\u4EAC\u5E02", 'code': '320100', 'initial': 'N' }, { 'id': '79', 'provincecode': '320000', 'city': "\u5357\u901A\u5E02", 'code': '320600', 'initial': 'N' }, { 'id': '88', 'provincecode': '330000', 'city': "\u5B81\u6CE2\u5E02", 'code': '330200', 'initial': 'N' }, { 'id': '121', 'provincecode': '350000', 'city': "\u5357\u5E73\u5E02", 'code': '350700', 'initial': 'N' }, { 'id': '123', 'provincecode': '350000', 'city': "\u5B81\u5FB7\u5E02", 'code': '350900', 'initial': 'N' }, { 'id': '124', 'provincecode': '360000', 'city': "\u5357\u660C\u5E02", 'code': '360100', 'initial': 'N' }, { 'id': '164', 'provincecode': '410000', 'city': "\u5357\u9633\u5E02", 'code': '411300', 'initial': 'N' }, { 'id': '218', 'provincecode': '450000', 'city': "\u5357\u5B81\u5E02", 'code': '450100', 'initial': 'N' }, { 'id': '246', 'provincecode': '510000', 'city': "\u5185\u6C5F\u5E02", 'code': '511000', 'initial': 'N' }, { 'id': '248', 'provincecode': '510000', 'city': "\u5357\u5145\u5E02", 'code': '511300', 'initial': 'N' }, { 'id': '282', 'provincecode': '530000', 'city': "\u6012\u6C5F\u5088\u50F3\u65CF\u81EA\u6CBB\u5DDE", 'code': '533300', 'initial': 'N' }, { 'id': '288', 'provincecode': '540000', 'city': "\u90A3\u66F2\u5730\u533A", 'code': '542400', 'initial': 'N' }, { 'id': '46', 'provincecode': '210000', 'city': "\u76D8\u9526\u5E02", 'code': '211100', 'initial': 'P' }, { 'id': '117', 'provincecode': '350000', 'city': "\u8386\u7530\u5E02", 'code': '350300', 'initial': 'P' }, { 'id': '126', 'provincecode': '360000', 'city': "\u840D\u4E61\u5E02", 'code': '360300', 'initial': 'P' }, { 'id': '155', 'provincecode': '410000', 'city': "\u5E73\u9876\u5C71\u5E02", 'code': '410400', 'initial': 'P' }, { 'id': '160', 'provincecode': '410000', 'city': "\u6FEE\u9633\u5E02", 'code': '410900', 'initial': 'P' }, { 'id': '240', 'provincecode': '510000', 'city': "\u6500\u679D\u82B1\u5E02", 'code': '510400', 'initial': 'P' }, { 'id': '308', 'provincecode': '620000', 'city': "\u5E73\u51C9\u5E02", 'code': '620800', 'initial': 'P' }, { 'id': '4', 'provincecode': '130000', 'city': "\u79E6\u7687\u5C9B\u5E02", 'code': '130300', 'initial': 'Q' }, { 'id': '60', 'provincecode': '230000', 'city': "\u9F50\u9F50\u54C8\u5C14\u5E02", 'code': '230200', 'initial': 'Q' }, { 'id': '67', 'provincecode': '230000', 'city': "\u4E03\u53F0\u6CB3\u5E02", 'code': '230900', 'initial': 'Q' }, { 'id': '94', 'provincecode': '330000', 'city': "\u8862\u5DDE\u5E02", 'code': '330800', 'initial': 'Q' }, { 'id': '119', 'provincecode': '350000', 'city': "\u6CC9\u5DDE\u5E02", 'code': '350500', 'initial': 'Q' }, { 'id': '136', 'provincecode': '370000', 'city': "\u9752\u5C9B\u5E02", 'code': '370200', 'initial': 'Q' }, { 'id': '212', 'provincecode': '440000', 'city': "\u6E05\u8FDC\u5E02", 'code': '441800', 'initial': 'Q' }, { 'id': '224', 'provincecode': '450000', 'city': "\u94A6\u5DDE\u5E02", 'code': '450700', 'initial': 'Q' }, { 'id': '264', 'provincecode': '520000', 'city': "\u9ED4\u897F\u5357\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE", 'code': '522300', 'initial': 'Q' }, { 'id': '266', 'provincecode': '520000', 'city': "\u9ED4\u4E1C\u5357\u82D7\u65CF\u4F97\u65CF\u81EA\u6CBB\u5DDE", 'code': '522600', 'initial': 'Q' }, { 'id': '267', 'provincecode': '520000', 'city': "\u9ED4\u5357\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE", 'code': '522700', 'initial': 'Q' }, { 'id': '269', 'provincecode': '530000', 'city': "\u66F2\u9756\u5E02", 'code': '530300', 'initial': 'Q' }, { 'id': '310', 'provincecode': '620000', 'city': "\u5E86\u9633\u5E02", 'code': '621000', 'initial': 'Q' }, { 'id': '145', 'provincecode': '370000', 'city': "\u65E5\u7167\u5E02", 'code': '371100', 'initial': 'R' }, { 'id': '287', 'provincecode': '540000', 'city': "\u65E5\u5580\u5219\u5730\u533A", 'code': '542300', 'initial': 'R' }, { 'id': '2', 'provincecode': '130000', 'city': "\u77F3\u5BB6\u5E84\u5E02", 'code': '130100', 'initial': 'S' }, { 'id': '', 'provincecode': '310000', 'city': "\u4E0A\u6D77\u5E02", 'code': '310000', 'initial': 'S' }, { 'id': '18', 'provincecode': '140000', 'city': "\u6714\u5DDE\u5E02", 'code': '140600', 'initial': 'S' }, { 'id': '36', 'provincecode': '210000', 'city': "\u6C88\u9633\u5E02", 'code': '210100', 'initial': 'S' }, { 'id': '52', 'provincecode': '220000', 'city': "\u56DB\u5E73\u5E02", 'code': '220300', 'initial': 'S' }, { 'id': '56', 'provincecode': '220000', 'city': "\u677E\u539F\u5E02", 'code': '220700', 'initial': 'S' }, { 'id': '63', 'provincecode': '230000', 'city': "\u53CC\u9E2D\u5C71\u5E02", 'code': '230500', 'initial': 'S' }, { 'id': '70', 'provincecode': '230000', 'city': "\u7EE5\u5316\u5E02", 'code': '231200', 'initial': 'S' }, { 'id': '78', 'provincecode': '320000', 'city': "\u82CF\u5DDE\u5E02", 'code': '320500', 'initial': 'S' }, { 'id': '86', 'provincecode': '320000', 'city': "\u5BBF\u8FC1\u5E02", 'code': '321300', 'initial': 'S' }, { 'id': '92', 'provincecode': '330000', 'city': "\u7ECD\u5174\u5E02", 'code': '330600', 'initial': 'S' }, { 'id': '109', 'provincecode': '340000', 'city': "\u5BBF\u5DDE\u5E02", 'code': '341300', 'initial': 'S' }, { 'id': '118', 'provincecode': '350000', 'city': "\u4E09\u660E\u5E02", 'code': '350400', 'initial': 'S' }, { 'id': '134', 'provincecode': '360000', 'city': "\u4E0A\u9976\u5E02", 'code': '361100', 'initial': 'S' }, { 'id': '163', 'provincecode': '410000', 'city': "\u4E09\u95E8\u5CE1\u5E02", 'code': '411200', 'initial': 'S' }, { 'id': '165', 'provincecode': '410000', 'city': "\u5546\u4E18\u5E02", 'code': '411400', 'initial': 'S' }, { 'id': '171', 'provincecode': '420000', 'city': "\u5341\u5830\u5E02", 'code': '420300', 'initial': 'S' }, { 'id': '180', 'provincecode': '420000', 'city': "\u968F\u5DDE\u5E02", 'code': '421300', 'initial': 'S' }, { 'id': '187', 'provincecode': '430000', 'city': "\u90B5\u9633\u5E02", 'code': '430500', 'initial': 'S' }, { 'id': '198', 'provincecode': '440000', 'city': "\u97F6\u5173\u5E02", 'code': '440200', 'initial': 'S' }, { 'id': '199', 'provincecode': '440000', 'city': "\u6DF1\u5733\u5E02", 'code': '440300', 'initial': 'S' }, { 'id': '201', 'provincecode': '440000', 'city': "\u6C55\u5934\u5E02", 'code': '440500', 'initial': 'S' }, { 'id': '209', 'provincecode': '440000', 'city': "\u6C55\u5C3E\u5E02", 'code': '441500', 'initial': 'S' }, { 'id': '233', 'provincecode': '460000', 'city': "\u4E09\u4E9A\u5E02", 'code': '460200', 'initial': 'S' }, { 'id': '245', 'provincecode': '510000', 'city': "\u9042\u5B81\u5E02", 'code': '510900', 'initial': 'S' }, { 'id': '274', 'provincecode': '530000', 'city': "\u666E\u6D31\u5E02", 'code': '530800', 'initial': 'P' }, { 'id': '286', 'provincecode': '540000', 'city': "\u5C71\u5357\u5730\u533A", 'code': '542200', 'initial': 'S' }, { 'id': '300', 'provincecode': '610000', 'city': "\u5546\u6D1B\u5E02", 'code': '611000', 'initial': 'S' }, { 'id': '324', 'provincecode': '640000', 'city': "\u77F3\u5634\u5C71\u5E02", 'code': '640200', 'initial': 'S' }, { 'id': '3', 'provincecode': '130000', 'city': "\u5510\u5C71\u5E02", 'code': '130200', 'initial': 'T' }, { 'id': '13', 'provincecode': '140000', 'city': "\u592A\u539F\u5E02", 'code': '140100', 'initial': 'T' }, { 'id': '28', 'provincecode': '150000', 'city': "\u901A\u8FBD\u5E02", 'code': '150500', 'initial': 'T' }, { 'id': '47', 'provincecode': '210000', 'city': "\u94C1\u5CAD\u5E02", 'code': '211200', 'initial': 'T' }, { 'id': '54', 'provincecode': '220000', 'city': "\u901A\u5316\u5E02", 'code': '220500', 'initial': 'T' }, { 'id': '85', 'provincecode': '320000', 'city': "\u6CF0\u5DDE\u5E02", 'code': '321200', 'initial': 'T' }, { 'id': '96', 'provincecode': '330000', 'city': "\u53F0\u5DDE\u5E02", 'code': '331000', 'initial': 'T' }, { 'id': '104', 'provincecode': '340000', 'city': "\u94DC\u9675\u5E02", 'code': '340700', 'initial': 'T' }, { 'id': '143', 'provincecode': '370000', 'city': "\u6CF0\u5B89\u5E02", 'code': '370900', 'initial': 'T' }, { 'id': '263', 'provincecode': '520000', 'city': "\u94DC\u4EC1\u5730\u533A", 'code': '522200', 'initial': 'T' }, { 'id': '292', 'provincecode': '610000', 'city': "\u94DC\u5DDD\u5E02", 'code': '610200', 'initial': 'T' }, { 'id': '305', 'provincecode': '620000', 'city': "\u5929\u6C34\u5E02", 'code': '620500', 'initial': 'T' }, { 'id': '330', 'provincecode': '650000', 'city': "\u5410\u9C81\u756A\u5730\u533A", 'code': '652100', 'initial': 'T' }, { 'id': '340', 'provincecode': '650000', 'city': "\u5854\u57CE\u5730\u533A", 'code': '654200', 'initial': 'T' }, { 'id': '343', 'provincecode': '120000', 'city': "\u5929\u6D25\u5E02", 'code': '120000', 'initial': 'T' }, { 'id': '26', 'provincecode': '150000', 'city': "\u4E4C\u6D77\u5E02", 'code': '150300', 'initial': 'W' }, { 'id': '32', 'provincecode': '150000', 'city': "\u4E4C\u5170\u5BDF\u5E03\u5E02", 'code': '150900', 'initial': 'W' }, { 'id': '75', 'provincecode': '320000', 'city': "\u65E0\u9521\u5E02", 'code': '320200', 'initial': 'W' }, { 'id': '89', 'provincecode': '330000', 'city': "\u6E29\u5DDE\u5E02", 'code': '330300', 'initial': 'W' }, { 'id': '99', 'provincecode': '340000', 'city': "\u829C\u6E56\u5E02", 'code': '340200', 'initial': 'W' }, { 'id': '141', 'provincecode': '370000', 'city': "\u6F4D\u574A\u5E02", 'code': '370700', 'initial': 'W' }, { 'id': '144', 'provincecode': '370000', 'city': "\u5A01\u6D77\u5E02", 'code': '371000', 'initial': 'W' }, { 'id': '169', 'provincecode': '420000', 'city': "\u6B66\u6C49\u5E02", 'code': '420100', 'initial': 'W' }, { 'id': '221', 'provincecode': '450000', 'city': "\u68A7\u5DDE\u5E02", 'code': '450400', 'initial': 'W' }, { 'id': '278', 'provincecode': '530000', 'city': "\u6587\u5C71\u58EE\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE", 'code': '532600', 'initial': 'W' }, { 'id': '295', 'provincecode': '610000', 'city': "\u6E2D\u5357\u5E02", 'code': '610500', 'initial': 'W' }, { 'id': '306', 'provincecode': '620000', 'city': "\u6B66\u5A01\u5E02", 'code': '620600', 'initial': 'W' }, { 'id': '325', 'provincecode': '640000', 'city': "\u5434\u5FE0\u5E02", 'code': '640300', 'initial': 'W' }, { 'id': '328', 'provincecode': '650000', 'city': "\u4E4C\u9C81\u6728\u9F50\u5E02", 'code': '650100', 'initial': 'W' }, { 'id': '6', 'provincecode': '130000', 'city': "\u90A2\u53F0\u5E02", 'code': '130500', 'initial': 'X' }, { 'id': '21', 'provincecode': '140000', 'city': "\u5FFB\u5DDE\u5E02", 'code': '140900', 'initial': 'X' }, { 'id': '33', 'provincecode': '150000', 'city': "\u5174\u5B89\u76DF", 'code': '152200', 'initial': 'X' }, { 'id': '34', 'provincecode': '150000', 'city': "\u9521\u6797\u90ED\u52D2\u76DF", 'code': '152500', 'initial': 'X' }, { 'id': '76', 'provincecode': '320000', 'city': "\u5F90\u5DDE\u5E02", 'code': '320300', 'initial': 'X' }, { 'id': '114', 'provincecode': '340000', 'city': "\u5BA3\u57CE\u5E02", 'code': '341800', 'initial': 'X' }, { 'id': '116', 'provincecode': '350000', 'city': "\u53A6\u95E8\u5E02", 'code': '350200', 'initial': 'X' }, { 'id': '128', 'provincecode': '360000', 'city': "\u65B0\u4F59\u5E02", 'code': '360500', 'initial': 'X' }, { 'id': '158', 'provincecode': '410000', 'city': "\u65B0\u4E61\u5E02", 'code': '410700', 'initial': 'X' }, { 'id': '161', 'provincecode': '410000', 'city': "\u8BB8\u660C\u5E02", 'code': '411000', 'initial': 'X' }, { 'id': '166', 'provincecode': '410000', 'city': "\u4FE1\u9633\u5E02", 'code': '411500', 'initial': 'X' }, { 'id': '173', 'provincecode': '420000', 'city': "\u8944\u6A0A\u5E02", 'code': '420600', 'initial': 'X' }, { 'id': '176', 'provincecode': '420000', 'city': "\u5B5D\u611F\u5E02", 'code': '420900', 'initial': 'X' }, { 'id': '179', 'provincecode': '420000', 'city': "\u54B8\u5B81\u5E02", 'code': '421200', 'initial': 'X' }, { 'id': '185', 'provincecode': '430000', 'city': "\u6E58\u6F6D\u5E02", 'code': '430300', 'initial': 'X' }, { 'id': '196', 'provincecode': '430000', 'city': "\u6E58\u897F\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE", 'code': '433100', 'initial': 'X' }, { 'id': '279', 'provincecode': '530000', 'city': "\u897F\u53CC\u7248\u7EB3\u50A3\u65CF\u81EA\u6CBB\u5DDE", 'code': '532800', 'initial': 'X' }, { 'id': '291', 'provincecode': '610000', 'city': "\u897F\u5B89\u5E02", 'code': '610100', 'initial': 'X' }, { 'id': '294', 'provincecode': '610000', 'city': "\u54B8\u9633\u5E02", 'code': '610400', 'initial': 'X' }, { 'id': '315', 'provincecode': '630000', 'city': "\u897F\u5B81\u5E02", 'code': '630100', 'initial': 'X' }, { 'id': '15', 'provincecode': '140000', 'city': "\u9633\u6CC9\u5E02", 'code': '140300', 'initial': 'Y' }, { 'id': '20', 'provincecode': '140000', 'city': "\u8FD0\u57CE\u5E02", 'code': '140800', 'initial': 'Y' }, { 'id': '43', 'provincecode': '210000', 'city': "\u8425\u53E3\u5E02", 'code': '210800', 'initial': 'Y' }, { 'id': '58', 'provincecode': '220000', 'city': "\u5EF6\u8FB9\u671D\u9C9C\u65CF\u81EA\u6CBB\u5DDE", 'code': '222400', 'initial': 'Y' }, { 'id': '65', 'provincecode': '230000', 'city': "\u4F0A\u6625\u5E02", 'code': '230700', 'initial': 'Y' }, { 'id': '82', 'provincecode': '320000', 'city': "\u76D0\u57CE\u5E02", 'code': '320900', 'initial': 'Y' }, { 'id': '83', 'provincecode': '320000', 'city': "\u626C\u5DDE\u5E02", 'code': '321000', 'initial': 'Y' }, { 'id': '129', 'provincecode': '360000', 'city': "\u9E70\u6F6D\u5E02", 'code': '360600', 'initial': 'Y' }, { 'id': '132', 'provincecode': '360000', 'city': "\u5B9C\u6625\u5E02", 'code': '360900', 'initial': 'Y' }, { 'id': '140', 'provincecode': '370000', 'city': "\u70DF\u53F0\u5E02", 'code': '370600', 'initial': 'Y' }, { 'id': '172', 'provincecode': '420000', 'city': "\u5B9C\u660C\u5E02", 'code': '420500', 'initial': 'Y' }, { 'id': '188', 'provincecode': '430000', 'city': "\u5CB3\u9633\u5E02", 'code': '430600', 'initial': 'Y' }, { 'id': '191', 'provincecode': '430000', 'city': "\u76CA\u9633\u5E02", 'code': '430900', 'initial': 'Y' }, { 'id': '193', 'provincecode': '430000', 'city': "\u6C38\u5DDE\u5E02", 'code': '431100', 'initial': 'Y' }, { 'id': '211', 'provincecode': '440000', 'city': "\u9633\u6C5F\u5E02", 'code': '441700', 'initial': 'Y' }, { 'id': '217', 'provincecode': '440000', 'city': "\u4E91\u6D6E\u5E02", 'code': '445300', 'initial': 'Y' }, { 'id': '226', 'provincecode': '450000', 'city': "\u7389\u6797\u5E02", 'code': '450900', 'initial': 'Y' }, { 'id': '250', 'provincecode': '510000', 'city': "\u5B9C\u5BBE\u5E02", 'code': '511500', 'initial': 'Y' }, { 'id': '253', 'provincecode': '510000', 'city': "\u96C5\u5B89\u5E02", 'code': '511800', 'initial': 'Y' }, { 'id': '270', 'provincecode': '530000', 'city': "\u7389\u6EAA\u5E02", 'code': '530400', 'initial': 'Y' }, { 'id': '296', 'provincecode': '610000', 'city': "\u5EF6\u5B89\u5E02", 'code': '610600', 'initial': 'Y' }, { 'id': '298', 'provincecode': '610000', 'city': "\u6986\u6797\u5E02", 'code': '610800', 'initial': 'Y' }, { 'id': '321', 'provincecode': '630000', 'city': "\u7389\u6811\u85CF\u65CF\u81EA\u6CBB\u5DDE", 'code': '632700', 'initial': 'Y' }, { 'id': '323', 'provincecode': '640000', 'city': "\u94F6\u5DDD\u5E02", 'code': '640100', 'initial': 'Y' }, { 'id': '339', 'provincecode': '650000', 'city': "\u4F0A\u7281\u54C8\u8428\u514B\u81EA\u6CBB\u5DDE", 'code': '654000', 'initial': 'Y' }, { 'id': '8', 'provincecode': '130000', 'city': "\u5F20\u5BB6\u53E3\u5E02", 'code': '130700', 'initial': 'Z' }, { 'id': '84', 'provincecode': '320000', 'city': "\u9547\u6C5F\u5E02", 'code': '321100', 'initial': 'Z' }, { 'id': '95', 'provincecode': '330000', 'city': "\u821F\u5C71\u5E02", 'code': '330900', 'initial': 'Z' }, { 'id': '120', 'provincecode': '350000', 'city': "\u6F33\u5DDE\u5E02", 'code': '350600', 'initial': 'Z' }, { 'id': '137', 'provincecode': '370000', 'city': "\u6DC4\u535A\u5E02", 'code': '370300', 'initial': 'Z' }, { 'id': '138', 'provincecode': '370000', 'city': "\u67A3\u5E84\u5E02", 'code': '370400', 'initial': 'Z' }, { 'id': '152', 'provincecode': '410000', 'city': "\u90D1\u5DDE\u5E02", 'code': '410100', 'initial': 'Z' }, { 'id': '167', 'provincecode': '410000', 'city': "\u5468\u53E3\u5E02", 'code': '411600', 'initial': 'Z' }, { 'id': '168', 'provincecode': '410000', 'city': "\u9A7B\u9A6C\u5E97\u5E02", 'code': '411700', 'initial': 'Z' }, { 'id': '184', 'provincecode': '430000', 'city': "\u682A\u6D32\u5E02", 'code': '430200', 'initial': 'Z' }, { 'id': '190', 'provincecode': '430000', 'city': "\u5F20\u5BB6\u754C\u5E02", 'code': '430800', 'initial': 'Z' }, { 'id': '200', 'provincecode': '440000', 'city': "\u73E0\u6D77\u5E02", 'code': '440400', 'initial': 'Z' }, { 'id': '204', 'provincecode': '440000', 'city': "\u6E5B\u6C5F\u5E02", 'code': '440800', 'initial': 'Z' }, { 'id': '206', 'provincecode': '440000', 'city': "\u8087\u5E86\u5E02", 'code': '441200', 'initial': 'Z' }, { 'id': '214', 'provincecode': '440000', 'city': "\u4E2D\u5C71\u5E02", 'code': '442000', 'initial': 'Z' }, { 'id': '239', 'provincecode': '510000', 'city': "\u81EA\u8D21\u5E02", 'code': '510300', 'initial': 'Z' }, { 'id': '255', 'provincecode': '510000', 'city': "\u8D44\u9633\u5E02", 'code': '512000', 'initial': 'Z' }, { 'id': '261', 'provincecode': '520000', 'city': "\u9075\u4E49\u5E02", 'code': '520300', 'initial': 'Z' }, { 'id': '272', 'provincecode': '530000', 'city': "\u662D\u901A\u5E02", 'code': '530600', 'initial': 'Z' }, { 'id': '307', 'provincecode': '620000', 'city': "\u5F20\u6396\u5E02", 'code': '620700', 'initial': 'Z' }, { 'id': '327', 'provincecode': '640000', 'city': "\u4E2D\u536B\u5E02", 'code': '640500', 'initial': 'Z' }];

var cityObjs = [{ 'id': '35', 'provincecode': '150000', 'city': '阿拉善盟', 'code': '152900', 'initial': 'A', 'short': 'Alashanmeng' }, { 'id': '38', 'provincecode': '210000', 'city': '鞍山市', 'code': '210300', 'initial': 'A', 'short': 'Anshan' }, { 'id': '105', 'provincecode': '340000', 'city': '安庆市', 'code': '340800', 'initial': 'A', 'short': 'Anqing' }, { 'id': '156', 'provincecode': '410000', 'city': '安阳市', 'code': '410500', 'initial': 'A', 'short': 'Anyang' }, { 'id': '256', 'provincecode': '510000', 'city': '阿坝藏族羌族自治州', 'code': '513200', 'initial': 'A', 'short': 'Aba' }, { 'id': '262', 'provincecode': '520000', 'city': '安顺市', 'code': '520400', 'initial': 'A', 'short': 'Anshun' }, { 'id': '289', 'provincecode': '540000', 'city': '阿里地区', 'code': '542500', 'initial': 'A', 'short': 'Ali' }, { 'id': '299', 'provincecode': '610000', 'city': '安康市', 'code': '610900', 'initial': 'A', 'short': 'Ankang' }, { 'id': '335', 'provincecode': '650000', 'city': '阿克苏地区', 'code': '652900', 'initial': 'A', 'short': 'Akesu' }, { 'id': '341', 'provincecode': '650000', 'city': '阿勒泰地区', 'code': '654300', 'initial': 'A', 'short': 'Aletai' }, { 'id': '1', 'provincecode': '110000', 'city': '北京市', 'code': '110000', 'initial': 'B', 'short': 'Beijing' }, { 'id': '7', 'provincecode': '130000', 'city': '保定市', 'code': '130600', 'initial': 'B', 'short': 'Baoding' }, { 'id': '25', 'provincecode': '150000', 'city': '包头市', 'code': '150200', 'initial': 'B', 'short': 'Baotou' }, { 'id': '31', 'provincecode': '150000', 'city': '巴彦淖尔市', 'code': '150800', 'initial': 'B', 'short': 'Bayannaoer' }, { 'id': '40', 'provincecode': '210000', 'city': '本溪市', 'code': '210500', 'initial': 'B', 'short': 'Benxi' }, { 'id': '55', 'provincecode': '220000', 'city': '白山市', 'code': '220600', 'initial': 'B', 'short': 'Baishan' }, { 'id': '57', 'provincecode': '220000', 'city': '白城市', 'code': '220800', 'initial': 'B', 'short': 'Baicheng' }, { 'id': '100', 'provincecode': '340000', 'city': '蚌埠市', 'code': '340300', 'initial': 'B', 'short': 'Bangbu' }, { 'id': '150', 'provincecode': '370000', 'city': '滨州市', 'code': '371600', 'initial': 'B', 'short': 'Binzhou' }, { 'id': '222', 'provincecode': '450000', 'city': '北海市', 'code': '450500', 'initial': 'B', 'short': 'Beihai' }, { 'id': '227', 'provincecode': '450000', 'city': '百色市', 'code': '451000', 'initial': 'B', 'short': 'Baise' }, { 'id': '254', 'provincecode': '510000', 'city': '巴中市', 'code': '511900', 'initial': 'B', 'short': 'Bazhong' }, { 'id': '265', 'provincecode': '520000', 'city': '毕节地区', 'code': '522400', 'initial': 'B', 'short': 'Bijie' }, { 'id': '271', 'provincecode': '530000', 'city': '保山市', 'code': '530500', 'initial': 'B', 'short': 'Baoshan' }, { 'id': '293', 'provincecode': '610000', 'city': '宝鸡市', 'code': '610300', 'initial': 'B', 'short': 'Baoji' }, { 'id': '304', 'provincecode': '620000', 'city': '白银市', 'code': '620400', 'initial': 'B', 'short': 'Baiyin' }, { 'id': '333', 'provincecode': '650000', 'city': '博尔塔拉蒙古自治州', 'code': '652700', 'initial': 'B', 'short': 'Boertala' }, { 'id': '334', 'provincecode': '650000', 'city': '巴音郭楞蒙古自治州', 'code': '652800', 'initial': 'B', 'short': 'Bayinguoleng' }, { 'id': '', 'provincecode': '500000', 'city': '重庆市', 'code': '500000', 'initial': 'C', 'short': 'Chongqing' }, { 'id': '9', 'provincecode': '130000', 'city': '承德市', 'code': '130800', 'initial': 'C', 'short': 'Chengde' }, { 'id': '10', 'provincecode': '130000', 'city': '沧州市', 'code': '130900', 'initial': 'C', 'short': 'Cangzhou' }, { 'id': '16', 'provincecode': '140000', 'city': '长治市', 'code': '140400', 'initial': 'C', 'short': 'Changzhi' }, { 'id': '27', 'provincecode': '150000', 'city': '赤峰市', 'code': '150400', 'initial': 'C', 'short': 'Chifeng' }, { 'id': '48', 'provincecode': '210000', 'city': '朝阳市', 'code': '211300', 'initial': 'C', 'short': 'Chaoyang' }, { 'id': '50', 'provincecode': '220000', 'city': '长春市', 'code': '220100', 'initial': 'C', 'short': 'Changchun' }, { 'id': '77', 'provincecode': '320000', 'city': '常州市', 'code': '320400', 'initial': 'C', 'short': 'Changzhou' }, { 'id': '107', 'provincecode': '340000', 'city': '滁州市', 'code': '341100', 'initial': 'C', 'short': 'Chuzhou' }, { 'id': '110', 'provincecode': '340000', 'city': '巢湖市', 'code': '341400', 'initial': 'C', 'short': 'Chaohu' }, { 'id': '113', 'provincecode': '340000', 'city': '池州市', 'code': '341700', 'initial': 'C', 'short': 'Chizhou' }, { 'id': '183', 'provincecode': '430000', 'city': '长沙市', 'code': '430100', 'initial': 'C', 'short': 'Changsha' }, { 'id': '189', 'provincecode': '430000', 'city': '常德市', 'code': '430700', 'initial': 'C', 'short': 'Changde' }, { 'id': '192', 'provincecode': '430000', 'city': '郴州市', 'code': '431000', 'initial': 'C', 'short': 'Chenzhou' }, { 'id': '215', 'provincecode': '440000', 'city': '潮州市', 'code': '445100', 'initial': 'C', 'short': 'Chaozhou' }, { 'id': '231', 'provincecode': '450000', 'city': '崇左市', 'code': '451400', 'initial': 'C', 'short': 'Chongzuo' }, { 'id': '238', 'provincecode': '510000', 'city': '成都市', 'code': '510100', 'initial': 'C', 'short': 'Chengdu' }, { 'id': '276', 'provincecode': '530000', 'city': '楚雄彝族自治州', 'code': '532300', 'initial': 'C', 'short': 'Chuxiong' }, { 'id': '285', 'provincecode': '540000', 'city': '昌都地区', 'code': '542100', 'initial': 'C', 'short': 'Changdu' }, { 'id': '332', 'provincecode': '650000', 'city': '昌吉回族自治州', 'code': '652300', 'initial': 'C', 'short': 'Changji' }, { 'id': '14', 'provincecode': '140000', 'city': '大同市', 'code': '140200', 'initial': 'D', 'short': 'Datong' }, { 'id': '37', 'provincecode': '210000', 'city': '大连市', 'code': '210200', 'initial': 'D', 'short': 'Dalian' }, { 'id': '41', 'provincecode': '210000', 'city': '丹东市', 'code': '210600', 'initial': 'D', 'short': 'Dandong' }, { 'id': '64', 'provincecode': '230000', 'city': '大庆市', 'code': '230600', 'initial': 'D', 'short': 'Daqing' }, { 'id': '71', 'provincecode': '230000', 'city': '大兴安岭地区', 'code': '232700', 'initial': 'D', 'short': 'Daxinganling' }, { 'id': '139', 'provincecode': '370000', 'city': '东营市', 'code': '370500', 'initial': 'D', 'short': 'Dongying' }, { 'id': '148', 'provincecode': '370000', 'city': '德州市', 'code': '371400', 'initial': 'D', 'short': 'Dezhou' }, { 'id': '213', 'provincecode': '440000', 'city': '东莞市', 'code': '441900', 'initial': 'D', 'short': 'Dongguan' }, { 'id': '242', 'provincecode': '510000', 'city': '德阳市', 'code': '510600', 'initial': 'D', 'short': 'Deyang' }, { 'id': '252', 'provincecode': '510000', 'city': '达州市', 'code': '511700', 'initial': 'D', 'short': 'Dazhou' }, { 'id': '280', 'provincecode': '530000', 'city': '大理白族自治州', 'code': '532900', 'initial': 'D', 'short': 'Dali' }, { 'id': '281', 'provincecode': '530000', 'city': '德宏傣族景颇族自治州', 'code': '533100', 'initial': 'D', 'short': 'Dehong' }, { 'id': '283', 'provincecode': '530000', 'city': '迪庆藏族自治州', 'code': '533400', 'initial': 'D', 'short': 'Diqing' }, { 'id': '311', 'provincecode': '620000', 'city': '定西市', 'code': '621100', 'initial': 'D', 'short': 'Dingxi' }, { 'id': '29', 'provincecode': '150000', 'city': '鄂尔多斯市', 'code': '150600', 'initial': 'E', 'short': 'Eerduosi' }, { 'id': '174', 'provincecode': '420000', 'city': '鄂州市', 'code': '420700', 'initial': 'E', 'short': 'Ezhou' }, { 'id': '181', 'provincecode': '420000', 'city': '恩施土家族苗族自治州', 'code': '422800', 'initial': 'E', 'short': 'Enshi' }, { 'id': '39', 'provincecode': '210000', 'city': '抚顺市', 'code': '210400', 'initial': 'F', 'short': 'Fushun' }, { 'id': '44', 'provincecode': '210000', 'city': '阜新市', 'code': '210900', 'initial': 'F', 'short': 'Fuxin' }, { 'id': '108', 'provincecode': '340000', 'city': '阜阳市', 'code': '341200', 'initial': 'F', 'short': 'Fuyang' }, { 'id': '115', 'provincecode': '350000', 'city': '福州市', 'code': '350100', 'initial': 'F', 'short': 'Fuzhou' }, { 'id': '133', 'provincecode': '360000', 'city': '抚州市', 'code': '361000', 'initial': 'F', 'short': 'Fuzhou' }, { 'id': '202', 'provincecode': '440000', 'city': '佛山市', 'code': '440600', 'initial': 'F', 'short': 'Foshan' }, { 'id': '223', 'provincecode': '450000', 'city': '防城港市', 'code': '450600', 'initial': 'F', 'short': 'Fangchenggang' }, { 'id': '130', 'provincecode': '360000', 'city': '赣州市', 'code': '360700', 'initial': 'G', 'short': 'Ganzhou' }, { 'id': '197', 'provincecode': '440000', 'city': '广州市', 'code': '440100', 'initial': 'G', 'short': 'Guangzhou' }, { 'id': '220', 'provincecode': '450000', 'city': '桂林市', 'code': '450300', 'initial': 'G', 'short': 'Guilin' }, { 'id': '225', 'provincecode': '450000', 'city': '贵港市', 'code': '450800', 'initial': 'G', 'short': 'Guigang' }, { 'id': '244', 'provincecode': '510000', 'city': '广元市', 'code': '510800', 'initial': 'G', 'short': 'Guangyuan' }, { 'id': '251', 'provincecode': '510000', 'city': '广安市', 'code': '511600', 'initial': 'G', 'short': 'Guangan' }, { 'id': '257', 'provincecode': '510000', 'city': '甘孜藏族自治州', 'code': '513300', 'initial': 'G', 'short': 'Ganzi' }, { 'id': '259', 'provincecode': '520000', 'city': '贵阳市', 'code': '520100', 'initial': 'G', 'short': 'Guiyang' }, { 'id': '314', 'provincecode': '620000', 'city': '甘南藏族自治州', 'code': '623000', 'initial': 'G', 'short': 'Gannan' }, { 'id': '320', 'provincecode': '630000', 'city': '果洛藏族自治州', 'code': '632600', 'initial': 'G', 'short': 'Guoluo' }, { 'id': '326', 'provincecode': '640000', 'city': '固原市', 'code': '640400', 'initial': 'G', 'short': 'Guyuan' }, { 'id': '5', 'provincecode': '130000', 'city': '邯郸市', 'code': '130400', 'initial': 'H', 'short': 'Handan' }, { 'id': '12', 'provincecode': '130000', 'city': '衡水市', 'code': '131100', 'initial': 'H', 'short': 'Hengshui' }, { 'id': '', 'provincecode': '370000', 'city': '菏泽市', 'code': '371700', 'initial': 'H', 'short': 'Heze' }, { 'id': '24', 'provincecode': '150000', 'city': '呼和浩特市', 'code': '150100', 'initial': 'H', 'short': 'Huhehaote' }, { 'id': '30', 'provincecode': '150000', 'city': '呼伦贝尔市', 'code': '150700', 'initial': 'H', 'short': 'Hulunbeier' }, { 'id': '49', 'provincecode': '210000', 'city': '葫芦岛市', 'code': '211400', 'initial': 'H', 'short': 'Huludao' }, { 'id': '59', 'provincecode': '230000', 'city': '哈尔滨市', 'code': '230100', 'initial': 'H', 'short': 'Haerbin' }, { 'id': '62', 'provincecode': '230000', 'city': '鹤岗市', 'code': '230400', 'initial': 'H', 'short': 'Hegang' }, { 'id': '69', 'provincecode': '230000', 'city': '黑河市', 'code': '231100', 'initial': 'H', 'short': 'Heihe' }, { 'id': '81', 'provincecode': '320000', 'city': '淮安市', 'code': '320800', 'initial': 'H', 'short': 'Huaian' }, { 'id': '87', 'provincecode': '330000', 'city': '杭州市', 'code': '330100', 'initial': 'H', 'short': 'Hangzhou' }, { 'id': '91', 'provincecode': '330000', 'city': '湖州市', 'code': '330500', 'initial': 'H', 'short': 'Huzhou' }, { 'id': '98', 'provincecode': '340000', 'city': '合肥市', 'code': '340100', 'initial': 'H', 'short': 'Hefei' }, { 'id': '101', 'provincecode': '340000', 'city': '淮南市', 'code': '340400', 'initial': 'H', 'short': 'Huainan' }, { 'id': '103', 'provincecode': '340000', 'city': '淮北市', 'code': '340600', 'initial': 'H', 'short': 'Huaibei' }, { 'id': '106', 'provincecode': '340000', 'city': '黄山市', 'code': '341000', 'initial': 'H', 'short': 'Huangshan' }, { 'id': '112', 'provincecode': '340000', 'city': '亳州市', 'code': '341600', 'initial': 'H', 'short': 'Bozhou' }, { 'id': '157', 'provincecode': '410000', 'city': '鹤壁市', 'code': '410600', 'initial': 'H', 'short': 'Hebi' }, { 'id': '170', 'provincecode': '420000', 'city': '黄石市', 'code': '420200', 'initial': 'H', 'short': 'Huangshi' }, { 'id': '178', 'provincecode': '420000', 'city': '黄冈市', 'code': '421100', 'initial': 'H', 'short': 'Huanggang' }, { 'id': '186', 'provincecode': '430000', 'city': '衡阳市', 'code': '430400', 'initial': 'H', 'short': 'Hengyang' }, { 'id': '194', 'provincecode': '430000', 'city': '怀化市', 'code': '431200', 'initial': 'H', 'short': 'Huaihua' }, { 'id': '207', 'provincecode': '440000', 'city': '惠州市', 'code': '441300', 'initial': 'H', 'short': 'Huizhou' }, { 'id': '210', 'provincecode': '440000', 'city': '河源市', 'code': '441600', 'initial': 'H', 'short': 'Heyuan' }, { 'id': '228', 'provincecode': '450000', 'city': '贺州市', 'code': '451100', 'initial': 'H', 'short': 'Hezhou' }, { 'id': '229', 'provincecode': '450000', 'city': '河池市', 'code': '451200', 'initial': 'H', 'short': 'Hechi' }, { 'id': '232', 'provincecode': '460000', 'city': '海口市', 'code': '460100', 'initial': 'H', 'short': 'Haikou' }, { 'id': '277', 'provincecode': '530000', 'city': '红河哈尼族彝族自治州', 'code': '532500', 'initial': 'H', 'short': 'Honghe' }, { 'id': '297', 'provincecode': '610000', 'city': '汉中市', 'code': '610700', 'initial': 'H', 'short': 'Hanzhong' }, { 'id': '316', 'provincecode': '630000', 'city': '海东地区', 'code': '632100', 'initial': 'H', 'short': 'Haidong' }, { 'id': '317', 'provincecode': '630000', 'city': '海北藏族自治州', 'code': '632200', 'initial': 'H', 'short': 'Haibei' }, { 'id': '318', 'provincecode': '630000', 'city': '黄南藏族自治州', 'code': '632300', 'initial': 'H', 'short': 'Huangnan' }, { 'id': '319', 'provincecode': '630000', 'city': '海南藏族自治州', 'code': '632500', 'initial': 'H', 'short': 'Hainan' }, { 'id': '322', 'provincecode': '630000', 'city': '海西蒙古族藏族自治州', 'code': '632800', 'initial': 'H', 'short': 'Haixi' }, { 'id': '331', 'provincecode': '650000', 'city': '哈密地区', 'code': '652200', 'initial': 'H', 'short': 'Hami' }, { 'id': '338', 'provincecode': '650000', 'city': '和田地区', 'code': '653200', 'initial': 'H', 'short': 'Hetiandi' }, { 'id': '17', 'provincecode': '140000', 'city': '晋城市', 'code': '140500', 'initial': 'J', 'short': 'Jincheng' }, { 'id': '19', 'provincecode': '140000', 'city': '晋中市', 'code': '140700', 'initial': 'J', 'short': 'Jinzhong' }, { 'id': '42', 'provincecode': '210000', 'city': '锦州市', 'code': '210700', 'initial': 'J', 'short': 'Jinzhou' }, { 'id': '51', 'provincecode': '220000', 'city': '吉林市', 'code': '220200', 'initial': 'J', 'short': 'Jilin' }, { 'id': '61', 'provincecode': '230000', 'city': '鸡西市', 'code': '230300', 'initial': 'J', 'short': 'Jixi' }, { 'id': '66', 'provincecode': '230000', 'city': '佳木斯市', 'code': '230800', 'initial': 'J', 'short': 'Jiamusi' }, { 'id': '90', 'provincecode': '330000', 'city': '嘉兴市', 'code': '330400', 'initial': 'J', 'short': 'Jiaxing' }, { 'id': '93', 'provincecode': '330000', 'city': '金华市', 'code': '330700', 'initial': 'J', 'short': 'Jinhua' }, { 'id': '125', 'provincecode': '360000', 'city': '景德镇市', 'code': '360200', 'initial': 'J', 'short': 'Jingdezhen' }, { 'id': '127', 'provincecode': '360000', 'city': '九江市', 'code': '360400', 'initial': 'J', 'short': 'Jiujiang' }, { 'id': '131', 'provincecode': '360000', 'city': '吉安市', 'code': '360800', 'initial': 'J', 'short': 'Jian' }, { 'id': '135', 'provincecode': '370000', 'city': '济南市', 'code': '370100', 'initial': 'J', 'short': 'Jinan' }, { 'id': '142', 'provincecode': '370000', 'city': '济宁市', 'code': '370800', 'initial': 'J', 'short': 'Jining' }, { 'id': '159', 'provincecode': '410000', 'city': '焦作市', 'code': '410800', 'initial': 'J', 'short': 'Jiaozuo' }, { 'id': '175', 'provincecode': '420000', 'city': '荆门市', 'code': '420800', 'initial': 'J', 'short': 'Jingmen' }, { 'id': '177', 'provincecode': '420000', 'city': '荆州市', 'code': '421000', 'initial': 'J', 'short': 'Jingzhou' }, { 'id': '203', 'provincecode': '440000', 'city': '江门市', 'code': '440700', 'initial': 'J', 'short': 'Jiangmen' }, { 'id': '216', 'provincecode': '440000', 'city': '揭阳市', 'code': '445200', 'initial': 'J', 'short': 'Jieyang' }, { 'id': '302', 'provincecode': '620000', 'city': '嘉峪关市', 'code': '620200', 'initial': 'J', 'short': 'Jiayuguan' }, { 'id': '303', 'provincecode': '620000', 'city': '金昌市', 'code': '620300', 'initial': 'J', 'short': 'Jinchang' }, { 'id': '309', 'provincecode': '620000', 'city': '酒泉市', 'code': '620900', 'initial': 'J', 'short': 'Jiuquan' }, { 'id': '153', 'provincecode': '410000', 'city': '开封市', 'code': '410200', 'initial': 'K', 'short': 'Kaifeng' }, { 'id': '268', 'provincecode': '530000', 'city': '昆明市', 'code': '530100', 'initial': 'K', 'short': 'Kunming' }, { 'id': '329', 'provincecode': '650000', 'city': '克拉玛依市', 'code': '650200', 'initial': 'K', 'short': 'Kelamayi' }, { 'id': '336', 'provincecode': '650000', 'city': '克孜勒苏柯尔克孜自治州', 'code': '653000', 'initial': 'K', 'short': 'Kezile' }, { 'id': '337', 'provincecode': '650000', 'city': '喀什地区', 'code': '653100', 'initial': 'K', 'short': 'Kashidi' }, { 'id': '11', 'provincecode': '130000', 'city': '廊坊市', 'code': '131000', 'initial': 'L', 'short': 'Langfang' }, { 'id': '22', 'provincecode': '140000', 'city': '临汾市', 'code': '141000', 'initial': 'L', 'short': 'Linfen' }, { 'id': '23', 'provincecode': '140000', 'city': '吕梁市', 'code': '141100', 'initial': 'L', 'short': 'Lvliang' }, { 'id': '45', 'provincecode': '210000', 'city': '辽阳市', 'code': '211000', 'initial': 'L', 'short': 'Liaoyang' }, { 'id': '53', 'provincecode': '220000', 'city': '辽源市', 'code': '220400', 'initial': 'L', 'short': 'Liaoyuan' }, { 'id': '80', 'provincecode': '320000', 'city': '连云港市', 'code': '320700', 'initial': 'L', 'short': 'Lianyungang' }, { 'id': '97', 'provincecode': '330000', 'city': '丽水市', 'code': '331100', 'initial': 'L', 'short': 'Lishui' }, { 'id': '111', 'provincecode': '340000', 'city': '六安市', 'code': '341500', 'initial': 'L', 'short': 'Liuan' }, { 'id': '122', 'provincecode': '350000', 'city': '龙岩市', 'code': '350800', 'initial': 'L', 'short': 'Longyan' }, { 'id': '146', 'provincecode': '370000', 'city': '莱芜市', 'code': '371200', 'initial': 'L', 'short': 'Laiwu' }, { 'id': '147', 'provincecode': '370000', 'city': '临沂市', 'code': '371300', 'initial': 'L', 'short': 'Linyi' }, { 'id': '149', 'provincecode': '370000', 'city': '聊城市', 'code': '371500', 'initial': 'L', 'short': 'Liaocheng' }, { 'id': '154', 'provincecode': '410000', 'city': '洛阳市', 'code': '410300', 'initial': 'L', 'short': 'Luoyang' }, { 'id': '162', 'provincecode': '410000', 'city': '漯河市', 'code': '411100', 'initial': 'L', 'short': 'Luohe' }, { 'id': '195', 'provincecode': '430000', 'city': '娄底市', 'code': '431300', 'initial': 'L', 'short': 'Loudi' }, { 'id': '219', 'provincecode': '450000', 'city': '柳州市', 'code': '450200', 'initial': 'L', 'short': 'Liuzhou' }, { 'id': '230', 'provincecode': '450000', 'city': '来宾市', 'code': '451300', 'initial': 'L', 'short': 'Laibin' }, { 'id': '241', 'provincecode': '510000', 'city': '泸州市', 'code': '510500', 'initial': 'L', 'short': 'Luzhou' }, { 'id': '247', 'provincecode': '510000', 'city': '乐山市', 'code': '511100', 'initial': 'L', 'short': 'Leshan' }, { 'id': '258', 'provincecode': '510000', 'city': '凉山彝族自治州', 'code': '513400', 'initial': 'L', 'short': 'Liangshan' }, { 'id': '260', 'provincecode': '520000', 'city': '六盘水市', 'code': '520200', 'initial': 'L', 'short': 'Liupanshui' }, { 'id': '273', 'provincecode': '530000', 'city': '丽江市', 'code': '530700', 'initial': 'L', 'short': 'Lijiang' }, { 'id': '275', 'provincecode': '530000', 'city': '临沧市', 'code': '530900', 'initial': 'L', 'short': 'Lincang' }, { 'id': '284', 'provincecode': '540000', 'city': '拉萨市', 'code': '540100', 'initial': 'L', 'short': 'Lasa' }, { 'id': '290', 'provincecode': '540000', 'city': '林芝地区', 'code': '542600', 'initial': 'L', 'short': 'Linzhi' }, { 'id': '301', 'provincecode': '620000', 'city': '兰州市', 'code': '620100', 'initial': 'L', 'short': 'Lanzhou' }, { 'id': '312', 'provincecode': '620000', 'city': '陇南市', 'code': '621200', 'initial': 'L', 'short': 'Longnan' }, { 'id': '313', 'provincecode': '620000', 'city': '临夏回族自治州', 'code': '622900', 'initial': 'L', 'short': 'Linxia' }, { 'id': '68', 'provincecode': '230000', 'city': '牡丹江市', 'code': '231000', 'initial': 'M', 'short': 'Mudanjiang' }, { 'id': '102', 'provincecode': '340000', 'city': '马鞍山市', 'code': '340500', 'initial': 'M', 'short': 'Maanshan' }, { 'id': '205', 'provincecode': '440000', 'city': '茂名市', 'code': '440900', 'initial': 'M', 'short': 'Maoming' }, { 'id': '208', 'provincecode': '440000', 'city': '梅州市', 'code': '441400', 'initial': 'M', 'short': 'Meizhou' }, { 'id': '243', 'provincecode': '510000', 'city': '绵阳市', 'code': '510700', 'initial': 'M', 'short': 'Mianyang' }, { 'id': '249', 'provincecode': '510000', 'city': '眉山市', 'code': '511400', 'initial': 'M', 'short': 'Meishan' }, { 'id': '74', 'provincecode': '320000', 'city': '南京市', 'code': '320100', 'initial': 'N', 'short': 'Nanjing' }, { 'id': '79', 'provincecode': '320000', 'city': '南通市', 'code': '320600', 'initial': 'N', 'short': 'Nantong' }, { 'id': '88', 'provincecode': '330000', 'city': '宁波市', 'code': '330200', 'initial': 'N', 'short': 'Ningbo' }, { 'id': '121', 'provincecode': '350000', 'city': '南平市', 'code': '350700', 'initial': 'N', 'short': 'Nanping' }, { 'id': '123', 'provincecode': '350000', 'city': '宁德市', 'code': '350900', 'initial': 'N', 'short': 'Ningde' }, { 'id': '124', 'provincecode': '360000', 'city': '南昌市', 'code': '360100', 'initial': 'N', 'short': 'Nanchang' }, { 'id': '164', 'provincecode': '410000', 'city': '南阳市', 'code': '411300', 'initial': 'N', 'short': 'Nanyang' }, { 'id': '218', 'provincecode': '450000', 'city': '南宁市', 'code': '450100', 'initial': 'N', 'short': 'Nanning' }, { 'id': '246', 'provincecode': '510000', 'city': '内江市', 'code': '511000', 'initial': 'N', 'short': 'Neijiang' }, { 'id': '248', 'provincecode': '510000', 'city': '南充市', 'code': '511300', 'initial': 'N', 'short': 'Nanchong' }, { 'id': '282', 'provincecode': '530000', 'city': '怒江傈僳族自治州', 'code': '533300', 'initial': 'N', 'short': 'Nujiang' }, { 'id': '288', 'provincecode': '540000', 'city': '那曲地区', 'code': '542400', 'initial': 'N', 'short': 'Naqu' }, { 'id': '46', 'provincecode': '210000', 'city': '盘锦市', 'code': '211100', 'initial': 'P', 'short': 'Panjin' }, { 'id': '117', 'provincecode': '350000', 'city': '莆田市', 'code': '350300', 'initial': 'P', 'short': 'Putian' }, { 'id': '126', 'provincecode': '360000', 'city': '萍乡市', 'code': '360300', 'initial': 'P', 'short': 'Pingxiang' }, { 'id': '155', 'provincecode': '410000', 'city': '平顶山市', 'code': '410400', 'initial': 'P', 'short': 'Pingdingshan' }, { 'id': '160', 'provincecode': '410000', 'city': '濮阳市', 'code': '410900', 'initial': 'P', 'short': 'Puyang' }, { 'id': '240', 'provincecode': '510000', 'city': '攀枝花市', 'code': '510400', 'initial': 'P', 'short': 'Panzhihua' }, { 'id': '308', 'provincecode': '620000', 'city': '平凉市', 'code': '620800', 'initial': 'P', 'short': 'Pingliang' }, { 'id': '4', 'provincecode': '130000', 'city': '秦皇岛市', 'code': '130300', 'initial': 'Q', 'short': 'Qinhuangdao' }, { 'id': '60', 'provincecode': '230000', 'city': '齐齐哈尔市', 'code': '230200', 'initial': 'Q', 'short': 'Qiqihaer' }, { 'id': '67', 'provincecode': '230000', 'city': '七台河市', 'code': '230900', 'initial': 'Q', 'short': 'Qitaihe' }, { 'id': '94', 'provincecode': '330000', 'city': '衢州市', 'code': '330800', 'initial': 'Q', 'short': 'Quzhou' }, { 'id': '119', 'provincecode': '350000', 'city': '泉州市', 'code': '350500', 'initial': 'Q', 'short': 'Quanzhou' }, { 'id': '136', 'provincecode': '370000', 'city': '青岛市', 'code': '370200', 'initial': 'Q', 'short': 'Qingdao' }, { 'id': '212', 'provincecode': '440000', 'city': '清远市', 'code': '441800', 'initial': 'Q', 'short': 'Qingyuan' }, { 'id': '224', 'provincecode': '450000', 'city': '钦州市', 'code': '450700', 'initial': 'Q', 'short': 'Qinzhou' }, { 'id': '264', 'provincecode': '520000', 'city': '黔西南布依族苗族自治州', 'code': '522300', 'initial': 'Q', 'short': 'Qianxinan' }, { 'id': '266', 'provincecode': '520000', 'city': '黔东南苗族侗族自治州', 'code': '522600', 'initial': 'Q', 'short': 'Qiandong' }, { 'id': '267', 'provincecode': '520000', 'city': '黔南布依族苗族自治州', 'code': '522700', 'initial': 'Q', 'short': 'Qiannan' }, { 'id': '269', 'provincecode': '530000', 'city': '曲靖市', 'code': '530300', 'initial': 'Q', 'short': 'Qujing' }, { 'id': '310', 'provincecode': '620000', 'city': '庆阳市', 'code': '621000', 'initial': 'Q', 'short': 'Qingyang' }, { 'id': '145', 'provincecode': '370000', 'city': '日照市', 'code': '371100', 'initial': 'R', 'short': 'Rizhao' }, { 'id': '287', 'provincecode': '540000', 'city': '日喀则地区', 'code': '542300', 'initial': 'R', 'short': 'Rikaze' }, { 'id': '2', 'provincecode': '130000', 'city': '石家庄市', 'code': '130100', 'initial': 'S', 'short': 'Shijiazhuang' }, { 'id': '', 'provincecode': '310000', 'city': '上海市', 'code': '310000', 'initial': 'S', 'short': 'Shanghai' }, { 'id': '18', 'provincecode': '140000', 'city': '朔州市', 'code': '140600', 'initial': 'S', 'short': 'Shuozhou' }, { 'id': '36', 'provincecode': '210000', 'city': '沈阳市', 'code': '210100', 'initial': 'S', 'short': 'Shenyang' }, { 'id': '', 'provincecode': '530000', 'city': '普洱市', 'code': '530800', 'initial': 'P', 'short': 'Puer' }, { 'id': '52', 'provincecode': '220000', 'city': '四平市', 'code': '220300', 'initial': 'S', 'short': 'Siping' }, { 'id': '56', 'provincecode': '220000', 'city': '松原市', 'code': '220700', 'initial': 'S', 'short': 'Songyuan' }, { 'id': '63', 'provincecode': '230000', 'city': '双鸭山市', 'code': '230500', 'initial': 'S', 'short': 'Shuangyashan' }, { 'id': '70', 'provincecode': '230000', 'city': '绥化市', 'code': '231200', 'initial': 'S', 'short': 'Suihua' }, { 'id': '78', 'provincecode': '320000', 'city': '苏州市', 'code': '320500', 'initial': 'S', 'short': 'Suzhou' }, { 'id': '86', 'provincecode': '320000', 'city': '宿迁市', 'code': '321300', 'initial': 'S', 'short': 'Suqian' }, { 'id': '92', 'provincecode': '330000', 'city': '绍兴市', 'code': '330600', 'initial': 'S', 'short': 'Shaoxing' }, { 'id': '109', 'provincecode': '340000', 'city': '宿州市', 'code': '341300', 'initial': 'S', 'short': 'Suzhou' }, { 'id': '118', 'provincecode': '350000', 'city': '三明市', 'code': '350400', 'initial': 'S', 'short': 'Sanming' }, { 'id': '134', 'provincecode': '360000', 'city': '上饶市', 'code': '361100', 'initial': 'S', 'short': 'Shangrao' }, { 'id': '163', 'provincecode': '410000', 'city': '三门峡市', 'code': '411200', 'initial': 'S', 'short': 'Sanmenxia' }, { 'id': '165', 'provincecode': '410000', 'city': '商丘市', 'code': '411400', 'initial': 'S', 'short': 'Shangqiu' }, { 'id': '171', 'provincecode': '420000', 'city': '十堰市', 'code': '420300', 'initial': 'S', 'short': 'Shiyan' }, { 'id': '180', 'provincecode': '420000', 'city': '随州市', 'code': '421300', 'initial': 'S', 'short': 'Suizhou' }, { 'id': '187', 'provincecode': '430000', 'city': '邵阳市', 'code': '430500', 'initial': 'S', 'short': 'Shaoyang' }, { 'id': '198', 'provincecode': '440000', 'city': '韶关市', 'code': '440200', 'initial': 'S', 'short': 'Shaoguan' }, { 'id': '199', 'provincecode': '440000', 'city': '深圳市', 'code': '440300', 'initial': 'S', 'short': 'Shenzhen' }, { 'id': '201', 'provincecode': '440000', 'city': '汕头市', 'code': '440500', 'initial': 'S', 'short': 'Shantou' }, { 'id': '209', 'provincecode': '440000', 'city': '汕尾市', 'code': '441500', 'initial': 'S', 'short': 'Shanwei' }, { 'id': '233', 'provincecode': '460000', 'city': '三亚市', 'code': '460200', 'initial': 'S', 'short': 'Sanya' }, { 'id': '245', 'provincecode': '510000', 'city': '遂宁市', 'code': '510900', 'initial': 'S', 'short': 'Suining' }, { 'id': '286', 'provincecode': '540000', 'city': '山南地区', 'code': '542200', 'initial': 'S', 'short': 'Shannan' }, { 'id': '300', 'provincecode': '610000', 'city': '商洛市', 'code': '611000', 'initial': 'S', 'short': 'Shangluo' }, { 'id': '324', 'provincecode': '640000', 'city': '石嘴山市', 'code': '640200', 'initial': 'S', 'short': 'Shizuishan' }, { 'id': '3', 'provincecode': '130000', 'city': '唐山市', 'code': '130200', 'initial': 'T', 'short': 'Tangshan' }, { 'id': '13', 'provincecode': '140000', 'city': '太原市', 'code': '140100', 'initial': 'T', 'short': 'Taiyuan' }, { 'id': '28', 'provincecode': '150000', 'city': '通辽市', 'code': '150500', 'initial': 'T', 'short': 'Tongliao' }, { 'id': '47', 'provincecode': '210000', 'city': '铁岭市', 'code': '211200', 'initial': 'T', 'short': 'Tieling' }, { 'id': '54', 'provincecode': '220000', 'city': '通化市', 'code': '220500', 'initial': 'T', 'short': 'Tonghua' }, { 'id': '85', 'provincecode': '320000', 'city': '泰州市', 'code': '321200', 'initial': 'T', 'short': 'Taizhou' }, { 'id': '96', 'provincecode': '330000', 'city': '台州市', 'code': '331000', 'initial': 'T', 'short': 'Taizhou' }, { 'id': '104', 'provincecode': '340000', 'city': '铜陵市', 'code': '340700', 'initial': 'T', 'short': 'Tongling' }, { 'id': '143', 'provincecode': '370000', 'city': '泰安市', 'code': '370900', 'initial': 'T', 'short': 'Taian' }, { 'id': '263', 'provincecode': '520000', 'city': '铜仁地区', 'code': '522200', 'initial': 'T', 'short': 'Tongren' }, { 'id': '292', 'provincecode': '610000', 'city': '铜川市', 'code': '610200', 'initial': 'T', 'short': 'Tongchuan' }, { 'id': '305', 'provincecode': '620000', 'city': '天水市', 'code': '620500', 'initial': 'T', 'short': 'Tianshui' }, { 'id': '330', 'provincecode': '650000', 'city': '吐鲁番地区', 'code': '652100', 'initial': 'T', 'short': 'Tulufan' }, { 'id': '340', 'provincecode': '650000', 'city': '塔城地区', 'code': '654200', 'initial': 'T', 'short': 'Tachengdi' }, { 'id': '343', 'provincecode': '120000', 'city': '天津市', 'code': '120000', 'initial': 'T', 'short': 'Tianjin' }, { 'id': '26', 'provincecode': '150000', 'city': '乌海市', 'code': '150300', 'initial': 'W', 'short': 'Wuhai' }, { 'id': '32', 'provincecode': '150000', 'city': '乌兰察布市', 'code': '150900', 'initial': 'W', 'short': 'Wulanchabu' }, { 'id': '75', 'provincecode': '320000', 'city': '无锡市', 'code': '320200', 'initial': 'W', 'short': 'Wuxi' }, { 'id': '89', 'provincecode': '330000', 'city': '温州市', 'code': '330300', 'initial': 'W', 'short': 'Wenzhou' }, { 'id': '99', 'provincecode': '340000', 'city': '芜湖市', 'code': '340200', 'initial': 'W', 'short': 'Wuhu' }, { 'id': '141', 'provincecode': '370000', 'city': '潍坊市', 'code': '370700', 'initial': 'W', 'short': 'Weifang' }, { 'id': '144', 'provincecode': '370000', 'city': '威海市', 'code': '371000', 'initial': 'W', 'short': 'Weihai' }, { 'id': '169', 'provincecode': '420000', 'city': '武汉市', 'code': '420100', 'initial': 'W', 'short': 'Wuhan' }, { 'id': '221', 'provincecode': '450000', 'city': '梧州市', 'code': '450400', 'initial': 'W', 'short': 'Wuzhou' }, { 'id': '278', 'provincecode': '530000', 'city': '文山壮族苗族自治州', 'code': '532600', 'initial': 'W', 'short': 'Wenshan' }, { 'id': '295', 'provincecode': '610000', 'city': '渭南市', 'code': '610500', 'initial': 'W', 'short': 'Weinan' }, { 'id': '306', 'provincecode': '620000', 'city': '武威市', 'code': '620600', 'initial': 'W', 'short': 'Wuwei' }, { 'id': '325', 'provincecode': '640000', 'city': '吴忠市', 'code': '640300', 'initial': 'W', 'short': 'Wuzhong' }, { 'id': '328', 'provincecode': '650000', 'city': '乌鲁木齐市', 'code': '650100', 'initial': 'W', 'short': 'Wulumuqi' }, { 'id': '6', 'provincecode': '130000', 'city': '邢台市', 'code': '130500', 'initial': 'X', 'short': 'Xingtai' }, { 'id': '21', 'provincecode': '140000', 'city': '忻州市', 'code': '140900', 'initial': 'X', 'short': 'Xinzhou' }, { 'id': '33', 'provincecode': '150000', 'city': '兴安盟', 'code': '152200', 'initial': 'X', 'short': 'Xinganmeng' }, { 'id': '34', 'provincecode': '150000', 'city': '锡林郭勒盟', 'code': '152500', 'initial': 'X', 'short': 'Xilinguolemeng' }, { 'id': '76', 'provincecode': '320000', 'city': '徐州市', 'code': '320300', 'initial': 'X', 'short': 'Xuzhou' }, { 'id': '114', 'provincecode': '340000', 'city': '宣城市', 'code': '341800', 'initial': 'X', 'short': 'Xuancheng' }, { 'id': '116', 'provincecode': '350000', 'city': '厦门市', 'code': '350200', 'initial': 'X', 'short': 'Xiamen' }, { 'id': '128', 'provincecode': '360000', 'city': '新余市', 'code': '360500', 'initial': 'X', 'short': 'Xinyu' }, { 'id': '158', 'provincecode': '410000', 'city': '新乡市', 'code': '410700', 'initial': 'X', 'short': 'Xinxiang' }, { 'id': '161', 'provincecode': '410000', 'city': '许昌市', 'code': '411000', 'initial': 'X', 'short': 'Xuchang' }, { 'id': '166', 'provincecode': '410000', 'city': '信阳市', 'code': '411500', 'initial': 'X', 'short': 'Xinyang' }, { 'id': '173', 'provincecode': '420000', 'city': '襄樊市', 'code': '420600', 'initial': 'X', 'short': 'Xiangfan' }, { 'id': '176', 'provincecode': '420000', 'city': '孝感市', 'code': '420900', 'initial': 'X', 'short': 'Xiaogan' }, { 'id': '179', 'provincecode': '420000', 'city': '咸宁市', 'code': '421200', 'initial': 'X', 'short': 'Xianning' }, { 'id': '185', 'provincecode': '430000', 'city': '湘潭市', 'code': '430300', 'initial': 'X', 'short': 'Xiangtan' }, { 'id': '196', 'provincecode': '430000', 'city': '湘西土家族苗族自治州', 'code': '433100', 'initial': 'X', 'short': 'Xiangxi' }, { 'id': '279', 'provincecode': '530000', 'city': '西双版纳傣族自治州', 'code': '532800', 'initial': 'X', 'short': 'Xishuangbanna' }, { 'id': '291', 'provincecode': '610000', 'city': '西安市', 'code': '610100', 'initial': 'X', 'short': 'Xian' }, { 'id': '294', 'provincecode': '610000', 'city': '咸阳市', 'code': '610400', 'initial': 'X', 'short': 'Xianyang' }, { 'id': '315', 'provincecode': '630000', 'city': '西宁市', 'code': '630100', 'initial': 'X', 'short': 'Xining' }, { 'id': '15', 'provincecode': '140000', 'city': '阳泉市', 'code': '140300', 'initial': 'Y', 'short': 'Yangquan' }, { 'id': '20', 'provincecode': '140000', 'city': '运城市', 'code': '140800', 'initial': 'Y', 'short': 'Yuncheng' }, { 'id': '43', 'provincecode': '210000', 'city': '营口市', 'code': '210800', 'initial': 'Y', 'short': 'Yingkou' }, { 'id': '58', 'provincecode': '220000', 'city': '延边朝鲜族自治州', 'code': '222400', 'initial': 'Y', 'short': 'Yanbian' }, { 'id': '65', 'provincecode': '230000', 'city': '伊春市', 'code': '230700', 'initial': 'Y', 'short': 'Yichun' }, { 'id': '82', 'provincecode': '320000', 'city': '盐城市', 'code': '320900', 'initial': 'Y', 'short': 'Yancheng' }, { 'id': '83', 'provincecode': '320000', 'city': '扬州市', 'code': '321000', 'initial': 'Y', 'short': 'Yangzhou' }, { 'id': '129', 'provincecode': '360000', 'city': '鹰潭市', 'code': '360600', 'initial': 'Y', 'short': 'Yingtan' }, { 'id': '132', 'provincecode': '360000', 'city': '宜春市', 'code': '360900', 'initial': 'Y', 'short': 'Yichun' }, { 'id': '140', 'provincecode': '370000', 'city': '烟台市', 'code': '370600', 'initial': 'Y', 'short': 'Yantai' }, { 'id': '172', 'provincecode': '420000', 'city': '宜昌市', 'code': '420500', 'initial': 'Y', 'short': 'Yichang' }, { 'id': '188', 'provincecode': '430000', 'city': '岳阳市', 'code': '430600', 'initial': 'Y', 'short': 'Yueyang' }, { 'id': '191', 'provincecode': '430000', 'city': '益阳市', 'code': '430900', 'initial': 'Y', 'short': 'Yiyang' }, { 'id': '193', 'provincecode': '430000', 'city': '永州市', 'code': '431100', 'initial': 'Y', 'short': 'Yongzhou' }, { 'id': '211', 'provincecode': '440000', 'city': '阳江市', 'code': '441700', 'initial': 'Y', 'short': 'Yangjiang' }, { 'id': '217', 'provincecode': '440000', 'city': '云浮市', 'code': '445300', 'initial': 'Y', 'short': 'Yunfu' }, { 'id': '226', 'provincecode': '450000', 'city': '玉林市', 'code': '450900', 'initial': 'Y', 'short': 'Yulin' }, { 'id': '250', 'provincecode': '510000', 'city': '宜宾市', 'code': '511500', 'initial': 'Y', 'short': 'Yibin' }, { 'id': '253', 'provincecode': '510000', 'city': '雅安市', 'code': '511800', 'initial': 'Y', 'short': 'Yaan' }, { 'id': '270', 'provincecode': '530000', 'city': '玉溪市', 'code': '530400', 'initial': 'Y', 'short': 'Yuxi' }, { 'id': '296', 'provincecode': '610000', 'city': '延安市', 'code': '610600', 'initial': 'Y', 'short': 'Yanan' }, { 'id': '298', 'provincecode': '610000', 'city': '榆林市', 'code': '610800', 'initial': 'Y', 'short': 'Yulin' }, { 'id': '321', 'provincecode': '630000', 'city': '玉树藏族自治州', 'code': '632700', 'initial': 'Y', 'short': 'Yushu' }, { 'id': '323', 'provincecode': '640000', 'city': '银川市', 'code': '640100', 'initial': 'Y', 'short': 'Yinchuan' }, { 'id': '339', 'provincecode': '650000', 'city': '伊犁哈萨克自治州', 'code': '654000', 'initial': 'Y', 'short': 'Yilihasake' }, { 'id': '8', 'provincecode': '130000', 'city': '张家口市', 'code': '130700', 'initial': 'Z', 'short': 'Zhangjiakou' }, { 'id': '84', 'provincecode': '320000', 'city': '镇江市', 'code': '321100', 'initial': 'Z', 'short': 'Zhenjiang' }, { 'id': '95', 'provincecode': '330000', 'city': '舟山市', 'code': '330900', 'initial': 'Z', 'short': 'Zhoushan' }, { 'id': '120', 'provincecode': '350000', 'city': '漳州市', 'code': '350600', 'initial': 'Z', 'short': 'Zhangzhou' }, { 'id': '137', 'provincecode': '370000', 'city': '淄博市', 'code': '370300', 'initial': 'Z', 'short': 'Zibo' }, { 'id': '138', 'provincecode': '370000', 'city': '枣庄市', 'code': '370400', 'initial': 'Z', 'short': 'Zaozhuang' }, { 'id': '152', 'provincecode': '410000', 'city': '郑州市', 'code': '410100', 'initial': 'Z', 'short': 'Zhengzhou' }, { 'id': '167', 'provincecode': '410000', 'city': '周口市', 'code': '411600', 'initial': 'Z', 'short': 'Zhoukou' }, { 'id': '168', 'provincecode': '410000', 'city': '驻马店市', 'code': '411700', 'initial': 'Z', 'short': 'Zhumadian' }, { 'id': '184', 'provincecode': '430000', 'city': '株洲市', 'code': '430200', 'initial': 'Z', 'short': 'Zhuzhou' }, { 'id': '190', 'provincecode': '430000', 'city': '张家界市', 'code': '430800', 'initial': 'Z', 'short': 'Zhangjiajie' }, { 'id': '200', 'provincecode': '440000', 'city': '珠海市', 'code': '440400', 'initial': 'Z', 'short': 'Zhuhai' }, { 'id': '204', 'provincecode': '440000', 'city': '湛江市', 'code': '440800', 'initial': 'Z', 'short': 'Zhanjiang' }, { 'id': '206', 'provincecode': '440000', 'city': '肇庆市', 'code': '441200', 'initial': 'Z', 'short': 'Zhaoqing' }, { 'id': '214', 'provincecode': '440000', 'city': '中山市', 'code': '442000', 'initial': 'Z', 'short': 'Zhongshan' }, { 'id': '239', 'provincecode': '510000', 'city': '自贡市', 'code': '510300', 'initial': 'Z', 'short': 'Zigong' }, { 'id': '255', 'provincecode': '510000', 'city': '资阳市', 'code': '512000', 'initial': 'Z', 'short': 'Ziyang' }, { 'id': '261', 'provincecode': '520000', 'city': '遵义市', 'code': '520300', 'initial': 'Z', 'short': 'Zunyi' }, { 'id': '272', 'provincecode': '530000', 'city': '昭通市', 'code': '530600', 'initial': 'Z', 'short': 'Zhaotong' }, { 'id': '307', 'provincecode': '620000', 'city': '张掖市', 'code': '620700', 'initial': 'Z', 'short': 'Zhangye' }, { 'id': '327', 'provincecode': '640000', 'city': '中卫市', 'code': '640500', 'initial': 'Z', 'short': 'Zhongwei' }];

// 城市检索的首字母
var searchLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'];

// function searchLetter() {
//     return searchLetter;
// }

// 对城市信息进行分组
function cityList() {
  var tempArr = [];

  searchLetter.map(
  function (initial) {
    var tempObj = {};
    // let cityInfo = [];

    tempObj.initial = initial;
    tempObj.cityInfo = cityObj.filter(
    function (city) {return city.initial === initial;});


    tempArr.push(tempObj);
  });


  // console.log(JSON.stringify(tempArr));
  return tempArr;
}

// function pushCity() {

// }

module.exports = {
  searchLetter: searchLetter,
  cityList: cityList,
  cityObjs: cityObjs };

/***/ }),

/***/ 96:
/*!***************************************************************!*\
  !*** /Users/92afa/Desktop/nursing-home/static/images/glu.png ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAET0lEQVRoQ+2ZX2hbVRzHv797ky11OB0yh4W2SjJB9GFYp10FmQ9qa9K8JZnTpdVhfRVhrRWEMlBMJ1P0ZXbS2gRskz4M1xtLB7oqmw3YKYLbZCYiVhF0wpzOqDHnJze9N8vKzb1pk9QEc55yOH9+v8/5/Tnn/kKo80Z1rj/yAH5PkP8LGGJ+LBqPTK1VdgNgrSenr6uWBY6Ccbpc5YzWSyCbIH67ugCMvlg8PFENAJ/Pt4HSTX81ALQTMA7iGrGAr/vJrZCzLpuEKz9e/u7c/Pz8Pyu9oiYBfN4nXMT0JpgeBiBpSv8C8EhMiRwCkE/5pgDOhZGQROyoWCwwjuw4vJgyiwGfd78LIpMg4KYicsdiSnh/Pob0H9dcZJoLuRKhS2DcUCkABj969+EzH5gB+N29J0D8kKlM5q5YPDKnzjG1wHoD7PE+1ZwVme8JlNOLgRMSxABJcpsQHAGwWVP63agSfrySAGpa3GhlKSsL7PH07RYQJ/V9ZJLumJx55yu173cHj4DwjDZ2JqaE76kIABPiBETBCJcL4PP2dZEQs/o+G+28LXIs8lMOwNMbAnhAs8zZaSV8VyUAfpXYfueFzud+cC2E3gfQbQZhZYF1B2BI/aldB46qSt92+tU2WcqeBbCpGERNATBwKtUx+ADoak52fRIaAuHlugAQEnZ+c9/gYqGy2+YObbp+szgPoMUIonYsQLSU7BhoNVJyeyI0wowDtQ0AfJ3cNXi7kZLOROggMV6sdQCGTbQndw59fo2ii/12V8b5GYBcilvZaseFljU7zyy8qc6hpNq59eSww+ZoegPA03URxNqF8gdAcxL4MgO7AbTV1T1gdfPWugutVn/UWgw0AHKPsYLC1rq/hVZrgoYLreE5PQbGdas96WLzSdArO17/9FyxT8qKu1ClFC/cx6ywVTkAUALAt9UAALMEgl/fuzpBXBXNjTf93wAEPPueZ6bcRz0TLkwr4UdyaVg/l4AnqH7TGrwgcwWme/UBBs9LoLT2FtoOwKWNXSHg46vz0AFgi9ZfIuBLo/0FcWh6JvKROmYWA0UTg5W3+L3BByHwoT5PkuXWqffGl9S+3xM8COTf/smYElaBcs3fEzwFxv25UyIajc5M6CWRoiIbAEZHU/cW6G/vt6db07ovw3nMeXEYw8LKhfa6926RN8h2dZ49a0+PHR/7zcpdq+JCZkJXxEAqpoT1gLbS1XA80BPsZkY+mXBWvnl6dvxns83K+p844N73LBO9pgn4U6ZMy+TM5MU1ab9c/3wBhJe09eLGZodjdHQ0UzUAn7u3nYgLa0NJhlorpfx/YCXDMDcDCICQczsACzEl3Gm1viwLLKfL3lkwd1kJWuU4SxL1TB2fiFutKxvA1+3bSnKTWlFutxJW4rgAeCimREZKmV82gCpEzVSXbvm7jyG8BLQwYCtFeOEcCfgdRF+ApbeiyrhaWyqpVQSgJElVmlT3AP8CJDy5bbGniKoAAAAASUVORK5CYII="

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map