// script.js - main app behavior
(function(){
  // helpers
  function qs(id){ return document.getElementById(id); }
  function showSection(name){ document.querySelectorAll('.panel').forEach(p=>p.classList.add('hidden'));
    qs(name).classList.remove('hidden'); qs(name).classList.add('visible');
  }
  window.showSection = showSection; // expose to HTML buttons

  // state keys
  const KEY = 'ef_site_state_v1';
  function loadState(){ try{ return JSON.parse(localStorage.getItem(KEY)) || {}; }catch(e){ return {}; } }
  function saveState(s){ localStorage.setItem(KEY, JSON.stringify(s)); }

  // initial elements
  const startDateEl = qs('startDate');
  const saveStart = qs('saveStart');
  const resetStart = qs('resetStart');
  const todayTask = qs('todayTask');
  const dayNum = qs('dayNum');
  const bar = qs('bar');
  const entry = qs('entry');
  const saveEntry = qs('saveEntry');
  const entriesEl = qs('entries');
  const exportBtn = qs('export');
  const importBtn = qs('importBtn');
  const importFile = qs('importFile');
  const markDone = qs('markDone');
  const streakEl = qs('streak');
  const planContainer = qs('planContainer');

  // load plan into full plan view
  function renderFullPlan(){
    let html = '';
    FULL_PLAN.forEach((t,i)=>{ html += `<div class="card"><strong>Day ${i+1}</strong>\n<pre style="white-space:pre-wrap">${t}</pre></div>`; });
    planContainer.innerHTML = html;
  }

  renderFullPlan();

  // compute day number from start date
  function computeDayFromStart(start){ if(!start) return null; const s = new Date(start+'T00:00:00'); const now = new Date(); const diff = Math.floor((now - s)/(24*3600*1000)); return diff+1; }

  // render today's task based on start
  function renderToday(){ const state = loadState(); const start = state.start; if(!start){ todayTask.textContent = 'Pick a start date to begin the 90-day program.'; dayNum.textContent='0'; bar.style.width='0%'; entry.value=''; renderEntriesList(); streakEl.textContent='0'; return; }
    const d = computeDayFromStart(start); const day = Math.max(1, Math.min(90,d)); dayNum.textContent = day; const pct = Math.round((day/90)*100); bar.style.width = pct + '%';
    const text = FULL_PLAN[day-1] || `Day ${day} - Continue the Week 3-4 routine.`; todayTask.innerHTML = `<pre style="white-space
