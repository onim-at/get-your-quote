async function fetchData() {
  try {
    const tag = document.getElementById("select").value;
    const query = tag ? `?tags=${tag}` : "";

    const resQuote = await fetch(
      `https://api.quotable.io/quotes/random${query}`
    );

    if (!resQuote.ok) {
      throw new Error("Failed to fetch data, please try again");
    }

    const record = await resQuote.json();

    if (record && record.length > 0) {
      document.getElementById("content").textContent = record[0].content;
      document.getElementById("author").textContent = record[0].author;
    } else {
      console.error("No data found in the response.");
    }
  } catch (error) {
    console.error("Error fetching data, please try again:", error);
  }
}

async function init() {
  const selectElement = document.getElementById("select");

  const option = document.createElement("option");
  option.value = "";
  option.text = "Random";
  selectElement.appendChild(option);

  const resTags = await fetch(
    "https://api.quotable.io/tags?sortBy=quoteCount&order=-1"
  );
  const tags = await resTags.json();

  tags.forEach((tag) => {
    if (tag.quoteCount < 3) {
      return;
    }
    const option = document.createElement("option");
    option.value = tag.slug;
    option.text = tag.name;

    selectElement.appendChild(option);
  });

  fetchData();
}

init();
document.getElementById("refresh").addEventListener("click", fetchData);
