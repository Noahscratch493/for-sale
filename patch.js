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
})();
