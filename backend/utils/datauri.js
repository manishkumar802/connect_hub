import DataUriParser from "datauri/parser.js";
import path from "path";

const parser = new DataUriParser();

const getDataUri = (file) => {
    try {
        const extName = path.extname(file.originalname).toString();
        return parser.format(extName, file.buffer).content;
    } catch (error) {
        console.error('Error in getDataUri:', error);
        throw new Error('Failed to process file');
    }
};
export default getDataUri;