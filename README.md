# Task Prioritizer
Task Prioritizer is a smart task organizer created with Vibe Coding, which uses Artificial Intelligence to help the user calculate the importance and urgency of each task. With this, the AI ​​orders the tasks entered by the user according to scores from 1 to 10 (urgency/impact).

## 🛠️ Technologies and Tools

### 🖥️ Front-end:
Tools used: Lovable.

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

### 🧠 LLM (AI) used: 
Gemini 3 Flash Preview.

### 🪡 Logic/Refinement:
Cursor and Copilot.

### 📦 Deployment: 
Vercel.


## 📅 Useful Dates
| Date | Version | Description | Time |
| :--- | :--- | :--- | :--- |
| 09/03/2026 | 1.0.0 | Initial release | - |


## 📝 Prompts Used
To access the prompt documentation, go to README-prompts or [click here](https://github.com/becanmc/task-prioritizer/blob/main/README-prompts.md)

## ⚙️ Features

### 1. Task CRUD via API ✅
- **Add** new tasks with title and description
- **Edit** existing tasks
- **Delete** tasks
- Mark tasks as **completed**

### 2. Process and categorize urgency/impact ✅
- Automatic analysis using LLM (Supabase Functions)
- Urgency and Impact Scores (1-10)
- Non-blocking interface (user can add while AI analyzes)
- Recommendation of execution order based on combined scores

### 3. Display results in a functional and intuitive Dashboard ✅
- Organized list of numbered pending tasks
- Separate section for completed tasks
- Highlight of the recommended task to start
- Pie chart showing completion vs. pending tasks

### 4. Contextualization for AI ✅
- Customizable context panel (key: value)
- Add/edit/delete contexts
- Contexts influence AI scores

### 5. Task Categories ✅
- Create categories with customizable colors
- Assign categories to tasks
- View tasks by category

### 6. Light/Dark Mode ✅
- Interface responds to the toggle light button in the header

### 7. Advanced Usability ✅
- Drag-and-drop to reorder tasks
- Persistence in localStorage (tasks, contexts, categories)
- Minimization of the new task section with animation and opening of horizontal nav-bars (contextualization and categories)

### 8. Refined Interface ✅
- Responsive and mobile-friendly website
- Consistent icons across all sections
- Visual separation between forms and panel items
- Minimalist and clean theme
- Support for operations without reloading the page


## 🌐 Access the project
[Click here](https://task-prioritizer-with-gemini.vercel.app/) to access the repository or copy and paste the following link into your browser: https://task-prioritizer-with-gemini.vercel.app/


## 🏠 Run the code locally
To run the project locally, you need to have Node.js & npm installed - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:
```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/becanmc/task-prioritizer

# Step 2: Navigate to the project directory.
cd task-prioritizer

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the server.
npm run dev
```

**Edit a file directly on GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) in the upper right corner of the file preview.
- Make the changes and commit them.

**Use GitHub Codespaces**

- Navigate to your repository's main page.
- Click the "Code" button (green button) near the upper right corner.
- Select the "Codespaces" tab.
- Click "New codespace" to start a new Codespace environment.
- Edit the files directly in the Codespace and confirm and submit your changes when finished.


## 👤 Author
#### Originally created by Rebeca Costa.

[Github](https://github.com/becanmc) | [LinkedIn](https://www.linkedin.com/in/becanmc/) | [WhatsApp](https://wa.me/5531986765308) | rebecanmcosta@gmail.com


## 📜 License
This project is under **Apache License 2.0**. (For more information, go to LICENSE or [click here](https://github.com/becanmc/task-prioritizer/blob/main/LICENSE).)

In addition, the project also has **notices**. (For more information, go to NOTICE or [click here](https://github.com/becanmc/task-prioritizer/blob/main/NOTICE).)