# KnowYourRights.io

**Instant legal knowledge in your pocket during police encounters.**

A mobile-first web application providing instant access to rights, de-escalation scripts, and documentation tools for individuals during police encounters.

## 🚀 Features

### Core Features
- **Real-time Rights & Recourse Guide**: Instant access to constitutional rights and procedural steps during police stops
- **De-escalation Scripts**: Pre-written, effective phrases in English and Spanish to manage interactions calmly
- **Localized Legal Guides**: State-specific laws and regulations relevant to police interactions
- **Encounter Documentation Tool**: Quick record button for audio recording and key details collection
- **Shareable Encounter Summary**: Automatically generated shareable summary cards (PDF/image)

### Technical Features
- **Multi-language Support**: Full English and Spanish interface
- **Offline Capability**: Core features work without internet connection
- **Mobile-first Design**: Optimized for smartphone use during encounters
- **Secure Data Storage**: Encrypted storage with IPFS backup
- **Real-time Sync**: Cross-device synchronization for premium users

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **State Management**: Zustand with persistence
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe
- **AI Services**: OpenAI GPT-3.5/4
- **File Storage**: Pinata IPFS
- **Deployment**: Docker, Vercel/Netlify ready

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account and project
- Stripe account (for payments)
- OpenAI API key (for AI features)
- Pinata account (for IPFS storage)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/vistara-apps/this-is-a-7364.git
cd this-is-a-7364
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Copy the example environment file and configure your API keys:
```bash
cp .env.example .env
```

Edit `.env` with your actual API keys:
```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# OpenAI Configuration
VITE_OPENAI_API_KEY=your_openai_api_key

# Pinata IPFS Configuration
VITE_PINATA_API_KEY=your_pinata_api_key
VITE_PINATA_SECRET_API_KEY=your_pinata_secret_key

# App Configuration
VITE_APP_URL=http://localhost:5173
VITE_APP_NAME=KnowYourRights.io
```

### 4. Database Setup

#### Supabase Setup
1. Create a new Supabase project
2. Go to the SQL Editor in your Supabase dashboard
3. Run the following SQL to create the required tables:

```sql
-- State Law Guides table
CREATE TABLE IF NOT EXISTS state_law_guides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  state VARCHAR(50) NOT NULL UNIQUE,
  guide_content JSONB NOT NULL,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Encounter Records table
CREATE TABLE IF NOT EXISTS encounter_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  officer_details JSONB,
  notes TEXT,
  audio_file_path TEXT,
  shareable_card_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE encounter_records ENABLE ROW LEVEL SECURITY;

-- Create policy for users to only access their own records
CREATE POLICY "Users can only access their own encounter records" ON encounter_records
  FOR ALL USING (auth.uid() = user_id);
```

### 5. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔧 Configuration

### Supabase Configuration
1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Configure authentication providers as needed
4. Set up Row Level Security policies for data protection

### Stripe Configuration
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your publishable key from the dashboard
3. Create products and prices for subscription plans:
   - Basic Plan: $1.99/month
   - Premium Plan: $4.99/month
4. Set up webhooks for subscription management

