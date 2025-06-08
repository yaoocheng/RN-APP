import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

const AuthLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false, animation: 'none'}}>
            <Stack.Screen
                name="sign-in"
            />

            <Stack.Screen
                name="sign-up"
            />

            <StatusBar backgroundColor="#161622" style='light' />
        </Stack>
    )
}

export default AuthLayout