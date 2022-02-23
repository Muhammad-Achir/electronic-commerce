import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../redux/actions";
import Product from "../components/Product";
import SearchBar from "../components/SearchBar";

export default function Home() {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    return (
        <SafeAreaView>
            <SearchBar></SearchBar>
            <FlatList
            style={styles.container}
                data={products}
                numColumns={2}
                renderItem={({ item }) => (
                    <Product product={item}></Product>
                )}
            >

            </FlatList>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 60
    }
})