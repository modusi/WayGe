
  // ფუნქცია, რომელიც URL-იდან პარამეტრებს მოაქვს
function getQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        place: urlParams.get("place"),
        image: urlParams.get("image")
    };
}


    geocoder.geocode({ 'address': location }, function (results, status) {
        if (status === 'OK') {
            window.map.setCenter(results[0].geometry.location);
            new google.maps.Marker({
                map: window.map,
                position: results[0].geometry.location
            });
        } else {
            alert('Location not found: ' + status);
        }
    });
}

// სურათებზე კლიკით გადამისამართება დამატებით გვერდზე
document.querySelectorAll(".place img").forEach(img => {
    img.addEventListener("click", function () {
        const placeName = this.nextElementSibling.innerText;
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
        imageElement.src = image;
        imageElement.alt = place;

        // ✅ სურათზე კლიკით დაბრუნება მთავარ გვერდზე
        imageElement.style.cursor = "pointer";
        imageElement.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    }
});

