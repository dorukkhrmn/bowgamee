let points = 0;
let nextClaimTime = localStorage.getItem('nextClaimTime') || 0;

document.getElementById("points").innerText = `₿ ${points}`;

function claimPoints() {
    const now = new Date().getTime();
    if (now >= nextClaimTime) {
        points += 100;
        document.getElementById("points").innerText = `₿ ${points}`;
        
        nextClaimTime = now + 8 * 60 * 60 * 1000; // 8 saat ekle
        localStorage.setItem('nextClaimTime', nextClaimTime);
        startTimer();
    } else {
        alert("Claim butonu 8 saatte bir kullanılabilir!");
    }
}

function startTimer() {
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = nextClaimTime - now;

        if (distance <= 0) {
            clearInterval(interval);
            document.getElementById("timer").innerText = "Claim available!";
        } else {
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("timer").innerText = `Next claim: ${hours}h ${minutes}m ${seconds}s`;
        }
    }, 1000);
}

startTimer();
