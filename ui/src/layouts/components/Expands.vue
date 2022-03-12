<template>
  <v-expansion-panels
    v-model="panels"
    multiple
  >
    <v-expansion-panel
      v-for="(item,i) in categories"
      :key="i"
    >
      <slot
        name="panel-header"
        :list="item"
        :idx="i"
      >
        <v-expansion-panel-header
          :disabled="Boolean(item.user_id)"
          :hide-actions="Boolean(item.user_id)"
          :color="colour(item)"
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
      </slot>
      <slot
        name="panel-content"
        :list="item"
        :idx="i"
      >
        <v-expansion-panel-content
          v-if="((item.hasOwnProperty('children_categories') && item.children_categories.length > 0) || (item.hasOwnProperty('categories') && item.categories.length > 0)) || Boolean(item.category_parent)"
          :color="colour(item)"
        >
          <slot
            name="child"
            :child="item"
          ></slot>
          <slot
            name="btn"
            :show="item.category_parent"
            :data="item"
          ></slot>
        </v-expansion-panel-content>
      </slot>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
  export default {
    name: 'Expands',
    props: {
      categories: {
        type: Array,
        default() {
          return []
        },
        required: true,
      },
      parentColor: {
        type: String,
        default() {
          return ''
        },
      },
      refs: {
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
        showBtn: true,
        iconSearch: '',
        panels: [],
      }
    },
    methods: {
      showPanels(idx) {
        this.panels = idx
      },
      colour(colour) {
        this.showBtn = Boolean(colour.category_parent)

        return colour.category_color !== '' ? colour.category_color : this.parentColor
      },
    },
  }
</script>

<style scoped>
</style>
