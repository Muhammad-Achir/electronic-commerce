import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Alert, ImageBackground } from 'react-native'
import React, { useState } from 'react'

export default function Register({ navigation }) {

    const [user, setUser] = useState({
        name: '',
        password: ''
    })

    // let token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkaW1hcyIsImV4cCI6MTY0NTE4ODkxMSwiaWF0IjoxNjQ1MTg1OTExfQ.zhQPXA3J1_tTfCz_GRDNWNe0DUSG9fiGi_XFWztGzWyuN1XnEolSR3LYdhem2LlOrWVg9pptlDlpIBXqkPslsA'

    function register() {
        fetch('http://192.168.43.28:8080/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                return response.text()
            })
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                    alert("Username or Password is wrong!")
                } else {
                    navigation.navigate('Login')
                }
            })
            .catch(err => {
                console.log("er " + err)
            })

        // axios.post('http://localhost:8080/api/login', {
        //     name: 'dimas',
        //     password: '123'
        // })
        //     .then(function (response) {
        //         console.log(response+'success');
        //     })
        //     .catch(function (error) {
        //         console.log(error+'err');
        //     });

        // _storeData = async () => {
        //     try {
        //         await AsyncStorage.setItem(
        //             'token',
        //             token
        //         );
        //     } catch (error) {
        //         // Error saving data
        //         console.log(error)
        //     }
        // };
        // console.log(token)
    }

    return (
        <ImageBackground
            style={styles.background}
            source={{ uri: "https://cdn.pixabay.com/photo/2015/05/31/13/28/girl-791749_960_720.jpg" }}
        >
            <View style={styles.main}>
                <View style={styles.inputView}>
                    <Text style={styles.textLogin}>Register</Text>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(text) => setUser((currState) => ({ ...currState, name: text }))}
                        value={user.name}
                        placeholder="Username"
                    ></TextInput>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(text) => setUser((currState) => ({ ...currState, password: text }))}
                        value={user.password}
                        placeholder="Password"
                        secureTextEntry={true}
                    ></TextInput>
                </View>

                <TouchableOpacity onPress={register} style={styles.button}>
                    <Text style={{color: "white"}}>Register</Text>
                </TouchableOpacity>
            </View>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    },
    main: {
        backgroundColor: "#ffffff90",
        width: 300,
        height: 350,
        padding: 20,
        borderRadius: 20,

        justifyContent: "center",
        alignItems: "center"
    },
    viewLogo: {
        flex: 1,
        flexDirection: "row",
    },
    textLogin: {
        flex: 5,
        fontSize: 54,
        fontWeight: "bold",
        marginLeft: 25,
        marginTop: 40,
        color: "#2C3333",
    },
    logo: {
        width: 80,
        height: 80,
    },
    inputView: {
        marginBottom: 40
    },
    inputStyle: {
        width: 250,
        borderRadius: 10,
        margin: 10,
        padding: 5,
        backgroundColor: 'rgba(255,255,255,0.4)'
    },
    button: {
        marginBottom: 40,
        width: 150,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        height: 40,
        backgroundColor: "#00BFFF"
    },
    register: {
        marginTop:8,
    }
})