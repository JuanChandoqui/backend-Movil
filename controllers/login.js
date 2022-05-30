const jwt  = require('jsonwebtoken');
const db = require('../routes/db_config');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password)
        return res.json({ status : 'error', error : 'Please enter your email and password'}) 
    else{
        db.query('SELECT * FROM users WHERE email = ?', [email], async(Err, result) => {
            if(Err) throw Err;
            if(!result.length || !await bcrypt.compare(password, result[0].password)) 
                return res.json({status : 'error', error : 'Incorrect email or password'})
            else{
                const token  = jwt.sign({id : result[0].id}, "secretKey", {
                    expiresIn: 3000000
                });
                const cookieOptions = {
                    expiresIn: new Date(Date.now() + 99999),
                    httpOnly: true
                };
                res.cookie('userRegistered', token, cookieOptions);
                return res.json({status: 'success', success: 'User has been logged in', token: token});
            }
        });
    }
}

module.exports = login;