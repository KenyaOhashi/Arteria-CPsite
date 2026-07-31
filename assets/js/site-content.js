(() => {
  "use strict";

  const roots = document.querySelectorAll("[data-content-root]");
  const apiUrl = getApiUrl();
  let callbackSequence = 0;

  if (!roots.length) return;

  roots.forEach((root) => {
    const type = root.dataset.contentType;
    if (!apiUrl || !["news", "recruit", "sns"].includes(type)) {
      showLoadError(root);
      return;
    }

    loadPublishedContent(apiUrl, type, root);
  });

  function getApiUrl() {
    try {
      const url = new URL(String(window.ARTERIA_CONTENT_API_URL || ""));
      if (url.protocol !== "https:") return "";
      return url.toString();
    } catch {
      return "";
    }
  }

  function loadPublishedContent(baseUrl, type, root) {
    const callbackName = `__arteriaContent${Date.now()}${callbackSequence++}`;
    const script = document.createElement("script");
    const requestUrl = new URL(baseUrl);
    let completed = false;

    root.setAttribute("aria-busy", "true");
    requestUrl.searchParams.set("type", type);
    requestUrl.searchParams.set("callback", callbackName);
    requestUrl.searchParams.set("_", Date.now().toString());

    const timeoutId = window.setTimeout(() => {
      cleanup();
      showLoadError(root);
    }, 12000);

    window[callbackName] = (payload) => {
      cleanup();

      if (!payload || payload.success !== true || !Array.isArray(payload.items)) {
        showLoadError(root);
        return;
      }

      renderItems(root, type, payload.items);
    };

    script.src = requestUrl.toString();
    script.async = true;
    script.onerror = () => {
      cleanup();
      showLoadError(root);
    };
    document.head.append(script);

    function cleanup() {
      if (completed) return;
      completed = true;
      window.clearTimeout(timeoutId);
      script.remove();
      delete window[callbackName];
      root.removeAttribute("aria-busy");
    }
  }

  function renderItems(root, type, items) {
    if (!items.length) {
      root.dataset.contentState = "empty";
      return;
    }

    const list = element("div", `content-list content-list--${type}`);
    items.forEach((item) => {
      const card = createCard(type, item);
      if (card) list.append(card);
    });

    if (!list.childElementCount) {
      root.dataset.contentState = "empty";
      return;
    }

    root.replaceChildren(list);
    root.dataset.contentState = "ready";
  }

  function createCard(type, item) {
    if (type === "news") return createNewsCard(item);
    if (type === "recruit") return createRecruitCard(item);
    if (type === "sns") return createSnsCard(item);
    return null;
  }

  function createNewsCard(item) {
    if (!text(item.title)) return null;

    const card = element("article", "content-card content-card--news");
    const meta = element("div", "content-card__meta");

    if (text(item.date)) {
      const time = element("time", "content-card__date", text(item.date));
      time.dateTime = text(item.date);
      meta.append(time);
    }
    if (text(item.category)) {
      meta.append(element("span", "content-card__tag", text(item.category)));
    }
    if (meta.childElementCount) card.append(meta);

    card.append(element("h2", "content-card__title", text(item.title)));
    appendParagraph(card, item.summary, "content-card__summary");
    appendParagraph(card, item.body, "content-card__body");
    appendLink(card, item.url, "詳しく見る");
    return card;
  }

  function createRecruitCard(item) {
    if (!text(item.title)) return null;

    const card = element("article", "content-card content-card--recruit");
    card.append(element("span", "content-card__kicker", "OPEN POSITION"));
    card.append(element("h2", "content-card__title", text(item.title)));

    const metaItems = [
      ["雇用形態", item.employment],
      ["勤務地", item.location],
    ].filter(([, value]) => text(value));

    if (metaItems.length) {
      const meta = element("dl", "content-card__details");
      metaItems.forEach(([label, value]) => {
        meta.append(element("dt", "", label), element("dd", "", text(value)));
      });
      card.append(meta);
    }

    appendParagraph(card, item.description, "content-card__body");

    if (text(item.requirements)) {
      const requirements = element("div", "content-card__requirements");
      requirements.append(element("h3", "", "応募条件"), element("p", "", text(item.requirements)));
      card.append(requirements);
    }

    appendLink(card, item.url, "応募・詳細を見る");
    return card;
  }

  function createSnsCard(item) {
    if (!text(item.network) || !safeExternalUrl(item.url)) return null;

    const card = element("article", "content-card content-card--sns");
    card.append(element("span", "content-card__kicker", "OFFICIAL ACCOUNT"));
    card.append(element("h2", "content-card__title", text(item.network)));
    appendParagraph(card, item.account, "content-card__account");
    appendParagraph(card, item.description, "content-card__body");
    appendLink(card, item.url, "公式アカウントを見る");
    return card;
  }

  function appendParagraph(parent, value, className) {
    if (text(value)) parent.append(element("p", className, text(value)));
  }

  function appendLink(parent, value, label) {
    const url = safeExternalUrl(value);
    if (!url) return;

    const link = element("a", "content-card__link");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.append(document.createTextNode(label), element("span", "", "→"));
    parent.append(link);
  }

  function safeExternalUrl(value) {
    try {
      const url = new URL(text(value));
      return ["https:", "http:"].includes(url.protocol) ? url.toString() : "";
    } catch {
      return "";
    }
  }

  function showLoadError(root) {
    root.removeAttribute("aria-busy");
    root.dataset.contentState = "error";

    const heading = root.querySelector("[data-content-fallback-title]");
    const message = root.querySelector("[data-content-fallback-message]");
    if (heading) heading.textContent = "情報を読み込めませんでした。";
    if (message) message.textContent = "時間をおいて、もう一度ページを開いてください。";
  }

  function element(tagName, className, value) {
    const node = document.createElement(tagName);
    if (className) node.className = className;
    if (value) node.textContent = value;
    return node;
  }

  function text(value) {
    return String(value || "").trim();
  }
})();
