<template>
  <div>
    <ul
      :id="elementid"
      v-click-outside="onClickOutside"
      class="vue-simple-context-menu"
    >
      <li
        v-for="(opt, i) in options"
        :key="i"
        class="vue-simple-context-menu__item"
        @click.stop="optionClicked(opt)"
      >
        <span>{{ opt.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import Vue from 'vue'
  import vClickOutside from 'v-click-outside'

  Vue.use(vClickOutside)

  export default {
    name: 'ContextMenu',
    props: {
      elementid: {
        type: String,
        required: true,
        default() {
          return ''
        },
      },
      options: {
        type: Array,
        required: true,
        default() {
          return []
        },
      },
    },
    data() {
      return {
        item: null,
        idx: null,
        menuWidth: null,
        menuHeight: null,
      }
    },
    methods: {
      showMenu(event, item, idx) {
        this.item = item
        this.idx = idx

        const menu = document.getElementById(this.elementid)
        if (!menu) {
          return
        }

        if (!this.menuWidth || !this.menuHeight) {
          menu.style.visibility = 'hidden'
          menu.style.display = 'block'
          this.menuWidth = menu.offsetWidth
          this.menuHeight = menu.offsetHeight
          menu.removeAttribute('style')
        }

        if (this.menuWidth + event.pageX >= window.innerWidth) {
          menu.style.left = `${(event.pageX - (this.menuWidth + 2))}px`
        } else {
          menu.style.left = `${(event.pageX - (window.innerWidth / 4))}px`
        }

        if (this.menuHeight + event.pageY >= window.innerHeight) {
          menu.style.top = `${(event.pageY - this.menuHeight)}px`
        } else {
          menu.style.top = `${(event.pageY - 90)}px`
        }

        menu.classList.add('vue-simple-context-menu--active')
      },
      hideContextMenu() {
        const element = document.getElementById(this.elementid)
        if (element) {
          element.classList.remove('vue-simple-context-menu--active')
          this.$emit('menu-closed')
        }
      },
      onClickOutside() {
        this.hideContextMenu()
      },
      optionClicked(option) {
        this.hideContextMenu()
        this.$emit('option-clicked', {
          item: this.item,
          idx: this.idx,
          option,
        })
      },
    },
  }
</script>

<style lang="scss">
  $light-grey: #ecf0f1;
  $grey: darken($light-grey, 15%);
  $blue: #007aff;
  $white: #fff;
  $black: #333;

  .vue-simple-context-menu {
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    display: none;
    list-style: none;
    position: absolute;
    z-index: 1000000;
    background-color: $light-grey;
    border-bottom-width: 0px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    box-shadow: 0 3px 6px 0 rgba($black, 0.2);
    border-radius: 4px;

    &--active {
      display: block;
    }

    &__item {
      display: flex;
      color: $black;
      cursor: pointer;
      padding: 5px 15px;
      align-items: center;

      &:hover {
        background-color: $blue;
        color: $white;
      }
    }

    &__divider {
      box-sizing: content-box;
      height: 2px;
      background-color: $grey;
      padding: 4px 0;
      background-clip: content-box;
      pointer-events: none;
    }

    // Have to use the element so we can make use of `first-of-type` and
    // `last-of-type`
    li {
      &:first-of-type {
        margin-top: 4px;
      }

      &:last-of-type {
        margin-bottom: 4px;
      }
    }
  }
</style>
