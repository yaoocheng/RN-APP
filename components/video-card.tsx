import { useVideoPlayer, VideoView } from "expo-video";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { useState } from "react";
import { useGlobalContext } from "../context/global-provider";
import { icons } from "../constants";
import { collectVideo, uncollectVideo, deleteVideoWithFiles } from "../lib/appwrite";
import { usePathname } from "expo-router";

const VideoCard = ({
    title,
    creator,
    avatar,
    thumbnail,
    video,
    type,
    collector,
    curVideoId,
    setVideos,
}: {
    title: string;
    creator: string;
    avatar: string;
    thumbnail: string;
    video: string;
    type: 'row' | 'col';
    collector?: any;
    curVideoId?: any;
    setVideos?: any;
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const { userInfo } = useGlobalContext();
    const pathname = usePathname();
    const player = useVideoPlayer(video, (player) => {
        player.loop = false;
    });

    // 收藏
    const handleCollect = async () => {
        try {
            await collectVideo(curVideoId, userInfo.$id);
            // 更新当前视频收藏状态
            setVideos((prev: any) =>
                prev.map((video: any) =>
                    video.$id === curVideoId
                        ? {
                            ...video,
                            collector: [...video.collector, { $id: userInfo?.$id }],
                        }
                        : video
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    // 取消收藏
    const handleUncollect = async () => {
        try {
            await uncollectVideo(curVideoId, userInfo.$id);
            // 更新当前视频收藏状态
            setVideos((prev: any) =>
                prev.map((video: any) =>
                    video.$id === curVideoId
                        ? {
                            ...video,
                            collector: video.collector.filter((item: any) => item.$id !== userInfo?.$id),
                        }
                        : video
                )
            );
        } catch (error) {
            console.error(error);
        }
    }

    // 删除视频
    const handleDelete = async () => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this video?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteVideoWithFiles(curVideoId);
                            // 更新当前视频收藏状态
                            setVideos((prev: any) =>
                                prev.filter((video: any) => video.$id !== curVideoId)
                            );
                        } catch (error) {
                            console.error(error);
                        }
                    }
                }
            ]
        );
    }

    return (
        <View className="flex flex-col items-center px-4 mb-14">
            {/* Header */}
            {type !== 'row' && (
                <View className="flex flex-row justify-between items-center">
                    <View className="flex justify-center items-center flex-row flex-1">
                        <View className="w-[46px] h-[46px] rounded-lg border border-transparent flex justify-center items-center p-0.5">
                            <Image
                                source={{ uri: avatar }}
                                className="w-full h-full rounded-lg"
                                resizeMode="cover"
                            />
                        </View>
                        <View className="flex justify-center flex-1 ml-3 gap-y-1">
                            <Text className="font-psemibold text-sm text-white" numberOfLines={1}>
                                {title}
                            </Text>
                            <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
                                {creator}
                            </Text>
                        </View>
                    </View>

                    {
                        <View className="flex-row items-center gap-2">
                            {pathname.includes('profile') ? (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        handleDelete()
                                    }}
                                >
                                    <Image source={icons.deleteIcon} className="w-6 h-6" resizeMode="contain" />
                                </TouchableOpacity>
                            ) : (
                                collector?.some((item: any) => item.$id === userInfo.$id) ? (
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() =>
                                            handleUncollect()
                                        }
                                    >
                                        <Image source={icons.collected} className="w-7 h-7" resizeMode="contain" />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() =>
                                            handleCollect()
                                        }
                                    >
                                        <Image source={icons.collect} className="w-7 h-7" resizeMode="contain" />
                                    </TouchableOpacity>
                                )
                            )}
                        </View>
                    }
                </View>
            )}

            <View style={{ width: type === 'row' ? 180 : '100%' }}>
                {isVisible ? (
                    <VideoView
                        player={player}
                        style={{ width: "100%", height: type === 'row' ? 260 : 240, borderRadius: 12, marginTop: 12 }}
                        allowsFullscreen
                        allowsPictureInPicture
                    />
                ) : (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                            setIsVisible(true);
                            player.play();
                        }}
                        style={{ height: type === 'row' ? 260 : 240 }}
                        className="w-full rounded-xl mt-3 relative flex justify-center items-center"
                    >
                        <Image
                            source={{ uri: thumbnail }}
                            className="w-full h-full rounded-xl"
                            resizeMode="cover"
                        />
                        <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
                    </TouchableOpacity>
                )}
            </View>

        </View>
    );
};

export default VideoCard;
