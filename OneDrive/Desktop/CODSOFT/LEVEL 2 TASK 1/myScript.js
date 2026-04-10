
// ─── DATA ────────────────────────────────────────────────────────────────────
const JOBS = [
  {id:1,title:"Senior Frontend Developer",company:"TechCorp",logo:"TC",lbg:"#EBF0FE",lc:"#1A56DB",location:"Remote",type:"Full-time",category:"Engineering",salary:"₹18–25 LPA",posted:"2 days ago",featured:true,
   desc:"Join our product team to build world-class web applications used by millions. You'll lead frontend architecture decisions and mentor junior developers.",
   requirements:["5+ years of React experience","Strong TypeScript skills","Experience with state management (Redux/Zustand)","Good eye for design and UX"],
   skills:["React","TypeScript","GraphQL","Node.js","Figma"]},
  {id:2,title:"Product Manager",company:"GrowthCo",logo:"GC",lbg:"#E6F5EE",lc:"#0A7A4A",location:"Bangalore",type:"Full-time",category:"Product",salary:"₹22–30 LPA",posted:"1 day ago",featured:true,
   desc:"Lead product strategy and roadmap for our flagship SaaS product serving 500K+ users.",
   requirements:["3+ years PM experience","Strong analytical and communication skills","Experience with agile methodologies"],
   skills:["Roadmapping","Agile","Data Analysis","SQL","Figma"]},
  {id:3,title:"Data Scientist",company:"Analytics AI",logo:"AA",lbg:"#EDE9FE",lc:"#5521B5",location:"Hyderabad",type:"Full-time",category:"Data",salary:"₹15–22 LPA",posted:"3 days ago",featured:false,
   desc:"Build ML models powering our product recommendation engine. Work with petabytes of user data.",
   requirements:["Proficiency in Python & ML libraries","Strong statistics background","Experience with big data tools"],
   skills:["Python","TensorFlow","PyTorch","SQL","Spark"]},
  {id:4,title:"DevOps Engineer",company:"CloudBase",logo:"CB",lbg:"#FEF3C7",lc:"#92400E",location:"Pune",type:"Contract",category:"Engineering",salary:"₹12–18 LPA",posted:"5 days ago",featured:false,
   desc:"Own and evolve our CI/CD pipelines and cloud infrastructure on AWS and GCP.",
   requirements:["AWS or GCP certification preferred","Kubernetes administration experience","Strong scripting in Bash/Python"],
   skills:["AWS","Kubernetes","Docker","Terraform","Jenkins"]},
  {id:5,title:"UX Designer",company:"DesignHub",logo:"DH",lbg:"#FEE2E2",lc:"#991B1B",location:"Mumbai",type:"Full-time",category:"Design",salary:"₹10–15 LPA",posted:"1 week ago",featured:true,
   desc:"Design intuitive, beautiful user experiences for our suite of enterprise products.",
   requirements:["Strong Figma proficiency","Portfolio demonstrating end-to-end design","User research and usability testing skills"],
   skills:["Figma","UX Research","Prototyping","Design Systems","Accessibility"]},
  {id:6,title:"Backend Engineer",company:"ScaleTech",logo:"ST",lbg:"#EBF0FE",lc:"#1A56DB",location:"Remote",type:"Full-time",category:"Engineering",salary:"₹16–24 LPA",posted:"4 days ago",featured:false,
   desc:"Build highly scalable backend services handling millions of requests per day.",
   requirements:["Node.js or Go experience","Database design expertise","REST and GraphQL API design"],
   skills:["Node.js","PostgreSQL","Redis","Docker","Go"]},
  {id:7,title:"Marketing Manager",company:"BrandUp",logo:"BU",lbg:"#FEF3C7",lc:"#92400E",location:"Delhi",type:"Full-time",category:"Marketing",salary:"₹8–14 LPA",posted:"2 weeks ago",featured:false,
   desc:"Own our content and performance marketing strategy to drive 3x growth in inbound leads.",
   requirements:["5+ years digital marketing","SEO/SEM expertise","Content strategy experience"],
   skills:["SEO","Google Ads","Analytics","Content Marketing","HubSpot"]},
  {id:8,title:"Sales Executive",company:"RevGrow",logo:"RG",lbg:"#E6F5EE",lc:"#0A7A4A",location:"Chennai",type:"Full-time",category:"Sales",salary:"₹6–10 LPA + commission",posted:"1 week ago",featured:false,
   desc:"Drive enterprise revenue by acquiring and growing key accounts in the BFSI sector.",
   requirements:["B2B enterprise sales experience","CRM proficiency (Salesforce)","Strong negotiation and presentation skills"],
   skills:["Salesforce","Enterprise Sales","Demos","Negotiation"]},
  {id:9,title:"iOS Developer",company:"AppStudio",logo:"AS",lbg:"#EDE9FE",lc:"#5521B5",location:"Bangalore",type:"Full-time",category:"Engineering",salary:"₹14–20 LPA",posted:"6 days ago",featured:false,
   desc:"Build polished iOS applications for our fintech product with 2M+ active users.",
   requirements:["Swift proficiency","UIKit and SwiftUI experience","App Store publishing experience"],
   skills:["Swift","SwiftUI","UIKit","CoreData","XCode"]}
];

const MY_APPLICATIONS = [
  {id:1,job:"Senior Frontend Developer",company:"TechCorp",date:"Apr 5, 2026",status:"Under Review"},
  {id:2,job:"UX Designer",company:"DesignHub",date:"Apr 2, 2026",status:"Shortlisted"},
  {id:3,job:"Backend Engineer",company:"ScaleTech",date:"Mar 28, 2026",status:"Rejected"}
];

