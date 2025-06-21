import { useState, useEffect, useCallback } from 'react';

export default (fetchFn: any) => {
    const [isLoading, setIsLoading] = useState(true);
    const [videos, setVideos] = useState<any[]>([]);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const videos = await fetchFn();
            setVideos(videos);
            setIsLoading(false);
            
        } catch (error: any) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [fetchFn]);

    useEffect(() => {
        fetchData();
    }, [fetchData])

    return {
        isLoading,
        videos,
        fetchData,
        setVideos
    }
}
