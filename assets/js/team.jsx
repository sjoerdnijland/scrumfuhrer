import React from 'react';

export default class Team extends React.Component {
    constructor() {
        super();

        this.state = {
            teamId:1,
        };

        this.change = this.change.bind(this);
    }

    change(event) {
        let teamId = 1;
        for (let node of event.target.children) {
            if (node.value === event.target.value) {
                teamId = node.getAttribute('id');
            }
        }
        this.setState({ teamId: teamId});
        this.props.update(teamId);
    }

    render() {
       let teamId = this.state.teamId;

       return (
           <select name="team" id="team" defaultValue={teamId} onChange={this.change} >
               <option key="1"
                       id="1"
                       name="Leisure"
                       value="1">
                   Leisure
               </option>
               <option key="2"
                       id="2"
                       name="Business Commmerce"
                       value="2">
                   Business Commmerce
               </option>
               <option key="3"
                       id="3"
                       name="Mobility"
                       value="3">
                   Mobility
               </option>
           </select>
        );
    }
}