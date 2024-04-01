import { JWTSECRET } from "../config";
import jwt from 'jsonwebtoken';

class JwtServices {
    static sign(payload, expiry='365d', secret=JWTSECRET){
        return jwt.sign(payload, secret, {expiresIn: expiry})
    }
}

export default JwtServices;