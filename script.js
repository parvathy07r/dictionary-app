//select input element
const inputElement = document.querySelector("input");
//select search button
const searchButton = document.querySelector("button");

//add eventlistener to the search button
searchButton.addEventListener("click", (event) => {
    console.log(inputElement.value);
});

