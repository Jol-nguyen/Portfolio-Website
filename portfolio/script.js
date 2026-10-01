// PERSONALIZE YOUR PORTFOLIO HERE. All values below are examples.
const profile = {
  name: 'Alex Morgan',
  firstName: 'Alex',
  email: 'hello@example.com',
  location: 'AUSTIN, TEXAS',
  availability: 'OPEN TO CREATIVE COLLABORATIONS',
  intro: 'a designer & developer turning big ideas into colorful, thoughtful digital experiences.',
  aboutLead: 'I connect the dots between good design and things that actually work.',
  aboutBody: 'I’m a multidisciplinary creative who feels at home somewhere between a sketchbook and a code editor. I love making the complex feel simple, finding unexpected connections, and adding a little personality to the everyday.',
  outsideWork: 'Away from the screen, you’ll find me exploring new places, collecting inspiration, and probably starting another side project.',
  skills: ['UI / UX Design', 'Web Development', 'Creative Thinking']
};

// Replace these sample concepts with your projects. Set url to a full https://
// project address to have the project button open your work instead of the dialog.
const projects = [
  { title: 'Bloom Studio', category: 'WEB DESIGN & DEVELOPMENT', art: 'bloom',
    description: 'A fresh digital home for a plant-loving brand. An inviting shopping experience that makes bringing a little green indoors feel effortless.',
    tags: ['UI / UX', 'Branding', 'Development'], url: '',
    idea: 'Make plant shopping approachable for first-time plant parents through a calm, friendly storefront.',
    approach: 'Pair an earthy visual identity with clear plant-care information, simple browsing, and a mobile-first layout. This illustrative concept explores the brand and landing page.',
    brand: 'bloom®', caption: 'BLOOM / BRAND & DIGITAL', domain: 'bloom.studio', small: 'A LITTLE ROOM TO GROW.', headline: ['Good things', 'grow here.'], cta: 'Find your green ↗', bottom: 'ROOTED IN NATURE. MADE FOR YOU.' },
  { title: 'Forma', category: 'PRODUCT DESIGN & VISUAL IDENTITY', art: 'forma',
    description: 'A playful space for everyday objects with a point of view. A considered product discovery concept for independent makers and the things they create.',
    tags: ['Product Design', 'Art Direction', 'Prototyping'], url: '',
    idea: 'Help people discover thoughtful objects and the independent designers behind them.',
    approach: 'Use sculptural shapes, warm colors, and a focused product hierarchy to let the objects tell their story. The concept explores a collection-led shopping experience.',
    brand: 'forma.', caption: 'FORMA / OBJECTS & IDEAS', domain: 'forma.design', small: 'LESS ORDINARY. MORE YOU.', headline: ['Objects with', 'personality.'], cta: 'Meet the collection ↗', bottom: 'SMALL DETAILS. EVERYDAY DELIGHT.' },
  { title: 'Roam', category: 'EXPERIENCE DESIGN & DEVELOPMENT', art: 'roam',
    description: 'An invitation to take the scenic route. A travel discovery concept that brings inspiring destinations and simple trip planning into one thoughtful experience.',
    tags: ['UX Research', 'Interface Design', 'Development'], url: '',
    idea: 'Turn the feeling of wanting to get away into a clear, approachable starting point for a new adventure.',
    approach: 'Organize destinations around interests, offer concise travel details, and create a clear path from inspiration to an itinerary. This is an illustrative landing-page concept.',
    brand: 'roam↗', caption: 'ROAM / GO SOMEWHERE NEW', domain: 'roam.travel', small: 'THERE’S MORE OUT THERE.', headline: ['Take the', 'scenic route.'], cta: 'Find your next escape ↗', bottom: 'LESS SCROLLING. MORE EXPLORING.' }
];

document.querySelectorAll('[data-profile]').forEach(element => {
  const value = profile[element.dataset.profile];
  if (typeof value === 'string') element.textContent = value;
});
document.querySelectorAll('[data-email]').forEach(link => { link.href = `mailto:${profile.email}`; });
document.querySelector('.brand').setAttribute('aria-label', `${profile.name} home`);
document.title = `${profile.name} — Creative Portfolio`;
document.getElementById('year').textContent = new Date().getFullYear();
function fillList(id, values) {
  document.getElementById(id).replaceChildren(...values.map(value => {
    const item = document.createElement('li'); item.textContent = value; return item;
  }));
}
fillList('skills', profile.skills);
let current = 0;
const dialog = document.getElementById('project-dialog');
const carousel = document.querySelector('.carousel');
const dots = [...document.querySelectorAll('[data-slide]')];
function showProject(index) {
  current = (index + projects.length) % projects.length;
  const project = projects[current];
  const values = {
    'project-title': project.title, 'project-description': project.description,
    'project-category': project.category, 'project-number': `0${current + 1} / 03`,
    'visual-caption': project.caption, 'mock-brand': project.brand, 'mock-url': project.domain,
    'mock-small': project.small, 'mock-cta': project.cta, 'mock-bottom': project.bottom
  };
  Object.entries(values).forEach(([id, value]) => { document.getElementById(id).textContent = value; });
  const headline = document.getElementById('mock-title');
  headline.replaceChildren(document.createTextNode(project.headline[0]), document.createElement('br'), document.createTextNode(project.headline[1]));
  document.getElementById('project-visual').dataset.art = project.art;
  document.getElementById('project-card').setAttribute('aria-label', `${current + 1} of ${projects.length}: ${project.title}`);
  fillList('project-tags', project.tags);
  dots.forEach((dot, i) => {
    dot.classList.toggle('selected', i === current);
    dot.setAttribute('aria-label', `Show ${projects[i].title}`);
    if (i === current) dot.setAttribute('aria-current', 'true'); else dot.removeAttribute('aria-current');
  });
  document.getElementById('project-details').firstChild.textContent = project.url ? 'View project ' : 'Explore the concept ';
  document.getElementById('carousel-status').textContent = `Project ${current + 1} of ${projects.length}: ${project.title}`;
}
document.getElementById('previous').addEventListener('click', () => showProject(current - 1));
document.getElementById('next').addEventListener('click', () => showProject(current + 1));
dots.forEach((dot, index) => dot.addEventListener('click', () => showProject(index)));
carousel.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault(); showProject(current + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
let touchStart;
carousel.addEventListener('touchstart', event => { touchStart = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY }; }, { passive: true });
carousel.addEventListener('touchend', event => {
  if (!touchStart) return;
  const dx = event.changedTouches[0].clientX - touchStart.x;
  const dy = event.changedTouches[0].clientY - touchStart.y;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) showProject(current + (dx < 0 ? 1 : -1));
  touchStart = null;
}, { passive: true });
document.getElementById('project-details').addEventListener('click', () => {
  const project = projects[current];
  if (project.url && /^https?:\/\//i.test(project.url)) { window.open(project.url, '_blank', 'noopener,noreferrer'); return; }
  document.getElementById('dialog-title').textContent = project.title;
  document.getElementById('dialog-description').textContent = project.description;
  document.getElementById('dialog-idea').textContent = project.idea;
  document.getElementById('dialog-approach').textContent = project.approach;
  dialog.showModal();
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
const navLinks = [...document.querySelectorAll('nav a')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) navLinks.forEach(link => {
      const active = link.hash === `#${entry.target.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
document.querySelectorAll('main > section').forEach(section => observer.observe(section));
showProject(0);
