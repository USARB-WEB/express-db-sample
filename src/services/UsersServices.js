const db = require('../db/db');
const helper = require('../db/helper');
const config = require('../db/config');

async function get(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM users LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function create(user) {
    const result = await db.query(
        `INSERT INTO users 
            (username, password) 
        VALUES 
            ('${user.username}', '${user.password}')`
    )
    if(!result.affectedRows){
        return {"error": "Not created"}
    }
    return user;
}

async function update(user, id) {
    const result = await db.query(
        `UPDATE users SET
            username = '${user.username}', 
            password = '${user.password}'
        WHERE
            id = ${id}
        `
    )
    if(!result.affectedRows){
        return {"error": "Not updated"}
    }
    return user;
}

async function remove(id) {
    const result = await db.query(`
        DELETE FROM users 
        WHERE
            id = ${id}
        `
    )
    if(!result.affectedRows){
        return {"error": "Not updated"}
    }
    return {};
}

module.exports = {
    get,
    create,
    update,
    remove
}