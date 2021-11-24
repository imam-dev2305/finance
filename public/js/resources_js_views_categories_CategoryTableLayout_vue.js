(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_categories_CategoryTableLayout_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/layouts/components/ContextMenu.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/layouts/components/ContextMenu.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var v_click_outside__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! v-click-outside */ "./node_modules/v-click-outside/dist/v-click-outside.umd.js");
/* harmony import */ var v_click_outside__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(v_click_outside__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


vue__WEBPACK_IMPORTED_MODULE_1__["default"].use((v_click_outside__WEBPACK_IMPORTED_MODULE_0___default()));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'ContextMenu',
  props: {
    elementid: {
      type: String,
      required: true,
      "default": function _default() {
        return '';
      }
    },
    options: {
      type: Array,
      required: true,
      "default": function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      item: null,
      idx: null,
      menuWidth: null,
      menuHeight: null
    };
  },
  methods: {
    showMenu: function showMenu(event, item, idx) {
      this.item = item;
      this.idx = idx;
      var menu = document.getElementById(this.elementid);

      if (!menu) {
        return;
      }

      if (!this.menuWidth || !this.menuHeight) {
        menu.style.visibility = 'hidden';
        menu.style.display = 'block';
        this.menuWidth = menu.offsetWidth;
        this.menuHeight = menu.offsetHeight;
        menu.removeAttribute('style');
      }

      if (this.menuWidth + event.pageX >= window.innerWidth) {
        menu.style.left = "".concat(event.pageX - (this.menuWidth + 2), "px");
      } else {
        menu.style.left = "".concat(event.pageX - window.innerWidth / 4, "px");
      }

      if (this.menuHeight + event.pageY >= window.innerHeight) {
        menu.style.top = "".concat(event.pageY - this.menuHeight, "px");
      } else {
        menu.style.top = "".concat(event.pageY - 90, "px");
      }

      menu.classList.add('vue-simple-context-menu--active');
    },
    hideContextMenu: function hideContextMenu() {
      var element = document.getElementById(this.elementid);

      if (element) {
        element.classList.remove('vue-simple-context-menu--active');
        this.$emit('menu-closed');
      }
    },
    onClickOutside: function onClickOutside() {
      this.hideContextMenu();
    },
    optionClicked: function optionClicked(option) {
      this.hideContextMenu();
      this.$emit('option-clicked', {
        item: this.item,
        idx: this.idx,
        option: option
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/layouts/components/Expands.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/layouts/components/Expands.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'Expands',
  props: {
    categories: {
      type: Array,
      "default": function _default() {
        return [];
      },
      required: true
    },
    parentColor: {
      type: String,
      "default": function _default() {
        return '';
      }
    },
    refs: {
      type: String,
      "default": function _default() {
        return '';
      }
    }
  },
  data: function data() {
    return {
      dialog: false,
      frm: {
        category_parent: '',
        category_name: '',
        category_color: this.parentColor,
        category_icon: ''
      },
      iconList: [{
        text: 'Bus',
        icon: 'mdi-train'
      }, {
        text: 'Car',
        icon: 'mdi-car'
      }, {
        text: 'Foods',
        icon: 'mdi-food'
      }, {
        text: 'Bank',
        icon: 'mdi-bank'
      }, {
        text: 'Loan',
        icon: 'mdi-cash-multiple'
      }],
      showBtn: true,
      iconSearch: '',
      panels: []
    };
  },
  methods: {
    showPanels: function showPanels(idx) {
      this.panels = idx;
    },
    colour: function colour(_colour) {
      this.showBtn = Boolean(_colour.category_parent);
      return _colour.category_color !== '' ? _colour.category_color : this.parentColor;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/categories/CategoryTableLayout.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/categories/CategoryTableLayout.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _layouts_components_Expands_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../layouts/components/Expands.vue */ "./resources/js/layouts/components/Expands.vue");
/* harmony import */ var _layouts_components_ContextMenu_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../layouts/components/ContextMenu.vue */ "./resources/js/layouts/components/ContextMenu.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'CategoryTableLayout',
  data: function data() {
    return {
      dialog: false,
      listCategories: [],
      frm: {
        category_parent: '',
        category_name: '',
        category_color: this.parentColor,
        category_icon: ''
      },
      frmEdit: {
        category_id: '',
        category_parent: '',
        category_name: '',
        category_color: this.parentColor,
        category_icon: ''
      },
      iconList: ['mdi-train', 'mdi-car', 'mdi-food', 'mdi-bank', 'mdi-cash-multiple', 'mdi-parking', 'mdi-car', 'mdi-gas-station', 'mdi-coffee', 'mdi-tshirt-crew', 'mdi-bottle-tonic', 'mdi-currency-usd', 'mdi-hammer-screwdriver'],
      iconSearch: '',
      optionsContext: [{
        name: 'Edit',
        actions: this.editContext
      }, {
        name: 'Delete',
        actions: this.deleteContext
      }],
      attrs: {
        "class": 'mb-6',
        boilerplate: true,
        elevation: 2
      },
      skeleton: {
        panel: true
      }
    };
  },
  mounted: function mounted() {
    this.getListCategories();
  },
  methods: {
    getListCategories: function getListCategories() {
      var _this = this;
      /* eslint-disable */


      axios.get('categories/get', {
        headers: {
          Authorization: "Bearer ".concat(this.$store.getters.bearer)
        }
      }).then(function (response) {
        var data = JSON.parse(response.data.data.data);
        _this.listCategories = data;
        _this.skeleton.panel = false;
      });
    },
    colour: function colour(_colour) {
      return _colour.category_color !== '' ? _colour.category_color : this.parentColor;
    },
    popDialog: function popDialog(id) {
      this.frm.category_parent = id.category_id;
      this.frm.category_color = id.category_color;
      this.dialog = !this.dialog;
    },
    saveCategory: function saveCategory() {
      var _this2 = this;
      /* eslint-disable */


      axios.post('categories/save', this.frm, {
        headers: {
          Authorization: "Bearer ".concat(this.$store.getters.bearer)
        }
      }).then(function (response) {
        _this2.getListCategories();

        _this2.dialog = !_this2.dialog;

        _this2.$refs.frmCategories.reset();
      })["catch"](function (e) {
        var data = e.response.data;

        switch (data.flag) {
          case 2:
            _this2.alert.danger = false;
            _this2.alert.success = false;
            Object.keys(_this2.frmError).forEach(function (key) {
              if (key in data.message) {
                _this2.frmError[key] = data.message[key];
              } else {
                _this2.frmError[key] = '';
              }
            });
            break;

          case 3:
          default:
            _this2.alert.danger = true;
            _this2.alert_message = data.message;
            break;
        }
      });
    },
    updateCategory: function updateCategory() {
      var _this3 = this;

      axios.post('categories/edit', this.frmEdit, {
        headers: {
          Authorization: "Bearer ".concat(this.$store.getters.bearer)
        }
      }).then(function (response) {
        _this3.getListCategories();

        _this3.optionsClose(_this3.frmEdit);

        _this3.$refs.frmEditCategories.reset();
      })["catch"](function (e) {
        var data = e.response.data;

        switch (data.flag) {
          case 2:
            _this3.alert.danger = false;
            _this3.alert.success = false;
            Object.keys(_this3.frmError).forEach(function (key) {
              if (key in data.message) {
                _this3.frmError[key] = data.message[key];
              } else {
                _this3.frmError[key] = '';
              }
            });
            break;

          case 3:
          default:
            _this3.alert.danger = true;
            _this3.alert_message = data.message;
            break;
        }
      });
    },
    filter: function filter(item, queryText, itemText) {
      if (item.header) return false;

      var hasValue = function hasValue(val) {
        return val != null ? val : '';
      };

      var text = hasValue(itemText);
      var query = hasValue(queryText);
      return text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1;
    },
    optionsClicked: function optionsClicked(event) {
      event.option.actions(event);
    },
    optionsClose: function optionsClose(item) {
      this.frmEdit = {
        category_id: '',
        category_parent: '',
        category_name: '',
        category_color: '',
        category_icon: ''
      };
      this.$refs[item.category_parent].showPanels([]);
    },
    editContext: function editContext(event) {
      if (this.frmEdit.category_parent) {
        this.$refs[this.frmEdit.category_parent].showPanels([]);
      }

      this.frmEdit.category_id = event.item.category_id;
      this.frmEdit.category_name = event.item.category_name;
      this.frmEdit.category_parent = event.item.category_parent;
      this.frmEdit.category_color = event.item.category_color;
      this.frmEdit.category_icon = event.item.category_icon;
      this.$refs[event.item.category_parent].showPanels([event.idx]);
    },
    deleteContext: function deleteContext(event) {
      var _this4 = this;

      axios.post('categories/delete', event.item, {
        headers: {
          Authorization: "Bearer ".concat(this.$store.getters.bearer)
        }
      }).then(function (response) {
        _this4.getListCategories();

        _this4.optionsClose(_this4.frmEdit);
      })["catch"](function (e) {
        var data = e.response.data;

        switch (data.flag) {
          case 2:
            _this4.alert.danger = false;
            _this4.alert.success = false;
            Object.keys(_this4.frmError).forEach(function (key) {
              if (key in data.message) {
                _this4.frmError[key] = data.message[key];
              } else {
                _this4.frmError[key] = '';
              }
            });
            break;

          case 3:
          default:
            _this4.alert.danger = true;
            _this4.alert_message = data.message;
            break;
        }
      });
    },
    handleClick: function handleClick(event, item, idx) {
      this.$refs.ContextMenu.showMenu(event, item, idx);
    }
  },
  components: {
    Expands: _layouts_components_Expands_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    ContextMenu: _layouts_components_ContextMenu_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  template: {
    Expands: _layouts_components_Expands_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    ContextMenu: _layouts_components_ContextMenu_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/layouts/components/ContextMenu.vue?vue&type=style&index=0&lang=scss&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/layouts/components/ContextMenu.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".vue-simple-context-menu {\n  top: 0;\n  left: 0;\n  margin: 0;\n  padding: 0;\n  display: none;\n  list-style: none;\n  position: absolute;\n  z-index: 1000000;\n  background-color: #ecf0f1;\n  border-bottom-width: 0px;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\n  box-shadow: 0 3px 6px 0 rgba(51, 51, 51, 0.2);\n  border-radius: 4px;\n}\n.vue-simple-context-menu--active {\n  display: block;\n}\n.vue-simple-context-menu__item {\n  display: flex;\n  color: #333;\n  cursor: pointer;\n  padding: 5px 15px;\n  align-items: center;\n}\n.vue-simple-context-menu__item:hover {\n  background-color: #007aff;\n  color: #fff;\n}\n.vue-simple-context-menu__divider {\n  box-sizing: content-box;\n  height: 2px;\n  background-color: #c0cdd1;\n  padding: 4px 0;\n  background-clip: content-box;\n  pointer-events: none;\n}\n.vue-simple-context-menu li:first-of-type {\n  margin-top: 4px;\n}\n.vue-simple-context-menu li:last-of-type {\n  margin-bottom: 4px;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/categories/CategoryTableLayout.vue?vue&type=style&index=0&id=eac4fd34&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/categories/CategoryTableLayout.vue?vue&type=style&index=0&id=eac4fd34&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.fade-enter-active[data-v-eac4fd34], .fade-leave-active[data-v-eac4fd34] {\n  transition: opacity .5s;\n}\n.fade-enter[data-v-eac4fd34], .fade-leave-to[data-v-eac4fd34] /* .fade-leave-active below version 2.1.8 */ {\n  opacity: 0;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/layouts/components/ContextMenu.vue?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/layouts/components/ContextMenu.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ContextMenu_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ContextMenu.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/layouts/components/ContextMenu.vue?vue&type=style&index=0&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ContextMenu_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ContextMenu_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/categories/CategoryTableLayout.vue?vue&type=style&index=0&id=eac4fd34&scoped=true&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/categories/CategoryTableLayout.vue?vue&type=style&index=0&id=eac4fd34&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryTableLayout_vue_vue_type_style_index_0_id_eac4fd34_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CategoryTableLayout.vue?vue&type=style&index=0&id=eac4fd34&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/categories/CategoryTableLayout.vue?vue&type=style&index=0&id=eac4fd34&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryTableLayout_vue_vue_type_style_index_0_id_eac4fd34_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryTableLayout_vue_vue_type_style_index_0_id_eac4fd34_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/v-click-outside/dist/v-click-outside.umd.js":
/*!******************************************************************!*\
  !*** ./node_modules/v-click-outside/dist/v-click-outside.umd.js ***!
  \******************************************************************/
/***/ (function(module) {

!function(e,n){ true?module.exports=n():0}(this,function(){var e="undefined"!=typeof window,n="undefined"!=typeof navigator,t=e&&("ontouchstart"in window||n&&navigator.msMaxTouchPoints>0)?["touchstart"]:["click"];function i(e){var n=e.event,t=e.handler;(0,e.middleware)(n)&&t(n)}function r(e,n){var r=function(e){var n="function"==typeof e;if(!n&&"object"!=typeof e)throw new Error("v-click-outside: Binding value must be a function or an object");return{handler:n?e:e.handler,middleware:e.middleware||function(e){return e},events:e.events||t,isActive:!(!1===e.isActive),detectIframe:!(!1===e.detectIframe)}}(n.value),d=r.handler,o=r.middleware,a=r.detectIframe;if(r.isActive){if(e["__v-click-outside"]=r.events.map(function(n){return{event:n,srcTarget:document.documentElement,handler:function(n){return function(e){var n=e.el,t=e.event,r=e.handler,d=e.middleware,o=t.path||t.composedPath&&t.composedPath();(o?o.indexOf(n)<0:!n.contains(t.target))&&i({event:t,handler:r,middleware:d})}({el:e,event:n,handler:d,middleware:o})}}}),a){var c={event:"blur",srcTarget:window,handler:function(n){return function(e){var n=e.el,t=e.event,r=e.handler,d=e.middleware;setTimeout(function(){var e=document.activeElement;e&&"IFRAME"===e.tagName&&!n.contains(e)&&i({event:t,handler:r,middleware:d})},0)}({el:e,event:n,handler:d,middleware:o})}};e["__v-click-outside"]=[].concat(e["__v-click-outside"],[c])}e["__v-click-outside"].forEach(function(n){var t=n.event,i=n.srcTarget,r=n.handler;return setTimeout(function(){e["__v-click-outside"]&&i.addEventListener(t,r,!1)},0)})}}function d(e){(e["__v-click-outside"]||[]).forEach(function(e){return e.srcTarget.removeEventListener(e.event,e.handler,!1)}),delete e["__v-click-outside"]}var o=e?{bind:r,update:function(e,n){var t=n.value,i=n.oldValue;JSON.stringify(t)!==JSON.stringify(i)&&(d(e),r(e,{value:t}))},unbind:d}:{};return{install:function(e){e.directive("click-outside",o)},directive:o}});
//# sourceMappingURL=v-click-outside.umd.js.map


/***/ }),

/***/ "./resources/js/layouts/components/ContextMenu.vue":
/*!*********************************************************!*\
  !*** ./resources/js/layouts/components/ContextMenu.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ContextMenu_vue_vue_type_template_id_7c7258d9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ContextMenu.vue?vue&type=template&id=7c7258d9& */ "./resources/js/layouts/components/ContextMenu.vue?vue&type=template&id=7c7258d9&");
/* harmony import */ var _ContextMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ContextMenu.vue?vue&type=script&lang=js& */ "./resources/js/layouts/components/ContextMenu.vue?vue&type=script&lang=js&");
/* harmony import */ var _ContextMenu_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ContextMenu.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/layouts/components/ContextMenu.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ContextMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ContextMenu_vue_vue_type_template_id_7c7258d9___WEBPACK_IMPORTED_MODULE_0__.render,
  _ContextMenu_vue_vue_type_template_id_7c7258d9___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/layouts/components/ContextMenu.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/layouts/components/Expands.vue":
/*!*****************************************************!*\
  !*** ./resources/js/layouts/components/Expands.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Expands_vue_vue_type_template_id_f421db78_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Expands.vue?vue&type=template&id=f421db78&scoped=true& */ "./resources/js/layouts/components/Expands.vue?vue&type=template&id=f421db78&scoped=true&");
/* harmony import */ var _Expands_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Expands.vue?vue&type=script&lang=js& */ "./resources/js/layouts/components/Expands.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Expands_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Expands_vue_vue_type_template_id_f421db78_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Expands_vue_vue_type_template_id_f421db78_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "f421db78",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/layouts/components/Expands.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/categories/CategoryTableLayout.vue":
/*!***************************************************************!*\
  !*** ./resources/js/views/categories/CategoryTableLayout.vue ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CategoryTableLayout_vue_vue_type_template_id_eac4fd34_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CategoryTableLayout.vue?vue&type=template&id=eac4fd34&scoped=true& */ "./resources/js/views/categories/CategoryTableLayout.vue?vue&type=template&id=eac4fd34&scoped=true&");
/* harmony import */ var _CategoryTableLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CategoryTableLayout.vue?vue&type=script&lang=js& */ "./resources/js/views/categories/CategoryTableLayout.vue?vue&type=script&lang=js&");
/* harmony import */ var _CategoryTableLayout_vue_vue_type_style_index_0_id_eac4fd34_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CategoryTableLayout.vue?vue&type=style&index=0&id=eac4fd34&scoped=true&lang=css& */ "./resources/js/views/categories/CategoryTableLayout.vue?vue&type=style&index=0&id=eac4fd34&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CategoryTableLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CategoryTableLayout_vue_vue_type_template_id_eac4fd34_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _CategoryTableLayout_vue_vue_type_template_id_eac4fd34_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "eac4fd34",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/categories/CategoryTableLayout.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/layouts/components/ContextMenu.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/layouts/components/ContextMenu.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_babel_loader_lib_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContextMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-22[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ContextMenu.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/layouts/components/ContextMenu.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_babel_loader_lib_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContextMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/layouts/components/Expands.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/layouts/components/Expands.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_babel_loader_lib_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Expands_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-22[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Expands.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/layouts/components/Expands.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_babel_loader_lib_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Expands_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/categories/CategoryTableLayout.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/views/categories/CategoryTableLayout.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_babel_loader_lib_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryTableLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-22[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CategoryTableLayout.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-22[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/categories/CategoryTableLayout.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_babel_loader_lib_index_js_clonedRuleSet_22_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryTableLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/layouts/components/ContextMenu.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/layouts/components/ContextMenu.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ContextMenu_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ContextMenu.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/layouts/components/ContextMenu.vue?vue&type=style&index=0&lang=scss&");


/***/ }),

