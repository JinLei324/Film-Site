import React, { Component } from "react";
import Thumbnail from "../../images/thumbnail1.png";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  item: {
    maxWidth: 360,
    margin: 15
  },
  image: {
    height: 200,
    width: "100%",
    borderRadius: 5
  }
});

class CategoryCard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div style={{ margin: 10 }}>
        <div className="categoryContainer">
          <img src={Thumbnail} className={classes.image} alt="thumbnail" />
          <div className="bottom-left">
            <h1
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "white",
                marginBottom: 2
              }}
            >
              {this.props.name}
            </h1>
            <p>Functionality Pending</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(CategoryCard);

// class CategoryCard extends Component {
//   render() {
//     return (
//       <div className="mainCategoryCard">
//         <div className="imgCategoryCard">
//           <img
//             src={Thumbnail}
//             alt="category"
//             width="100%"
//             height="100%"
//           />
//         </div>
//         <h2>{this.props.name}</h2>
//       </div>
//     );
//   }
// }

// export default CategoryCard;
