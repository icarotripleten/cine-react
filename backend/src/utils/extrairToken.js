function extrairToken(authorization) {
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return null;
    }

    const token = authorization.replace("Bearer ", "");

    return token || null;
}

module.exports = { extrairToken }