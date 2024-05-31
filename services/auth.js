import jwt from 'jsonwebtoken';
//const sessionIdToUserMap=new map();
const secret='anki@thia';

function setUser(user) {
    //in setuser(id,user)
    //sessionIdToUserMap.set(id, user);
    return jwt.sign({
        _id:user._id,email:user.email,
        role:user.role
    },secret)
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        // Handle JWT verification errors
        console.error('JWT verification failed:', error.message);
        return null;
    }
}
export { setUser, getUser }; 

