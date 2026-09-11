const nav = document.querySelector('.nav');

window.addEventListener('scroll', () =>
  nav.classList.toggle('scrolled', scrollY > 40)
);

const observer = new IntersectionObserver(
  es =>
    es.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    }),
  { threshold: .12 }
);

document.querySelectorAll('.reveal').forEach(e => observer.observe(e));

let counted = false;

const stats = document.querySelector('.stats');

const statObs = new IntersectionObserver(
  es => {
    if (es[0].isIntersecting && !counted) {
      counted = true;

      document.querySelectorAll('[data-count]').forEach(el => {
        const target = parseFloat(el.dataset.count);
        const dec = String(target).includes('.') ? 2 : 0;
        let n = 0;
        const step = target / 55;

        const tick = () => {
          n = Math.min(target, n + step);
          el.textContent = n.toFixed(dec);

          if (n < target) requestAnimationFrame(tick);
        };

        tick();
      });
    }
  },
  { threshold: .3 }
);

statObs.observe(stats);

const cards = [...document.querySelectorAll('.gcard')];

let active = 0;

function show(i) {
  active = (i + cards.length) % cards.length;

  cards.forEach((c, k) =>
    c.classList.toggle('active', k === active)
  );

  cards[active].scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center'
  });
}

document
  .querySelectorAll('.gallery-controls button')
  .forEach(b =>
    b.addEventListener('click', () =>
      show(active + (b.dataset.dir === 'next' ? 1 : -1))
    )
  );

const modal = document.querySelector('#modal');
const modalImg = document.querySelector('#modalImg');

cards.forEach(c =>
  c.addEventListener('click', () => {
    modalImg.src = c.dataset.img;
    modal.classList.add('show');
  })
);

document.querySelector('.modal-close').onclick = () =>
  modal.classList.remove('show');

modal.onclick = e => {
  if (e.target === modal) modal.classList.remove('show');
};

document.querySelector('#leadForm').addEventListener('submit', e => {
  e.preventDefault();

  document.querySelector('#formNote').textContent =
    'Thank you — your request has been captured for this demonstration.';

  e.target.reset();
});

