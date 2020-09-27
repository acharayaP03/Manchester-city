import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import Forms from '../../Utils/Forms';
import {validate} from '../../Utils/Tags';

import { promotions } from '../../../firebase';

export default class Enroll extends Component {
    

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

        console.log(newElement)
        //assign the value of the target element to the element of newElement, in our case email
        newElement.value = element.event.target.value;

        //lets validate the data first 
        let validData = validate(newElement);

        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        //finally assign it to the newForm data
        newFormData[element.id] = newElement;

        console.log(newElement)

        //then set the state 
        this.setState({
            formError: false,
            formData : newFormData
        })
    }

    resetFormSuccess(type){
        const newFormData = { ...this.state.formData };

        for( let key in newFormData){
            newFormData[key].value = '';
            newFormData[key].valid = false;
            newFormData[key].validationMessage = '';
        }

        //then set the state 
        this.setState({
            formError: false,
            formData : newFormData, 
            formSuccess: type ? 'Congratulations....': 'Email already exist...'
        })
        this.successMessage();
    }

    successMessage(){
        setTimeout(()=>{
            this.setState({
                formSuccess: ''
            })
        }, 3000)
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
            //first check if email exist in the database.
            promotions.orderByChild('email').equalTo(data.email).once("value")
            .then((result) =>{
                if(result.val() === null){
                    promotions.push(data);
                    this.resetFormSuccess(true)
                }else{
                    this.resetFormSuccess(false)
                }
            })
        }else{
            this.setState({ formError: true});
        }
    }

    render() {
        return (
            <Fade>
                <div className="enroll_wrapper">
                    <form action="" onSubmit={(event) =>{
                        this.handleSubmit(event)
                    }}>

                        <div className="enroll_title">
                            Enter your email
                        </div>
                        <div className="enroll_input">
                            {/* here we pass every thing from state as props and render form  */}
                            <Forms
                                id={'email'}
                                formData = {this.state.formData.email}
                                handleChange={(element)=>{ this.updateForm(element)}}
                            />
                            {
                                this.state.formError ?
                                <div className="error_label">Something went worng, please try again later</div> 
                                : null
                            }
                            <div className="success_label">{this.state.formSuccess}</div>
                            <button onClick={(event)=> this.handleSubmit(event)}>Enter</button>
                            <div className="enroll">
                                This webage is made with whole lotta love, handle with care. your email will be saved and wont be shared with any one. 
                            </div>
                        </div>
                    </form>
                </div>
            </Fade>
        )
    }
}
