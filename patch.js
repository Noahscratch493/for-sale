
(() => {
  const params = new URLSearchParams(window.location.search);

  // Update domain and description.
  const domain = params.get("domain");
  const desc = params.get("desc");

  const domainElement = document.getElementById("domain-text");
  const headerElement = document.getElementById("header");

  if (domain && domainElement) {
    domainElement.textContent = domain;
  }

  if (desc && headerElement) {
    headerElement.textContent = desc;
  }

  // Only hide cookies when ?hidecookies is present.
  if (!params.has("hidecookies")) return;

  function hideCookies() {
    const widget = document.getElementById("privacy_widget");

    if (widget && !widget.hidden) {
      widget.hidden = true;
      widget.style.setProperty("display", "none", "important");
    }
  }

  // Try immediately.
  hideCookies();

  // Also catch the widget if GoDaddy adds it later.
  const observer = new MutationObserver(hideCookies);

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
