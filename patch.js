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

  // Only remove cookies when ?hidecookies is present.
  if (!params.has("hidecookies")) return;

  function removeCookies() {
    document.querySelectorAll("#privacy_widget").forEach(widget => {
      widget.remove();
    });

    document.querySelectorAll('[aria-label="privacyAlert"]').forEach(alert => {
      alert.remove();
    });
  }

  // Remove immediately.
  removeCookies();

  // Keep watching for GoDaddy injecting the banner again.
  const observer = new MutationObserver(() => {
    removeCookies();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
