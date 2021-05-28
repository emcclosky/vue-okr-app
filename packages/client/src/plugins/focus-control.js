export default {
  mounted() {
    const body = document.body;

    document.addEventListener("click", function (event) {
      if (body.classList.contains("tabbed")) {
        return body.classList.remove("tabbed");
      }
    });

    document.addEventListener("keyup", (event) => {
      if (event.key === "Tab") {
        return body.classList.add("tabbed");
      }
    });
  },
};
