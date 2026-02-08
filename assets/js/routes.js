// /assets/js/routes.js
(function () {
  /**
   * Ermittelt den "Base Path" automatisch:
   * - Repo-Seite: https://username.github.io/repo/  => base = "/repo/"
   * - User-Seite: https://username.github.io/       => base = "/"
   * - Eigene Domain: https://deinedomain.de/        => base = "/"
   */
  function getBasePath() {
    const host = window.location.hostname.toLowerCase();
    const path = window.location.pathname;

    const isGithubIo = host.endsWith("github.io");
    const parts = path.split("/").filter(Boolean); // z.B. ["meine-webseite", "...]

    // Wenn GitHub-Repo-Pages: erstes Segment ist Repo-Name
    if (isGithubIo && parts.length >= 1 && !host.startsWith(parts[0] + ".")) {
      return `/${parts[0]}/`;
    }

    // User-/Org-Pages oder Custom Domain
    return "/";
  }

  const base = getBasePath();

  // Mapping: Button/Card-ID -> Zielordner
  const routes = {
    "card-blue-process": "blue-process/",
    "card-lokal-chatbot": "lokal-chatbot/",
    "card-blue-chatbot": "blue-chatbot/",
    "card-blue-ai-voice-agent": "blue-ai-voice-agent/",
  };

  // Macht ganze Karten klickbar, ohne dein Layout umzubauen
  Object.entries(routes).forEach(([id, target]) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.style.cursor = "pointer";
    el.addEventListener("click", () => {
      window.location.href = base + target;
    });

    // Optional: "Enter" auf der Karte
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "link");
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter") window.location.href = base + target;
    });
  });
})();
