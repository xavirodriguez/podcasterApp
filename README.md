# Welcome to PodcasterApp!

Thank you for exploring the PodcasterApp. This documentation will guide you through the setup, features, and how to contribute to the project.

## Getting Started

### Prerequisites

Before you dive in, make sure you have [Yarn](https://yarnpkg.com/) installed on your machine.

### Installation

Use the following command to install the required dependencies:

```shell
yarn install
```

## Usage

Start development mode

```shell
yarn start
```

Start production mode

```shell
yarn start:prod
```

## Features

> This project uses a template that assisted me by providing a solid tool stack and development patterns. It's highly customizable and I really liked some core ideas and features that I think they are a MUST in every project

<dl>
  <dt>State management</dt>
  <dd>This project leverages Redux for efficient state management, providing a predictable way to manage and update the application state.</dd>
 <dt>Redux Persistence API</dt>
  <dd>The data persists locally for 24 hours, minimizing bandwidth usage.</dd>
   <dt>Redux Toolkit</dt>
  <dd>Redux Toolkit provides a simplified syntax for defining "slices" of state and actions, reducing the amount of necessary boilerplate code.</dd>
  <dt>Separation of Asynchronous Logic with Redux-Saga</dt>
  <dd>By using generator functions, we can describe asynchronous logic sequentially. Effects are objects that depict a specific asynchronous task, such as making an API call. This abstraction makes it easier to understand and test the code.</dd>

  <dd></dd>
  <dt> Internationalization with react-i18next </dt>
  <dd>Industry-standard i18n internationalization support is integrated, allowing for easy addition and support of multiple languages in your application.</dd>

  <dt>Typescript</dt>
  <dd>Utilizing TypeScript enhances scalability by building self-documented, easy-to-debug code, promoting maintainability in large applications and codebases..</dd>

  <dt>Quick scaffolding</dt>
  <dd>Generate components, containers, routes, selectors, and sagas - along with their corresponding tests - directly from the command line</dd>

  <dt>SEO Support</dt>
 <dd>This application ensures SEO support by managing document head tags, enabling efficient crawling and indexing by search engines.</dd>

## Contributing

We welcome contributions! Feel free to open an issue or submit a pull request to enhance the project.

## License

This project is licensed under the MIT License. See the LICENSE.md file for details.

## Acknowledgments

This app was proudly made using the official [Create React App](https://github.com/facebook/create-react-app) template of the `discontinued` [React Boilerplate](https://github.com/react-boilerplate/react-boilerplate)
