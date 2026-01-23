// --- 1. FORCE SCROLL TO TOP ON REFRESH ---
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function () { window.scrollTo(0, 0); }
}
window.onload = function() { window.scrollTo(0, 0); }

document.addEventListener("DOMContentLoaded", () => {
    // ============================================
    // A. LOGIKA TEMA (THEME TOGGLE)
    // ============================================
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('bw-theme');
        });
    }

    // ============================================
    // B. INTRO ANIMATION & TYPING
    // ============================================
    const textToType = "MyPersonalPortfolio.js"; 
    const typingSpeed = 100; 
    const delayAfterTyping = 1500; 
    const typeElement = document.getElementById("typeName");
    const introOverlay = document.getElementById("introOverlay");
    let charIndex = 0;

    function typeWriter() {
        if (!typeElement) return; // Safety check
        if (charIndex < textToType.length) {
            typeElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            setTimeout(hideIntro, delayAfterTyping);
        }
    }

    function hideIntro() {
        if(introOverlay) {
            introOverlay.classList.add("slide-up");
            setTimeout(() => { 
                introOverlay.style.display = "none"; 
                initHeroTyping(); // Jalankan efek ketik setelah intro
            }, 1000); 
        }
    }

    setTimeout(typeWriter, 1000);

    // ============================================
    // C. HERO TYPING EFFECT (LOOP)
    // ============================================
    const words = ["Copy-Paste Engineer", "AI COPY PASTE DEV", "WEB AI DEVELOPER", "TUKANG COPAS", "EZ WEB DEV"];
    const heroTypeElement = document.querySelector(".multi-text");
    let wordIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;
    let typeSpeedHero = 100;

    function initHeroTyping() {
        if (!heroTypeElement) return; // Safety check
        typeHeroLoop();
    }

    function typeHeroLoop() {
        if (!heroTypeElement) return;
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            heroTypeElement.textContent = currentWord.substring(0, letterIndex - 1);
            letterIndex--;
            typeSpeedHero = 50; 
        } else {
            heroTypeElement.textContent = currentWord.substring(0, letterIndex + 1);
            letterIndex++;
            typeSpeedHero = 150; 
        }

        if (!isDeleting && letterIndex === currentWord.length) {
            isDeleting = true;
            typeSpeedHero = 2000; 
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeedHero = 500; 
        }
        setTimeout(typeHeroLoop, typeSpeedHero);
    }

    // ============================================
    // D. SCROLL ANIMATION OBSERVER
    // ============================================
    const observerOptions = { root: null, threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add("show-animate"); } 
            else { entry.target.classList.remove("show-animate"); }
        });
    }, observerOptions);

    const sections = document.querySelectorAll("section");
    sections.forEach(section => { observer.observe(section); });

    // ============================================
    // E. MUSIC PLAYER 1 (KIRI)
    // ============================================
    const playBtn1 = document.getElementById('playBtn');
    const diskImage1 = document.getElementById('diskImage');
    const playIcon1 = document.getElementById('playIcon');
    const pauseIcon1 = document.getElementById('pauseIcon');
    const progressFill1 = document.getElementById('progressFill');
    const currentTimeEl1 = document.getElementById('currentTime');
    const durationTimeEl1 = document.getElementById('durationTime');
    
    // GANTI 'lagu1.mp3' DENGAN FILE LOKAL ANDA
    const audio1 = new Audio('lagu1.mp3'); 
    let isPlaying1 = false;

    if (playBtn1) {
        playBtn1.addEventListener('click', () => {
            if (isPlaying1) {
                audio1.pause();
                if(diskImage1) diskImage1.classList.remove('rotate');
                if(playIcon1) playIcon1.style.display = 'block';
                if(pauseIcon1) pauseIcon1.style.display = 'none';
            } else {
                if(typeof window.stopMusic2 === "function") window.stopMusic2(); // Stop player 2
                
                audio1.play().then(() => {
                    if(diskImage1) diskImage1.classList.add('rotate');
                    if(playIcon1) playIcon1.style.display = 'none';
                    if(pauseIcon1) pauseIcon1.style.display = 'block';
                }).catch(err => {
                    console.error("Error Lagu 1:", err);
                    alert("Lagu 1 tidak ditemukan! Pastikan file 'lagu1.mp3' sudah diupload ke GitHub.");
                });
            }
            isPlaying1 = !isPlaying1;
        });
    }

    audio1.addEventListener('timeupdate', () => {
        if (audio1.duration && progressFill1) {
            const percent = (audio1.currentTime / audio1.duration) * 100;
            progressFill1.style.width = percent + '%';
            if(currentTimeEl1) currentTimeEl1.innerText = formatTime(audio1.currentTime);
            if(durationTimeEl1) durationTimeEl1.innerText = formatTime(audio1.duration);
        }
    });

    audio1.addEventListener('ended', () => {
        window.stopMusic1();
    });

    window.stopMusic1 = function() {
        if (isPlaying1) {
            audio1.pause();
            isPlaying1 = false;
            if(diskImage1) diskImage1.classList.remove('rotate');
            if(playIcon1) playIcon1.style.display = 'block';
            if(pauseIcon1) pauseIcon1.style.display = 'none';
            if(progressFill1) progressFill1.style.width = '0%';
            if(currentTimeEl1) currentTimeEl1.innerText = "0:00";
        }
    };

    // ============================================
    // F. MUSIC PLAYER 2 (KANAN)
    // ============================================
    const playBtn2 = document.getElementById('playBtn2');
    const diskImage2 = document.getElementById('diskImage2');
    const playIcon2 = document.getElementById('playIcon2');
    const pauseIcon2 = document.getElementById('pauseIcon2');
    const progressFill2 = document.getElementById('progressFill2');
    const currentTimeEl2 = document.getElementById('currentTime2');
    const durationTimeEl2 = document.getElementById('durationTime2');

    // GANTI 'lagu2.mp3' DENGAN FILE LOKAL ANDA
    const audio2 = new Audio('lagu2.mp3'); 
    let isPlaying2 = false;

    if (playBtn2) {
        playBtn2.addEventListener('click', () => {
            if (isPlaying2) {
                audio2.pause();
                if(diskImage2) diskImage2.classList.remove('rotate');
                if(playIcon2) playIcon2.style.display = 'block';
                if(pauseIcon2) pauseIcon2.style.display = 'none';
            } else {
                if(typeof window.stopMusic1 === "function") window.stopMusic1(); // Stop player 1

                audio2.play().then(() => {
                    if(diskImage2) diskImage2.classList.add('rotate');
                    if(playIcon2) playIcon2.style.display = 'none';
                    if(pauseIcon2) pauseIcon2.style.display = 'block';
                }).catch(err => {
                    console.error("Error Lagu 2:", err);
                    alert("Lagu 2 tidak ditemukan! Pastikan file 'lagu2.mp3' sudah diupload ke GitHub.");
                });
            }
            isPlaying2 = !isPlaying2;
        });
    }

    audio2.addEventListener('timeupdate', () => {
        if (audio2.duration && progressFill2) {
            const percent = (audio2.currentTime / audio2.duration) * 100;
            progressFill2.style.width = percent + '%';
            if(currentTimeEl2) currentTimeEl2.innerText = formatTime(audio2.currentTime);
            if(durationTimeEl2) durationTimeEl2.innerText = formatTime(audio2.duration);
        }
    });

    audio2.addEventListener('ended', () => {
        window.stopMusic2();
    });

    window.stopMusic2 = function() {
        if (isPlaying2) {
            audio2.pause();
            isPlaying2 = false;
            if(diskImage2) diskImage2.classList.remove('rotate');
            if(playIcon2) playIcon2.style.display = 'block';
            if(pauseIcon2) pauseIcon2.style.display = 'none';
            if(progressFill2) progressFill2.style.width = '0%';
            if(currentTimeEl2) currentTimeEl2.innerText = "0:00";
        }
    };

    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return min + ':' + (sec < 10 ? '0' + sec : sec);
    }

}); // End DOMContentLoaded

