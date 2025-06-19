import React, { useEffect, useCallback } from 'react';
import { Text, FlatList, View, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Search from '../../components/search';
import EmptyState from '../../components/empty';
import useAppwrite from '../../lib/use-appwrite';
import { searchVideo } from '../../lib/appwrite';
import VideoCard from '../../components/video-card';
import { useLocalSearchParams } from 'expo-router';
import { useToast } from '../../hooks/useToast';

const SearchPage = () => {
    const { query } = useLocalSearchParams();
    const fetchFn = useCallback(() => searchVideo(query as string), [query]);
    const { videos, fetchData, isLoading } = useAppwrite(fetchFn);
    const { showError } = useToast();

    useEffect(() => {
        if (!query) {
            showError('Please enter a search query');
            return;
        }
        fetchData();
    }, [query, fetchData, showError])

    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <SafeAreaView className='bg-primary h-full'>
                    <View className='my-6 mb-12 px-4'>
                        <Text className='font-pmedium text-sm text-green-100'>Search Result</Text>
                        <Text className='font-psemibold text-2xl text-white'>{query}</Text>

                        <View className='mt-6'>
                            <Search initialQuery={query} />
                        </View>
                    </View>

                    {isLoading ? (
                        <View className="flex-1 justify-center items-center">
                            <ActivityIndicator size="large" color="#FF9001" />
                            <Text className="text-white font-pmedium text-base mt-2">Searching...</Text>
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
                                    />
                                    // <Text className='text-white'>{item.title}</Text>
                                )
                            }}
                            // 列表头部
                            // ListHeaderComponent={() => (

                            // )}

                            ListEmptyComponent={() => (
                                <EmptyState
                                    title="No Videos Found"
                                    subtitle="No videos found for this search query" />
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
