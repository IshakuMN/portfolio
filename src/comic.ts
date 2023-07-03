
import ComicData from "./apiTypes";
import { formatDistanceToNow } from 'date-fns';

document.addEventListener('DOMContentLoaded', loadComic);

async function loadComic() {
  const email: string = 'i.march@innopolis.university';
  const apiUrl: string = `https://fwd.innopolis.university/api/hw2?email=${email}`;

  try {
    const response = await fetch(apiUrl);
    const data: string = await response.text();
    const comicId: number = parseInt(data, 10);

    const comicUrl: string = `https://fwd.innopolis.university/api/comic?id=${comicId}`;
    const comicResponse = await fetch(comicUrl);
    const comicData: ComicData = await comicResponse.json();

    const comicImage = document.getElementById("comicImage") as HTMLImageElement;
    comicImage.setAttribute("src", comicData.img);

    const comicTitle = document.getElementById("comicTitle");
    if (comicTitle !== null) {
      comicTitle.textContent = `Title: ${comicData.safe_title}`;
    }

    const date = new Date(comicData.year, comicData.month - 1, comicData.day).toLocaleDateString();
    const comicDate = document.getElementById("comicDate");
    if (comicDate !== null) {
      comicDate.textContent = `Date: ${date}`;
    }

    const releaseDate = new Date(comicData.year, comicData.month - 1, comicData.day);
    const relativeTime = formatDistanceToNow(releaseDate);
    const comicRelativeTime = document.getElementById("fromNow");

    if (comicRelativeTime !== null) {
      comicRelativeTime.textContent = `Released: ${relativeTime} ago`;
    }
  } catch (error) {
    console.log(error);
  }
}