// ============================================
// G. FUNGSI GLOBAL (Dipanggil via HTML)
// ============================================
window.openCategory = function(categoryName) {
    const allContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < allContents.length; i++) { allContents[i].classList.remove("active-content"); }
    const allButtons = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < allButtons.length; i++) { allButtons[i].classList.remove("active"); }
    const target = document.getElementById(categoryName);
    if(target) target.classList.add("active-content");
    if(event && event.currentTarget) event.currentTarget.classList.add("active");
}

const projectsDB = [
    {
        id: 1,
        title: "My Personal Bot",
        category: "JavaScript Automation",
        image: "https://via.placeholder.com/800x400/2a1b3d/d8b4fe?text=Bot+Preview", 
        description: "Bot otomatisasi yang terintegrasi dengan API Premiumku.",
        features: ["Integrasi API", "Cek Stok", "Kalkulasi Profit"],
        tech: ["Node.js", "JS", "API"]
    },
    {
        id: 2,
        title: "Ecotourism Web",
        category: "School Project",
        image: "https://via.placeholder.com/800x400/1a0b2e/d8b4fe?text=Ecotourism+Web", 
        description: "Website edukasi pariwisata.",
        features: ["Responsive", "Galeri", "Edu"],
        tech: ["HTML", "CSS"]
    }
];

window.openProject = function(id) {
    const project = projectsDB.find(p => p.id === id);
    if (project) {
        localStorage.setItem("currentProject", JSON.stringify(project));
        window.open("project-details.html", "_blank");
    } else { alert("Projek tidak ditemukan!"); }
}