# ShopZone Client Side

A basic MERN stack project featuring secure user authentication and authorization with dynamic shop-based subdomains. Users can sign up with a unique username and multiple shop names, log in with session handling, and access shop-specific dashboards via subdomains. Built with MongoDB, Express, React (Vite), and Node.js.

### Live URL -> https://shopzone-teal.vercel.app

## Features

- **User Authentication**
  - Secure signup with password validation (8+ chars, number, special char)
  - Username and shop name uniqueness validation
  - Login with "Remember Me" functionality (7-day persistent session)
  - JWT-based authentication with proper storage

- **Shop Management**
  - Each user can register 3-4 unique shop names
  - Global shop namespace (no duplicate shop names across users)
  - Shop names displayed in user profile

- **Dynamic Subdomains**
  - Access shops via `http://<shopname>.localhost:5173`
  - Cross-subdomain authentication
  - Persistent sessions when opening subdomains in new tabs

- **UI Components**
  - Loading spinners during auth verification
  - Profile dropdown with shop list
  - Confirmation dialog for logout



### .env

```
VITE_BASE_URL=https://shopzone-server.vercel.app

NODE_ENV=production
```
