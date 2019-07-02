
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapView, { Marker, Polygon } from 'react-native-maps';
import Geofence, { Constants } from 'react-native-geolocation-monitor';
import {ToastAndroid} from 'react-native';


import Search from '../components/search';
import api from '../../services/api';


import { 
  Container,
   AnnotationContainer, 
   AnnotationText,
  } from './styles';

export default class Main extends Component {
 

  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          token: PropTypes.string,
        }),
      }),
    }).isRequired,
  }


  state = {
    locations: [],
    region: null,
    
  };

  watchID: ?number = null
//inicio componente Didmount
  componentDidMount() {

    //INICIO-LOCALIZAÇÃO USUARIO
    // eslint-disable-next-line no-undef
    navigator.geolocation.getCurrentPosition(

      //sucesso
      (position) => {
        this.setState({

          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
            error: null,

          },

        });
      },

      //erro
      (error) => this.setState({
        error: error.message
      }),

      //parametros
      {
        
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 0,

      },
      
    );

    // eslint-disable-next-line no-undef
    this.watchID = navigator.geolocation.watchPosition(
     
      (position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
            error: null,

          },

        });
        {this.getParkings()}
      },
    );
    //FIM-LOCALIZAÇÃO USUARIO

    //Inicio-Geo

    //fim-Geo

  } 
 //fim componente Didmount

  componentWillMount() {
    // eslint-disable-next-line no-undef
    navigator.geolocation.clearWatch(this.watchID);
  }

  async getParkings() {
    
    try {
      const { region } = this.state;
      const response = await api.get('/parkings', {
        
        // -2.559344 ; -44.311542
        params: {
          latitude: region.latitude,
          longitude: region.longitude,
          distance: 1000,

        },
            
          } 


        );

        //let coords = response.data.polygon.map(pos => { return { latitude: pos[1], longitude: pos[0] } })
        const data = response.data.map ( (o) => { 
            const coords = JSON.parse (o.polygon)
            const gcoords = coords.map(pos => { return { latitude: pos[1], longitude: pos[0] } })
            return {...o, coords :  gcoords } }
        )

        this.setState({ locations: data });
        this.createGeofence(data); 

      } catch (err) {
        console.log('erroGetParking');   
      }
  }

  updateState(location) { 
    this.setState({
      region: {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134,
      }
    });

    {this.getParkings()}
  }

  getCoordsSearchName(loc) {
    this.updateState({
      latitude: loc.lat,
      longitude: loc.lng,
    });

  }

  onMapRegionChange(region) {
    this.setState({ region });
  }


  //Inicio-Geofecing
  createGeofence() {
    this.state.locations.map((loc) => (
      Geofence.add({
        id: loc.title,
        radius: 100,
        latitude: loc.latitude,
        longitude: loc.longitude,
      })
        .then(ToastAndroid.show('Geofence Criada: ', ToastAndroid.LONG, '3500'))
        .catch(error => console.log(JSON.stringify(error)))
        
      )
    )

    this.subscription = Geofence.notify(result => {
      console.log(result);
    });
    }
   
  //Fim-Geofecing

  renderLocations = () => (
    this.state.locations.map(location => (
      <Marker
        key={location.id.toString()}
        coordinate={{ longitude: location.longitude, latitude: location.latitude }}
      >
        
          <AnnotationContainer>
            <AnnotationText>{location.id}</AnnotationText>
          </AnnotationContainer>
      </Marker>

    ))
  )

  renderAreas = () => (
    this.state.locations.map(location => (
      <Polygon
        key={location.id.toString()}
        coordinates= {location.coords}
        fillColor={'#4682B4'}
      />

    ))
  )

  render() {
    const { region } = this.state;
    console.disableYellowBox = true;
    return (
      <Container>
        <MapView 
          region={region}
          style={{ flex: 1 }}
          showsUserLocation
          loadingEnabled
          showsMyLocationButton={false}
          zoomControlEnabled
          onRegionChangeComplete={reg => this.onMapRegionChange(reg)}
  
        > 

        {this.renderLocations()}
        {this.renderAreas()}
        </MapView>
        <Search notifyChange={loc => this.getCoordsSearchName(loc)} />      
    </Container>

      );
    }  
}

