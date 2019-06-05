import ParkingGeofecing from 'react-native-simple-native-geofencing';


export default class geofecing extends Component {

    componentDidMount(){
        //set up Notifications
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
                //[value] will be replaced ob geofences' value attribute
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

    fail(){
        console.log("Fail to start geofencing")
    }
    startMonitoring(lat, long){
        const geofences = [
          {
            key: "geoNum1",
            latitude: lat,
            longitude: long,
            radius: 200,
            value: "yellow"
          },
      
        ];
        ParkingGeofecing.addGeofences(geofences, 3000000, this.fail);
    }
    
    stopMonitoring(){
      ParkingGeofecing.removeAllGeofences();
    }
}

