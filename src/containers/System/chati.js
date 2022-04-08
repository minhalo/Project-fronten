import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import pic from '../../assets/images/img2.png'
import fs from 'fs'
import * as actions from "../../store/actions";
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modelpolicy from './Modelpolicy';
import tect from '../../assets/images/onl.webp'
import tese from '../../assets/images/offline.jpg'
import created from '../../assets/images/create.png'

import { chatlist, okgr, socket } from '../../services/userService';
import ReactScrollableFeed from 'react-scrollable-feed'
import moment from 'moment'
import like from '../../assets/images/like.webp'
import dislike from '../../assets/images/dislike.jpg'






import { getUsers, getEdit, getBox, all, addfriend, refresh, addf, delf, search, req, header } from '../../services/userService'

// import { getAllUsers } from '../../services/userService'

import '../System/m.scss';
import '../System/Setting.scss';
import { Link } from 'react-router-dom';
import Nav from './nav';
import Modelcreate from './modelcreate';
// import group from '../../services/userService'
import { group, take } from '../../services/userService';
import { getgroups } from 'process';
// import { header } from '../../services/userService';

class Chati extends Component {

    constructor(props) {
        super(props);
        const { userInfo } = this.props

        this.state = {
            dove: [],
            isLoading: false,
            mes: '',
            thischeck: false
        };
    }

    async componentDidMount() {
        let data = await chatlist(this.props.isokay)
        this.setState({
            dove: data.userData
        })
        
        const listener = event => {
            if (event.code === "Enter"|| event.code === "NumpadEnter") {
            //console.log("Enter key was pressed. Run function.");
                event.preventDefault();
                // callMyFunction();
                this.handlemes()
                this.setState({
                    thischeck: false
                })
            }
          };
          document.addEventListener("keydown", listener);
          return () => {
            document.removeEventListener("keydown", listener);
          };


        // this.setState({       
        //     dove: [...this.state.dove,data.userData],         
        // });
    }

    handlemes = async () => {
        let data = await take(this.props.userInfo.id, this.props.isokay, this.state.mes)
        // this.setState({       
        //     dove: [...this.state.dove,data.userData],         
        // });
        this.setState({
            thischeck: true
        })
        
    }


    handleOnChangeSet = (event) => {
        this.setState({
            mes: event.target.value
        })
    }


    async componentDidUpdate() {
        // let data = await chatlist(this.props.isokay)
        // this.setState({
        //     dove:data.userData
        // })
        if (this.state.thischeck === true)
        {
            let datas = await chatlist(this.props.isokay)
        this.setState({
            dove: datas.userData
        })
        }
        
        
    }




    render() {
        return (
            <div className='app5'>
                <div className='chati' ref={this.chati}>

                    <ReactScrollableFeed>
                        {this.state.dove.map(d =>
                            <div className='cati'>
                                <div className='poci'>
                                    <img className={d.firstName === this.props.userInfo.firstName ? 'poirc' : 'poird'} src={d.image} />
                                </div>
                                <div className='abcd'>
                                    <p className={d.firstName === this.props.userInfo.firstName ? 'c' : 'd'}>{d.firstName} </p>
                                </div>
                                <div className='timezone'>
                                    <p className={d.firstName === this.props.userInfo.firstName ? 'k' : 'g'}> {moment(d.createdAt).format('MMMM Do YYYY, h:mm:ss a')} </p>
                                </div>
                                <div className='mys'>
                                    <p className={d.firstName === this.props.userInfo.firstName ? 'r' : 't'}>{d.message}</p>
                                </div>
                                <div className='iconseri'>
                                    <i  className={d.firstName === this.props.userInfo.firstName ? 'likeii' : 'likeiki'}>100</i>
                                    {/* className={d.firstName === this.props.userInfo.firstName ? 'r' : 't'} */}
                                    <img className={d.firstName === this.props.userInfo.firstName ? 'likei' : 'likey'} src={like} />
                                    <i className={d.firstName === this.props.userInfo.firstName ? 'likeii' : 'likeik'}>100</i>
                                    <img className={d.firstName === this.props.userInfo.firstName ? 'likei' : 'likeyo'} src={dislike} />

                                </div>

                            </div>
                        )}
                    </ReactScrollableFeed>
                </div>

                <div className='chiopl'>
                    <div className='chat-con'>
                    <input placeholder='Aa' className='input-chat' max="200" onChange={(event) => this.handleOnChangeSet(event)} type='text' />

                    </div>
                </div>
            </div >
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
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chati);
