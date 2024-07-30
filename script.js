//select input element
const inputElement = document.querySelector("input");
//select search button
const searchButton = document.querySelector("button");

//add eventlistener to the search button
searchButton.addEventListener("click", (event) => {
    console.log(inputElement.value);

    //extract input value and store it 
    const searchQuery = inputElement.value;

    //make get request to the url
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchQuery}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });
});