const POSTED_JOBS = [
  {id:1,title:"Senior Frontend Developer",applicants:24,views:312,status:"Active",posted:"Apr 1, 2026"},
  {id:2,title:"Product Manager",applicants:18,views:278,status:"Active",posted:"Mar 25, 2026"},
  {id:3,title:"Data Analyst",applicants:7,views:104,status:"Closed",posted:"Mar 10, 2026"}
];

const CANDIDATES = [
  {name:"Arjun Sharma",job:"Senior Frontend Dev",date:"Apr 7",status:"New"},
  {name:"Priya Mehta",job:"Senior Frontend Dev",date:"Apr 6",status:"Shortlisted"},
  {name:"Rohan Gupta",job:"Product Manager",date:"Apr 5",status:"Under Review"},
  {name:"Sneha Patel",job:"Product Manager",date:"Apr 4",status:"Rejected"},
  {name:"Kiran Rao",job:"Data Analyst",date:"Mar 28",status:"Shortlisted"}
];

// ─── STATE ────────────────────────────────────────────────────────────────────
let page = 'home';
let currentJob = null;
let loggedIn = false;
let userRole = null;
let searchQ = '';
let activeCat = 'All';
let eTab = 'overview';
let cTab = 'overview';
let authMode = 'login';
let authRole = 'candidate';
let dropOpen = false;

