import React, { Component } from 'react';
import Forms from '../Utils/Forms';
import {validate} from '../Utils/Tags';
import { firebase } from '../../firebase';

export default class SignIn extends Component {
    state={
        formError: false,
        formSuccess: '',
        formData: {
            email: {
                element: 'input',
                id: 'email',
                value: '',
                config:{
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid:false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                id: 'password',
                value: '',
                config:{
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid:false,
                validationMessage: ''
            }
        }
    }

    updateForm(element){
        //Test if the change event triggers the id of the input element.
        //console.log(element)


        // since we cannot directly mutate formData state, we will create a copy of it
        const newFormData = { ...this.state.formData };
        //inside that we will access form element where the change has occured
        const newElement = {...newFormData[element.id]};

        //console.log(newElement)
        //assign the value of the target element to the element of newElement, in our case email
        newElement.value = element.event.target.value;

        //lets validate the data first 
        let validData = validate(newElement);

        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        //finally assign it to the newForm data
        newFormData[element.id] = newElement;

        //console.log(newElement)

        //then set the state 
        this.setState({
            formError: false,
            formData : newFormData
        })
    }

    handleSubmit(event){
        event.preventDefault();

        let data = {};
        let formIsValid = true;

        for (let key in this.state.formData){
            data[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].value && formIsValid;
        }

        if(formIsValid){

            firebase.auth()
            .signInWithEmailAndPassword(
                data.email,
                data.password
            ).then(()=>{
                this.props.history.push('/dashboard');
            })
            .catch(error =>{
                this.setState({ formError: true});
            })

        }else{
            this.setState({ formError: true});
        }
    }
    render() {
        return (
            <div className="container">
                <div className="signin_wrapper" style={{margin: '100px'}}>
                    <form onSubmit={(event) => this.handleSubmit(event)}>
                        <h2>Please log in</h2>
                        <Forms
                            id={'email'}
                            formData = {this.state.formData.email}
                            handleChange={(element)=>{ this.updateForm(element)}}
                        />
                         <Forms
                                id={'password'}
                                formData = {this.state.formData.password}
                                handleChange={(element)=>{ this.updateForm(element)}}
                        />
                        {
                            this.state.formError ?
                            <div className="error_label">Couldnt login, your email or password is incorrect.</div> 
                            : null
                        }
                        <button onClick={(event)=> this.handleSubmit(event)}>Login</button>
                    </form>
                </div>
            </div>
        )
    }
}
