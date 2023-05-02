import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      // saving error
    } 
 }
  export let info = storeData



export const getData = async (): Promise<string> => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
        // value previously stored
        return value
      }
    } catch(e) {
        console.error(e)
      // error reading value
    }
    return '';
  }