# HappyCo Concierge V1

A full-stack resident retention and churn management platform built for property management. The system uses AI-powered interventions and service credits to reduce resident churn and improve satisfaction.

## Architecture

### Tech Stack
- **Frontend**: React 18 with Vite, Tailwind CSS, Shadcn/UI components
- **Backend**: FastAPI (Python), Motor (async MongoDB driver)
- **Database**: MongoDB
- **Authentication**: Session-based with HTTP-only cookies
- **Deployment**: Kubernetes with NGINX ingress

### Project Structure
```
/app/
├── backend/                 # FastAPI Python backend
│   ├── app/
│   │   ├── core/           # Config, database, middleware
│   │   ├── models/         # Pydantic models
│   │   ├── routers/        # API endpoints
│   │   └── services/       # Business logic
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Backend environment (MONGO_URL)
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route-specific pages
│   │   ├── lib/           # Utilities, API client
│   │   └── context/       # React context providers
│   ├── package.json       # Node dependencies
│   └── .env              # Frontend environment (REACT_APP_BACKEND_URL)
│
└── tests/                 # Test suite
```

## Key Features

### 1. Multi-Role Dashboard System
- **Admin**: Property-wide analytics, provider management, tenant oversight
- **Manager**: Churn risk monitoring, retention intervention deployment
- **Resident**: Service booking, maintenance tracking, AI concierge

### 2. Retention Credit System
- $35 retention credits with 4-day expiration window
- Automatic credit deduction on service booking
- Real-time balance updates across all views
- Credit lifecycle tracking for managers and admins

### 3. Service Booking Flow
- Complete booking persistence to MongoDB
- Discount pricing model (Original Price - Credit = Final Price)
- Calendar-based scheduling
- Provider assignment and tracking
- Status management: `scheduled`, `confirmed`, `completed`, `cancelled`

### 4. Demo-Safe Error Handling
- Global error interceptor for all API calls
- Consistent user-facing error message: "End of demo. This view is intentionally limited in the live demo."
- Technical errors logged to console only (not exposed to users)

## Environment Variables

### Backend (`/app/backend/.env`)
```bash
MONGO_URL=<mongodb-connection-string>
SESSION_SECRET=<your-session-secret>
APP_ENV=preview
```

**CRITICAL**: Never modify `MONGO_URL` - it's pre-configured for the deployment environment.

### Frontend (`/app/frontend/.env`)
```bash
REACT_APP_BACKEND_URL=<backend-api-url>
```

**CRITICAL**: Never modify `REACT_APP_BACKEND_URL` - it's managed by the deployment infrastructure.

## Local Development

### Prerequisites
- Python 3.11+
- Node.js 18+
- MongoDB 6.0+
- Yarn package manager

### Backend Setup
```bash
cd /app/backend
pip install -r requirements.txt
python server.py
```

The backend will start on `http://0.0.0.0:8001`

### Frontend Setup
```bash
cd /app/frontend
yarn install
yarn dev
```

The frontend will start on `http://localhost:3000`

### Service Management (Production)
```bash
# View status
supervisorctl status

# Restart services
supervisorctl restart backend
supervisorctl restart frontend

# View logs
tail -f /var/log/supervisor/backend.err.log
tail -f /var/log/supervisor/frontend.err.log
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/session` - Get current session

### Bookings (Resident)
- `POST /api/resident/bookings` - Create service booking with credit
- `GET /api/resident/bookings` - Get resident's booking history
- `GET /api/resident/bookings/all` - Get all bookings (manager/admin)

### Admin
- `GET /api/admin/dashboard` - Admin dashboard data
- `GET /api/admin/properties` - List all properties
- `GET /api/admin/properties/{id}` - Property detail
- `GET /api/admin/providers` - List service providers
- `GET /api/admin/analytics` - Platform analytics

### Manager
- `POST /api/manager/actions/deploy-intervention` - Deploy retention intervention
- `GET /api/manager/actions/list` - List intervention history
- `GET /api/manager/actions/recent/{residentId}` - Recent interventions for resident

## Database Collections

### Core Collections
- `users` - All platform users (admin, manager, resident)
- `properties` - Property records
- `residents` - Resident profiles with retention credit data
- `bookings` - Service booking records
- `auth_sessions` - Active user sessions
- `event_logs` - Audit trail for all platform actions

### Booking Record Structure
```javascript
{
  "id": "uuid",
  "bookingId": "uuid",
  "residentId": "uuid",
  "residentName": "string",
  "userEmail": "email",
  "propertyId": "uuid",
  "propertyName": "string",
  "unitNumber": "string",
  "serviceId": "string",
  "serviceName": "string",
  "serviceCategory": "string",
  "providerId": "string",
  "providerName": "string",
  "originalPrice": 120,
  "discountApplied": 35,
  "finalPrice": 85,
  "creditSource": "retention_credit",
  "creditOfferId": "uuid",
  "bookingDate": "2026-03-15",
  "createdAt": "ISO date",
  "updatedAt": "ISO date",
  "status": "scheduled|confirmed|completed|cancelled",
  "notes": "optional string",
  "channel": "resident_portal",
  "role": "resident",
  "duration": "2 hours"
}
```

