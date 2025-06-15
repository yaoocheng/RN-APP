import { FlatList } from 'react-native'
import { useState } from 'react'
import * as Animatable from "react-native-animatable";
import VideoCard from './video-card';
import { useGlobalContext } from '../context/global-provider';


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
    const { userInfo } = useGlobalContext();

    const viewableItemsChanged = ({ viewableItems }:any) => {
        if (viewableItems.length > 0) {
          setActiveItem(viewableItems[0].key);
        }
      };

    return (
        <FlatList data={posts}
            keyExtractor={(item) => item.$id}
            horizontal
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
                        creator={userInfo.username}
                        avatar={userInfo.avatar}
                        type={'row'}
                    />
                </Animatable.View>
            )}>

        </FlatList>
    )
}