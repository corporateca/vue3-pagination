<template>
  <ul class="Pagination">
    <li v-if="!hideFirstButton" class="PaginationControl">
      <a
        v-if="isPrevControlsActive"
        :href="removeURLParameter(currentUrl, 'page')"
        @click.prevent=""
      >
        <icon-page-first
          class="Control"
          :class="{ 'Control-active': isPrevControlsActive }"
          @click="goToFirst"
        />
      </a>

      <icon-page-first
        v-else
        class="Control"
        :class="{ 'Control-active': isPrevControlsActive }"
        @click="goToFirst"
      />
    </li>

    <li class="PaginationControl">
      <a v-if="isPrevControlsActive" :key="prevKey" :href="prevHref" @click.prevent="prevKey++">
        <icon-chevron-left
          class="Control"
          :class="{ 'Control-active': isPrevControlsActive }"
          @click="goToPrev"
        />
      </a>

      <icon-chevron-left
        v-else
        class="Control"
        :class="{ 'Control-active': isPrevControlsActive }"
        @click="goToPrev"
      />
    </li>

    <v-page
      v-for="page in pagination"
      :key="`pagination-page-${page}`"
      :page="page"
      :current="modelValue"
      :active-color="activeColor"
      :currentUrl="currentUrl"
      @update="updatePageHandler"
    />

    <li class="PaginationControl">
      <a v-if="isNextControlsActive" :key="nextKey" :href="nextHref" @click.prevent="nextKey++">
        <icon-chevron-right
          class="Control"
          :class="{ 'Control-active': isNextControlsActive }"
          @click="goToNext"
        />
      </a>
      <icon-chevron-right
        v-else
        class="Control"
        :class="{ 'Control-active': isNextControlsActive }"
        @click="goToNext"
      />
    </li>
    <li v-if="!hideLastButton" class="PaginationControl">
      <a v-if="isNextControlsActive" :href="currentUrl.replace(/(page=)[^\&]+/, '$1' + pages)" @click.prevent="">
        <icon-page-last
          class="Control"
          :class="{ 'Control-active': isNextControlsActive }"
          @click="goToLast"
        />
      </a>

      <icon-page-last
        v-else
        class="Control"
        :class="{ 'Control-active': isNextControlsActive }"
        @click="goToLast"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import VPage from './atoms/VPage.vue';
import IconPageFirst from '../assets/icons/page-first.svg';
import IconPageLast from '../assets/icons/page-last.svg';
import IconChevronLeft from '../assets/icons/chevron-left.svg';
import IconChevronRight from '../assets/icons/chevron-right.svg';

export default defineComponent({
  name: 'VPagination',
  components: { IconPageFirst, IconChevronLeft, IconChevronRight, IconPageLast, VPage },
  props: {
    pages: {
      type: Number,
      default: 0,
    },
    rangeSize: {
      type: Number,
      default: 1,
    },
    modelValue: {
      type: Number,
      default: 0,
    },
    activeColor: {
      type: String,
      default: '#DCEDFF',
    },
    hideFirstButton: {
      type: Boolean,
      default: false,
    },
    hideLastButton: {
      type: Boolean,
      default: false,
    },
    currentUrl: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],

  data() {
    return {
      prevKey: 0,
      nextKey: 0,
    };
  },

  computed: {
    prevHref(): any {
      if (this.modelValue != 2) {
        return this.currentUrl.replace(/(page=)[^\&]+/, '$1' + (this.modelValue - 1));
      } else {
        return this.removeURLParameter(this.currentUrl, 'page');
      }
    },

    nextHref(): any {
      return this.currentUrl.replace(/(page=)[^\&]+/, '$1' + (this.modelValue + 1));
    },
  },

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

  setup(props, { emit }) {
    // pagination
    const pagination = computed((): (number | null)[] => {
      const res = [];
      const minPaginationElems = 5 + props.rangeSize * 2;

      let rangeStart = props.pages <= minPaginationElems ? 1 : props.modelValue - props.rangeSize;
      let rangeEnd =
        props.pages <= minPaginationElems ? props.pages : props.modelValue + props.rangeSize;

      rangeEnd = rangeEnd > props.pages ? props.pages : rangeEnd;
      rangeStart = rangeStart < 1 ? 1 : rangeStart;

      if (props.pages > minPaginationElems) {
        const isStartBoundaryReached = rangeStart - 1 < 3;
        const isEndBoundaryReached = props.pages - rangeEnd < 3;

        if (isStartBoundaryReached) {
          rangeEnd = minPaginationElems - 2;
          for (let i = 1; i < rangeStart; i++) {
            res.push(i);
          }
        } else {
          res.push(1);
          res.push(null);
        }

        if (isEndBoundaryReached) {
          rangeStart = props.pages - (minPaginationElems - 3);
          for (let i = rangeStart; i <= props.pages; i++) {
            res.push(i);
          }
        } else {
          for (let i = rangeStart; i <= rangeEnd; i++) {
            res.push(i);
          }
          res.push(null);
          res.push(props.pages);
        }
      } else {
        for (let i = rangeStart; i <= rangeEnd; i++) {
          res.push(i);
        }
      }

      return res;
    });

    function updatePageHandler(params: number) {
      emit('update:modelValue', params);
    }

    // controls
    const isPrevControlsActive = computed((): boolean => {
      return props.modelValue > 1;
    });
    const isNextControlsActive = computed((): boolean => {
      return props.modelValue < props.pages;
    });

    function goToFirst(): void {
      if (isPrevControlsActive.value) {
        emit('update:modelValue', 1);
      }
    }
    function goToPrev(): void {
      if (isPrevControlsActive.value) {
        emit('update:modelValue', props.modelValue - 1);
      }
    }

    function goToLast(): void {
      if (isNextControlsActive.value) {
        emit('update:modelValue', props.pages);
      }
    }
    function goToNext(): void {
      if (isNextControlsActive.value) {
        emit('update:modelValue', props.modelValue + 1);
      }
    }

    return {
      pagination,
      updatePageHandler,
      isPrevControlsActive,
      isNextControlsActive,
      goToFirst,
      goToLast,
      goToPrev,
      goToNext,
    };
  },
});
</script>

<style scoped lang="scss">
@import './src/assets/styles/_settings.scss';

.Pagination {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.PaginationControl {
  display: flex;
  align-items: center;
}

.Control {
  position: relative;
  display: block;
  width: 18px;
  height: 18px;
  margin: 0 2px;
  fill: $grey_01;

  &-active {
    fill: $black_01;
    cursor: pointer;
    transition: fill 0.2s ease-in-out;

    &:hover {
      fill: $black_00;
      transition: fill 0.2s ease-in-out;
    }
  }
}
</style>


