import CustomButton from '@/components/custom-button';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/form-field';
import images from '../../constants/images';
import { signIn } from '@/lib/appwrite'


const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [isSubmitting, setSubmitting] = useState(false);
    const submit = async () => {
        if (!form.email || !form.password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        setSubmitting(true);
        try {
            await signIn(form);
            router.replace('/home');
        } catch (error: any) {
            Alert.alert('Error', error.message);
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <SafeAreaView className="bg-primary flex-1">
            <ScrollView
                contentContainerStyle={{ height: '100%' }}
                keyboardShouldPersistTaps="handled"
            >
                <View className="w-full justify-center h-full p-4">
                    <Image
                        source={images.logo}
                        className="w-[115px] h-[35px]"
                        resizeMode="contain"
                    />

                    <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
                        Log in to Aora
                    </Text>

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
                        title="Sign In"
                        handlePress={submit}
                        containerStyles="mt-7 w-full"
                        isLoading={isSubmitting}
                    />

                    <View className="flex justify-center w-full pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Don&apos;t have an account?
                        </Text>

                        <Text
                            onPress={() => router.replace('/sign-up')}
                            className="text-lg font-psemibold text-secondary"
                        >
                            Signup
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;
