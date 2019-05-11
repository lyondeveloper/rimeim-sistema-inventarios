export const removeUserInBottomPage = () => {
  window.onscroll = () => {};
};

export const onUserInBottomPage = function_to_run => {
  window.onscroll = function(ev) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      function_to_run();
    }
  };
};
