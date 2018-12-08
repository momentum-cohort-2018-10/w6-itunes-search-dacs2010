
// - have one player that plays everything
// --event.target
// -- pass the media src to the players scr apon request
// - clear when reloading page
// - organize search results by artist, song title, or album
// - look into making every word capitalized 
// - by clicking on any of the media text should take you to approperate page


function getId(id) {
    return document.getElementById(id)
}


function makeElement(tag) {
    return document.createElement(tag)
}


const searchBar = getId("search-bar")
const submitButton = getId("submit")


function enterKey() {
    searchBar.addEventListener("keydown", function(event) {
        if (event.code === "Enter") {
            searchEvent(event)
        }
    })
    
}


function mouseClick() {
    submitButton.addEventListener("click", searchEvent)
}


function searchEvent() {
    $.get('https://itunes.apple.com/search',
        {
            term: searchBar.value,
            media: 'music'
        },
        function (jsonFile) {
            data = JSON.parse(jsonFile)
            console.log(data)
            let dataDisp = getId("output")
            let countDisp = makeElement('p')
            dataDisp.innerHTML = ""
            countDisp.innerText += `There are ${data.resultCount} hits for "${searchBar.value}"`
            dataDisp.appendChild(countDisp)
            searchBar.value = ""

            for (let item of data.results) {
                // look into replace or any method to change the query for the image size
                let itemArt = item.artworkUrl100
                $('#output').append(`<div class="item"></div>`)
                $('.item').append(`
                    <img src="${item.artworkUrl100}"></img>

                    <p>${item.artistName}</p>
                    <p>${item.collectionName}</p>
                    <p>${item.trackName}</p>
                `)
            }
        }
    )
}
// put a button into each item  
// access the bubble up and execut the update command
$('.item').on("click", function (event) {
    console.log(event)
} )
// point to the id of the player...
// listen for bubble up event then...
// update the video nodes scr with the target




enterKey()
mouseClick()