/***/ "./resources/js/views/categories/CategoryTableLayout.vue?vue&type=style&index=0&id=eac4fd34&scoped=true&lang=css&":
/*!************************************************************************************************************************!*\
  !*** ./resources/js/views/categories/CategoryTableLayout.vue?vue&type=style&index=0&id=eac4fd34&scoped=true&lang=css& ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryTableLayout_vue_vue_type_style_index_0_id_eac4fd34_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CategoryTableLayout.vue?vue&type=style&index=0&id=eac4fd34&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/categories/CategoryTableLayout.vue?vue&type=style&index=0&id=eac4fd34&scoped=true&lang=css&");


/***/ }),

/***/ "./resources/js/layouts/components/ContextMenu.vue?vue&type=template&id=7c7258d9&":
/*!****************************************************************************************!*\
  !*** ./resources/js/layouts/components/ContextMenu.vue?vue&type=template&id=7c7258d9& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ContextMenu_vue_vue_type_template_id_7c7258d9___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ContextMenu_vue_vue_type_template_id_7c7258d9___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ContextMenu_vue_vue_type_template_id_7c7258d9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ContextMenu.vue?vue&type=template&id=7c7258d9& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/layouts/components/ContextMenu.vue?vue&type=template&id=7c7258d9&");


/***/ }),

