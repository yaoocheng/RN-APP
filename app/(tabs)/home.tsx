import React, { useState } from 'react';
import { Text, FlatList, View, Image, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import Search from '../../components/search';
import Trending from '../../components/trending';
import EmptyState from '../../components/empty';
import useAppwrite from '../../lib/use-appwrite';
import { getAllVideos, getLatestPosts } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/global-provider';
import VideoCard from '../../components/video-card';

const Home = () => {
    const [refreshing, setRefreshing] = useState(false);
    const { videos: videosAll, fetchData: fetchDataAll } = useAppwrite(getAllVideos);
    const { videos: videosLatest, fetchData: fetchDataLatest } = useAppwrite(getLatestPosts);

    const { userInfo } = useGlobalContext();

    const onRefresh = async () => {
        setRefreshing(true);
        // request
        await Promise.all([fetchDataAll(), fetchDataLatest()])
        setRefreshing(false);
    };

    return (
        <>
            <SafeAreaView className='bg-primary h-full'>
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
                            creator={userInfo.username}
                            avatar={userInfo.avatar}
                            type='col'
                          />
                            // <Text className='text-white'>{item.title}</Text>
                        )
                    }}
                    // 列表头部
                    ListHeaderComponent={() => (
                        <View className='my-6 px-4 space-y-6'>
                            <View className='justify-between items-start flex-row mb-6'>
                                <View>
                                    <Text className='font-pmedium text-sm text-green-100'>Welcome Back</Text>
                                    <Text className='font-psemibold text-2xl text-white'>Yao Cheng</Text>
                                </View>

                                <View>
                                    <Image source={images.logoSmall} className='w-9 h-10' resizeMode='contain' />
                                </View>
                            </View>

                            <Search />

                            {/* 热门视频 */}
                            <View className="w-full flex-1 pt-5 pb-8">
                                <Text className="text-lg font-pregular text-gray-100 mb-3">
                                    Latest Videos
                                </Text>

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
            </SafeAreaView>
        </>
    );
};

export default Home;
