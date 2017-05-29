import React, { Component } from 'react';

class LyricList extends Component {
  renderLyrics(lyrics) {
    return lyrics.map(({ id, content }) => {
      return (
        <li key={id} className="collection-item">
          {content}
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="collection">
        {this.renderLyrics(this.props.lyrics)}
      </ul>
    );
  }
}

export default LyricList;
