# MQTT Example Project

This project demonstrates the benefits of MQTT and a pub/sub architecture over an HTTP poller loop on a timer. It is a simple Node.js application with a REST API for HTTP polling and a basic web page "UI".

## Project Structure

- **Node.js App**: Implements both MQTT and HTTP polling mechanisms.
- **REST API**: Provides endpoints for HTTP polling.
- **Web Page UI**: Basic interface to interact with the application.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd mqtt-example
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

- To start the application in development mode with nodemon:
  ```bash
  npm run dev
  ```

### Environment Variables

- Create a `.env` file in the root directory and configure the necessary environment variables.

## Built With

- [Express](https://expressjs.com/) - Web framework for Node.js
- [dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from a `.env` file
- [nodemon](https://www.npmjs.com/package/nodemon) - Utility that monitors for any changes in your source and automatically restarts your server
- [mqtt](https://www.npmjs.com/package/mqtt) - MQTT client for Node.js and the browser

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspiration and resources for learning about MQTT and pub/sub architectures.
