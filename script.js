const formData = document.querySelector("form");
const displayWord = document.querySelector(".word");
const displayPhonetic = document.querySelector(".display-phonetic");
const sound = document.getElementById("sound");
const meaningSection = document.querySelector(".meaning-section");

formData.addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.target;
  const word = form["word"].value;

  displayWord.innerHTML = "";
  meaningSection.innerHTML = "";
  displayPhonetic.innerHTML = "";

  displayWord.innerHTML += `<span class="word">${word}</span>`;

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const phoneticText = data[0].phonetics[0]

      if (phoneticText) {
        displayPhonetic.innerHTML += `
          <span class="phonetic">${phoneticText.text}</span>
          <button class="audio-button" onClick="playSound('${phoneticText.audio}')">audio</button> `
      }
      data[0].meanings.forEach((meaning) => {
        meaningSection.innerHTML += `
          <span class="heading">${capitalize(meaning.partOfSpeech)}</span>
          <ol>
            ${meaning.definitions.map((definition) =>
              `<li>${definition.definition}</li>`
            ).join('')}
          </ol>`
      })
    })
    .catch((error) => {
      console.error(error);
    });
});

function playSound(audio) {
  sound.src = audio;
  sound.play();
}

function capitalize(word) {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
}
