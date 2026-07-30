const entry = document.getElementById("entry");
document.getElementById("enter").addEventListener("click", () => {
  entry.classList.add("show-logo");
  setTimeout(() => entry.classList.add("done"), 1650);
});
const observer = new IntersectionObserver(
  (items) =>
    items.forEach((item) => {
      if (item.isIntersecting) item.target.classList.add("in");
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
