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

  // Hide cookie banner by detecting its text
  if (params.has("hidecookies")) {
    const cookieText =
      "We serve cookies. We use tools, such as cookies, to enable essential services and functionality on our site";

    const hideCookies = () => {
      // First try the original selector
      document.querySelectorAll(
        'div[role="alert"][aria-label="privacyAlert"]'
      ).forEach(el => {
        el.style.setProperty("display", "none", "important");
      });

      // Search for the cookie banner text
      document.querySelectorAll("body *").forEach(el => {
        if (
          el.children.length === 0 &&
          el.textContent.includes("We serve cookies.")
        ) {
          // Find the parent containing the whole banner
          let parent = el;

          for (let i = 0; i < 6 && parent.parentElement; i++) {
            parent = parent.parentElement;

            if (
              parent.textContent.includes("Privacy Policy") &&
              parent.textContent.includes("Accept") &&
              parent.textContent.includes("Decline") &&
              parent.textContent.includes("Manage")
            ) {
              parent.style.setProperty(
                "display",
                "none",
                "important"
              );
              break;
            }
          }
        }
      });
    };

    // Initial check
    hideCookies();

    // Watch for dynamically added or modified content
    const observer = new MutationObserver(hideCookies);

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["style", "class"]
    });
  }
})();
