<template>
  <div>
    <v-skeleton-loader
      v-show="skeleton.panel"
      v-bind="attrs"
      type="list-item,list-item,list-item,list-item"
    ></v-skeleton-loader>
    <Expands
      v-show="!skeleton.panel"
      :categories="listCategories"
    >
      <template
        slot="child"
        slot-scope="{child}"
      >
        <Expands
          :categories="child.child"
          :parent-color="child.category_color"
        >
          <template
            slot="child"
            slot-scope="{child}"
          >
            <Expands
              v-if="child.child.length > 0"
              :ref="child.category_id"
              :categories="child.child"
              :parent-color="child.category_color"
            >
              <template
                slot="panel-header"
                slot-scope="{list, idx}"
              >
                <v-expansion-panel-header
                  disabled
                  :value="idx"
                  :color="colour(list)"
                  class="white--text"
                >
                  <template v-slot:actions>
                    <v-menu
                      bottom
                      right
                      offset-y
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon class="white--text">mdi-dots-vertical</v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item
                          @click="editContext({item: list, idx})"
                        >
                          <v-list-item-title>Edit</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          @click="deleteContext({item: list, idx})"
                        >
                          <v-list-item-title>Delete</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </template>
                  <v-row>
                    <v-col
                      md="1"
                      sm="1"
                    >
                      <v-icon class="white--text">
                        {{ list.category_icon }}
                      </v-icon>
                    </v-col>
                    <v-col
                      md="4"
                      sm="6"
                      justify="center"
                      class="white--text"
                    >
                      {{ list.category_name }}
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
              </template>
              <template
                slot="panel-content"
                slot-scope="{list, idx}"
              >
                <v-expansion-panel-content>
                  <v-card>
                    <v-card-text>
                      <v-container>
                        <v-form
                          ref="frmEditCategories"
                          lazy-validation
                        >
                          <v-row>
                            <v-col
                              cols="12"
                              sm="6"
                              md="6"
                            >
                              <v-text-field
                                v-model="frmEdit.category_name"
                                label="Name"
                                dense
                                required
                                :error-count="frmEditError.category_name.length"
                                :error-messages="frmEditError.category_name"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="6"
                            >
                              <v-select
                                v-model="frmEdit.category_icon"
                                :items="iconList"
                                label="Icon"
                                dense
                                :error-count="frmEditError.category_icon.length"
                                :error-messages="frmEditError.category_icon"
                              >
                                <template
                                  slot="item"
                                  slot-scope="{item}"
                                >
                                  <v-icon>{{ item }}</v-icon>
                                </template>
                                <template
                                  slot="selection"
                                  slot-scope="{item}"
                                >
                                  <v-icon>{{ item }}</v-icon>
                                </template>
                              </v-select>
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        icon
                        outlined
                        title="Close"
                        color="default"
                        @click="optionsClose(list)"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-btn
                        icon
                        outlined
                        title="Update"
                        color="warning"
                        @click="updateCategory"
                      >
                        <v-icon>mdi-content-save-edit-outline</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-expansion-panel-content>
              </template>
            </Expands>
          </template>
          <template
            slot="btn"
            slot-scope="{show, data}"
          >
            <v-expansion-panels v-if="Boolean(show)">
              <v-btn
                plain
                class="white--text"
                @click="popDialog(data)"
              >
                <v-icon>mdi-plus</v-icon>Add more category
              </v-btn>
              <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
              >
                <v-card>
                  <v-toolbar
                    dark
                    color="primary"
                  >
                    <v-btn
                      icon
                      dark
                      @click="popDialog('')"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Category</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn
                      icon
                      outlined
                      @click="saveCategory"
                    >
                      <v-icon>mdi-content-save</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                    <v-container>
                      <v-form
                        ref="frmCategories"
                        lazy-validation
                      >
                        <v-row>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              v-model="frm.category_name"
                              label="Name"
                              required
                              dense
                              :error-count="frmError.category_name.length"
                              :error-messages="frmError.category_name"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-select
                              v-model="frm.category_icon"
                              :items="iconList"
                              label="Icon"
                              dense
                              :error-count="frmError.category_icon.length"
                              :error-messages="frmError.category_icon"
                            >
                              <template
                                slot="item"
                                slot-scope="{item}"
                              >
                                <v-icon>{{ item }}</v-icon>
                              </template>
                              <template
                                slot="selection"
                                slot-scope="{item}"
                              >
                                <v-icon>{{ item }}</v-icon>
                              </template>
                            </v-select>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-expansion-panels>
          </template>
        </Expands>
      </template>
    </Expands>
    <v-snackbar
      v-model="snackbar.value"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
    >
      {{snackbar.message}}
    </v-snackbar>
  </div>
</template>

