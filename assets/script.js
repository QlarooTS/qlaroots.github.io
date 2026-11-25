(function () {
  "use strict";

  var config = window.ZALTETT2_CONFIG || {
    downloadUrl: "./downloads/Zaltett2.zip",
    fileName: "Zaltett2.zip",
    defaultServerUrl: "https://8000-isx0bdbob8dt55f541oxm.e2b.app",
    serverDisplay: "https://8000-isx0bdbob8dt55f541oxm.e2b.app"
  };

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Default server URL: one value for the whole page ---------- */
  var defaultServer = config.defaultServerUrl || config.serverDisplay;
  document.querySelectorAll(".js-server-url").forEach(function (el) {
    if (el.tagName === "A") {
      el.setAttribute("href", defaultServer);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    }
    el.textContent = defaultServer;
  });

  /* ---------- Toast ---------- */
  var toast = document.getElementById("toast");
  var toastTimer;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 3600);
  }

  /* ---------- Download buttons ---------- */
  var isDriveFolder = /drive\.google\.com\/drive\/(folders|u\/\d+\/folders)/i.test(config.downloadUrl);

  document.querySelectorAll(".js-download").forEach(function (link) {
    link.setAttribute("href", config.downloadUrl);

    // Атрибут download игнорируется для чужих доменов — убираем его,
    // чтобы не вводить пользователя в заблуждение.
    var sameOrigin = false;
    try {
      sameOrigin = new URL(config.downloadUrl, window.location.href).origin === window.location.origin;
    } catch (e) {
      sameOrigin = false;
    }

    if (sameOrigin) {
      link.setAttribute("download", config.fileName || "Zaltett2.zip");
    } else {
      link.removeAttribute("download");
    }

    link.addEventListener("click", function (event) {
      if (isDriveFolder) {
        event.preventDefault();
        showToast("Это ссылка на папку. Открой её и скачай ZIP вручную (см. README).");
        return;
      }
      showToast(
        sameOrigin
          ? "Скачивание началось · " + (config.fileName || "Zaltett2.zip")
          : "Открываем страницу загрузки ZIP…"
      );
    });
  });

  if (isDriveFolder) {
    console.warn("[Zaltett2] Укажи в config.js прямую ссылку на ZIP-файл, а не на папку Google Drive.");
  }

  /* ---------- Header shadow on scroll ---------- */
  var header = document.getElementById("header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 18);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (!reduceMotion && "IntersectionObserver" in window) {
    document.body.classList.add("reveal-ready");
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- One open FAQ item at a time ---------- */
  document.querySelectorAll(".faq__item").forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      document.querySelectorAll(".faq__item").forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---------- Typing effect in the browser mock ---------- */
  var typed = document.getElementById("typed");
  if (typed && !reduceMotion) {
    var text = config.serverDisplay || defaultServer;
    typed.textContent = "";
    var i = 0;
    var typing = setInterval(function () {
      typed.textContent = text.slice(0, ++i);
      if (i >= text.length) clearInterval(typing);
    }, 45);
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
