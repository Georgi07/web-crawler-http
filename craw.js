function normalizeURL(url) {
    const urlObj = new URL(url)
    console.log(urlObj)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    // .slice(-1) in js this returns the last character of string
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
         return hostPath.slice(0, -1)
    }
    return hostPath
}

// This will make 'normalizeURL' function available to other js files
module.exports = {
    normalizeURL
}