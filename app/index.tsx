import CustomButton from '@/components/custom-button';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../constants/images';


export default function Page() {
    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView contentContainerStyle={{ height: '100%'}}>
                <View className='w-full justify-center items-center h-full p-4'>
                    <Image source={images.logo} className='w-[130px] h-[84px]' resizeMode='contain' />
                    
                    <Image source={images.cards} className='max-w-[380px] w-full h-[300px]' resizeMode='contain' />

                    <View className='relative mt-5'>
                        <Text className="text-3xl text-white font-bold text-center">
                            Discover Endless Possibilities width{' '}
                            <Text className='text-secondary-200'>
                                Aora
                            </Text>
                        </Text>
                        <Image source={images.path} className='w-[136px] h-[15px] absolute -bottom-2 -right-4' resizeMode='contain'></Image>
                    </View>

                    <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
                        Where Creativity Meets Innovation: Embark on a Journey of Limitless
                        Exploration with Aora
                    </Text>

                    <CustomButton
                        title="Continue with Email"
                        handlePress={() => {router.push('/sign-in')}}
                        containerStyles="w-full mt-7"
                    />

                    <StatusBar backgroundColor="#161622" style='light' />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}