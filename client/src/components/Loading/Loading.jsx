import React, { Component } from "react";

class Loading extends Component {
  state = {
    loadingValue: 0
  };
  componentWillReceiveProps(newProps) {
    this.setState({
      loadingValue: newProps.loadingValue
    });
  }
  componentDidMount() {
    if (this.props.loadingValue) {
      this.setState({
        loadingValue: this.props.loadingValue
      });
    }
    // Because only Chrome supports offset-path, feGaussianBlur for now

    var isChrome =
      /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    if (!isChrome) {
      document.getElementsByClassName("infinityChrome")[0].style.display =
        "none";
      document.getElementsByClassName("infinity")[0].style.display = "block";
    }
  }
  render() {
    return (
      <div className="mainLoading mainDiv">
        <div className="infinityChrome">
          <div />
          <div />
          <div />
        </div>

        <div className="infinity">
          <div>
            <span />
          </div>
          <div>
            <span />
          </div>
          <div>
            <span />
          </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          style={{ display: "none" }}
        >
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="6"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <br />
        {this.state.loadingValue > 0 ? (
          <span id='percentageIndicator'>Uploading... {this.state.loadingValue} % </span>
        ) : null}
      </div>
    );
  }
}

export default Loading;
