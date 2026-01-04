const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");
const toastEl = document.getElementById("toast");
function toast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(window.__t);
  window.__t = setTimeout(()=>toastEl.classList.remove("show"), 1600);
}
const saved = localStorage.getItem("theme");
if(saved) root.setAttribute("data-theme", saved);
themeBtn.textContent = (root.getAttribute("data-theme")==="light") ? "☀️" : "🌙";
themeBtn.addEventListener("click", ()=>{
  const cur = root.getAttribute("data-theme") || "dark";
  const next = cur === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  themeBtn.textContent = next === "light" ? "☀️" : "🌙";
  toast(`Theme: ${next}`);
});

// You can edit these items to your real academic history
const data = [
  { when:"2023–Now", title:"Universiti Teknikal Malaysia Melaka (UTeM)", type:"Degree",
    logo:"assets/logos/utem.png",
    desc:"Bachelor Of Computer Science (Software Development) with Honours. (CGPA : 3.59)",
    badges:["HCI","Software Development","AI"],
    more:"Key highlights: group projects, prototypes, documentation (SRS/SDD), usability testing."
  },
  { when:"2022–2023", title:"Kolej Matrikulasi Kejuteraan Pahang (KMKPH)", type:"Matriculation",
    logo:"assets/logos/kmkph.png",
    desc:"Matriculation in Basic Engineering. (CGPA : 3.89) ",
    badges:["Engineering","Physics","Chemistry","Math"],
    more:"Learning Pre-University level subjects to prepare for degree studies. \nJoining programs and clubs for extracurricular development."
  },
  { when:"2021", title:"Sekolah Menengah Kebangsaan Telok Panglima Garang (SMKTPH)", type:"SPM",
    logo:"assets/logos/smktpg.png",
    desc:"SPM Examination (Grade: 5A 3B 1C )",
    badges:["Technical Communication Graphics","Physics","Add Math","Chemistry"],
    more:"Extracurriculars: Leadership, sport activities, Kadet Remaja Sekolah(KRS)."
  }
];


const timeline = document.getElementById("timeline");

function render(filter="all"){
  timeline.innerHTML = "";
  const items = data.filter(x => filter === "all" ? true : x.type === filter);

  if(items.length === 0){
    const empty = document.createElement("div");
    empty.className = "card item";
    empty.innerHTML = `<div class="meta"><h2>No items</h2><p class="muted">Try another filter.</p></div>`;
    timeline.appendChild(empty);
    return;
  }

  items.forEach((x)=>{
    const el = document.createElement("div");
    el.className = "card item";

    el.innerHTML = `
      <div class="when">
        <img class="eduLogoSide" src="${x.logo}" alt="${x.title} logo"
             onerror="this.style.display='none'">
        <div class="whenYear">${x.when}</div>
        ${x.range ? `<div class="whenRange">${x.range}</div>` : ""}
      </div>

      <div class="meta">
        <h2>${x.title}</h2>
        <p>${x.desc}</p>
        <div class="badges">
          ${x.badges.map(b=>`<span class="badge">${b}</span>`).join("")}
        </div>
        <div class="more">${x.more}</div>
      </div>
    `;

    el.addEventListener("click", (ev)=>{
      // ripple
      const r = document.createElement("span");
      r.className = "ripple";
      const rect = el.getBoundingClientRect();
      const xPos = ev.clientX - rect.left;
      const yPos = ev.clientY - rect.top;
      r.style.left = xPos + "px";
      r.style.top = yPos + "px";
      el.appendChild(r);
      setTimeout(()=>r.remove(), 650);

      // toggle
      el.classList.toggle("open");
      toast(el.classList.contains("open") ? "Expanded" : "Collapsed");
    });

    timeline.appendChild(el); // ✅ IMPORTANT
  });
}

render();


document.getElementById("filters").addEventListener("click", (e)=>{
  const btn = e.target.closest(".chip");
  if(!btn) return;
  document.querySelectorAll(".chip").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  render(btn.dataset.filter);
  toast(`Filter: ${btn.textContent}`);
});

/* ===============================
   BOTTOM CONNECT CARD
================================ */
.connectCard{
  margin-top: 18px;      /* space from form section */
  padding: 18px;
}

.connectCard h2{
  margin: 0 0 6px;
}

.socialGrid{
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
}

.socialBtn{
  text-align: center;
  padding: 12px 14px;
  border-radius: 16px;
  border: 1px solid var(--line);
  background: rgba(255,255,255,.04);
  font-weight: 600;
  transition: .15s ease;
}

.socialBtn:hover{
  transform: translateY(-2px);
  border-color: rgba(96,165,250,.45);
}

/* Light mode polish */
:root[data-theme="light"] .socialBtn{
  background: rgba(255,255,255,.85);
}
