import dotenv from "dotenv";

dotenv.config();

import app from "./app";

import projectRoutes from "./routes/project.routes";
import bidPackageRoutes from "./routes/bidPackage.routes";
import bidderRoutes from "./routes/bidder.routes";
import invitationRoutes from "./routes/invitation.routes";
import documentRoutes from "./routes/document.routes";
import bidRoutes from "./routes/bid.routes";

// ==========================================
// API ROUTES
// ==========================================

app.use("/api", projectRoutes);
app.use("/api", bidPackageRoutes);
app.use("/api", bidderRoutes);
app.use("/api", documentRoutes);
app.use("/api", invitationRoutes);
app.use("/api", bidRoutes);

// ==========================================
// SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});