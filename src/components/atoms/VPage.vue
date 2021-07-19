<template>
  <li>
    <span v-if="page === null" class="DotsHolder">
      <icon-pagination-dots class="Dots" />
    </span>
    <span v-else>
      <a
        v-if="!isActive"
        :href="href"
        class="Page"
        type="button"
        :aria-label="`Go to page ${page}`"
        :class="{ 'Page-active': isActive }"
        :style="`background-color: ${isActive ? activeColor : 'transparent'};`"
        @click.prevent="clickHandler"
      >
        {{ page }}
      </a>
      <button
        v-else
        class="Page"
        type="button"
        :aria-label="`Go to page ${page}`"
        :class="{ 'Page-active': isActive }"
        :style="`background-color: ${isActive ? activeColor : 'transparent'};`"
        @click.prevent="clickHandler"
      >
        {{ page }}
      </button>
    </span>
  </li>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import IconPaginationDots from '../../assets/icons/pagination-dots.svg';

export default defineComponent({
  name: 'VPage',
  components: { IconPaginationDots },
  props: {
    page: {
      type: Number,
      default: null,
    },
    current: {
      type: Number,
      default: 0,
    },
    activeColor: {
      type: String,
      default: '#DCEDFF',
    },
    currentUrl: {
      type: String,
      default: '',
    },
  },
  emits: ['update'],

  methods: {
    removeURLParameter(url: any, parameter: any) {
      //prefer to use l.search if you have a location/link object
      const urlparts = url.split('?');
      if (urlparts.length >= 2) {
        const prefix = encodeURIComponent(parameter) + '=';
        const pars = urlparts[1].split(/[&;]/g);

        //reverse iteration as may be destructive
        for (let i = pars.length; i-- > 0; ) {
          //idiom for string.startsWith
          if (pars[i].lastIndexOf(prefix, 0) !== -1) {
            pars.splice(i, 1);
          }
        }

        return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
      }
      return url;
    },
  },

  computed: {
    href(): any {
      if (this.page != 1) {
        return this.currentUrl.replace(/(page=)[^\&]+/, '$1' + this.page);
      } else {
        return this.removeURLParameter(this.currentUrl, 'page');
      }
    },
  },

  setup(props, { emit }) {
    const isActive = computed(() => {
      return props.page === props.current;
    });

    function clickHandler() {
      emit('update', props.page);
    }

    return { isActive, clickHandler };
  },
});
</script>

<style scoped lang="scss">
@import './src/assets/styles/_settings.scss';

.Page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  margin: 0 2px;
  color: $black_02;
  background-color: transparent;
  font-size: 14px;
  border-radius: 3px;
  box-sizing: border-box;
  border-color: transparent;
  cursor: pointer;
  outline: 0;
  user-select: none;

  &:hover {
    border: 1px solid $grey_02;
  }

  &-active {
    color: $black_01;
    border: 1px solid $grey_02;
  }
}

.DotsHolder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  margin: 0 2px;
  box-sizing: border-box;
}

.Dots {
  width: 8px;
  height: 4px;
  fill: $grey_01;
}
</style>



