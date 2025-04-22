
  // ფუნქცია, რომელიც URL-იდან პარამეტრებს მოაქვს
function getQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        place: urlParams.get("place"),
        image: urlParams.get("image")
    };
}

// სურათებზე კლიკით გადამისამართება დამატებით გვერდზე
document.querySelectorAll(".place img").forEach(img => {
    img.addEventListener("click", function () {
        const placeNameElement = this.nextElementSibling;
        const placeName = placeNameElement ? placeNameElement.innerText : "Unknown Place"; // fallback

        const imageUrl = this.getAttribute("src");

        // გადამისამართება სწორ გვერდზე
        location.assign(`booking.html?place=${encodeURIComponent(placeName)}&image=${encodeURIComponent(imageUrl)}`);
    });
});


// მონაცემების გადაადგილება URL პარამეტრებიდან
document.addEventListener("DOMContentLoaded", function () {
    const { place, image } = getQueryParams();

    if (place) {
        document.getElementById('place-name').innerText = place;
    }
    if (image) {
        const imageElement = document.getElementById('place-image');
        imageElement.src = new URL(image, window.location.origin).href;
        imageElement.alt = place;

        // ✅ სურათზე კლიკით დაბრუნება მთავარ გვერდზე
        imageElement.style.cursor = "pointer";
        imageElement.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const allRatings = document.querySelectorAll('.rating');
  
    allRatings.forEach(rating => {
      const stars = rating.querySelectorAll('.star');
  
      stars.forEach((star, index) => {
        // Hover: განათება მარცხნიდან
        star.addEventListener('mouseenter', () => {
          clearHover(stars);
          for (let i = 0; i <= index; i++) {
            stars[i].classList.add('hover');
          }
        });
  
        // Mouse leave: hover გაწმენდა
        rating.addEventListener('mouseleave', () => {
          clearHover(stars);
        });
  
        // Click: შეფასების დაფიქსირება
        star.addEventListener('click', () => {
          const value = parseInt(star.getAttribute('data-value'));
          stars.forEach(s => s.classList.remove('selected'));
          for (let i = 0; i < value; i++) {
            stars[i].classList.add('selected');
          }
          const placeName = rating.getAttribute('data-place');
          console.log(`Rated ${placeName} with ${value} stars`);
        });
      });
  
      function clearHover(stars) {
        stars.forEach(s => s.classList.remove('hover'));
      }
    });
  });

