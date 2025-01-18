'use strict'


function onInit() {
    getVideos()
        .then(renderVideos)
        .then(renderSelectedVideo)

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
