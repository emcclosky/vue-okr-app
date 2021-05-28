export default {
  beforeMount(el, binding, vnode) {
    el.handleOutsideClick = (e) => {
      e.stopPropagation();
      const { handler, exclude } = binding.value;
      let clickedOnExcludedEl = false;
      exclude.forEach((refName) => {
        if (!clickedOnExcludedEl) {
          if (binding.instance.$refs[refName]) {
            const excludedEl = binding.instance.$refs[refName];
            clickedOnExcludedEl = excludedEl.contains(e.target);
          }
        }
      });

      if (!el.contains(e.target) && !clickedOnExcludedEl) {
        binding.instance[handler](e, el);
      }
    };
    document.addEventListener("click", el.handleOutsideClick);
    document.addEventListener("touchstart", el.handleOutsideClick);
  },

  unmounted(el) {
    document.removeEventListener("click", el.handleOutsideClick);
    document.removeEventListener("touchstart", el.handleOutsideClick);
  },
};
