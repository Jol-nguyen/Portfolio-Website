// PERSONALIZE YOUR PORTFOLIO HERE. All values below are examples.
const profile = {
  name: 'Jolie Nguyen',
  firstName: 'Jolie',
  email: 'jngu4430@gmail.com',
  location: 'RICHARDSON, TEXAS',
  availability: 'OPEN TO CREATIVE COLLABORATIONS',
  intro: 'I am a highly adaptable and perservering student developer harnessing agentic AI to create innovative solutions for real-world problems.',
  aboutLead: 'I take ideas and bring them into reality, improving upon existing foundations for a more tailored final product.',
  aboutBody: 'I am a first-year Computer Engineering student currently studying academia while branching out into more practical experiences related to my future career. The process of bringing a basic idea from the depths of my imagination into a concrete and interactive project inspires me, despite the inevitable issues and discovered unintended behavior. I hope to put my talents and learned knowledge to use while also continuing to grow my capabilities and collaborate with others in related studies.',
  outsideWork: 'Other than academic and extracurricular work, I enjoy constructing wooden models, solving logic puzzles, and coding casual side projects.',
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
