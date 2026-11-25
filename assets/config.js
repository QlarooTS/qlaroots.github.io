/* ============================================================
   ЕДИНОЕ МЕСТО НАСТРОЕК САЙТА
   ------------------------------------------------------------
   downloadUrl    – откуда кнопка качает ZIP.
                    По умолчанию файл лежит в репозитории:
                    ./downloads/Zaltett2.zip
                    Если хочешь раздавать через Google Drive,
                    вставь прямую ссылку на ФАЙЛ (не на папку):
                    https://drive.usercontent.google.com/download?id=ID_ФАЙЛА&export=download&confirm=t

   fileName        – имя файла при скачивании (работает для своего домена).
   defaultServerUrl – адрес сервера по умолчанию. Подставляется во все
                     упоминания на странице и в макете popup.
   serverDisplay   – текст, который «печатается» в макете на главной.
   ============================================================ */
window.ZALTETT2_CONFIG = {
  downloadUrl: "./downloads/Zaltett2.zip",
  fileName: "Zaltett2.zip",
  defaultServerUrl: "https://8000-isx0bdbob8dt55f541oxm.e2b.app",
  serverDisplay: "https://8000-isx0bdbob8dt55f541oxm.e2b.app"
};