// ─── ROUTER ──────────────────────────────────────────────────────────────────
function navigate(p, data) {
  page = p;
  if (data) currentJob = data;
  dropOpen = false;
  updateNav();
  renderPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateNav() {
  ['home','jobs','employer','candidate'].forEach(p => {
    const el = document.getElementById('nl-' + p);
    if (el) el.classList.toggle('active', page === p || (page === 'detail' && p === 'jobs') || (page === 'apply' && p === 'jobs'));
  });
  const auth = document.getElementById('nav-auth');
  if (loggedIn) {
    const initials = userRole === 'employer' ? 'EM' : 'JS';
    auth.innerHTML = `
      <div class="dropdown">
        <div class="avatar" onclick="toggleDrop()">${initials}</div>
        <div class="dropdown-menu ${dropOpen ? 'open' : ''}" id="drop">
          <div class="dropdown-item" onclick="navigate(userRole==='employer'?'employer':'candidate')">My Dashboard</div>
          <div class="dropdown-item" onclick="navigate('jobs')">Browse Jobs</div>
          <div style="border-top:1px solid var(--border);margin:4px 0"></div>
          <div class="dropdown-item" onclick="logout()">Sign out</div>
        </div>
      </div>`;
  } else {
    auth.innerHTML = `
      <button class="btn btn-ghost btn-sm" onclick="navigate('auth')">Sign in</button>
      <button class="btn btn-primary btn-sm" onclick="navigate('auth')">Post a Job</button>`;
  }
}

function toggleDrop() { dropOpen = !dropOpen; updateNav(); }

function logout() {
  loggedIn = false; userRole = null; dropOpen = false;
  navigate('home'); toast('Signed out successfully');
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.style.display = 'block';
  setTimeout(() => { t.style.display = 'none'; }, 3200);
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function getFiltered() {
  return JOBS.filter(j => {
    const q = searchQ.toLowerCase();
    const matchQ = !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q)
                    || j.location.toLowerCase().includes(q) || j.skills.some(s => s.toLowerCase().includes(q));
    const matchC = activeCat === 'All' || j.category === activeCat || (activeCat === 'Featured' && j.featured);
    return matchQ && matchC;
  });
}

function statusBadge(s) {
  const map = { 'Shortlisted':'badge-green','Active':'badge-green','New':'badge-blue','Under Review':'badge-amber','Rejected':'badge-red','Closed':'badge-amber' };
  return `<span class="badge ${map[s]||'badge-blue'}">${s}</span>`;
}

function typeColor(t) {
  return t === 'Full-time' ? 'badge-blue' : t === 'Contract' ? 'badge-amber' : 'badge-purple';
}

// ─── RENDER ──────────────────────────────────────────────────────────────────
function renderPage() {
  const pages = { home: renderHome, jobs: renderJobs, detail: renderDetail,
                  employer: renderEmployer, candidate: renderCandidate, auth: renderAuth, apply: renderApply };
  document.getElementById('main').innerHTML = (pages[page] || renderHome)();
  attachEvents();
}

function jobCard(j) {
  const jStr = encodeURIComponent(JSON.stringify(j));
  return `<div class="job-card" onclick="viewJob('${jStr}')">
    <div class="job-card-top">
      <div class="company-logo" style="background:${j.lbg};color:${j.lc}">${j.logo}</div>
      <span class="badge ${typeColor(j.type)}">${j.type}</span>
    </div>
    <div>
      <div class="job-title">${j.title}</div>
      <div class="job-co">${j.company}</div>
    </div>
    <div class="job-meta">
      <span>📍 ${j.location}</span>
      <span>🏷️ ${j.category}</span>
      ${j.featured ? '<span>⭐ Featured</span>' : ''}
    </div>
    <div class="job-footer">
      <span class="salary">${j.salary}</span>
      <span class="posted">${j.posted}</span>
    </div>
  </div>`;
}

function viewJob(enc) {
  const j = JSON.parse(decodeURIComponent(enc));
  navigate('detail', j);
}

// ─── HOME PAGE ───────────────────────────────────────────────────────────────
function renderHome() {
  const featured = JOBS.filter(j => j.featured).slice(0, 3);
  const cats = [
    {n:'Engineering',i:'💻',c:JOBS.filter(j=>j.category==='Engineering').length},
    {n:'Product',i:'📋',c:JOBS.filter(j=>j.category==='Product').length},
    {n:'Design',i:'🎨',c:JOBS.filter(j=>j.category==='Design').length},
    {n:'Data',i:'📊',c:JOBS.filter(j=>j.category==='Data').length},
    {n:'Marketing',i:'📣',c:JOBS.filter(j=>j.category==='Marketing').length},
    {n:'Sales',i:'💼',c:JOBS.filter(j=>j.category==='Sales').length}
  ];
  return `<div class="page">
    <div class="hero">
      <div class="hero-content">
        <h1>Find Your <span>Dream Job</span><br>Today</h1>
        <p>Connect with top employers and discover opportunities that match your skills</p>
        <div class="search-box">
          <input type="text" id="hero-q" placeholder="Job title, company, or skill..." value="${searchQ}" />
          <select id="hero-cat">
            <option value="All" ${activeCat==='All'?'selected':''}>All Categories</option>
            ${['Engineering','Product','Design','Data','Marketing','Sales'].map(c=>`<option value="${c}" ${activeCat===c?'selected':''}>${c}</option>`).join('')}
          </select>
          <button class="btn btn-primary" onclick="heroSearch()">Search Jobs</button>
        </div>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat-card"><div class="stat-num">2,400+</div><div class="stat-lbl">Active Jobs</div></div>
      <div class="stat-card"><div class="stat-num">840+</div><div class="stat-lbl">Companies</div></div>
      <div class="stat-card"><div class="stat-num">48K+</div><div class="stat-lbl">Job Seekers</div></div>
      <div class="stat-card"><div class="stat-num">12K+</div><div class="stat-lbl">Successful Placements</div></div>
    </div>

    <div class="section-head"><h2>Featured Jobs</h2><button class="btn btn-sm" onclick="navigate('jobs')">View all jobs →</button></div>
    <div class="jobs-grid">${featured.map(jobCard).join('')}</div>

    <div class="section-head"><h2>Browse by Category</h2></div>
    <div class="cat-grid">
      ${cats.map(c=>`<div class="cat-card" onclick="goCat('${c.n}')">
        <div class="cat-icon">${c.i}</div>
        <div class="cat-name">${c.n}</div>
        <div class="cat-count">${c.c} openings</div>
      </div>`).join('')}
    </div>

    <div style="background:var(--text);border-radius:var(--radius-lg);padding:2.5rem;color:#fff;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;margin-bottom:2rem">
      <div>
        <h2 style="font-family:'Syne',sans-serif;font-size:22px;font-weight:800;margin-bottom:6px">Hiring talent?</h2>
        <p style="opacity:0.7;font-size:14px">Post your job opening and reach thousands of qualified candidates.</p>
      </div>
      <button class="btn btn-primary" onclick="navigate('employer')" style="white-space:nowrap">Post a Job →</button>
    </div>
  </div>`;
}

function heroSearch() {
  searchQ = document.getElementById('hero-q')?.value || '';
  activeCat = document.getElementById('hero-cat')?.value || 'All';
  navigate('jobs');
}

function goCat(c) { activeCat = c; navigate('jobs'); }

// ─── JOBS PAGE ────────────────────────────────────────────────────────────────
function renderJobs() {
  const filtered = getFiltered();
  const cats = ['All','Featured','Engineering','Product','Design','Data','Marketing','Sales'];
  return `<div class="page">
    <div class="section-head" style="margin-bottom:0.75rem">
      <h2>Browse Jobs</h2>
      <span style="font-size:13px;color:var(--text-2)">${filtered.length} openings</span>
    </div>
    <div style="display:flex;gap:8px;margin-bottom:1rem">
      <input type="text" id="list-q" placeholder="Search by title, company, skill..." value="${searchQ}"
        style="flex:1;padding:10px 14px;border-radius:var(--radius);border:1px solid var(--border-strong);background:var(--surface);font-size:14px;color:var(--text);outline:none;font-family:'DM Sans',sans-serif" />
      <button class="btn btn-primary" onclick="listSearch()">Search</button>
    </div>
    <div class="filters">
      ${cats.map(c=>`<div class="chip ${activeCat===c?'active':''}" onclick="setCat('${c}')">${c}</div>`).join('')}
    </div>
    ${filtered.length
      ? `<div class="jobs-grid">${filtered.map(jobCard).join('')}</div>`
      : `<div class="empty-state"><div class="empty-icon">🔍</div><p style="font-weight:600;margin-bottom:6px">No jobs found</p><p style="font-size:13px">Try adjusting your search or filters.</p></div>`}
  </div>`;
}

function setCat(c) { activeCat = c; renderPage(); }
function listSearch() {
  searchQ = document.getElementById('list-q')?.value || '';
  renderPage();
}

// ─── DETAIL PAGE ──────────────────────────────────────────────────────────────
function renderDetail() {
  const j = currentJob;
  if (!j) return `<div class="page"><div class="empty-state">Job not found.</div></div>`;
  return `<div class="page">
    <button class="back-btn" onclick="navigate('jobs')">← Back to Jobs</button>
    <div class="detail-grid">
      <div class="detail-main">
        <div class="detail-header">
          <div class="big-logo" style="background:${j.lbg};color:${j.lc}">${j.logo}</div>
          <div>
            <h1 style="font-family:'Syne',sans-serif;font-size:22px;font-weight:800;letter-spacing:-0.5px;margin-bottom:4px">${j.title}</h1>
            <div style="font-size:14px;color:var(--text-2);margin-bottom:10px">${j.company} · ${j.location}</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <span class="badge ${typeColor(j.type)}">${j.type}</span>
              <span class="badge badge-green">${j.category}</span>
              ${j.featured ? '<span class="badge badge-amber">⭐ Featured</span>' : ''}
            </div>
          </div>
        </div>
        <div class="detail-body">
          <p>${j.desc}</p>
          <h3>Requirements</h3>
          <ul>${j.requirements.map(r=>`<li>${r}</li>`).join('')}</ul>
          <h3>Skills & Tools</h3>
          <div style="margin-top:8px">${j.skills.map(s=>`<span class="tag">${s}</span>`).join('')}</div>
          <h3>About ${j.company}</h3>
          <p>A fast-growing technology company building innovative solutions trusted by leading enterprises. We value collaboration, continuous learning, and meaningful impact. We offer competitive compensation, flexible work arrangements, and excellent growth opportunities.</p>
          <h3>What We Offer</h3>
          <ul>
            <li>Competitive salary + ESOPs</li>
            <li>Flexible remote/hybrid work policy</li>
            <li>Health insurance for you and family</li>
            <li>Learning & development budget ₹1L/year</li>
          </ul>
        </div>
      </div>
      <div>
        <div class="side-card">
          <div class="salary" style="font-size:20px;font-family:'Syne',sans-serif;font-weight:800;margin-bottom:14px">${j.salary}</div>
          <button class="btn btn-primary" style="width:100%;margin-bottom:8px;padding:12px" onclick="startApply()">Apply Now →</button>
          <button class="btn" style="width:100%" onclick="toast('💾 Job saved to your list!')">Save Job</button>
        </div>
        <div class="side-card">
          <div class="info-row"><span class="info-label">Location</span><strong>${j.location}</strong></div>
          <div class="info-row"><span class="info-label">Job Type</span><strong>${j.type}</strong></div>
          <div class="info-row"><span class="info-label">Category</span><strong>${j.category}</strong></div>
          <div class="info-row"><span class="info-label">Posted</span><strong>${j.posted}</strong></div>
        </div>
        <div class="side-card">
          <div style="font-size:13px;font-weight:600;margin-bottom:10px">Share this job</div>
          <div style="display:flex;gap:6px">
            <button class="btn btn-sm" style="flex:1" onclick="toast('🔗 Link copied to clipboard!')">Copy Link</button>
            <button class="btn btn-sm" style="flex:1" onclick="toast('📤 Sharing on LinkedIn...')">LinkedIn</button>
          </div>
        </div>
        <div class="side-card">
          <div style="font-size:13px;font-weight:600;margin-bottom:6px">Similar Jobs</div>
          ${JOBS.filter(jj=>jj.category===j.category&&jj.id!==j.id).slice(0,2).map(jj=>`
            <div onclick="viewJob('${encodeURIComponent(JSON.stringify(jj))}')" style="cursor:pointer;padding:8px 0;border-bottom:1px solid var(--border)">
              <div style="font-size:13px;font-weight:600">${jj.title}</div>
              <div style="font-size:12px;color:var(--text-2)">${jj.company} · ${jj.salary}</div>
            </div>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

function startApply() {
  if (!loggedIn) { navigate('auth'); return; }
  navigate('apply');
}

// ─── APPLY PAGE ───────────────────────────────────────────────────────────────
function renderApply() {
  const j = currentJob || JOBS[0];
  return `<div class="page">
    <button class="back-btn" onclick="navigate('detail')">← Back to Job</button>
    <div style="max-width:640px;margin:0 auto">
      <div class="dash-card">
        <div style="background:var(--surface2);border-radius:var(--radius);padding:1rem;margin-bottom:1.5rem;display:flex;gap:12px;align-items:center">
          <div class="company-logo" style="background:${j.lbg};color:${j.lc}">${j.logo}</div>
          <div><div style="font-weight:600">${j.title}</div><div style="font-size:13px;color:var(--text-2)">${j.company} · ${j.salary}</div></div>
        </div>
        <h3>Your Application</h3>
        <div class="form-row" style="margin-top:1rem">
          <div class="form-group"><label>Full Name *</label><input type="text" placeholder="Your full name" /></div>
          <div class="form-group"><label>Email Address *</label><input type="email" placeholder="your@email.com" /></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>Phone Number *</label><input type="text" placeholder="+91 XXXXX XXXXX" /></div>
          <div class="form-group"><label>Current Location</label><input type="text" placeholder="City, State" /></div>
        </div>
        <div class="form-group"><label>LinkedIn Profile</label><input type="url" placeholder="https://linkedin.com/in/yourprofile" /></div>
        <div class="form-group"><label>Portfolio / GitHub</label><input type="url" placeholder="https://github.com/yourhandle" /></div>
        <div class="form-group"><label>Resume *</label>
          <div class="upload-area" onclick="toast('📎 File picker opened — select your resume')">
            <div class="upload-icon">📄</div>
            <p><strong>Click to upload</strong> or drag and drop</p>
            <p style="font-size:11px;margin-top:4px">PDF, DOC, DOCX up to 5MB</p>
          </div>
        </div>
        <div class="form-group"><label>Cover Letter</label><textarea rows="5" placeholder="Tell the employer why you're excited about this role and why you're a great fit..."></textarea></div>
        <div class="form-row">
          <div class="form-group"><label>Current CTC (LPA)</label><input type="text" placeholder="e.g. 12" /></div>
          <div class="form-group"><label>Expected CTC (LPA)</label><input type="text" placeholder="e.g. 18" /></div>
        </div>
        <div class="form-group"><label>Notice Period</label>
          <select><option>Immediate</option><option>15 days</option><option>30 days</option><option>60 days</option><option>90 days</option></select>
        </div>
        <div style="display:flex;gap:10px;margin-top:0.5rem">
          <button class="btn" onclick="navigate('detail')" style="flex:1">Cancel</button>
          <button class="btn btn-primary" onclick="submitApply()" style="flex:2;padding:12px">Submit Application →</button>
        </div>
      </div>
    </div>
  </div>`;
}

function submitApply() {
  toast('🎉 Application submitted! Check your email for confirmation.');
  navigate('candidate');
  cTab = 'applications';
}

// ─── EMPLOYER DASHBOARD ───────────────────────────────────────────────────────
function renderEmployer() {
  if (!loggedIn || userRole !== 'employer') {
    return `<div class="page"><div class="auth-wrap" style="margin-top:1rem">
      <div class="auth-card" style="text-align:center">
        <div style="font-size:48px;margin-bottom:1rem">🏢</div>
        <h2 style="font-family:'Syne',sans-serif;font-size:20px;font-weight:800;margin-bottom:8px">Employer Dashboard</h2>
        <p style="color:var(--text-2);font-size:14px;margin-bottom:1.5rem">Post jobs, manage applications, and find the right talent.</p>
        <button class="btn btn-primary" style="width:100%;padding:12px" onclick="quickLogin('employer')">Sign in as Employer (Demo)</button>
        <p style="font-size:12px;color:var(--text-3);margin-top:12px">or <span style="color:var(--accent);cursor:pointer" onclick="navigate('auth')">create an account</span></p>
      </div>
    </div></div>`;
  }
  const tabs = [
    {id:'overview',icon:'📊',label:'Overview'},
    {id:'post-job',icon:'✏️',label:'Post a Job'},
    {id:'applications',icon:'👥',label:'Applications'},
    {id:'settings',icon:'⚙️',label:'Settings'}
  ];
  return `<div class="page">
    <div class="dash-layout">
      <div class="sidebar">
        <div class="sidebar-section">Employer</div>
        ${tabs.map(t=>`<div class="sidebar-item ${eTab===t.id?'active':''}" onclick="setETab('${t.id}')">
          <span class="sidebar-icon">${t.icon}</span>${t.label}
        </div>`).join('')}
        <div style="border-top:1px solid var(--border);margin-top:8px;padding-top:8px">
          <div class="sidebar-item" onclick="navigate('jobs')"><span class="sidebar-icon">🔍</span>Browse Jobs</div>
        </div>
      </div>
      <div class="dash-content">${renderETab()}</div>
    </div>
  </div>`;
}

function setETab(t) { eTab = t; renderPage(); }

function renderETab() {
  if (eTab === 'overview') return `
    <div class="mini-stats">
      <div class="mini-stat"><div class="num">3</div><div class="lbl">Active Jobs</div></div>
      <div class="mini-stat"><div class="num">49</div><div class="lbl">Total Applicants</div></div>
      <div class="mini-stat"><div class="num">12</div><div class="lbl">Shortlisted</div></div>
    </div>
    <div class="dash-card">
      <h3>Your Job Postings</h3>
      <div class="table-wrap"><table>
        <thead><tr><th>Job Title</th><th>Views</th><th>Applicants</th><th>Status</th><th>Posted</th><th></th></tr></thead>
        <tbody>${POSTED_JOBS.map(p=>`<tr>
          <td style="font-weight:600">${p.title}</td>
          <td style="color:var(--text-2)">${p.views}</td>
          <td>${statusBadge(String(p.applicants) + ' new')}</td>
          <td>${statusBadge(p.status)}</td>
          <td style="color:var(--text-2)">${p.posted}</td>
          <td><button class="btn btn-sm" onclick="setETab('applications')">View →</button></td>
        </tr>`).join('')}</tbody>
      </table></div>
    </div>
    <div class="dash-card">
      <h3>Quick Actions</h3>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn-primary" onclick="setETab('post-job')">✏️ Post New Job</button>
        <button class="btn" onclick="setETab('applications')">👥 Review Applications</button>
        <button class="btn" onclick="toast('📧 Email blast sent to 248 candidates!')">📣 Send Job Alert</button>
      </div>
    </div>`;

  if (eTab === 'post-job') return `
    <div class="dash-card">
      <h3>Post a New Job</h3>
      <div class="form-row">
        <div class="form-group"><label>Job Title *</label><input type="text" placeholder="e.g. Senior React Developer" /></div>
        <div class="form-group"><label>Company Name *</label><input type="text" value="TechCorp" /></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Location *</label><input type="text" placeholder="e.g. Bangalore / Remote" /></div>
        <div class="form-group"><label>Job Type *</label>
          <select><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option><option>Freelance</option></select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Salary Range</label><input type="text" placeholder="e.g. ₹15–22 LPA" /></div>
        <div class="form-group"><label>Category *</label>
          <select><option>Engineering</option><option>Product</option><option>Design</option><option>Data</option><option>Marketing</option><option>Sales</option><option>Operations</option></select>
        </div>
      </div>
      <div class="form-group"><label>Experience Level</label>
        <select><option>Entry Level (0–2 yrs)</option><option>Mid Level (2–5 yrs)</option><option>Senior (5–8 yrs)</option><option>Lead / Principal (8+ yrs)</option></select>
      </div>
      <div class="form-group"><label>Job Description *</label>
        <textarea rows="5" placeholder="Describe the role, key responsibilities, team, and what success looks like..."></textarea>
      </div>
      <div class="form-group"><label>Requirements (one per line)</label>
        <textarea rows="4" placeholder="5+ years of React experience&#10;TypeScript proficiency&#10;Strong system design skills"></textarea>
      </div>
      <div class="form-group"><label>Required Skills (comma-separated)</label>
        <input type="text" placeholder="React, TypeScript, Node.js, GraphQL" />
      </div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:1rem">
        <input type="checkbox" id="featured-cb" style="width:auto" />
        <label for="featured-cb" style="font-size:13px;margin:0;font-weight:400">Mark as featured listing (+₹999)</label>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-primary" onclick="toast('✅ Job posted! Email sent to 1,240 matching candidates.')">Publish Job</button>
        <button class="btn" onclick="toast('📋 Draft saved successfully')">Save Draft</button>
      </div>
    </div>`;

  if (eTab === 'applications') return `
    <div class="dash-card">
      <h3>All Applications</h3>
      <div style="display:flex;gap:8px;margin-bottom:1rem;flex-wrap:wrap">
        ${['All','New','Under Review','Shortlisted','Rejected'].map(s=>`<div class="chip active" style="font-size:12px;padding:4px 12px">${s}</div>`).join('')}
      </div>
      <div class="table-wrap"><table>
        <thead><tr><th>Candidate</th><th>Applied For</th><th>Applied On</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>${CANDIDATES.map(c=>`<tr>
          <td>
            <div style="display:flex;align-items:center;gap:8px">
              <div style="width:32px;height:32px;border-radius:50%;background:var(--accent-bg);color:var(--accent);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">${c.name.split(' ').map(n=>n[0]).join('')}</div>
              <span style="font-weight:600">${c.name}</span>
            </div>
          </td>
          <td style="color:var(--text-2)">${c.job}</td>
          <td style="color:var(--text-2)">${c.date}</td>
          <td>${statusBadge(c.status)}</td>
          <td>
            <div style="display:flex;gap:4px">
              <button class="btn btn-sm" onclick="toast('📄 Resume downloaded for ${c.name}')">Resume</button>
              <button class="btn btn-sm" onclick="toast('📧 Email sent to ${c.name}')">Contact</button>
            </div>
          </td>
        </tr>`).join('')}</tbody>
      </table></div>
    </div>`;

  if (eTab === 'settings') return `
    <div class="dash-card">
      <h3>Company Profile</h3>
      <div class="form-row">
        <div class="form-group"><label>Company Name</label><input type="text" value="TechCorp" /></div>
        <div class="form-group"><label>Industry</label><input type="text" value="Software & Technology" /></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Company Size</label>
          <select><option>1–10</option><option>11–50</option><option>51–200</option><option selected>201–500</option><option>500+</option></select>
        </div>
        <div class="form-group"><label>Founded</label><input type="text" value="2018" /></div>
      </div>
      <div class="form-group"><label>Website</label><input type="url" value="https://techcorp.example.com" /></div>
      <div class="form-group"><label>Company Description</label>
        <textarea rows="4">We build world-class software products for enterprise clients globally. Our team of 300+ engineers ships products used by millions daily.</textarea>
      </div>
      <div class="form-group"><label>HR / Notification Email</label><input type="email" value="hr@techcorp.example.com" /></div>
      <button class="btn btn-primary" onclick="toast('✅ Company profile saved successfully!')">Save Changes</button>
    </div>`;
}

// ─── CANDIDATE DASHBOARD ─────────────────────────────────────────────────────
function renderCandidate() {
  if (!loggedIn || userRole !== 'candidate') {
    return `<div class="page"><div class="auth-wrap" style="margin-top:1rem">
      <div class="auth-card" style="text-align:center">
        <div style="font-size:48px;margin-bottom:1rem">👤</div>
        <h2 style="font-family:'Syne',sans-serif;font-size:20px;font-weight:800;margin-bottom:8px">Candidate Dashboard</h2>
        <p style="color:var(--text-2);font-size:14px;margin-bottom:1.5rem">Manage your profile, track applications, and find opportunities.</p>
        <button class="btn btn-primary" style="width:100%;padding:12px" onclick="quickLogin('candidate')">Sign in as Candidate (Demo)</button>
        <p style="font-size:12px;color:var(--text-3);margin-top:12px">or <span style="color:var(--accent);cursor:pointer" onclick="navigate('auth')">create an account</span></p>
      </div>
    </div></div>`;
  }
  const tabs = [
    {id:'overview',icon:'📊',label:'Overview'},
    {id:'applications',icon:'📋',label:'My Applications'},
    {id:'profile',icon:'👤',label:'Profile'},
    {id:'alerts',icon:'🔔',label:'Job Alerts'},
    {id:'settings',icon:'⚙️',label:'Settings'}
  ];
  return `<div class="page">
    <div class="dash-layout">
      <div class="sidebar">
        <div class="sidebar-section">Candidate</div>
        ${tabs.map(t=>`<div class="sidebar-item ${cTab===t.id?'active':''}" onclick="setCTab('${t.id}')">
          <span class="sidebar-icon">${t.icon}</span>${t.label}
        </div>`).join('')}
        <div style="border-top:1px solid var(--border);margin-top:8px;padding-top:8px">
          <div class="sidebar-item" onclick="navigate('jobs')"><span class="sidebar-icon">🔍</span>Find Jobs</div>
        </div>
      </div>
      <div class="dash-content">${renderCTab()}</div>
    </div>
  </div>`;
}

function setCTab(t) { cTab = t; renderPage(); }

function renderCTab() {
  if (cTab === 'overview') return `
    <div class="mini-stats">
      <div class="mini-stat"><div class="num">3</div><div class="lbl">Applications</div></div>
      <div class="mini-stat"><div class="num">1</div><div class="lbl">Shortlisted</div></div>
      <div class="mini-stat"><div class="num">12</div><div class="lbl">Profile Views</div></div>
    </div>
    <div class="dash-card">
      <h3>Profile Strength</h3>
      <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px">
        <span style="color:var(--text-2)">75% complete</span>
        <span style="color:var(--accent);font-weight:600">Add resume to reach 100%</span>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width:75%"></div></div>
      <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
        <button class="btn btn-sm" onclick="setCTab('profile')">Complete Profile →</button>
      </div>
    </div>
    <div class="dash-card">
      <h3>Recent Applications</h3>
      <div class="table-wrap"><table>
        <thead><tr><th>Job</th><th>Company</th><th>Applied</th><th>Status</th></tr></thead>
        <tbody>${MY_APPLICATIONS.map(a=>`<tr>
          <td style="font-weight:600">${a.job}</td>
          <td style="color:var(--text-2)">${a.company}</td>
          <td style="color:var(--text-2)">${a.date}</td>
          <td>${statusBadge(a.status)}</td>
        </tr>`).join('')}</tbody>
      </table></div>
    </div>
    <div class="dash-card">
      <h3>Recommended Jobs</h3>
      <div style="display:flex;flex-direction:column;gap:10px">
        ${JOBS.filter(j=>j.category==='Engineering').slice(0,2).map(j=>`
          <div onclick="viewJob('${encodeURIComponent(JSON.stringify(j))}')" style="cursor:pointer;display:flex;align-items:center;gap:12px;padding:10px;border-radius:var(--radius);border:1px solid var(--border);transition:all 0.15s" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border)'">
            <div class="company-logo" style="background:${j.lbg};color:${j.lc};width:36px;height:36px;font-size:13px;border-radius:8px">${j.logo}</div>
            <div style="flex:1"><div style="font-size:14px;font-weight:600">${j.title}</div><div style="font-size:12px;color:var(--text-2)">${j.company} · ${j.salary}</div></div>
            <span class="badge ${typeColor(j.type)}">${j.type}</span>
          </div>`).join('')}
      </div>
    </div>`;

  if (cTab === 'applications') return `
    <div class="dash-card">
      <h3>All Applications</h3>
      <div class="table-wrap"><table>
        <thead><tr><th>Job Title</th><th>Company</th><th>Applied On</th><th>Status</th><th></th></tr></thead>
        <tbody>${MY_APPLICATIONS.map(a=>`<tr>
          <td style="font-weight:600">${a.job}</td>
          <td style="color:var(--text-2)">${a.company}</td>
          <td style="color:var(--text-2)">${a.date}</td>
          <td>${statusBadge(a.status)}</td>
          <td><button class="btn btn-sm" onclick="navigate('jobs')">View Similar</button></td>
        </tr>`).join('')}</tbody>
      </table></div>
    </div>`;

  if (cTab === 'profile') return `
    <div class="dash-card">
      <h3>Personal Information</h3>
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:1.5rem">
        <div style="width:64px;height:64px;border-radius:50%;background:var(--accent-bg);color:var(--accent);display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;font-family:'Syne',sans-serif">AS</div>
        <div>
          <div style="font-weight:600;margin-bottom:4px">Arjun Sharma</div>
          <button class="btn btn-sm" onclick="toast('📷 Profile photo upload ready')">Change Photo</button>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Full Name</label><input type="text" value="Arjun Sharma" /></div>
        <div class="form-group"><label>Email</label><input type="email" value="arjun@example.com" /></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Phone</label><input type="text" value="+91 98765 43210" /></div>
        <div class="form-group"><label>Location</label><input type="text" value="Pune, Maharashtra" /></div>
      </div>
      <div class="form-group"><label>Current Role</label><input type="text" value="Full Stack Developer" /></div>
      <div class="form-group"><label>Years of Experience</label><select><option>0–1 years</option><option>1–3 years</option><option selected>3–5 years</option><option>5–8 years</option><option>8+ years</option></select></div>
      <div class="form-group"><label>Skills (comma-separated)</label><input type="text" value="React, TypeScript, Node.js, PostgreSQL, Docker" /></div>
      <div class="form-group"><label>Professional Bio</label><textarea rows="3">Full-stack developer with 4 years of experience building scalable web applications. Passionate about clean code and great user experiences.</textarea></div>
      <div class="form-group"><label>LinkedIn Profile</label><input type="url" value="https://linkedin.com/in/arjunsharma" /></div>
      <div class="form-group"><label>GitHub / Portfolio</label><input type="url" value="https://github.com/arjunsharma" /></div>
      <div class="form-group"><label>Resume</label>
        <div class="upload-area" onclick="toast('📎 File picker opened — select your resume')">
          <div class="upload-icon">📄</div>
          <p><strong>Upload Resume</strong> — PDF, DOC, DOCX (max 5MB)</p>
        </div>
      </div>
      <button class="btn btn-primary" onclick="toast('✅ Profile updated successfully!')">Save Profile</button>
    </div>`;

  if (cTab === 'alerts') return `
    <div class="dash-card">
      <h3>Job Alerts</h3>
      <p style="font-size:13px;color:var(--text-2);margin-bottom:1rem">Get notified when new jobs matching your preferences are posted.</p>
      <div class="form-group"><label>Job Title Keywords</label><input type="text" value="Senior Frontend, React Developer, Full Stack" /></div>
      <div class="form-row">
        <div class="form-group"><label>Location</label><input type="text" value="Bangalore, Remote" /></div>
        <div class="form-group"><label>Job Type</label><select><option>Any</option><option selected>Full-time</option><option>Contract</option></select></div>
      </div>
      <div class="form-group"><label>Minimum Salary (LPA)</label><input type="text" value="15" /></div>
      <div class="form-group"><label>Alert Frequency</label><select><option>Instantly</option><option selected>Daily digest</option><option>Weekly digest</option></select></div>
      <button class="btn btn-primary" onclick="toast('🔔 Job alert saved! You\\'ll receive daily emails.')">Save Alert</button>
    </div>`;

  if (cTab === 'settings') return `
    <div class="dash-card">
      <h3>Notification Preferences</h3>
      <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:1.5rem">
        ${[['New job matches','Email + Push'],['Application status updates','Email'],['Employer messages','Email + In-app'],['Profile view alerts','In-app'],['Weekly digest','Email']].map(([l,v])=>`
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;padding:8px 0;border-bottom:1px solid var(--border)">
            <span>${l}</span><span class="badge badge-green">${v}</span>
          </div>`).join('')}
      </div>
      <div class="form-group"><label>Profile Visibility</label>
        <select><option>Public — visible to all employers</option><option selected>Semi-private — visible to verified employers only</option><option>Private — hidden from employers</option></select>
      </div>
      <div class="form-group"><label>Change Password</label><input type="password" placeholder="New password" /></div>
      <button class="btn btn-primary" onclick="toast('✅ Settings saved!')">Save Settings</button>
    </div>`;
}

// ─── AUTH PAGE ────────────────────────────────────────────────────────────────
function renderAuth() {
  return `<div class="page"><div class="auth-wrap">
    <div class="auth-card">
      <div class="auth-logo"><span class="logo-text">• JobBoard</span></div>
      <div class="role-switch">
        <div class="role-btn ${authRole==='candidate'?'active':''}" onclick="setARole('candidate')">👤 Job Seeker</div>
        <div class="role-btn ${authRole==='employer'?'active':''}" onclick="setARole('employer')">🏢 Employer</div>
      </div>
      <div style="display:flex;gap:0;margin-bottom:1.25rem;border:1px solid var(--border-strong);border-radius:var(--radius);overflow:hidden">
        <button onclick="setAMode('login')" style="flex:1;padding:9px;text-align:center;cursor:pointer;font-size:13px;font-weight:600;border:none;font-family:'DM Sans',sans-serif;transition:all 0.15s;background:${authMode==='login'?'var(--accent)':'var(--surface2)'};color:${authMode==='login'?'#fff':'var(--text-2)'}">Sign In</button>
        <button onclick="setAMode('register')" style="flex:1;padding:9px;text-align:center;cursor:pointer;font-size:13px;font-weight:600;border:none;font-family:'DM Sans',sans-serif;transition:all 0.15s;background:${authMode==='register'?'var(--accent)':'var(--surface2)'};color:${authMode==='register'?'#fff':'var(--text-2)'}">Register</button>
      </div>
      ${authMode === 'register' ? `<div class="form-group"><label>Full Name *</label><input type="text" placeholder="${authRole==='employer'?'Company name':'Your full name'}" /></div>` : ''}
      <div class="form-group"><label>Email Address *</label><input type="email" placeholder="you@example.com" /></div>
      <div class="form-group"><label>Password *</label><input type="password" placeholder="••••••••" /></div>
      ${authMode === 'register' ? `<div class="form-group"><label>Confirm Password *</label><input type="password" placeholder="••••••••" /></div>` : ''}
      <button class="btn btn-primary" style="width:100%;padding:12px;margin-top:4px" onclick="doLogin()">
        ${authMode === 'login' ? 'Sign In' : 'Create Account'}
      </button>
      ${authMode === 'login' ? `<p style="text-align:center;font-size:12px;color:var(--accent);cursor:pointer;margin-top:10px">Forgot password?</p>` : ''}
      <div class="auth-divider">or continue with</div>
      <div style="display:flex;gap:8px">
        <button class="btn" style="flex:1;justify-content:center" onclick="doLogin()">🔵 Google</button>
        <button class="btn" style="flex:1;justify-content:center" onclick="doLogin()">🔗 LinkedIn</button>
      </div>
      <div class="auth-switch">
        ${authMode==='login' ? `Don't have an account? <span onclick="setAMode('register')">Register free</span>` : `Already have an account? <span onclick="setAMode('login')">Sign in</span>`}
      </div>
    </div>
  </div></div>`;
}

function setAMode(m) { authMode = m; renderPage(); }
function setARole(r) { authRole = r; renderPage(); }

function doLogin() {
  loggedIn = true;
  userRole = authRole;
  toast('✅ Welcome back! Signed in successfully.');
  navigate(userRole === 'employer' ? 'employer' : 'candidate');
}

function quickLogin(role) {
  loggedIn = true;
  userRole = role;
  toast('✅ Demo login successful!');
  renderPage();
}

// ─── EVENTS ───────────────────────────────────────────────────────────────────
function attachEvents() {
  document.getElementById('list-q')?.addEventListener('keyup', e => { if (e.key === 'Enter') listSearch(); });
  document.getElementById('hero-q')?.addEventListener('keyup', e => { if (e.key === 'Enter') heroSearch(); });
  document.addEventListener('click', e => {
    if (dropOpen && !e.target.closest('.dropdown')) { dropOpen = false; updateNav(); }
  }, { once: true });
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
updateNav();
renderPage();
