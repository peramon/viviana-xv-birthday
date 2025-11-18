(() => {
  // ======= CONFIGURA AQUÍ =======
  const PHONE_EC = "593962130837"; // tu número SIN '+'
  // ==============================

  const token      = (new URLSearchParams(location.search).get("token") || "demo").trim();
  const storeKey   = `rsvp:${token}`;
  const rsvpBtn    = document.getElementById("rsvpBtn");
  const rsvpState  = document.getElementById("rsvpState");

  const modal      = document.getElementById("rsvpModal");
  const backdrop   = document.getElementById("rsvpBackdrop");
  const closeBtn   = document.getElementById("rsvpClose");
  const yesBtn     = document.getElementById("btnYes");
  const noBtn      = document.getElementById("btnNo");

  function renderState() {
    const saved = localStorage.getItem(storeKey);
    if (saved === "yes") {
      rsvpState.textContent = "✅ Asistencia confirmada. ¡Gracias!";
      rsvpBtn?.classList.add("hidden");
    } else if (saved === "no") {
      rsvpState.textContent = "❌ Has indicado que no podrás asistir.";
      rsvpBtn?.classList.add("hidden");
    } else {
      rsvpState.textContent = "";
      rsvpBtn?.classList.remove("hidden");
    }
  }

  function openModal(){ modal.classList.add("show"); }
  function closeModal(){ modal.classList.remove("show"); }

  // SOLO MENSAJE PLANO (sin nombre, fecha ni código)
  function openWhatsApp(status){
    const msg = status === "yes"
      ? "Confirmo asistencia a XV de Viviana"
      : "No podré asistir a XV de Viviana";

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
