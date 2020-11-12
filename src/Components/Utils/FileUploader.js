import React, { Component } from 'react';
import { firebase } from '../../firebase';
import FirebaseFileUploader from 'react-firebase-file-uploader';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class FileUploader extends Component {
     
    state={
        name: '',
        isUploading: false,
        fileUrl: ''
    }

    static getDerivedStateFromProps(props, state){
        if(props.defaultImage){
            return state={
                name: props.defaultImageName,
                fileUrl: props.defaultImage
            }
        }
        return null;
    }

    handleUploadStart = () =>{
        this.setState({
            isUploading : true
        })
    }

    handleUploadError = () =>{
        this.setState({
            isUploading: false
        })
    }

    handleUploadSuccess = (filename) =>{
        console.log(filename)
        this.setState({
            name: filename,
            isUploading: false
        })

        // since the we dont have the url for the image, we need to retirve it from the firbase.
        firebase.storage().ref(this.props.dir).child(filename).getDownloadURL()
        .then( url => {
            console.log(url);
            this.setState({
                fileUrl: url
            });
        });

        this.props.filename(filename);
    }

    uploadAgain = () =>{
        this.setState({
            name: '',
            isUploading: false,
            fileUrl: ''
        })
        this.props.resetImage()
    }

    render() {
        return (
            <div>
                {
                    !this.state.fileUrl ?
                    <div>
                        <div className="label_inputs">{this.props.tag}</div>
                        <FirebaseFileUploader
                            accept="image/*"
                            name="image"
                            randomizeFilename
                            storageRef={firebase.storage().ref(this.props.dir)}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={ this.handleUploadError}
                            onUploadSuccess={ this.handleUploadSuccess}
                        />
                    </div>
                    : null
                }
                {
                    this.state.isUploading ?
                        <div className="progress"
                            style={{ textAlign:'center', margin:'30px 0'}}
                        >
                            <CircularProgress
                                style={{ color: '#98c6e9'}}
                                thickness={7}
                            />
                        </div>
                    :null
                }
                {
                    this.state.fileUrl ?
                        <div className="image_upload_container">
                            <img 
                                src={this.state.fileUrl} 
                                alt={this.state.name}
                                style={{width: "100%"}}
                            />
                            <div className="remove" onClick={() => this.uploadAgain()}>
                                Remove
                            </div>
                        </div>
                    :null
                }
            </div>
        )
    }
}
