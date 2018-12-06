function getId(id) {
    return document.getElementById(id)
}

function makeElement(tag) {
    return document.createElement(tag)
}

const searchBar = getId("search-bar")
const submitButton = getId("submit")

submitButton.addEventListener('click', function(event){
    // look into making every word capitalized
    console.log(searchBar.value)
    $.ajax({
        url: 'https://itunes.apple.com/search',
        data: {
            term: searchBar.value,
            country: 'US'
        },
        success: function (jsonFile){
            data = JSON.parse(jsonFile)
            console.log(data)
            let dataDisp = getId("output")
            let countDisp = makeElement('p')
            dataDisp.innerHTML = ""
            countDisp.innerText += `There are ${data.resultCount} hits for ${searchBar.value}`
            dataDisp.appendChild(countDisp)

            for (let item of data.results) {
                let itemDisp = makeElement("div")
                itemDisp.classList.add("item")
                // things i want
                let itemImage = makeElement("img")
                let itemSong = makeElement("video")
                let itemArtistName = makeElement("p")
                let itemAlbum = makeElement("p")
                let itemSongTitle = makeElement("p")
                // call elements 
                itemImage.src = item.artworkUrl100
                itemSong.src = item.previewUrl
                itemSong.controls = "controls"
                itemArtistName.innerText = `Artist Name: ${item.artistName}`
                itemAlbum.innerText = `Album Name: ${item.collectionName}`
                itemSongTitle.innerText = `Song Title: ${item.trackName}`
                //set elements as nodes
                itemDisp.appendChild(itemImage)
                itemDisp.appendChild(itemSong)
                itemDisp.appendChild(itemArtistName)
                itemDisp.appendChild(itemAlbum)
                itemDisp.appendChild(itemSongTitle)
                dataDisp.appendChild(itemDisp)
            }
        }
    })
})
