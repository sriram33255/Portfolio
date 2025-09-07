document.addEventListener('DOMContentLoaded', function(){
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
    menuToggle.classList.toggle('open');
  });

  // Close nav on link click (mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('show'));
  });

  // IntersectionObserver for reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale').forEach(el => observer.observe(el));

  // Animate skill bars once visible
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.querySelectorAll('.progress span').forEach(f => {
          const width = f.getAttribute('style').match(/\d+/)[0] + '%';
          f.style.width = width;
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.skills-grid').forEach(el => skillObserver.observe(el));

  // Contact form validation and submission
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    if (!data.get('name') || !data.get('email') || !data.get('message')) {
      msg.textContent = 'Please fill required fields.';
      msg.style.color = 'red';
      return;
    }
    msg.textContent = 'Message sent (demo). Thank you!';
    msg.style.color = 'green';
    form.reset();
    setTimeout(() => msg.textContent = '', 4000);
  });

  // Set current year in footer
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
