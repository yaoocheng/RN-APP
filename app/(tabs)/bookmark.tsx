import React, { useEffect, useCallback } from 'react';
import { Text, FlatList, View, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Search from '../../components/search';
import EmptyState from '../../components/empty';
import useAppwrite from '../../lib/use-appwrite';
import { searchVideo } from '../../lib/appwrite';
import VideoCard from '../../components/video-card';
import { useLocalSearchParams } from 'expo-router';

const SearchPage = () => {
    const { query } = useLocalSearchParams();
    const fetchFn = useCallback(() => searchVideo(query as string), [query]);
    const { videos, fetchData, isLoading } = useAppwrite(fetchFn);

    useEffect(() => {
        fetchData();
    }, [query])

    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <SafeAreaView className='bg-primary h-full'>
                <View className="my-6 px-4  ">
                        <Text className="text-2xl font-psemibold text-white">
                            Saved Videos
                        </Text>

                        <View className="mt-6 mb-8">
                            <Search placeholder="Search bookmarked videos" />
                        </View>

                    </View>

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
                                        creator={item.users.username}
                                        avatar={item.users.avatar}
                                        type='col'
                                    />
                                )
                            }}

                            ListEmptyComponent={() => (
                                <EmptyState
                                    title="No Videos Found"
                                    subtitle="You haven’t bookmarked any videos yet" />
                            )}

                        // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        />
                    )}

                </SafeAreaView>
            </TouchableWithoutFeedback>

        </>
    );
};

export default SearchPage;
