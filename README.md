# 🐞 BugBounty

BugBounty is a full-stack web platform where developers and project owners can collaborate on solving real-world issues in open-source projects. Users can post bugs from their repositories along with a monetary bounty, and other developers can claim and solve those issues to earn rewards.

---

## 🚀 What This Project Does

BugBounty creates a bridge between:

* 🧑‍💻 Developers looking to earn by solving problems
* 🛠️ Project owners who need help fixing bugs

### Key Idea:

Instead of letting issues sit unresolved, you can:

* Post a bug from your repository
* Attach a bounty (reward)
* Define clear acceptance criteria
* Let developers solve it and claim the reward

This makes open-source contributions more **motivated, structured, and rewarding**.

---

## ⚙️ Tech Stack

* **Frontend:** React + Tailwind CSS
* **Backend (BaaS):** Firebase
* **Database:** Firestore (stores all bounty data)
* **Authentication:** Firebase Auth (secure login system)

### 🔥 Firebase Usage

* **Firestore** is used to store:

  * Repository URL
  * Issue title & description
  * Acceptance criteria
  * Bounty amount & details
  * Tags, difficulty, deadlines

* **Authentication**

  * Users sign in securely
  * Each bounty is linked to the user who created it
  * Ensures proper ownership and permissions

---

## 📦 Installation & Setup

Follow these steps to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/bugbounty.git
cd bugbounty
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup Firebase

Create a Firebase project and add your config in:

```bash
src/firebase.js
```

Example:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};
```

---

### 4. Run the development server

```bash
npm run dev
```

---

### 5. Open in browser

```bash
http://localhost:5173
```

---

## ✨ Features

* 🔐 User Authentication (Firebase Auth)
* 📝 Post Bounties with detailed requirements
* 🔍 Browse available bounties
* 💰 Reward-based issue solving
* 🏷️ Tagging & filtering system
* 📊 Clean dashboard UI

---

## 🎯 Future Improvements

* GitHub OAuth + Issue Linking
* Claim & submission workflow
* Payment integration
* Reputation system

---

## 💡 Why This Project Matters

BugBounty turns open-source contribution into a **structured and incentivized ecosystem**, making it easier for developers to:

* Gain experience
* Earn rewards
* Contribute meaningfully

---

## 🧑‍💻 Author

Built with focus on real-world backend + frontend integration and scalable architecture.

---

