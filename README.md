=======

# Next.js Prisma Skeleton Application

This project is a skeleton application built with Next.js, Prisma and Next-Auth. It comes with a wide array of features including user login, create, delete, edit functionalities, dark mode, and much more.

## Features

- User authentication via Next-Auth
- User CRUD (Create, Read, Update, Delete) operations
- Dark mode functionality
- WebSocket communication for real-time updates and notifications

## Getting Started

Before you start, make sure you have Node.js and npm installed on your local machine. If you do not have these, you can install them from [here](https://nodejs.org/en/download/).

Clone this repository on your local machine:

```bash
git clone https://github.com/weblab-studio-gh/next-skeleton.git
```

Then navigate into the directory:

```bash
cd next-skeleton
```

Install the project dependencies:

```bash
npm install
```

## Environment Variables

The application requires the following environment variables:

- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

Add a `.env.local` file in the root directory of your project. Add environment-specific variables on new lines in the form of `NAME=VALUE`.

## Scripts

This project includes the following scripts:

- `npm run dev`: Runs the app in the development mode (no websocket).
- `npm run build`: Builds the app for production to the `.next` folder.
- `npm run start`: Starts the application in production mode. The application should be compiled with `npm run build` first.
- `npm run lint`: Runs the linter.
- `npm run devstart`: Starts the custom dev server for ws communication (no hotreload).
- `npm run db.generate`: Generates Prisma client.
- `npm run db.migrate`: Runs Prisma migrations.
- `npm run db.reset`: Resets the Prisma database.
- `npm run db.studio`: Runs Prisma Studio for a GUI to view the database.

## Dependencies

The project uses the following dependencies:

- Next.js for the framework
- Prisma for the database
- Next-Auth for authentication
- Tailwind CSS for styles
- and others (for a complete list, refer to the `package.json` file)

## Custom Servers

This application uses custom servers for WebSocket communication to provide real-time updates and notifications to the user.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


