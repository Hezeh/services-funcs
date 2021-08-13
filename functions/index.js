const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { PubSub } = require('@google-cloud/pubsub');
const { v4: uuidv4 } = require('uuid');

admin.initializeApp();

const db = admin.firestore();
const servicesRef = db.collection('all-services');
const projectId = 'beammart'

// Instantiates a client
const pubsub = new PubSub({ projectId });

// TODOs
// Send messages to pub/sub when all messages are invoked
async function publishMessage(data, topicName) {
    // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
    const dataBuffer = Buffer.from(data);

    try {
        const messageId = await pubsub.topic(topicName).publish(dataBuffer);
        console.log(`Message ${messageId} published.`);
    } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        process.exitCode = 1;
    }
}

// On Profile/{userId}/items/{itemId} document created
exports.createProfileService = functions.firestore
    .document(`profile/{userId}/services/{serviceId}`)
    .onCreate(async (snap, context) => {
        const newValue = snap.data();
        const _serviceName = newValue.serviceName;
        const _price = newValue.servicePrice;
        const _priceType = newValue.servicePriceType;
        const _serviceDescription = newValue.serviceDescription;
        const _dateAdded = newValue.dateAdded;
        const _dateModified = newValue.dateModified;
        const _imageUrls = newValue.images;
        const userId = context.params.userId;
        const serviceId = context.params.serviceId;
        const _inStock = newValue.inStock;
        const _category = newValue.category;
        const _subCategory = newValue.subCategory;
        const _isActive = newValue.isActive;
        const _lastRenewal = newValue.lastRenewal;

        const doc = await db.collection('profile').doc(`${userId}`).get();

        if (!doc.exists) {
            console.log('No such document!');
        } else {
            const _location = doc.data()['gpsLocation'];
            const _phoneNumber = doc.data()['phoneNumber'];
            const _businessName = doc.data()['businessName'];
            const _businessDescription = doc.data()['businessDescription'];
            const _locationDescription = doc.data()['locationDescription'];
            const _isMondayOpen = doc.data()['isMondayOpen'];
            const _isTuesdayOpen = doc.data()['isTuesdayOpen'];
            const _isWednesdayOpen = doc.data()['isWednesdayOpen'];
            const _isThursdayOpen = doc.data()['isThursdayOpen'];
            const _isFridayOpen = doc.data()['isFridayOpen'];
            const _isSaturdayOpen = doc.data()['isSaturdayOpen'];
            const _isSundayOpen = doc.data()['isSundayOpen'];
            const _mondayOpeningHours = doc.data()['mondayOpeningHours'];
            const _mondayClosingHours = doc.data()['mondayClosingHours'];
            const _tuesdayOpeningHours = doc.data()['tuesdayOpeningHours'];
            const _tuesdayClosingHours = doc.data()['tuesdayClosingHours'];
            const _wednesdayOpeningHours = doc.data()['wednesdayOpeningHours'];
            const _wednesdayClosingHours = doc.data()['wednesdayClosingHours'];
            const _thursdayOpeningHours = doc.data()['thursdayOpeningHours'];
            const _thursdayClosingHours = doc.data()['thursdayClosingHours'];
            const _fridayOpeningHours = doc.data()['fridayOpeningHours'];
            const _fridayClosingHours = doc.data()['fridayClosingHours'];
            const _saturdayOpeningHours = doc.data()['saturdayOpeningHours'];
            const _saturdayClosingHours = doc.data()['saturdayClosingHours'];
            const _sundayOpeningHours = doc.data()['sundayOpeningHours'];
            const _sundayClosingHours = doc.data()['sundayClosingHours'];
            const _businessProfilePhoto = doc.data()['businessProfilePhoto'];
            const _isServiceBusiness = doc.data()['isServiceBusiness'];
            const _businessServiceCategory = doc.data()['businessServiceCategory'];
            const _businessServiceId = doc.data()['businessServiceId'];

            const _data = {}

            if (_isServiceBusiness != null) {
                _data['isServiceBusiness'] = _isServiceBusiness;
            }
            if (_businessServiceCategory != null) {
                _data['businessServiceCategory'] = _businessServiceCategory;
            }
            if (_businessServiceId != null) {
                _data['businessServiceId'] = _businessServiceId;
            }

            if (_location != null) {
                _data['location'] = _location;
            }
            if (_phoneNumber != null) {
                _data['phoneNumber'] = _phoneNumber;
            }
            if (_businessName != null) {
                _data['businessName'] = _businessName;
            }
            if (_businessDescription != null) {
                _data['businessDescription'] = _businessDescription;
            }
            if (_locationDescription != null) {
                _data['locationDescription'] = _locationDescription;
            }
            if (_isMondayOpen != null) {
                _data['isMondayOpen'] = _isMondayOpen;
            }
            if (_isTuesdayOpen != null) {
                _data['isTuesdayOpen'] = _isTuesdayOpen;
            }
            if (_isWednesdayOpen != null) {
                _data['isWednesdayOpen'] = _isWednesdayOpen;
            }
            if (_isThursdayOpen != null) {
                _data['isThursdayOpen'] = _isThursdayOpen;
            }
            if (_isFridayOpen != null) {
                _data['isFridayOpen'] = _isFridayOpen;
            }
            if (_isSaturdayOpen != null) {
                _data['isSaturdayOpen'] = _isSaturdayOpen;
            }
            if (_isSundayOpen != null) {
                _data['isSundayOpen'] = _isSundayOpen;
            }
            if (_mondayOpeningHours != null) {
                _data['mondayOpeningHours'] = _mondayOpeningHours;
            }
            if (_mondayClosingHours != null) {
                _data['mondayClosingHours'] = _mondayClosingHours;
            }
            if (_tuesdayOpeningHours != null) {
                _data['tuesdayOpeningHours'] = _tuesdayOpeningHours;
            }
            if (_tuesdayClosingHours != null) {
                _data['tuesdayClosingHours'] = _tuesdayClosingHours;
            }
            if (_wednesdayOpeningHours != null) {
                _data['wednesdayOpeningHours'] = _wednesdayOpeningHours;
            }
            if (_wednesdayClosingHours != null) {
                _data['wednesdayClosingHours'] = _wednesdayClosingHours;
            }
            if (_thursdayOpeningHours != null) {
                _data['thursdayOpeningHours'] = _thursdayOpeningHours;
            }
            if (_thursdayClosingHours != null) {
                _data['thursdayClosingHours'] = _thursdayClosingHours;
            }
            if (_fridayOpeningHours != null) {
                _data['fridayOpeningHours'] = _fridayOpeningHours;
            }
            if (_fridayClosingHours != null) {
                _data['fridayClosingHours'] = _fridayClosingHours;
            }
            if (_saturdayOpeningHours != null) {
                _data['saturdayOpeningHours'] = _saturdayOpeningHours;
            }
            if (_saturdayClosingHours != null) {
                _data['saturdayClosingHours'] = _saturdayClosingHours;
            }
            if (_sundayOpeningHours != null) {
                _data['sundayOpeningHours'] = _sundayOpeningHours;
            }
            if (_sundayClosingHours != null) {
                _data['sundayClosingHours'] = _sundayClosingHours;
            }
            if (_businessProfilePhoto != null) {
                _data['businessProfilePhoto'] = _businessProfilePhoto;
            }
            if (_serviceName != null) {
                _data['serviceName'] = _serviceName;
            }
            if (_price != null) {
                _data['servicePrice'] = _price;
            }
            if (_priceType != null) {
                _data['servicePriceType'] = _priceType;
            }
            if (_serviceDescription != null) {
                _data['serviceDescription'] = _serviceDescription;
            }
            if (_dateAdded != null) {
                _data['dateAdded'] = _dateAdded;
            }
            if (_dateModified != null) {
                _data['dateModified'] = _dateModified;
            }
            if (_imageUrls != null) {
                _data['imageUrls'] = _imageUrls;
            }
            if (_inStock != null) {
                _data['inStock'] = _inStock;
            }
            if (_category != null) {
                _data['category'] = _category;
            }
            if (_subCategory != null) {
                _data['subCategory'] = _subCategory;
            }
            if (userId != null) {
                _data['userId'] = userId;
            }
            if (_lastRenewal != null) {
                _data['lastRenewal'] = _lastRenewal;
            }
            if (_isActive != null) {
                _data['isActive'] = _isActive;
            }

            // Create doc in firebase collection
            await servicesRef.doc(`${serviceId}`).set(_data);
        }
    });


