const select = (el) => {
  return document.querySelector(el);
};

const selectAll = (el) => {
  return document.querySelectorAll(el);
};

const alertMessage = (text, options, level, callback) => {
  const elem = document.createElement("div");
  switch (level) {
    case "error":
      color = options.colors?.error ?? "#c23616";
      break;
    case "success":
      color = options.colors?.success ?? "#6ab04c";
      break;
    case "info":
      color = options.colors?.success ?? "#487eb0";
      break;
    default:
      break;
  }
  options.top = options?.top ?? "0px";
  options.left = options?.left ?? "0px";
  options.width = options.width ?? "100vw";
  options.height = options.height ?? "80px";
  options.duration = options.duration ?? 1500;

  elem.style.cssText = `
        display: none;
        position: fixed;
        box-sizing: border-box;
        top: ${options.top};
        left: ${options.left};
        width: ${options.width};
        height: ${options.height};
        background-color: ${color};
        line-height: ${options.height};
        text-align: center;
        font-size: 1.8rem;
        color: white;
        z-index: 100;
    `;

  const content = document.createTextNode(text);
  elem.appendChild(content);
  document.body.appendChild(elem);

  fadeIn(elem, {
    complete: () => {
      if (typeof callback === "function") {
        callback();
      }
      setTimeout(() => {
        fadeOut(elem, () => {
          elem.remove();
        });
      }, options.duration);
    },
  });
};

const fadeIn = (el, options) => {
  el.style.opacity = 0;
  el.style.display = options.display || "block";
  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += 0.1) > 1)) {
      el.style.opacity = val;
      if (el.style.opacity == 1 && typeof options.complete === "function") {
        options.complete();
      }
      requestAnimationFrame(fade);
    }
  })();
};

const fadeOut = (el, options) => {
  el.style.opacity = 1;
  (function fade() {
    if ((el.style.opacity -= 0.1) < 0) {
      el.style.display = "none";
    } else {
      if (el.style.opacity == 0 && typeof options.complete === "function") {
        options.complete();
      }
      requestAnimationFrame(fade);
    }
  })();
};
