import React, { Component } from "react";
import InterestEditor from "./InterestEditor";

class InterestEditorList extends Component {
  render() {
    const editors = this.props.values;
    const editorItem = editors.map(editor => (
      <InterestEditor
        handleSliderChange={this.props.handleSliderChange}
        handleRemove={this.props.handleRemove}
        type={this.props.type}
        className={this.props.className}
        value={editor.value}
        key={editor.id}
      />
    ));

    return (
      <div>
        {editorItem}
      </div>
    );
  }
}

export default InterestEditorList;
