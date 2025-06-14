import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurUser } from '../lib/appwrite';

interface GlobalContextType {
    isLogin: boolean;
    setIsLogin: (value: boolean) => void;
    userInfo: any;
    setUserInfo: (user: any) => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
}

// 全局上下文 用户信息 是否登录
const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getCurUser().then(res => {
            if (res) {
                setIsLogin(true);
                setUserInfo(res);
            } else {
                setIsLogin(false);
                setUserInfo(null);
            }
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                isLogin,
                setIsLogin,
                userInfo,
                setUserInfo,
                loading,
                setLoading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;
