
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapView, { Marker, Callout } from 'react-native-maps';
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
  } 
 //fim componente Didmount

  componentWillMount() {
    // eslint-disable-next-line no-undef
    navigator.geolocation.clearWatch(this.watchID);
  }

  async getParkings() {
    try {
      const { region } = this.state;
      console.log('getparkingLat:', region.latitude);
      console.log('getparkingLon:', region.longitude);
      
      const response = await api.get('/parkings', {
        
        // -2.559344 ; -44.311542
        params: {
          latitude: region.latitude,
          longitude: region.longitude,
        },
  
        });

 
        this.setState({ locations: response.data });
      } catch (err) {
        console.log('erro');   
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

 /* handleLocationSelected = (data, { geometry }) => {
     const { location: { lat: latitude, lon: longitude }} = geometry
  }*/
  
  renderLocations = () => (
    this.state.locations.map(location => (
      <Marker
        id={location.id.toString()}
        coordinate={{ longitude: location.longitude, latitude: location.latitude }}
      >
          <AnnotationContainer>
            <AnnotationText>{location.id}</AnnotationText>
          </AnnotationContainer>

      </Marker>

    ))
  )

  render() {
    const { region } = this.state;
    console.log(region)
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
          onRegionChange={reg => this.onMapRegionChange(reg)}
  
        > 

        {this.renderLocations()}
        </MapView>
        <Search notifyChange={loc => this.getCoordsSearchName(loc)} />
        
    </Container>

      );
    }  
}

