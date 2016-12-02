import React, { Component } from 'react';
import axios from 'axios';

import initialState from '../initialState';
import AUDIO from '../audio';

import Albums from '../components/Albums.js';
import Album from '../components/Album';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';

import { convertAlbum, convertAlbums, convertSong, skip } from '../utils';

export default class AppContainer extends Component {

    constructor (props) {
        super(props);
        this.state = initialState;

        this.toggle = this.toggle.bind(this);
        this.toggleOne = this.toggleOne.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.selectAlbum = this.selectAlbum.bind(this);
        this.selectArtist = this.selectArtist.bind(this);
    }

    componentDidMount () {
        // axios.get('/api/albums/')
        // .then(res => res.data)
        // .then(album => this.onLoad(convertAlbums(album)));

        const P1 = axios.get('/api/artists/')
        .then(res => res.data);

        const P2 = axios.get('/api/albums/')
        .then(res => res.data);

        Promise.all([P1, P2]) // [artists, albums]
        .then((results) => {
            let artists = results[0];
            let albums = results[1];
            this.onLoad(artists, convertAlbums(albums))
        });

        AUDIO.addEventListener('ended', () =>
        this.next());
        AUDIO.addEventListener('timeupdate', () =>
        this.setProgress(AUDIO.currentTime / AUDIO.duration));
    }

    onLoad (artists, albums) {
        this.setState({
            albums: albums,
            artists: artists
        });
    }

    play () {
        AUDIO.play();
        this.setState({ isPlaying: true });
    }

    pause () {
        AUDIO.pause();
        this.setState({ isPlaying: false });
    }

    load (currentSong, currentSongList) {
        AUDIO.src = currentSong.audioUrl;
        AUDIO.load();
        this.setState({
            currentSong: currentSong,
            currentSongList: currentSongList
        });
    }

    startSong (song, list) {
        this.pause();
        this.load(song, list);
        this.play();
    }

    toggleOne (selectedSong, selectedSongList) {
        if (selectedSong.id !== this.state.currentSong.id)
        this.startSong(selectedSong, selectedSongList);
        else this.toggle();
    }

    toggle () {
        if (this.state.isPlaying) this.pause();
        else this.play();
    }

    next () {
        this.startSong(...skip(1, this.state));
    }

    prev () {
        this.startSong(...skip(-1, this.state));
    }

    setProgress (progress) {
        this.setState({ progress: progress });
    }

    selectAlbum (albumId) {
        axios.get(`/api/albums/${albumId}`)
        .then(res => res.data)
        .then(album => {
            this.setState({
            selectedAlbum: convertAlbum(album)
        })});
    }

    selectArtist (artistId) {
        const p1 = axios.get(`/api/artists/${artistId}`)
                    .then(res => res.data);

        const p2 = axios.get(`/api/artists/${artistId}/albums`)
                    .then(res => res.data);

        const p3 = axios.get(`/api/artists/${artistId}/songs`)
                    .then(res => res.data);

        Promise.all([p1, p2, p3])
         .then((results) => {
            let artist = results[0];
            let albums = results[1];
            let songs = results[2];
            console.log("results: ", results);
            songs = songs.map(function(song){
              return convertSong(song);
            })
            this.setState({selectedArtist: artist, albums: convertAlbums(albums), currentSongList: songs});
        });
    }



    render () {
        return (
            <div id="main" className="container-fluid">
            <div className="col-xs-2">
            <Sidebar />
            </div>
            <div className="col-xs-10">
            {
                this.props.children ?
                React.cloneElement(this.props.children, {

                    // Album (singular) component's props
                    album: this.state.selectedAlbum,
                    currentSong: this.state.currentSong,
                    isPlaying: this.state.isPlaying,
                    toggle: this.toggleOne,

                    // Albums (plural) component's props
                    albums: this.state.albums,
                    selectAlbum: this.selectAlbum, // note that this.selectAlbum is a method, and this.state.selectedAlbum is the chosen album

                    // Artists (plural)
                    artists: this.state.artists,

                    //Artist (singular)
                    artist: this.state.selectedArtist,
                    selectArtist: this.selectArtist,
                    songs: this.state.currentSongList


                })
                : null
            }
            </div>
            <Player
            currentSong={this.state.currentSong}
            currentSongList={this.state.currentSongList}
            isPlaying={this.state.isPlaying}
            progress={this.state.progress}
            next={this.next}
            prev={this.prev}
            toggle={this.toggle}
            />
            </div>
        );
    }
}
