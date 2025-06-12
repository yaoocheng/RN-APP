import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { icons } from '../../constants';

const TabIcon = ({ icon, color, name, focused }: any) => {
    return (
        <>
            <View className="items-center justify-center w-24 gap-2 mt-3">
                <Image
                    source={icon}
                    resizeMode="contain"
                    tintColor={color}
                    className="w-6 h-6"
                />
                <Text
                    className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
                    style={{ color: color }}
                >
                    {name}
                </Text>
            </View>
        </>
    );
};

const TabsLayout = () => {
    // const styles = StyleSheet.create({
    //     tabBarItem: {
    //         alignItems: 'center',
    //         flexDirection: 'row',
    //     }
    // })

    const tabsData = [
        { name: 'home', title: 'Home', icon: icons.home, displayName: 'Home' },
        {
            name: 'profile',
            title: 'Profile',
            icon: icons.profile,
            displayName: 'Profile',
        },
        {
            name: 'bookmark',
            title: 'Bookmark',
            icon: icons.bookmark,
            displayName: 'Bookmark',
        },
        {
            name: 'create',
            title: 'Create',
            icon: icons.plus,
            displayName: 'Create',
        },
    ];

    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        height: 74,
                        backgroundColor: '#161622',
                        borderTopWidth: 1,
                        borderTopColor: '#232533',
                    },
                    tabBarActiveTintColor: '#FFA001',
                    tabBarInactiveTintColor: '#CDCDE0',
                }}
            >
                {tabsData.map(tab => (
                    <Tabs.Screen
                        key={tab.name}
                        name={tab.name}
                        options={{
                            title: tab.title,
                            headerShown: false,
                            tabBarIcon: ({ color, focused }) => (
                                <TabIcon
                                    icon={tab.icon}
                                    color={color}
                                    name={tab.displayName}
                                    focused={focused}
                                />
                            ),
                            // tabBarItemStyle: styles.tabBarItem
                        }}
                    />
                ))}
            </Tabs>
        </>
    );
};

export default TabsLayout;
