// Formspree endpoint ID for this form. Replace xlgqpevp with the real ID (the part after /f/ in the Formspree form URL).
const FORMSPREE_ID = 'xlgqpevp';

(function () {
  var f = document.getElementById('cf');
  if (!f) return;
  var st = f.querySelector('.cf-status');
  var b = f.querySelector('button[type=submit]');
  var label = b.textContent;

  function show(cls, msg) { st.className = 'cf-status' + (cls ? ' ' + cls : ''); st.textContent = msg; }

  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = f.elements.name.value.trim();
    var email = f.elements.email.value.trim();
    var msg = f.elements.message.value.trim();
    if (!name) return show('err', 'Please enter your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return show('err', 'Please enter a valid email address.');
    if (msg.length < 2) return show('err', 'Please enter a message.');
    if (!FORMSPREE_ID || FORMSPREE_ID === 'xlgqpevp') {
      return show('err', 'Sorry, the contact form isn\u2019t switched on yet. Please try again soon.');
    }
    b.disabled = true; b.textContent = 'Sending...'; show('', '');
    fetch('https://formspree.io/f/' + FORMSPREE_ID, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(f)
    })
      .then(function (r) {
        if (r.ok) { f.reset(); show('ok', 'Thank you! Your message has been sent. We\u2019ll reply by email soon.'); }
        else { show('err', 'Sorry, something went wrong sending your message. Please try again.'); }
      })
      .catch(function () { show('err', 'Sorry, we couldn\u2019t reach the server. Please check your connection and try again.'); })
      .finally(function () { b.disabled = false; b.textContent = label; });
  });
})();
