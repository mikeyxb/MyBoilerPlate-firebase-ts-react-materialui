# Guestbook Tech Test for React job role

This project was built utilizing Vite react template using Typescript. The project is a simple guestbook application that allows users to add and delete guestbook entries. The project is built using React, Typescript, and Tailwind CSS.

Plugins used in the project:
- react-router-dom
- react-hook-form
- react-bootstrap UI components
- Firebase for backend (Authentication and Firestore), also storage for image upload


## Installation

To install the project, clone the repository and run the following commands:

```bash
npm install
```

## Running the project

To run the project, run the following command:

```bash
npm run dev
```

## Building the project

To build the project, run the following command:

```bash
npm run build
```

# Project wiki

To use the project, follow the steps below:

1. Register a new account or login with an existing account. (Authentication is handled by Firebase using either Google or Email/Password)
2. Once logged in, you will be redirected to the guestbook page where you can view all guestbook entries.
3. To add a new guestbook entry, click on the "Add Entry" button on the top right corner of the page.
4. Fill in the form with your name, message, and upload an image (optional).
5. Click on the "Submit" button to add the entry to the guestbook.

### admin user

To access the admin page, an admin user is required. The admin user can delete guestbook entries.

To create an admin user, you can use the Firebase console to update the user's role to "admin".

To access the admin page, click on the "Admin" button on the top right corner of the page.

### Guestbook entry

Each guestbook entry contains the following information:
- Name: The name of the user who added the entry.
- Message: The message added by the user.
- Image: An image uploaded by the user (optional).
- Date: The date and time the entry was added.

### Admin page

The admin page contains a list of all guestbook entries. The admin user can delete entries by clicking on the "Delete" button next to each entry.

### Logout

To logout, click on the "Logout" button on the top right corner of the page.
