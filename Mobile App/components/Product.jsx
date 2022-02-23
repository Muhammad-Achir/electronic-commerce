import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function Product({ product }) {
    const navigation = useNavigation()
    function detailProduct () {
        navigation.navigate('DetailProduct', {
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            description: product.description,
            art: product.art,
            person: product.person.name,
            category: product.id_category_product.category
        })
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.art}
                // resizeMode="contain"   
                source={{ uri: product.art }}
            >
            </Image>
            <View style={styles.itemContainer}>
                <Text style={styles.name}>{product.name}</Text>
                <Text>Stock: {product.stock}</Text>
            </View>
            <View style={styles.containerButton}>
                <Text style={styles.price}>Rp {product.price}</Text>
                <TouchableOpacity
                    style={styles.buttonDetail}
                    onPress={detailProduct}
                >
                    <Text style={{color: "white"}}>Detail Product</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 4,
        width: 188,
        backgroundColor: "#E8E1D9",
        borderColor: "#BCCC9A",
        borderWidth: 1
    },
    art: {
        width: "100%",
        height: 200,
    },
    itemContainer: {
        height: 70,
        padding: 4
    },
    name: {
        padding: 2,
        fontWeight: "bold",
        fontSize: 16
    },
    containerButton: {
        padding: 4,
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    price: {
        fontWeight: "bold"
    },
    buttonDetail: {
        marginTop: 2,
        backgroundColor: "#2EB086",
        width: "100%",
        alignItems: "center",
        padding:6
    }
})