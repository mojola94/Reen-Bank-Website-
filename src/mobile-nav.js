const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const appLayout = document.querySelector(".app-layout");

if (mobileNavToggle && appLayout) {
  const closeMenu = () => {
    appLayout.classList.remove("mobile-nav-open");
    mobileNavToggle.setAttribute("aria-expanded", "false");
    mobileNavToggle.setAttribute("aria-label", "Open dashboard navigation");
  };

  mobileNavToggle.addEventListener("click", () => {
    const isOpen = appLayout.classList.toggle("mobile-nav-open");
    mobileNavToggle.setAttribute("aria-expanded", String(isOpen));
    mobileNavToggle.setAttribute(
      "aria-label",
      isOpen ? "Close dashboard navigation" : "Open dashboard navigation",
    );
  });

  document.addEventListener("click", (event) => {
    if (!appLayout.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}
