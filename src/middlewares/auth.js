import { response } from "express"
import jwt from "jsonwebtoken"
import jwkToPem from "jwk-to-pem"

export function protect(req, res, next) {
    const token = req.get('authorization')?.split?.(' ')?.[1]
    const tokenFrom = req.get('TokenFrom')

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'token is not defined'
        })
    }

    try {

        if (tokenFrom == "server") {
            const decoded = jwt.verify(token, process.env.JWT_SECRET, function (err, payload) {
                console.log("err", err)
                console.log("payload", payload)
            })

            console.log("decoded", decoded)

            req.user = decoded;

            next()
        } else {

            fetch('https://www.googleapis.com/oauth2/v3/certs')
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    if (data && data.keys) {
                        const publicKeys = data.keys

                        const decodedHeader = jwt.decode(token, { complete: true })
                        const key = publicKeys.find(k => k.kid === decodedHeader.header.kid)


                        if (key) {

                            const publicKey = jwkToPem(key)

                            jwt.verify(token, publicKey, (err, decoded) => {
                                if (err) {
                                    console.error('Token verification failed:', err);
                                } else {
                                    // console.log('Decoded token:', decoded);
                                    req.user = decoded;

                                    next()

                                }
                            });
                        } else {
                            console.error('Public key not found for the provided kid');
                        }
                    } else {
                        console.error("response dont have keys")
                    }
                }).catch(error => {
                    console.error(error)
                })
        }

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'invalid token'
        })
    }
}