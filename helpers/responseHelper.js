export const ok = (res, code, data) => {
    return res.status(code | 200).json({
        success: true,
        data,
    })
}

export const bad_request = (res, message) => {
    return res.status(400).json({
        success: false,
        message,
    })
}

export const server_error = (res, error) => {
    console.log('error=>', error)
    return res.status(500).json({
        success: false,
        error,
    })
}
