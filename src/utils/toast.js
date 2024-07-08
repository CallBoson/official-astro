export const toast = (content) => {
  const dom = document.createElement("div");
  const toastClass =
    "min-w-[250px] bg-[rgba(0,0,0,.8)] text-white text-center rounded p-4 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[99]";
  document.body.appendChild(dom);
  dom.setAttribute("class", toastClass);
  dom.innerHTML = content;
  setTimeout(() => {
    dom.remove();
  }, 1500);
};
