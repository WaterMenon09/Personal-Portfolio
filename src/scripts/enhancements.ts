// Timeline reveal — the only IntersectionObserver on the site.
const motionOK = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
if (motionOK) {
  const items = document.querySelectorAll(".timeline .entry");
  if (items.length) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.4 },
    );
    items.forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${i * 60}ms`;
      io.observe(el);
    });
  }
}

// Konami: ↑↑↓↓←→←→BA → achievement toast + branch flip. Never touches content.
const SEQ = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
let pos = 0;
window.addEventListener("keydown", (e) => {
  pos = e.key === SEQ[pos] ? pos + 1 : e.key === SEQ[0] ? 1 : 0;
  if (pos !== SEQ.length) return;
  pos = 0;
  const branch = document.querySelector("[data-branch]");
  if (branch) {
    branch.textContent = "main ";
    const flag = document.createElement("span");
    flag.style.color = "var(--danger)";
    flag.textContent = "✗ cheats-enabled";
    branch.appendChild(flag);
  }
  if (document.querySelector(".toast")) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.textContent = 'achievement unlocked: konami — mail menonpranto@gmail.com with subject "konami" for +1 reply priority';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 9000);
});
export {};
