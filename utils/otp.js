exports.generateOtp = () => (
    Math.floor(Math.random() * 9999) + 1000
)