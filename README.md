# OpenAi-WebInterface
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
- For Windows: Install [Docker](https://docs.docker.com/desktop/setup/install/windows-install/) & [Git for Windows](https://gitforwindows.org/)

### Setup
- On your local computer:
    - [Linux] Open a command line terminal
    - [Windows] Open a Git Bash terminal
- Create a working directory, and from this directory clone the application code:
    - git clone https://github.com/pedromartinez079/OpenAI-WebInterface.git
- Create and Run a container for database MongoDB:
    - [Linux] sudo docker pull mongodb/mongodb-community-server:latest
    - [Linux] sudo docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
    - [Windows] docker pull mongodb/mongodb-community-server:latest
    - [Windows] docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
- For Windows, if docker commands fail try to use Windows CMD command line instead of Git Bash
- Create a ".env" file for environment variables:
    - OPENAI_API_KEY=[The_API_KEY_from_Open_AI]
    - MONGODB_IP=[Local_computer_IP_address]
    - MONGODB_PORT=27017

### Install
- Create an image for Docker:
    - [Linux] sudo docker built -t openai-webinterface:0.0.1 .
    - [Windows] docker built -t openai-webinterface:0.0.1 .
- Create and Run a container for the application:
    - [Linux] sudo docker run -d -p 3000:3000 --env-file .env --name openaiwebinterface openai-webinterface:0.0.1
    - [Windows] docker run -d -p 3000:3000 --env-file .env --name openaiwebinterface openai-webinterface:0.0.1

### Usage
- Open a web browser http://[Local_computer_IP_address]:3000
- The application will give you acces to ChatGPT (text) and Dalle (images). For both create a prompt in the message box and send it. Wait for Open AI answer. You can save chat messages and you can load old saved messages
- For ChatGPT you can select a model (o1, o3, gpt), also you can set some parameters such us "temperature" and "top_P" (only for gpt models), and "reasoning_effort" (only for o1 and o3-mini models)
- For Open AI Assistants, you can create and modify assistants and you can attach files
- For an Assistant you can set up tools, tool resources and metadata. To interact with the assistant, first create a Thread, and go to Thread page by a click on Thread ID
- On Thread page, create a message, send it and make a run or execute thread. Wait for assistant answer
- Stop OpenAI WebInterface appplication: 
    - Open a Linux command line terminal or a Git Bash terminal or a Windows CMD
    - [Linux] sudo docker stop openaiwebinterface
    - [Linux] sudo docker stop mongodb
    - [Windows] docker stop openaiwebinterface
    - [Windows] docker stop mongodb
- Start OpenAI WebInterface appplication: 
    - Open a Linux command line terminal or a Git Bash terminal or a Windows CMD
    - [Linux] sudo docker start mongodb
    - [Linux] sudo docker start openaiwebinterface
    - [Windows] docker start mongodb
    - [Windows] docker start openaiwebinterface

## Authors

👤 **Pedro L. Martinez La Rosa**

- Github: [@pedromartinez079](https://github.com/pedromartinez079)
- Twitter: [@crypt079](https://twitter.com/crypt079)
- Linkedin: [pedro-martínezlr](https://linkedin.com/in/pedro-martínezlr/?locale=en_US)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check the [issues page](https://github.com/pedromartinez079/OpenAI-WebInterface/issues).

## Show your support

Give a ⭐️ if you like this project!

## 📝 License

This project is [GNU GPLv3](COPYING) licensed.