// on Profile/{userId}/services/{serviceId} document deleted
exports.deleteProfileService = functions.firestore
    .document('profile/{userId}/services/{serviceId}')
    .onDelete(async (snap, context) => {
        // Delete document in /items collection
        const serviceId = context.params.serviceId;
        await servicesRef.doc(serviceId).delete();
    });


// On Profile/{userId}/services/{serviceId} document updated
exports.updateProfileServiceItem = functions.firestore
    .document('profile/{userId}/service/{serviceId}')
    .onUpdate(async (change, context) => {
        // Update the items collection
        serviceId = context.params.serviceId;
        const dataBefore = change.before.data();
        const dataAfter = change.after.data();
        console.log(dataAfter);
        await servicesRef.doc(serviceId).set({
            'serviceName': dataAfter.serviceName,
            'serviceDescription': dataAfter.serviceDescription,
            'servicePrice': dataAfter.servicePrice,
            'servicePriceType': dataAfter.servicePriceType,
            'dateModified': dataAfter.dateModified,
            'inStock': dataAfter.inStock,
            'isActive': dataAfter.isActive,
            'lastRenewal': dataAfter.lastRenewal,
            'imageUrls': dataAfter.images,
        }, { merge: true });
    });

// On Services Create -> Index to Elasticsearch
exports.allServicesCollectionCreate = functions.firestore
    .document('all-services/{serviceId}')
    .onCreate(async (snap, context) => {
        const serviceId = context.params.serviceId;
        const url = 'https://api.beammart.app/service-index';
        // const url = 'http://127.0.0.1:8000/index';
        const item = {
            serviceId: serviceId
        };
        // Create document in Elasticsearch
        const data = snap.data()

        const userId = data.userId;
        const images = data.imageUrls;
        const serviceName = data.serviceName;
        const serviceDescription = data.serviceDescription;
        const servicePrice = data.servicePrice;
        const servicePriceType = data.servicePriceType;
        const serviceBusinessCategory = data.businessServiceCategory;
        const serviceBusinessId = data.businessServiceId;
        const category = data.category;
        const subCategory = data.subCategory;
        const location = data.location;
        const locationDescription = data.locationDescription;
        const businessName = data.businessName;
        const businessDescription = data.businessDescription;
        const dateAdded = data.dateAdded;
        const dateModified = data.dateModified;
        const phoneNumber = data.phoneNumber;
        const inStock = data.inStock;
        const mondayOpeningHours = data.mondayOpeningHours;
        const mondayClosingHours = data.mondayClosingHours;
        const tuesdayOpeningHours = data.tuesdayOpeningHours;
        const tuesdayClosingHours = data.tuesdayClosingHours;
        const wednesdayOpeningHours = data.wednesdayOpeningHours;
        const wednesdayClosingHours = data.wednesdayClosingHours;
        const thursdayOpeningHours = data.thursdayOpeningHours;
        const thursdayClosingHours = data.thursdayClosingHours;
        const fridayOpeningHours = data.fridayOpeningHours;
        const fridayClosingHours = data.fridayClosingHours;
        const saturdayOpeningHours = data.saturdayOpeningHours;
        const saturdayClosingHours = data.saturdayClosingHours;
        const sundayOpeningHours = data.sundayOpeningHours;
        const sundayClosingHours = data.sundayClosingHours;
        const businessProfilePhoto = data.businessProfilePhoto;
        const isMondayOpen = data.isMondayOpen;
        const isTuesdayOpen = data.isTuesdayOpen;
        const isWednesdayOpen = data.isWednesdayOpen;
        const isThursdayOpen = data.isThursdayOpen;
        const isFridayOpen = data.isFridayOpen;
        const isSaturdayOpen = data.isSaturdayOpen;
        const isSundayOpen = data.isSundayOpen;

        if (serviceName != null) {
            item.serviceName = serviceName;
        }
        if (serviceDescription != null) {
            item.serviceDescription = serviceDescription;
        }
        if (servicePrice != null) {
            item.servicePrice = servicePrice;
        }
        if (servicePriceType != null) {
            item.servicePriceType = servicePriceType;
        }
        if (serviceBusinessCategory != null) {
            item.serviceBusinessCategory = serviceBusinessCategory;
        }
        if (serviceBusinessId != null) {
            item.serviceBusinessId = serviceBusinessId;
        }
        if (businessProfilePhoto != null) {
            item.businessProfilePhoto = businessProfilePhoto;
        }
        if (isMondayOpen != null) {
            item.isMondayOpen = isMondayOpen;
        }
        if (isTuesdayOpen != null) {
            item.isTuesdayOpen = isTuesdayOpen;
        }
        if (isWednesdayOpen != null) {
            item.isWednesdayOpen = isWednesdayOpen;
        }
        if (isThursdayOpen != null) {
            item.isThursdayOpen = isThursdayOpen;
        }
        if (isFridayOpen != null) {
            item.isFridayOpen = isFridayOpen;
        }
        if (isSaturdayOpen != null) {
            item.isSaturdayOpen = isSaturdayOpen;
        }
        if (isSundayOpen != null) {
            item.isSundayOpen = isSundayOpen;
        }
        if (userId != null) {
            item.userId = userId;
        }
        if (images != null) {
            item.images = images;
        }
        if (category != null) {
            item.category = category;
        }
        if (subCategory != null) {
            item.subCategory = subCategory;
        }
        if (location != null) {
            item.location = location;
        }
        if (locationDescription != null) {
            item.locationDescription = locationDescription;
        }
        if (businessName != null) {
            item.businessName = businessName;
        }
        if (businessDescription != null) {
            item.businessDescription = businessDescription;
        }
        if (dateAdded != null) {
            item.dateAdded = dateAdded;
        }
        if (dateModified != null) {
            item.dateModified = dateModified;
        }
        if (phoneNumber != null) {
            item.phoneNumber = phoneNumber;
        }
        if (inStock != null) {
            item.inStock = inStock;
        }
        if (mondayOpeningHours != null) {
            item.mondayOpeningHours = mondayOpeningHours;
        }
        if (mondayClosingHours != null) {
            item.mondayClosingHours = mondayClosingHours;
        }
        if (tuesdayOpeningHours != null) {
            item.tuesdayOpeningHours = tuesdayOpeningHours;
        }
        if (tuesdayClosingHours != null) {
            item.tuesdayClosingHours = tuesdayClosingHours;
        }
        if (wednesdayOpeningHours != null) {
            item.wednesdayOpeningHours = wednesdayOpeningHours;
        }
        if (wednesdayClosingHours != null) {
            item.wednesdayClosingHours = wednesdayClosingHours;
        }
        if (thursdayOpeningHours != null) {
            item.thursdayOpeningHours = thursdayOpeningHours;
        }
        if (thursdayClosingHours != null) {
            item.thursdayClosingHours = thursdayClosingHours;
        }
        if (fridayOpeningHours != null) {
            item.fridayOpeningHours = fridayOpeningHours;
        }
        if (fridayClosingHours != null) {
            item.fridayClosingHours = fridayClosingHours;
        }
        if (saturdayOpeningHours != null) {
            item.saturdayOpeningHours = saturdayOpeningHours;
        }
        if (saturdayClosingHours != null) {
            item.saturdayClosingHours = saturdayClosingHours;
        }
        if (sundayOpeningHours != null) {
            item.sundayOpeningHours = sundayOpeningHours;
        }
        if (sundayClosingHours != null) {
            item.sundayClosingHours = sundayClosingHours;
        }

        const jsonItem = JSON.stringify(item);
        publishMessage(jsonItem, 'service-create')
    });


