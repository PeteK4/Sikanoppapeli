function arvoNopat(){
    for (let i = 0, luvut = [1, 2, 3, 4, 5, 6].sort(() => Math.random() - 0.5); i < 6; i++) {
        document.querySelectorAll(".noppa")[i].src = `./kuvat/noppa${luvut[i]}.webp`;
    }
}
setInterval(arvoNopat, 256);