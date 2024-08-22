async function checkIfRegistered(collection, username) {
    const user = await collection.findOne({ username });
    return !!user;
}

async function registerUser(collection, UserData) {
    const foundUser = await checkIfRegistered(collection, UserData.username);
    if (!foundUser) {
        await collection.insertOne(UserData);
    }
}

module.exports = {
    registerUser
};