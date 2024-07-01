function doWhenDataReceived(value) {
    returnNextElement.next(value)
}

function* createFlow() {
    const data = yield fetch('https://frontendmasters.com/courses/servers-node-js/')
    console.log(data)
}

const returnNextElement = createFlow()
const futureData = returnNextElement.next()

futureData.value.then(doWhenDataReceived)