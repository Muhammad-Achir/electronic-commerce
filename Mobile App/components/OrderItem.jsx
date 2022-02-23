import { Image, StyleSheet, Text, View } from "react-native"

export default function OrderItem({ item }) {
    return(
        <View style={{ flexDirection: 'row', margin: 10, backgroundColor: "#D6E5FA", flex: 1}}>

            <View style={styles.container}>
                <Text style={styles.title}>{item.productName}</Text>
                <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
                <Text style={styles.quantity}>Date: {item.orders.orderDate}</Text>
                <Text style={styles.quantity}>Status: {item.orders.status}</Text>
                <Text style={styles.price}>Price: Rp {item.price}</Text>
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