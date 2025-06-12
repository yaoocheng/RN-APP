import icons from '@/constants/icons';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

const FormField = ({
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    ...rest
}: any) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium mb-1">
                {title}
            </Text>

            <View
                className={`w-full h-16 px-4 bg-black-100 rounded-2xl border-2 ${isFocused ? 'border-secondary' : 'border-black-200'} flex flex-row items-center`}
            >
                <TextInput
                    value={value}
                    onChangeText={handleChangeText}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholderTextColor={'#7b7b8b'}
                    placeholder={placeholder}
                    secureTextEntry={title === 'Password' && !showPassword}
                    className="flex-1 text-base text-gray-400 font-pmedium"
                />
                {title === 'Password' && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default FormField;
