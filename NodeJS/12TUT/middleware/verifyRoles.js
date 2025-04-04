const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.roles);
        // mapping over roles that are sent from the JWT and comparing them
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        // if no true output
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles