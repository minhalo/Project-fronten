// Modeladstudent

import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../Auth/login.scss'
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { getCheckChangeEmail, getGroup, kdp, logout, listcomment,commenti } from '../../services/userService';
import ReactScrollableFeed from 'react-scrollable-feed'
import { Comment, Form, Header } from 'semantic-ui-react'
import moment from 'moment'
import { styled } from '@mui/material/styles';
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
import vio from '../../assets/images/violet.png';
import ReactSearchBox from "react-search-box";
import Search from 'react-search'

// import './Header.scss';
import { Link } from 'react-router-dom';
import Select from 'react-select'

import { socket } from '../../services/userService';




class Modeladstudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        }
    }
    toggle = () => {
        this.props.isHide()
    }



    async componentDidMount() {
        
    }
    // handleChange(e) {
    //     this.setState({ idf: e.value, names: e.label })
    // }

    // handleClick = async (idk) => {
    //     //to do
    //     this.setState({
    //         idchose: idk
    //     })

        
    // }




    render() {
        // console.log(this.state.name)
        const { processLogout } = this.props;
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={"khkkkhkh"}
                centered
                size="lg"
            >
                <ModalBody>
                    <div className='input-created'>
                        <label>Choose student to add</label>
                    </div>
                    <div className='box-gradient'>
                        {/* {this.state.dove.map(d =>
                            <Card  
                            // onclick = {} 
                            onClick={() => this.handleClick(d.id)}
                            className='cardi1' sx={{ maxWidth: 200, minWidth: 200, minHeight: 100, maxHeight: 100 }}>
                                <CardHeader
                                    avatar={<Avatar src={d.image} />}
                                    title={d.lastName && d.firstName}
                                />
                            </Card>
                        )} */}
                    </div>

                </ModalBody>
                <ModalFooter>
                    {/* <Button className='px-3' color='primary' onClick={() => { this.handleinsert() }}>Send</Button> */}
                </ModalFooter>
            </Modal>

        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modeladstudent);
