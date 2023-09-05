const blacklist= new Set()

const addToBlacklist=(token)=>{
    blacklist.add(token)
}

const isTokenBlacklisted=(token)=>{
    return blacklist.has(token)
}

module.exports={
    addToBlacklist,
    isTokenBlacklisted
}