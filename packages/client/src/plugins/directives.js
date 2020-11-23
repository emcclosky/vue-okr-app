let handleOutsideClick;

// Vue.directive('click-outside', {
export default {
  // beforeMount(el, binding, vnode) {
  //   handleOutsideClick = (e) => {
  //     e.stopPropagation();
  //     const { handler, exclude } = binding.value;
  //     console.log('vnode',vnode)
  //     console.log(binding)
  //     let clickedOnExcludedEl = false;
  //     exclude.forEach(refName => {
  //       if (!clickedOnExcludedEl) {
  //         if(vnode.context.$refs[refName]) {
  //           const excludedEl = vnode.context.$refs[refName];
  //           clickedOnExcludedEl = excludedEl.contains(e.target);
  //         }
  //       }
  //     });

  //     if (!el.contains(e.target) && !clickedOnExcludedEl) {
  //       vnode.context[handler](e);
  //     }
  //   }
  //   document.addEventListener('click', handleOutsideClick);
  //   document.addEventListener('touchstart', handleOutsideClick);
  // },

  // unbind () {
  //   document.removeEventListener('click', handleOutsideClick);
  //   document.removeEventListener('touchstart', handleOutsideClick);
  // }
}

// });