/***/ "./resources/js/layouts/components/Expands.vue?vue&type=template&id=f421db78&scoped=true&":
/*!************************************************************************************************!*\
  !*** ./resources/js/layouts/components/Expands.vue?vue&type=template&id=f421db78&scoped=true& ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Expands_vue_vue_type_template_id_f421db78_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Expands_vue_vue_type_template_id_f421db78_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Expands_vue_vue_type_template_id_f421db78_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Expands.vue?vue&type=template&id=f421db78&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/layouts/components/Expands.vue?vue&type=template&id=f421db78&scoped=true&");


/***/ }),

/***/ "./resources/js/views/categories/CategoryTableLayout.vue?vue&type=template&id=eac4fd34&scoped=true&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/views/categories/CategoryTableLayout.vue?vue&type=template&id=eac4fd34&scoped=true& ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryTableLayout_vue_vue_type_template_id_eac4fd34_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryTableLayout_vue_vue_type_template_id_eac4fd34_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryTableLayout_vue_vue_type_template_id_eac4fd34_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CategoryTableLayout.vue?vue&type=template&id=eac4fd34&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/categories/CategoryTableLayout.vue?vue&type=template&id=eac4fd34&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/layouts/components/ContextMenu.vue?vue&type=template&id=7c7258d9&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/layouts/components/ContextMenu.vue?vue&type=template&id=7c7258d9& ***!
  \*******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "ul",
      {
        directives: [
          {
            name: "click-outside",
            rawName: "v-click-outside",
            value: _vm.onClickOutside,
            expression: "onClickOutside",
          },
        ],
        staticClass: "vue-simple-context-menu",
        attrs: { id: _vm.elementid },
      },
      _vm._l(_vm.options, function (opt, i) {
        return _c(
          "li",
          {
            key: i,
            staticClass: "vue-simple-context-menu__item",
            on: {
              click: function ($event) {
                $event.stopPropagation()
                return _vm.optionClicked(opt)
              },
            },
          },
          [_c("span", [_vm._v(_vm._s(opt.name))])]
        )
      }),
      0
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/layouts/components/Expands.vue?vue&type=template&id=f421db78&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/layouts/components/Expands.vue?vue&type=template&id=f421db78&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
    "v-expansion-panels",
    {
      attrs: { multiple: "" },
      model: {
        value: _vm.panels,
        callback: function ($$v) {
          _vm.panels = $$v
        },
        expression: "panels",
      },
    },
    _vm._l(_vm.categories, function (item, i) {
      return _c(
        "v-expansion-panel",
        { key: i },
        [
          _vm._t(
            "panel-header",
            function () {
              return [
                _c(
                  "v-expansion-panel-header",
                  {
                    staticClass: "white--text",
                    attrs: {
                      disabled: Boolean(item.user_id),
                      "hide-actions": Boolean(item.user_id),
                      color: _vm.colour(item),
                    },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "actions",
                          fn: function () {
                            return [
                              _c(
                                "v-btn",
                                { attrs: { icon: "" } },
                                [
                                  _c("v-icon", { staticClass: "white--text" }, [
                                    _vm._v(
                                      "\n              mdi-chevron-down\n            "
                                    ),
                                  ]),
                                ],
                                1
                              ),
                            ]
                          },
                          proxy: true,
                        },
                      ],
                      null,
                      true
                    ),
                  },
                  [
                    _vm._v(" "),
                    _c(
                      "v-row",
                      [
                        _c(
                          "v-col",
                          { attrs: { md: "1", sm: "1" } },
                          [
                            _c("v-icon", { staticClass: "white--text" }, [
                              _vm._v(
                                "\n              " +
                                  _vm._s(item.category_icon) +
                                  "\n            "
                              ),
                            ]),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-col",
                          {
                            staticClass: "white--text",
                            attrs: { md: "4", sm: "6", justify: "center" },
                          },
                          [
                            _vm._v(
                              "\n            " +
                                _vm._s(item.category_name) +
                                "\n          "
                            ),
                          ]
                        ),
                      ],
                      1
                    ),
                  ],
                  1
                ),
              ]
            },
            { list: item, idx: i }
          ),
          _vm._v(" "),
          _vm._t(
            "panel-content",
            function () {
              return [
                item.child.length > 0 || Boolean(item.category_parent)
                  ? _c(
                      "v-expansion-panel-content",
                      { attrs: { color: _vm.colour(item) } },
                      [
                        _vm._t("child", null, { child: item }),
                        _vm._v(" "),
                        _vm._t("btn", null, {
                          show: item.category_parent,
                          data: item,
                        }),
                      ],
                      2
                    )
                  : _vm._e(),
              ]
            },
            { list: item, idx: i }
          ),
        ],
        2
      )
    }),
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/categories/CategoryTableLayout.vue?vue&type=template&id=eac4fd34&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/categories/CategoryTableLayout.vue?vue&type=template&id=eac4fd34&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
        "v-skeleton-loader",
        _vm._b(
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.skeleton.panel,
                expression: "skeleton.panel",
              },
            ],
            attrs: { type: "list-item,list-item,list-item,list-item" },
          },
          "v-skeleton-loader",
          _vm.attrs,
          false
        )
      ),
      _vm._v(" "),
      _c("Expands", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: !_vm.skeleton.panel,
            expression: "!skeleton.panel",
          },
        ],
        attrs: { categories: _vm.listCategories },
        scopedSlots: _vm._u([
          {
            key: "child",
            fn: function (ref) {
              var child = ref.child
              return [
                _c("Expands", {
                  attrs: {
                    categories: child.child,
                    "parent-color": child.category_color,
                  },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "child",
                        fn: function (ref) {
                          var child = ref.child
                          return [
                            child.child.length > 0
                              ? _c("Expands", {
                                  ref: child.category_id,
                                  attrs: {
                                    categories: child.child,
                                    "parent-color": child.category_color,
                                  },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "panel-header",
                                        fn: function (ref) {
                                          var list = ref.list
                                          var idx = ref.idx
                                          return [
                                            _c(
                                              "v-expansion-panel-header",
                                              {
                                                staticClass: "white--text",
                                                attrs: {
                                                  disabled: "",
                                                  value: idx,
                                                  color: _vm.colour(list),
                                                },
                                                scopedSlots: _vm._u(
                                                  [
                                                    {
                                                      key: "actions",
                                                      fn: function () {
                                                        return [
                                                          _c(
                                                            "v-btn",
                                                            {
                                                              attrs: {
                                                                icon: "",
                                                              },
                                                              on: {
                                                                contextmenu:
                                                                  function (
                                                                    $event
                                                                  ) {
                                                                    $event.preventDefault()
                                                                    $event.stopPropagation()
                                                                    return _vm.handleClick(
                                                                      $event,
                                                                      list,
                                                                      idx
                                                                    )
                                                                  },
                                                                click:
                                                                  function (
                                                                    $event
                                                                  ) {
                                                                    $event.preventDefault()
                                                                    $event.stopPropagation()
                                                                    return _vm.handleClick(
                                                                      $event,
                                                                      list,
                                                                      idx
                                                                    )
                                                                  },
                                                              },
                                                            },
                                                            [
                                                              _c(
                                                                "v-icon",
                                                                {
                                                                  staticClass:
                                                                    "white--text",
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    "\n                      mdi-cog\n                    "
                                                                  ),
                                                                ]
                                                              ),
                                                            ],
                                                            1
                                                          ),
                                                        ]
                                                      },
                                                      proxy: true,
                                                    },
                                                  ],
                                                  null,
                                                  true
                                                ),
                                              },
                                              [
                                                _vm._v(" "),
                                                _c(
                                                  "v-row",
                                                  [
                                                    _c(
                                                      "v-col",
                                                      {
                                                        attrs: {
                                                          md: "1",
                                                          sm: "1",
                                                        },
                                                      },
                                                      [
                                                        _c(
                                                          "v-icon",
                                                          {
                                                            staticClass:
                                                              "white--text",
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                      " +
                                                                _vm._s(
                                                                  list.category_icon
                                                                ) +
                                                                "\n                    "
                                                            ),
                                                          ]
                                                        ),
                                                      ],
                                                      1
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "v-col",
                                                      {
                                                        staticClass:
                                                          "white--text",
                                                        attrs: {
                                                          md: "4",
                                                          sm: "6",
                                                          justify: "center",
                                                        },
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                    " +
                                                            _vm._s(
                                                              list.category_name
                                                            ) +
                                                            "\n                  "
                                                        ),
                                                      ]
                                                    ),
                                                  ],
                                                  1
                                                ),
                                              ],
                                              1
                                            ),
                                          ]
                                        },
                                      },
                                      {
                                        key: "panel-content",
                                        fn: function (ref) {
                                          var list = ref.list
                                          var idx = ref.idx
                                          return [
                                            _c(
                                              "v-expansion-panel-content",
                                              [
                                                _c(
                                                  "v-card",
                                                  [
                                                    _c(
                                                      "v-card-text",
                                                      [
                                                        _c(
                                                          "v-container",
                                                          [
                                                            _c(
                                                              "v-form",
                                                              {
                                                                ref: "frmEditCategories",
                                                                attrs: {
                                                                  "lazy-validation":
                                                                    "",
                                                                },
                                                              },
                                                              [
                                                                _c(
                                                                  "v-row",
                                                                  [
                                                                    _c(
                                                                      "v-col",
                                                                      {
                                                                        attrs: {
                                                                          cols: "12",
                                                                          sm: "6",
                                                                          md: "6",
                                                                        },
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "v-text-field",
                                                                          {
                                                                            attrs:
                                                                              {
                                                                                label:
                                                                                  "Name",
                                                                                dense:
                                                                                  "",
                                                                                required:
                                                                                  "",
                                                                              },
                                                                            model:
                                                                              {
                                                                                value:
                                                                                  _vm
                                                                                    .frmEdit
                                                                                    .category_name,
                                                                                callback:
                                                                                  function (
                                                                                    $$v
                                                                                  ) {
                                                                                    _vm.$set(
                                                                                      _vm.frmEdit,
                                                                                      "category_name",
                                                                                      $$v
                                                                                    )
                                                                                  },
                                                                                expression:
                                                                                  "frmEdit.category_name",
                                                                              },
                                                                          }
                                                                        ),
                                                                      ],
                                                                      1
                                                                    ),
                                                                    _vm._v(" "),
                                                                    _c(
                                                                      "v-col",
                                                                      {
                                                                        attrs: {
                                                                          cols: "12",
                                                                          sm: "6",
                                                                          md: "6",
                                                                        },
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "v-select",
                                                                          {
                                                                            attrs:
                                                                              {
                                                                                items:
                                                                                  _vm.iconList,
                                                                                label:
                                                                                  "Icon",
                                                                                dense:
                                                                                  "",
                                                                              },
                                                                            scopedSlots:
                                                                              _vm._u(
                                                                                [
                                                                                  {
                                                                                    key: "item",
                                                                                    fn: function (
                                                                                      ref
                                                                                    ) {
                                                                                      var item =
                                                                                        ref.item
                                                                                      return [
                                                                                        _c(
                                                                                          "v-icon",
                                                                                          [
                                                                                            _vm._v(
                                                                                              _vm._s(
                                                                                                item
                                                                                              )
                                                                                            ),
                                                                                          ]
                                                                                        ),
                                                                                      ]
                                                                                    },
                                                                                  },
                                                                                  {
                                                                                    key: "selection",
                                                                                    fn: function (
                                                                                      ref
                                                                                    ) {
                                                                                      var item =
                                                                                        ref.item
                                                                                      return [
                                                                                        _c(
                                                                                          "v-icon",
                                                                                          [
                                                                                            _vm._v(
                                                                                              _vm._s(
                                                                                                item
                                                                                              )
                                                                                            ),
                                                                                          ]
                                                                                        ),
                                                                                      ]
                                                                                    },
                                                                                  },
                                                                                ],
                                                                                null,
                                                                                true
                                                                              ),
                                                                            model:
                                                                              {
                                                                                value:
                                                                                  _vm
                                                                                    .frmEdit
                                                                                    .category_icon,
                                                                                callback:
                                                                                  function (
                                                                                    $$v
                                                                                  ) {
                                                                                    _vm.$set(
                                                                                      _vm.frmEdit,
                                                                                      "category_icon",
                                                                                      $$v
                                                                                    )
                                                                                  },
                                                                                expression:
                                                                                  "frmEdit.category_icon",
                                                                              },
                                                                          }
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
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "v-card-actions",
                                                      [
                                                        _c("v-spacer"),
                                                        _vm._v(" "),
                                                        _c(
                                                          "v-row",
                                                          {
                                                            attrs: {
                                                              align: "center",
                                                              justify: "end",
                                                            },
                                                          },
                                                          [
                                                            _c(
                                                              "v-col",
                                                              {
                                                                attrs: {
                                                                  sm: "3",
                                                                  md: "6",
                                                                },
                                                              },
                                                              [
                                                                _c(
                                                                  "v-btn",
                                                                  {
                                                                    staticClass:
                                                                      "float-right",
                                                                    attrs: {
                                                                      color:
                                                                        "blue darken-1",
                                                                    },
                                                                    on: {
                                                                      click:
                                                                        function (
                                                                          $event
                                                                        ) {
                                                                          return _vm.optionsClose(
                                                                            list
                                                                          )
                                                                        },
                                                                    },
                                                                  },
                                                                  [
                                                                    _vm._v(
                                                                      "\n                          Close\n                        "
                                                                    ),
                                                                  ]
                                                                ),
                                                              ],
                                                              1
                                                            ),
                                                            _vm._v(" "),
                                                            _c(
                                                              "v-col",
                                                              {
                                                                attrs: {
                                                                  sm: "3",
                                                                  md: "6",
                                                                },
                                                              },
                                                              [
                                                                _c(
                                                                  "v-btn",
                                                                  {
                                                                    staticClass:
                                                                      "float-right",
                                                                    attrs: {
                                                                      color:
                                                                        "warning",
                                                                    },
                                                                    on: {
                                                                      click:
                                                                        _vm.updateCategory,
                                                                    },
                                                                  },
                                                                  [
                                                                    _vm._v(
                                                                      "\n                          Update\n                        "
                                                                    ),
                                                                  ]
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
                                            ),
                                          ]
                                        },
                                      },
                                    ],
                                    null,
                                    true
                                  ),
                                })
                              : _vm._e(),
                          ]
                        },
                      },
                      {
                        key: "btn",
                        fn: function (ref) {
                          var show = ref.show
                          var data = ref.data
                          return [
                            Boolean(show)
                              ? _c(
                                  "v-expansion-panels",
                                  [
                                    _c(
                                      "v-btn",
                                      {
                                        staticClass: "white--text",
                                        attrs: { plain: "" },
                                        on: {
                                          click: function ($event) {
                                            return _vm.popDialog(data)
                                          },
                                        },
                                      },
                                      [
                                        _c("v-icon", [_vm._v("mdi-plus")]),
                                        _vm._v(
                                          "Add more category\n            "
                                        ),
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "v-dialog",
                                      {
                                        attrs: {
                                          persistent: "",
                                          "max-width": "600px",
                                        },
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
                                            _c("v-card-title", [
                                              _c(
                                                "span",
                                                { staticClass: "text-h5" },
                                                [_vm._v("Category")]
                                              ),
                                            ]),
                                            _vm._v(" "),
                                            _c(
                                              "v-card-text",
                                              [
                                                _c(
                                                  "v-container",
                                                  [
                                                    _c(
                                                      "v-form",
                                                      {
                                                        ref: "frmCategories",
                                                        attrs: {
                                                          "lazy-validation": "",
                                                        },
                                                      },
                                                      [
                                                        _c(
                                                          "v-row",
                                                          [
                                                            _c(
                                                              "v-col",
                                                              {
                                                                attrs: {
                                                                  cols: "12",
                                                                  sm: "6",
                                                                  md: "6",
                                                                },
                                                              },
                                                              [
                                                                _c(
                                                                  "v-text-field",
                                                                  {
                                                                    attrs: {
                                                                      label:
                                                                        "Name",
                                                                      required:
                                                                        "",
                                                                      dense: "",
                                                                    },
                                                                    model: {
                                                                      value:
                                                                        _vm.frm
                                                                          .category_name,
                                                                      callback:
                                                                        function (
                                                                          $$v
                                                                        ) {
                                                                          _vm.$set(
                                                                            _vm.frm,
                                                                            "category_name",
                                                                            $$v
                                                                          )
                                                                        },
                                                                      expression:
                                                                        "frm.category_name",
                                                                    },
                                                                  }
                                                                ),
                                                              ],
                                                              1
                                                            ),
                                                            _vm._v(" "),
                                                            _c(
                                                              "v-col",
                                                              {
                                                                attrs: {
                                                                  cols: "12",
                                                                  sm: "6",
                                                                  md: "6",
                                                                },
                                                              },
                                                              [
                                                                _c("v-select", {
                                                                  attrs: {
                                                                    items:
                                                                      _vm.iconList,
                                                                    label:
                                                                      "Icon",
                                                                    dense: "",
                                                                  },
                                                                  scopedSlots:
                                                                    _vm._u(
                                                                      [
                                                                        {
                                                                          key: "item",
                                                                          fn: function (
                                                                            ref
                                                                          ) {
                                                                            var item =
                                                                              ref.item
                                                                            return [
                                                                              _c(
                                                                                "v-icon",
                                                                                [
                                                                                  _vm._v(
                                                                                    _vm._s(
                                                                                      item
                                                                                    )
                                                                                  ),
                                                                                ]
                                                                              ),
                                                                            ]
                                                                          },
                                                                        },
                                                                        {
                                                                          key: "selection",
                                                                          fn: function (
                                                                            ref
                                                                          ) {
                                                                            var item =
                                                                              ref.item
                                                                            return [
                                                                              _c(
                                                                                "v-icon",
                                                                                [
                                                                                  _vm._v(
                                                                                    _vm._s(
                                                                                      item
                                                                                    )
                                                                                  ),
                                                                                ]
                                                                              ),
                                                                            ]
                                                                          },
                                                                        },
                                                                      ],
                                                                      null,
                                                                      true
                                                                    ),
                                                                  model: {
                                                                    value:
                                                                      _vm.frm
                                                                        .category_icon,
                                                                    callback:
                                                                      function (
                                                                        $$v
                                                                      ) {
                                                                        _vm.$set(
                                                                          _vm.frm,
                                                                          "category_icon",
                                                                          $$v
                                                                        )
                                                                      },
                                                                    expression:
                                                                      "frm.category_icon",
                                                                  },
                                                                }),
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
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-card-actions",
                                              [
                                                _c("v-spacer"),
                                                _vm._v(" "),
                                                _c(
                                                  "v-btn",
                                                  {
                                                    attrs: {
                                                      color: "blue darken-1",
                                                    },
                                                    on: {
                                                      click: function ($event) {
                                                        return _vm.popDialog("")
                                                      },
                                                    },
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n                    Close\n                  "
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "v-btn",
                                                  {
                                                    attrs: {
                                                      color: "primary darken-1",
                                                    },
                                                    on: {
                                                      click: _vm.saveCategory,
                                                    },
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n                    Save\n                  "
                                                    ),
                                                  ]
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
                              : _vm._e(),
                          ]
                        },
                      },
                    ],
                    null,
                    true
                  ),
                }),
              ]
            },
          },
        ]),
      }),
      _vm._v(" "),
      _c("context-menu", {
        ref: "ContextMenu",
        attrs: { elementid: "contextmenu", options: _vm.optionsContext },
        on: { "option-clicked": _vm.optionsClicked },
      }),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);