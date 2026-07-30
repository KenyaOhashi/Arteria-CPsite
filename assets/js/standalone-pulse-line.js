(() => {
  const pathData = [
    "M124 0",
    "C118 120 140 190 122 300",
    "C106 400 130 455 122 520",
    "L122 610 L98 630 L146 650 L116 675 L124 720",
    "C134 840 105 930 123 1040",
    "C141 1160 108 1280 122 1390",
    "C126 1450 120 1510 118 1600",
  ].join(" ");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const wrapper = document.createElement("div");
  wrapper.className = "arteria-pulse-line";
  wrapper.setAttribute("aria-hidden", "true");
  wrapper.innerHTML = `
    <svg viewBox="0 0 240 1600" preserveAspectRatio="none">
      <defs>
        <linearGradient id="standalone-artery-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#7a1423"></stop>
          <stop offset="0.48" stop-color="#a51f34"></stop>
          <stop offset="1" stop-color="#5f0f1b"></stop>
        </linearGradient>
        <filter id="standalone-pulse-glow" x="-100%" y="-20%" width="300%" height="140%">
          <feGaussianBlur stdDeviation="3.2" result="blur"></feGaussianBlur>
          <feMerge><feMergeNode in="blur"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge>
        </filter>
      </defs>
      <path class="arteria-pulse-line__track" d="${pathData}"></path>
      <path class="arteria-pulse-line__active" d="${pathData}" pathLength="1"></path>
      <circle class="arteria-pulse-line__node" r="5"></circle>
    </svg>`;

  document.body.prepend(wrapper);

  const active = wrapper.querySelector(".arteria-pulse-line__active");
  const node = wrapper.querySelector(".arteria-pulse-line__node");
  const pathLength = active.getTotalLength();
  let frame = 0;

  const render = () => {
    frame = 0;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = reducedMotion.matches
      ? 1
      : Math.min(1, Math.max(0, window.scrollY / maxScroll));
    active.style.strokeDasharray = `${progress} 1`;
    const point = active.getPointAtLength(pathLength * progress);
    node.setAttribute("cx", point.x.toFixed(2));
    node.setAttribute("cy", point.y.toFixed(2));
  };

  const requestRender = () => {
    if (!frame) frame = window.requestAnimationFrame(render);
  };

  window.addEventListener("scroll", requestRender, { passive: true });
  window.addEventListener("resize", requestRender, { passive: true });
  reducedMotion.addEventListener?.("change", requestRender);
  render();
})();
