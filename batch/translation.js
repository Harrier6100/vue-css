const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const db = require('./config/db.mongodb');

const propertyNested = (obj, key, value) => {
    const keys = key.split('.');
    let currentObj = obj;

    keys.forEach((key, index) => {
        if (index === keys.length - 1) {
            currentObj[key] = value;
        } else {
            if (!currentObj[key]) currentObj[key] = {};
            currentObj = currentObj[key];
        }
    });
};

const main = async () => {
    try {
        await db();

        const collection = mongoose.connection.db.collection('translations');
        const translations = await collection.find({}).toArray();

        const ja = {};
        const en = {};
        const ko = {};
        for (const translation of translations) {
            propertyNested(ja, translation._id, translation.translations.ja);
            propertyNested(en, translation._id, translation.translations.en);
            propertyNested(ko, translation._id, translation.translations.ko);
        }

        fs.writeFileSync(path.join(__dirname, '../src/i18n/modules/ja.json'), JSON.stringify(ja, null, 2), 'utf8');
        fs.writeFileSync(path.join(__dirname, '../src/i18n/modules/en.json'), JSON.stringify(en, null, 2), 'utf8');
        fs.writeFileSync(path.join(__dirname, '../src/i18n/modules/ko.json'), JSON.stringify(ko, null, 2), 'utf8');

        await mongoose.connection.close();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
main();