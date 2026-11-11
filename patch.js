
const params = new URLSearchParams(window.location.search);

// Set domain text
const domain = params.get("domain");
if (domain) {
  document.getElementById("domain-text").textContent = domain;
}

// Set header description
const desc = params.get("desc");
if (desc) {
  document.getElementById("header").textContent = desc;
}

// Hide cookie/privacy alert if ?hidecookies exists
if (params.has("hidecookies")) {
  const cookieAlert = document.querySelector(
    'div[role="alert"][aria-label="privacyAlert"]'
  );

  if (cookieAlert) {
    cookieAlert.style.display = "none";
  }
}
