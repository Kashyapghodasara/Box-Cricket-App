# 🏏 Box Cricket Booking Web Application
> This is a MERN Stack based web application designed to streamline and simplify the process of booking box cricket grounds. The platform includes features for both Users and Admins, ensuring smooth management of time slots, bookings, and payments.
---

## ✨ Features
- 🔑 User Authentication & Authorization
- 📅 Real-time slot booking with conflict management
- 💳 Dummy payment integration
- 📜 Users can view their past bookings
- ✅ Check availability of booked slots
- 📊 Admin dashboard for managing bookings
- 📈 Admin can analyze and audit bookings
- ⛓ Http security headers are integrated
<br>
<br>

## Tech Stack

### 🏡 Frontend
[![React, Tailwind](https://go-skill-icons.vercel.app/api/icons?i=react,tailwind)](https://skillicons.dev)


### 🔧 Backend
[![Node, Express, Mongo](https://skillicons.dev/icons?i=nodejs,express)](https://skillicons.dev)


### 🗃️ Database
[![MongoDB](https://skillicons.dev/icons?i=mongodb)](https://skillicons.dev)


### 🧰 Tools
[![Postman, Jest, VS Code, API, Zustand](https://go-skill-icons.vercel.app/api/icons?i=postman,jest,zustand,vscode,jwt,api,vite&theme=dark)](https://skillicons.dev)

---

## Folder Structure

<pre>
├── Admin
    ├── .gitignore
    ├── components.json
    ├── eslint.config.js
    ├── index.html
    ├── jsconfig.json
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── batman.png
    │   ├── fonts
    │   │   ├── Dune_Rise.otf
    │   │   ├── Dune_Rise.ttf
    │   │   └── dune_rise.zip
    │   └── vite.svg
    ├── src
    │   ├── Animation
    │   │   ├── BadgeDollarSign.jsx
    │   │   ├── ChartNoAxes.jsx
    │   │   ├── DotGrid.jsx
    │   │   ├── GlassIcons.jsx
    │   │   ├── LayoutGrid.jsx
    │   │   └── ScanText.jsx
    │   ├── App.css
    │   ├── App.jsx
    │   ├── Components
    │   │   ├── Body.jsx
    │   │   ├── BoxStatGraph.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Home.jsx
    │   │   ├── MonthChart.jsx
    │   │   ├── PaymentStatGraph.jsx
    │   │   ├── Revenue
    │   │   │   └── RevenuePage.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── Transaction
    │   │   │   └── TransDetails.jsx
    │   │   └── ui
    │   │   │   ├── card.jsx
    │   │   │   ├── chart.jsx
    │   │   │   └── table.jsx
    │   ├── Constant.jsx
    │   ├── assets
    │   │   └── react.svg
    │   ├── index.css
    │   ├── lib
    │   │   └── utils.js
    │   └── main.jsx
    ├── tailwind.config.js
    └── vite.config.js
├── Backend
    ├── .env.test
    ├── .github
    │   └── workflows
    │   │   └── nodejs.yml
    ├── .gitignore
    ├── babel.config.js
    ├── config
    │   ├── auth.js
    │   ├── database.js
    │   └── seed.js
    ├── controllers
    │   ├── adminController.js
    │   ├── bookingController.js
    │   ├── paymentController.js
    │   └── userController.js
    ├── models
    │   ├── adminSchema.js
    │   ├── bookingSchema.js
    │   ├── boxSchema.js
    │   ├── paymentSchema.js
    │   └── userSchema.js
    ├── package-lock.json
    ├── package.json
    ├── routes
    │   ├── adminRoute.js
    │   ├── bookingRoute.js
    │   ├── paymentRoute.js
    │   └── userRoute.js
    ├── server.js
    └── tests
    │   ├── booking.test.js
    │   └── userAuth.test.js
├── Frontend
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── Images
    │   │   ├── Blue2.jpeg
    │   │   ├── Fog.jpeg
    │   │   ├── Green.jpeg
    │   │   ├── Green4.jpeg
    │   │   ├── Logo-R.png
    │   │   ├── Logo.png
    │   │   ├── Orange1.jpeg
    │   │   ├── Orange2.jpeg
    │   │   ├── Orange4.jpeg
    │   │   ├── image.png
    │   │   └── shadcn-rmbg.png
    │   └── vite.svg
    ├── src
    │   ├── App.css
    │   ├── App.jsx
    │   ├── Components
    │   │   ├── Animation
    │   │   │   ├── CountUp.jsx
    │   │   │   └── RotatingText.jsx
    │   │   ├── Availability.jsx
    │   │   ├── Body.jsx
    │   │   ├── BoxBooking.jsx
    │   │   ├── CountValues.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Hero.jsx
    │   │   ├── Home.jsx
    │   │   ├── InfoCard.jsx
    │   │   ├── InfoCards.jsx
    │   │   ├── MutliStepFormWrapper.jsx
    │   │   ├── ProgressBar.jsx
    │   │   ├── Registration.jsx
    │   │   ├── ShowBookings.jsx
    │   │   ├── StepBoxDetails.jsx
    │   │   ├── StepPaymentDetails.jsx
    │   │   ├── StepPreviewDetails.jsx
    │   │   ├── StepTicketDetails.jsx
    │   │   └── Ticket.jsx
    │   ├── Constant.jsx
    │   ├── Store
    │   │   ├── useBoxDetailStore.jsx
    │   │   ├── usePaymentDetailStore.jsx
    │   │   ├── usePaymentIdStore.jsx
    │   │   ├── useRegistration.jsx
    │   │   └── useUserIdStore.jsx
    │   ├── assets
    │   │   └── react.svg
    │   ├── index.css
    │   └── main.jsx
    ├── tailwind.config.js
    └── vite.config.js
├── DailyProgress.md
├── Readme.md
├── .gitignore
</pre>

* ####  Designed and Managed by Kashyap Ghodasara