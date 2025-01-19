'use strict'


function getWikipediaArticle() {

    const url = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${searchValue}&format=json`
    return axios.get(url)
        .then(res => {
            console.log('GET FROM AXIOS')
            return res.data.query.search
        })
}