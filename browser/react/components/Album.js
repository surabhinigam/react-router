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

  this.setState({
      album: selectAlbum(albumId)
    });
}


render(){
  return (
    <div className="album">
      <div>
        <h3>{ this.state.album.name }</h3>
        <img src={ this.state.album.imageUrl } className="img-thumbnail" />
      </div>
      <Songs
        songs={this.state.album.songs}
        currentSong={this.state.currentSong}
        isPlaying={this.state.isPlaying}
        toggleOne={this.state.toggleOne} />
    </div>
  );
}

}
