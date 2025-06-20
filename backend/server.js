require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const connect_to_mongo = require('./config/connection');
const checkApi = require('./routes/apiRoutes');
const signupAdmin = require('./routes/SignupAdminRoute');
const signinAdmin = require('./routes/SigninAdminRoute');
const logout = require('./routes/LogoutRoute');
const saveAppointment = require('./routes/SaveAppointmentRoute');
const getAppointments = require('./routes/GetAppointmentRoutes');
const insert = require('./routes/$route');
const getAdminRequest = require('./routes/GetAdminRequestRoutes');
const updateRequestStatus = require('./routes/AdminRequestStatusRoutes');
const itemImageUpload = require('./routes/ItemImageRoutes');
const profilePicUpload = require('./routes/ProfilePictureRoutes');
const moreinfo = require('./routes/MoreInfoRoutes');
const appointmentStatus = require('./routes/AppointmentStatusRoutes');
const appointmentLogs = require('./routes/AppointmentHistoryRoutes');
const profiling = require('./routes/PatientProfilingRoutes');
const vetInModal = require('./routes/ViewVetInModalRoutes');

const app = express();

app.use(cors({
    origin: (origin, callback) => {
        console.log('Request Origin:', origin); // Add this for debugging
        const allowedOrigins = ['https://proanimalwelfare.shop','https://api.proanimalwelfare.shop'];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS error: Origin ${origin} not allowed`));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));


app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));

// API routes
app.use('/api', insert);
app.use('/api', checkApi);
app.use('/api', signupAdmin);
app.use('/api', signinAdmin);
app.use('/api', logout);
app.use('/api', saveAppointment);
app.use('/api', getAppointments);
app.use('/api', getAdminRequest);
app.use('/api', updateRequestStatus);
app.use('/api', itemImageUpload);
app.use('/api', profilePicUpload);
app.use('/api', moreinfo);
app.use('/api', appointmentStatus);
app.use('/api', appointmentLogs);
app.use('/api', profiling);
app.use('/api', vetInModal);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
    });
}

const start_server = async () => {
    const PORT = process.env.PORT || 3001;

    try {
        await connect_to_mongo();

        app.listen(PORT, () => {
            console.log(`Listening on PORT ${PORT}`);
        });
    } catch (error) {
        console.log(`An error occurred while trying to listen on ${PORT}`);
    }
}

start_server();
