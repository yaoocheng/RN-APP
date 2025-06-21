import React, { useState } from 'react';
// import { useFocusEffect } from '@react-navigation/native';
import { Text, FlatList, View, Image, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import Search from '../../components/search';
import Trending from '../../components/trending';
import EmptyState from '../../components/empty';
import useAppwrite from '../../lib/use-appwrite';
import { getAllVideos, getLatestVideos } from '../../lib/appwrite';
import VideoCard from '../../components/video-card';
import { useGlobalContext } from '../../context/global-provider';


const Home = () => {
    const { userInfo } = useGlobalContext();
    const [refreshing, setRefreshing] = useState(false);
    const { videos: videosAll, fetchData: fetchDataAll, isLoading: isLoadingAll, setVideos: setVideosAll } = useAppwrite(getAllVideos);
    const { videos: videosLatest, fetchData: fetchDataLatest, isLoading: isLoadingLatest } = useAppwrite(getLatestVideos);

    const onRefresh = async () => {
        setRefreshing(true);
        // request
        await Promise.all([fetchDataAll(), fetchDataLatest()])
        setRefreshing(false);
    };

    // useFocusEffect(
    //     useCallback(() => {
    //         Promise.all([fetchDataAll(), fetchDataLatest()])
    //     }, [])
    // );

    return (
        <>
            <SafeAreaView className='bg-primary h-full'>
                {isLoadingAll || isLoadingLatest ? (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" color="#FF9001" />
                        <Text className="text-white font-pmedium text-base mt-2">Loading...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={videosAll}
                        keyExtractor={(item: any) => item.$id}
                        // 竖视频列表
                        renderItem={({ item }) => {
                            return (
                                <VideoCard
                                    title={item.title}
                                    thumbnail={item.thumbnail}
                                    video={item.video}
                                    curVideoId={item.$id}
                                    creator={item.creator.username}
                                    avatar={item.creator.avatar}
                                    collector={item.collector || []}
                                    setVideos={setVideosAll}
                                    type='col'
                                />
                            )
                        }}
                        // 列表头部
                        ListHeaderComponent={() => (
                            <View className='my-6 px-4 space-y-6'>
                                <View className='justify-between items-start flex-row mb-6'>
                                    <View>
                                        <Text className='font-pmedium text-sm text-green-100'>Welcome Back,</Text>
                                        <Text className='font-psemibold text-2xl text-white'>{userInfo?.username}</Text>
                                    </View>

                                    <View>
                                        <Image source={images.logoSmall} className='w-9 h-10' resizeMode='contain' />
                                    </View>
                                </View>

                                <Search />

                                {/* 最新视频 */}
                                <View className="w-full flex-1 pt-5 pb-8">
                                    {videosLatest.length > 0 && (
                                        <Text className="text-lg font-pregular text-gray-100 mb-3">
                                            Latest Videos
                                        </Text>
                                    )}

                                    <Trending posts={videosLatest} />
                                </View>
                            </View>
                        )}

                        ListEmptyComponent={() => (
                            <EmptyState
                                title="No Videos Found"
                                subtitle="No videos created yet" />
                        )}

                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    />
                )}
            </SafeAreaView>
        </>
    );
};

export default Home;
