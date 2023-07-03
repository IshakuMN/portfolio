document.addEventListener('DOMContentLoaded', loadComic);

async function loadComic() {
  const email = 'i.march@innopolis.university';
  const apiUrl = `https://fwd.innopolis.university/api/hw2?email=${email}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.text();

    const comicUrl = `https://fwd.innopolis.university/api/comic?id=${data}`;
    const comicResponse = await fetch(comicUrl);
    const comicData = await comicResponse.json();

    const comicImage = document.getElementById("comicImage");
    comicImage.setAttribute("src", comicData.img);

    const comicTitle = document.getElementById("comicTitle");
    comicTitle.textContent = `Title: ${comicData.safe_title}`;

    const date = new Date(comicData.year, comicData.month, comicData.day).toLocaleDateString();
    const comicDate = document.getElementById("comicDate");
    comicDate.textContent = `Date: ${date}`;

  } catch (error) {
    console.log(error);
  }
}
