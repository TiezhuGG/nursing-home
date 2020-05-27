(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/collect-data/collect-data"],{

/***/ 31:
/*!***************************************************************************************************!*\
  !*** C:/Users/window/Desktop/nursing-home/main.js?{"page":"pages%2Fcollect-data%2Fcollect-data"} ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _collectData = _interopRequireDefault(__webpack_require__(/*! ./pages/collect-data/collect-data.vue */ 32));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_collectData.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 32:
/*!********************************************************************************!*\
  !*** C:/Users/window/Desktop/nursing-home/pages/collect-data/collect-data.vue ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _collect_data_vue_vue_type_template_id_2786e414___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./collect-data.vue?vue&type=template&id=2786e414& */ 33);
/* harmony import */ var _collect_data_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collect-data.vue?vue&type=script&lang=js& */ 35);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _collect_data_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _collect_data_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _collect_data_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./collect-data.vue?vue&type=style&index=0&lang=scss& */ 41);
/* harmony import */ var _lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../lhf/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 14);

var renderjs





/* normalize component */

var component = Object(_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _collect_data_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _collect_data_vue_vue_type_template_id_2786e414___WEBPACK_IMPORTED_MODULE_0__["render"],
  _collect_data_vue_vue_type_template_id_2786e414___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _collect_data_vue_vue_type_template_id_2786e414___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "Users/window/Desktop/nursing-home/pages/collect-data/collect-data.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 33:
/*!***************************************************************************************************************!*\
  !*** C:/Users/window/Desktop/nursing-home/pages/collect-data/collect-data.vue?vue&type=template&id=2786e414& ***!
  \***************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_collect_data_vue_vue_type_template_id_2786e414___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../lhf/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../lhf/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../../lhf/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../lhf/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../lhf/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../lhf/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./collect-data.vue?vue&type=template&id=2786e414& */ 34);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_collect_data_vue_vue_type_template_id_2786e414___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_collect_data_vue_vue_type_template_id_2786e414___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_collect_data_vue_vue_type_template_id_2786e414___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_collect_data_vue_vue_type_template_id_2786e414___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 34:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/window/Desktop/nursing-home/pages/collect-data/collect-data.vue?vue&type=template&id=2786e414& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 35:
/*!*********************************************************************************************************!*\
  !*** C:/Users/window/Desktop/nursing-home/pages/collect-data/collect-data.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lhf_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_collect_data_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../lhf/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../lhf/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../lhf/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../lhf/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../lhf/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./collect-data.vue?vue&type=script&lang=js& */ 36);
/* harmony import */ var _lhf_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_collect_data_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lhf_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_collect_data_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _lhf_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_collect_data_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _lhf_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_collect_data_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_lhf_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_collect_data_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 36:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/window/Desktop/nursing-home/pages/collect-data/collect-data.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 37));

































































































































var _uCharts = _interopRequireDefault(__webpack_require__(/*! @/components/u-charts/u-charts.js */ 40));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _createForOfIteratorHelper(o) {if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var it,normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}var _default =

