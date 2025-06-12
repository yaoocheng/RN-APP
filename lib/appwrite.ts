
import { Client, Account, ID } from 'react-native-appwrite';

export const appwriteConfig = {
    endPoint: "https://cloud.appwrite.io/v1",
    platform: 'com.personal.app',
    projectyId: '684a414a0011f38adfc7',
    database: '684a47900009c86dc49f',
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

export const createUser = () => {
    account.create(ID.unique(), 'me@examplexx.com', 'password', 'Jane Doe23')
    .then(function (response) {
        console.log(response, '11112312312312');
    }, function (error) {
        console.log(error);
    });
}

