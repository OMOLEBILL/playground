# Use the official Playwright image which includes Node and all browsers pre-installed
FROM mcr.microsoft.com/playwright:latest

# These defaults can be overridden when running the container.
ENV ALLURE_TOKEN=""
ENV ALLURE_JOB_RUN_ID=""
ENV ALLURE_ENDPOINT="https://demodomain.testops.cloud/"
ENV ALLURE_PROJECT_ID=1
ENV ALLURE_RESULTS="./reports/allure"

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to leverage Docker caching
COPY package*.json ./

# Install project dependencies
RUN npm ci

# Copy the rest of the project files into the container
COPY . .

# Create the Allure results directory required for test reports
RUN mkdir -p $ALLURE_RESULTS

# Install allurectl (adjust the version and URL as needed)
RUN curl -L https://github.com/allure-framework/allurectl/releases/download/2.16.0/allurectl_linux_amd64 \
    -o /usr/local/bin/allurectl && chmod +x /usr/local/bin/allurectl

