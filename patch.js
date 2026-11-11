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

  // Show or hide phone numbers.
  if (!params.has("showPhone")) {
    document.querySelectorAll(
      '[data-testid="phone-number-group"]'
    ).forEach(group => {
      group.remove();
    });
  }
})();
