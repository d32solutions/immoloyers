// Choix de la langue : ?lang=xx, sinon langue enregistrée, sinon langue du navigateur.
(function () {
  var langs = ["fr", "nl", "de", "en"];
  function pick() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q && langs.indexOf(q) >= 0) return q;
    try { var s = localStorage.getItem("il-lang"); if (s && langs.indexOf(s) >= 0) return s; } catch (e) {}
    var n = (navigator.language || "fr").slice(0, 2).toLowerCase();
    return langs.indexOf(n) >= 0 ? n : "en";
  }
  function apply(l) {
    document.documentElement.lang = l;
    try { localStorage.setItem("il-lang", l); } catch (e) {}
    document.querySelectorAll("nav.lang button").forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-set") === l);
    });
    document.querySelectorAll("a[data-keep-lang]").forEach(function (a) {
      a.href = a.getAttribute("href").split("?")[0] + "?lang=" + l;
    });
  }
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("nav.lang button").forEach(function (b) {
      b.addEventListener("click", function () { apply(b.getAttribute("data-set")); });
    });
    apply(pick());
  });
})();
