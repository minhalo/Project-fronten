import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../Auth/login.scss'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { activate, all, getCheckChangeEmail, getGroup, kdp, logout } from '../../services/userService';
import Dropzone from 'react-dropzone';

import pdf from '../../assets/images/pdfreal.png'
import jpg from '../../assets/images/jpgreal.png'
import doc from '../../assets/images/docreal.png'
import xls from '../../assets/images/xlsreal.png'
import drag from '../../assets/images/drag.jpg'
import FileViewer from 'react-file-viewer';



import './m.scss';
import { Link } from 'react-router-dom';
import Select from 'react-select'

import { socket } from '../../services/userService';
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
// import Button from '@mui/material/Button';
import vio from '../../assets/images/violet.png'
// import header from '../../services/userService'

import { header, creatpost, listpost } from '../../services/userService'
import filetap from '../../assets/images/file.png'



class Modalpost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            data: [],
            mes: '',
            files: [],
            filebase64: null,
            check: false,
            error: null
        }

        this.onDrop = (files) => {
            // if (files.type === 'image/jpeg') {
            this.setState({ files })
            // console.log(files[0].type)
            if (files[0].type === 'image/jpeg') {
                this.setState({
                    error: ''
                })
                
                var file = files[0]
                const reader = new FileReader();
                reader.onload = (event) => {
                    // console.log(event.target.result);
                    this.setState({ filebase64: event.target.result })
                };
                reader.readAsDataURL(file);
            }
            else{
                this.setState({
                    error: 'File must be jpg'
                })
            };
            

        }

        // }


    }


    toggle = () => {
        this.props.isHide()
    }


    async componentDidMount() {
        let data = await header(this.props.userInfo.id)
        this.setState({
            data: data.userData
        })

    }

    handleOnChangeSet = (event) => {
        this.setState({
            mes: event.target.value
        })
    }

    handleinsert = async () => {
        if(this.state.files)
        {
        let ok = creatpost(this.props.userInfo.id, this.state.mes, this.state.filebase64)
        this.setState({
          
            files: [],
            filebase64: null,
        })

        this.props.isHide()
        this.props.callbacks()
        }
        else{
            this.setState({
                error: 'File invalid'
            })
        }
    }


    handlecheck = () => {
        this.setState({
            check: !this.state.check
        })
    }


    componentDidUpdate() {
        // let circle = document.querySelector('.dropx')
        // if (this.state.check === true) {
        //     circle.style.display = 'block'
        // }

    }






    render() {


        const files = this.state.files.map(
            function (file, i) {

           
                    return (
                        <div key={file.name}>
                            <div className='jpg-container'>
                                <img className='jpg' src={jpg} />
                            </div>
                            <div className='pcontainer'>
                                <h6 className='pcontainer1'>
                                    {file.name}
                                </h6>
                            </div>


                        </div>
                    )




            }
        );
        const { processLogout } = this.props;
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={"bisode"}
                centered
                size="md"
            >
                <ModalBody>
                    <div>
                        <img className='rungroi' src={this.state.data.image} />
                        <h4 className='okmg'>{this.state.data.firstName} {this.state.data.lastName}</h4>
                    </div>
                    <div className='send-post'>
                        {/* <label></label> */}
                        <textarea className='arepost' maxlength="256" placeholder='Text something here' onChange={(event) => this.handleOnChangeSet(event)} type="text" />
                        {/* <input type='text'/> */}
                    </div>
                    {/* <div>
                        <img className='filetap' onClick={() => this.handlecheck()} src={filetap} />
                    </div> */}
                    <div className='dropx'>
                        <Dropzone onDrop={this.onDrop}>
                            {({ getRootProps, getInputProps }) => (
                                <section className="congtino">
                                    <div {...getRootProps({ className: 'dropzone' })}>
                                        <input {...getInputProps()} />
                                        <img className='drag' src={drag} />
                                        <p>Drag a file or choose here</p>
                                    </div>
                                    <aside className='file'>
                                        <div className='filep'>{files}</div>
                                    </aside>
                                </section>
                            )}
                        </Dropzone>

                    </div>
                    <h5 className='erue'>{this.state.error ? this.state.error : null}</h5>  
                  


                </ModalBody>
                <ModalFooter>
                    <Button className='px-3' color='primary' onClick={() => { this.handleinsert() }}>Create</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Modalpost);
