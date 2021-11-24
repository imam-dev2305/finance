"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_accounts_AccountTableLayout_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/accounts/AccountTableLayout.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/accounts/AccountTableLayout.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'AccountTableLayout',
  data: function data() {
    return {
      accounts: [],
      loading: false,
      page: 1,
      page_count: 0,
      limitPerPage: 10,
      dialog: false,
      dialog_component: {
        deleted_item: ''
      },
      alert: {
        success: false,
        danger: false,
        warning: false
      },
      alert_message: '',
      attrs: {
        "class": 'mb-6',
        boilerplate: true,
        elevation: 2
      },
      skeleton: {
        table: true
      }
    };
  },
  computed: {
    accounts_header: function accounts_header() {
      return [{
        text: 'Account Name',
        align: 'center',
        value: 'account_name'
      }, {
        text: 'Currency',
        align: 'center',
        value: 'currency_id'
      }, {
        text: 'Amount',
        align: 'end',
        value: 'amount'
      }, {
        text: '',
        value: 'action',
        align: 'center',
        sortable: false
      }];
    }
  },
  mounted: function mounted() {
    this.getAccounts();
  },
  methods: {
    handlePageChange: function handlePageChange(val) {
      this.page = val;
    },
    getAccounts: function getAccounts() {
      var _this = this;

      this.loading = true;
      /* eslint-disable */

      axios.post('account/get', {
        page: this.page,
        limitPerPage: this.limitPerPage
      }, {
        headers: {
          Authorization: "Bearer ".concat(this.$store.getters.bearer)
        }
      }).then(function (response) {
        _this.accounts = response.data.data.data;
        _this.page_count = response.data.data.records;
        _this.skeleton.table = false;
        _this.loading = false;
      })["catch"](function (e) {
        var data = e.response.data;
      });
    },
    accountDeleteModal: function accountDeleteModal(e) {
      this.dialog_component.deleted_item = e;
      this.dialog = true;
    },
    accountDelete: function accountDelete(id) {
      var _this2 = this;

      this.dialog = !this.dialog;
      axios.post('account/delete', {
        account_id: id
      }, {
        headers: {
          Authorization: "Bearer ".concat(this.$store.getters.bearer)
        }
      }).then(function (response) {
        _this2.alert_message = response.data.message;

        _this2.getAccounts();
      })["catch"](function (e) {
        var data = e.response.data;
        _this2.alert.danger = true;
        _this2.alert_message = data.message;
      });
    },
    sumField: function sumField(key) {
      return this.accounts.reduce(function (a, b) {
        return a + (b[key] || 0);
      }, 0);
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/accounts/AccountTableLayout.vue?vue&type=style&index=0&id=5c274e36&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/accounts/AccountTableLayout.vue?vue&type=style&index=0&id=5c274e36&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.fade-enter-active[data-v-5c274e36], .fade-leave-active[data-v-5c274e36] {\n  transition: opacity .5s;\n}\n.fade-enter[data-v-5c274e36], .fade-leave-to[data-v-5c274e36] /* .fade-leave-active below version 2.1.8 */ {\n  opacity: 0;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/accounts/AccountTableLayout.vue?vue&type=style&index=0&id=5c274e36&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/accounts/AccountTableLayout.vue?vue&type=style&index=0&id=5c274e36&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountTableLayout_vue_vue_type_style_index_0_id_5c274e36_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AccountTableLayout.vue?vue&type=style&index=0&id=5c274e36&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/accounts/AccountTableLayout.vue?vue&type=style&index=0&id=5c274e36&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountTableLayout_vue_vue_type_style_index_0_id_5c274e36_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountTableLayout_vue_vue_type_style_index_0_id_5c274e36_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/accounts/AccountTableLayout.vue":
/*!************************************************************!*\
  !*** ./resources/js/views/accounts/AccountTableLayout.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AccountTableLayout_vue_vue_type_template_id_5c274e36_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AccountTableLayout.vue?vue&type=template&id=5c274e36&scoped=true& */ "./resources/js/views/accounts/AccountTableLayout.vue?vue&type=template&id=5c274e36&scoped=true&");
/* harmony import */ var _AccountTableLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AccountTableLayout.vue?vue&type=script&lang=js& */ "./resources/js/views/accounts/AccountTableLayout.vue?vue&type=script&lang=js&");
/* harmony import */ var _AccountTableLayout_vue_vue_type_style_index_0_id_5c274e36_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AccountTableLayout.vue?vue&type=style&index=0&id=5c274e36&scoped=true&lang=css& */ "./resources/js/views/accounts/AccountTableLayout.vue?vue&type=style&index=0&id=5c274e36&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AccountTableLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AccountTableLayout_vue_vue_type_template_id_5c274e36_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _AccountTableLayout_vue_vue_type_template_id_5c274e36_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "5c274e36",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/accounts/AccountTableLayout.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/accounts/AccountTableLayout.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/views/accounts/AccountTableLayout.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_babel_loader_lib_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountTableLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-22[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AccountTableLayout.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/accounts/AccountTableLayout.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_babel_loader_lib_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountTableLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/accounts/AccountTableLayout.vue?vue&type=style&index=0&id=5c274e36&scoped=true&lang=css&":
/*!*********************************************************************************************************************!*\
  !*** ./resources/js/views/accounts/AccountTableLayout.vue?vue&type=style&index=0&id=5c274e36&scoped=true&lang=css& ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountTableLayout_vue_vue_type_style_index_0_id_5c274e36_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AccountTableLayout.vue?vue&type=style&index=0&id=5c274e36&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/accounts/AccountTableLayout.vue?vue&type=style&index=0&id=5c274e36&scoped=true&lang=css&");


/***/ }),

