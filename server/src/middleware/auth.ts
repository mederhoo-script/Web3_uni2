import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../types/index.js';
import { createError } from './errorHandler.js';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: UserRole;
    cohortId?: string;
  };
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return next(createError('Access token required', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      cohortId: decoded.cohortId,
    };
    next();
  } catch (error) {
    return next(createError('Invalid or expired token', 403));
  }
};

export const authorizeRoles = (...roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(createError('Authentication required', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(createError('Insufficient permissions', 403));
    }

    next();
  };
};

export const authorizeOwnerOrRole = (...roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(createError('Authentication required', 401));
    }

    // Check if user is the owner of the resource
    const resourceUserId = req.params.userId || req.body.userId;
    const isOwner = resourceUserId === req.user.userId;

    // Check if user has required role
    const hasRole = roles.includes(req.user.role);

    if (!isOwner && !hasRole) {
      return next(createError('Insufficient permissions', 403));
    }

    next();
  };
};

export const authorizeCohortAccess = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return next(createError('Authentication required', 401));
  }

  // Admins and mentors can access any cohort
  if (req.user.role === UserRole.ADMIN || req.user.role === UserRole.MENTOR) {
    return next();
  }

  // Students can only access their own cohort
  const cohortId = req.params.cohortId || req.body.cohortId;
  if (req.user.role === UserRole.STUDENT && req.user.cohortId !== cohortId) {
    return next(createError('Access denied to this cohort', 403));
  }

  next();
};