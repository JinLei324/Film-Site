import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import CategoryCard from "../CategoryCard/CategoryCard";

class Category extends Component {
  render() {
    const categoryArr = [
      { name: "Comedy", value: "comedy" },
      { name: "Documentry", value: "documentry" },
      { name: "SCI-FI", value: "sci-fi" },
      { name: "Horror", value: "horror" },
      { name: "Romance", value: "romance" },
      { name: "Action", value: "action" },
      { name: "Drama", value: "drama" },
      { name: "Thriller", value: "thriller" },
      { name: "Crime", value: "crime" },
      { name: "Adventure", value: "adventure" },
      { name: "Fantasy", value: "fantasy" }
    ];
    return (
      <div
        style={{
          marginTop: 70,
          paddingTop: 40,
          paddingBottom: 40,
          paddingLeft: 60,
          paddingRight: 40
        }}
      >
        <Container>
          <h1
            style={{
              color: "#00AEEF",
              fontSize: 30,
              fontWeight: "bold",
              marginLeft: 10,
              marginBottom: 5
            }}
          >
            Categories
          </h1>
          <p style={{ fontSize: 18, marginBottom: 30, marginLeft: 10 }}>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "start"
            }}
          >
            {categoryArr.map((catObj, i) => {
              return (
                <Link
                  key={i}
                  to={{
                    pathname: `/all/${catObj.value}`,
                    category: `${catObj.value}`,
                    state: { fromDashboard: true }
                  }}
                >
                  <CategoryCard name={catObj.name} category={catObj.value} />;
                </Link>
              );
            })}
          </div>
        </Container>
        {/* <div className="mainSignin mainDiv">
        <h1>Category</h1>
        <Link to="/">Home</Link>
        <div>
          {categoryArr.map((catObj, i) => {
            return (
              <Link
                key={i}
                to={{
                  pathname: `/all/${catObj.value}`,
                  category: `${catObj.value}`,
                  state: { fromDashboard: true }
                }}
              >
                <CategoryCard name={catObj.name} category={catObj.value} />;
              </Link>
            );
          })}
        </div>
      </div> */}
      </div>
    );
  }
}

export default Category;
