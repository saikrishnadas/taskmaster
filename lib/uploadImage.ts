import {ID, storage} from "@/appwrite";

const uploadImage = async (file: File) => {
    if(!file) return;

    const fileUploaded = await storage.createFile(
        "6525283c6e208af69d41",
        ID.unique(),
        file
    );

    return fileUploaded;
}

export default uploadImage;