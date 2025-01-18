'use strict'


function onInit() {
    getVideos()
        .then(renderVideos)
        .then(renderSelectedVideo)

    getWikipediaArticle()
        .then(renderWikipedia)
}


function renderVideos(videos) {
    const elVideosContainer = document.querySelector('.videos-list')

    let strHtml = videos.map(({ id: { videoId }, snippet: { title, thumbnails: { default: { url } } } }) => `
        <article class="video-item flex align-center" onclick="onClickVideo('${videoId}')">
            <img class="video-img" src="${url}" alt="${title}">
            <p class="video-title">${title}</p>
        </article>
    `)

    elVideosContainer.innerHTML = strHtml.join('')
}

function renderSelectedVideo() {
    const selectedVideo = loadFromStorage(STORAGE_KEY_SELECTED_VIDEO)
    const elSelectedVideoContainer = document.querySelector('.selected-video-container')

    let strHtml = `
        <iframe class="selected-video"
            src="https://www.youtube.com/embed/${selectedVideo.id.videoId}">
        </iframe>
    `
    elSelectedVideoContainer.innerHTML = strHtml
}

function renderWikipedia(article) {
    const elWikipediaContainer = document.querySelector('.wikipedia-results-container')

    let strHtml = article.map(result => `
        <div class="result-item">
            <h4>
                <a href="https://en.wikipedia.org/?curid=${result.pageid}">${result.title}</a>
            </h4>
            <p>${result.snippet}</p>
        </div>
    `)

    elWikipediaContainer.innerHTML = strHtml.join('')
}


function onSearchVideo(ev) {
    ev.preventDefault()

    const elInput = document.querySelector('.search-input')
    const value = elInput.value

    searchVideo(value)
    onInit()
    elInput.value = ''
}

function onClickVideo(videoId) {
    clickVideo(videoId)
    renderSelectedVideo()
}
