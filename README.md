# Сборка
videochatru-mitm предоставляется только в образовательных целях, поэтому я не могу распространять его в собранном виде.  
Если вы хотите изучить работу videochatru-mitm, то вам придется собрать его самостоятельно.  
Вам придётся склонировать/скачать репозиторий, скачать [nodejs](https://nodejs.org/en/download), открыть командную строку в репозитории и следовать инструкции.

# Сборка под Windows

```bash
> cd src
> npm install
> npm run build
```

# Сборка под Linux и MacOs
Сборка под Linux и MacOs не имеет смысла, так как videochatru-mitm зависит от VoiceMeeter Potato, который доступен только на Windows.

# Запуск в режиме отладки

```bash
> cd src
> npm install
> npm start -- --dev
```