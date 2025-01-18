'use strict'

const YOUTUBE_API_KEY = 'AIzaSyBZTadHl9714-uclax5w-o9sMjcHHrz9qM'

const STORAGE_KEY_SEARCH_INPUT = 'searchInputDB'
const STORAGE_KEY_VIDEOS = 'videoDB'
const STORAGE_KEY_SELECTED_VIDEO = 'selectedVideo'

let videos = loadFromStorage(STORAGE_KEY_VIDEOS) || {}
let searchValue = loadFromStorage(STORAGE_KEY_SEARCH_INPUT) || 'Beatles'
let selectedVideo = loadFromStorage(STORAGE_KEY_SELECTED_VIDEO) || {}


function getVideos() {
    if (videos[searchValue]) {
        console.log('GET FROM STORAGE')
        selectedVideo = videos[searchValue][0]
        _saveSearchInput()
        _saveSelectedVideo()
        return Promise.resolve(videos[searchValue])
    }

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YOUTUBE_API_KEY}&q=${searchValue}`
    return axios.get(url)
        .then(res => {
            console.log('GET FROM AXIOS')
            const fetchedVideos = res.data.items
            _selectFirstVideo(fetchedVideos)
            videos[searchValue] = fetchedVideos
            _saveVideos()
            return fetchedVideos
        })
}


function searchVideo(newValue) {
    searchValue = newValue
    _saveSearchInput()
}

function clickVideo(id) {
    selectedVideo = _searchVideoById(id)
    _saveSelectedVideo()
}


/* ----------- LOCAL FUNCTIONS ----------- */

function _selectFirstVideo(videos) {
    selectedVideo = videos[0]
    _saveSelectedVideo()
}

function _searchVideoById(id) {
    return videos[searchValue].find(video => video.id.videoId === id);
}

function _saveVideos() {
    saveToStorage(STORAGE_KEY_VIDEOS, videos)
}


function _saveSelectedVideo() {
    saveToStorage(STORAGE_KEY_SELECTED_VIDEO, selectedVideo)
}


function _saveSearchInput() {
    saveToStorage(STORAGE_KEY_SEARCH_INPUT, searchValue)
}
