import icons from '@/constants/icons';
import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';

const Search = ({
    value,
    handleChangeText,
}: any) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View
            className={`w-full h-16 space-x-4 px-4 bg-black-100 rounded-2xl border-2 ${isFocused ? 'border-secondary' : 'border-black-200'} flex flex-row items-center`}
        >
            <TextInput
                value={value}
                onChangeText={handleChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholderTextColor={'#7b7b8b'}
                placeholder="Search for a video topic"
                className="font-pregular text-base mt-0.5 text-white flex-1"
            />
            <TouchableOpacity>
                <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
            </TouchableOpacity>
        </View>
    );
};

export default Search;
