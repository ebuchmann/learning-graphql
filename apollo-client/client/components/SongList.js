import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import gql from 'graphql-tag';
import fetchSongs from '../queries/fetchSongs';

class SongList extends Component {
  async onSongDelete(id) {
    await this.props.mutate({ variables: { id } });
    this.props.data.refetch();
  }

  renderSongs(song) {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li className="collection-item" key={id}>
          <Link to={`/songs/${id}`}>
            {title}
          </Link>
          <i className="material-icons" onClick={() => this.onSongDelete(id)}>
            delete
          </i>
        </li>
      );
    });
  }

  render() {
    if (this.props.data.loading) { return <div>Loading...</div> };
  
    return (
      <div>
        <ul className="collection">
          {this.renderSongs()}
        </ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    )
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(
  graphql(fetchSongs)(SongList)
);
