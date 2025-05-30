import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
import { authinticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { Router } from "express";

const router = Router();

router
  .route("/")
  .get(authinticate, authorizeAdmin, getAllUsers)
  .post(createUser);

router.route("/auth").post(loginUser);

router.route("/logout").post(logoutCurrentUser)

router
  .route("/profile")
  .get(authinticate, getCurrentUserProfile)
  .patch(authinticate, updateCurrentUserProfile)

router
  .route("/:id")
  .delete(authinticate, authorizeAdmin, deleteUserById)
  .get(authinticate, authorizeAdmin, getUserById)
  .patch(authinticate, authorizeAdmin, updateUserById)

export default router;
