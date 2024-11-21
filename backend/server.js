const express = require('express');
const cors = require('cors');
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
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api',insert);

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
const start_server = async () => {

    const PORT = process.env.PORT || 3001;

    try {
        await connect_to_mongo();

        app.listen(PORT, () => {
            console.log(`Listening on PORT ${PORT}`);
        }); 

    } catch (error) {
        console.log(`An error occured while trying to listen on ${PORT} `);
    }
}

start_server();