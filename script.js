(() => {
  'use strict';

  // Current year
  const year = document.getElementById('currentYear');
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Token table
  const search = document.getElementById('tokenSearch');
  const filter = document.getElementById('marketFilter');
  const tbody = document.getElementById('tokenTableBody');

  let sortKey = '';
  let sortDirection = 1;

  const updateRows = () => {
    if (!tbody) return;

    const rows = [...tbody.querySelectorAll('tr')];
    const query = (search?.value || '').trim().toLowerCase();
    const mode = filter?.value || 'all';

    rows.forEach(row => {
      const name = (row.dataset.name || '').toLowerCase();
      const change = Number(row.dataset.change || 0);

      const matchesSearch = name.includes(query);

      const matchesFilter =
        mode === 'all' ||
        (mode === 'up' && change > 0) ||
        (mode === 'down' && change < 0);

      row.hidden = !(matchesSearch && matchesFilter);
    });

    if (sortKey) {
      const visibleRows = rows.filter(row => !row.hidden);

      visibleRows.sort((a, b) => {
        const av = sortKey === 'name'
          ? (a.dataset.name || '')
          : Number(a.dataset[sortKey] || 0);

        const bv = sortKey === 'name'
          ? (b.dataset.name || '')
          : Number(b.dataset[sortKey] || 0);

        const result = typeof av === 'string'
          ? av.localeCompare(bv)
          : av - bv;

        return result * sortDirection;
      });

      visibleRows.forEach(row => tbody.appendChild(row));
    }
  };

  search?.addEventListener('input', updateRows);
  filter?.addEventListener('change', updateRows);

  document.querySelectorAll('[data-sort]').forEach(button => {
    button.addEventListener('click', () => {
      const key = button.dataset.sort;

      if (!['name', 'price', 'change'].includes(key)) return;

      sortDirection = sortKey === key ? -sortDirection : 1;
      sortKey = key;

      updateRows();
    });
  });

  // ZIP password copy
  const copyButton = document.getElementById('copyPassword');
  const feedback = document.getElementById('copyFeedback');
  const password = document.getElementById('archivePassword');

  copyButton?.addEventListener('click', async () => {
    const value = password?.textContent.trim() || '123';

    try {
      await navigator.clipboard.writeText(value);

      copyButton.textContent = 'COPIED';

      if (feedback) {
        feedback.textContent = 'Password copied to clipboard.';
      }

      setTimeout(() => {
        copyButton.textContent = 'COPY';
      }, 1800);

    } catch {
      if (feedback) {
        feedback.textContent = 'Copy unavailable. Your archive password is: ' + value;
      }
    }
  });

  // Mobile navigation
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');

      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute(
        'aria-label',
        open ? 'Close navigation' : 'Open navigation'
      );
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
      });
    });
  }

  // The hero chart already contains static SVG candles.
  // Do not generate another set of candles or volumes.

  updateRows();
})();
