#My Jetpack Addon
A basic add-on

for run add-on:
    `jpm run -b /usr/bin/firefox`
    
Для воспроизведения бага:

1. Перейти на любую страницу
2. Нажать F12. В панели инструментов выбрать вкладку MyAddon
3. В панели инструментов нажать кнопку "Выбрать элемент". После этого будет загружен content script "inspector.js". DOM элемент, на который наводится мышь подсвечивается зелёным. Если кликнуть на DOM элемент - он подсветится синим. При наведении или нажатии на другой dom элемент, старые стили восстанавливаются.
4. В панели инструментов нажать "Вернуть стиль"
5. В консоли можно наблюдать ошибку. previousElem is null
6. Можно продолжить повторять п. 3 и п. 4 
    
    
    
Для нормальной работы:


1. Нажать F12. В панели инструментов выбрать вкладку MyAddon
2. В панели инструментов нажать кнопку "Выбрать элемент".
3. Перейти на любую страницу
4. Кликнуть на любой DOM элемент - он подсветится синим. (можно повторить несколько раз на разных dom-элементах)
5. В панели инструментов нажать "Вернуть стиль" - Стиль элемента будет восстановлен (пропадёт синяя подсветка)
