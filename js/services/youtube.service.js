'use strict'


const YOUTUBE_API_KEY = 'AIzaSyBZTadHl9714-uclax5w-o9sMjcHHrz9qM'

const STORAGE_KEY_VIDEOS = 'videoDB'
const STORAGE_KEY_SELECTED_VIDEO = 'selectedVideo'

var searchValue = 'Beatls'
var selectedVideo = {}




function getVideos() {
    const storedVideos = loadFromStorage(STORAGE_KEY_VIDEOS) || {}
    const storedSelectedVideo = loadFromStorage(STORAGE_KEY_SELECTED_VIDEO)

    if (storedSelectedVideo) selectedVideo = storedSelectedVideo

    if (storedVideos[searchValue]) {
        console.log('GET FROM STORAGE')
        selectedVideo = storedVideos[searchValue][0]
        saveToStorage(STORAGE_KEY_SELECTED_VIDEO, selectedVideo)
        return Promise.resolve(storedVideos[searchValue])
    }

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YOUTUBE_API_KEY}&q=${searchValue}`

    return axios.get(url)
        .then(res => res.data)
        .then(res => {
            console.log('GET FROM AXIOS')
            let videos = res.items

            _selectFirstVideo(videos)
            storedVideos[searchValue] = videos
            saveToStorage(STORAGE_KEY_VIDEOS, storedVideos)

            return videos
        })
}


function searchVideo(newValue) {
    searchValue = newValue
}

function _selectFirstVideo(videos) {
    selectedVideo = videos[0]
    saveToStorage(STORAGE_KEY_SELECTED_VIDEO, videos[0])
}