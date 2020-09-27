import React from 'react';

const Forms = ({ id, formData, handleChange }) => {

    const showError =()=>{
        let errorMessage = <div className="error_label">
            {
                formData.validation && !formData.valid ?
                    formData.validationMessage         : null
            }
        </div>

        return errorMessage;
    }

    const renderTemplate = () =>{
        let formTemplate = null;
        
        // lets check what kind of form data we are receiving from props

        switch(formData.element){
            case('input'):
                // if input has props then we will pass all formdata config to it
                // handleChange must receive event and id as an object.
                formTemplate = (

                    <div>
                        <input 
                            {...formData.config}
                            value={formData.value}
                            onChange={(event) => handleChange({event, id})}
                        />
                        {showError()}
                    </div>
                )
                break;

            default:
             formTemplate = null
        }
        return formTemplate;
    }
    
    return (
        <div>
            {renderTemplate()}
        </div>
    )
}

export default Forms
