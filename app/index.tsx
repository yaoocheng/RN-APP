import CustomButton from '@/components/custom-button';
import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../constants/images';
import { useGlobalContext } from '../context/global-provider';

export default function Page() {
    const { isLogin, loading } = useGlobalContext();

    if (!loading && isLogin) {
        return <Redirect href="/home" />
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            {loading && (
                <View className="absolute top-0 left-0 right-0 bottom-0 z-50 bg-primary/80 p-4 flex-row justify-center items-center">
                    <ActivityIndicator size="large" color="#FF9C01" />
                    {/* <Text className="text-white ml-2 font-pregular">Loading...</Text> */}
                </View>
            )}
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="w-full justify-center items-center h-full p-4">
                    <View className='flex-row items-center'>
                        <Image
                            source={images.logoSmall}
                            className="w-[40px] h-[40px] mr-1"
                            resizeMode="contain"
                        />
                        <Text className='text-white font-psemibold text-5xl'>AIVu</Text>
                    </View>

                    <Image
                        source={images.cards}
                        className="max-w-[380px] w-full h-[300px]"
                        resizeMode="contain"
                    />

                    <View className="relative mt-5">
                        <Text className="text-3xl text-white font-bold text-center">
                            Discover Endless Possibilities width{' '}
                            <Text className="text-secondary-200">AIVu</Text>
                        </Text>
                        <Image
                            source={images.path}
                            className="w-[136px] h-[15px] absolute -bottom-2 -right-4"
                            resizeMode="contain"
                        ></Image>
                    </View>

                    <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
                        Where Creativity Meets Innovation: Embark on a Journey
                        of Limitless Exploration with AIVu
                    </Text>

                    <CustomButton
                        title="Continue with Email"
                        handlePress={() => {
                            router.push('/sign-in');
                        }}
                        isLoading={loading}
                        containerStyles="w-full mt-7"
                    />

                    <StatusBar backgroundColor="#161622" style="light" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
