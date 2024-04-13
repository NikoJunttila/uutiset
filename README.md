# News App
<a href="https://uutiset-eight.vercel.app/">Live version here </a><br>
This is a SvelteKit-based web application that fetches news articles from a news API and displays them in a user-friendly interface.


## Features

- Fetch news articles from a news API
- Display news articles with their title, description, and image
- Categorize news articles by topic (e.g., politics, sports, technology)
- Allow users to search for news articles by keyword
- Provide pagination to navigate through multiple pages of news articles

## Getting Started

### Prerequisites

- Node.js (version 18.13 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/NikoJunttila/uutiset.git
#Navigate to the project directory:
cd uutiset

#Install the dependencies:
npm install
```
Create a .env file in the root directory and add your news API key:
example.env shows how the .env file should look like

Start the development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```
The application should now be running at http://localhost:5173.

Usage
Upon loading the application, you will see a list of news articles displayed on the page.
Use the selections to browse news articles by category (e.g., politics, sports, technology) and country.
You can combine country and category or search either one alone.
To search for news articles, enter a keyword in the search bar and press Enter.
Use the pagination controls at the bottom and top of the page to navigate through additional pages of news articles.

Technologies Used
SvelteKit,
Svelte,
TypeScript,
Tailwind CSS (for styling),
Skeleton (toolkit for svelte)<br>
newsAPI: https://newsapi.org/

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

Contributing
If you'd like to contribute to this project, please follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix.
Make your changes and commit them.
Push your changes to your forked repository.
Submit a pull request to the original repository.