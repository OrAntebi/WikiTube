'use strict'


function onInit() {
    getVideos()
        .then(renderVideos)
        .then(renderSelectedVideo)

}


function renderVideos(videos) {
    const elVideosContainer = document.querySelector('.videos-list')

    let strHtml = videos.map(({ snippet: { title, thumbnails: { default: { url } } } }) => `
        <article class="video-item flex align-center" onclick="onClickVideo()">
            <img class="video-img" src="${url}" alt="${title}">
            <h4 class="video-title">${title}</h4>
        </article>
    `)
    elVideosContainer.innerHTML = strHtml.join('')
}

function renderSelectedVideo() {
    const selectedVideo = loadFromStorage(STORAGE_KEY_SELECTED_VIDEO) 
    const elSelectedVideoContainer = document.querySelector('.selected-video-container')

    let strHtml = `
        <iframe width="420" height="315"
            src="https://www.youtube.com/embed/${selectedVideo.id.videoId}">
        </iframe>
    `
    elSelectedVideoContainer.innerHTML = strHtml
}


function onSearchVideo(ev) {
    ev.preventDefault()

    const elInput = document.querySelector('.search-input')
    const value = elInput.value

    searchVideo(value)
    onInit()
    elInput.value = ''
}