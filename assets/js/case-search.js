(async()=>{
  const list=document.getElementById('case-list');
  const q=document.getElementById('q'), status=document.getElementById('status');
  const items=await (await fetch('/cases.json')).json();
  const render=rows=>list.innerHTML=rows.map(c=>`
    <li class="case-item">
      <a href="${c.url}"><strong>${c.short_title||c.title}</strong></a>
      <div class="meta">Docket: ${(Array.isArray(c.docket)?c.docket.join(', '):c.docket)||''} · Status: ${c.status} · Filed: ${c.filed_date}</div>
    </li>`).join('');
  const filter=()=>{const term=(q.value||'').toLowerCase(), st=status.value;
    render(items.filter(c=>{
      const hay=(c.title+' '+(c.short_title||'')+' '+(Array.isArray(c.docket)?c.docket.join(' '):c.docket)+' '+(c.tags||[]).join(' ')).toLowerCase();
      return (!term||hay.includes(term)) && (!st||c.status===st);
    }));};
  q.addEventListener('input',filter); status.addEventListener('change',filter); render(items);
})();
