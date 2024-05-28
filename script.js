console.log("Lets write javascript");


async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text();
    console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/song/")[1])
        }
    }
    return songs
}


async function main() {
    // Get the list of the all song
    let songs = await getSongs()
    console.log(songs)

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> ${song.replaceAll("%20", " ")} </li>`;

    }

    // Play the first song
    var audio = new Audio(songs[5]);
    // audio.play();

    audio.addEventListener("loadeddata", () => {
        console.log(audio.duration, audio.currentSrc, audio.currentTime)
        // The duration variable now holds the duration (in secound) of the audio clip.
    })



}
main()