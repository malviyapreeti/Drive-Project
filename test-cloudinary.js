require('dotenv').config();

const cloudinary = require('./config/cloudinary');

async function testCloudinary() {
    try {
        const result = await cloudinary.api.ping();
        console.log('Cloudinary Connected Successfully!');
        console.log(result);
    } catch (error) {
        console.log('Cloudinary Connection Failed!');
        console.dir(error, { depth: null });
    }
}

testCloudinary();