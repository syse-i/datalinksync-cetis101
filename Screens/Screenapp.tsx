import { useContext, useEffect, useState } from 'react';
import { SectionList, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, TextInput, Button, DrawerLayoutAndroid, TouchableWithoutFeedback } from 'react-native';
import { stylesApp } from '../styles/Styles';
import { AuthContext, AuthDispatchContext } from '../context/ContextLogin';
import { REACT_APP_HOST_API } from "@env"
import AsyncStorage from '@react-native-async-storage/async-storage';


type RootStackParamList = {
    List: undefined;
    Details: { item: { id: string, name: string } };
};

type ListProps = NativeStackScreenProps<RootStackParamList, 'List'>
type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>

const getData = async (auth: { key: string }) => {
    /*Para poder hacer la validacion hay que verificar que en la base de
    datos, en la tabla sync el campo is sync sea true para que consulte la
    base de datos local en el caso contrario sincronise la informacion
    faltatante*/
    console.log("Consultando datos de la API...")
    try {
        //condicion
        /*if (sync) {
            const value = await AsyncStorage.getItem('@storage_Key')
            return JSON.parse(value)
        } else if (sync === false) {
            const response = await fetch(`${REACT_APP_HOST_API}/v1/CetisAlumnos/`, {
                headers: {
                    'Authorization': `Token ${auth?.key}`,
                }
            })
            return await response.json()
        } */

        const value = await AsyncStorage.getItem('@storage_Key')
        return JSON.parse(value)

        const response = await fetch(`${REACT_APP_HOST_API}/v1/CetisAlumnos/`, {
            headers: {
                'Authorization': `Token ${auth?.key}`,
            }
        })
        return await response.json()
    } catch {
        throw new Error("Error al consultar los datos")
    }
}

const markDataAsSync = async (auth: { key: string }) => {
    const res = await fetch(`${REACT_APP_HOST_API}/v1/CetisAlumnos/mark_as_read/`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Token ${auth?.key}`,
        }
    })
    console.log('res markData', res)
    return null
}

export const ListScreen: React.FunctionComponent<ListProps> = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [data, setData] = useState(null)
    const auth = useContext(AuthContext)
    const dispatch = useContext(AuthDispatchContext)

    const callback = async (auth: { key: string }) => {
        try {
            const newData = await getData(auth)
            // concatenar objetos (merge)
            // almacenar en base de datos local
            setData(prevData => ({ ...prevData, ...newData }))
            await AsyncStorage.setItem('@storage_Key', JSON.stringify(newData))
            console.log("Ahora me toca marcar la pagina como sincronizada", data)
            await markDataAsSync(auth)
        } catch (error) {
            setIsError(true)
        }
    }

    // Constructor
    useEffect(() => {
        console.log("Me estoy ejecutando")
        callback(auth).then(() => {
            setIsLoading(false)
        })
    }, [auth, dispatch])

    if (isLoading) return <Text>Cargando datos...</Text>
    if (isError) return <Text>Error...</Text>

    const onPressHandler = (item: { id: string, name: string }) => {
        return function () {
            //Esto hace navegacion a detalle y agarra las propiedades de item y lo deposita en item gracias a {'item':item}
            return navigation.navigate('Details', { 'item': item })
        }
    }
    return (
        <SafeAreaView style={stylesApp.container}>
            <SectionList
                sections={[{
                    title: 'CetisAlumnos',
                    data: data.results || [] //data.results.map(obj => obj.name)
                }]}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    //El touchableWithouFeedback tiene la misma funcion que un botono sin la necesidad de ser un boton
                    <TouchableWithoutFeedback onPress={onPressHandler(item)}>
                        <View style={stylesApp.item}>
                            <Text style={stylesApp.title}>{item.name}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={stylesApp.header}>{title}</Text>
                )}
            />
        </SafeAreaView>
    );
}

export const DetailsScreen: React.FunctionComponent<DetailsProps> = ({ route }) => {
    const { item } = route.params

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen {item.name}</Text>
        </View>
    );
}