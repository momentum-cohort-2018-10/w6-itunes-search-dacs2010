function getId(id) {
    return document.getElementeById(id)
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
        success: function(results){
            console.log(results)
            let 
        }
    })
})