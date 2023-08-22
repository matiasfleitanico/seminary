import React from 'react';
import PropTypes from 'prop-types';
import './FilesCss/subject.css';

function VideoPlayer({ videoUrl }) {
  return (
    <div className="video-player">
      <video controlsList='nodownload' autoPlay={true} controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
};

export default VideoPlayer;