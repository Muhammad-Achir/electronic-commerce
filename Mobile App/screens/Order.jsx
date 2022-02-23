import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderItem from "../components/OrderItem";

export default function Order () {
    const [ orderItem, setOrderItem ] = useState([])
    useEffect(() => {
        AsyncStorage.getItem('token')
            .then(dataToken => {
                fetch('http://192.168.43.28:8080/api/order', {
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
                        setOrderItem(data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
    }, [])
    return (
        <FlatList
            data={orderItem}
            renderItem={({ item }) => (
                <OrderItem item={item}></OrderItem>
            )}
            keyExtractor={(item) => item.id}
        >

        </FlatList>
    )
}