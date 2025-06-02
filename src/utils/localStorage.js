export function getUserDetails(name)
{
    return JSON.parse(localStorage.getItem(name)) || [];
}

export function setUserDetails(name,existingUsers)
{
    return localStorage.setItem(name, JSON.stringify(existingUsers));
}

export function setIsAuthenticated(name,type){
    return localStorage.setItem(name, type);
}

export function removeUser(name){
    return localStorage.removeItem(name); 
}