### OpenAI Configuration
1. Get an API key from [platform.openai.com](https://platform.openai.com)
2. Set usage limits and monitoring
3. Configure rate limiting for production use

### Pinata Configuration
1. Create an account at [pinata.cloud](https://pinata.cloud)
2. Get API keys from the dashboard
3. Configure IPFS gateway settings

## 📱 Usage

### For Users
1. **Access Rights Information**: Visit the app to instantly view your constitutional rights
2. **Use De-escalation Scripts**: Browse categorized scripts for different encounter scenarios
3. **Record Encounters**: Use the quick record feature to document interactions
4. **Generate Reports**: Create shareable summaries of encounters
5. **State-specific Guidance**: Get localized legal information for your state

### For Developers
1. **Local Development**: Use `npm run dev` for hot-reload development
2. **Build for Production**: Use `npm run build` to create optimized build
3. **Preview Production**: Use `npm run preview` to test production build locally

## 🏗 Architecture

### Frontend Architecture
```
src/
├── components/          # Reusable UI components
│   ├── AuthModal.jsx   # Authentication modal
│   └── Header.jsx      # Main navigation header
├── pages/              # Route components
│   ├── HomePage.jsx    # Landing page
│   ├── RightsGuide.jsx # Rights information
│   ├── DeEscalationScripts.jsx
│   ├── StateGuides.jsx
│   ├── EncounterRecorder.jsx
│   ├── MyEncounters.jsx
│   └── Subscription.jsx
├── services/           # API integrations
│   ├── supabase.js     # Database and auth
│   ├── stripe.js       # Payment processing
│   ├── openai.js       # AI services
│   └── pinata.js       # IPFS storage
├── data/               # Static data
│   ├── stateLegalData.js
│   └── deEscalationScripts.js
├── store/              # State management
│   └── useAppStore.js  # Zustand store
└── App.jsx             # Main app component
```

### Data Models

#### User
```javascript
{
  userId: "uuid",
  email: "string",
  subscriptionStatus: "free|basic|premium",
  createdAt: "timestamp"
}
```

#### StateLawGuide
```javascript
{
  state: "string",
  guideContent: {
    summary: "string",
    keyRights: ["string"],
    importantNotes: ["string"],
    stopAndIdentify: "boolean",
    recordingLegal: "boolean"
  },
  lastUpdated: "timestamp"
}
```

#### EncounterRecord
```javascript
{
  recordId: "uuid",
  userId: "uuid",
  timestamp: "timestamp",
  location: "string",
  officerDetails: {
    badgeNumber: "string",
    department: "string"
  },
  notes: "string",
  audioFilePath: "string",
  shareableCardUrl: "string",
  createdAt: "timestamp"
}
```

## 🔒 Security

### Data Protection
- All user data is encrypted at rest
- Row Level Security (RLS) policies protect user data
- HTTPS enforced for all communications
- API keys stored securely in environment variables

### Privacy Features
- Optional anonymous usage mode
- Local data storage with cloud backup
- User-controlled data retention
- GDPR compliance features

## 🚀 Deployment

### Docker Deployment
```bash
# Build the Docker image
docker build -t knowyourrights-io .

# Run the container
docker run -p 3000:3000 --env-file .env knowyourrights-io
```

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify Deployment
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

## 📊 Monitoring

### Analytics
- User engagement tracking
- Feature usage analytics
- Performance monitoring
- Error tracking with Sentry

### Health Checks
- API endpoint monitoring
- Database connection health
- Third-party service status
- Performance metrics

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit with descriptive messages
5. Push to your fork and create a Pull Request

### Code Standards
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

### Legal Considerations
- All legal content must be reviewed by qualified attorneys
- State-specific information requires regular updates
- De-escalation scripts should be validated by experts
- Disclaimer and terms of service must be maintained

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This application provides general information about legal rights and is not a substitute for professional legal advice. Laws vary by jurisdiction and change over time. Users should consult with qualified attorneys for specific legal situations.

## 📞 Support

- **Documentation**: [docs.knowyourrights.io](https://docs.knowyourrights.io)
- **Issues**: [GitHub Issues](https://github.com/vistara-apps/this-is-a-7364/issues)
- **Email**: support@knowyourrights.io
- **Community**: [Discord Server](https://discord.gg/knowyourrights)

## 🗺 Roadmap

### Phase 1 (Current)
- ✅ Core rights information
- ✅ Basic de-escalation scripts
- ✅ Encounter recording
- ✅ User authentication
- ✅ Subscription system

### Phase 2 (Next)
- [ ] Advanced AI script generation
- [ ] Video recording capabilities
- [ ] Legal professional network
- [ ] Community features
- [ ] Mobile app (React Native)

### Phase 3 (Future)
- [ ] Real-time legal assistance
- [ ] Integration with legal aid organizations
- [ ] Advanced analytics dashboard
- [ ] Multi-language expansion
- [ ] API for third-party integrations

---

**Built with ❤️ for civil rights and community safety**
