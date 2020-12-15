import React, { useState, useRef, useEffect } from 'react'
const data = require('../../playlist')

const Content = () => {
  const [state, setState] = useState({
    playlist: '',
    suffle: false,
    playing: {
      isSongPlaying: false,
      song: ''
    },
    lastPlayingSong: ''
  })

  let audioElement = useRef()

  const {
    playlist,
    suffle,
    playing: { isSongPlaying, song },
    lastPlayingSong
  } = state

  useEffect(() => {
    setState({
      ...state,
      playlist: data.default,
      playing: {
        isSongPlaying: false,
        song: data.default[0]
      },
      lastPlayingSong: data.default[data.default.length - 1]
    })
  }, [])

  const getRandomNumber = () => {
    return Math.floor(Math.random() * Math.floor(playlist.length))
  }

  const getIndexOfSong = (song) => {
    return playlist.findIndex((el) => {
      if (el.id === song.id) {
        return true
      }
    })
  }

  const next = (e) => {
    e.preventDefault()
    let nextSongIndex
    if (suffle) {
      nextSongIndex = getRandomNumber()
    } else {
      const getIndexOfCurrentSong = getIndexOfSong(song)
      nextSongIndex =
        getIndexOfCurrentSong < data.default.length - 1
          ? getIndexOfCurrentSong + 1
          : 0
    }
    setState({
      ...state,
      playing: {
        ...state.playing,
        isSongPlaying: true,
        song: playlist[nextSongIndex]
      },
      lastPlayingSong: song
    })
  }

  const prev = (e) => {
    e.preventDefault()
    setState({
      ...state,
      playing: {
        ...state.playing,
        isSongPlaying: true,
        song: lastPlayingSong
      }
    })
  }

  const action = (e) => {
    e.preventDefault()
    if (isSongPlaying) {
      setState({
        ...state,
        playing: {
          ...state.playing,
          isSongPlaying: false
        }
      })
      audioElement.pause()
    } else {
      setState({
        ...state,
        playing: {
          ...state.playing,
          isSongPlaying: true
        }
      })
      audioElement.play()
    }
  }

  const handleSuffle = () => {
    setState({
      ...state,
      suffle: !suffle
    })
  }

  const playSong = (e, song) => {
    e.preventDefault()
    setState({
      ...state,
      playing: {
        ...state.playing,
        isSongPlaying: true,
        song: song
      }
    })
  }

  useEffect(() => {
    if (song && isSongPlaying) audioElement.play()
  }, [song])

  const displayPlaylist = () => {
    return playlist.map((el) => {
      const { id, album, artist, track } = el
      return (
        <li key={id}>
          <div
            className={`${
              song && song.id === id ? 'song-card-body-focus' : 'song-card-body'
            }`}
            onClick={(e) => playSong(e, el)}
            tabIndex="0"
          >
            <h5 className="title">{track}</h5>
            <p className="song-description">{`${artist} - ${album}`}</p>
          </div>
        </li>
      )
    })
  }

  return (
    <div className="container">
      <audio
        className="audio"
        ref={(input) => {
          audioElement = input
        }}
        controls
        src={song.url}
      ></audio>
      <div className="text-center">
        <h3 className="song-title">{song.track}</h3>
        <ul className="nav-buttons">
          <li>
            <button type="button" onClick={prev} className="button btn-left">
              Prev
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={action}
              className="button btn-middle"
            >
              {isSongPlaying ? 'Pause' : 'Play'}
            </button>
          </li>
          <li>
            <button type="button" onClick={next} className="button btn-right">
              Next
            </button>
          </li>
        </ul>
      </div>
      <div className="container playlist-container">
        <div className="playlist-header">
          <div className="playlist-container">
            <span className="text-muted">PLAYLIST</span>
          </div>
          <div className="form-check-container">
            <div className="form-check">
              <input
                className="form-check-input"
                name="suffle"
                type="checkbox"
                onChange={handleSuffle}
                value={suffle}
                checked={suffle}
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Shuffle
              </label>
            </div>
          </div>
        </div>
        <div className="songs-list">
          <ul>{playlist ? displayPlaylist() : ''}</ul>
        </div>
      </div>
    </div>
  )
}

export default Content
