import React from "react";
import Container from "@material-ui/core/Container";
import GradeIcon from '@material-ui/icons/Grade';
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
// import Divider from "@material-ui/core/Divider";
import thumbnail2 from "../../assets/Category/images/video2.png"
import { connect } from "react-redux";
import { startLoading, stopLoading } from "../../store/action";
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
  },
  titleLabel: {
    marginTop: 10,
    marginBottom: 20,
    color: "#00AEEF",
    fontWeight: "bold",
    fontSize: 18,
    margin: 10
  },
  videoTitle:{
    fontSize: 16,
    fontWeight: "bold",
    color: "#00AEEF",
    marginRight: 10
  },
  videoGrid:{
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "start"
  }
});

class Featured extends React.Component {
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
    this.props.stopLoading();
  }
  componentWillMount() {
    this.props.startLoading();

    //dummy data for featured
    
    
  }
  render() {
    const { classes } = this.props;
    return (
      <Container>
        <Typography
          style={{
            marginTop: 10,
            marginBottom: 20,
            color: "#00AEEF",
            fontWeight: "bold",
            fontSize: 18,
            margin: 10
          }}
        >
          FEATURED FILMS
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "start"
          }}
        >
          {this.state.videos.length !== 0
            ? this.state.videos.map((videoObj, value) => {
                if (
                  videoObj.allowed &&
                  videoObj.genere === this.state.category &&
                  videoObj.disabled === false
                ) {
                //   if (this.state.empty) {
                //     this.setState({
                //       empty: false
                //     });
                //   }
                  return (
                    <div key={value} style={{ margin: 10,width:370}}>
                      <Link
                        to={{
                          pathname: `/play/${videoObj.videoId}`,
                          videoObj: `${JSON.stringify(videoObj)}`,
                          state: { fromDashboard: true }
                        }}
                      >
                        {console.log(videoObj)}
                        <img
                          src={videoObj.poster}
                          className={classes.image}
                          alt="thumbnail"
                        />
                        <div>
                          <Grid container>
                            <Grid
                              item
                              xs={12}
                              style={{ textAlign: "left", 
                                    marginTop:8, display: "flex",alignItems:"center" }}
                            >
                              <Typography
                                style={{
                                    color: "#00AEEF",
                                    fontWeight: "bold",
                                    fontSize: 18,
                                    marginRight: 10
                                  }}
                              >
                                {videoObj.title}
                                
                              </Typography>
                              <GradeIcon fontSize="small" style={{color:"#00AEEF"}}></GradeIcon>
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
                                Functionality Pending
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
                }
                return null;
              })
            : "No Videos"}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    videos: state.videos
  };
};

const mapDispatchToProps = dispatch => ({
  startLoading: () => dispatch(startLoading()),
  stopLoading: () => dispatch(stopLoading())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Featured));
