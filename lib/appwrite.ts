
import { Client, Account, ID, Avatars, Storage, Databases, Query } from 'react-native-appwrite';

export const appwriteConfig = {
    endPoint: "https://cloud.appwrite.io/v1",
    platform: 'com.personal.app',
    projectId: '684a414a0011f38adfc7',
    databaseId: '684a47900009c86dc49f',
    userCollectionId: '68539bc90017ed4c5060',
    videoCollectionId: '68539ac50034cd8e84e8',
    storageId: '684a5046002cc73aabf9',
};

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endPoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)


const account = new Account(client);
const avatar = new Avatars(client);
const database = new Databases(client);
const storage = new Storage(client);


// register
export const createUser = async (form: { email: string; password: string; username: string; }) => {
    try {
        const newAccount = await account.create(ID.unique(), form.email, form.password, form.username);
        if (!newAccount) {
            throw new Error('创建用户失败');
        }
        const avatarUrl = avatar.getInitials(form.username);

        await signIn(form);

        const newUser = database.createDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, ID.unique(), {
            email: form.email,
            username: form.username,
            avatar: avatarUrl,
            accountId: newAccount.$id,
        })

        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error('注册失败');
    }
}

// login
export const signIn = async (form: { email: string, password: string }) => {
    try {
        const res = await account.createEmailPasswordSession(form.email, form.password);

        if (!res) {
            throw new Error('登录失败');
        }
        return res;
    } catch (error) {
        console.log(error, '12312312312');
        throw new Error('登录失败');
    }
}

// 获取用户信息
export const getCurUser = async () => {
    try {
        const curAccount = await account.get();
        if (!curAccount) {
            throw new Error('未登录');
        }

        const curUser = await database.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [
            Query.equal('accountId', curAccount.$id)
        ]);

        if (!curUser) {
            throw new Error('用户不存在');
        }

        return curUser.documents[0];
    } catch (error: any) {
        console.log(error);
        throw new Error(error)
    }
}

// 获取视频
export const getAllVideos = async () => {
    try {
        const videos = await database.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, [Query.orderDesc("$createdAt")]);
        return videos.documents;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

// 最新视频
export async function getLatestVideos() {
    try {
        const posts = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.orderDesc("$createdAt"), Query.limit(6)]
        );

        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
}

// 搜索视频
export async function searchVideo(query: string) {
    try {
        const posts = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.search('title', query)]
        );

        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
}

// 获取当前用户的视频
export async function getCurUserVideo(userId: string) {
    try {
        const posts = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.equal('creator', userId)]
        );

        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
}

// 退出
export async function logout() {
    try {
        await account.deleteSession('current');
    } catch (error: any) {
        throw new Error(error);
    }
}

// 查看文件地址
export async function getFilePreview(fileId: any, type: string) {
    let fileUrl;

    try {
        if (type === "video") {
            fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
            
        } else if (type === "image") {
            fileUrl = storage.getFileView(
                appwriteConfig.storageId,
                fileId,
                // 2000,
                // 2000,
                // "top",
                // 100
            ).toString();
            // console.log('\n\n\n\nimage', fileUrl);
            
        } else {
            throw new Error("Invalid file type");
        }

        if (!fileUrl) throw Error("File not found");
        
        return fileUrl;
    } catch (error: any) {
        throw new Error(error);
    }
}

// 上传
export async function uploadFile(file: any, type: string) {
    if (!file) return;

    const asset = { type: file.mimeType, name: file.fileName, size: file.fileSize, uri: file.uri };

    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            asset,
        );

        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        return {
            url: fileUrl,
            id: uploadedFile.$id,
        };
    } catch (error: any) {
        throw new Error(error);
    }
}

// 创建视频
export async function createVideo(form: { title: string; video: any; thumbnail: any; prompt: string; userId: string; }) {
    try {
        const [thumbnailRes, videoRes] = await Promise.all([
            uploadFile(form.thumbnail, "image"),
            uploadFile(form.video, "video"),
        ]);

        const newPost = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailRes?.url,
                thumbnailId: thumbnailRes?.id,
                video: videoRes?.url,
                videoId: videoRes?.id,
                prompt: form.prompt,
                creator: form.userId,
            }
        );

        return newPost;
    } catch (error: any) {
        throw new Error(error);
    }
}


/**
 * 收藏视频
 */
export async function collectVideo(videoId: string, userId: string) {
    try {
      // 先获取视频文档
      const video = await database.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.videoCollectionId,
        videoId
      );
  
      const collectors = video.collectors || [];
  
      // 如果已收藏，就不重复添加
      if (collectors.includes(userId)) return collectors;
  
      // 添加用户 ID
      const updated = [...collectors, userId];
  
      // 更新文档
      const updatedVideo = await database.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.videoCollectionId,
        videoId,
        {
          collectors: updated,
        }
      );
      console.log('\n\n\n\n\n收藏成功', updatedVideo);
      
      return updatedVideo;
    } catch (error: any) {
      throw new Error(error.message || '收藏失败');
    }
  }
  



/**
 * 取消收藏
 */