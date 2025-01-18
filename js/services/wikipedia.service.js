'use strict'


function getWikipediaArticle() {

    const url = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${searchValue}&format=json`
    console.log(url)
    return axios.get(url)
        .then(res => {
            console.log('GET FROM AXIOS')
            const article = res.data.query.search
            console.log(article)
            return article
        })
}