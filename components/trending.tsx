import { FlatList, View } from 'react-native'
import { useState } from 'react'
import * as Animatable from "react-native-animatable";
import VideoCard from './video-card';
// import { useGlobalContext } from '../context/global-provider';


// 滑动缩放尺寸
const zoomIn = {
    0: {
        scale: 0.85,
    },
    1: {
        scale: 1,
    },
};

const zoomOut = {
    0: {
        scale: 1,
    },
    1: {
        scale: 0.85,
    },
};

export default function Trending({ posts }: any) {
    const [activeItem, setActiveItem] = useState(posts[0]);
    // const { userInfo } = useGlobalContext();

    const viewableItemsChanged = ({ viewableItems }:any) => {
        if (viewableItems.length > 0) {
          setActiveItem(viewableItems[0].key);
        }
      };

    // 指示器组件
    const renderIndicators = () => {
        return (
            <View className="flex-row justify-center items-center gap-2">
                {posts.map((item: any, index: number) => (
                    <View
                        key={item.$id}
                        className={`rounded-full ${
                            activeItem === item.$id 
                                ? 'w-3 h-3 bg-orange-500' 
                                : 'w-2 h-2 bg-gray-400'
                        }`}
                    />
                ))}
            </View>
        );
    };

    return (
        <View>
            <FlatList data={posts}
                keyExtractor={(item) => item.$id}
                horizontal
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 70,
                }}
                renderItem={({ item }) => (
                    <Animatable.View
                        animation={activeItem === item.$id ? zoomIn : zoomOut}
                        duration={500}
                        className="-mr-5"
                    >
                        <VideoCard
                            title={item.title}
                            thumbnail={item.thumbnail}
                            video={item.video}
                            creator={item.creator.username}
                            avatar={item.creator.avatar}
                            type={'row'}
                        />
                    </Animatable.View>
                )}>
            </FlatList>
            {renderIndicators()}
        </View>
    )
}