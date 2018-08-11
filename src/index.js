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
    this.getContainer = this.getContainer.bind(this);
  }


  componentDidMount() {
    this.container = this.getContainer();
    if (this.container) this.container.addEventListener('scroll', this.isInViewport, true);
  }

  componentWillUnmount() {
    if (this.container) this.container.removeListener('scroll');
  }

  imageLoaded() {
    this.setState({
      imageLoaded: true,
    });
  }

  isInViewport(offset = 0) {
    if (this.container && this.altImage) {
      let top, height, left, width;
      if (this.container.self == this.container) {
        top = this.altImage.getBoundingClientRect().top;
        height = this.container.innerHeight;
        left = this.altImage.getBoundingClientRect().left;
        width = this.container.innerWidth;
      } else {
        top = this.altImage.getBoundingClientRect().top - this.container.getBoundingClientRect().top;
        height = this.container.getBoundingClientRect().height;
        left = this.altImage.getBoundingClientRect().left - this.container.getBoundingClientRect().left;
        width = this.container.getBoundingClientRect().width;
      }

      if (top <= height && left <= width) this.setState({
        loadImage: true,
      });
    }
  }

  getContainer() {
    if (this.props.container) return this.props.container;
    else if (window) return window;
    else console.error('%c[react-blur-lazy-image]', 'font-weight:bold;', '\'container\' is not defined! please add image list after mounting the parent component, see: https://www.npmjs.com/package/react-blur-lazy-image');
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
