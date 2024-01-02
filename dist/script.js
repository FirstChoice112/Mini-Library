//Pseudokod
//1. Hämta API och analysera informationen
//2. Skapa en function med addeventlistener på alla böcker
//3. Skapa en function som skapar upp HTML taggar för rendera sidan "HTML2"
//4. Skapa function för att rendera boken med title och author + färg.
//5. Skapa en function som renderar text information, title, authior, audience, first published, pages och publisher.
// Skapa en eventlistener på tillbakaknappen för att gå tillbaka till mainpage.
const books = document.querySelectorAll(".book");
//Hämta API
async function getBookData(bookId) {
  try {
    const response = await fetch(
      `https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books/${bookId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching book data:", error);
    throw error;
  }
}
//Hämta bakrundsfärgen till boken för min renderBookView function. (Window = det globala scopet för JS i en webbläsare)
function getBackgroundColor(book) {
  const computedStyle = window.getComputedStyle(book);
  return computedStyle.backgroundColor;
}

//Tar in informationen från API och getBackroundcolor som parametrar och skapar upp och renderar HTML element.
function renderBookView(bookData, backgroundColor) {
  const html = `
    <div class="container__rendered">
      <div class="wrapper__rendered">
        <div class="book__rendered" style="background-color: ${backgroundColor}">
          <div class="vertical-line__page2"></div>
          <h2 class="title__page2">${bookData.title}</h2>
          <h3 class="author__page2">${bookData.author}</h3>
        </div>
        <div class="information__wrapper">
          <h2 class="title__information">${bookData.title}</h2>
          <h3 class="author__information">${bookData.author}</h3>
          <p class="text__information">${bookData.plot}</p>
          <div class="square__information" id="square__info">
            <div class="information__top">
              <p class="square__text" id="square__audience">Audience:</p>
              <p class="square__rendered" id="audience__rendered">${bookData.audience}</p>
              <p class="square__text" id="square__first__published">First published:</p>
              <p class="square__rendered" id="firstPublished__rendered">${bookData.year}</p>
            </div>
            <div class="information__bottom">
              <p class="square__text" id="square__pages">Pages:</p>
              <p class="square__rendered" id="pages__rendered">${bookData.pages}</p>
              <p class="square__text publisher" id="square__publisher">Publisher:</p>
              <p class="square__rendered" id="publisher__rendered">${bookData.publisher}</p>
            </div>
          </div>
          <button class="button__page2" id="button__rendered">Back to mainpage</button>
        </div>
      </div>
    </div>`;
  //Fäster de renderade HTML elementen till body
  document.body.innerHTML = html;
  //Aktivera den renderade knappen för att ta mig tillbaka till förstasidan.
  const backButton = document.getElementById("button__rendered");
  backButton.addEventListener("click", () => {
    window.location.reload();
  });
}
//Eventlistener för varje bok när den klickas på.
books.forEach((book) => {
  //Split ger mig en string tillbaka och parseInt förvandlar det till en siffra för att nå ID't på boken jag har klickat på.
  book.addEventListener("click", async () => {
    const bookId = parseInt(book.id.split("__nr__")[1]);

    try {
      const bookData = await getBookData(bookId);
      const backgroundColor = getBackgroundColor(book);
      console.log("Book Data:", bookData);
      console.log("Background Color:", backgroundColor);
      renderBookView(bookData, backgroundColor);
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
