(() => {
  const params = new URLSearchParams(window.location.search);

  const allowedArchiveUrl = "https://web.archive.org/web/20250730003241/https://www.trustpilot.com/review/godaddy.com";
  const originalTrustpilotUrl = "https://www.trustpilot.com/review/godaddy.com";

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

  // Update call text.
  const callText = params.get("calltext");

  if (callText !== null) {
    const callTextElement = document.querySelector("h5.m-4");

    if (callTextElement) {
      callTextElement.textContent = callText;
    }
  }

  // Remove the entire phone numbers row when disabled.
  if (!params.has("showPhone")) {
    document.querySelectorAll(".row.mt-4.mb-4").forEach(row => {
      if (row.querySelector('[data-testid="phone-number-group"]')) {
        row.remove();
      }
    });
  }

  // Configure all links.
  function configureLinks() {
    document.querySelectorAll("a").forEach(link => {
      const href = link.getAttribute("href");

      if (href === allowedArchiveUrl) {
        link.href = originalTrustpilotUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.style.pointerEvents = "auto";
        link.style.cursor = "pointer";
        link.dataset.allowedLink = "true";
      } else {
        link.removeAttribute("href");
        link.removeAttribute("target");
        link.removeAttribute("onclick");
        link.style.pointerEvents = "none";
        link.style.cursor = "default";
        delete link.dataset.allowedLink;
      }
    });
  }

  configureLinks();

  // Block every link click except the allowed Trustpilot link.
  document.addEventListener("click", event => {
    const link = event.target.closest("a");

    if (link && !link.dataset.allowedLink) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  // Handle dynamically added or modified links.
  const observer = new MutationObserver(configureLinks);

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["href"]
  });
})();
