// Scrollama scrollytelling setup
const scroller = scrollama();

const steps = document.querySelectorAll('.step');
const graphicImg = document.getElementById('graphic-img');
const graphicImgPlaceholder = document.getElementById('graphic-img-placeholder');
const graphicCaption = document.getElementById('graphic-caption');

// Caption text for each step (keyed by data-step index)
const stepCaptions = {
  1: "How do you know what medication you're taking if you can't read the box?",
  2: "How can you make a CV if you can't write your name?",
  3: "How do you know when your train is coming if you can't read the schedule?",
  4: "How do you know what to order at a restaurant if you can't read the menu?",
  5: "How do you know who you're voting for if you can't read the ballot?",
  6: "How can you book a hotel if you can't use the app?",
  7: "Being unable to engage with the world can lead to feelings of isolation and exclusion",
};

function handleStepEnter(response) {
  const element = response.element;
  const stepIndex = parseInt(element.getAttribute('data-step'), 10);

  // Highlight active step
  steps.forEach((step) => step.classList.toggle('active', step === element));

  // Swap the step image
  if (graphicImg) {
    graphicImg.src = `img${stepIndex}.png`;
    graphicImg.alt = `Illustration for step ${stepIndex}`;
    graphicImg.style.display = 'block';
  }
  if (graphicImgPlaceholder) {
    graphicImgPlaceholder.style.display = 'none';
  }

  // Update caption
  if (graphicCaption) {
    graphicCaption.textContent = stepCaptions[stepIndex] || '';
  }
}

function init() {
  scroller
    .setup({
      step: '.step',
      offset: 0.5,
      debug: false,
    })
    .onStepEnter(handleStepEnter);

  window.addEventListener('resize', scroller.resize);
}

init();

// Track opened modals — only the four data cards count toward the final reveal
const DATA_MODALS = new Set(['modal1', 'modal2', 'modal3', 'modal4']);
const openedModals = new Set();

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';

  // Only count the four literacy-tracking cards, not the About modal
  if (DATA_MODALS.has(modalId)) {
    openedModals.add(modalId);
    if (openedModals.size === 4) {
      document.getElementById('final-section').style.display = 'block';
    }
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

// Close modal on backdrop click
window.addEventListener('click', function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.classList.remove('show');
    document.body.style.overflow = '';
  }
});

// Close modal on Escape key
window.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    document.querySelectorAll('.modal.show').forEach(function(modal) {
      modal.classList.remove('show');
    });
    document.body.style.overflow = '';
  }
});
