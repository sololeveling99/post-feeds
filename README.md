# React Native Post Feeds App

## Overview
This mobile app, built with **React Native** and **Expo**, provides a seamless user experience for authentication and real-time post feeds using **Supabase**. It solves the problem of building a simple yet effective social posting platform with real-time updates.

## Features

### 1. Authentication
- Users can log in using **Supabase authentication**.
- Supports login with **email & password**, **magic link**, or **social login**.
- Test User Credentials:
  - **Email:** user1@gmail.com
  - **Password:** test1

### 2. Post Feed
- Users land on a **post feed** after logging in.
- Users can **write and post messages**.
- Posts are **displayed instantly** in the feed after submission.

### 3. Real-Time Updates
- The app utilizes **Supabase's real-time functionality**.
- Posts appear **instantly for all users** when submitted.
- Uses **real-time subscriptions** to listen for new posts in the database.

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/sololeveling99/post-feeds
   cd post-feeds
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo app:
   ```bash
   npx expo start
   ```

4. Run the app on:
   - **Android Emulator**
   - **iOS Simulator**
   - **Expo Go**

## Project Structure
- The project follows **file-based routing** in the **app** directory.
- Authentication and data handling are powered by **Supabase**.
- Styling is done with **React Native's StyleSheet API**.

---
This app provides a solid foundation for **authentication**, **real-time data**, and **seamless UX**. 🚀