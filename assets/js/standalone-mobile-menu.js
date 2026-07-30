function initializeMobileMenu() {
  const header = document.querySelector("body > header");
  if (!header || header.querySelector(".standalone-mobile-menu")) return;

  const desktopNavigation = Array.from(header.children).find(
    (element) => element.tagName === "NAV",
  );
  const contactLink = Array.from(header.children).find((element) =>
    element.classList.contains("contact"),
  );
  if (!desktopNavigation) return;

  const details = document.createElement("details");
  details.className = "standalone-mobile-menu";

  const summary = document.createElement("summary");
  summary.textContent = "MENU";
  summary.setAttribute("aria-label", "メニューを開く");

  const navigation = document.createElement("nav");
  navigation.setAttribute("aria-label", "モバイルナビゲーション");
  navigation.innerHTML = desktopNavigation.innerHTML;

  if (contactLink) {
    const mobileContact = contactLink.cloneNode(true);
    mobileContact.classList.remove("contact");
    navigation.append(mobileContact);
  }

  navigation.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest("a")) details.open = false;
  });

  details.append(summary, navigation);
  header.insertBefore(details, contactLink ?? null);
  document.documentElement.classList.add("standalone-mobile-ready");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeMobileMenu, { once: true });
} else {
  initializeMobileMenu();
}