## Testing

### Demo Accounts
```
Admin:
  Email: admin@happyco.com
  Password: admin123

Manager:
  Email: sarah.mitchell@riverside.com
  Password: manager123

Resident:
  Email: alex.chen@email.com
  Password: demo123
```

### Critical Test Flows

#### 1. Resident Booking Flow
1. Login as resident (alex.chen@email.com)
2. Navigate to Services or Dashboard
3. Click "Book Now" on any service
4. Select date and confirm booking
5. Verify booking appears in "My Bookings"
6. Verify credit balance decreased
7. Logout and login again - credit should still be decreased

#### 2. Manager Intervention View
1. Login as manager (sarah.mitchell@riverside.com)
2. Navigate to "Churn Risk" page
3. Verify "Alex Chen" appears with correct credit amount ($35 or reduced)
4. View resident detail page
5. Verify intervention timeline shows correct credit lifecycle

#### 3. Admin Property Detail
1. Login as admin (admin@happyco.com)
2. Navigate to "Properties" page
3. Click on any property
4. Should either load correctly OR show demo-safe error banner

#### 4. Sign-out Reliability
1. Login as any role
2. Click sign-out
3. Should redirect to login page
4. Back button should NOT re-authenticate
5. Navigate to any protected route - should redirect to login

## Deployment

### Build Commands
```bash
# Backend - no build step required
cd /app/backend
pip freeze > requirements.txt

# Frontend
cd /app/frontend
yarn build
```

### Production Environment
- Backend binds to `0.0.0.0:8001`
- Frontend serves on port `3000`
- NGINX ingress routes:
  - `/api/*` → Backend (port 8001)
  - All other traffic → Frontend (port 3000)

### Health Checks
- Backend: `GET /api/` (returns JSON with app info)
- Frontend: `GET /` (returns index.html)

## Key Design Decisions

### 1. UUIDs over ObjectIds
All database IDs use UUIDs instead of MongoDB's ObjectId to ensure data portability and avoid vendor lock-in.

### 2. Session-based Authentication
HTTP-only cookies with server-side session validation for security. No JWT tokens exposed to client.

### 3. Credit Model
- Single $35 credit (down from original $500)
- 4-day expiration window (clear, short timeframe)
- Tracked in resident document's `retentionCredit` field
- Updated atomically during booking creation

### 4. Demo-Safe Errors
All production demos hide technical errors from users. Failed operations show a consistent, professional message instead of stack traces or auth errors.

### 5. Discount vs "Fully Covered" Pricing
Services show transparent discount breakdown:
- Original price: $120
- Retention credit: -$35
- **You pay today: $85**

This approach is more honest and sustainable than claiming services are "fully covered."

## Known Limitations (Demo Environment)

- Some advanced admin analytics may trigger the demo-safe error banner
- "Deploy Intervention" button shows demo banner (requires backend integration)
- Property detail pages for non-primary properties may be limited
- Credit history beyond current resident (Alex Chen) may be incomplete

## Future Enhancements

- [ ] Real-time notifications for booking confirmations
- [ ] Manager approval workflow for high-value credits
- [ ] Resident feedback collection after service completion
- [ ] Predictive churn model training pipeline
- [ ] Multi-property manager assignments
- [ ] Service provider rating system
- [ ] Automated credit expiration reminders

## Support & Maintenance

### Log Files
- Backend: `/var/log/supervisor/backend.*.log`
- Frontend: `/var/log/supervisor/frontend.*.log`

### Common Issues

**Issue**: Services won't start
**Solution**: Check MongoDB connection, verify `.env` files are present

**Issue**: Frontend shows blank page
**Solution**: Check browser console for errors, verify `REACT_APP_BACKEND_URL` is set

**Issue**: Booking fails with "Insufficient credit"
**Solution**: Resident's credit may be exhausted. Login and check session's `retention_credit.amount`

**Issue**: Credit doesn't update after booking
**Solution**: Call `refreshSession()` in frontend to fetch updated user data

## Contributing

When adding new features:
1. Add backend endpoint in `/app/backend/app/routers/`
2. Register router in `/app/backend/server.py`
3. Add API function to `/app/frontend/src/lib/api.js`
4. Wrap with `withDemoSafe()` for error handling
5. Update this README with new endpoints/features

## License

Proprietary - HappyCo Internal Use Only
