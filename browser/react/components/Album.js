import React, { Component } from 'react';
import Songs from '../components/Songs';
import initialState from '../initialState';

export default class Album extends Component {
    constructor (props) {
        super(props);
        this.album = this.props.album;
        this.currentSong = this.props.currentSong;
        this.isPlaying = this.props.isPlaying;
        this.toggleOne = this.props.toggleOne;
        this.state = initialState;
    }
    componentDidMount () {
        const albumId = this.props.routeParams.albumId;
        const selectAlbum = this.props.selectAlbum;

        selectAlbum(albumId);
    }

    render(){
        return (
            <div className="album">
            <div>
            <h3>{ this.props.album.name }</h3>
            <img src={ this.props.album.imageUrl } className="img-thumbnail" />
            </div>
            <Songs
            songs={this.props.album.songs}
            currentSong={this.props.currentSong}
            isPlaying={this.props.isPlaying}
            toggleOne={this.props.toggle} />
            </div>
        );
    }
}
