// Puan ve Claim Ayarları
let points = 3286; // İlk puan
let lastClaimTime = localStorage.getItem("lastClaimTime") || 0;
const claimInterval = 8 * 60 * 60 * 1000; // 8 saat

// Sayfa Yüklenince Puan ve Buton Durumunu Güncelle
window.onload = function () {
    updatePoints();
    checkClaimStatus();
};

// Puanı Güncelle
function updatePoints() {
    document.getElementById("points").innerText = `₿ ${points}`;
}

// Claim Butonu Durum Kontrolü
function checkClaimStatus() {
    const currentTime = new Date().getTime();
    const timeLeft = claimInterval - (currentTime - lastClaimTime);

    if (timeLeft > 0) {
        disableClaimButton(timeLeft);
    } else {
        enableClaimButton();
    }
}

// Claim Butonunu Devre Dışı Bırak ve Zamanlayıcı Başlat
function disableClaimButton(timeLeft) {
    const button = document.getElementById("claimBtn");
    button.disabled = true;

    const timer = document.getElementById("timer");
    const countdown = setInterval(() => {
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        timer.innerText = `Next claim in ${hours}h ${minutes}m ${seconds}s`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            enableClaimButton();
        }
        timeLeft -= 1000;
    }, 1000);
}

// Claim Butonunu Aktif Et
function enableClaimButton() {
    const button = document.getElementById("claimBtn");
    button.disabled = false;
    document.getElementById("timer").innerText = "";
}

// Claim İşlemi
function claimPoints() {
    points += 100;
    lastClaimTime = new Date().getTime();
    localStorage.setItem("lastClaimTime", lastClaimTime);
    updatePoints();
    checkClaimStatus();
}
