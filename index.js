const { Builder, By, Key, until } = require('selenium-webdriver');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const baseUrl = 'https://www.indeed.ca/jobs?q=';
const keywords = ['JavaScript', 'Node.js', 'Python', 'React', 'TensorFlow', 'AI', 'API Integration', 'Discord.js', 'Brain.js'];
const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0',
];

const getRandomUserAgent = () => {
    return userAgents[Math.floor(Math.random() * userAgents.length)];
};

const getRandomDelay = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomProxy = () => {
    // Implement your IP rotation logic here or use a proxy service
    // Return a random proxy from your pool
};

// Function to make an Axios request with a delay
const axiosRequestWithDelay = async (url, config) => {
    const delay = getRandomDelay(2000, 5000); // Random delay between 2 and 5 seconds
    console.log(`Delaying request for ${delay / 1000} seconds...`);
    await new Promise((resolve) => setTimeout(resolve, delay)); // Delay using Promises
    return axios(url, config);
};

(async () => {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        const proxy = getRandomProxy(); // Implement your logic to get a random proxy
        const userAgent = getRandomUserAgent();

        for (const keyword of keywords) {
            await driver.get(baseUrl + encodeURIComponent(keyword));
            await driver.wait(until.titleContains('Indeed'), 10000); // Wait for the page to load

            const pageSource = await driver.getPageSource();
            const $ = cheerio.load(pageSource);
            const jobs = [];

            // Update the selector based on the actual structure of the Indeed website
            $('.jobtitle').each(function () {
                const title = $(this).text().trim();
                jobs.push({ title });
            });

            // Make an Axios request with a delay
            const axiosConfig = {
                headers: {
                    'User-Agent': userAgent,
                },
            };
            const axiosResponse = await axiosRequestWithDelay(baseUrl + encodeURIComponent(keyword), axiosConfig);

            // Output to console
            console.log(`Jobs for keyword: ${keyword}`);
            console.log(jobs);

            // Write to a file
            fs.writeFile(`output_${keyword}.json`, JSON.stringify(jobs, null, 2), (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                } else {
                    console.log(`Data for keyword ${keyword} saved to output_${keyword}.json`);
                }
            });
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await driver.quit();
    }
})();
