(() => {
  'use strict';

  const site = SITE_DATA;
  const $ = (id) => document.getElementById(id);
  const dialog = $('folder-dialog');
  const dialogContent = $('dialog-content');
  const folderOrder = ['about', 'education', 'skills', 'projects'];
  const iconPaths = {
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m4 7 8 6 8-6"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 3.1a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
    website: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c4 4 4 14 0 18M12 3c-4 4-4 14 0 18"/></svg>'
  };

  let lang = 'en';
  let openFolder = null;
  let lastTrigger = null;
  try {
    if (localStorage.getItem('little-desk-language') === 'ko') lang = 'ko';
  } catch (_) {}

  const textNode = (tag, className, value) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (value !== undefined && value !== null) el.textContent = String(value);
    return el;
  };
  const set = (id, value) => { $(id).textContent = String(value); };

  function renderContact() {
    const holder = $('contact-links');
    holder.replaceChildren();
    const entries = [
      ['email', site.shared.email, 'mailto:'],
      ['github', site.shared.github, ''],
      ['website', site.shared.website, '']
    ];
    entries.forEach(([key, value, prefix]) => {
      if (typeof value !== 'string' || !value.trim()) return;
      const safe = key === 'email'
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        : /^https?:\/\/[^\s]+$/i.test(value);
      if (!safe) return;
      const a = textNode('a', 'quick-link');
      a.href = prefix + value;
      if (!prefix) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      a.innerHTML = iconPaths[key];
      a.append(textNode('span', 'link-text', key === 'email' ? value : (key === 'github' ? 'GitHub' : 'Website')));
      a.append(textNode('span', 'external', '↗'));
      holder.append(a);
    });
  }

  function renderLanguage() {
    const d = site[lang];
    document.documentElement.lang = lang;
    // Landing text intentionally stays in English for BOTH language choices.
    const fixed = site.shared;
    set('hero-hello', fixed.hero.hello);
    set('hero-name', fixed.hero.name);
    set('hero-subtitle', fixed.hero.subtitle);
    set('footer-text', fixed.footer || '© 2026 Doyeon Kim');
    document.querySelectorAll('[data-folder-label]').forEach((el) => { el.textContent = d.folderNames[el.dataset.folderLabel]; });
    document.querySelectorAll('[data-lang]').forEach((btn) => btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang)));
    renderContact();
    if (openFolder) renderFolder(openFolder);
    try { localStorage.setItem('little-desk-language', lang); } catch (_) {}
  }

  function renderFolder(folder) {
    const d = site[lang];
    openFolder = folder;
    set('dialog-kicker', `FOLDER / ${String(folderOrder.indexOf(folder) + 1).padStart(2, '0')}`);
    set('dialog-title', d.folderNames[folder]);
    $('dialog-close').setAttribute('aria-label', d.close);
    dialogContent.replaceChildren();

    if (folder === 'about') {
      const grid = textNode('div', 'about-dialog-layout');
      const copy = textNode('div', 'about-copy');
      (d.about.paragraphs || []).forEach((paragraph) => copy.append(textNode('p', '', paragraph)));
      const photo = textNode('div', 'about-photo');
      const image = document.createElement('img');
      image.src = site.shared.aboutPhoto || 'assets/profile-placeholder.svg';
      image.alt = lang === 'ko' ? '소개 사진 (교체용 이미지)' : 'About photo (placeholder)';
      photo.append(image);
      grid.append(copy, photo);
      dialogContent.append(grid);
    } else if (folder === 'education' || folder === 'projects') {
      const list = textNode('div', 'dialog-list');
      (d[folder] || []).forEach((item) => {
        const entry = textNode('article', 'info-entry');
        entry.append(textNode('p', 'entry-overline', item.period));
        entry.append(textNode('h3', '', item.title));
        if (item.subtitle) entry.append(textNode('p', 'entry-subtitle', item.subtitle));
        if (item.description) entry.append(textNode('p', '', item.description));
        list.append(entry);
      });
      dialogContent.append(list);
    } else if (folder === 'skills') {
      const skills = d.skills || {};
      if (skills.intro) dialogContent.append(textNode('p', 'skills-intro', skills.intro));
      const groups = textNode('div', 'skill-groups');
      (skills.groups || []).forEach((group) => {
        const section = textNode('section', 'skill-group');
        section.append(textNode('h3', 'skill-group-title', group.title));
        const tags = textNode('div', 'skill-tags');
        (group.items || []).forEach((item) => tags.append(textNode('span', 'skill-tag', item)));
        section.append(tags);
        groups.append(section);
      });
      dialogContent.append(groups);
    }
  }

  document.querySelectorAll('.folder-item').forEach((button) => {
    button.addEventListener('click', () => {
      lastTrigger = button;
      renderFolder(button.dataset.folder);
      dialog.showModal();
      $('dialog-close').focus();
    });
  });
  $('dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { openFolder = null; if (lastTrigger) lastTrigger.focus(); });
  document.querySelectorAll('[data-lang]').forEach((button) => {
    button.addEventListener('click', () => { lang = button.dataset.lang; renderLanguage(); });
  });
  const heroInterests = $('hero-interests');
  heroInterests.replaceChildren();
  (site.shared.interests || []).forEach((item) => heroInterests.append(textNode('span', 'hero-interest', item)));
  document.documentElement.dataset.fontPreset = site.shared.fontPreset || 'storybook';
  renderLanguage();
})();
