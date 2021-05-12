$('#search-button').click(function(e) {
    e.preventDefault();

    var inputSearch = $('#search').val();

    if (inputSearch.trim().length > 4){

    }
    else 
    alert("Please enter more than 4 characters");
})