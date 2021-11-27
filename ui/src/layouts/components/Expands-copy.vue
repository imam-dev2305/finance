<template>
  <v-expansion-panels>
    <v-expansion-panel
      v-for="(item,i) in categories"
      :key="i"
    >
      <v-expansion-panel-header
        :disabled="Boolean(item.user_id)"
        :hide-actions="Boolean(item.user_id)"
        :color="colour(item.category_color)"
        class="white--text"
      >
        <template v-slot:actions>
          <v-btn
            icon
          >
            <v-icon class="white--text">
              mdi-chevron-down
            </v-icon>
          </v-btn>
        </template>
        <v-row>
          <v-col
            md="1"
            sm="1"
          >
            <v-icon class="white--text">
              {{ item.category_icon }}
            </v-icon>
          </v-col>
          <v-col
            md="4"
            sm="6"
            justify="center"
            class="white--text"
          >
            {{ item.category_name }}
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content
        v-if="item.child.length > 0 || Boolean(item.category_parent)"
        :color="colour(item.category_color)"
      >
        <Expands
          :category="item.child"
          :parent-color="item.category_color"
        ></Expands>
        <v-expansion-panels v-if="Boolean(item.category_parent)">
          <v-btn
            plain
            class="white--text"
            @click="popDialog(item.category_id)"
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
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-combobox
                        v-model="frm.category_icon"
                        :filter="filter"
                        :hide-no-data="!iconSearch"
                        :items="iconList"
                        :search-input.sync="iconSearch"
                        small-chips
                      >
                        <!-- eslint-disable -->
                        <template v-slot:selection="{attrs, item, parent, selected}">
                          <v-icon
                            v-bind="attrs"
                            :input-value="selected"
                          >{{ item.icon }}</v-icon>
                        </template>
                        <template v-slot:item="{idx, item}">
                          <v-icon :key="idx">
                            {{ item.icon }}
                          </v-icon>
                        </template>
                        <!-- eslint-enable -->
                      </v-combobox>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="popDialog('')"
                >
                  Close
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="saveCategory"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-expansion-panels>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
  export default {
    name: 'Expands',
    props: {
      category: {
        type: Array,
        default() {
          return []
        },
      },
      parentColor: {
        type: String,
        default() {
          return ''
        },
      },
    },
    data() {
      return {
        dialog: false,
        frm: {
          category_parent: '',
          category_name: '',
          category_color: this.parentColor,
          category_icon: '',
        },
        iconList: [
          { text: 'Bus', icon: 'mdi-train' },
          { text: 'Car', icon: 'mdi-car' },
          { text: 'Foods', icon: 'mdi-food' },
          { text: 'Bank', icon: 'mdi-bank' },
          { text: 'Loan', icon: 'mdi-cash-multiple' },
        ],
        iconSearch: '',
        alert: {
          success: false,
          danger: false,
          warning: false,
        },
        alert_message: '',
        d: '',
      }
    },
    computed: {
      categories() {
        if (this.category.length > 0) {
          return this.category
        }

        return this.d
      },
    },
    mounted() {
      this.getCategories()
    },
    methods: {
      getCategories() {
        /* eslint-disable */
        axios.get('categories/get', {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`
          }
        })
        .then((response) => {
          var data = JSON.parse(response.data.data.data)
          this.d = data
        })
      },
      popDialog(id) {
        this.frm.category_parent = id
        this.dialog = !this.dialog
      },
      saveCategory() {
        /* eslint-disable */
        axios.post('categories/save', this.frm, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.bearer}`
          }
        }).then((response) => {
          this.getCategories()
        }).catch((e) => {
          console.log(e)
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
      colour(colour) {
        return colour !== '' ? colour : this.parentColor
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
    },
  }
</script>

<style scoped>
</style>
