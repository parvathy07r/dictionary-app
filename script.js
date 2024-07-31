//select input element
const inputElement = document.querySelector("input");
//select search button
const searchButton = document.querySelector("button");
//select result section
const resultSection = document.querySelector(".result-section");
//select section to display nouns 
const nounSection = document.querySelector(".nouns");
//select section to display verbs
const verbSection = document.querySelector(".verbs");
//select html element to display word
const displayWord = document.querySelector(".word");

//add eventlistener to the search button
searchButton.addEventListener("click", (event) => {
  console.log(inputElement.value);



  //extract input value and store it 
  const searchQuery = inputElement.value;

  displayWord.innerHTML = "";
  displayWord.innerHTML += `<span class="word">${searchQuery}</span>`

  nounSection.innerHTML = "";
  verbSection.innerHTML = "";

  //make get request to the url
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchQuery}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      data[0].meanings.forEach((meaning) => {
        if (meaning.partOfSpeech === 'noun') {
          nounSection.innerHTML += `
                <div class="noun-display">
                        <span class="heading">Noun</span>
                        <ol>
                            ${meaning.definitions.map((definition) =>
            `<li>${definition.definition}</li>`
          ).join('')}
                        </ol>
                </div>
                `
        }
        if (meaning.partOfSpeech === 'verb') {
          verbSection.innerHTML += `
                <div class="verb-display">
                        <span class="heading">Verb</span>
                        <ol>
                            ${meaning.definitions.map((definition) =>
            `<li>${definition.definition}</li>`
          ).join('')}
                        </ol>
                </div>
                `
          verbSection.style.borderTop = "1px solid skyblue";
        }
      })
    })
    .catch((error) => {
      console.error(error);
    });
});


