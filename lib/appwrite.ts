
import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const appwriteConfig = {
    endPoint: "https://cloud.appwrite.io/v1",
    platform: 'com.personal.app',
    projectyId: '684a414a0011f38adfc7',
    databaseId: '684a47900009c86dc49f',
    userCollectionId: '684a480b001c65d35ccc',
    videoCollectionId: '684a4863000cde386347',
    storageId: '684a5046002cc73aabf9',
};

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endPoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectyId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.


const account = new Account(client);
const avatar = new Avatars(client);
const database = new Databases(client);

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

// is user login
export const getCurUser = async () => {
    try {
        const curAccount =  await account.get();
        if(!curAccount) {
            throw new Error('未登录');
        }

        const curUser = await database.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [
            Query.equal('accountId', curAccount.$id)
        ]);
        
        if(!curUser) {
            throw new Error('用户不存在');
        }

        return curUser.documents[0];
    } catch (error) {
        console.log(error);
        
    }
}

