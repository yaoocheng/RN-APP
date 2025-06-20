import { useVideoPlayer, VideoView } from "expo-video";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { useGlobalContext } from "../context/global-provider";
import { icons } from "../constants";
import { collectVideo } from "../lib/appwrite";

const VideoCard = ({
    title,
    creator,
    avatar,
    thumbnail,
    video,
    type,
    collector,
    id,
}: {
    title: string;
    creator: string;
    avatar: string;
    thumbnail: string;
    video: string;
    type: 'row' | 'col',
    collector: string[],
    id:string
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const { userInfo } = useGlobalContext();
    const player = useVideoPlayer(video, (player) => {
        player.loop = false;
    });

    // 收藏
    const handleCollect = async () => {
        try {
            await collectVideo(id, userInfo.$id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View className="flex flex-col items-center px-4 mb-14">
            {/* Header */}
            {type !== 'row' && (
                <View className="flex flex-row justify-between items-center">
                    <View className="flex justify-center items-center flex-row flex-1">
                        <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
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

                    <View className="flex-row items-center gap-2">
                        {collector?.includes(userInfo?.$id) ? (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                }}
                            >
                                <Image source={icons.collected} className="w-7 h-7" resizeMode="contain" />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                    handleCollect()
                                }}
                            >
                                <Image source={icons.collect} className="w-7 h-7" resizeMode="contain" />
                            </TouchableOpacity>
                        )}
                    </View>
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
