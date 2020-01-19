import React, { Component } from "react";

class FormField extends Component {
  render() {
    return (
      <div className="mainFormField">
        {this.props.type === "text" ? (
          <label htmlFor={this.props.id}>
            {this.props.title}
            <input
              type="text"
              name={this.props.name}
              id={this.props.id}
              placeholder={this.props.placeholder}
              required={this.props.required}
            />
          </label>
        ) : (
          ""
        )}
        {this.props.type === "email" ? (
          <label htmlFor={this.props.id}>
            {this.props.title}
            <input
              type="email"
              name={this.props.name}
              id={this.props.id}
              required={this.props.required}
              placeholder={this.props.placeholder}
            />
          </label>
        ) : (
          ""
        )}
        {this.props.type === "password" ? (
          <label htmlFor={this.props.id}>
            {this.props.title}
            <input
              type="password"
              name={this.props.name}
              id={this.props.id}
              required={this.props.required}
              placeholder={this.props.placeholder}
            />
          </label>
        ) : (
          ""
        )}
        {this.props.type === "fileVideo" ? (
          <label htmlFor={this.props.id}>
            {this.props.title}
            <input
              type="file"
              accept="video/*"
              name={this.props.name}
              id={this.props.id}
              required={this.props.required}
            />
          </label>
        ) : (
          ""
        )}
        {this.props.type === "fileImage" ? (
          <label htmlFor={this.props.id}>
            {this.props.title}
            <input
              type="file"
              accept="image/*"
              name={this.props.name}
              id={this.props.id}
              required={this.props.required}
            />
          </label>
        ) : (
          ""
        )}
        {this.props.type === "description" ? (
          <label htmlFor={this.props.id}>
            {this.props.title}
            <textarea
              maxLength="250"
              name={this.props.name}
              id={this.props.id}
              required={this.props.required}
              placeholder={this.props.placeholder}
            />
          </label>
        ) : (
          ""
        )}
        {this.props.type === "category" ? (
          <label htmlFor={this.props.id}>
            {this.props.title}
            <select
              name={this.props.name}
              required={this.props.required}
              id={this.props.id}
              onChange={this.props.onChange}
            >
              <option value="feature">Feature</option>
              <option value="series">Series</option>
            </select>
          </label>
        ) : (
          ""
        )}
        {this.props.type === "genere" ? (
          <label htmlFor={this.props.id}>
            {this.props.title}
            <select
              name={this.props.name}
              required={this.props.required}
              id={this.props.id}
            >
              <option value="comedy">COMEDY</option>
              <option value="documentry">Documentry</option>
              <option value="drama">DRAMA</option>
              <option value="sci-fi">sci-fi</option>
              <option value="horror">horror</option>
              <option value="romance">romance</option>
              <option value="action">action</option>
              <option value="thriller">thriller</option>
              <option value="crime">crime</option>
              <option value="adventure">adventure</option>
              <option value="fantasy">fantasy</option>
            </select>
          </label>
        ) : (
          ""
        )}

        {this.props.type === "rating" ? (
          <label htmlFor={this.props.id}>
            {this.props.title}
            <select
              name={this.props.name}
              required={this.props.required}
              id={this.props.id}
            >
              <option value="nc-17">NC-17</option>
              <option value="r">R</option>
              <option value="pg-13">PG-13</option>
              <option value="pg">PG</option>
              <option value="g">G</option>
            </select>
          </label>
        ) : (
          ""
        )}

        {this.props.type === "userTitle" ? (
          <label htmlFor={this.props.id}>
            {this.props.title}
            <select
              className="signUpUserTitle"
              name={this.props.name}
              required={this.props.required}
              id={this.props.id}
            >
              <option value="filmmaker">Filmmaker</option>
              <option value="producer">Producer</option>
              <option value="director">Director</option>
            </select>
          </label>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default FormField;
