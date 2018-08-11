# react-blur-lazy-image
lazy loading images in progressive way, loads image when its in user's viewport

## Demo
[http://rohitsharma.xyz/projects/react-blur-lazy-image/](http://rohitsharma.xyz/projects/react-blur-lazy-image/)

## Features (1.0.x)
* allow loading images only when the image is in user's viewport
* fetches an image in background and then replaces blurred image (preview)
* Shows a placeholder images, preferrably blured (can be obtained by using extremely low resolution image) during the load
* Use of CSS transitions to make image replacement smooth.
* can be used in image slider (where large number of images used)

## Installation
### npm
```
npm install react-blur-lazy-image --save
```
### yarn
```
yarn add react-blur-lazy-image
```

## Usage
```js
import React, { Component } from 'react';
import Image from 'react-blur-lazy-image';
import './../node_modules/react-blur-lazy-image/dist/index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const image1 = 'http://via.placeholder.com/3000x2000';
    const imageAlt1 = 'http://via.placeholder.com/6x4';
    const image2 = 'http://via.placeholder.com/4000x3000';
    const imageAlt2 = 'http://via.placeholder.com/8x6';
    this.setState({
      imageListV: [
        <Image src={image1} altSrc={imageAlt1} container={this.imageContainer1} style={{ width: '100%' }} />,
        <Image src={image2} altSrc={imageAlt2} container={this.imageContainer1} style={{ width: '100%' }} />,
        <Image src={image1} altSrc={imageAlt1} container={this.imageContainer1} style={{ width: '100%' }} />,
        <Image src={image2} altSrc={imageAlt2} container={this.imageContainer1} style={{ width: '100%' }} />,
        <Image src={image2} altSrc={imageAlt2} container={this.imageContainer1} style={{ width: '100%' }} />,
        <Image src={image1} altSrc={imageAlt1} container={this.imageContainer1} style={{ width: '100%' }} />,
        <Image src={image1} altSrc={imageAlt1} container={this.imageContainer1} style={{ width: '100%' }} />,
        <Image src={image2} altSrc={imageAlt2} container={this.imageContainer1} style={{ width: '100%' }} />,
      ],
      imageListH: [
        <Image src={image1} altSrc={imageAlt1} container={this.imageContainer2} style={{ height: '200px', border:'1px solid white' }} />,
        <Image src={image2} altSrc={imageAlt2} container={this.imageContainer2} style={{ height: '200px', border:'1px solid white' }} />,
        <Image src={image2} altSrc={imageAlt2} container={this.imageContainer2} style={{ height: '200px', border:'1px solid white' }} />,
        <Image src={image1} altSrc={imageAlt1} container={this.imageContainer2} style={{ height: '200px', border:'1px solid white' }} />,
        <Image src={image2} altSrc={imageAlt2} container={this.imageContainer2} style={{ height: '200px', border:'1px solid white' }} />,
        <Image src={image1} altSrc={imageAlt1} container={this.imageContainer2} style={{ height: '200px', border:'1px solid white' }} />,
        <Image src={image1} altSrc={imageAlt1} container={this.imageContainer2} style={{ height: '200px', border:'1px solid white' }} />,
        <Image src={image2} altSrc={imageAlt2} container={this.imageContainer2} style={{ height: '200px', border:'1px solid white' }} />,
      ],
    });
  }
  render() {
    return (
      <div className="App">
        <br />
        <div ref={(node) => { this.imageContainer1 = node; }} style={{ width: '400px', height: '250px', overflow: 'auto' }}>
          {this.state.imageListV}
        </div>
        <br />
        <div ref={(node) => { this.imageContainer2 = node; }} style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
          {this.state.imageListH}
        </div>
      </div >
    );
  }
}

export default App;
```

## Prop Types
```js
propTypes: {
  /**
   * source of original image
   */
  src: PropTypes.string.isRequired,
  
  /**
   * source of placeholder image
   */
  altSrc: PropTypes.string.isRequired,

  /**
   * alt attrs for image
   */
  alt: PropTypes.string,

  /**
   * style object for image
   */
  style: PropTypes.object,
  
  /**
   * class name for image
   */
  className: PropTypes.string,
  
  /**
   * attributes for <img> tag
   */
  htmlAttrs: PropTypes.object,
};
```

## License
**WTFPL** Do What the Fuck You Want To Public License

## Author
[Rohit Sharma](http://rohitsharma.xyz) | [rohit7209@rediffmail.com](mailto://rohit7209@rediffmail.com) | [rohitsharma.xyz](http://rohitsharma.xyz)
