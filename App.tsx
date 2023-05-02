import { StyleSheet, Text, View, TextInput, Button, SafeAreaView } from 'react-native'
import { storeData, getData } from './storingdata'
import React, { useCallback } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { MyTabs } from './TabsNavigation';

export default function App() {
  return (
      <NavigationContainer>
        <MyTabs/>
      </NavigationContainer>
  )
}
//   const [data, setData] = React.useState('');

//   const callback = useCallback(async() => {
//     const newVal = await getData()
//     setData(newVal)
//   }, [data])

//   React.useEffect(() => {
//     callback()
//   }, [])

//   return (
//     <>
//       <View style={styles.score_container}>
//         <Button
//           onPress={async () => {
//             await storeData('Hola que hace')
//             await callback()
//           }}
//           title="boton prueba"
//         />
//                 <Button
//           onPress={async () => {
//             await storeData('Valor2')
//             await callback()
//           }}
//           title="boton prueba"
//         />
//         <Text>{data||"foobar"}</Text>
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   score_container: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 10
//   },
//   score: {
//     fontSize: 40,
//     fontWeight: 'bold'
//   }
// });

