
export default async function uploadImage(req, res) {
    const image = req.file?.path
    try {
        return res.status(200).json({
            image: image
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}