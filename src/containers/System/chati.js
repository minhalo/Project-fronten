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






import { getUsers, getEdit, getBox, all, addfriend, refresh, addf, delf, search, req, header } from '../../services/userService'

// import { getAllUsers } from '../../services/userService'

import '../System/m.scss';
import '../System/Setting.scss';
import { Link } from 'react-router-dom';
import Nav from './nav';
import Modelcreate from './modelcreate';
// import group from '../../services/userService'
import { group ,take } from '../../services/userService';
import { getgroups } from 'process';
// import { header } from '../../services/userService';

class Chati extends Component {

    constructor(props) {
        super(props);
        const { userInfo } = this.props

        this.state = {
            dove: []
        };
    }

    async componentDidMount() {
        let data = await chatlist(this.props.isokay)
        this.setState({
            dove:data.userData
        })
    }   

    async componentDidUpdate() {
        let data = await chatlist(this.props.isokay)
        this.setState({
            dove:data.userData
        })
    }

    
    

    render() {
        // console.log(this.state.idchange)
        return (
            <div className='app5'>
                <div className='chati' ref={this.chati}>

                <ReactScrollableFeed>
                {this.state.dove.map(d =>
                        <div className=''>
                            <img className='poir' src={d.image} />
                            {/* {d.status ? <div><img className='Onlline' src={tect} /></div> : <div><img className='Offline' src={tese} /></div>} */}
                            {/* <Link onClick={() => this.rem(d.id)} className='pichan' >
                                <h4 className='chanx'>{d.firstName} {d.lastName}</h4>
                            </Link> */}
                            <p>{d.firstName} </p>
                            <p>{d.message}</p>
                        </div>
                    )}
                    </ReactScrollableFeed>
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