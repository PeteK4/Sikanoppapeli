// Sikanoppaa yhdellä nopalla

// Varsinainen koodi suoritetaan vasta, kun kaikki sivun elementit on ladattu
document.addEventListener("DOMContentLoaded", function () {
    // Haetaan sivun elementit
    const peliRuutu = document.getElementById("peliRuutu");
    const kierrosPisteet = document.getElementById("kierrosPisteet");
    const voittajaKentta = document.getElementById("voittaja");
    const noppaKuvat = ["noppa1", "noppa2", "noppa3", "noppa4", "noppa5", "noppa6"];
    const isoNoppaKuva = document.getElementById("isoNoppa")
    const heitaNappi = document.getElementById("heita");
    const passaaNappi = document.getElementById("passaa");
    const vuoroNappi = document.getElementById("vuoro");
    const napitKaikki = document.getElementById("napit");
    const uusiKierrosNappi = document.getElementById("uusiKierros");
    const uusiPeliNappi = document.getElementById("uusiPeli");
    const lopputxt = document.getElementById("lopputxt")
    const pelaajat = {};
    const nimetData = JSON.parse(localStorage.getItem('kaikkiPelaajat'));
        nimetData.forEach(pelaajaNimi => {
        pelaajat[pelaajaNimi] = 0;
    });

    let pelaajaNro = 0; // pelaajat -listan indeksi, pelaajanumero
    let summa = 0; // pelaajan pisteet yhdellä kierroksella

    // Asetetaan kuuntelijat buttoneille
    heitaNappi.addEventListener("click", heitaNoppa);
    passaaNappi.addEventListener("click", vaihdaPelaaja);
    vuoroNappi.addEventListener("click", vaihdaPelaaja);

    // Alustetaan näyttö
    noppa.src = `./kuvat/noppa${Math.floor(Math.random() * 6) + 1}.webp`;
    paivitaPelaajaNimi();
    paivitaPisteet();
    tulostaLista();
  
    // Pääohjelma
    function heitaNoppa() {
      // pyöräytetään noppaa .gif animaatiolla
      noppa.src = "./kuvat/noppa.gif";
      
      // passaa buttonin näkyvyys
      passaaNappi.style.display = "block";

      // Arvotaan noppan silmäluku, asetetaan nopan kuva näytölle
      // Tarkistetaan tulokset, asetetaan aika .gif animaatiolle
      setTimeout(function () {
        const noppaLuku = Math.floor(Math.random() * noppaKuvat.length) + 1;
        noppa.src = `./kuvat/${noppaKuvat[noppaLuku - 1]}.webp`;
  
        // Jos noppa antaa ykkösen, nollaataan kierrospisteet ja vuoro siirtyy seuraavalle pelaajalle
        if (noppaLuku == 1) {
          summa = 0;
          paivitaPisteet();
          heitaNappi.style.display = "none"; // buttonien näkyvyydet pelin tilanteissa
          passaaNappi.style.display = "none";
          vuoroNappi.style.display = "block";
        } else {
          summa += noppaLuku;
          paivitaPisteet();

          // Tarkistetaan, onko pelaaja saavuttanut pisterajan
          if (pelaajat[Object.keys(pelaajat)[pelaajaNro]] + summa >= 100) {
            const p = Object.keys(pelaajat)[pelaajaNro];
            pelaajat[p] = (pelaajat[p] || 0) + summa;
            tulostaLista();
            kierroksenVoittaja(p, noppaLuku);
          }
        }
      }, Math.floor(Math.random() * (1000 - 250 + 1)) + 250); // arvotaan .gif animaation pituus
    }
  
    // Tulostetaan pelaajien nimet ja pisteet Yhteispiste -taulukkoon
    function tulostaLista() {
      let tulosLista = "";
      for (const p in pelaajat) {
        if (pelaajat.hasOwnProperty(p)) {
          tulosLista += `<p>${p}: ${pelaajat[p] || 0}</p>`;
        }
      }
      document.getElementById("tuloslista").innerHTML = tulosLista;
    }
  
     // Vaihdetaan pelaaja pelitilanteen mukaan, tulostetaan pelitilanne
    function vaihdaPelaaja() {
        const p = Object.keys(pelaajat)[pelaajaNro];
        pelaajat[p] = (pelaajat[p] || 0) + summa;
        tulostaLista();
        pelaajaNro = (pelaajaNro + 1) % Object.keys(pelaajat).length;
        paivitaPelaajaNimi();
      }

    // Pelaajan vaihtuessa päivitetään pelaajan nimi pelikentälle ja nollataan kierrospisteet
    function paivitaPelaajaNimi() {
    document.getElementById("pelaajaNimi").textContent = Object.keys(pelaajat)[pelaajaNro];
    summa = 0;
    paivitaPisteet();
    heitaNappi.style.display = "block"; // buttonien näkyvyydet pelin tilanteissa
    passaaNappi.style.display = "none";
    vuoroNappi.style.display = "none";
    }
      
    // Tulostetaan kierrospisteet pelialueelle
    function paivitaPisteet() {
      kierrosPisteet.textContent = `Pisteet: ${summa}`;
    }
  
    // Asetetaan kierroksen voittaja näytölle ja pyöritetään noppa-animaatiota
    function kierroksenVoittaja(nimi, noppaLuku) {
        document.getElementById("voittajanNimi").innerHTML = nimi;
        lopputxt.style.display ="block";
        voittajaKentta.style.display = "block";
        napitKaikki.style.display = "none";
        peliRuutu.style.display = "none";
        isoNoppaKuva.style.display = "block";
        isoNoppaKuva.innerHTML = `<img src="./kuvat/${noppaKuvat[noppaLuku - 1]}.webp" alt="" style="width: 75%">`;
    
        setTimeout(function () {
            lopputxt.style.display ="none";
            isoNoppaKuva.innerHTML = ""; 
            isoNoppaAnimaatio();
        }, 5000);
      
        uusiKierrosNappi.addEventListener("click", function () {
          location.reload();
        });
      
        uusiPeliNappi.addEventListener("click", function () {
          window.open("index.html", "_self");
        });
      }
      
      function isoNoppaAnimaatio() {
        document.getElementById("isoNoppa").innerHTML = `<img src="./kuvat/noppa.gif" alt="" style="width: 75%">`;
        setInterval(function () {
          document.getElementById("isoNoppa").innerHTML = `<img src="./kuvat/${noppaKuvat[Math.floor(Math.random() * noppaKuvat.length)]}.webp" alt="" style="width: 75%">`;
      
          setTimeout(function () {
            document.getElementById("isoNoppa").innerHTML = `<img src="./kuvat/noppa.gif" alt="" style="width: 75%">`;
          }, 1000);
        }, 2000);
      }
  });
  