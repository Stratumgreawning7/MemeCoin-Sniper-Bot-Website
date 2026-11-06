(() => {
  const candleRoot = document.getElementById('heroCandles');
  const volumeRoot = document.getElementById('heroVolumes');
  if (candleRoot && volumeRoot) {
    const closes = [132,128,135,129,142,148,139,151,146,158,153,160,166,159,151,148,142,137,130,126,132,139,145,141,149,155,160,157,166,171,168,176,181,177,185,190,187,194,201,197];
    let prev = 136;
    closes.forEach((close, i) => {
      const open = prev;
      const high = Math.max(open, close) + 5 + (i % 4) * 2;
      const low = Math.min(open, close) - 4 - (i % 3) * 2;
      const x = 10 + i * 17;
      const y = v => 230 - v;
      const up = close >= open;
      const cls = up ? 'candle-up' : 'candle-down';
      const wick = document.createElementNS('http://www.w3.org/2000/svg','line');
      wick.setAttribute('x1',x+4); wick.setAttribute('x2',x+4); wick.setAttribute('y1',y(high)); wick.setAttribute('y2',y(low)); wick.setAttribute('class',cls); wick.setAttribute('stroke-width','1.5');
      const body = document.createElementNS('http://www.w3.org/2000/svg','rect');
      body.setAttribute('x',x); body.setAttribute('y',y(Math.max(open,close))); body.setAttribute('width','8'); body.setAttribute('height',Math.max(3,Math.abs(close-open))); body.setAttribute('class',cls);
      candleRoot.append(wick,body);
      const vol = document.createElementNS('http://www.w3.org/2000/svg','rect');
      vol.setAttribute('x',x); vol.setAttribute('y',250 + (28 - (i*7%24))); vol.setAttribute('width','8'); vol.setAttribute('height',6 + (i*7%24)); vol.setAttribute('class',up?'volume-up':'volume-down');
      volumeRoot.append(vol);
      prev = close;
    });
  }

  const search = document.getElementById('tokenSearch');
  const filter = document.getElementById('marketFilter');
  const tbody = document.getElementById('tokenRows');
  const count = document.getElementById('rowCount');
  let sortKey = '';
  let sortDirection = 1;
  const updateRows = () => {
    if (!tbody) return;
    const rows = [...tbody.querySelectorAll('tr')];
    const query = (search?.value || '').trim().toLowerCase();
    const mode = filter?.value || 'all';
    rows.forEach(row => {
      const name = row.dataset.name.toLowerCase();
      const change = Number(row.dataset.change);
      const matchesSearch = name.includes(query);
      const matchesFilter = mode === 'all' || (mode === 'gainers' && change > 0) || (mode === 'losers' && change < 0);
      row.hidden = !(matchesSearch && matchesFilter);
    });
    if (sortKey) {
      const visible = rows.filter(r => !r.hidden);
      visible.sort((a,b) => {
        const av = sortKey === 'name' ? a.dataset.name : Number(a.dataset[sortKey]);
        const bv = sortKey === 'name' ? b.dataset.name : Number(b.dataset[sortKey]);
        return (typeof av === 'string' ? av.localeCompare(bv) : av-bv) * sortDirection;
      });
      visible.forEach(row => tbody.appendChild(row));
    }
    const visibleCount = rows.filter(r => !r.hidden).length;
    if (count) count.textContent = `${visibleCount} asset${visibleCount === 1 ? '' : 's'} shown`;
  };
  search?.addEventListener('input', updateRows);
  filter?.addEventListener('change', updateRows);
  document.querySelectorAll('[data-sort]').forEach(button => {
    button.addEventListener('click', () => {
      const key = button.dataset.sort;
      sortDirection = sortKey === key ? -sortDirection : 1;
      sortKey = key;
      updateRows();
    });
  });

  const copy = document.getElementById('copyPassword');
  const feedback = document.getElementById('copyFeedback');
  copy?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('123');
      if (feedback) feedback.textContent = 'Password copied to clipboard.';
    } catch {
      if (feedback) feedback.textContent = 'Copy unavailable. Select the password manually.';
    }
  });

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded','false');
  }));
})();