/* MAIN JS: nav toggle, scroll active link, project modal */

document.addEventListener('DOMContentLoaded', () => {
  // NAV toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  navToggle?.addEventListener('click', () => {
    const open = navMenu.style.display === 'block';
    navMenu.style.display = open ? 'none' : 'block';
  });

  // Close nav when link clicked (mobile)
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) navMenu.style.display = 'none';
    });
  });

  // Scroll sections active link
  const sections = document.querySelectorAll('section[id]');
  function activateLinkOnScroll() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 80;
      const id = section.getAttribute('id');
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.nav__link').forEach(l => l.classList.remove('active-link'));
        const active = document.querySelector(`.nav__link[href*="${id}"]`);
        active?.classList.add('active-link');
      }
    });
  }
  window.addEventListener('scroll', activateLinkOnScroll);
  activateLinkOnScroll();

  // Project modal logic
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTech = document.getElementById('modal-tech');
  const modalDemo = document.getElementById('modal-demo');
  const modalGithub = document.getElementById('modal-github');
  const modalClose = document.getElementById('modal-close');

  document.querySelectorAll('.work__card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.dataset.title || 'Project';
      const desc = card.dataset.desc || '';
      const tech = card.dataset.tech || '';
      const demo = card.dataset.demo || '';
      const github = card.dataset.github || '';
      const figma = card.getAttribute('figma') || '';

      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalTech.textContent = tech;

      // Handle Live Demo visibility
      if (demo && demo !== '#') {
        modalDemo.style.display = "inline-block";
        modalDemo.href = demo;
      } else {
        modalDemo.style.display = "none";
      }

      // Handle GitHub / Figma visibility
      if (figma) {
        modalGithub.style.display = "inline-block";
        modalGithub.textContent = "View in Figma";
        modalGithub.href = figma;
      } else if (github && github !== '#') {
        modalGithub.style.display = "inline-block";
        modalGithub.textContent = "GitHub";
        modalGithub.href = github;
      } else {
        modalGithub.style.display = "none";
      }

      modal.setAttribute('aria-hidden', 'false');
    });
  });

  modalClose?.addEventListener('click', () => modal.setAttribute('aria-hidden', 'true'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.setAttribute('aria-hidden', 'true');
  });

});
