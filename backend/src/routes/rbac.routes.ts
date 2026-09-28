import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { UserRole } from "../types/auth.types";

const router = Router();


// ==========================================
// ANY AUTHENTICATED USER
// ==========================================
router.get(
  "/profile",

  authenticate,

  (req, res) => {
    res.json({
      success: true,
      message: "Authenticated user",
      user: req.user,
    });
  }
);


// ==========================================
// PLATFORM ADMIN ONLY
// ==========================================
router.get(
  "/platform-admin",

  authenticate,

  authorize(UserRole.PLATFORM_ADMIN),

  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Platform Admin",
      user: req.user,
    });
  }
);


// ==========================================
// FABRICATOR OWNER / ADMIN
// ==========================================
router.get(
  "/fabricator-admin",

  authenticate,

  authorize(
    UserRole.OWNER,
    UserRole.ADMIN
  ),

  (req, res) => {
    res.json({
      success: true,
      message: "Fabricator admin access granted",
      user: req.user,
    });
  }
);


// ==========================================
// ESTIMATOR
// ==========================================
router.get(
  "/estimator",

  authenticate,

  authorize(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.ESTIMATOR
  ),

  (req, res) => {
    res.json({
      success: true,
      message: "Estimator access granted",
      user: req.user,
    });
  }
);


// ==========================================
// PROJECT MANAGER
// ==========================================
router.get(
  "/project-manager",

  authenticate,

  authorize(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.PROJECT_MANAGER
  ),

  (req, res) => {
    res.json({
      success: true,
      message: "Project Manager access granted",
      user: req.user,
    });
  }
);


// ==========================================
// BIDDER
// ==========================================
router.get(
  "/bidder",

  authenticate,

  authorize(UserRole.BIDDER),

  (req, res) => {
    res.json({
      success: true,
      message: "Bidder access granted",
      user: req.user,
    });
  }
);


export default router;