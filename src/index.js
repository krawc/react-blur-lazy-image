import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
      loadImage: false,
    }
    this.imageLoaded = this.imageLoaded.bind(this);
    this.isInViewport = this.isInViewport.bind(this);
    this.verifyContainer = this.verifyContainer.bind(this);
  }


  componentDidMount() {
    if (this.verifyContainer()) this.props.container.addEventListener('scroll', this.isInViewport, true);
  }

  imageLoaded() {
    this.setState({
      imageLoaded: true,
    });
  }

  isInViewport(offset = 0) {
    if (this.verifyContainer() && this.altImage) {
      const top = this.altImage.getBoundingClientRect().top - this.props.container.getBoundingClientRect().top;
      const height = this.props.container.getBoundingClientRect().height;
      const left = this.altImage.getBoundingClientRect().left - this.props.container.getBoundingClientRect().left;
      const width = this.props.container.getBoundingClientRect().width;
      if (top <= height && left <= width) this.setState({
        loadImage: true,
      });
    }
  }

  verifyContainer() {
    if (this.props.container) return true;
    else console.error('%c[Lazy-Image]', 'font-weight:bold;', '\'container\' is not defined! please add image list after mounting the parent component, see: http://rohitsharma.xyz');
    return false;
  }

  render() {
    return (
      [(this.state.loadImage) ? <img
        key="original-img"
        ref={(node) => { this.image = node }}
        alt={this.props.alt}
        {...(this.props.htmlAttrs)}
        className={`${this.state.imageLoaded ? 'lazy-image-show' : ''} ${this.props.className}`}
        style={{ ...(this.props.style), display: this.state.imageLoaded ? '' : 'none' }}
        src={this.props.src}
        onLoad={this.imageLoaded}
      /> : null,
      (!this.state.imageLoaded) ?
        <img
          key="substitute-img"
          ref={(node) => { this.altImage = node }}
          alt={this.props.alt}
          {...(this.props.htmlAttrs)}
          className={`${this.props.className}`}
          style={{ ...(this.props.style) }}
          src={this.props.altSrc}
          onLoad={this.isInViewport}
        /> : null
      ]
    );
  }
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  altSrc: PropTypes.string.isRequired,
  alt: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  htmlAttrs: PropTypes.object,
};

Image.defaultProps = {
  alt: 'lazy-image',
  style: {},
  className: '',
  htmlAttrs: {},
};


export default Image;
