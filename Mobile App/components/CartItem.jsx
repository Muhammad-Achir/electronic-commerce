import { View, Text, Image, StyleSheet } from "react-native";

export default function CartItem({ item, cart }) {
    return (
        <View style={{ flexDirection: 'row', margin: 10, backgroundColor: "#D6E5FA", flex: 1}}>
            <Image
                style={{ width: 100, height: 100, }}
                resizeMode='contain'
                alt='image'
                source={{ uri: item.product.art }} />

            <View style={styles.container}>
                <Text style={styles.title}>{item.product.name}</Text>
                <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
                <Text style={styles.quantity}>Status: {cart.status}</Text>
                <Text style={styles.price}>Price: Rp {item.product.price}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    title: {
        width: 250,
        fontWeight: "bold",
        fontSize: 16,
    },
    quantity: {
        fontSize: 12
    },
    price: {
        fontWeight: "bold",
        fontSize: 12
    }
})