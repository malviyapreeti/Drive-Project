
const express = require('express');
const router = express.Router();

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');

const cloudinary = require('../config/cloudinary');
const File = require('../models/file.model');
const authMiddleware = require('../middleware/auth.middleware');


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'drive-project',
        resource_type: 'auto'
    }
});

const upload = multer({ storage: storage });




router.post('/upload-file', authMiddleware, (req, res) => {

    upload.single('file')(req, res, async (error) => {

        if (error) {
            console.log('UPLOAD ERROR:', error.message);
            return res.status(500).send('File upload failed');
        }

        try {
            if (!req.file) {
                return res.status(400).send('Please select a file');
            }

            const savedFile = await File.create({
                filename: req.file.originalname,
                fileUrl: req.file.path,
                publicId: req.file.filename,
                user: req.user.userId
            });

            console.log('FILE SAVED SUCCESSFULLY:', savedFile.filename);

            return res.redirect('/home');

        } catch (error) {
            console.log('DATABASE SAVE ERROR:', error);

            return res.status(500).send(
                'File uploaded, but database save failed'
            );
        }
    });
});




router.get('/my-files', authMiddleware, async (req, res) => {

    try {
        const files = await File.find({
            user: req.user.userId
        }).sort({ createdAt: -1 });

        return res.render('my-files', { files });

    } catch (error) {
        console.log('FETCH FILES ERROR:', error);

        return res.status(500).send('Unable to fetch files');
    }
});




router.post('/rename-file/:id', authMiddleware, async (req, res) => {

    try {
        const newName = req.body.filename?.trim();

        if (!newName) {
            return res.status(400).send('Please enter a file name');
        }

        if (newName.length > 150 || /[<>:"/\\|?*]/.test(newName)) {
            return res.status(400).send('Invalid file name');
        }

        const file = await File.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!file) {
            return res.status(404).send('File not found');
        }

       
        const match = file.fileUrl.match(
            /\/(image|raw|video)\/upload\//
        );

        const resourceType = match ? match[1] : 'image';

        
        const extension = path.extname(file.filename);
        const newBaseName = path.basename(
            newName,
            path.extname(newName)
        );

        const safeBaseName = newBaseName
            .replace(/\s+/g, '_')
            .replace(/[^a-zA-Z0-9_-]/g, '');

        if (!safeBaseName) {
            return res.status(400).send('Invalid file name');
        }

        
        const folder = path.posix.dirname(file.publicId);

        let newPublicId = folder === '.'
            ? safeBaseName
            : `${folder}/${safeBaseName}`;

       
        if (resourceType === 'raw') {
            const rawExtension = extension || path.extname(file.publicId);
            newPublicId += rawExtension;
        }

        if (newPublicId === file.publicId) {
            file.filename = newName;
            await file.save();

            return res.redirect('/home');
        }

        console.log('OLD PUBLIC ID:', file.publicId);
        console.log('NEW PUBLIC ID:', newPublicId);
        console.log('RESOURCE TYPE:', resourceType);

       
        const result = await cloudinary.uploader.rename(
            file.publicId,
            newPublicId,
            {
                resource_type: resourceType,
                overwrite: false,
                invalidate: true
            }
        );

        console.log('CLOUDINARY RENAME RESULT:', result);

        if (!result.public_id || !result.secure_url) {
            return res.status(500).send(
                'Cloudinary rename was not confirmed'
            );
        }

       
        file.filename = newName;
        file.publicId = result.public_id;
        file.fileUrl = result.secure_url;

        await file.save();

        console.log('FILE RENAMED SUCCESSFULLY:', newName);

        return res.redirect('/home');

    } catch (error) {
        console.log('RENAME ERROR:', error);

        return res.status(500).send(
            'Unable to rename file. Check the server terminal.'
        );
    }
});




router.post('/delete-file/:id', authMiddleware, async (req, res) => {

    try {
        const file = await File.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!file) {
            return res.status(404).send('File not found');
        }

        const match = file.fileUrl.match(
            /\/(image|raw|video)\/upload\//
        );

        const resourceType = match ? match[1] : 'image';

        console.log('CLOUDINARY PUBLIC ID:', file.publicId);
        console.log('RESOURCE TYPE:', resourceType);

        const result = await cloudinary.uploader.destroy(
            file.publicId,
            {
                resource_type: resourceType,
                invalidate: true
            }
        );

        console.log('CLOUDINARY DELETE RESULT:', result);

        if (result.result !== 'ok') {
            return res.status(500).send(
                'Cloudinary deletion failed: ' + result.result
            );
        }

        await File.deleteOne({
            _id: file._id,
            user: req.user.userId
        });

        console.log('FILE DELETED:', file.filename);

        return res.redirect('/home');

    } catch (error) {
        console.log('DELETE ERROR:', error);

        return res.status(500).send(
            'Unable to delete file'
        );
    }
});


module.exports = router;
