import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './notification';
import Team from './team';
import WebFont from 'webfontloader';

WebFont.load({
    google: {
        families: ['Quicksand:300,400,500,700']
    }
});

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            data:[],
            notifications: [],
            teamId: 1,
            teamName: "Leisure"

        };

        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.update();
        setInterval(this.update, 50000);
    }

    update(teamId) {
        let teamName = this.state.teamName;
        if(teamId == 1){
            teamName = "Leisure"
        }else if(teamId == 2){
            teamName = "Business Commerce"
        }else if(teamId == 3){
            teamName = "Mobility"
        }else{
            teamId = this.state.teamId;
        }
        this.setState({ teamId: teamId});
        this.setState({ teamName: teamName});
        this.setState({ notifications: []});
        this.fetchTeam(teamId);
    }

    fetchTeam(teamId){
        fetch('https://insights.webstores.nl/teamstatistics/'+teamId)
            .then(results => results.json())
            .then(data => this.setState({ data: data}))
            .then(process => {
                this.leetStatus();
                this.trackStatus();
                this.teamStatus();
                this.debtStatus();
                this.doneStatus();
                this.inProgressStatus();
                this.plannedStatus();
                this.sizeStatus();
                this.blockedStatus();
                this.noForecastStatus();
                this.noValueStatus();
                this.bookedStatus();
            });
    }

    leetStatus() {
        const data = this.state.data;
        if(Object.keys(data).length == 0) {
            return(false);
        }

        let leetScore = 0;
        let notification = {};

        let notifications = this.state.notifications;
        let level = 'good';

        leetScore = 100 *  data.company.totalBurned / 1337;
        leetScore = Math.round(leetScore);

        if(leetScore >= 100){
            level = 'great';
        }

        notification['id'] = 'leet';
        notification['message'] = "Webstores is "+Math.round(leetScore)+"% 1337!";
        notification['tooltip'] = notification['message'];
        notification['score'] = Math.round(leetScore);
        notification['icon'] = 'hero';
        notification['level'] = level;
        notifications.push(notification);
        this.setState({ notifications: notifications});
        return(notification);
    }

    trackStatus() {
        const data = this.state.data;
        if(Object.keys(data).length == 0) {
            return(false);
        }
        let dayScore = 0;
        let trackScore = 0;
        let notification = {};
        let level = 'good';
        let icon =  'steady';
        let notifications = this.state.notifications;

        const date = new Date();
        const currentDayNumber = date.getDay();

        dayScore = data.company.totalCommit / 5 * currentDayNumber;
        trackScore = 100 *  data.company.totalBurned / dayScore;
        trackScore = Math.round(trackScore);

        notification['message'] = "Webstores is "+trackScore+"% op koers!";

        if(trackScore < 80){
            level = 'shit';
            icon = 'lagged';
            notification['message'] = "Webstores loopt "+(100-trackScore)+"% achter op prognose!";
        }else if(trackScore > 100){
            level = 'great';
            icon = 'beyond';
        }

        notification['id'] = 'track';
        notification['icon'] = icon;
        notification['score'] = trackScore;
        notification['tooltip'] = "dit is op basis van de dagscore ten opzichte van de prognose";
        notification['level'] = level;
        notifications.push(notification);
        this.setState({ notifications: notifications});
        return(notification);

    }

    teamStatus() {
        const data = this.state.data;
        if(Object.keys(data).length == 0) {
            return(false);
        }
        let dayScore = 0;
        let trackScore = 0;
        let notification = {};
        let level = 'good';
        let icon =  'woosh';
        let notifications = this.state.notifications;

        const date = new Date();
        const currentDayNumber = date.getDay();

        dayScore = data.focus.commit / 5 * currentDayNumber;
        trackScore = 100 *  data.focus.burned / dayScore;
        trackScore = Math.round(trackScore);

        notification['message'] = this.state.teamName+" is "+trackScore+"% op koers!";

        if(trackScore < 80){
            level = 'shit';
            icon = 'zombie';
            notification['message'] = this.state.teamName+" loopt "+(100-trackScore)+"% achter op prognose!";
        }else if(trackScore > 100){
            level = 'great';
            icon = 'veteran';
        }

        notification['id'] = 'team';
        notification['icon'] = icon;
        notification['score'] = trackScore;
        notification['tooltip'] = "dit is op basis van de dagscore ten opzichte van de prognose";
        notification['level'] = level;
        notifications.push(notification);
        this.setState({ notifications: notifications});
        return(notification);

    }

    debtStatus() {
        const data = this.state.data;
        if(Object.keys(data).length == 0) {
            return(false);
        }
        let notification = {};
        let level = 'good';
        let itemsDebt = data.debt.items;
        let hoursDebt = data.debt.hours;
        let notifications = this.state.notifications;
        let itemsLabel = 'items';
        let hoursLabel = 'verwachte uren';

        if(itemsDebt > 8 || hoursDebt > 32){
            level = 'shit';
        }
        if(itemsDebt < 2 && hoursDebt < 4){
            level = 'great';
        }

        if(itemsDebt == 1){
            itemsLabel = 'item';
        }

        if(hoursDebt == 1){
            hoursLabel = 'verwacht uur';
        }

        notification['message'] = this.state.teamName+" heeft "+itemsDebt+" "+itemsLabel+" en "+hoursDebt+" "+hoursLabel+" aan 'debt'.";
        notification['tooltip'] = "'Debt' kan worden aangegeven door het toekennen van de label 'debt' in Jira";
        notification['score'] = hoursDebt;
        notification['icon'] = 'silly-monster';
        notification['level'] = level;
        notification['id'] = 'debt';
        notifications.push(notification);
        this.setState({ notifications: notifications});
        return(notification);

    }

    doneStatus() {
        const data = this.state.data;
        if(Object.keys(data).length == 0) {
            return(false);
        }
        let notification = {};
        let level = 'great';
        let checked = data.dods.checked;
        let total = data.dods.total;
        let notifications = this.state.notifications;
        let doneScore = 0;

        doneScore = 100 * checked / total;
        doneScore =  Math.round(doneScore);

        if(doneScore < 25){
            level = 'shit';
        }else if (doneScore < 85){
            level = 'good';
        }

        notification['message'] = this.state.teamName+" is "+doneScore+"% 'done'.";
        notification['tooltip'] = "Dit geeft het percentage aan afgevinkte 'Definitions of Done' aan.";
        notification['score'] = doneScore;
        notification['icon'] = 'drill-instructor';
        notification['level'] = level;
        notification['id'] = 'done';
        notifications.push(notification);
        this.setState({ notifications: notifications});
        return(notification);
    }

    inProgressStatus() {
        const data = this.state.data;
        if(Object.keys(data).length == 0) {
            return(false);
        }
        let notification = {};
        let level = 'shit';
        let inProgress = data.focus.inprogress;
        let notifications = this.state.notifications;

        if(inProgress < 5){
            level = 'great';
        }else if (inProgress < 10){
            level = 'good';
        }

        notification['message'] = this.state.teamName+" werkt aan "+inProgress+" items tegelijk.";
        notification['tooltip'] = "Als er aan veel items tegelijk gewerkt wordt kan dit duiden op te weinig samenwerking en concentratie.";
        notification['score'] = inProgress;
        notification['icon'] = 'magic-potion';
        notification['level'] = level;
        notification['id'] = 'inProgress';
        notifications.push(notification);
        this.setState({ notifications: notifications});
        return(notification);

    }

    plannedStatus() {
        const data = this.state.data;
        if(Object.keys(data).length == 0) {
            return(false);
        }

        let notification = {};
        let level = 'great';
        let planned = data.focus.planned;
        let commit = data.focus.commit;
        let burned = data.focus.burned;
        let notifications = this.state.notifications;
        let diff = commit - planned;

        notification['message'] = this.state.teamName+" is met  "+diff+"  SP minder belast dan prognose. ";

        if(diff < 0 ){
            if(burned < commit){
                level = 'shit';
            }
            notification['message'] = this.state.teamName+" is met "+Math.abs(diff)+" SP meer belast dan prognose. ";
        }

        notification['tooltip'] = "Als het team naar verwachting teveel belast is, kan dit een effect hebben op de concentratie. Er meer aandacht nodig voor communicatie. Dit kan de prognose negatief beïnvloeden.";
        notification['score'] = diff;
        notification['icon'] = 'ship';
        notification['level'] = level;
        notification['id'] = 'planned';
        notifications.push(notification);
        this.setState({ notifications: notifications});
        return(notification);

    }

    sizeStatus() {
        const data = this.state.data;
        if(Object.keys(data).length == 0) {
            return(false);
        }

        let notification = {};
        let level = 'good';
        let tooBig = data.focus.toobigstories;
        let notifications = this.state.notifications;
        let epicLabel = 'epics';

        if(tooBig == 0 ){
            return(false);
        }else if(tooBig < 5){
            level = 'good';
        }else{
            level = 'shit';
        }

        if(tooBig == 1){
            epicLabel = 'epic';
        }

        notification['message'] = this.state.teamName+" werkt aan "+tooBig+" "+epicLabel+". ";
        notification['tooltip'] = "Als er aan te grote items gewerkt wordt kan dit een risico vormen omdat er onverwachte complexiteiten ontdekt worden.";

        notification['score'] = tooBig;
        notification['icon'] = 'scale';
        notification['level'] = level;
        notification['id'] = 'size';
        notifications.push(notification);
        this.setState({ notifications: notifications});
        return(notification);

    }

    blockedStatus() {
        const data = this.state.data;
        if(Object.keys(data).length == 0) {
            return(false);
        }

        let notification = {};
        let level = 'shit';
        let blockedItems = data.teamwork.blockedItems;
        let blockedValue = data.teamwork.blockedValue;
        let notifications = this.state.notifications;
        let itemsLabel = 'items';

        if(blockedValue == 0 ){
            level = 'great';
        }else if(blockedValue < 12){
            level = 'good';
        }

        if(blockedItems == 1){
            itemsLabel = 'item';
        }

        notification['message'] = this.state.teamName+" heeft "+blockedItems+" "+itemsLabel+" met "+blockedValue+" SP geblokkeerd. ";
        notification['tooltip'] = "Blokkades kunnen een negatieve invloed hebben op de prognose. Er zijn extra handelingen en er is extra communicatie nodig.";
        notification['score'] = blockedValue;
        notification['icon'] = 'barrier';
        notification['level'] = level;
        notification['id'] = 'blocked';
        notifications.push(notification);
        this.setState({ notifications: notifications});
        return(notification);

    }

    noForecastStatus() {
        const data = this.state.data;
        if(Object.keys(data).length == 0) {
            return(false);
        }

        let notification = {};
        let level = 'shit';
        let noForecast = data.teamwork.itemsWithoutForecast;
        let notifications = this.state.notifications;
        let itemsLabel = 'items';

        if(noForecast == 0 ){
            level = 'great';
        }else if(noForecast < 5){
            level = 'good';
        }

        if(noForecast == 1){
            itemsLabel = 'item';
        }

        notification['message'] = this.state.teamName+" heeft "+noForecast+" "+itemsLabel+" niet ingeschat. ";
        notification['tooltip'] = "Items waarvan de complexiteit niet is ingeschat, kunnen risico's vormen m.b.t. de gestelde prognose.";
        notification['score'] = noForecast;
        notification['icon'] = 'cards';
        notification['level'] = level;
        notification['id'] = 'noForecast';
        notifications.push(notification);
        this.setState({ notifications: notifications});
        return(notification);

    }

    noValueStatus() {
        const data = this.state.data;
        if(Object.keys(data).length == 0) {
            return(false);
        }

        let notification = {};
        let level = 'shit';
        let noValue = data.teamwork.itemsWithoutValue;
        let notifications = this.state.notifications;
        let itemsLabel = 'items';

        if(noValue == 0 ){
            level = 'great';
        }else if(noValue < 5){
            level = 'good';
        }

        if(noValue == 1){
            itemsLabel = 'item';
        }

        notification['message'] = this.state.teamName+" heeft voor "+noValue+" "+itemsLabel+" geen waarde bepaald. ";
        notification['tooltip'] = "Items waarvan de waarde niet is bepaald, kunnen risico's vormen m.b.t. de gestelde prognose.";
        notification['score'] = noValue;
        notification['icon'] = 'rich';
        notification['level'] = level;
        notification['id'] = 'noValue';
        notifications.push(notification);
        this.setState({ notifications: notifications});
        return(notification);

    }

    bookedStatus() {
        const data = this.state.data;
        if(Object.keys(data).length == 0) {
            return(false);
        }

        let notification = {};
        let level = 'good';
        let icon = 'warmed-up';
        const gain = data.value.smallerthen;
        const loss = data.value.biggerthen;
        let notifications = this.state.notifications;
        let totalGain = 0;
        let totalLoss = 0;
        var diff = 0;

        for(var i in gain){
            totalGain += Math.abs(gain[i].diff);
        }

        for(var i in loss){
            totalLoss += loss[i].diff;
        }

        diff = Math.round((totalGain - totalLoss) / 3600);

        if(diff < -8){
            icon = 'sloth';
            level = 'shit';
        }else if(diff > 8){
            icon = 'on-a-roll';
            level = 'great';
        }

        notification['message'] = "Huidige balans van "+this.state.teamName+" is "+diff+" uur";
        notification['tooltip'] = "Dit geeft het balans van alle afgeronde items aan (geschatte werkzaamheden ten opzichte van de geboekte uren)";
        notification['score'] = diff;
        notification['icon'] = icon;
        notification['level'] = level;
        notification['id'] = 'gainLoss';
        notifications.push(notification);
        this.setState({ notifications: notifications});
        return(notification);
    }

    render() {
        var notificationNodes = this.state.notifications.map(function(notification) {
             return (
                    <Notification key={notification.id} data={notification} />
             );
        });
       return (
           <div>
               <h1>{this.state.teamName}</h1>
               <Team update={this.update}/>
               <div className="notification-nodes">{notificationNodes}</div>
           </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));