import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';

const CustomButton = ({
    title,
    handlePress,
    containerStyles,
    isLoading,
    textStyle,
}: {
    title: string;
    handlePress: (event: any) => void;
    containerStyles: string;
    isLoading?: boolean;
    textStyle?: string;
}) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-secondary rounded-xl min-h-[62px] justify-center 
            items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading}
        >
            {isLoading ? (
                <ActivityIndicator size="large" className='opacity-50' color="#FF9C01" />
            ) : (
                <Text className={`text-primary text-lg font-bold ${textStyle}`}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

export default CustomButton;
