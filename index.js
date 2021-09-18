// spinner 
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

const searchBook = () => {
    const searchFeild = document.getElementById('search-feild');
    toggleSpinner('block');
    const searchText = searchFeild.value;
    searchFeild.value = '';
    // error handle 
    if (searchText === '') {
        const error = document.getElementById('error-2');
        error.innerHTML = 'Please Write something!';
        toggleSpinner('none')
    }
    else {
        const error = document.getElementById('error-2');
        error.innerHTML = '';
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs));
        const url2 = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url2)
            .then(res => res.json())
            .then(data => displaySearchAmount(data));
    }
}
const displaySearchResult = books => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    // error handle 
    if (books.length === 0) {
        const error = document.getElementById('error-1');
        error.innerHTML = 'No Result found!! Give a valid book name '
        toggleSpinner('none');
    }
    else {
        const error = document.getElementById('error-1');
        error.innerHTML = '';

        books.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
          <div class="card h-100">
              <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="">
              <div class="card-body">
                  <h5 class="card-title">Book Name : ${book.title}</h5>
                  <p class="card-text">Author Name : ${book.author_name}</p>
                  <p class="card-text">Publisher : ${book.publisher}</p>
                  <p class="card-text">first publish year : ${book.first_publish_year}</p>

              </div>
          </div>`
            searchResult.appendChild(div);
        });
        toggleSpinner('none');
    }
}
// search amount handle 
const displaySearchAmount = amount => {
    const h1 = document.getElementById('h1');
    h1.textContent = '';
    h1.style.backgroundColor = 'gray';
    h1.innerHTML = `Total search Found = ${amount.numFound};`
}