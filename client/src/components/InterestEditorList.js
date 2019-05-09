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
        level={editor.Level}
        value={editor.Name}
        id={editor.Skill}
        key={editor.Skill}
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
