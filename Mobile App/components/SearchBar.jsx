import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'; 
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/actions';

export default function SearchBar() {
    const dispatch = useDispatch()
    const [ productName, setProductName ] = useState('');

    useEffect(() => {
        dispatch(fetchProducts(productName))
    }, [productName])
    
    return (
        <View style={styles.container}>
            <TextInput
                style={{ flex: 1, paddingLeft: 20}}
                value={productName}
                placeholder='Search product ...'
                onChangeText={(input) => setProductName(input)}
            />
                <FontAwesome style={{ padding: 10 }} name="search" size={20} color="black" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 8,
        borderRadius: 50,
        alignSelf: 'center',
        backgroundColor: '#fff',
        width: '95%',
        flexDirection: 'row'
    }
})