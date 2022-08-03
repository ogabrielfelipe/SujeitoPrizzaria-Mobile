import { useContext, useEffect, useState } from "react";
import { Text, View, Button, SafeAreaView,  StyleSheet, TextInput, TouchableOpacity} from "react-native";

import { AuthContext } from "../../contexts/AuthContext";

import { useNavigation } from "@react-navigation/native";

import { StackPromsList } from "../../routes/app.routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { api } from "../../services/api";

import { Ionicons } from '@expo/vector-icons'; 

export default function Dashboard(){
    const navigation = useNavigation<NativeStackNavigationProp<StackPromsList>>();

    const { signOut } = useContext(AuthContext);
    const [table, setTable] = useState('');

    async function openOrder() {
        if(table === ''){
            return;
        }

        
        const response = await api.post('/order', {                
            table: Number(table)
        })

        navigation.navigate('Order', { table: table, order_id: response.data.id })
        setTable('')
        
    }

    function handleSignOut(){
        signOut();
    }

    return (
        
        <>            
            <View style={styles.containerExit}>
                <TouchableOpacity onPress={handleSignOut}> 
                    <Ionicons name="exit-outline" size={40} color="#FFF" />
                </TouchableOpacity>
            </View>


            <View style={styles.container}>
                <Text style={styles.title}>Novo Pedido</Text>
                <TextInput 
                    placeholder="Número da mesa"
                    placeholderTextColor='#F0F0F0'
                    keyboardType="numeric"
                    style={styles.input}
                    value={table}
                    onChangeText={setTable}
                />
                <TouchableOpacity style={styles.button} onPress={openOrder}>
                    <Text style={styles.buttonText} >Abrir Mesa</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    containerExit:{
        backgroundColor: '#1d1d2e',
        alignItems: "flex-end",
        justifyContent: "center",
        paddingRight: 12,
        paddingTop: 12

    },
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        backgroundColor: '#1d1d2e'
    },
    title:{
        fontSize: 30,
        fontWeight: "bold",
        color: '#FFF',
        marginBottom: 24
    },
    input:{
        width: '90%',
        height: 60,
        backgroundColor: '#101026',
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: "center",
        color: '#FFF', 
        fontSize: 22
    },
    button:{
        width: '90%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText:{
        fontSize: 18,
        color: '#101026',
        fontWeight: "bold"
    }
})