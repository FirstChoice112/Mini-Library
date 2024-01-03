"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const books = document.querySelectorAll(".book");
function getBookData(bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books/${bookId}`);
            if (!response.ok) {
                throw new Error(`HTTP error. Status: ${response.status} `);
            }
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error("Error fetching book data:", error);
            throw error;
        }
    });
}
function getBackgroundColor(book) {
    const computedStyle = window.getComputedStyle(book);
    return computedStyle.backgroundColor || "";
}
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
    document.body.innerHTML = html;
    const backButton = document.getElementById("button__rendered");
    if (backButton) {
        backButton.addEventListener("click", () => {
            window.location.reload();
        });
    }
}
books.forEach((book) => {
    book.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        const bookId = parseInt(book.id.split("__nr__")[1]);
        try {
            const bookData = yield getBookData(bookId);
            const backgroundColor = getBackgroundColor(book);
            console.log("Book Data:", bookData);
            console.log("Background Color:", backgroundColor);
            renderBookView(bookData, backgroundColor);
        }
        catch (error) {
            console.error("Error:", error);
        }
    }));
});