<script>
  import Expands from '../../layouts/components/Expands.vue'

  export default {
    name: 'CategoryTableLayout',
    data() {
      return {
        dialog: false,
        listCategories: [],
        frm: {
          category_parent: '',
          category_name: '',
          category_color: this.parentColor,
          category_icon: '',
        },
        frmError: {
          category_parent: '',
          category_name: '',
          category_color: '',
          category_icon: '',
        },
        frmEdit: {
          category_id: '',
          category_parent: '',
          category_name: '',
          category_color: this.parentColor,
          category_icon: '',
        },
        frmEditError: {
          category_id: '',
          category_parent: '',
          category_name: '',
          category_color: '',
          category_icon: '',
        },
        iconList: [
          'mdi-train', 'mdi-car', 'mdi-food', 'mdi-bank', 'mdi-cash-multiple',
          'mdi-parking', 'mdi-car', 'mdi-gas-station', 'mdi-coffee', 'mdi-tshirt-crew',
          'mdi-bottle-tonic', 'mdi-currency-usd', 'mdi-hammer-screwdriver',
        ],
        iconSearch: '',
        optionsContext: [
          {
            name: 'Edit',
            actions: this.editContext,
          },
          {
            name: 'Delete',
            actions: this.deleteContext,
          },
        ],
        attrs: {
          class: 'mb-6',
          boilerplate: true,
          elevation: 2,
        },
        skeleton: {
          panel: true,
        },
        snackbar: {
          value: false,
          timeout: 2000,
          message: '',
          color: 'success',
        },
      }
    },
    watch: {
      // eslint-disable-next-line
      'frm.category_name': function () {
        this.frmError.category_name = ''
      },
      // eslint-disable-next-line
      'frm.category_color': function () {
        this.frmError.category_color = ''
      },
      // eslint-disable-next-line
      'frmEdit.category_name': function () {
        this.frmEditError.category_name = ''
      },
      // eslint-disable-next-line
      'frmEdit.category_icon': function () {
        this.frmEditError.category_icon = ''
      },
    },
    mounted() {
      this.getListCategories()
    },
    methods: {
      getListCategories() {
        /* eslint-disable */
        axios.get('categories/get', {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`
          }
        })
          .then((response) => {
            var data = JSON.parse(response.data.data.data)
            this.listCategories = data
            this.skeleton.panel = false
          })
      },
      colour(colour) {
        return colour.category_color !== '' ? colour.category_color : this.parentColor
      },
      popDialog(id) {
        if (typeof this.$refs.frmCategories !== 'undefined') {
          this.frmError.category_name = ''
          this.frmError.category_icon = ''
        }
        this.frm.category_parent = id.category_id
        this.frm.category_color = id.category_color
        this.dialog = !this.dialog
      },
      saveCategory() {
        /* eslint-disable */
        axios.post('categories/save', this.frm, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`
          }
        }).then((response) => {
          this.getListCategories()
          this.dialog = !this.dialog
          this.$refs.frmCategories.reset()
          this.snackbar.value = true
          this.snackbar.color = 'success'
          this.snackbar.message = response.data.message
        }).catch((e) => {
          var data = e.response.data
          switch (data.flag) {
            case 2:
              Object.keys(this.frmError).forEach((key) => {
                if (key in data.message) {
                  this.frmError[key] = data.message[key]
                } else {
                  this.frmError[key] = ''
                }
              })
              break
            case 3:
            default:
              this.snackbar.value = true
              this.snackbar.color = 'warning'
              this.snackbar.message = data.message
              break
          }
        })
      },
      updateCategory() {
        axios.post('categories/edit', this.frmEdit, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`
          }
        }).then((response) => {
          this.optionsClose(this.frmEdit)
          this.getListCategories()
          this.$refs.frmEditCategories.reset()
          this.snackbar.value = true
          this.snackbar.color = 'success'
          this.snackbar.message = response.data.message
        }).catch((e) => {
          var data = e.response.data
          switch (data.flag) {
            case 2:
              Object.keys(this.frmError).forEach((key) => {
                if (key in data.message) {
                  this.frmEditError[key] = data.message[key]
                } else {
                  this.frmEditError[key] = ''
                }
              })
              break
            case 3:
            default:
              this.snackbar.value = true
              this.snackbar.color = 'warning'
              this.snackbar.message = data.message
              break
          }
        })
      },
      filter(item, queryText, itemText) {
        if (item.header) return false

        const hasValue = val => (val != null ? val : '')

        const text = hasValue(itemText)
        const query = hasValue(queryText)

        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      },
      optionsClose(item) {
        this.frmEdit = {
          category_id: '',
          category_parent: '',
          category_name: '',
          category_color: '',
          category_icon: '',
        }
        this.$refs[item.category_parent].showPanels([])
      },
      editContext(event) {
        if (this.frmEdit.category_parent) {
          this.$refs[this.frmEdit.category_parent].showPanels([])
        }
        this.frmEdit.category_id = event.item.category_id
        this.frmEdit.category_name = event.item.category_name
        this.frmEdit.category_parent = event.item.category_parent
        this.frmEdit.category_color = event.item.category_color
        this.frmEdit.category_icon = event.item.category_icon
        this.$refs[event.item.category_parent].showPanels([event.idx])
      },
      deleteContext(event) {
        axios.post('categories/delete', event.item, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`
          }
        }).then((response) => {
          this.snackbar.value = true
          this.snackbar.color = 'success'
          this.snackbar.message = response.data.message
          this.getListCategories()
        }).catch((e) => {
          var data = e.response.data
          switch (data.flag) {
            case 2:
              this.alert.danger = false
              this.alert.success = false
              Object.keys(this.frmError).forEach((key) => {
                if (key in data.message) {
                  this.frmError[key] = data.message[key]
                } else {
                  this.frmError[key] = ''
                }
              })
              break
            case 3:
            default:
              this.snackbar.value = true
              this.snackbar.color = 'warning'
              this.snackbar.message = data.message
              break
          }
        })
      },
    },
    components: { Expands },
    template: { Expands },
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
