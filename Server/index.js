import express from "express";
import cors from "cors";
import { connectdb } from "./configs/DbConfig.js";
import { registerUser, getAllUsers } from "./controllers/Registration.js";
import { addContact, getAllContacts, deleteContact } from "./controllers/Contact.js";
import { login } from "./controllers/AuthController.js";
import { getAdminProfile } from "./controllers/AdminController.js";
import { verifyToken, isAdmin } from "./Middlewares/AuthMiddleware.js";
import { registerAdmin, adminLogin } from "./controllers/AdminController.js";
import quizRoutes from "./routes/quizRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/registerUser", registerUser);
app.post("/login", login);
app.post("/addContact", addContact);

app.get("/admin/contacts", verifyToken, isAdmin, getAllContacts);
app.delete("/admin/contacts/:id", verifyToken, isAdmin, deleteContact);

app.post("/admin/register", registerAdmin);
app.post("/admin/login", adminLogin);
app.get("/admin/profile", verifyToken, isAdmin, getAdminProfile);

app.use('/api', quizRoutes);


app.get("/users", verifyToken, isAdmin, getAllUsers);

const port = 5656;

app.listen(port, async () => {

  await connectdb();
  console.log(` Server running on http://localhost:${port}`);
  
});
