import CustomButton from '@/components/custom-button';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/form-field';
import images from '../../constants/images';

const SignUp = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
        username: '',
    })
    const [isSubmitting, setSubmitting] = useState(false);

    const submit = () => {
        // setSubmitting(true);
        alert('submit')
    };


    return (
        <SafeAreaView className='bg-primary flex-1'>
            <ScrollView contentContainerStyle={{ height: '100%' }} keyboardShouldPersistTaps="handled">
                <View className='w-full justify-center h-full p-4'>
                    <Image source={images.logo} className='w-[115px] h-[35px]' resizeMode='contain' />

                    <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
                        Sign up to Aora
                    </Text>

                    <FormField
                        title="Username"
                        value={form.username}
                        handleChangeText={(e: string) => setForm({ ...form, username: e })}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />

                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e: string) => setForm({ ...form, email: e })}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />

                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e: string) => setForm({ ...form, password: e })}
                        otherStyles="mt-7"
                    />

                    <CustomButton
                        title="Sign Up"
                        handlePress={submit}
                        containerStyles="mt-7 w-full"
                        isLoading={isSubmitting}
                    />

                    <View className="flex justify-center w-full pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Have an account already?
                        </Text>
                        <Text onPress={() => router.replace('/sign-in')}
                            className="text-lg font-psemibold text-secondary">
                            Signin
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp