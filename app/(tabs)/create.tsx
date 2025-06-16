import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/form-field';
import { icons } from '../../constants';
import CustomButton from '../../components/custom-button';
import { useVideoPlayer, VideoView } from "expo-video";
import * as ImagePicker from "expo-image-picker";
import { useGlobalContext } from '../../context/global-provider';
import { router } from 'expo-router';
import { createVideo } from '../../lib/appwrite';

const Create = () => {
    const { userInfo } = useGlobalContext();
    const [uploading, setUploading] = useState(false);
    const [form, setForm] = useState<any>({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
    });

    const player = useVideoPlayer(form.video?.uri, (player) => {
        player.loop = false;
    });

    const openPicker = async (selectType: string) => {
        // 请求权限
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            alert('Permission to access media library is required!');
            return;
        }

        // 选择图片或视频
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: false, // 如果你想启用裁剪，可以改为 true
            quality: 1,
        });

        if (!result.canceled && result.assets?.length > 0) {
            const selectedAsset = result.assets[0];

            if (selectType === 'image') {
                setForm((prev: any) => ({
                    ...prev,
                    thumbnail: selectedAsset,
                }));
            }

            if (selectType === 'video') {
                setForm((prev: any) => ({
                    ...prev,
                    video: selectedAsset,
                }));
            }
        } else {
            console.log('Picker canceled or no asset selected:', result);
        }
    };


    const submit = async () => {
        if (
            (form.prompt === "") ||
            (form.title === "") ||
            !form.thumbnail ||
            !form.video
        ) {
            return
        }
        
        setUploading(true);
        try {
            await createVideo({
                ...form,
                userId: userInfo.$id,
            });

            router.replace("/home");
        } catch (error) {
            console.error(error);
        } finally {
            setForm({
                title: "",
                video: null,
                thumbnail: null,
                prompt: "",
            });

            setUploading(false);
        }
    };
    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView className="px-4 my-6">
                <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

                <FormField
                    title="Video Title"
                    value={form.title}
                    placeholder="Give your video a catchy title..."
                    handleChangeText={(e: any) => setForm({ ...form, title: e })}
                    otherStyles="mt-10"
                />

                <View className="mt-7 space-y-2">
                    <Text className="text-base text-gray-100 font-pmedium">
                        Upload Video
                    </Text>

                    {/* 视频上传 */}
                    <TouchableOpacity onPress={() => !form.video && openPicker("video")}>
                        {form.video ? (
                            <VideoView
                                player={player}
                                style={{ width: "100%", height: 240, borderRadius: 12, marginTop: 6 }}
                                allowsFullscreen
                                allowsPictureInPicture
                            />
                            // <Video
                            //     source={{ uri: form.video.uri }}
                            //     className="w-full h-64 rounded-2xl"
                            //     useNativeControls
                            //     resizeMode={ResizeMode.COVER}
                            //     isLooping
                            // />
                        ) : (
                            <View className="w-full h-40 px-4 mt-1.5 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
                                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                                    <Image
                                        source={icons.upload}
                                        resizeMode="contain"
                                        alt="upload"
                                        className="w-1/2 h-1/2"
                                    />
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                {/* 封面上传 */}
                <View className="mt-7 space-y-2">
                    <Text className="text-base text-gray-100 font-pmedium">
                        Thumbnail Image
                    </Text>

                    <TouchableOpacity onPress={() => !form.thumbnail && openPicker("image")}>
                        {form.thumbnail ? (
                            <Image
                                source={{ uri: form.thumbnail?.uri }}
                                resizeMode="cover"
                                className="w-full h-64 mt-1.5 rounded-2xl"
                            />
                        ) : (
                            <View className="w-full h-16 px-4 mt-1.5 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                                <Image
                                    source={icons.upload}
                                    resizeMode="contain"
                                    alt="upload"
                                    className="w-5 h-5 mr-1"
                                />
                                <Text className="text-sm text-gray-100 font-pmedium">
                                    Choose a file
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <FormField
                    title="AI Prompt"
                    value={form.prompt}
                    placeholder="The AI prompt of your video...."
                    handleChangeText={(e: any) => setForm({ ...form, prompt: e })}
                    otherStyles="mt-7"
                />

                <CustomButton
                    title="Submit & Publish"
                    handlePress={submit}
                    containerStyles="mt-7"
                    isLoading={uploading}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Create;
