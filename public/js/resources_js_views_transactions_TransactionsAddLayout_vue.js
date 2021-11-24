"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_transactions_TransactionsAddLayout_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/transactions/TransactionsAddLayout.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/transactions/TransactionsAddLayout.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  name: 'AccountFormLayout',
  data: function data() {
    return {
      renderPage: true,
      frm: {
        account_name: '',
        account_type_id: '',
        bank_account_number: '',
        currency_id: '',
        amount: ''
      },
      frmError: {
        account_name: '',
        account_type_id: '',
        bank_account_number: '',
        currency_id: '',
        amount: ''
      },
      types: this.$store.getters.account_type,
      currency: this.$store.getters.currency,
      overlay: false,
      alert: {
        success: false,
        danger: false,
        warning: false
      },
      alert_message: '',
      skeleton: {
        text: true
      }
    };
  },
  watch: {
    // eslint-disable-next-line
    'frm.account_name': function frmAccount_name() {
      this.frmError.account_name = '';
    },
    // eslint-disable-next-line
    'frm.currency_id': function frmCurrency_id() {
      this.frmError.currency_id = '';
    },
    // eslint-disable-next-line
    'frm.account_type_id': function frmAccount_type_id() {
      this.frmError.account_type_id = '';
    },
    // eslint-disable-next-line
    'frm.amount': function frmAmount() {
      this.frmError.amount = '';
    }
  },
  mounted: function mounted() {// this.getAccount()
  },
  methods: {
    alphabetOnly: function alphabetOnly(e) {
      if (e.target.value.match(/([a-zA-Z]+$)/g) !== null) {
        this.frm.account_name = e.target.value.toUpperCase();
      } else {
        this.frm.account_name = e.target.value.substr(0, e.target.value.length - 1);
      }
    },
    numberOnly: function numberOnly(e) {
      if (e.target.value.match(/^([\d]+$)/g) !== null) {
        this.frm.amount = e.target.value.toString();
      } else {
        // eslint-disable-next-line no-useless-escape
        this.frm.amount = e.target.value.replace(new RegExp('(\[a-zA-Z]*)', 'g'), '');
      }
    },
    numbers: function numbers(e) {
      var num = e.target.value.replace(/(?:\.)/g, '');

      if (num.match(/([\d]+$)/g) !== null) {
        this.frm.amount = num.toString();
      }
    },
    accountSave: function accountSave() {
      var _this = this;
      /* eslint-disable */


      axios.post('account/save', this.frm, {
        headers: {
          Authorization: "Bearer ".concat(this.$store.getters.bearer)
        }
      }).then(function (response) {
        var data = response.data;
        _this.alert.danger = false;
        _this.alert.success = true;
        _this.alert_message = data.message;
      })["catch"](function (e) {
        var data = e.response.data;

        switch (data.flag) {
          case 2:
            _this.alert.danger = false;
            _this.alert.success = false;
            Object.keys(_this.frmError).forEach(function (key) {
              if (key in data.message) {
                _this.frmError[key] = data.message[key];
              } else {
                _this.frmError[key] = '';
              }
            });
            break;

          case 3:
          default:
            _this.alert.danger = true;
            _this.alert_message = data.message;
            break;
        }
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/views/transactions/TransactionsAddLayout.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/views/transactions/TransactionsAddLayout.vue ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TransactionsAddLayout_vue_vue_type_template_id_2b0ef73b_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TransactionsAddLayout.vue?vue&type=template&id=2b0ef73b&scoped=true& */ "./resources/js/views/transactions/TransactionsAddLayout.vue?vue&type=template&id=2b0ef73b&scoped=true&");
/* harmony import */ var _TransactionsAddLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TransactionsAddLayout.vue?vue&type=script&lang=js& */ "./resources/js/views/transactions/TransactionsAddLayout.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TransactionsAddLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TransactionsAddLayout_vue_vue_type_template_id_2b0ef73b_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _TransactionsAddLayout_vue_vue_type_template_id_2b0ef73b_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "2b0ef73b",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/transactions/TransactionsAddLayout.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/transactions/TransactionsAddLayout.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/views/transactions/TransactionsAddLayout.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_babel_loader_lib_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TransactionsAddLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-22[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TransactionsAddLayout.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/transactions/TransactionsAddLayout.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_babel_loader_lib_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TransactionsAddLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/transactions/TransactionsAddLayout.vue?vue&type=template&id=2b0ef73b&scoped=true&":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/views/transactions/TransactionsAddLayout.vue?vue&type=template&id=2b0ef73b&scoped=true& ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TransactionsAddLayout_vue_vue_type_template_id_2b0ef73b_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TransactionsAddLayout_vue_vue_type_template_id_2b0ef73b_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TransactionsAddLayout_vue_vue_type_template_id_2b0ef73b_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TransactionsAddLayout.vue?vue&type=template&id=2b0ef73b&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/transactions/TransactionsAddLayout.vue?vue&type=template&id=2b0ef73b&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/transactions/TransactionsAddLayout.vue?vue&type=template&id=2b0ef73b&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/transactions/TransactionsAddLayout.vue?vue&type=template&id=2b0ef73b&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
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
    "div",
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
        [_vm._v("\n    " + _vm._s(_vm.alert_message) + "\n  ")]
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
        [_vm._v("\n    " + _vm._s(_vm.alert_message) + "\n  ")]
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
        [_vm._v("\n    " + _vm._s(_vm.alert_message) + "\n  ")]
      ),
      _vm._v(" "),
      _c("v-progress-linear", {
        attrs: { indeterminate: "", active: _vm.overlay },
      }),
      _vm._v(" "),
      _c(
        "v-form",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.renderPage,
              expression: "renderPage",
            },
          ],
        },
        [
          _c(
            "v-row",
            [
              _c("v-col", { attrs: { cols: "12", md: "3" } }, [
                _c("label", [_vm._v("Account Name")]),
              ]),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "9" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      id: "accountName",
                      dense: "",
                      placeholder: "Account Name",
                      "error-count": _vm.frmError.account_name.length,
                      "error-messages": _vm.frmError.account_name,
                    },
                    nativeOn: {
                      keyup: function ($event) {
                        $event.stopPropagation()
                        return _vm.alphabetOnly.apply(null, arguments)
                      },
                    },
                    model: {
                      value: _vm.frm.account_name,
                      callback: function ($$v) {
                        _vm.$set(_vm.frm, "account_name", $$v)
                      },
                      expression: "frm.account_name",
                    },
                  }),
                ],
                1
              ),
              _vm._v(" "),
              _c("v-col", { attrs: { cols: "12", md: "3" } }, [
                _c("label", [_vm._v("Bank Account Number")]),
              ]),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "9" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      id: "bankAccountNumber",
                      dense: "",
                      placeholder: "Bank Account Number",
                      "hide-details": "",
                      "error-count": _vm.frmError.bank_account_number.length,
                      "error-messages": _vm.frmError.bank_account_number,
                    },
                    on: { keyup: _vm.numberOnly },
                    model: {
                      value: _vm.frm.bank_account_number,
                      callback: function ($$v) {
                        _vm.$set(_vm.frm, "bank_account_number", $$v)
                      },
                      expression: "frm.bank_account_number",
                    },
                  }),
                ],
                1
              ),
              _vm._v(" "),
              _c("v-col", { attrs: { cols: "12", md: "3" } }, [
                _c("label", [_vm._v("Currency")]),
              ]),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "9" } },
                [
                  _c("v-skeleton-loader", {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: !_vm.skeleton.text,
                        expression: "!skeleton.text",
                      },
                    ],
                    attrs: { type: "text", transition: "fade-transition" },
                  }),
                  _vm._v(" "),
                  _c("v-select", {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.skeleton.text,
                        expression: "skeleton.text",
                      },
                    ],
                    attrs: {
                      items: _vm.currency,
                      "item-text": "currency_name",
                      "item-value": "currency_id",
                      hint: "" + _vm.frm.currency_id,
                      "persistent-hint": "",
                      placeholder: "Currency",
                      "error-count": _vm.frmError.currency_id.length,
                      "error-messages": _vm.frmError.currency_id,
                    },
                    model: {
                      value: _vm.frm.currency_id,
                      callback: function ($$v) {
                        _vm.$set(_vm.frm, "currency_id", $$v)
                      },
                      expression: "frm.currency_id",
                    },
                  }),
                ],
                1
              ),
              _vm._v(" "),
              _c("v-col", { attrs: { cols: "12", md: "3" } }, [
                _c("label", [_vm._v("Type")]),
              ]),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "9" } },
                [
                  _c("v-skeleton-loader", {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: !_vm.skeleton.text,
                        expression: "!skeleton.text",
                      },
                    ],
                    attrs: { type: "text", transition: "fade-transition" },
                  }),
                  _vm._v(" "),
                  _c("v-select", {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.skeleton.text,
                        expression: "skeleton.text",
                      },
                    ],
                    attrs: {
                      items: _vm.types,
                      "item-text": "account_type_name",
                      "item-value": "account_type_id",
                      placeholder: "Type",
                      "error-count": _vm.frmError.account_type_id.length,
                      "error-messages": _vm.frmError.account_type_id,
                    },
                    model: {
                      value: _vm.frm.account_type_id,
                      callback: function ($$v) {
                        _vm.$set(_vm.frm, "account_type_id", $$v)
                      },
                      expression: "frm.account_type_id",
                    },
                  }),
                ],
                1
              ),
              _vm._v(" "),
              _c("v-col", { attrs: { cols: "12", md: "3" } }, [
                _c("label", [_vm._v("Amount")]),
              ]),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "9" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      id: "amount",
                      dense: "",
                      placeholder: "Amount",
                      reverse: "",
                      "error-count": _vm.frmError.amount.length,
                      "error-messages": _vm.frmError.amount,
                    },
                    on: { blur: _vm.currencyOnly, focus: _vm.numbers },
                    nativeOn: {
                      keyup: function ($event) {
                        $event.stopPropagation()
                        return _vm.numberOnly.apply(null, arguments)
                      },
                    },
                    model: {
                      value: _vm.frm.amount,
                      callback: function ($$v) {
                        _vm.$set(_vm.frm, "amount", $$v)
                      },
                      expression: "frm.amount",
                    },
                  }),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { "offset-md": "3", cols: "12" } },
                [
                  _c(
                    "v-btn",
                    {
                      attrs: { color: "primary" },
                      on: { click: _vm.accountSave },
                    },
                    [_vm._v("\n          Save\n        ")]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      staticClass: "mx-2",
                      attrs: { outlined: "", to: { name: "accounts" } },
                    },
                    [_vm._v("\n          Back\n        ")]
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