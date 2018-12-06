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
                // varaiables or list items
                let itemImage = makeElement("img")
                let itemArtistName = makeElement("p")
                let itemAlbum = makeElement("p")
                let itemSongTitle = makeElement("p")
                // call them 
                itemImage.src = item.artworkUrl100
                itemArtistName.innerText = `Artist Name: ${item.artistName}`
                itemAlbum.innerText = `Album Name: ${item.collectionName}`
                itemSongTitle.innerText = `Song Title: ${item.trackName}`
                //set them as nodes
                itemDisp.appendChild(itemImage)
                itemDisp.appendChild(itemArtistName)
                itemDisp.appendChild(itemAlbum)
                itemDisp.appendChild(itemSongTitle)
                dataDisp.appendChild(itemDisp)
            }
        }
    })
})