{
  data: function data() {
    return {
      navTitles: ['血压', '血氧', '血糖'],
      currentIndex: 0,
      cWidth: '',
      cHeight: '',
      pixelRatio: 1,
      patientList: [],
      patient: null,
      pid: '', // 当前患者id
      connected: 0, // 0: 未连接, 1: 已连接, 2: 重新连接
      // 血压参数
      bp_devices: [],
      bp_connected: false,
      bp_chs: [],
      bp_discoveryStarted: false,
      bp_canWrite: false,
      bp_deviceId: '',
      bp_serviceId: '',
      bp_characteristicId: '',
      blood_pressure: null,
      high_blood_pressure: 0, // 高压
      low_blood_pressure: 0, // 低压
      pressure_pulse_rate: 0, // 血压平均心率
      // 血氧参数
      bo_devices: [],
      bo_chs: [],
      bo_discoveryStarted: false,
      bo_canWrite: false,
      bo_deviceId: '',
      bo_serviceId: '',
      bo_characteristicId: '',
      blood_oxygen: 0, // 血压、血氧、血糖值
      oxygen_pulse_rate: 0 // 血氧平均心率
    };
  },
  onLoad: function onLoad(options) {
    // console.log('options',options)
    // 从客户管理界面进来会传入patient_id
    if (options.patient_id) {
      this.pid = options.patient_id;
      this.fetchPatientInfo(options.patient_id);
    }
    this.fetchPatientList();
  },

  onUnload: function onUnload() {
    console.log('bb');
    this.bo_closeBluetoothAdapter();
    this.bp_closeBluetoothAdapter();
    this.connected = 0;
  },

  watch: {
    patient: function patient(newVal, oldVal) {
      // 每次切换病人时关闭蓝牙模块, 之后再重新连接蓝牙进行采集数据
      if (oldVal != null) {
        console.log('cc');
        this.bo_closeBluetoothAdapter();
        this.bp_closeBluetoothAdapter();
        // 让按钮显示'连接蓝牙'
        this.connected = 0;
      }
      // console.log(`newVal ${JSON.stringify(newVal)}, oldVal ${oldVal}`)
    } },


  methods: {
    // 选择患者
    bindPickerChange: function bindPickerChange(e) {
      this.connected = 0;
      // console.log(e)
      var _iterator = _createForOfIteratorHelper(this.patientList),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var item = _step.value;
          if (item.id === Number(e.detail.value) + 1) {
            this.pid = item.id;
            this.fetchPatientInfo(item.id);
          }
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
    },
    // 获取患者列表(ID)
    fetchPatientList: function fetchPatientList() {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                  uni.request({
                    url: 'https://ciai.le-cx.com/index.php/api/patient/patientList',
                    success: function success(res) {
                      _this.patientList = res.data.data;
                    } }));case 2:case "end":return _context.stop();}}}, _callee);}))();

    },
    // 获取患者信息
    fetchPatientInfo: function fetchPatientInfo(id) {var _this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                  uni.request({
                    url: "https://ciai.le-cx.com/index.php/api/patient/info?id=".concat(id),
                    success: function success(res) {
                      _this2.patient = res.data.data;
                    } }));case 2:case "end":return _context2.stop();}}}, _callee2);}))();

    },
    // 切换导航tab
    switchTab: function switchTab(index) {
      this.currentIndex = index;
      // this.connected = 0
      uni.hideLoading();
    },

    // 获取当前时间戳
    getTimestamp: function getTimestamp() {
      var timestamp = new Date().getTime();
      return timestamp;
    },

    // 血状态信息存储
    saveData: function saveData(type) {var _this3 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
                console.log('采集数据，connected', _this3.connected);if (!(
                _this3.connected !== 2 && (_this3.blood_oxygen !== 0 || _this3.high_blood_pressure !== 0))) {_context3.next = 13;break;}
                // 采集数据后断开蓝牙连接（让connected === 2,只能存储一次数据）
                _this3.bo_closeBluetoothAdapter();
                // 通过判断type的值存储血压、血氧或血糖的数据
                if (!(type === 1)) {_context3.next = 8;break;}_context3.next = 6;return (
                  uni.request({
                    url: 'https://ciai.le-cx.com/index.php/api/alarm/putHealthRow',
                    data: {
                      'type': type,
                      'value': JSON.stringify(_this3.blood_pressure),
                      'patient_id': _this3.pid,
                      'pulse_rate': _this3.pressure_pulse_rate,
                      'timestamp': _this3.getTimestamp() },

                    header: {
                      'content-type': 'application/x-www-form-urlencoded' },

                    method: 'POST',
                    success: function success(res) {
                      uni.showToast({
                        title: '血压数据采集成功',
                        icon: 'none',
                        duration: 3000 });

                      console.log('血压数据存储成功', res);
                    } }));case 6:_context3.next = 11;break;case 8:if (!(

                type === 2)) {_context3.next = 11;break;}_context3.next = 11;return (
                  uni.request({
                    url: 'https://ciai.le-cx.com/index.php/api/alarm/putHealthRow',
                    data: {
                      'type': type,
                      'value': _this3.blood_oxygen,
                      'patient_id': _this3.pid,
                      'pulse_rate': _this3.pulse_rate,
                      'timestamp': _this3.getTimestamp() },

                    header: {
                      'content-type': 'application/x-www-form-urlencoded' },

                    method: 'POST',
                    success: function success(res) {
                      uni.showToast({
                        title: '血氧数据采集成功',
                        icon: 'none',
                        duration: 3000 });

                      console.log('血氧数据存储成功', res);
                    } }));case 11:_context3.next = 14;break;case 13:



                if (type === 1) {
                  uni.showToast({
                    title: "\u8BF7\u5148\u8FDE\u63A5\u8840\u538B\u8BA1\u84DD\u7259",
                    icon: 'none',
                    duration: 3000 });

                } else if (type === 2) {
                  uni.showToast({
                    title: "\u8BF7\u5148\u8FDE\u63A5\u8840\u6C27\u4EEA\u84DD\u7259",
                    icon: 'none',
                    duration: 3000 });

                } else {
                  uni.showToast({
                    title: "\u8BF7\u5148\u8FDE\u63A5\u8840\u7CD6\u4EEA\u84DD\u7259",
                    icon: 'none',
                    duration: 3000 });

                }case 14:case "end":return _context3.stop();}}}, _callee3);}))();

    },

    inArray: function inArray(arr, key, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][key] === val) {
          return i;
        }
      }
      return -1;
    },

    // ArrayBuffer转16进度字符串示例
    ab2hex: function ab2hex(buffer) {
      var hexArr = Array.prototype.map.call(
      new Uint8Array(buffer),
      function (bit) {
        return ('00' + bit.toString(16)).slice(-2);
      });

      return hexArr.join('');
    },

    // 血压计
    bp_openBluetoothAdapter: function bp_openBluetoothAdapter() {var _this4 = this;
      this.bp_discoveryStarted = false;
      console.log('初始化血压计蓝牙');
      uni.openBluetoothAdapter({
        success: function success(res) {
          console.log('openBluetoothAdapter success', res);
          _this4.bp_startBluetoothDevicesDiscovery();
        },
        fail: function fail(res) {
          if (res.errCode === 10001) {
            uni.showToast({
              title: '用户蓝牙未开启或者手机不支持蓝牙功能',
              icon: 'none',
              duration: 3000 });

            uni.onBluetoothAdapterStateChange(function (res) {
              console.log('onBluetoothAdapterStateChange', res);
              if (res.available) {
                _this4.bp_startBluetoothDevicesDiscovery();
              }
            });
          }
        } });

    },
    bp_startBluetoothDevicesDiscovery: function bp_startBluetoothDevicesDiscovery() {var _this5 = this;
      if (this.bp_discoveryStarted) {
        return;
      }
      this.bp_discoveryStarted = true;
      uni.startBluetoothDevicesDiscovery({
        allowDuplicatesKey: true,
        success: function success(res) {
          console.log('startBluetoothDevicesDiscovery success', res);
          _this5.bp_onBluetoothDeviceFound();
        } });

    },
    bp_getBluetoothAdapterState: function bp_getBluetoothAdapterState() {var _this6 = this;
      console.log('getBluetoothAdapterState');
      uni.getBluetoothAdapterState({
        success: function success(res) {
          console.log('getBluetoothAdapterState', res);
          if (res.discovering) {
            _this6.bp_onBluetoothDeviceFound();
          } else if (res.available) {
            _this6.bp_startBluetoothDevicesDiscovery();
          }
        } });

    },
    bp_onBluetoothDeviceFound: function bp_onBluetoothDeviceFound() {var _this7 = this;
      uni.showLoading({
        title: '正在连接蓝牙...' });

      console.log('开始查找蓝牙设备');
      uni.onBluetoothDeviceFound(function (res) {
        _this7.bp_getBluetoothDevices();
        // var bp_devices = res.devices
        // console.log('devices', bp_devices[0].name)
        // if (bp_devices[0].name == 'FSRKB_BT-001') {
        // 	uni.hideLoading()
        // 	let e = bp_devices[0]
        // 	this.bp_createBLEConnection(e)
        // } else {
        // 	uni.showLoading({
        // 		title: '正在连接蓝牙...'
        // 	})
        // 	if (this.connected === 1) {
        // 		uni.hideLoading()
        // 	} else {
        // 		setTimeout(() => {
        // 			// this.connected = 2
        // 			uni.hideLoading()
        // 		}, 5000)
        // 	}
        // }
      });
    },

    // 获取所有蓝牙设备
    bp_getBluetoothDevices: function bp_getBluetoothDevices() {
      var that = this;
      uni.getBluetoothDevices({
        success: function success(res) {
          console.log('获取蓝牙所有设备', res);
          var bp_devices = res.devices;var _iterator2 = _createForOfIteratorHelper(
          bp_devices),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var item = _step2.value;
              if (item.name == 'FSRKB_BT-001' || item.localName == 'FSRKB_BT-001') {
                uni.hideLoading();
                var e = item;
                that.bp_createBLEConnection(e);
              }
            }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}
        } });

    },

    bp_stopBluetoothDevicesDiscovery: function bp_stopBluetoothDevicesDiscovery() {
      this.bp_discoveryStarted = false;
      uni.stopBluetoothDevicesDiscovery();
    },

    bp_createBLEConnection: function bp_createBLEConnection(e) {var _this8 = this;
      // const ds = e.currentTarget.dataset
      this.bp_stopBluetoothDevicesDiscovery();
      console.log('开始连接蓝牙~~~');
      var deviceId = e.deviceId;
      var name = e.name;
      uni.createBLEConnection({
        deviceId: deviceId,
        success: function success(res) {
          uni.hideLoading();
          console.log('连接血压计成功');
          _this8.connected = 1;
          _this8.bp_getBLEDeviceServices(deviceId);
        } });

    },
    // bp_closeBLEConnection() {
    // 	uni.closeBLEConnection({
    // 		deviceId: this.bp_deviceId
    // 	})
    // 	this.bp_connected = false
    // 	this.bp_chs: []
    // 	this.bp_canWrite = false
    // },

    bp_getBLEDeviceServices: function bp_getBLEDeviceServices(deviceId) {var _this9 = this;
      console.log('获取血压计的所有服务');
      uni.getBLEDeviceServices({
        deviceId: deviceId,
        success: function success(res) {
          for (var i = 0; i < res.services.length; i++) {
            if (res.services[i].uuid == '0000FFF0-0000-1000-8000-00805F9B34FB') {
              _this9.bp_getBLEDeviceCharacteristics(deviceId, res.services[i].uuid);
              return;
            }
          }
        } });

    },
    bp_getBLEDeviceCharacteristics: function bp_getBLEDeviceCharacteristics(deviceId, serviceId) {var _this10 = this;
      console.log('获取血压计的特征值');
      uni.getBLEDeviceCharacteristics({
        deviceId: deviceId,
        serviceId: serviceId,
        success: function success(res) {
          // console.log('getBLEDeviceCharacteristics success', res.characteristics)
          for (var i = 0; i < res.characteristics.length; i++) {
            var item = res.characteristics[i];
            if (item.uuid == '0000FFF6-0000-1000-8000-00805F9B34FB') {
              _this10.bp_canWrite = true;
              _this10.bp_deviceId = deviceId;
              _this10.bp_serviceId = serviceId;
              _this10.bp_characteristicId = item.uuid;
              _this10.bp_writeBLECharacteristicValue();

              uni.notifyBLECharacteristicValueChange({
                deviceId: deviceId,
                serviceId: serviceId,
                characteristicId: item.uuid,
                state: true });

            }
          }
        },
        fail: function fail(res) {
          console.error('getBLEDeviceCharacteristics', res);
        } });

      // 操作之前先监听，保证第一时间获取数据
      uni.onBLECharacteristicValueChange(function (characteristic) {
        var vale = _this10.ab2hex(characteristic.value);
        if (vale.substr(6, 2) == 'cc' && _this10.connected != 2) {//判断是否测量结束，结束则进入
          if (vale.substr(10, 2) == '00') {//判断是否错误，错误则进入
            switch (parseInt(vale.substr(8, 2), 16)) {
              case 1:
                console.log('传感器异常！');
                // 断开蓝牙连接
                uni.closeBluetoothAdapter({
                  success: function success() {
                    _this10.connected = 2;
                    uni.showToast({
                      title: '传感器异常！',
                      icon: 'none',
                      duration: 3000 });

                  } });

                break;
              case 2:
                console.log('不足以检测心跳或血压！');
                uni.closeBluetoothAdapter({
                  success: function success() {
                    _this10.connected = 2;
                    uni.showToast({
                      title: '不足以检测心跳或血压！',
                      icon: 'none',
                      duration: 3000 });

                  } });

                break;
              case 3:
                console.log('异常测量结果！');
                uni.closeBluetoothAdapter({
                  success: function success() {
                    _this10.connected = 2;
                    uni.showToast({
                      title: '异常测量结果！',
                      icon: 'none',
                      duration: 3000 });

                  } });

                break;
              case 4:
                console.log('袖口太松或泄漏（10秒压力小于30毫米）');
                uni.closeBluetoothAdapter({
                  success: function success() {
                    _this10.connected = 2;
                    uni.showToast({
                      title: '袖口太松或泄漏（10秒压力小于30毫米）！',
                      icon: 'none',
                      duration: 3000 });

                  } });

                break;
              case 5:
                console.log('气管堵塞');
                uni.closeBluetoothAdapter({
                  success: function success() {
                    _this10.connected = 2;
                    uni.showToast({
                      title: '气管堵塞！',
                      icon: 'none',
                      duration: 3000 });

                  } });

                break;
              case 6:
                console.log('压力波动过大');
                uni.closeBluetoothAdapter({
                  success: function success() {
                    _this10.connected = 2;
                    uni.showToast({
                      title: '压力波动过大！',
                      icon: 'none',
                      duration: 3000 });

                  } });

                break;
              case 7:
                console.log('压力超过上限');
                uni.closeBluetoothAdapter({
                  success: function success() {
                    _this10.connected = 2;
                    uni.showToast({
                      title: '压力超过上限！',
                      icon: 'none',
                      duration: 3000 });

                  } });

                break;
              case 8:
                console.log('请查看标准数据是否异常');
                uni.closeBluetoothAdapter({
                  success: function success() {
                    _this10.connected = 2;
                    uni.showToast({
                      title: '请查看标准数据是否异常！',
                      icon: 'none',
                      duration: 3000 });

                  } });

                break;}

          } else {//输出测量结果
            uni.hideLoading();
            if (parseInt(vale.substr(8, 2), 16) && parseInt(vale.substr(10, 2), 16)) {
              // 高压
              _this10.high_blood_pressure = parseInt(vale.substr(8, 2), 16);
              // 低压
              _this10.low_blood_pressure = parseInt(vale.substr(10, 2), 16);
              _this10.blood_pressure = {
                'high_blood_pressure': _this10.high_blood_pressure,
                'low_blood_pressure': _this10.low_blood_pressure };


              console.log('最终血压为:', _this10.blood_pressure, JSON.stringify(_this10.blood_pressure));
              _this10.pressure_pulse_rate = parseInt(vale.substr(12, 2), 16);
            }
            console.log('高压：', _this10.high_blood_pressure,
            '低压：', _this10.low_blood_pressure,
            '心率', parseInt(vale.substr(12, 2), 16));
            console.log('高压：', parseInt(vale.substr(8, 2), 16),
            '低压：', parseInt(vale.substr(10, 2), 16),
            '心率', parseInt(vale.substr(12, 2), 16));

          }
        } else {//输出当前压力值
          uni.hideLoading();
          console.log('当前压力：', parseInt(vale.substr(10, 2), 16));
        }
      });
    },
    bp_writeBLECharacteristicValue: function bp_writeBLECharacteristicValue() {
      var sz = [0xBE, 0xB0, 0x01, 0xc0, 0x36];
      var buffer = new ArrayBuffer(5);
      var dataView = new DataView(buffer);

      for (var i = 0; i < 5; i++) {
        dataView.setUint8(i, sz[i]);
      }
      console.log(buffer);
      uni.writeBLECharacteristicValue({
        deviceId: this.bp_deviceId,
        serviceId: this.bp_serviceId,
        characteristicId: this.bp_characteristicId,
        value: buffer });

    },
    bp_closeBluetoothAdapter: function bp_closeBluetoothAdapter() {
      this.connected = 2;
      this.bp_discoveryStarted = false;
      uni.closeBluetoothAdapter({
        success: function success() {
          uni.hideLoading();
          console.log('关闭蓝牙设备');
        } });

    },

    // 血氧仪
    // 初始化蓝牙模块
    bo_openBluetoothAdapter: function bo_openBluetoothAdapter() {var _this11 = this;
      this.bo_discoveryStarted = false;
      console.log('初始化蓝牙模块，进行血氧仪连接');
      uni.openBluetoothAdapter({
        success: function success(res) {
          console.log('openBluetoothAdapter success', res);
          _this11.bo_startBluetoothDevicesDiscovery();
        },
        fail: function fail(res) {
          if (res.errCode === 10001) {
            uni.showToast({
              title: '用户蓝牙未开启或者手机不支持蓝牙功能',
              icon: 'none',
              duration: 3000 });

            console.log('用户蓝牙未开启或者手机不支持蓝牙功能');
            // 监听手机蓝牙状态
            uni.onBluetoothAdapterStateChange(function (res) {
              console.log('onBluetoothAdapterStateChange监听手机蓝牙状态', res);
              if (res.available) {
                this.bo_startBluetoothDevicesDiscovery();
              }
            });
          }
        } });

    },

    // 开始搜寻附近的蓝牙设备
    bo_startBluetoothDevicesDiscovery: function bo_startBluetoothDevicesDiscovery() {var _this12 = this;
      console.log('this.bo_discoveryStarted', this.bo_discoveryStarted);
      // 通过bo_discoveryStarted判断是否开启蓝牙设备搜索
      if (this.bo_discoveryStarted) {
        return;
      }
      this.bo_discoveryStarted = true;
      uni.startBluetoothDevicesDiscovery({
        // 允许重复上报同一设备
        // allowDuplicatesKey: true,
        success: function success(res) {
          console.log('startBluetoothDevicesDiscovery success', res);
          _this12.bo_onBluetoothDeviceFound();
        },
        fail: function fail() {
          uni.showModal({
            titile: '提示',
            content: '未搜索到蓝牙设备' });

        } });

    },

    // 监听寻找到新设备的事件
    bo_onBluetoothDeviceFound: function bo_onBluetoothDeviceFound() {var _this13 = this;
      uni.onBluetoothDeviceFound(function (res) {
        uni.showLoading({
          title: '正在连接蓝牙...' });

        console.log('onBluetoothDeviceFound success', res);
        _this13.bo_getBluetoothDevices();
        // var bo_devices = res.devices
        // if (bo_devices[0].name == 'Samo4 pulse oximeter') {
        // 	uni.hideLoading()
        // 	let e = bo_devices[0]
        // 	this.bo_createBLEConnection(e)
        // } else {
        // 	// 停止搜索蓝牙设备
        // 	// this.bo_stopBluetoothDevicesDiscovery()
        // 	uni.showLoading({
        // 		title: '正在连接蓝牙...'
        // 	})
        // 	if (this.connected === 1) {
        // 		uni.hideLoading()
        // 	} else {
        // 		setTimeout(() => {
        // 			// this.connected = 2
        // 			uni.hideLoading()
        // 		}, 5000)
        // 	}
        // }
      });
    },

    // 获取所有蓝牙设备
    bo_getBluetoothDevices: function bo_getBluetoothDevices() {
      var that = this;
      uni.getBluetoothDevices({
        success: function success(res) {
          console.log('获取蓝牙所有设备', res);
          var bo_devices = res.devices;var _iterator3 = _createForOfIteratorHelper(
          bo_devices),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var item = _step3.value;
              if (item.name == 'Samo4 pulse oximeter') {
                var e = item;
                that.bo_createBLEConnection(e);
              }
            }} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}
        } });

    },

    // 连接低功耗蓝牙设备
    bo_createBLEConnection: function bo_createBLEConnection(e) {var _this14 = this;
      console.log('开始连接蓝牙~~~');
      var deviceId = e.deviceId;
      var name = e.name;
      uni.createBLEConnection({
        deviceId: deviceId,
        success: function success(res) {
          uni.hideLoading();
          console.log('连接蓝牙成功');
          _this14.connected = 1;
          _this14.bo_getBLEDeviceServices(deviceId);
          // 停止搜索蓝牙
          _this14.bo_stopBluetoothDevicesDiscovery();
        } });

    },

    // 停止搜索附近的蓝牙设备
    bo_stopBluetoothDevicesDiscovery: function bo_stopBluetoothDevicesDiscovery() {
      console.log('停止搜索蓝牙设备');
      this.bo_discoveryStarted = false;
      uni.stopBluetoothDevicesDiscovery();
    },

    // 获取蓝牙设备所有服务
    bo_getBLEDeviceServices: function bo_getBLEDeviceServices(deviceId) {var _this15 = this;
      console.log('获取血氧仪的所有服务');
      uni.getBLEDeviceServices({
        deviceId: deviceId,
        success: function success(res) {
          for (var i = 0; i < res.services.length; i++) {
            console.log('血氧仪的所有服务', res.services[i]);
            if (res.services[i].uuid == '0000FFF0-0000-1000-8000-00805F9B34FB') {
              _this15.bo_getBLEDeviceCharacteristics(deviceId, res.services[i].uuid);
              return;
            }
          }
        } });

    },

    // 获取蓝牙设备某个服务中所有特征值
    bo_getBLEDeviceCharacteristics: function bo_getBLEDeviceCharacteristics(deviceId, serviceId) {var _this16 = this;
      console.log('获取血氧仪的特征值');
      uni.getBLEDeviceCharacteristics({
        deviceId: deviceId,
        serviceId: serviceId,
        success: function success(res) {
          for (var i = 0; i < res.characteristics.length; i++) {
            var item = res.characteristics[i];
            console.log('血氧仪某个服务的特征值', item);
            if (item.uuid == '0000FFF4-0000-1000-8000-00805F9B34FB') {
              _this16.bo_canWrite = true;
              _this16.bo_deviceId = deviceId;
              _this16.bo_serviceId = serviceId;
              _this16.bo_characteristicId = item.uuid;
              _this16.bo_writeBLECharacteristicValue();
              // 启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值
              uni.notifyBLECharacteristicValueChange({
                deviceId: deviceId,
                serviceId: serviceId,
                characteristicId: item.uuid,
                state: true });

            }
          }
        },
        fail: function fail(res) {
          console.error('getBLEDeviceCharacteristics', res);
        } });


      // 监听低功耗蓝牙设备的特征值变化事件，(操作之前先监听，保证第一时间获取数据)
      uni.onBLECharacteristicValueChange(function (characteristic) {
        var vale = _this16.ab2hex(characteristic.value);
        if (vale.substr(20, 2) == 1 && _this16.connected != 2) {//判断是否戴好
          console.log('未戴好！');
          // 断开蓝牙连接
          uni.closeBluetoothAdapter({
            success: function success() {
              _this16.connected = 2;
              uni.showToast({
                title: '请检查是否佩戴血氧仪',
                icon: 'none',
                duration: 3000 });

            } });

        } else {
          uni.hideLoading();
          _this16.blood_oxygen = parseInt(vale.substr(16, 2), 16);
          _this16.oxygen_pulse_rate = parseInt(vale.substr(18, 2), 16);
          console.log("\u5F53\u524D\u8840\u6C27\u9971\u548C\u5EA6: ".concat(_this16.blood_oxygen, ",  \u8109\u7387\u503C").concat(_this16.oxygen_pulse_rate));
          // console.log('当前血氧含量为：', parseInt(vale.substr(16, 2), 16), '脉率值:', parseInt(vale.substr(18, 2), 16)) //输出当前血氧饱和度,脉率值
        }
      });
    },

    // 发送二进制数据
    bo_writeBLECharacteristicValue: function bo_writeBLECharacteristicValue() {
      var buffer = new ArrayBuffer(1);
      var dataView = new DataView(buffer);
      console.log("buffer\u662F".concat(this.buffer, ", dataView\u662F").concat(this.dataView));
      dataView.setUint8(0, 0);
      uni.writeBLECharacteristicValue({
        deviceId: this.bo_deviceId,
        serviceId: this.bo_serviceId,
        characteristicId: this.bo_characteristicId,
        value: buffer });

    },

    // 关闭蓝牙模块
    bo_closeBluetoothAdapter: function bo_closeBluetoothAdapter() {
      this.connected = 2;
      this.bo_discoveryStarted = false;
      uni.closeBluetoothAdapter({
        success: function success() {
          uni.hideLoading();
          console.log('关闭蓝牙设备');
        } });

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 41:
/*!******************************************************************************************************************!*\
  !*** C:/Users/window/Desktop/nursing-home/pages/collect-data/collect-data.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lhf_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_lhf_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_2_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_lhf_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_collect_data_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../lhf/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../../lhf/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!../../../../../../lhf/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-2!../../../../../../lhf/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../lhf/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../../lhf/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../../lhf/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../../lhf/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../lhf/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./collect-data.vue?vue&type=style&index=0&lang=scss& */ 42);
/* harmony import */ var _lhf_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_lhf_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_2_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_lhf_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_collect_data_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lhf_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_lhf_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_2_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_lhf_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_collect_data_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _lhf_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_lhf_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_2_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_lhf_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_collect_data_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _lhf_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_lhf_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_2_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_lhf_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_collect_data_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_lhf_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_lhf_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_2_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_lhf_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_lhf_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_lhf_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_collect_data_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 42:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/window/Desktop/nursing-home/pages/collect-data/collect-data.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[31,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/collect-data/collect-data.js.map