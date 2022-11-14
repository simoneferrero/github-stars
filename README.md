# GITHUB STARS

Thank you for reviewing my assignment and considering me for the role!

I hope this code shows you my proficiency with the React stack and how I apply common front end patterns and practices.

The application is fairly straightforward: when the page loads, it renders a list of GitHub's top 10 repositories (ordered by star rating) fetched using the search parameter `react`.

The user can also type in a different search term and submit the request, and the results will change according to the new search term.

It is not production-ready (more on this later) and it can be greatly improved, however I tried to stay within the time limits of the task (overall, I spent around 5 hours on this excluding breaks).

I could have probably added more features (such as pagination, or sorting) had I not approached the task in a TDD way, however I thought it would be best to produce cleaner code with a higher coverage rather than adding more features which could potentially be untested.

## Libraries used

- `create-react-app` was the boilerplate that I chose. I could have selected something more complex (such as `next.js`) however I felt that, given the nature of this task, simplicity was the key and server-side rendering would be overkill. In a production environment I would definitely try to render as much markup server-side and send a smaller bundle to the client.
- `apollo-client` was my library of choice to fetch GitHub's GraphQL data; it is not particularly lightweight but it serves the purpose well, and setup is fairly straightforward (although setup it's one of the few areas of the code which I haven't tested).
- `jest` and `@testing-library` are respectively the test runner and testing library that I used to TDD this task. They both came bundled with `create-react-app` so the setup was very simple.
- `prettier` is used to format the code. It integrates with my IDE of choice (`VSCode`), which makes it really easy to use. It is also run on commit to make sure that all changes are formatted following best practices.
- `husky` and `lint-staged` are used to run git hooks on commit and push. Respectively, they run the formatter and the full suite of tests with coverage output.
- `@mui/material` and `emotion` are the design system and CSS-in-JS libraries that I picked for the project. I chose them for the ease of use, although they have only been used on a couple of components and would not have been entirely necessary.
- `typescript` is used to type-check the code and provide helpful auto-completion throughout the application.

## How to's

### How to start the application

As a pre-requisite to run this application, you should have `node` and `yarn` installed on your machine.

After you have cloned this repository locally, you can start it by following these steps:

1. Create a `.env` file at the root of the project, and add the following variables (this is required to authenticate to GitHub's API):

```yaml
REACT_APP_GITHUB_GRAPHQL_ENDPOINT='https://api.github.com/graphql'
REACT_APP_GITHUB_TOKEN='your-github-token'
```

2. Run the following scripts in a terminal window:

```bash
yarn # installs all dependencies
yarn start # loads up the application and makes it available locally with hot reloading
```

3. Visit `http://localhost:3000` to inspect the application and see how changes made to the code are applied.

This will run the application in development mode, which is not optimised nor tree-shaken.

I haven't added specific steps to run it in production mode, which would include building the application and serving it locally using a library such as [`serve`](https://www.npmjs.com/package/serve).

### How to test the application

To run the tests in watch mode, you can run this command in your terminal:

```bash
yarn test
```

Otherwise, to run all tests and see the coverage output, you can run:

```bash
yarn test:ci
```

### How to format the code

This library uses `prettier` and `eslint` to check and format the code. To format all files, you can run the following command in your terminal:

```bash
yarn format
```

Please note that the repository is set up so that the formatter is run on each commit, only on the files that have been changed.

## Future improvements

Had I had more time, this is a list (in no particular order) of some improvements I would make to the code.

- Improve the styles by adopting CSS-in-JS app-wide and making the app mobile-first (it does not work well on mobile currently due to the table).
- Adopt a different design system (or get rid of one at all), especially for the table component - it is very cumbersome and increases the size of the bundle significantly, without providing a lot of value.
- Add pagination. I had a quick look at it but it was not so straightforward as to allow me to do it within the timeframe of the test, so I opted for other improvements instead.
- Some code cleanup, such as variable names and extracting text strings into constants.
- Add the ability to fetch more than 10 results at a time, as well as sort by different fields.
- Adding a GitHub action to run the tests in the pipeline and (eventually) deploy on push with a full CD workflow.
- Test the entire application (including Apollo Provider) by mocking the response from the API at a higher level. Currently, I chose to use Apollo's built in mocked provider for simplicity, but I could also introduce a library such as [`msw`](https://www.npmjs.com/package/msw) to mock the full server response instead.
- Render the application server-side initially (with the initial data fetched from the server) and then hydrate the client with a new fetch if the user modifies the search parameters. I would use `next.js` for the task, however I felt that it was out of scope for the purpose of this test.
- Potentially, add instant search on type with a debounce to make sure that the client doesn't make an excessive number of requests.

## An explanation of some choices I made

- I chose to spend some time at the beginning to set up linting and formatting so that it would be available right away when I started to code the actual application. It was not the most "lean" way to approach it, but it saved me some time later.
- I decided to put the url to GitHub's API as an environment variable because it's usually a best practice to not hardcode these values in the code. This is because, were the url to change, I would need to make code changes and rebuild the entire application, whereas by adding it as and environment variable, all I would have to do would be to change the value and deploy again.
- I decided to go slightly out of the boundaries of the test description by ordering the results by stars. This was because the default order by name returned a list of react clones which I felt would not represent the spirit of the test. In a real world scenario, I would have double-checked this with the team and the product manager to make sure that it would be desired behaviour.
- I purposefully did not look into dockerising the application. It is my personal opinion that for applications such as this one, which can run on any machine that has node installed, it is more cumbersome to install and maintain a docker image than the advantages that it would bring, especially considering that the final bundle should be served to the client from a lambda or even a static cloud service such as AWS, and Docker would be overkill and slow down the development process significantly.

I hope that this gives you insights into my choices and that you find my code to an acceptable level!
