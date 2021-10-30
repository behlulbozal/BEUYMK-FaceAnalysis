### Özelikler

- Yüzünüzü algılar ve işaretçiler yerleştirir
- %95 üzeri bir gülümseme veya sinir algılanırsa fotoğraf çekilir.
- Çekilen bu fotoğraf Back End'e gönderilir ve analiz edilir.
- Analiz sonrası demografik bilgiler (Irk, Yaş, Cinsiyet, Duygu Durumu) Front End'e geri döner
- Geri dönen bilgiler açılan bir popup sayesinde kullanıcılara gösterilir.

# BEUYMK - FaceAnalysis

###### 1-  Önce Front End'i ayağa kaldırıyoruz.
`Node.js, Npm, Electron.js kurulu olması gerekiyor.`

```bash
cd Final-Project
npm i
npm start
```

> Front End kısmımız şu anda ayağa kalktı, electron.js bizim için bir uygulama açtı ve orada yüz takibine başladı. 

###### 2-  Şimdi de Back End'i ayağa kaldırmamız gerekiyor
`Flask, DeepFace modülleri kurulu olması gerekiyor.`
```bash
cd Python-Codes
python app.py
```
> Şimdi Back End 5000 portunda ayağa kalktı (eğer farklı portta kalktıysa Final-Project/src/assets/script.js 105. Satırdaki adresi değiştiriniz.)

------------


### Bağımlılıklar
- Electron.js
- Flask
- DeepFace
- FaceApi.js


------------
### KATKI

> <a href="https://github.com/behlulbozal" target="_blank" rel="noopener noreferrer"><img src="https://avatars.githubusercontent.com/u/57594143?v=4?sanitize=true" height="60px"></a> Behlül Bozal

> <a href="https://github.com/dduyguu" target="_blank" rel="noopener noreferrer"><img src="https://avatars.githubusercontent.com/u/82756783?v=4?sanitize=true" height="60px"></a> Duygu Işık

> <a href="https://github.com/krakendev35" target="_blank" rel="noopener noreferrer"><img src="https://avatars.githubusercontent.com/u/72042467?v=4?sanitize=true" height="60px"></a> Barış Yiğit