import React, { Component } from 'react';
import {db, matches, teams} from '../../../firebase';
import { firebaseLooper } from '../../Utils/Tags';
import AdminLayouts from '../../../Hocs/Admin_layout';
import Forms from '../../Utils/Forms';
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
            },
            resultLocal: {
                element: 'input',
                value: '',
                config:{
                    label: 'Result Local',
                    name: 'result_local_input',
                    type: 'text',
                },
                validation: {
                    required: true,
                },
                valid:false,
                validationMessage: '',
                showLabel: false
            },
            away: {
                element: 'select',
                id: 'away',
                value: '',
                config:{
                    label: 'Select away Team',
                    name: 'select_away',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid:false,
                validationMessage: '',
                showLabel: false
            },
            resultAway: {
                element: 'input',
                value: '',
                config:{
                    label: 'Result Local',
                    name: 'result_away_input',
                    type: 'text',
                },
                validation: {
                    required: true,
                },
                valid:false,
                validationMessage: '',
                showLabel: false
            },
            referee: {
                element: 'input',
                id: 'refree',
                value: '',
                config:{
                    label: 'Refree',
                    name: 'referee_input',
                    type: 'text',
                    placeholder: 'Refree Details'
                },
                validation: {
                    required: true,
                },
                valid:false,
                validationMessage: '',
                showLabel: true
            },
            stadium: {
                element: 'input',
                id: 'stadium',
                value: '',
                config:{
                    label: 'Stadium',
                    name: 'stadium_input',
                    type: 'text',
                    placeholder: 'Stadium Name'
                },
                validation: {
                    required: true,
                },
                valid:false,
                validationMessage: '',
                showLabel: true
            },
            result: {
                element: 'select',
                id: 'result',
                value: '',
                config:{
                    label: 'Team Result',
                    name: 'select_result',
                    type: 'select',
                    options: [
                        {key: 'win', value: 'Win'},
                        {key: 'loose', value: 'Lost'},
                        {key: 'draw', value: 'Draw'},
                        {key: 'none', value: 'Not Available'},
                    ]
                },
                validation: {
                    required: true,
                },
                valid:false,
                validationMessage: '',
                showLabel: true
            },
            final: {
                element: 'select',
                id: 'final',
                value: '',
                config:{
                    label: 'Game Played',
                    name: 'select_final',
                    type: 'select',
                    options: [
                        {key: 'yes', value: 'Yes'},
                        {key: 'No', value: 'No'},
                    ]
                },
                validation: {
                    required: true,
                },
                valid:false,
                validationMessage: '',
                showLabel: true
            }
        }
    }

    /**
     * 
     * @param {updatForm} element 
     *  Test if the change event triggers the id of the input element.console.log(element)
     *  since we cannot directly mutate formData state, we will create a copy of it
     * inside that we will access form element where the change has occured
     * assign the value of the target element to the element of newElement, in our case email
     * lets validate the data first 
     * finally assign it to the newForm data
     * then set the state 
     */

    updateForm(element){

        const newFormData = { ...this.state.formData };
        console.log(this.state.formData)

        const newElement = {...newFormData[element.id]};
        newElement.value = element.event.target.value;

        let validData = validate(newElement);

        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        newFormData[element.id] = newElement;
        this.setState({
            formError: false,
            formData : newFormData
        })
    }

    /***
     * @function updateFields 
     * @
     */

     updateFields(match, teamOptions, teams, type, matchId){
         const newFormData = {
             ...this.state.formData
         }

         for(let key in newFormData){
             if(match){
                 newFormData[key].value = match[key];
                 newFormData[key].valid = true;
             }
             if(key === 'local' || key === 'away'){
                 newFormData[key].config.options = teamOptions 
             }
         }

         this.setState({
             matchId,
             formType: type,
             formData: newFormData,
             teams
         })
     }

    /**
     * @params fetch matches with relevant id.
     * @componentDidMount
     * @matchid wiill be retrived from the routes as a props
     * @condition if the edit match then retrieve it from props, else show add form
     */

    componentDidMount(){
        const matchId = this.props.match.params.id;
        const getTeams= (match, type) =>{
            teams.once('value').then((snapshot) => {
                const teams = firebaseLooper(snapshot);
                const teamOptions = [];

                snapshot.forEach((childSnapshot) =>{
                    teamOptions.push({
                        key: childSnapshot.val().shortName,
                        value: childSnapshot.val().shortName
                    })
                })
                //console.log(teamOptions)
                this.updateFields(match, teamOptions, teams, type, matchId)

            })
        }
        if(!matchId){
            //show add form
            getTeams(false, 'Add Match');
        }else{
            db.ref(`matches/${matchId}`).once('value')
            .then( (result) =>{
                const match = result.val();
                getTeams(match, 'Edit Match');
            })
        }
    }

    successForm(message){
        this.setState({ 
            formSuccess : message
        })

        setTimeout(() =>{
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

        this.state.teams.forEach( team =>{
            if(team.shortName === data.local){
                data['localThmb'] = team.thmb;
            }
            if(team.shortName === data.away){
                data['awayThmb'] = team.thmb;
            }
        }) 

        if(formIsValid){
            if(this.state.formType == 'Edit Match'){
                db.ref(`matches/${this.state.matchId}`).update(data).then(()=>{
                    this.successForm('Match Updated successfully')
                }).catch((e) =>{
                    this.setState({ formError : true});
                })
            }else{
                // if the form is add form 
                matches.push(data).then(() =>{
                    console.log(data)
                    this.props.history.push('/admin_matches');
                }).catch((e) =>{
                    this.setState({ formError: true})
                })
            }
        }else{
            this.setState({ formError: true});
        }
    }

    render() {
        const {date, local, away, referee, result, final, stadium ,resultLocal, resultAway} = this.state.formData;
        return (
            <AdminLayouts>
                <div className="editmatch_dialog_wrapper">
                    <h2>{this.state.formType}</h2>
                    <form onSubmit={(event) => this.handelSubmit(event)}>
                        <Forms
                            id={'date'}
                            formData = {date}
                            handleChange={(element)=>{ this.updateForm(element)}}
                        />

                        <div className="select_team_layout">
                            <div className="label_inputs">
                                Local
                            </div>
                            <div className="wrapper">
                                <div className="left">
                                    <Forms
                                        id={'local'}
                                        formData = {local}
                                        handleChange={(element)=>{ this.updateForm(element)}}
                                    />
                                </div>
                                <div>
                                    <Forms
                                        id={'resultLocal'}
                                        formData = {resultLocal}
                                        handleChange={(element)=>{ this.updateForm(element)}}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="select_team_layout">
                            <div className="label_inputs">
                                Away
                            </div>
                            <div className="wrapper">
                                <div className="left">
                                    <Forms
                                        id={'away'}
                                        formData = {away}
                                        handleChange={(element)=>{ this.updateForm(element)}}
                                    />
                                </div>
                                <div>
                                    <Forms
                                        id={'resultAway'}
                                        formData = {resultAway}
                                        handleChange={(element)=>{ this.updateForm(element)}}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="split_fields">
                            <Forms
                                id={'referee'}
                                formData = {referee}
                                handleChange={(element)=>{ this.updateForm(element)}}
                            />
                            <Forms
                                id={'stadium'}
                                formData = {stadium}
                                handleChange={(element)=>{ this.updateForm(element)}}
                            />
                        </div>
                        <div className="split_fields last">
                            <Forms
                                id={'result'}
                                formData = {result}
                                handleChange={(element)=>{ this.updateForm(element)}}
                            />
                             <Forms
                                id={'final'}
                                formData = {final}
                                handleChange={(element)=>{ this.updateForm(element)}}
                            />
                        </div>
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

