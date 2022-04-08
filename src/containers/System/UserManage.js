import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import '../System/UserManage.scss'

import { Comment, Form, Header } from 'semantic-ui-react'
import ReactScrollableFeed from 'react-scrollable-feed'
import '../System/UserManage.scss';
import { Link } from 'react-router-dom';
import Nav from './nav';
import Friends from './Friends';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Button from '@mui/material/Button';
import vio from '../../assets/images/violet.png'
import { header, listpost, searched, inlike, dislike,commenti,listcomment } from '../../services/userService';
import Modalpost from './Modalpost';
import moment from 'moment'
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            click: false,
            home: false,
            clickprop: false,
            datas: [],
            imgi: '',
            isOpens: false,
            pops: [],
            textl: '',
            com: []
        }
    }
    // componentDidUpdate () {
    //     let circle = document.querySelector('.nav3')
    //     if (this.state.click === false && this.state.home === false){
    //         circle.style.display = 'none'
    //     }
    //     else{
    //         circle.style.display = 'block'
    //     }

    //     let circles = document.querySelector('.nav4')
    //     if (this.state.clickprop === false){
    //         circles.style.display = 'none'
    //     }
    //     else{
    //         circles.style.display = 'block'
    //     }
    // }

    effexts = () => {
        this.setState({
            clickprop: !this.state.clickprop
        })
    }

    effext = () => {
        this.setState({
            click: !this.state.click
        })
    }

    async componentDidMount() {
        let data = await searched(this.props.userInfo.id)
        this.setState({
            datas: data.userData
        })
        let imgk = await header(this.props.userInfo.id)
        this.setState({
            imgi: imgk.userData
        })

        let pop = await listpost()
        this.setState({
            pops: pop.userData
        })


    }

    handleClicks = () => {
        this.setState({
            isOpens: true
        })
    }

    handleComment = async (idk) => {
        let insert = await commenti(this.props.userInfo.id, idk, this.state.text)
    } 

    handleHinds = () => {
        this.setState({
            isOpens: !this.state.isOpens
        })
    }

    handlelike = async (idk) => {
        let ui = await inlike(idk)
        let pop = await listpost()
        this.setState({
            pops: pop.userData
        })
    }

    handledislike = async (idk) => {
        let ui = await dislike(idk)
        let pop = await listpost()
        this.setState({
            pops: pop.userData
        })
    }

   

    handleOnChangeText = (event) => {
        this.setState({
            textl: event.target.value
        })
    }
    render() {
        const { userInfo } = this.props
        console.log(this.state.com)
        return (
            <div>
                <Nav />
                <div className="users-container">
                    <Modalpost
                        isOpen={this.state.isOpens}
                        isHide={this.handleHinds}
                    />
                    <div className='testok'>
                        <div className='random'>
                            {this.state.datas.map(d =>
                                <Card className='cardi1' sx={{ maxWidth: 200, minWidth: 200, minHeight: 250, maxHeight: 250 }}>
                                    <CardHeader
                                        avatar={<Avatar src={d.image} />}
                                        title={d.lastName && d.firstName}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            Age: {d.age}
                                        </Typography>

                                        <Typography paragraph>
                                            Description: {d.description}
                                        </Typography>




                                    </CardContent>
                                    <CardActions className='btn-act'>
                                        <Button onClick={() => this.hans(d.id)} size="small">Add</Button>
                                        {/* <Button size="small">Delete</Button> */}
                                    </CardActions>
                                </Card>
                            )}
                        </div>
                        <div className='text-post'>
                            {/* {this.state.imgk} */}
                            <img className='img-post' src={this.state.imgi.image} />
                            <div className='clickmodal' onClick={() => this.handleClicks()}>
                                <h6 className='hclick'>What are you doing? Bro</h6>
                            </div>
                        </div>
                        <div className='lopl'></div>

                        {this.state.pops.map(d =>
                            <Card className='cardio' sx={{ maxWidth: 640, minWidth: 640, minHeight: 100, maxHeight: 1000 }}>
                                <CardHeader
                                    avatar={<Avatar src={d.image} />}
                                    title={d.firstName}
                                    subheader={moment(d.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                                />
                                <CardContent>


                                    <Typography paragraph>
                                        {d.text}
                                    </Typography>



                                </CardContent>
                                <CardActions className='btn-act'>
                                    <Button onClick={() => this.handlelike(d.id)} size="small">Like {d.like} </Button>
                                    <Button onClick={() => this.handledislike(d.id)} size="small">Dislike {d.dislike}</Button>
                                </CardActions>
                                
                                    <Comment.Group className='scopei' >
                                        <Header as='h6' className='headcom' dividing>
                                            Comments
                                        </Header>
                                        <Form reply className='formo'>
                                            <textarea className='formo1' onChange={(event) => this.handleOnChangeText(event)}/>
                                            
                                        </Form>
                                            <button onClick={() => this.handleComment(d.id)} className='btn-comment'>Send</button>
                                        
                                            
                                            <ReactScrollableFeed>
                                            {/*  */}
                                            
                                            <Comment>
                                                <Comment.Avatar className='avtarcom' src='ok' />
                                                <Comment.Content>
                                                    <Comment.Author as='a'>Matt</Comment.Author>
                                                    <Comment.Metadata>
                                                        Today at 5:42PM
                                                    </Comment.Metadata>
                                                    <Comment.Text>ok</Comment.Text>

                                                </Comment.Content>
                                            </Comment>

                                            {/* // */}

                                            </ReactScrollableFeed>
                                        
                                       

                                    </Comment.Group>
                            </Card>
                        )}
                    </div>
                </div>
                <Friends />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