/***/ "./resources/js/views/accounts/AccountTableLayout.vue?vue&type=template&id=5c274e36&scoped=true&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/views/accounts/AccountTableLayout.vue?vue&type=template&id=5c274e36&scoped=true& ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountTableLayout_vue_vue_type_template_id_5c274e36_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountTableLayout_vue_vue_type_template_id_5c274e36_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountTableLayout_vue_vue_type_template_id_5c274e36_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AccountTableLayout.vue?vue&type=template&id=5c274e36&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/accounts/AccountTableLayout.vue?vue&type=template&id=5c274e36&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/accounts/AccountTableLayout.vue?vue&type=template&id=5c274e36&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/accounts/AccountTableLayout.vue?vue&type=template&id=5c274e36&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-card",
    [
      _c(
        "v-card-title",
        [
          _c(
            "v-row",
            { attrs: { justify: "end" } },
            [
              _c(
                "v-btn",
                {
                  attrs: {
                    tile: "",
                    color: "bg-gradient-primary white--text",
                    to: { name: "accounts-add" },
                  },
                },
                [
                  _c("v-icon", { attrs: { left: "" } }, [
                    _vm._v("\n          mdi-plus\n        "),
                  ]),
                  _vm._v("\n        Add More\n      "),
                ],
                1
              ),
            ],
            1
          ),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-card-text",
        [
          _c(
            "v-alert",
            {
              attrs: {
                dense: "",
                outlined: "",
                text: "",
                type: "success",
                transition: "scroll-x-transition",
              },
              model: {
                value: _vm.alert.success,
                callback: function ($$v) {
                  _vm.$set(_vm.alert, "success", $$v)
                },
                expression: "alert.success",
              },
            },
            [_vm._v("\n      " + _vm._s(_vm.alert_message) + "\n    ")]
          ),
          _vm._v(" "),
          _c(
            "v-alert",
            {
              attrs: { dense: "", outlined: "", text: "", type: "error" },
              model: {
                value: _vm.alert.danger,
                callback: function ($$v) {
                  _vm.$set(_vm.alert, "danger", $$v)
                },
                expression: "alert.danger",
              },
            },
            [_vm._v("\n      " + _vm._s(_vm.alert_message) + "\n    ")]
          ),
          _vm._v(" "),
          _c(
            "v-alert",
            {
              attrs: { dense: "", outlined: "", text: "", type: "warning" },
              model: {
                value: _vm.alert.danger,
                callback: function ($$v) {
                  _vm.$set(_vm.alert, "danger", $$v)
                },
                expression: "alert.danger",
              },
            },
            [_vm._v("\n      " + _vm._s(_vm.alert_message) + "\n    ")]
          ),
          _vm._v(" "),
          _c(
            "v-skeleton-loader",
            _vm._b(
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.skeleton.table,
                    expression: "skeleton.table",
                  },
                ],
                attrs: { type: "table-heading,table-tfoot" },
              },
              "v-skeleton-loader",
              _vm.attrs,
              false
            )
          ),
          _vm._v(" "),
          _c(
            "v-data-table",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: !_vm.skeleton.table,
                  expression: "!skeleton.table",
                },
              ],
              staticClass: "elevation-1",
              attrs: {
                headers: _vm.accounts_header,
                items: _vm.accounts,
                loading: _vm.loading,
                page: _vm.page,
                "hide-default-footer": "",
              },
              on: {
                "update:page": function ($event) {
                  _vm.page = $event
                },
              },
              scopedSlots: _vm._u([
                {
                  key: "item.amount",
                  fn: function (ref) {
                    var item = ref.item
                    return [
                      _c("p", { staticClass: "font-weight-bold" }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(item.amount.toLocaleString("id")) +
                            "\n        "
                        ),
                      ]),
                    ]
                  },
                },
                {
                  key: "item.account_name",
                  fn: function (ref) {
                    var item = ref.item
                    return [
                      _c("p", [
                        _vm._v(
                          "\n          " +
                            _vm._s(item.account_name.toUpperCase()) +
                            "\n        "
                        ),
                      ]),
                    ]
                  },
                },
                {
                  key: "item.action",
                  fn: function (ref) {
                    var item = ref.item
                    return [
                      _c(
                        "v-btn",
                        {
                          attrs: {
                            to: {
                              name: "accounts-edit",
                              params: { id: item.account_id },
                            },
                            color: "yellow",
                            icon: "",
                          },
                        },
                        [
                          _c("v-icon", { attrs: { small: "" } }, [
                            _vm._v("mdi-pencil\n          "),
                          ]),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        { attrs: { icon: "" } },
                        [
                          _c(
                            "v-icon",
                            {
                              attrs: { small: "" },
                              on: {
                                click: function ($event) {
                                  return _vm.accountDeleteModal(item)
                                },
                              },
                            },
                            [_vm._v("mdi-delete\n          ")]
                          ),
                        ],
                        1
                      ),
                    ]
                  },
                },
              ]),
            },
            [
              _c("template", { slot: "body.append" }, [
                _c("tr", { staticClass: "pink--text" }, [
                  _c("th", { staticClass: "title text-center" }, [
                    _vm._v("\n            Total\n          "),
                  ]),
                  _vm._v(" "),
                  _c("th"),
                  _vm._v(" "),
                  _c("th", { staticClass: "title text-end" }, [
                    _vm._v(
                      "\n            " +
                        _vm._s(_vm.sumField("amount").toLocaleString("id")) +
                        "\n          "
                    ),
                  ]),
                  _vm._v(" "),
                  _c("th"),
                ]),
              ]),
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: !_vm.skeleton.table,
                  expression: "!skeleton.table",
                },
              ],
              staticClass: "text-center pt-2",
            },
            [
              _c("v-pagination", {
                attrs: { length: _vm.page_count, "total-visible": "5" },
                on: { input: _vm.handlePageChange },
                model: {
                  value: _vm.page,
                  callback: function ($$v) {
                    _vm.page = $$v
                  },
                  expression: "page",
                },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-dialog",
            {
              attrs: { persistent: "", "max-width": "290" },
              model: {
                value: _vm.dialog,
                callback: function ($$v) {
                  _vm.dialog = $$v
                },
                expression: "dialog",
              },
            },
            [
              _c(
                "v-card",
                [
                  _c("v-card-title", { staticClass: "text-h5" }, [
                    _vm._v(
                      "\n          Delete " +
                        _vm._s(_vm.dialog_component.deleted_item.account_name) +
                        " from your account?\n        "
                    ),
                  ]),
                  _vm._v(" "),
                  _c("v-card-text", [
                    _vm._v(
                      "Once deleted, all of transactions related to this account will be deleted\n          too.\n        "
                    ),
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-card-actions",
                    [
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: { color: "green darken-1", text: "" },
                          on: {
                            click: function ($event) {
                              _vm.dialog = !_vm.dialog
                            },
                          },
                        },
                        [_vm._v("\n            Disagree\n          ")]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: { color: "green darken-1", text: "" },
                          on: {
                            click: function ($event) {
                              return _vm.accountDelete(
                                _vm.dialog_component.deleted_item.account_id
                              )
                            },
                          },
                        },
                        [_vm._v("\n            Agree\n          ")]
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
            ],
            1
          ),
        ],
        1
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);