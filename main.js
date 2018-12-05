function getId(id) {
    return document.getElementById(id)
}

const searchBar = getId("search-bar")
const submitButton = getId("submit")

submitButton.addEventListener('click', function(event){
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
            let countDisp = document.createElement('p')
            countDisp.innerText = `you got ${data.resultCount} hits`
            dataDisp.appendChild(countDisp)

            // for (let item in data.results)
        }
    })
})