import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetailProduct({ route }) {
    const navigation = useNavigation()
    const product = route.params

    const [ cartItem, setCartItem ] = useState({
        productId: product.id,
        quantity: 1,
    })

    function addToCart() {
        AsyncStorage.getItem('token')
        .then(dataToken => {
            fetch('http://192.168.43.28:8080/api/add-to-cart/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${dataToken}`
                },
                body: JSON.stringify(cartItem)
            })
            .then(response => {
                if (response.ok) {
                    return response.text()
                } else {
                    console.log('response nod')
                    throw new Error ("error fetch")
                }
            })
            .then(data => {
                navigation.navigate('Cart')
            })
            .catch(err => {
                console.log(err)
            })
        })       
        
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Image
                style={styles.image}
                source={{ uri: product.art }}
                resizeMode='contain'
            />
            <View style={styles.container}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={{ color: "#789395", marginBottom: 8 }}>Product by {product.person}</Text>
                <Text style={styles.text}>Category: {product.category}</Text>
                <Text style={styles.text}>{product.description}</Text>
                <Text style={styles.text}>Stock: {product.stock}</Text>

            </View>
            <View style={styles.itemButton}>
                <View style={{flexDirection: "row", width: "100%"}}>
                    <TextInput
                        style={{ backgroundColor: "#D1D1D1", paddingHorizontal: 8}}
                        keyboardType="numeric"
                        onChangeText={(input) => setCartItem((currState) => ({ ...currState, quantity: input }))}
                        placeholder="Quantity"
                    >
                    </TextInput>
                </View>
                <Text style={styles.price}>Rp {product.price}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={addToCart}
                >
                    <Text style={{ color: "white" }}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8
    },
    image: {
        flex: 1,
        width: "100%",
        height: 240,
        backgroundColor: "black"
    },
    name: {
        fontWeight: "bold",
        fontSize: 24,
    },
    text: {
        fontSize: 16,
        color: "#2C3333"
    },
    itemButton: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
        flex: 1,
        padding: 6
    },
    price: {
        marginTop:8,
        fontWeight: "bold",
        fontSize: 18,
    },
    button: {
        marginTop: 2,
        backgroundColor: "#2EB086",
        width: "100%",
        alignItems: "center",
        padding: 6
    }
})