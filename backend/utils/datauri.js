import DataUriParser from "datauri/parser.js";
import path from "path";

const parser = new DataUriParser();

const getDataUri = (file) => {
    try {
        if (!file || !file.buffer || !file.originalname) {
            throw new Error('Invalid file object');
        }
        
        const extName = path.extname(file.originalname).toString();
        if (!extName) {
            throw new Error('File must have an extension');
        }
        
        return parser.format(extName, file.buffer).content;
    } catch (error) {
        console.error('Error in getDataUri:', error);
        throw new Error(`Failed to process file: ${error.message}`);
    }
};
export default getDataUri;