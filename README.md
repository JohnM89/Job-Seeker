# Job Scraper 🕵️

A Node.js application designed to scrape job listings from Indeed using Selenium for web navigation, Cheerio for parsing HTML, Axios for making HTTP requests, and writing the results into JSON files. Perfect for job seekers and data enthusiasts!

## Features 🌟

- **Web Scraping** 🌐: Navigates Indeed job listings using Selenium.
- **Data Extraction** 📊: Parses job titles from the Indeed page source using Cheerio.
- **Delay & User-Agent Randomization** ⏳: Implements delays between requests and rotates user-agents to mimic human behavior and avoid detection.
- **File Output** 📁: Writes scraped job titles into JSON files, one for each keyword.

## Technologies Used 💻

- Selenium: For automated web navigation.
- Cheerio: For parsing and manipulating HTML.
- Axios: For making HTTP requests.
- fs: For file system operations.

## Setup 🛠

1. **Install Node.js**: Ensure Node.js is installed on your system.
2. **Clone the Repository**: Clone this repository to your local machine.
3. **Install Dependencies**: Navigate to the cloned directory and run `npm install` to install required dependencies.
4. **Run the Script**: Execute the script with `node index.js` (assuming the script is named `index.js`).

## Configuration ⚙️

- **Keywords**: Customize the `keywords` array in the script to search for different job titles or technologies.
- **User Agents**: Modify the `userAgents` array to include different user agents for requests.
- **Proxies**: Implement `getRandomProxy` function if using proxies for IP rotation.

## Note 📝

This script is intended for educational purposes and should be used responsibly. Be mindful of the terms of service of any website you scrape.

## License 📜

This project is open-sourced under the MIT License. See the [LICENSE](LICENSE) file for more details.
