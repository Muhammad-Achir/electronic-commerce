import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CartItem from "../components/CartItem";

export default function Carts() {
    const navigation = useNavigation()
    const [cart, setCart] = useState([])

    useEffect(() => {
        AsyncStorage.getItem('token')
            .then(dataToken => {
                fetch('http://192.168.43.28:8080/api/cart', {
                    method: 'Get',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${dataToken}`
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json()
                        } else {
                            throw new Error('error fetch')
                        }
                    })
                    .then(data => {
                        console.log(data)
                        setCart(data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
    }, [])

    function order(){
        AsyncStorage.getItem('token')
            .then(dataToken => {
                fetch('http://192.168.43.28:8080/api/checkout', {
                    method: 'Post',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${dataToken}`
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            return response.text()
                        } else {
                            throw new Error('error fetch')
                        }
                    })
                    .then(data => {
                        console.log(data)
                        navigation.navigate('Order')
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
    }

    return (
        <View style={{flex:1}}>
            
            <FlatList
                data={cart.cartItems}
                renderItem={({ item }) => (
                    <CartItem cart={cart} item={item}></CartItem>
                )}
                keyExtractor={(item) => item.id}
            >

            </FlatList>
            <TouchableOpacity
                style={styles.button}
                onPress={order}
            >
                <Text style={{ color:"white", fontSize: 18 }}>Order</Text>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        margin: 4,
        backgroundColor: "#2EB086",
        width: 386,
        alignItems: "center",
        padding:6
    }
})