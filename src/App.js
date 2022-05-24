import React, { Component, Fragment } from "react";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
// import htmlToDraft from 'html-to-draftjs';

class DraftEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  componentDidMount() {
    console.log(this.props.defaultValue);
    if (this.props.defaultValue) {
      this.setState({
        editorState: EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(this.props.defaultValue)
          )
        )
      });
    }
  }

  onEditorStateChange = (editorState) => {
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.setState({ editorState: editorState }, () => {
      // this.props.onEditorStateChange(html)
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <Fragment>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
        />
      </Fragment>
    );
  }
}
export default DraftEditor;
