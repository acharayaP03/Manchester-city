import React, { Component } from 'react';
import {db, firebase, players} from '../../../firebase';
import AdminLayouts from '../../../Hocs/Admin_layout';
import Forms from '../../Utils/Forms';
import {validate} from '../../Utils/Tags';
import FileUploader from "../../Utils/FileUploader";

export default class AdminAddPlayers extends Component {
    
    state ={
        playerId: '',
        formType: '',
        formError: '',
        formSuccess: '',
        defaultImage: '',
        formData: {
            name: {
                element: 'input',
                value: '',
                config:{
                    label: 'Player Name',
                    name: 'name_input',
                    type: 'text',
                },
                validation: {
                    required: true,
                },
                valid:false,
                validationMessage: '',
                showLabel: true
            },
            lastname: {
                element: 'input',
                value: '',
                config:{
                    label: 'Player last name',
                    name: 'lastname_input',
                    type: 'text',
                },
                validation: {
                    required: true,
                },
                valid:false,
                validationMessage: '',
                showLabel: true
            },
            number: {
                element: 'input',
                value: '',
                config:{
                    label: 'Player Number',
                    name: 'number_input',
                    type: 'text',
                },
                validation: {
                    required: true,
                },
                valid:false,
                validationMessage: '',
                showLabel: true
            },
            position: {
                element: 'select',
                id: 'position',
                value: '',
                config:{
                    label: 'Select position ',
                    name: 'select_position',
                    type: 'select',
                    options: [
                        { key: "keeper", value: "Keeper"},
                        { key: "defence", value: "Defence"},
                        { key: "midfield", value: "Midfield"},
                        { key: "striker", value: "Striker"},
                    ]
                },
                validation: {
                    required: true,
                },
                valid:false,
                validationMessage: '',
                showLabel: false
            },
            image:{
                element: 'image',
                value: '',
                validation: {
                    required: true
                },
                valid: true
            }
        }
    }

    updateFields = (player, playerId, formType, defaultImage) =>{

        const newFormData = { ...this.state.formData };

        for(let key in newFormData){
            newFormData[key].value = player[key];
            newFormData[key].valid = true
        }

        this.setState({
            playerId,
            formType,
            defaultImage,
            formData: newFormData
        })
    }

    componentDidMount(){
         const playerId = this.props.match.params.id;

         if(!playerId){
             this.setState({
                 formType: "Add Player",
             })
         }else{
             db.ref(`players/${playerId}`).once('value')
             .then(result =>{
                 const playerData = result.val();
                 firebase.storage().ref('players').child(playerData.image).getDownloadURL()
                 .then( url =>{
                     this.updateFields(playerData, playerId, 'Edit player', url)
                 }).catch(e =>{
                     this.updateFields({
                         ...playerData, 
                         image: ''
                     },
                     playerId, 'Edit player', ''
                     )
                 })
             })
         }
    }

    updateForm(element, content = ''){

        const newFormData = { ...this.state.formData };
        //console.log(this.state.formData)
        const newElement = {...newFormData[element.id]};
        if(content === ''){
            newElement.value = element.event.target.value;
        }else{
            newElement.value = content;
        }

        let validData = validate(newElement);

        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        newFormData[element.id] = newElement;
        this.setState({
            formError: false,
            formData : newFormData
        })
    }

    resetImage = ()=>{
        const newFormData = { ...this.state.formData};
        newFormData['image'].valid = '';
        newFormData['image'].valid = false;

        this.setState({
            defaultImage: '',
            formData: newFormData
        })
    }

    storeFilename = (filename)=>{

        this.updateForm({id: 'image'}, filename)
    }
    successForm = (message) =>{
        this.setState({
            formSuccess: message
        })
        setTimeout(()=>{
            this.setState({
                formSuccess: ''
            })
        }, 2000)
    }

    handleSubmit(event){
        event.preventDefault();

        let data = {};
        let formIsValid = true;

        for (let key in this.state.formData){
            data[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].value && formIsValid;
        }

        // get the thumb nail and push it to the state
        if(formIsValid){

            if(this.state.formType === 'Edit player'){
                
                db.ref(`players/${this.state.playerId}`)
                .update(data)
                .then(() =>{
                    this.successForm('Update successfull.')
                }).catch(e =>{
                    this.setState({formError: true})
                })
            }else{
                players.push(data).then(() =>{
                    this.props.history.push('/admin_players')
                }).catch(e =>{
                    this.setState({
                        formError: true
                    })
                })
            }
        }else{
            this.setState({
                formError: true
            })
        }
    }
    render() {
        const { name, lastname, number, position} = this.state.formData;
        console.log(this.state.formData)
        return (
            <AdminLayouts>
                <div className="editplayers_dialog_wrapper">
                    <h2>{this.state.formType}</h2>
                    <form onSubmit={(event) => { this.handleSubmit(event)}}>

                        <FileUploader
                            dir="players"
                            tag="Player image"
                            defaultImage={this.state.defaultImage}
                            defaultImageName={this.state.formData.image.value}
                            resetImage={()=> this.resetImage()}
                            filename={(filename) =>this.storeFilename(filename)} 
                        />

                        <Forms
                            id ={'name'}
                            formData={name}
                            handleChange= {(element) => this.updateForm(element)} 
                        />
                         <Forms
                          id ={'lastname'}
                            formData={lastname}
                            handleChange= {(element) => this.updateForm(element)} 
                        />
                        <Forms
                         id ={'number'}
                            formData={number}
                            handleChange= {(element) => this.updateForm(element)} 
                        />
                         <Forms
                            id ={'position'}
                            formData = {position}
                            handleChange={(element)=>{ this.updateForm(element)}}
                        />

                        <div className="success_label">{this.state.formSuccess}</div>
                            {this.state.formError ?
                                <div className="error_label">Something went wrong, please try againg later.</div>
                                : ''
                            }

                        <div className="admin_submit">
                            <button onClick={(event) =>this.handleSubmit(event)}>
                                {this.state.formType}
                            </button>
                        </div>
                    </form>
                </div>
            </AdminLayouts>
        )
    }
}
