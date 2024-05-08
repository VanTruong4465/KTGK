import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const checkCredentials = async () => {
        setLoading(true);
        try {
            const documentSnapshot = await firestore()
                .collection('testing')
                .doc('fUiRJ8X4z4BgIzhAk5wv')
                .get();

            if (documentSnapshot.exists) {
                const userData = documentSnapshot.data();
                if (userData.email === username && userData.pass === password) {
                    console.log('successful');
                    navigation.navigate('Home');
                } else {
                    Alert.alert('Error', 'Incorrect username or password');
                }
            } else {
                Alert.alert('Error', 'User not found');
            }
        } catch (error) {
            console.error('Error checking credentials:', error);
            Alert.alert('Error', 'An error occurred while checking credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Image
                    source={require('../assets/logo1.png')}
                    style={{ width: 300, height: 300, marginBottom: 7 }}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={setUsername}
                    value={username}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                />
                <Button
                    style={{ borderRadius: 10 }}
                    title={loading ? 'Loading...' : 'Login'}
                    onPress={checkCredentials}
                    disabled={loading}
                />
                <TouchableOpacity
                    style={[styles.button, styles.buttonText]}  // Sử dụng style object để định dạng TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={{ color: 'white' }}>Register</Text>
                </TouchableOpacity>

            </View>
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
        paddingVertical: 10,
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
    }
});