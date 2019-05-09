import React, { Component } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class Search extends Component {

    state={
        searchFocused: false,
    }


  render() {
      const { searchFocused } = this.state;
    return (
     <GooglePlacesAutocomplete 
        placeholder='Para onde ?'
        placeholderTextColor='#333'
        minLength={3}
        listViewDisplayed={searchFocused}
        fetchDetails
        enablePoweredByContainer={false}
        nearbyPlacesAPI='GooglePlacesSearch'
        

        onPress={(data, details) => {
            this.props.notifyChange(details.geometry.location);
        }}

        query={{
            key: 'AIzaSyDfQmQB13sNCFGkmi1dsBNAP3YUcSmFPqg',
            language: 'pt', // language of the results
            //types: '(cities)' // default: 'geocode'
          }}

        textInputProps={{
            onFocus: () => { this.setState({ searchFocused: true }); },
            onBlur: () => { this.setState({ searchFocused: false }); },
            autoCapitalize: 'none',
            autoCorrect: false
            
        }}

        styles={{
            container: {
                position: 'absolute',
                top: 10,
                width: '100%',
                borderRadius: 50,

            },
            textInputContainer: {
                flex: 1,
                backgroundColor: 'transparent',
                height: 40,
                marginHorizontal: 20,
                borderTopWidth: 0,
                borderBottomWidth: 0,
                

            },
            textInput: {
                height: 30,
                margin: 0,
                borderRadius: 0,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 20,
                paddingRight: 20,
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
                elevation: 5,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowOffset: { x: 0, y: 0 },
                shadowRadius: 15,
                borderWidth: 1,
                borderColor: '#DDD',
                fontSize: 18,

            },
            listView: {
                borderWidth: 1,
                borderColor: '#ddd',
                backgroundColor: '#fff',
                marginHorizontal: 20,
                elevation: 5,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowOffset: { x: 0, y: 0 },
                shadowRadius: 15,
                marginTop: 5,

            },
            description: {
                fontSize: 16,

            },
            row: {
                padding: 5,
                height: 40,
            },
        }}

     />
    );
  }
}

