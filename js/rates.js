(() => {
  // RATES
  const rateData = {
    studio_personal: {
      title: "Studio – Personal Shoot",
      tiers: [
        {
          name: "Basic",
          price: "₦15,000",
          details: ["30 mins session", "1 outfit", "5 edited photos"],
        },
        {
          name: "Standard",
          price: "₦25,000",
          details: ["1 hour session", "2 outfits", "10 edited photos"],
        },
        {
          name: "Premium",
          price: "₦40,000",
          details: ["2 hours", "4 outfits", "20 edited photos"],
        },
        {
          name: "Premium + package",
          price: "₦50,000",
          details: ["2 hours", "4 outfits", "20 edited photos", "16*24 frame"],
        },
        {
          name: "VIP package",
          price: "₦100,000",
          details: [
            "4 hours",
            "up to 7 outfits",
            "40 edited photos",
            " 16*24 frame",
            "Mini Photobook",
          ],
        },
      ],
    },

    studio_family: {
      title: "Studio – Family Shoot",
      tiers: [
        {
          name: "Basic",
          price: "₦35,000",
          details: [
            "1 hour",
            "1 outfit",
            "Max 4 family members",
            "9 edited photos",
          ],
        },
        {
          name: "Standard",
          price: "₦60,000",
          details: [
            "2 hours",
            "up to 2 outfits",
            "20 edited pictures",
            "Max 6 family members",
            "12*16 frame",
          ],
        },
        {
          name: "Premium",
          price: "₦100,000",
          details: [
            "2-4 hours",
            "30 edited pictures",
            "up to 4 outfits",
            "16*24 frame",
            "Mini Photobook",
          ],
        },
      ],
    },

    home_personal: {
      title: "Home Service – Personal Shoot",
      tiers: [
        {
          name: "Basic",
          price: "₦30,000",
          details: ["1 hour session", "1 outfit", "7 edited photos"],
        },
        {
          name: "Standard",
          price: "₦55,000",
          details: [
            "2 hour session",
            "2-3 outfits",
            "15 edited photos",
            "10*12 frame",
          ],
        },
        {
          name: "Premium",
          price: "₦120,000",
          details: [
            "2-4 hours session",
            "4-6 outfits",
            "30 edited photos",
            "16*24 frame",
          ],
        },
      ],
    },

    prewedding: {
      title: "Pre-Wedding Shoot",
      tiers: [
        {
          name: "Basic",
          price: "₦50,000",
          details: [
            "1 hour session",
            "1 location",
            "1 outfits",
            "10 edited pictures",
          ],
        },
        {
          name: "Standard",
          price: "₦75,000",
          details: [
            "2-3 hours",
            "up to 2 locations",
            "up to 2 outfits",
            "20 edited photos",
          ],
        },
        {
          name: "Premium",
          price: "₦150,000",
          details: [
            "Full day session",
            "Multiple locations",
            "30 edited photos",
            "1 frame",
            "Mini Photobook",
          ],
        },
      ],
    },
    wedding: {
      title: "Wedding",
      tiers: [
        {
          name: "Basic",
          price: "₦300,000",
          details: [
            "1 professional photographer",
            "150 Edited Pictures",
            "Online Gallery for downloads",
            "20 page photo album",
            "One 12*16 Photo frame",
          ],
        },
        {
          name: "Standard",
          price: "₦500,000",
          details: [
            "Pre-wedding shoot",
            "1 professional photographer",
            "300 Edited Pictures",
            "Online Gallery for downloads",
            "30 page photo album",
            "Two 12*16 Photo frames",
            "One 16*24 photo frame",
          ],
        },
        {
          name: "Premium",
          price: "₦800,000",
          details: [
            "Pre-wedding shoot",
            "2 professional photographer",
            "500 Edited Pictures",
            "Online Gallery for downloads",
            "USB drive with edithed images",
            "40 page Luxury Photo album",
            "Two 12*16 Photo frames",
            "Two 16*20 photo frame",
          ],
        },
      ],
    },
  };

  const rateModal = document.getElementById("rateModal");
  if (!rateModal) return;

  const rateTitle = document.getElementById("rateTitle");
  const tierGrid = document.getElementById("tierGrid");
  const closeRate = document.getElementById("closeRate");

  const WHATSAPP_NUMBER = "2348164025181";

  // ---- RATE DATA (keep your existing rateData here) ----

  document.querySelectorAll(".rate-card-item").forEach((card) => {
    card.addEventListener("click", () => {
      const data = rateData[card.dataset.rate];
      if (!data) return;

      rateTitle.textContent = data.title;
      tierGrid.innerHTML = "";

      data.tiers.forEach((tier) => {
        const message = `Hello Slingshot Studios 👋
I want to book the ${tier.name} package for ${data.title}.
Price: ${tier.price}`;

        tierGrid.innerHTML += `
          <div class="tier-card">
            <h4>${tier.name}</h4>
            <p class="tier-price">${tier.price}</p>
            <ul>${tier.details.map((d) => `<li>${d}</li>`).join("")}</ul>
            <a class="whatsapp-btn" target="_blank"
               href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                 message,
               )}">
              Book ${tier.name}
            </a>
          </div>
        `;
      });

      rateModal.classList.add("active");
    });
  });

  closeRate?.addEventListener("click", () => {
    rateModal.classList.remove("active");
  });

  rateModal.addEventListener("click", (e) => {
    if (e.target === rateModal) rateModal.classList.remove("active");
  });
})();
