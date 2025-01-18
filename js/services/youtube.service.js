'use strict'

const YOUTUBE_API_KEY = 'AIzaSyBZTadHl9714-uclax5w-o9sMjcHHrz9qM'

const STORAGE_KEY_SEARCH_INPUT = 'seachInputDB'
const STORAGE_KEY_VIDEOS = 'videoDB'
const STORAGE_KEY_SELECTED_VIDEO = 'selectedVideo'

var searchValue = loadFromStorage(STORAGE_KEY_SEARCH_INPUT) || 'Beatles'
var selectedVideo = {}


function getVideos() {
    const storedVideos = loadFromStorage(STORAGE_KEY_VIDEOS) || {}
    const storedSelectedVideo = loadFromStorage(STORAGE_KEY_SELECTED_VIDEO)

    if (storedSelectedVideo) selectedVideo = storedSelectedVideo

    if (storedVideos[searchValue]) {
        console.log('GET FROM STORAGE')
        selectedVideo = storedVideos[searchValue][0]
        _saveSearchInput()
        _saveSelectedVideo()
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
            _saveVideos(storedVideos)
            return videos
        })
}


function searchVideo(newValue) {
    searchValue = newValue
    _saveSearchInput()
}


/* ----------- LOCAL FUNCTIONS ----------- */

function _selectFirstVideo(videos) {
    selectedVideo = videos[0]
    _saveSelectedVideo()
}


function _saveVideos(storedVideos) {
    saveToStorage(STORAGE_KEY_VIDEOS, storedVideos)
}


function _saveSelectedVideo() {
    saveToStorage(STORAGE_KEY_SELECTED_VIDEO, selectedVideo)
}


function _saveSearchInput() {
    saveToStorage(STORAGE_KEY_SEARCH_INPUT, searchValue)
}