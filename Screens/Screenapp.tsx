import { useContext, useEffect, useState, useCallback } from 'react';
import { SectionList, FlatList, TouchableOpacity, Text, View, AppStateStatus, Platform, AppState } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, TextInput, TouchableWithoutFeedback } from 'react-native';
import { stylesApp } from '../styles/Styles';
import { AuthContext } from '../context/ContextLogin';
import { REACT_APP_HOST_API } from "@env"
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Network from 'expo-network'
import { useQuery, focusManager } from 'react-query';
import { useRefreshOnFocus } from '../hooks/useRefetchOnFocus';
import { Entypo } from '@expo/vector-icons';

type RootStackParamList = {
    List: undefined;
    Details: { item: { id: string, name: string } };
};

type ListProps = NativeStackScreenProps<RootStackParamList, 'List'>
type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>

type AuthProps = { key: string, network: Network.NetworkState }

type CetisAlumnosType = {
    id: string,
    name: string
}

type CetisAlumnosStateType = CetisAlumnosType[] | null

const APIGetCetisAlumnos = async (authToken: AuthProps["key"]): Promise<CetisAlumnosType[]> => {
    try {
        console.log("Consultando datos de la API...")
        const response = await fetch(`${REACT_APP_HOST_API}/v1/CetisAlumnos/`, {
            headers: {
                'Authorization': `Token ${authToken}`,
            }
        })

        if (!response.ok) {
            throw new Error("Error al consultar los datos")
        }

        const data = await response.json()
        const results = data?.results ?? []
        console.log("APIGetCetisAlumnos", results)
        return results
    } catch (e) {
        console.error(e)
        return []
    }
}

// alert("No se pudo marcar los datos como sincronizados...")

const APIPatchCetisAlumnos = async (authToken: AuthProps["key"]): Promise<boolean> => {
    try {
        console.log("Marcando los datos de la API como sincronizados...")
        const response = await fetch(`${REACT_APP_HOST_API}/v1/CetisAlumnos/mark_as_read/`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Token ${authToken}`,
            }
        })
        if (!response.ok) {
            return false
        }
        console.log("APIPatchCetisAlumnos", await response.text())
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}

const getCetisAlumnosOffline = async (): Promise<CetisAlumnosStateType> => {
    try {
        const data = await AsyncStorage.getItem("@storage_Key")
        const results = JSON.parse(data)
        console.log("getCetisAlumnosOffline", results)
        return results
    } catch (e) {
        console.error(e)
        return null
    }
}
// alert("No se pudo guardar los datos localmente...")


const setCetisAlumnosOffline = async (newData: CetisAlumnosStateType): Promise<boolean> => {
    try {
        const oldData = await getCetisAlumnosOffline() ?? []
        // Remover duplicados La estrategia debe de ser al revez para remover datos viejos primero
        const concatData = newData.concat(oldData)
        const removeDuplicates = concatData.filter((value, index, self) => (
            index === self.findIndex((t) => t.id === value.id)
        ))
        await AsyncStorage.setItem('@storage_Key', JSON.stringify(removeDuplicates))
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}


const onAppStateChange = (status: AppStateStatus) => {
    if (Platform.OS !== 'web') {
        focusManager.setFocused(status === 'active')
    }
}

const syncCetisAlumnosAPI = async (authToken: string): Promise<CetisAlumnosStateType> => {
    const apiData = await APIGetCetisAlumnos(authToken)

    if (apiData.length !== 0) {
        await setCetisAlumnosOffline(apiData)
        await APIPatchCetisAlumnos(authToken)
        return await syncCetisAlumnosAPI(authToken)
    }
    return await getCetisAlumnosOffline()
}

export const ListScreen: React.FunctionComponent<ListProps> = ({ navigation }) => {
    const [isSyncingData, setIsSyncingData] = useState(true)
    const [isOffline, setIsOffline] = useState(false)
    const [search, setSearch] = useState('')
    const auth = useContext(AuthContext)

    const { data, isError, isLoading, isIdle, refetch } = useQuery(['useCetisAlumnosAPI'], async () => {
        const authToken = auth?.key
        setIsSyncingData(true)
        const results = await syncCetisAlumnosAPI(authToken)
        setIsSyncingData(false)
        return results
    }, { enabled: !!auth?.key })

    useRefreshOnFocus(refetch)

    useEffect(() => {
        const subscription = AppState.addEventListener('change', onAppStateChange)

        return () => subscription.remove()
    }, [])

    if (isIdle) return <Text>Cargando contexto...</Text>
    if (isLoading) return <Text>Cargando datos...</Text>
    if (isError) return <Text>Error...</Text>

    const onPressHandler = (item: { id: string, name: string }) => (() => (
        navigation.navigate('Details', { 'item': item })
    ))

    const results = !!(search && data) ? data.filter(item => item.name.toLowerCase().indexOf(search) > -1) : data //data.results.map(obj => obj.name)

    return (
        <SafeAreaView style={stylesApp.container}>
            <View style={{ backgroundColor: 'black', padding: 10, alignContent: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text style={{ color: 'white' }}>Status: {isOffline ? 'offline' : 'online'}</Text>
                <Text style={{ color: 'white' }}>Sincronizacion: {isSyncingData ? 'cargando...' : 'finalizada'}</Text>
            </View>
            <TextInput
                style={{ paddingVertical: 15, paddingHorizontal: 15, backgroundColor: 'white', marginBottom: 10, fontSize: 16 }}
                onChangeText={(text) => setSearch(text.toLowerCase())}
                defaultValue={search}
                placeholder="Buscar..."
                placeholderTextColor={'black'}
            />
            <FlatList
                data={results ?? []}
                keyExtractor={(item, index) => `ListScreenItem-${index}`}
                renderItem={({ item }) => (
                    //El touchableWithouFeedback tiene la misma funcion que un boton sin la necesidad de ser un boton
                    <TouchableOpacity onPress={onPressHandler(item)}>
                        <View style={stylesApp.item}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={stylesApp.title}>{item.name}</Text>
                                <Entypo name="chevron-thin-right" size={18} />
                            </View>
                        </View>
                    </TouchableOpacity>
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