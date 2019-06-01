import ParkingGeofecing from 'react-native-simple-native-geofencing';

export default class geofecing extends Component {

    componentDidMount(){
        ParkingGeofecing.initNotification(
            {
              channel: {
                title: "Message Channel Title",
                description: "Message Channel Description"
              },
              start: {
                notify: true,
                title: "Start Tracking",
                description: "You are now tracked"
              },
              stop: {
                notify: true,
                title: "Stopped Tracking",
                description: "You are not tracked any longer"
              },
              enter: {
                notify: true,
                title: "Attention",
                description: "You entered a [value] Zone"
              },
              exit: {
                notify: true,
                title: "Left Zone",
                description: "You left a [value] Zone"
              }
            }
         );
    }



  render() {
    return (
    
    );
  }
}
