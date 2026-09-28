import express from "express";
import authRoutes from "./routes/auth.routes";
import rbacRoutes from "./routes/rbac.routes";
import organizationRoutes from "./routes/organization.routes";
import membershipRoutes from "./routes/membership.routes";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/rbac", rbacRoutes);
app.use("/api/organizations", organizationRoutes);
app.use(
  "/api",
  membershipRoutes
);

app.get("/", (req, res) => {
  res.json({
    message: "Bidding Management API is running",
  });
});

export default app;