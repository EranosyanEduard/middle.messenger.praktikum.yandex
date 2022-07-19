# Messenger example

## Описание

Проект создан в рамках 1-го модуля курса "Мидл фронтенд разработчик" образовательной
платформы [Яндекс.Практикум](https://practicum.yandex.ru). Задачей проекта является разработка простого мессенджера без
использования популярных веб-фреймворков.

Для решения указанной задачи используется класс View, который позволяет реализовывать элементы
интерфейса веб-приложения. Кроме того, для организации работы приложения реализованы следующие возможности:

- в качестве альтернативы популярным api для взаимодействия с сервером созданы классы HttpClient и ApiClient, который
  выступает надстройкой над классом HttpClient;
- в качестве альтернативы непосредственному использованию HistoryApi созданы классы Router и Route, выступающие в
  качестве надстройки на HistoryApi;
- для централизованного хранения данных в приложении создан класс Store;
- для организации MVC-архитектуры приложения используются реализации классов Store, Controller и View;

## Установка

Для установки проекта используйте команду `npm i`. Информацию о версии Node.js, которая используется в проекте, вы
найдете в файле [.nvmrc](https://github.com/EranosyanEduard/middle.messenger.praktikum.yandex/blob/sprint_1/.nvmrc).

## Запуск

Для запуска проекта воспользуйтесь командой `npm run serve`. Данная команда создаст в корне проекта каталог dist,
который содержит его сборку, а также запустит ее по адресу `localhost:1234`.

Кроме того, после сборки проекта вы можете запустить его на локальном сервере по адресу `localhost:3000` с помощью
команды `npm run start`.

### Список pull request-ов

1. [Sprint 1](https://github.com/EranosyanEduard/middle.messenger.praktikum.yandex/pull/1)
2. [Sprint 2](https://github.com/EranosyanEduard/middle.messenger.praktikum.yandex/pull/2)
3. [Sprint 3](https://github.com/EranosyanEduard/middle.messenger.praktikum.yandex/pull/3)
4. [Sprint 3](https://github.com/EranosyanEduard/middle.messenger.praktikum.yandex/pull/4)
