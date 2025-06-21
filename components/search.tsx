import icons from '@/constants/icons';
import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { usePathname, router } from 'expo-router';

const Search = ({initialQuery}: any) => {
    const [isFocused, setIsFocused] = useState(false);
    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || '');

    return (
        <View
            className={`w-full h-16 space-x-4 px-4 bg-black-100 rounded-2xl border-2 ${isFocused ? 'border-secondary' : 'border-black-200'} flex flex-row items-center`}
        >
            <TextInput
                value={query}
                onChangeText={(e) => setQuery(e)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholderTextColor={'#cdcde0'}
                placeholder="Search for a video topic"
                className="font-pregular text-base mt-0.5 text-white flex-1"
            />
            <TouchableOpacity onPress={() => {
                setTimeout(() => {
                    if(!query) {
                        return;
                    }
                    if (pathname.includes('search')) {
                        router.setParams({ query });
                    } else {
                        router.push(`/search/${query}`);
                    }
                }, 100);
            }}>
                <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
            </TouchableOpacity>
        </View>
    );
};

export default Search;
