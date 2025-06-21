import React, { useCallback, useState } from 'react';
import { Text, FlatList, View, ActivityIndicator, RefreshControl, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '../../components/empty';
import useAppwrite from '../../lib/use-appwrite';
import InfoBox from '../../components/InfoBox';
import { getCurUserVideo, logout } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/global-provider';
import VideoCard from '../../components/video-card';
import icons from '../../constants/icons';
import { router } from 'expo-router';

const Profile = () => {
    const [refreshing, setRefreshing] = useState(false);
    const { userInfo, setUserInfo, setIsLogin } = useGlobalContext();
    const fetchFn = useCallback(() => {
        if (!userInfo?.$id) return Promise.resolve([]);
        return getCurUserVideo(userInfo.$id);
    }, [userInfo?.$id]);
    const { videos, isLoading, setVideos, fetchData } = useAppwrite(fetchFn);

    const logoutHandle = async () => {
        try {
            await logout();
            setUserInfo(null);
            setIsLogin(false);
            router.replace('/sign-in');
        } catch (error) {
            console.log(error);
        }
    }

    const onRefresh = async () => {
        setRefreshing(true);
        // request
        await fetchData()
        setRefreshing(false);
    };

    return (
        <>
            <SafeAreaView className='bg-primary h-full'>
                {isLoading ? (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" color="#FF9001" />
                        <Text className="text-white font-pmedium text-base mt-2">Loading...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={videos}
                        keyExtractor={(item: any) => item.$id}
                        // 竖视频列表
                        renderItem={({ item }) => {
                            return (
                                <VideoCard
                                    title={item.title}
                                    thumbnail={item.thumbnail}
                                    video={item.video}
                                    creator={item.creator.username}
                                    avatar={item.creator.avatar}
                                    type='col'
                                    curVideoId={item.$id}
                                    setVideos={setVideos}
                                />
                                // <Text className='text-white'>{item.title}</Text>
                            )
                        }}
                        // 列表头部
                        ListHeaderComponent={() => (
                            <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
                                <TouchableOpacity
                                    onPress={logoutHandle}
                                    className="flex w-full items-end mb-10"
                                >
                                    <Image
                                        source={icons.logout}
                                        resizeMode="contain"
                                        className="w-6 h-6"
                                    />
                                </TouchableOpacity>

                                <View className="w-16 h-16 border border-transparent rounded-lg flex justify-center items-center">
                                    <Image
                                        source={{ uri: userInfo?.avatar }}
                                        className="w-[90%] h-[90%] rounded-lg"
                                        resizeMode="cover"
                                    />
                                </View>

                                <InfoBox
                                    title={userInfo?.username}
                                    containerStyles="mt-4"
                                    titleStyles="text-lg"
                                />

                                <View className="mt-0 flex flex-row">
                                    <InfoBox
                                        title={videos.length || 0}
                                        subtitle="videos"
                                        titleStyles="text-xl"
                                        // containerStyles="mr-10"
                                    />
                                    {/* <InfoBox
                                        title="1.2k"
                                        subtitle="Followers"
                                        titleStyles="text-xl"
                                    /> */}
                                </View>
                            </View>
                        )}

                    ListEmptyComponent={() => (
                        <EmptyState
                            title="No Videos Found"
                            subtitle="You haven't uploaded any videos yet" />
                    )}

                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    />
                )}

            </SafeAreaView>
        </>
    );
};

export default Profile;
