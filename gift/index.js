// look back at the <readme.md> file for some hints //
// working API key //
const giphyApiKey = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";

// Select existing elements from the HTML

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("generate-gifs-btn");
const clearButton = document.getElementById("clear-gifs-btn");
const displayDiv = document.getElementById("display-div");

// Event listener for the Search button
searchButton.addEventListener("click", async function () {
  const searchTerm = searchInput.value.trim();

  if (!searchTerm) {
    alert("Please enter a search term!");
    return;
  }

  try {
    const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
      params: {
        q: searchTerm,
        api_key: giphyApiKey,
        limit: 1, // Fetch one GIF
      },
    });

    const gifUrl = response.data.data[0]?.images?.fixed_height?.url;

    if (gifUrl) {
      // Create a div for the GIF and append to the display container
      
      const img = document.createElement("img");
      img.src = gifUrl;
      img.alt = searchTerm;
      img.style.margin = "10px";
      img.style.borderRadius = "10px";
      displayDiv.appendChild(img);
            
    } else {
      alert("No GIF found for the search term!");
    }
  } catch (error) {
    console.error("Error fetching GIF:", error);
    alert("Something went wrong while fetching the GIF.");
  }

  searchInput.value = ""; // Clear the input field
});

// Event listener for the Clear button
clearButton.addEventListener("click", function () {
  displayDiv.innerHTML = ""; // Clear all GIFs
});
