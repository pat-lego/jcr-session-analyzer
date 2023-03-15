import fs from 'fs'

let result = {}
const userIdRegex = /([A-Za-z0-9]+)({userID=)([A-Za-z0-9-]+)(.*)/
const countSessions = (sessionObject) => {
    if (sessionObject === undefined) {
        throw Error('Session Object is undefined')
    }

    let count = 0
    for (const [key, value] of Object.entries(sessionObject)) {
        count = count + 1
    }

    result.numSessions = count
    return result
}

const collectSessionNames = (sessionObject) => {
    if (sessionObject === undefined) {
        throw Error('Session Object is undefined')
    }

    let sessionNames = new Set()
    for (const [key, value] of Object.entries(sessionObject)) {
        if (value['AuthInfo']) {
            sessionNames.add((value['AuthInfo'].match(userIdRegex))[3])
        }   
    }
    result.sessionNames = [...sessionNames]
}

const collectSessionCount = (sessionObject) => {
    
    let userIdSessionCount = {}
    for (const [key, value] of Object.entries(sessionObject)) {
        const decodedKey = decodeURI(key)
        if (value['AuthInfo']) {
            const userId = value['AuthInfo'].match(userIdRegex)[3]
            if (userIdSessionCount[userId]) {
                userIdSessionCount[userId].sessions.push(decodedKey)
                userIdSessionCount[userId].count = userIdSessionCount[userId].count + 1
            } else {
                userIdSessionCount[userId] = {
                    sessions: [decodedKey],
                    count: 1
                }
            }
        }
    }
    result.userIdSessionCount = userIdSessionCount
}

const main = () => {
    const args = process.argv.slice(2)
    const sessions = JSON.parse(fs.readFileSync(args[0]))
    countSessions(sessions)
    collectSessionNames(sessions)
    collectSessionCount(sessions)
    console.log(JSON.stringify(result, null, 3))
}

(main())