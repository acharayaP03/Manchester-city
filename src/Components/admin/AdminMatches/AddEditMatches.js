import React, { Component } from 'react';
import AdminLayouts from '../../../Hocs/Admin_layout';
import Form from '../../Utils/Forms';
import {validate} from '../../Utils/Tags';

export default class AddEditMatches extends Component {
    state ={
        matchId: '',
        formType: '',
        formError: '',
        formSuccess: '',
        teams: [],
        formData: {
            date: {
                element: 'input',
                id: 'date',
                value: '',
                config:{
                    label: 'Event Date',
                    name: 'date_input',
                    type: 'date',
                },
                validation: {
                    required: true,
                },
                valid:false,
                validationMessage: '',
                showLabel: true
            },
            local: {
                element: 'select',
                id: 'local',
                value: '',
                config:{
                    label: 'Select Local Team',
                    name: 'select_local',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid:false,
                validationMessage: '',
                showLabel: false
            }
        }
    }
    render() {
        return (
            <AdminLayouts>
                <div className="editmatch_dialog_wrapper">
                    <h3>{this.state.formType}</h3>
                    <form onSubmit={(event) =>this.handelSubmit()}>
                        <Form
                            id={'date'}
                            formData = {this.state.formData.date}
                            
                        />
                        <Form
                            id={'local'}
                            formData = {this.state.formData.local}
                            
                        />
                    </form>
                </div>
            </AdminLayouts>
        )
    }
}

