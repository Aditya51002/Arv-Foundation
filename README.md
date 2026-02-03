# ARV Foundation – MERN Stack Website (Hindi + English)

A bilingual (Hindi + English) NGO website built with the MERN stack (MongoDB, Express, React, Node.js). This README gives you end-to-end steps to scaffold, run, and deploy the project, plus ready-to-use page content.

---

## 1) Goals
- Build a fast, secure, and SEO-friendly bilingual website for ARV Foundation.
- Clear CTA flow for Donate and Volunteer.
- Simple admin-friendly content updates.

---

## 2) Tech Stack
- Frontend: React + Vite, React Router, Tailwind CSS (or your preferred CSS framework)
- Backend: Node.js + Express
- Database: MongoDB Atlas (or local MongoDB)
- Auth (optional): JWT-based sessions for admin/content editors
- Payments (optional): Razorpay/Stripe integration for donations
- Deployment: Vercel/Netlify (frontend) + Render/Railway/Heroku (backend) + MongoDB Atlas

---

## 3) Project Structure (suggested)
```
root/
  README.md
  /frontend
    package.json
    vite.config.ts
    src/
      main.tsx
      App.tsx
      routes/
      components/
      pages/
      assets/
  /backend
    package.json
    src/
      index.ts
      routes/
      controllers/
      models/
      middleware/
      utils/
  .env.example
```

---

## 4) Prerequisites
- Node.js 20+
- npm or pnpm or yarn (examples use npm)
- MongoDB Atlas URI (or local MongoDB)
- Git

---

## 5) Setup – Backend
1) Create backend folder
```bash
mkdir backend && cd backend
npm init -y
npm install express cors mongoose dotenv morgan
npm install -D typescript ts-node nodemon @types/node @types/express @types/cors
npx tsc --init
```
2) Add scripts to backend/package.json
```json
"scripts": {
  "dev": "nodemon src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```
3) Sample src/index.ts (basic server + health)
```ts
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

async function start() {
  if (!mongoUri) throw new Error("MONGO_URI not set");
  await mongoose.connect(mongoUri);
  app.listen(port, () => console.log(`API running on port ${port}`));
}

start().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
```
4) Environment (.env in backend)
```
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=replace_this_for_auth_if_needed
```

---

## 6) Setup – Frontend
1) Create frontend
```bash
cd ..
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm install react-router-dom
npm install axios
```
2) Add Tailwind (optional but recommended)
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
Configure `tailwind.config.cjs` content paths to `./index.html` and `./src/**/*.{ts,tsx}`. Add Tailwind directives to `src/index.css`.

