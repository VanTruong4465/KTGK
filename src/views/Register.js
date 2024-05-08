import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [name, setName] = useState('');

    const handleRegister = async () => {
        if (password !== repassword) {
            Alert.alert('Mật khẩu và mật khẩu nhập lại không khớp');
            return;
        }

        try {
            await firestore()
                .collection('users')
                .add({
                    email: email,
                    password: password,
                    name: name
                });

            Alert.alert('Đăng ký thành công');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Lỗi đăng ký', error);
            Alert.alert('Đã có lỗi xảy ra khi đăng ký');
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/logo1.png')}
                style={{ width: 300, height: 300 }}
                resizeMode="contain"
            />
            <Text style={{
                fontSize: 40,
                fontWeight: "bold",
                alignSelf: "center",
                marginBottom: 30,
            }}>
                REGISTER
            </Text>

            <TextInput
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                style={styles.input}
                keyboardType='email-address'
            />
            <TextInput
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
                style={styles.input}
            />
            <TextInput
                placeholder="RePassword"
                onChangeText={setRepassword}
                value={repassword}
                secureTextEntry={true}
                style={styles.input}
            />
            <TextInput
                placeholder="Full name"
                onChangeText={setName}
                value={name}
                style={styles.input}
            />

            <TouchableOpacity
                onPress={handleRegister}
                style={[styles.button, styles.buttonText1]}
            >
                <Text style={{ fontSize: 20, color: 'white' }}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.buttonText]}
                onPress={() => navigation.goBack()}

            >
                <Text style={{ color: 'white' }}>Go Back</Text>
            </TouchableOpacity>


        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 35,
        color: 'pink',
        marginBottom: 20,
    },
    form: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,

    },
    input: {
        height: 40,
        width: 350,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    button: {
        backgroundColor: 'pink',
        // paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
        width: 350,
    },
    buttonText: {
        marginTop: 10,
        height: 40,
        textAlign: 'center',
        borderRadius: 10,
        backgroundColor: '#FF3333',
        width: 350,
        justifyContent: 'center',
        color: 'white'
    },
    buttonText1: {
        marginTop: 10,
        height: 40,
        textAlign: 'center',
        borderRadius: 10,
        backgroundColor: 'blue',
        width: 350,
        justifyContent: 'center',
        color: 'white'
    }
});