
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

// Chatbot-ის ფუნქცია
function sendMessage() {
    var userInput = document.getElementById("user-input").value; // იღებს მომხმარებლის შეტყობინებას
    var chatBox = document.getElementById("chat-box"); // ჩატის ყუთი

    if (!userInput) return; // თუ არაფერი ჩაწერილა, არ მოხდება არაფერი

    var userMessage = "<p><strong>You:</strong> " + userInput + "</p>"; // მომხმარებლის შეტყობინება
    chatBox.innerHTML += userMessage; // ჩატში დამატება

    document.getElementById("user-input").value = ""; // გასუფთავება input-ის ველი

    // ბოტის პასუხი
    setTimeout(() => {
        var botMessage = "<p><strong>WayGe AI:</strong> " + getBotResponse(userInput) + "</p>";
        chatBox.innerHTML += botMessage; // ბოტის შეტყობინება ჩატში
        chatBox.scrollTop = chatBox.scrollHeight; // გადაცემა ჩატში ბოლო შეტყობინებაზე
    }, 1000);
}

// ბოტის პასუხები
function getBotResponse(input) {
    const msg = input.toLowerCase();

    if (msg.includes("tbilisi") && msg.includes("go")) {
        return "You should visit Narikala Fortress, Sameba Cathedral, and Rustaveli Avenue!";
    } else if (msg.includes("best") && msg.includes("places")) {
        return "Some must-visit places in Georgia include Kazbegi, Svaneti, and Vardzia!";
    } else if (msg.includes("eat") || msg.includes("restaurant")) {
        return "Try Barbarestan or Keto & Kote for traditional Georgian cuisine!";
    } else if (msg.includes("hello") || msg.includes("hi")) {
        return "Hi there! Ask me anything about places in Georgia 🌄";
    } else {
        return "I'm not sure, but I can recommend checking the map above or trying something else!";
    }
}

// Leaflet რუკის ინიციალიზაცია თბილისზე
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("map")) {
      const map = L.map('map').setView([41.7151, 44.8271], 13); // თბილისი

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      L.marker([41.7151, 44.8271])
          .addTo(map)
          .bindPopup('Welcome to Tbilisi!')
          .openPopup();
  }
});



