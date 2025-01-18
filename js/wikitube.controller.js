'use strict'


function onInit() {
    getVideos()
        .then(renderVideos)
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