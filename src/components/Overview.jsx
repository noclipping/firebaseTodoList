import React from "react";
import { FaTrash, FaPencilAlt } from "react-icons/fa";

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editDisplay: "none",
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ editDisplay: "none" });
    this.props.editTask(this.props.item.id, this.state.editText);
  }
  render() {
    return (
      <div className="Task">
        <br />[ {this.props.text} ]
        <FaPencilAlt
          style={{ paddingLeft: 10, color: "22,22", cursor: "pointer" }}
          onClick={(e) => {
            console.log("EDIT");
            console.log(this.state.editDisplay);
            this.state.editDisplay === "inline-block"
              ? this.setState({ editDisplay: "none" })
              : this.setState({ editDisplay: "inline-block" });
          }}
        />
        <FaTrash
          onClick={(e) => {
            this.props.deleteFunction(this.props.item.id);
          }}
          style={{ paddingLeft: 10, color: "red", cursor: "pointer" }}
        />{" "}
        <br />
        <form
          style={{ display: this.state.editDisplay }}
          onSubmit={(e) => {
            this.handleSubmit(e);
          }}
        >
          {/* INPUT FIELD WITH ON - CHANGE */}

          <input
            type="text"
            onChange={(e) => {
              this.setState({ editText: e.target.value });
            }}
          />
          <button type="submit"> EDIT </button>
        </form>
        <br />
      </div>
    );
  }
}
export default Overview;
