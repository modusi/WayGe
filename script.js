
  // ფუნქცია, რომელიც URL-იდან პარამეტრებს მოაქვს
function getQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        place: urlParams.get("place"),
        image: urlParams.get("image")
    };
}

// Google Maps-ის ინიციალიზაცია
function initMap() {
    window.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 41.7151, lng: 44.8271 },
        zoom: 7
    });
}

// ლოკაციის ძებნა Google Maps-ზე
function searchLocation() {
    var location = document.getElementById('location').value;
    var geocoder = new google.maps.Geocoder();

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

