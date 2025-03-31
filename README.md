# OpenAi WebInterface
**Web interface to interact with Open AI tool such us ChatGPT, Dalle and Open AI Assistants.**

## Built With
- JavaScript,
- NextJS,
- OpenAI API,
- Code-Server, VS Code for web browser

## Getting Started
To get a local copy up and running follow these steps.

### Prerequisites
- Get an [Open AI account and an API key](https://platform.openai.com/docs/overview)
- For Linux: Install [Docker](https://docs.docker.com/desktop/setup/install/linux/)
- For Windows: Install [Docker](https://docs.docker.com/desktop/setup/install/windows-install/)
- For Windows: Install [Git for Windows](https://gitforwindows.org/)

### Setup
- On your local computer:
    - [Linux] Open a command terminal
    - [Windows] Open a Git Bash terminal
- Create a working directory, and from this directory clone the application code:
    - git clone git@github.com:pedromartinez079/OpenAI-WebInterface.git
- Create and Run a container for database MongoDB:
    - [Linux] sudo docker pull mongodb/mongodb-community-server:latest
    - [Linux] sudo docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
    - [Windows] docker pull mongodb/mongodb-community-server:latest
    - [Windows] docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
- Create a ".env" file where the Open AI API key will be stored:
    - OPENAI_API_KEY=[The_API_KEY_from_Open_AI]
    - MONGODB_IP=[Local_computer_IP_address]
    - MONGODB_PORT=27017

### Install
- Create an image for Docker:
    - [Linux] sudo docker built -t openai-webinterface:0.0.1 .
    - [Windows] docker built -t openai-webinterface .
- Create and Run a container for the application:
    - [Linux] sudo docker run -d -p 3000:3000 --env-file .env --name openaiwebinterface openai-webinterface:0.0.1
    - [Windows] docker run -d -p 3000:3000 --env-file .env --name openaiwebinterface openai-webinterface:0.0.1

### Usage
- Open a web browser http://[Local_computer_IP_address]:3000
- The application will give you acces to ChatGPT (text) and Dalle (images). For both create a prompt in the message box and send it. Wait for Open AI answer. You can save chat messages and you can load old saved messages
- For ChatGPT you can select a model (o1, o3, gpt), also you can set some parameters such us "temperature" and "top_P" (only for gpt models), and "reasoning_effort" (only for o1 and o3-mini models).
- For Open AI Assistants, you can create and modify assistants and you can attach files.
- For an Assistant you can set up tools, tool resources and metadata. To interact with the assistant, first create a Thread, and go to Thread page by a click on Thread ID.
- On Thread page, create a message, send it and make a run or execute thread. Wait for assistant answer.

## Authors

👤 **Pedro L. Martinez La Rosa**

- Github: [@pedromartinez079](https://github.com/pedromartinez079)
- Twitter: [@crypt079](https://twitter.com/crypt079)
- Linkedin: [pedro-martínezlr](https://linkedin.com/in/pedro-martínezlr/?locale=en_US)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check the [issues page](issues/).

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc

## 📝 License

This project is [MIT](lic.url) licensed.
