import axios from 'axios';
import { AsyncStorage } from 'react-native';

/* Endereços para cada emulador/simulador:
** Genymotion:              http://10.0.3.2:3333/
** Emulador Android Studio: http://10.0.2.2:3333/
** Simulador IOS:           http://localhost:3333/
*/

const api = axios.create({
  baseURL: ' http://10.0.3.2:3333/',
});

//axios interceptors
api.interceptors.request.use(async (config) => {

  try {
    const token = await AsyncStorage.getItem('@ParkingClient:token');

    
    //verifica se existe o token e adiciona ao header do authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    //console.log(config);

    return config;

  } catch (err){
    
    alert(err);
  }
});

export default api;
