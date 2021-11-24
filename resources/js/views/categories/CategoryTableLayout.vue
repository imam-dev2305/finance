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
                    <v-btn
                      icon
                      @contextmenu.prevent.stop="handleClick($event, list, idx)"
                      @click.prevent.stop="handleClick($event, list, idx)"
                    >
                      <v-icon class="white--text">
                        mdi-cog
                      </v-icon>
                    </v-btn>
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
                      <v-row
                        align="center"
                        justify="end"
                      >
                        <v-col
                          sm="3"
                          md="6"
                        >
                          <v-btn
                            color="blue darken-1"
                            @click="optionsClose(list)"
                            class="float-right"
                          >
                            Close
                          </v-btn>
                        </v-col>
                        <v-col
                          sm="3"
                          md="6"
                        >
                          <v-btn
                            color="warning"
                            @click="updateCategory"
                            class="float-right"
                          >
                            Update
                          </v-btn>
                        </v-col>
                      </v-row>
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
                  <v-card-title>
                    <span class="text-h5">Category</span>
                  </v-card-title>
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
                      color="blue darken-1"
                      @click="popDialog('')"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      color="primary darken-1"
                      @click="saveCategory"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-expansion-panels>
          </template>
        </Expands>
      </template>
    </Expands>
    <context-menu
      :ref="'ContextMenu'"
      :elementid="'contextmenu'"
      :options="optionsContext"
      @option-clicked="optionsClicked"
    >
    </context-menu>
  </div>
</template>

<script>
  import Expands from '../../layouts/components/Expands.vue'
  import ContextMenu from '../../layouts/components/ContextMenu.vue'

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
        frmEdit: {
          category_id: '',
          category_parent: '',
          category_name: '',
          category_color: this.parentColor,
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
      }
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
              this.alert.danger = true
              this.alert_message = data.message
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
          this.getListCategories()
          this.optionsClose(this.frmEdit)
          this.$refs.frmEditCategories.reset()
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
              this.alert.danger = true
              this.alert_message = data.message
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
      optionsClicked(event) {
        event.option.actions(event)
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
          this.getListCategories()
          this.optionsClose(this.frmEdit)
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
              this.alert.danger = true
              this.alert_message = data.message
              break
          }
        })
      },
      handleClick(event, item, idx) {
        this.$refs.ContextMenu.showMenu(event, item, idx)
      },
    },
    components: { Expands, ContextMenu },
    template: { Expands, ContextMenu },
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
