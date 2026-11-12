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

  // Configure links.
  function configureLinks() {
    document.querySelectorAll("a").forEach(link => {
      const url = link.href;

      // Allow only the Trustpilot link, redirecting it through Internet Archive.
      if (
        url &&
        (url.includes("trustpilot.com") ||
         link.textContent.toLowerCase().includes("trustpilot"))
      ) {
        if (!link.dataset.archiveLink) {
          link.href = "https://web.archive.org/web/" + url;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.style.pointerEvents = "auto";
          link.style.cursor = "pointer";
          link.dataset.archiveLink = "true";
        }
      } else {
        // Disable all other links.
        link.removeAttribute("href");
        link.removeAttribute("target");
        link.style.pointerEvents = "none";
        link.style.cursor = "default";
      }
    });
  }

  configureLinks();

  // Prevent clicks on all links except the Trustpilot Internet Archive link.
  document.addEventListener("click", event => {
    const link = event.target.closest("a");

    if (link && !link.dataset.archiveLink) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);

  // Handle dynamically added links.
  const observer = new MutationObserver(configureLinks);

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
