document.addEventListener("DOMContentLoaded", function () {
    const nimetKysely = document.getElementById("nimetKysely");
    let pelaajienNimet = [];

    const ohjeButton = document.getElementById("ohjeNappi");
    const poistuButton = document.getElementById("poistuNappi");
    const ohjeKentta = document.getElementById("ohjeKentta");

    maaraKysely.addEventListener("submit", function (event) {
        event.preventDefault();
        const pelaajienMaara = document.getElementById("pelaajienMaara").value;
        maaraKysely.style.display = "none";
        ohjeButton.style.display = "none";
        document.getElementById("pelaajienNimetKentta").style = "display: block; line-height: 1;";

        nimetKysely.addEventListener("submit", function (event) {
            event.preventDefault();

            for (let i = 0; i < pelaajienMaara; i++) {
                const pelaajaNimiInput = document.getElementById("pelaajaNimi");
                const pelaajaNimi = pelaajaNimiInput.value.trim();

                if (pelaajaNimi != "") {
                    pelaajienNimet.push(pelaajaNimi);
                    pelaajaNimiInput.value = "";
                }
            }
            localStorage.setItem("kaikkiPelaajat", JSON.stringify(pelaajienNimet));

            const pelaajaNumero = pelaajienNimet.length + 1;
            document.getElementById("pelaajaNro").innerText = "Pelaaja " + pelaajaNumero + ":";

            if (pelaajienNimet.length == parseInt(pelaajienMaara)) {
                nimetKysely.style.display = "none";
                document.getElementById("montakoNoppaa").style.display = "block";
                document.getElementById("nimiOtsikko").style.display = "none";
            }
        });
    });

    ohjeButton.addEventListener("click", function () {
        ohjeKentta.style.display = "block";
    });
    poistuButton.addEventListener("click", function () {
        ohjeKentta.style.display = "none";
    });
});
