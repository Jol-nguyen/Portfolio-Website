// PERSONALIZE YOUR PORTFOLIO HERE. All values below are examples.
const profile = {
  name: 'Jolie Nguyen',
  firstName: 'Jolie',
  email: 'jngu4430@gmail.com',
  location: 'RICHARDSON, TEXAS',
  availability: 'OPEN TO CREATIVE COLLABORATIONS',
  intro: 'a designer & developer turning big ideas into colorful, thoughtful digital experiences.',
  aboutLead: 'I connect the dots between good design and things that actually work.',
  aboutBody: 'I’m a multidisciplinary creative who feels at home somewhere between a sketchbook and a code editor. I love making the complex feel simple, finding unexpected connections, and adding a little personality to the everyday.',
  outsideWork: 'Away from the screen, you’ll find me exploring new places, collecting inspiration, and probably starting another side project.',
  skills: ['Java', 'Python', 'JavaScript', 'AutoCAD', 'SOLIDWORKS']
};

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