// On Item Update -> Update Item in Elasticsearch
exports.allServicesCollectionUpdate = functions.firestore
    .document('all-services/{serviceId}')
    .onUpdate(async (change, context) => {
        const docId = context.params.serviceId;
        const dataBefore = change.before.data();
        const dataAfter = change.after.data();
        const url = 'https://api.beammart.app/update';
        // const url = 'http://127.0.0.1:8000/update';
        // Update document in Elasticsearch
        const item = {
            serviceId: docId,
            userId: dataBefore.userId,
            serviceName: dataAfter.serviceName,
            isServiceBusiness: dataAfter.isServiceBusiness,
            businessServiceCategory: dataAfter.businessServiceCategory,
            businessServiceId: dataAfter.businessServiceId,
            businessName: dataAfter.businessName,
            businessDescription: dataAfter.businessDescription,
            location: dataAfter.location,
            inStock: dataAfter.inStock,
            locationDescription: dataAfter.locationDescription,
            phoneNumber: dataAfter.phoneNumber,
            serviceDescription: dataAfter.serviceDescription,
            servicePrice: dataAfter.servicePrice,
            servicePriceType: dataAfter.servicePriceType,
            dateAdded: dataAfter.dateAdded,
            dateModified: dataAfter.dateModified,
            images: dataAfter.imageUrls,
            mondayOpeningHours: dataAfter.mondayOpeningHours,
            mondayClosingHours: dataAfter.mondayClosingHours,
            tuesdayOpeningHours: dataAfter.tuesdayOpeningHours,
            tuesdayClosingHours: dataAfter.tuesdayClosingHours,
            wednesdayOpeningHours: dataAfter.wednesdayOpeningHours,
            wednesdayClosingHours: dataAfter.wednesdayClosingHours,
            thursdayOpeningHours: dataAfter.thursdayOpeningHours,
            thursdayClosingHours: dataAfter.thursdayClosingHours,
            fridayOpeningHours: dataAfter.fridayOpeningHours,
            fridayClosingHours: dataAfter.fridayClosingHours,
            saturdayOpeningHours: dataAfter.saturdayOpeningHours,
            saturdayClosingHours: dataAfter.saturdayClosingHours,
            sundayOpeningHours: dataAfter.sundayOpeningHours,
            sundayClosingHours: dataAfter.sundayClosingHours,
            businessProfilePhoto: dataAfter.businessProfilePhoto,
            isMondayOpen: dataAfter.isMondayOpen,
            isTuesdayOpen: dataAfter.isTuesdayOpen,
            isWednesdayOpen: dataAfter.isWednesdayOpen,
            isThursdayOpen: dataAfter.isThursdayOpen,
            isFridayOpen: dataAfter.isFridayOpen,
            isSaturdayOpen: dataAfter.isSaturdayOpen,
            isSundayOpen: dataAfter.isSundayOpen,
            category: dataAfter.category,
            subCategory: dataAfter.subCategory,
        }

        const jsonItem = JSON.stringify(item);
        publishMessage(jsonItem, 'service-update')
    });


// On Services Delete -> Delete Item in Elasticsearch
exports.allServicesCollectionDelete = functions.firestore
    .document('all-services/{serviceId}')
    .onDelete(async (snap, context) => {
        const serviceId = context.params.serviceId;
        const url = 'https://api.beammart.app/delete';
        // const url = 'http://127.0.0.1:8000/delete';
        const item = {
            serviceId: serviceId,
            admin_email: "admin@localhost.com"
        }
        const jsonItem = JSON.stringify(item);
        publishMessage(jsonItem, 'service-delete')
    })