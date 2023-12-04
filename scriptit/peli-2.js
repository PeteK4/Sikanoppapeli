// Sikanoppaa kahdella nopalla

// Varsinainen koodi suoritetaan vasta, kun kaikki sivun elementit on ladattu
document.addEventListener("DOMContentLoaded", function () {
  // Haetaan sivun elementit
    const noppaKuvat = ["noppa1", "noppa2", "noppa3", "noppa4", "noppa5", "noppa6"];
    const peliRuutu = document.getElementById("peliRuutu");
    const kierrosPisteet = document.getElementById("kierrosPisteet");
    const voittajaKentta = document.getElementById("voittaja");
    const isoNoppaKuvaA = document.getElementById("isoNoppaA")
    const isoNoppaKuvaB = document.getElementById("isoNoppaB")
    const heitaNappi = document.getElementById("heita");
    const passaaNappi = document.getElementById("passaa");
    const vuoroNappi = document.getElementById("vuoro");
    const napitKaikki = document.getElementById("napit");
    const tuplaNappi = document.getElementById("tupla");
    const tupla1Nappi = document.getElementById("tupla1");
    const tupla3Nappi = document.getElementById("tupla3");
    const uusiKierrosNappi = document.getElementById("uusiKierros");
    const uusiPeliNappi = document.getElementById("uusiPeli");
    const lopputxt = document.getElementById("lopputxt")

  // Haetaan index.html:ssä tallennetut tiedot paikallisesta tiedostosta pelaajat -objektiin
    const pelaajat = {};
    const nimetData = JSON.parse(localStorage.getItem('kaikkiPelaajat'));
        nimetData.forEach(pelaajaNimi => {
        pelaajat[pelaajaNimi] = 0;
    });

    let pelaajaNro = 0; // pelaajat -listan indeksi, pelaajanumero
    let summa = 0; // pelaajan pisteet yhdellä kierroksella
    let triplaTuplat = 0; // triplatuplaseuranta

    // Asetetaan kuuntelijat buttoneille
    heitaNappi.addEventListener("click", heitaNoppa);
    passaaNappi.addEventListener("click", vaihdaPelaaja);
    vuoroNappi.addEventListener("click", vaihdaPelaaja);
    tuplaNappi.addEventListener("click", heitaNoppa);
    tupla1Nappi.addEventListener("click", heitaNoppa);
    tupla3Nappi.addEventListener("click", vaihdaPelaaja);

    // Alustetaan näyttö
    noppaA.src = `./kuvat/noppa${Math.floor(Math.random() * 6) + 1}.webp`;
    noppaB.src = `./kuvat/noppa${Math.floor(Math.random() * 6) + 1}.webp`;
    paivitaPelaajaNimi();
    paivitaPisteet();
    tulostaLista();

  // Pääohjelma
    function heitaNoppa() {
      // pyöräytetään noppaa .gif animaatiolla
      noppaA.src = "./kuvat/noppa.gif";
      noppaB.src = "./kuvat/noppa.gif";

      // eri buttonien näkyvyys näytöllä
      heitaNappi.style.display = "block";
      passaaNappi.style.display = "block";
      tuplaNappi.style.display = "none";
      tupla1Nappi.style.display = "none";
      tupla3Nappi.style.display = "none";
  
      // Arvotaan noppien silmäluvut, asetetaan noppien kuvat näytölle
      // Tarkistetaan tulokset, asetetaan aika .gif animaatiolle
      setTimeout(function () {
        const noppaLukuA= Math.floor(Math.random() * 6) + 1;
        const noppaLukuB = Math.floor(Math.random() * 6) + 1; 
        noppaA.src = `./kuvat/${noppaKuvat[noppaLukuA - 1]}.webp`;
        noppaB.src = `./kuvat/${noppaKuvat[noppaLukuB - 1]}.webp`;

        // Kaksi ykköstä antaa 25 pistettä
        if (noppaLukuA == 1 && noppaLukuB == 1){
          summa += 25;
          paivitaPisteet();
          tarkistaPisteet(noppaLukuA, noppaLukuB)
          tupla1Nappi.style.display = "block"; // buttonien näkyvyydet pelin tilanteissa
          passaaNappi.style.display = "block";
          heitaNappi.style.display = "none";
        
        // Jos jompi kumpi noppa antaa ykkösen, nollaataan kierrospisteet ja vuoro siirtyy seuraavalle pelaajalle
        } else if (noppaLukuA == 1 || noppaLukuB == 1) {
          summa = 0;
          triplaTuplat = 0;
          paivitaPisteet();
          vuoroNappi.style.display = "block";
          passaaNappi.style.display = "none";
          heitaNappi.style.display = "none";

      // Kaksi samaa noppalukua antaa tuplapisteet, esim. (3 + 3) * 2 = 12
      // Jos heitetään tuplat kolmesti peräkkäin, nollataan pisteet ja vuoro vaihtuu
      } else if (noppaLukuA == noppaLukuB){
        triplaTuplat += 1
          tuplaNappi.style.display = "block";
          heitaNappi.style.display = "none";
          if (triplaTuplat == 3) {
              summa = 0;
              triplaTuplat = 0;
              paivitaPisteet();
              tarkistaPisteet(noppaLukuA, noppaLukuB)
              heitaNappi.style.display = "none";
              passaaNappi.style.display = "none";
              tuplaNappi.style.display = "none";
              tupla1Nappi.style.display = "none";
              tupla3Nappi.style.display = "block";
              return
          }
          summa += (noppaLukuA+ noppaLukuB) * 2;
          paivitaPisteet();
          tarkistaPisteet(noppaLukuA, noppaLukuB)

        // Lasketaan yhteen noppien summa, nollataan triplatuplalaskuri
        } else {
          summa += noppaLukuA + noppaLukuB;
          triplaTuplat = 0;
          paivitaPisteet();
          tarkistaPisteet(noppaLukuA, noppaLukuB)
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
        tuplaNappi.style.display = "none";
        tupla1Nappi.style.display = "none";
        tupla3Nappi.style.display = "none";
      }
  
    // Pelaajan vaihtuessa päivitetään pelaajan nimi pelikentälle ja nollataan kierrospisteet
    function paivitaPelaajaNimi() {
    document.getElementById("pelaajaNimi").textContent = Object.keys(pelaajat)[pelaajaNro];
    summa = 0;
    paivitaPisteet();
    heitaNappi.style.display = "block"; // buttonien näkyvyydet
    passaaNappi.style.display = "none";
    vuoroNappi.style.display = "none";
    }
      
  // Tulostetaan kierrospisteet pelialueelle
    function paivitaPisteet() {
      kierrosPisteet.textContent = `Pisteet: ${summa}`;
    }

  // Tarkistetaan joko voittopisteraja on saavutettu
    function tarkistaPisteet(noppaLukuA, noppaLukuB) {
      if (pelaajat[Object.keys(pelaajat)[pelaajaNro]] + summa >= 200) {
        const p = Object.keys(pelaajat)[pelaajaNro];
        pelaajat[p] = (pelaajat[p] || 0) + summa;
        tulostaLista();
        kierroksenVoittaja(p, noppaLukuA, noppaLukuB);
      }
    }
  
    // Asetetaan kierroksen voittaja näytölle ja pyöritetään noppa-animaatiota
    function kierroksenVoittaja(nimi, noppaLukuA, noppaLukuB) {
        document.getElementById("voittajanNimi").innerHTML = nimi;
        document.getElementById("noppaAnim").style.display = "flex";
        lopputxt.style.display ="block";
        voittajaKentta.style.display = "block";
        napitKaikki.style.display = "none";
        peliRuutu.style.display = "none";
        isoNoppaKuvaA.innerHTML = `<img src="./kuvat/${noppaKuvat[noppaLukuA - 1]}.webp" alt="" style="width: 100%" draggable="false">`;
        isoNoppaKuvaB.innerHTML = `<img src="./kuvat/${noppaKuvat[noppaLukuB - 1]}.webp" alt="" style="width: 100%" draggable="false">`;
    
        setTimeout(function () {
            lopputxt.style.display ="none";
            isoNoppaKuvaA.innerHTML = ""; 
            isoNoppaKuvaB.innerHTML = ""; 
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
        isoNoppaKuvaA.innerHTML = `<img src="./kuvat/noppa.gif" alt="" style="width: 100%" draggable="false">`;
        isoNoppaKuvaB.innerHTML = `<img src="./kuvat/noppa.gif" alt="" style="width: 100%" draggable="false">`;
        setInterval(function () {
          isoNoppaKuvaA.innerHTML = `<img src="./kuvat/${noppaKuvat[Math.floor(Math.random() * noppaKuvat.length)]}.webp" alt="" style="width: 100%" draggable="false">`;
          isoNoppaKuvaB.innerHTML = `<img src="./kuvat/${noppaKuvat[Math.floor(Math.random() * noppaKuvat.length)]}.webp" alt="" style="width: 100%" draggable="false">`;
      
          setTimeout(function () {
            isoNoppaKuvaA.innerHTML = `<img src="./kuvat/noppa.gif" alt="" style="width: 100%" draggable="false">`;
            isoNoppaKuvaB.innerHTML = `<img src="./kuvat/noppa.gif" alt="" style="width: 100%" draggable="false">`;
          }, 1000);
        }, 2000);
      }
  });
  