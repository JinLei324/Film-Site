import React from "react";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
// import Divider from "@material-ui/core/Divider"
import thumbnail2 from "../../images/thumbnail2.png";
import { Link } from "react-router-dom";
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

class Recommended extends React.Component {
  state = {
    videos: [],
    loading: false,
    category: "",
    empty: true
  };
  componentDidMount() {
    this.setState(prevState => ({
      ...prevState,
      loading: true,
      category: window.location.pathname.split("/")[2],
      videos: [
        {
            title:"Use your wolf",
            poster:thumbnail2,
            allowed:true,
            genere: window.location.pathname.split("/")[2],
            disabled:false,
            videoId:1,
            playes:126,
            path:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        },
        {
            title:"Use your wolf",
            poster:thumbnail2,
            allowed:true,
            genere: window.location.pathname.split("/")[2],
            disabled:false,
            videoId:1,
            playes:126,
            path:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        },
        {
            title:"Use your wolf",
            poster:thumbnail2,
            allowed:true,
            genere: window.location.pathname.split("/")[2],
            disabled:false,
            videoId:1,
            playes:126,
            path:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        }
        ,
        {
            title:"Use your wolf",
            poster:thumbnail2,
            allowed:true,
            genere: window.location.pathname.split("/")[2],
            disabled:false,
            videoId:1,
            playes:126,
            path:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        }
        ,
        {
            title:"Use your wolf",
            poster:thumbnail2,
            allowed:true,
            genere: window.location.pathname.split("/")[2],
            disabled:false,
            videoId:1,
            playes:126,
            path:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        }
        ,
        {
            title:"Use your wolf",
            poster:thumbnail2,
            allowed:true,
            genere: window.location.pathname.split("/")[2],
            disabled:false,
            videoId:1,
            playes:126,
            path:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        }
        ]
    }));
    this.setState({
      loading: false
    });
    //this.props.stopLoading();
  }
  render() {
    const { classes } = this.props;
    return (
      <Container>
        <Typography
          style={{
            margin: 10,
            marginBottom: 20,
            fontSize: 18
          }}
        >
          RECOMMENDED
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "start"
          }}
        >
          {this.state.videos.map((videoObj, value) => {
            return (
              <div key={value} style={{ margin: 10 ,width:370}}>
                <Link
                  to={{
                    pathname: `/play/${videoObj.videoId}`,
                    videoObj: `${JSON.stringify(videoObj)}`,
                    state: { fromDashboard: true }
                  }}
                >
                <img
                  src={thumbnail2}
                  className={classes.image}
                  alt="thumbnail"
                />
                <div>
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      style={{ textAlign: "left", marginTop: 8 }}
                    >
                      <Typography
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "black"
                        }}
                      >
                        Fishing in China
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "left",
                        marginTop: 5,
                        marginBottom: 10
                      }}
                    >
                      <Typography style={{ color: "grey" }}>
                        Steven Allan Speilburg
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        textAlign: "right",
                        marginTop: 5,
                        marginBottom: 10
                      }}
                    >
                      <Typography style={{ color: "grey" }}>{videoObj.playes}k plays</Typography>
                    </Grid>
                  </Grid>
                </div>
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(Recommended);
