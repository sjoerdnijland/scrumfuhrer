import React from 'react';

export default class Notification extends React.Component {
    constructor() {
        super();

        this.state = {
            data:[],
        };
    }

    render() {

        const iconPrefix = 'images/badges/';
        const icon = this.props.data.icon;
        const iconPostfix = '.svg';
        const iconSrc = iconPrefix+icon+iconPostfix;
        const iconClass = "notificationIcon " + this.props.data.level;

       return (
           <div className="notificationBox" title={this.props.data.tooltip}>
                <div className={iconClass}>
                    <img src={iconSrc}/>
                </div>
                <div className="notificationDetails">
                    <ul>
                        <li>
                            <span>{this.props.data.message}</span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}