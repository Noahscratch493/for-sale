(() => {
  const params = new URLSearchParams(window.location.search);

  // Change domain text
  const domain = params.get("domain");
  if (domain) {
    const el = document.getElementById("domain-text");
    if (el) el.textContent = domain;
  }

  // Change header description
  const desc = params.get("desc");
  if (desc) {
    const el = document.getElementById("header");
    if (el) el.textContent = desc;
  }

  // Hide cookie banner
  if (params.has("hidecookies")) {
    const selector =
      'div[role="alert"][aria-label="privacyAlert"]';

    const hideCookies = () => {
      document.querySelectorAll(selector).forEach(banner => {
        banner.style.setProperty("display", "none", "important");
      });
    };

    // Initial check
    hideCookies();

    // Watch for dynamically inserted cookie banners
    const observer = new MutationObserver(() => {
      hideCookies();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"]
    });
  }
})();
