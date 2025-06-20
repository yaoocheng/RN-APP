import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../css/global.css';
import GlobalProvider from '../context/global-provider';
import Toast from 'react-native-toast-message';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    //   const colorScheme = useColorScheme();
    const [loaded, error] = useFonts({
        'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
        'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
        'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    });

    useEffect(() => {
        if (error) throw error;

        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded) {
        // Async font loading only occurs in development.
        return null;
    }

    return (
        <GlobalProvider>
            <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="search/[query]" />
            </Stack>
            <Toast />
        </GlobalProvider>
    );
}
