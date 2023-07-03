var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//import { formatDistanceToNow } from 'date-fns';
document.addEventListener('DOMContentLoaded', loadComic);
function loadComic() {
    return __awaiter(this, void 0, void 0, function* () {
        const email = 'i.march@innopolis.university';
        const apiUrl = `https://fwd.innopolis.university/api/hw2?email=${email}`;
        try {
            const response = yield fetch(apiUrl);
            const data = yield response.text();
            const comicId = parseInt(data, 10);
            const comicUrl = `https://fwd.innopolis.university/api/comic?id=${comicId}`;
            const comicResponse = yield fetch(comicUrl);
            const comicData = yield comicResponse.json();
            const comicImage = document.getElementById("comicImage");
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
        }
        catch (error) {
            console.log(error);
        }
    });
}
