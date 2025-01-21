## Frontend

### Description

The frontend of this application is built using **React.js**. It provides a user-friendly interface for managing tasks, including login/signup forms, task lists, and task creation/editing functionalities.

### Features

- **User Authentication:** Login and signup forms with JWT token storage.
- **Task Management:** Create, read, update, and delete tasks.
- **Filtering:** Filter tasks by status (e.g., pending, completed).
- **Responsive Design:** Optimized for desktop and mobile devices.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <frontend-repo-url>
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:5000
   ```
4. Start the development server:
   ```bash
   npm start
   ```

### Folder Structure

```
frontend/
|-- src/
|   |-- components/
|   |   |-- Auth/
|   |   |   |-- Login.js
|   |   |   |-- Signup.js
|   |   |-- Tasks/
|   |       |-- TaskList.js
|   |       |-- TaskForm.js
|   |-- services/
|   |   |-- api.js
|   |-- App.js
|   |-- index.js
```

### Usage

1. **Login/Signup:** Create an account or log in to access the dashboard.
2. **Task Management:**
   - Create a new task using the provided form.
   - View the task list, with options to filter by status.
   - Edit or delete tasks directly from the list.

### Deployment

- Use platforms like **Vercel** or **Netlify** to deploy the frontend.
- Ensure the backend API base URL is updated in the `.env` file for production.

---
