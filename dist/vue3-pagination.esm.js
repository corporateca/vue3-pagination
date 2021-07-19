import {openBlock,createBlock,createVNode,defineComponent,computed,pushScopeId,popScopeId,resolveComponent,withModifiers,toDisplayString,withScopeId,createCommentVNode,Fragment,renderList}from'vue';const _hoisted_1 = {
  viewBox: "0 0 8 2",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2 = /*#__PURE__*/createVNode("path", {
  d: "M2.24 1c0 .556-.445 1-1 1-.556 0-1-.444-1-1s.444-1 1-1c.555 0 1 .444 1 1zm5.333 0c0 .556-.444 1-1 1-.555 0-1-.444-1-1s.445-1 1-1c.556 0 1 .444 1 1z",
  fill: "#BBB"
}, null, -1 /* HOISTED */);

function render(_ctx, _cache) {
  return (openBlock(), createBlock("svg", _hoisted_1, [
    _hoisted_2
  ]))
}var script = defineComponent({
    name: 'VPage',
    components: { IconPaginationDots: render },
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
        removeURLParameter(url, parameter) {
            //prefer to use l.search if you have a location/link object
            const urlparts = url.split('?');
            if (urlparts.length >= 2) {
                const prefix = encodeURIComponent(parameter) + '=';
                const pars = urlparts[1].split(/[&;]/g);
                //reverse iteration as may be destructive
                for (let i = pars.length; i-- > 0;) {
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
        href() {
            if (this.page != 1) {
                return this.currentUrl.replace(/(page=)[^\&]+/, '$1' + this.page);
            }
            else {
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
});const _withId = /*#__PURE__*/withScopeId("data-v-060ca318");

pushScopeId("data-v-060ca318");
const _hoisted_1$1 = {
  key: 0,
  class: "DotsHolder"
};
const _hoisted_2$1 = { key: 1 };
popScopeId();

const render$1 = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_icon_pagination_dots = resolveComponent("icon-pagination-dots");

  return (openBlock(), createBlock("li", null, [
    (_ctx.page === null)
      ? (openBlock(), createBlock("span", _hoisted_1$1, [
          createVNode(_component_icon_pagination_dots, { class: "Dots" })
        ]))
      : (openBlock(), createBlock("span", _hoisted_2$1, [
          (!_ctx.isActive)
            ? (openBlock(), createBlock("a", {
                key: 0,
                href: _ctx.href,
                class: ["Page", { 'Page-active': _ctx.isActive }],
                type: "button",
                "aria-label": `Go to page ${_ctx.page}`,
                style: `background-color: ${_ctx.isActive ? _ctx.activeColor : 'transparent'};`,
                onClick: _cache[1] || (_cache[1] = withModifiers((...args) => (_ctx.clickHandler && _ctx.clickHandler(...args)), ["prevent"]))
              }, toDisplayString(_ctx.page), 15 /* TEXT, CLASS, STYLE, PROPS */, ["href", "aria-label"]))
            : (openBlock(), createBlock("button", {
                key: 1,
                class: ["Page", { 'Page-active': _ctx.isActive }],
                type: "button",
                "aria-label": `Go to page ${_ctx.page}`,
                style: `background-color: ${_ctx.isActive ? _ctx.activeColor : 'transparent'};`,
                onClick: _cache[2] || (_cache[2] = withModifiers((...args) => (_ctx.clickHandler && _ctx.clickHandler(...args)), ["prevent"]))
              }, toDisplayString(_ctx.page), 15 /* TEXT, CLASS, STYLE, PROPS */, ["aria-label"]))
        ]))
  ]))
});script.render = render$1;
script.__scopeId = "data-v-060ca318";
script.__file = "src/components/atoms/VPage.vue";// import IconPageFirst from '../assets/icons/page-first.svg';
// import IconPageLast from '../assets/icons/page-last.svg';
// import IconChevronLeft from '../assets/icons/chevron-left.svg';
// import IconChevronRight from '../assets/icons/chevron-right.svg';
var script$1 = defineComponent({
    name: 'VPagination',
    components: { /* IconPageFirst, IconChevronLeft, IconChevronRight, IconPageLast, */ VPage: script },
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
            default: ''
        }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        // pagination
        const pagination = computed(() => {
            const res = [];
            const minPaginationElems = 5 + props.rangeSize * 2;
            let rangeStart = props.pages <= minPaginationElems ? 1 : props.modelValue - props.rangeSize;
            let rangeEnd = props.pages <= minPaginationElems ? props.pages : props.modelValue + props.rangeSize;
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
                }
                else {
                    res.push(1);
                    res.push(null);
                }
                if (isEndBoundaryReached) {
                    rangeStart = props.pages - (minPaginationElems - 3);
                    for (let i = rangeStart; i <= props.pages; i++) {
                        res.push(i);
                    }
                }
                else {
                    for (let i = rangeStart; i <= rangeEnd; i++) {
                        res.push(i);
                    }
                    res.push(null);
                    res.push(props.pages);
                }
            }
            else {
                for (let i = rangeStart; i <= rangeEnd; i++) {
                    res.push(i);
                }
            }
            return res;
        });
        function updatePageHandler(params) {
            emit('update:modelValue', params);
        }
        // controls
        const isPrevControlsActive = computed(() => {
            return props.modelValue > 1;
        });
        const isNextControlsActive = computed(() => {
            return props.modelValue < props.pages;
        });
        function goToFirst() {
            if (isPrevControlsActive.value) {
                emit('update:modelValue', 1);
            }
        }
        function goToPrev() {
            if (isPrevControlsActive.value) {
                emit('update:modelValue', props.modelValue - 1);
            }
        }
        function goToLast() {
            if (isNextControlsActive.value) {
                emit('update:modelValue', props.pages);
            }
        }
        function goToNext() {
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
});const _withId$1 = /*#__PURE__*/withScopeId("data-v-2a30deb0");

pushScopeId("data-v-2a30deb0");
const _hoisted_1$2 = { class: "Pagination" };
popScopeId();

const render$2 = /*#__PURE__*/_withId$1((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_v_page = resolveComponent("v-page");

  return (openBlock(), createBlock("ul", _hoisted_1$2, [
    createCommentVNode(" <li v-if=\"!hideFirstButton\" class=\"PaginationControl\">\n      <icon-page-first\n        class=\"Control\"\n        :class=\"{ 'Control-active': isPrevControlsActive }\"\n        @click=\"goToFirst\"\n      />\n    </li>\n    <li class=\"PaginationControl\">\n      <icon-chevron-left\n        class=\"Control\"\n        :class=\"{ 'Control-active': isPrevControlsActive }\"\n        @click=\"goToPrev\"\n      />\n    </li> "),
    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.pagination, (page) => {
      return (openBlock(), createBlock(_component_v_page, {
        key: `pagination-page-${page}`,
        page: page,
        current: _ctx.modelValue,
        "active-color": _ctx.activeColor,
        currentUrl: _ctx.currentUrl,
        onUpdate: _ctx.updatePageHandler
      }, null, 8 /* PROPS */, ["page", "current", "active-color", "currentUrl", "onUpdate"]))
    }), 128 /* KEYED_FRAGMENT */)),
    createCommentVNode(" <li class=\"PaginationControl\">\n      <icon-chevron-right\n        class=\"Control\"\n        :class=\"{ 'Control-active': isNextControlsActive }\"\n        @click=\"goToNext\"\n      />\n    </li>\n    <li v-if=\"!hideLastButton\" class=\"PaginationControl\">\n      <icon-page-last\n        class=\"Control\"\n        :class=\"{ 'Control-active': isNextControlsActive }\"\n        @click=\"goToLast\"\n      />\n    </li> ")
  ]))
});script$1.render = render$2;
script$1.__scopeId = "data-v-2a30deb0";
script$1.__file = "src/components/VPagination.vue";export default script$1;