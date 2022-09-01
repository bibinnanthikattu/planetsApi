

import express from "express";
import cors from 'cors'
import { appendFile } from "fs";
const app = express();
import { validationErrorMiddleware } from './middleware/lib/index';
import planetRoutes from './routes/planet';
import { passport } from './middleware/passport'
import { initSessionMiddleware } from './middleware/session';
import authRoutes from './routes/auth'

// middleware
// authentification middleware
app.use(initSessionMiddleware(app.get("env")));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());


const corsOptions = {
    origin: 'http://localhost:8080',
    credentials : true
}
app.use(cors(corsOptions));

// planet routes
app.use("/planets", planetRoutes);
// authentication routes
app.use("/auth",authRoutes)



// validationError middleware
app.use(validationErrorMiddleware);

export default app;