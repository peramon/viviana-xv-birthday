(() => {
  // ======= CONFIGURA AQUÍ =======
  const PHONE_EC   = "593995057004";   // tu número SIN '+'
  const EVENT_NAME = "XV de Viviana";
  const EVENT_DATE = "13 de diciembre, 17:00";
  // ==============================

  const qs     = new URLSearchParams(location.search);
  const guest  = (qs.get("invitado") || "").trim();
  const token  = (qs.get("token") || "").trim() || "demo";

  const storeKey  = `rsvp:${token}`;
  const rsvpBtn   = document.getElementById("rsvpBtn");
  const rsvpState = document.getElementById("rsvpState");

  const modal    = document.getElementById("rsvpModal");
  const backdrop = document.getElementById("rsvpBackdrop");
  const closeBtn = document.getElementById("rsvpClose");
  const yesBtn   = document.getElementById("btnYes");
  const noBtn    = document.getElementById("btnNo");

  function renderState() {
    const saved = localStorage.getItem(storeKey);
    if (saved === "yes") {
      rsvpState.textContent = "✅ Asistencia confirmada. ¡Gracias!";
      if (rsvpBtn) rsvpBtn.classList.add("hidden");
    //   rsvpBtn.disabled = true;
    } else if (saved === "no") {
      rsvpState.textContent = "❌ Has indicado que no podrás asistir.";
    if (rsvpBtn) rsvpBtn.classList.add("hidden");   // ocultar botón
    //   rsvpBtn.disabled = true;
    } else {
      rsvpState.textContent = "";
      if (rsvpBtn) rsvpBtn.classList.remove("hidden"); // mostrar si no ha respondido
    }
  }

  function openModal(){ modal.classList.add("show"); }
  function closeModal(){ modal.classList.remove("show"); }

  function openWhatsApp(status){
    const who = guest ? `Soy ${guest}. ` : "";
    const verdict = status === "yes" ? "*Confirmo asistencia*" : "*No podré asistir*";
    const msg = `${who}${verdict} a ${EVENT_NAME} (${EVENT_DATE}). Código: ${token}.`;
    const url = `https://wa.me/${PHONE_EC}?text=${encodeURIComponent(msg)}`;

    localStorage.setItem(storeKey, status);
    renderState();
    closeModal();
    window.open(url, "_blank");
  }

  // Listeners
  rsvpBtn?.addEventListener("click", openModal);
  backdrop?.addEventListener("click", closeModal);
  closeBtn?.addEventListener("click", closeModal);
  yesBtn?.addEventListener("click", () => openWhatsApp("yes"));
  noBtn?.addEventListener("click", () => openWhatsApp("no"));

  renderState();
})();
