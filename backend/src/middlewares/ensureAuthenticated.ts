import {Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import authConfig from '../config/auth';

interface tokenPayLoad{
    iat:number;
    exp:number;
    sub:string;
}

export default function ensureAuthenticated(request:Request, response:Response, next:NextFunction):void{
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError('JWT is missing.', 401);
    }
    // Formato do token = Bearer fdfsçlfksslfk
    
    const [, token] = authHeader.split(' ');
    try {
        const decoded = verify(token, authConfig.jwt.secret);
        const { sub } = decoded as tokenPayLoad; //overhard da interface

        request.user = {
            id:sub,
        }
        
        return next();

    } catch (error) {
        throw new AppError('Invalid JWT token', 401);
    }
}