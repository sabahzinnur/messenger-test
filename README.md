# simplemessenger
#Задача: сделать простой список сообщений.

Окно делится на две части: слева - список диалогов, справа - окно отображения сообщений.
В левой части отображается собеседник, дата диалога и часть первого сообщения.
В правой части отображается список сообщений с указанием автора, текста сообщения и даты.
Также, здесь внизу расположено поле, которое позволяет добавить запись в текущий диалог.

Требования:
- Приложение должно быть реализовано на Vue JS с использованием Vuex или подобного
- При открытии диалога, на правой стороне со списком сообщений отображается анимированный лоадер (анимация загрузки)
- Верстка без использования CSS фреймоворков

Важно! Создайте приложение в лучших традициях компонентного подхода.
Представьте, что приложение будет дальше развиваться и обрастать разным функционалом.

#Реализация:

# Vue features
    -Vuex
    -Vue router
    -Vue filters
    -Vue directives
    -Vue plugins
    -Global events bus

# Demo

   https://simplemessenger-c6b84.web.app/

    Для просмотра демо можно зарегистрироваться в двух разных браузерах, под разными именами,
 и проверить работоспособность приложения 
    Или же используйте уже готовые учетные записи
   - winny@example.com
   - rabbit@example.com
   - owl@example.com
   - pig@example.com

   Пароль ко всем учетным записям: 654123456

## Project setup
```
yarn install

add your firebase project configuration into project file:  /src/config/firebaseConfig.js

```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
