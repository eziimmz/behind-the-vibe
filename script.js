/* ==========================================================
   BEHIND THE VIBE — site interactions and editable settings
   ========================================================== */

// 1) Add official social links and WhatsApp number when ready.
const SITE_CONFIG = {
  instagram: "https://www.instagram.com/bhindthevibe?vrfl=MWR6bjZzZTJycXhlaQ%3D%3D&utm_source=qr", // Example: https://instagram.com/youraccount
  tiktok: "https://www.tiktok.com/@behindthevibe01?_r=1&_t=ZS-9B83NWGjl6C",    // Example: https://tiktok.com/@youraccount
  whatsappNumber: "6285178680912", // International format, digits only
  bookingEndpoint: "https://formspree.io/f/xvkklyda", // Formspree/EmailJS/backend endpoint URL
  googleFormEmbed: "https://docs.google.com/forms/d/e/1FAIpQLSf49A-IeIGSIeC_MNPW3qu6mZBQs2LCBS_xmaErqb7o0l_knQ/viewform" // Google Form embed URL for Join Us page
};

// Mobile navigation.
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navlinks');
if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Social and WhatsApp links.
function createWhatsAppLink(message) {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll('[data-wa]').forEach((link) => {
  if (/^\d{8,15}$/.test(SITE_CONFIG.whatsappNumber)) {
    link.href = createWhatsAppLink(link.dataset.wa || 'Halo mimin BTV, saya ingin bertanya tentang layanan.');
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  } else {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      alert('Nomor WhatsApp Behind The Vibe belum diatur.');
    });
  }
});

document.querySelectorAll('[data-social]').forEach((link) => {
  const destination = SITE_CONFIG[link.dataset.social];
  if (destination && destination !== '#') {
    link.href = destination;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  } else {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      alert(`Link ${link.dataset.social} Behind The Vibe belum diatur.`);
    });
  }
});

// 2) Booking form: show the correct package tiers for each event type.
const bookingForm = document.querySelector('#booking-form');
if (bookingForm) {
  const eventSelect = bookingForm.querySelector('#event');
  const packageSelect = bookingForm.querySelector('#package');
  const message = bookingForm.querySelector('#booking-message');
  const packageTiers = {
    general: [
      { value: 'Basic (Little Vows)', label: 'Basic (Little Vows)' },
      { value: 'Standard (Simple Day)', label: 'Standard (Simple Day)' },
      { value: 'Premium (Full Day)', label: 'Premium (Full Day)' }
    ],
    personal: [{ value: 'Basic', label: 'Basic' }]
  };

  function updatePackageOptions() {
    const eventType = eventSelect.value;
    packageSelect.innerHTML = '';
    const prompt = document.createElement('option');
    prompt.value = '';
    prompt.textContent = eventType ? 'Pilih paket' : 'Pilih jenis acara terlebih dahulu';
    packageSelect.appendChild(prompt);

    if (!eventType) {
      packageSelect.disabled = true;
      return;
    }

    const options = eventType === 'Personal' ? packageTiers.personal : packageTiers.general;
    options.forEach((item) => {
      const option = document.createElement('option');
      option.value = item.value;
      option.textContent = item.label;
      packageSelect.appendChild(option);
    });
    packageSelect.disabled = false;
  }

  eventSelect.addEventListener('change', updatePackageOptions);

  // Support links from service cards (Event/Wedding/Personal Content Creator).
  const params = new URLSearchParams(window.location.search);
  const requestedService = params.get('service');
  if (requestedService) {
    if (requestedService.toLowerCase().includes('personal')) eventSelect.value = 'Personal';
    else if (requestedService.toLowerCase().includes('wedding')) eventSelect.value = 'Wedding';
    else if (requestedService.toLowerCase().includes('event')) eventSelect.value = 'Event';
    updatePackageOptions();
  }

  bookingForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!bookingForm.reportValidity()) return;

    if (!SITE_CONFIG.bookingEndpoint) {
      message.textContent = 'Formulir belum terkirim. Admin perlu mengatur bookingEndpoint dan alamat email tujuan di layanan formulir terlebih dahulu.';
      message.classList.add('form-error');
      return;
    }

    const submitButton = bookingForm.querySelector('[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    message.textContent = '';
    message.classList.remove('form-error', 'form-success');

    try {
      const response = await fetch(SITE_CONFIG.bookingEndpoint, {
        method: 'POST',
        body: new FormData(bookingForm),
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error('Pengiriman formulir gagal.');
      bookingForm.reset();
      updatePackageOptions();
      message.textContent = 'Terima kasih! Pengajuan booking berhasil dikirim. Tim Behind The Vibe akan menghubungimu.';
      message.classList.add('form-success');
    } catch (error) {
      message.textContent = 'Maaf, pengajuan belum berhasil dikirim. Coba lagi beberapa saat atau hubungi kami melalui WhatsApp.';
      message.classList.add('form-error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Submit Booking ↗';
    }
  });
}

// 3) Google Form embed: remains a clear placeholder until the real embed URL is added.
const joinFormFrame = document.querySelector('#join-form-frame');
const joinFormPlaceholder = document.querySelector('#join-form-placeholder');
if (joinFormFrame && SITE_CONFIG.googleFormEmbed) {
  joinFormFrame.src = SITE_CONFIG.googleFormEmbed;
  joinFormFrame.hidden = false;
  if (joinFormPlaceholder) joinFormPlaceholder.hidden = true;
}

