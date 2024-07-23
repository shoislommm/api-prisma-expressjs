export async function getUser(req, res) {
    const user = req.user
    try {

        console.log(user)
return res.status(201).json({
   user: user
})

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }
   
}