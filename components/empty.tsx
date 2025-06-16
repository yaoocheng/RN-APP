import { router , usePathname } from "expo-router";
import { View, Text, Image } from "react-native";
import { images } from "../constants";
import CustomButton from "./custom-button";

const EmptyState = ({ title, subtitle }: { title: string; subtitle: string }) => {
    const pathname = usePathname();

  return (
    <View className="flex justify-center items-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[216px]"
      />

      <Text className="text-xl font-pmedium text-white">{title}</Text>
      <Text className="text-sm text-center font-psemibold text-gray-100 mt-2">
        {subtitle}
      </Text>

      <CustomButton
        title={pathname.includes('home') || pathname.includes('profile') ? "Create video" : "Back to Explore"}  
        handlePress={() => router.push("/home")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;