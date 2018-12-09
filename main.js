
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
    if (searchBar.value === "") {
    }else{
        $.get('https://itunes.apple.com/search',
            {
                term: searchBar.value,
                media: 'music',
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
                    let itemSRC = item.previewUrl
                    $('#output').append(`<div class="item-wrapper"></div>`)
                    $('.item-wrapper').append(`
                    <div class="item">
                        <img src="${item.artworkUrl100}"></img>
                        <img class="target" src="${item.previewUrl}" controls></img>
                        <p>Track Name: ${item.trackName}</p>
                        <p>Artist: ${item.artistName}</p>
                        <p>Album: ${item.collectionName}</p>
                        <p>Track Name: ${item.trackName}</p>
                        
                    </div>
                `)
                }
            }
        )
    }
}


$('#output').on("click", ".item", function (event) {
    console.log(event)
    $('#player').attr("src", event.target.src).trigger('play')
} )



enterKey()
mouseClick()
