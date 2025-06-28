// Set a cookie
function setCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Get a cookie
function getCookie(name) {
  return decodeURIComponent(
    document.cookie
      .split("; ")
      .find(row => row.startsWith(name + "="))
      ?.split("=")[1] || ""
  );
}

// Apply saved preferences
function applyPreferences() {
  const fontSize = getCookie("fontsize") || "16";
  const fontColor = getCookie("fontcolor") || "#000000";

  document.documentElement.style.setProperty("--fontsize", fontSize + "px");
  document.documentElement.style.setProperty("--fontcolor", fontColor);

  document.getElementById("fontsize").value = fontSize;
  document.getElementById("fontcolor").value = fontColor;
}

// Wait for DOM to load before running scripts
document.addEventListener("DOMContentLoaded", () => {
  applyPreferences();

  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const fontSize = document.getElementById("fontsize").value;
    const fontColor = document.getElementById("fontcolor").value;

    setCookie("fontsize", fontSize);
    setCookie("fontcolor", fontColor);

    applyPreferences();
  });
});
