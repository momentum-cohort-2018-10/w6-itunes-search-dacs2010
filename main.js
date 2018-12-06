// - clear the search bar after a search or when reloading page
// - and i need the 'enter' key to exicute the search
// - have one player that plays everything
// - organize search results by artist, song title, or album
// - look into making every word capitalized

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
    
    $.ajax({
        url: 'https://itunes.apple.com/search',
        data: {
            term: searchBar.value,
            media: 'music'
        },
        success: function (jsonFile) {
            data = JSON.parse(jsonFile)
            console.log(data)
            let dataDisp = getId("output")
            let countDisp = makeElement('p')
            dataDisp.innerHTML = ""
            countDisp.innerText += `There are ${data.resultCount} hits for ${searchBar.value}`
            dataDisp.appendChild(countDisp)
            searchBar.value = ""

            for (let item of data.results) {
                let itemDisp = makeElement("div")
                itemDisp.classList.add("item")
                // things i want
                let itemImage = makeElement("img")
                let itemMedia = makeElement("video")
                let itemArtistName = makeElement("p")
                let itemAlbum = makeElement("p")
                let itemSongTitle = makeElement("p")
                // call elements 
                itemImage.src = item.artworkUrl100
                itemMedia.src = item.previewUrl
                itemMedia.controls = "controls"
                itemArtistName.innerText = `Artist Name: ${item.artistName}`
                itemAlbum.innerText = `Album Name: ${item.collectionName}`
                itemSongTitle.innerText = `Song Title: ${item.trackName}`
                // set elements as nodes
                itemDisp.appendChild(itemImage)
                itemDisp.appendChild(itemArtistName)
                itemDisp.appendChild(itemAlbum)
                itemDisp.appendChild(itemSongTitle)
                itemDisp.appendChild(itemMedia)
                // put them in here
                dataDisp.appendChild(itemDisp)
            }
        }
    })
}


enterKey()
mouseClick()