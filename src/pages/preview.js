import React from 'react';
import { getPage } from '../globals/fake-data';


class Preview extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      rendered: '',
    };
  }

  componentWillMount () {
    // remove block editor style from page
    const editorStyle = document.querySelector('style[id="block-editor-style"]');
    if (editorStyle) {
      editorStyle.remove();
    }

    // remove editor style
    const style = document.querySelector('link[href$="css/gutenberg/style.css"]');
    if (style) {
      style.remove();
    }
  }

  componentDidMount () {
    const page = getPage();
    if (page) {
      this.setState({
        rendered: page.content ? page.content.raw.replace(/(<!--.*?-->)/g, '') : '',
      });
    }
  }
  render () {
    const { rendered } = this.state;
    return rendered ?
      <div dangerouslySetInnerHTML={{ __html: rendered }} /> :
      <center><em>Add your custom block in the editor</em></center>;
  }
}

export default Preview;
