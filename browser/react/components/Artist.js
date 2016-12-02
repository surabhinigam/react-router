import React, { Component } from 'react';
import Songs from '../components/Songs';
import Albums from '../components/Albums';
import Album from '../components/Album';
import initialState from '../initialState';
import { Link } from 'react-router';

export default class Artist extends Component {
    constructor (props) {
        super(props);
        this.albums = this.props.albums;
        this.songs = this.props.songs;
        this.currentSong = this.props.currentSong;
        this.isPlaying = this.props.isPlaying;
        this.toggleOne = this.props.toggleOne;
        this.state = initialState;
    }
    componentDidMount () {
        const artistId = this.props.routeParams.artistId;
        const selectArtist = this.props.selectArtist;
        selectArtist(artistId);
    }

    render(){
        return (
            <div>
  				<h3>{ this.props.artist.name }</h3>
			  	<ul className="nav nav-tabs">
			    <li><Link to={`/artists/${this.props.artist.id}/albums`}>ALBUMS</Link></li>
			    <li><Link to={`/artists/${this.props.artist.id}/songs`}>SONGS</Link></li>
			  </ul>
			</div>

        );
    }
}
