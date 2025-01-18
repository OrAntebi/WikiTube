'use strict'


const YOUTUBE_API_KEY = 'AIzaSyCh2GXkYB-goP79K1T_uGWsCVdhrhGp2hk'

const STORAGE_KEY_VIDEOS = 'videoDB'

var searchValue = 'Beatls'



function getVideos() {

    const videos = loadFromStorage(STORAGE_KEY_VIDEOS)
    if (videos) {
        console.log('GET FROM STORAGE')
        console.log(videos)
        return Promise.resolve(videos)
    }

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YOUTUBE_API_KEY}&q=${searchValue}` 
    return axios.get(url)
        .then(res => res.data)
        .then(res => {
            console.log('GET FROM AXIOS')
            var videos = res.items
            console.log(videos)

            saveToStorage(STORAGE_KEY_VIDEOS, videos)
            return videos
        })
}