3) Basic routing skeleton (src/main.tsx)
```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

4) Example routes (src/App.tsx)
```tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Initiatives from "./pages/Initiatives";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/work" element={<Work />} />
      <Route path="/initiatives" element={<Initiatives />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
```

---

## 7) Content (ready to paste)
Use these as bilingual sections on your pages. Keep English + Hindi side-by-side or use toggle tabs.

### Home | होम
- Tagline: Serving Humanity with Compassion, Dignity & Hope / मानवता की सेवा – करुणा, गरिमा और आशा के साथ
- Intro EN: The ARV Foundation is a non-governmental organization established on 14 November 2017, dedicated to uplifting underprivileged communities through education, healthcare, food, shelter, and environmental initiatives.
- Intro HI: ARV Foundation एक गैर-सरकारी संगठन है, जिसकी स्थापना 14 नवंबर 2017 को समाज के वंचित वर्गों की सेवा और उत्थान के उद्देश्य से की गई। यह संस्था शिक्षा, स्वास्थ्य, भोजन, आवास और पर्यावरण संरक्षण के क्षेत्र में कार्य करती है।
- Buttons: Donate Now | Join as Volunteer (दान करें | स्वयंसेवक बनें)
- Focus Areas: Orphanage Support, Old Age Home, Education, Health, Environment, Food & Clothes Drive (अनाथालय सहयोग, वृद्धाश्रम सेवा, शिक्षा, स्वास्थ्य, पर्यावरण, भोजन व वस्त्र वितरण)

### About Us | हमारे बारे में
- Who We Are EN: ARV Foundation works at the grassroots level to reduce poverty, inequality, and social neglect by empowering individuals and communities.
- Who We Are HI: ARV Foundation जमीनी स्तर पर कार्य करते हुए गरीबी, असमानता और सामाजिक उपेक्षा को कम करने के लिए लोगों और समुदायों को सशक्त बनाती है।
- Mission EN: To empower underprivileged communities through education, healthcare, awareness, and sustainable development.
- Mission HI: शिक्षा, स्वास्थ्य, जागरूकता और सतत विकास के माध्यम से वंचित समुदायों को सशक्त बनाना।
- Vision EN: A just, equal, and compassionate society for all.
- Vision HI: एक न्यायपूर्ण, समान और करुणामय समाज का निर्माण।

### Our Work | हमारा कार्य
- Orphanage Support EN: We support orphanages by improving infrastructure, nutrition, education, and emotional well-being of children.
- Orphanage Support HI: हम अनाथालयों में बच्चों के लिए शिक्षा, पोषण, आवास और भावनात्मक सहयोग प्रदान करते हैं।
- Old Age Home EN: ARV Foundation supports elderly individuals who have been abandoned, providing care, food, healthcare, and dignity.
- Old Age Home HI: हम उन बुजुर्गों की सेवा करते हैं जिन्हें उनके परिवार ने छोड़ दिया है, और उन्हें सम्मान, भोजन व स्वास्थ्य सुविधा देते हैं।
- Slum Area Development EN: We work in slum areas to provide food, education awareness, health camps, and basic necessities.
- Slum Area Development HI: हम झुग्गी बस्तियों में भोजन, शिक्षा जागरूकता, स्वास्थ्य शिविर और आवश्यक सुविधाएँ प्रदान करते हैं।
- Environment Protection EN: We promote plastic-free initiatives, cleanliness drives, and environmental awareness.
- Environment Protection HI: हम प्लास्टिक मुक्त अभियान, स्वच्छता अभियान और पर्यावरण जागरूकता कार्यक्रम चलाते हैं।
- Education EN: Providing free education and awareness so no child is left behind.
- Education HI: निःशुल्क शिक्षा और जागरूकता, ताकि कोई भी बच्चा शिक्षा से वंचित न रहे।
- Health EN: Free medical camps, medicine distribution, and health awareness programs.
- Health HI: निःशुल्क चिकित्सा शिविर, दवाइयों का वितरण और स्वास्थ्य जागरूकता।
- Old Clothes Distribution EN: Collection and distribution of clean, usable clothes to needy families.
- Old Clothes Distribution HI: जरूरतमंद परिवारों को साफ और उपयोगी कपड़ों का वितरण।
- Food Drive EN: Providing nutritious food to slum residents and labor-class families.
- Food Drive HI: झुग्गी बस्तियों और मजदूर वर्ग को पौष्टिक भोजन उपलब्ध कराना।

### Our Initiatives | हमारी पहल
- Sanitary Pad Initiative EN: Raising menstrual health awareness and distributing free sanitary pads to women and girls.
- Sanitary Pad Initiative HI: महिलाओं और किशोरियों को निःशुल्क सैनिटरी पैड प्रदान कर मासिक धर्म जागरूकता फैलाना।
- Go For Sangam EN: A cleanliness initiative to restore the purity of River Sangam, Prayagraj.
- Go For Sangam HI: प्रयागराज के पवित्र संगम की स्वच्छता और संरक्षण हेतु विशेष अभियान।
- Blood Donation Drive EN: Encouraging voluntary blood donation in collaboration with Police Mitra.
- Blood Donation Drive HI: पुलिस मित्र के सहयोग से स्वैच्छिक रक्तदान को बढ़ावा देना।

### Founder | संस्थापक
- Message EN: ARV Foundation was created with a vision to serve humanity selflessly and bring real change.
- Message HI: ARV Foundation की स्थापना मानवता की निःस्वार्थ सेवा और वास्तविक परिवर्तन के उद्देश्य से की गई।

### Get Involved | जुड़ें
- Volunteer EN: Join us and contribute your time and skills.
- Volunteer HI: हमारे साथ जुड़कर अपने समय और कौशल से समाज सेवा करें।

### Donate | दान करें
- Why Donate EN: Your contribution helps us provide food, education, healthcare, and dignity.
- Why Donate HI: आपका दान भोजन, शिक्षा, स्वास्थ्य और सम्मान प्रदान करने में मदद करता है।

### Contact | संपर्क करें
- ARV Foundation
- Email: arvcreation@gmail.com
- Contact Form fields: Name, Email, Phone, Message (नाम, ईमेल, फोन, संदेश)

### Footer
- English: © ARV Foundation | All Rights Reserved
- Hindi: © ARV Foundation

---

## 8) UI/UX Tips
- Provide a language toggle (EN/HIN) in the navbar.
- Keep Donate/Volunteer buttons persistent in header and footer.
- Use consistent color palette; add icons for focus areas; ensure WCAG contrast.
- Optimize images; lazy-load hero background; add meta tags for SEO.

---

## 9) API Ideas (optional)
- `GET /api/content` for static sections (can be served statically or via CMS).
- `POST /api/contact` to store contact messages.
- `POST /api/donate/intent` to create payment intents.
- `POST /api/volunteer` to store volunteer signups.

---

## 10) Running Locally
Backend:
```bash
cd backend
npm run dev
```
Frontend (new terminal):
```bash
cd frontend
npm run dev
```
Visit: http://localhost:5173 (or Vite’s shown port). Ensure backend CORS allows the frontend origin.

---

## 11) Deployment Checklist
- Frontend: build (`npm run build`) and deploy to Vercel/Netlify.
- Backend: deploy to Render/Railway/Heroku; set env vars (PORT, MONGO_URI, JWT_SECRET, payment keys if any).
- CORS: allow production frontend origin.
- SSL: enable HTTPS on hosting; force HTTPS at proxy.
- Monitoring: add basic uptime check; log errors.

---

## 12) Next Steps
- Scaffold frontend pages and paste the provided bilingual content.
- Wire Donate and Volunteer forms to backend endpoints; integrate payments if required.
- Add basic admin auth if you need in-dashboard editing.
- Add tests (unit for components, e2e for forms/flows).
