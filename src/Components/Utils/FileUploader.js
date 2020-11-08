import React, { Component } from 'react';
import { firebase } from '../../firebase';
import FirebaeFileUploader from 'react-firebase-file-uploader';
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
    render() {
        return (
            <div>
                {
                    !this.state.fileUrl ?
                    <div>
                        <div className="label_inputs">{this.props.tag}</div>
                        <FirebaeFileUploader
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
            </div>
        )
    }
}
