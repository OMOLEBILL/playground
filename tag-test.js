const { execSync } = require('child_process');
const fs = require('fs');

console.log('Current working directory:', process.cwd());

// Define the path to the testplan file
const testplanPath = './.allure/testplan.json';

// Check if the testplan exists, and if so, print its contents
if (fs.existsSync(testplanPath)) {
  console.log('Testplan file found. Contents:');
  console.log(fs.readFileSync(testplanPath, 'utf-8'));
} else {
  console.log('No testplan file found at', testplanPath);
}

// Use provided environment variable or fallback to default.
const env = process.env.NODE_ENV || 'staging';
// Use the provided tag; if not provided, tag remains undefined (or empty).
const tag = process.env.TAG;

if (tag) {
  console.log(`Running tests with NODE_ENV=${env} and TAG=${tag}`);
} else {
  console.log(`Running all tests with NODE_ENV=${env} (no TAG provided)`);
}

// Conditionally add the grep argument if a tag is provided.
const grepArg = tag ? ` -g "${tag}"` : '';

// Build the command.
const cmd = `npx cross-env NODE_ENV=${env} playwright test --config=playwright.config.ts${grepArg}`;
execSync(cmd, { stdio: 'inherit' });
