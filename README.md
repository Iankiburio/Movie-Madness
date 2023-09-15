# Movie Madness Application

This is a Full Stack application that allows users to search for movies and view their details.

## Installation

To run this application on your machine, you need to have the following dependencies installed:

- Node.js
- npm (Node Package Manager)

Please follow these steps to install and run the application:

1. Clone the repository:

git clone [repository-url]
2. Install the dependencies:
cd movie-madness-app npm install
3. Start the development server:
npm start

The application will be running at [http://localhost:3000](http://localhost:3000).

## Dependencies

The Movie Madness application relies on the following dependencies:

- `react` and `react-dom`: These are the core libraries for React.
- `react-autosuggest`: A library for creating autosuggest input fields in React.
- `react-router-dom`: A library for routing in React applications.
- `node-fetch`: A library for making HTTP requests.

To install the dependencies, you can run the following command in your terminal:
`npm install react react-dom react-autosuggest react-router-dom node-fetch`

## MovieSearch Component

The `MovieSearch` component is responsible for the search functionality in the application. It makes API requests to retrieve movie suggestions based on the user's search term. The component uses the `react-autosuggest` library for creating the autosuggest input field and the `node-fetch` library for making HTTP requests.

## MovieList Component

The `MovieList` component is responsible for displaying a list of movies based on the user's search. It receives an array of movie objects and renders them in a list format. Each movie in the list is a clickable link that redirects the user to the `MovieDetails` page for that specific movie. The component utilizes the `react-router-dom` library for routing.

Please note that you'll need to pass the movie list as a prop to the `MovieList` component and make sure you set up the routing correctly to navigate to the `MovieDetails` component when a movie is clicked.

## MovieDetails Component

The `MovieDetails` component is responsible for displaying the details of a selected movie. It retrieves the movie details based on the movie's ID from the URL. The component uses the `react-router-dom` library for routing and the `node-fetch` library for making HTTP requests.

Please make sure to provide a valid API key for the movie database API in the respective components' code.

## Contributing

Contributions are welcome! If you have any ideas or improvements for this project, feel free to submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE)
