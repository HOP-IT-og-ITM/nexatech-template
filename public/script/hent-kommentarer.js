// For å bruke denne, må det legges inn en link til skriptet i html-dokumentet,
// og koden: < section id = "kommentar" ></section >  der kommentarene skal vises
// I tillegg må det legges inn en get-rute for å hente kommentaren (et API)
//
//    // Api for å hente kommentarer fra json-filen
//    app.get("/kommentarer", (req, res) => {
//    fs.readFile("kommentar.json", "utf8", (err, fileData) => {
//            const comments = JSON.parse(fileData);
//            res.json(comments);
//        });
//    });
//

async function fetchComments() {
    const response = await fetch("/kommentarer");
    const comments = await response.json();
    const commentsDiv = document.getElementById("kommentar");
    commentsDiv.innerHTML = "";
    comments.forEach((comment) => {
        const kommentar = document.createElement("div");
        kommentar.className = "kommentar-wrapper";
        const nameElement = document.createElement("p");
        nameElement.className = "brukernavn";
        const commentElement = document.createElement("p");
        commentElement.className = "kommentar";
        kommentar.appendChild(nameElement);
        kommentar.appendChild(commentElement);
        commentsDiv.appendChild(kommentar);

        nameElement.textContent = comment.user;
        commentElement.textContent = comment.kommentar;
    });
}

setInterval(fetchComments, 10000);
fetchComments();
