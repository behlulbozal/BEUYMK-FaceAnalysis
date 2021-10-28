const video = document.getElementById('video')
const pathname = '';
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri(pathname + 'assets/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri(pathname + 'assets/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri(pathname + 'assets/models'),
  faceapi.nets.faceExpressionNet.loadFromUri(pathname + 'assets/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia({
      video: {}
    },
    stream => video.srcObject = stream,
    err => {
      return console.error(err)
    }
  )
}

function RecurringTimer(callback, delay) {
  var timerId, start, remaining = delay;

  this.pause = function () {
    window.clearTimeout(timerId);
    remaining -= new Date() - start;
  };

  var resume = function () {
    start = new Date();
    timerId = window.setTimeout(function () {
      remaining = delay;
      resume();
      callback();
    }, remaining);
  };

  this.resume = resume;

  this.resume();
}

function showPopUp(res, base64) {
  // if (!document.getElementById("frame")) {
  var agge = ';'
  if(res.age > 30){
    agge= res.age-10
  }else{
    agge= res.age

  }
  var eklenecek = '<div class="first child"><img src="' + base64 + '" width="280" height="280" class="img"></div><div class="second child"><h3>Yaş:' + agge + '</h3><h3>Baskın Duygu :' + res.dominant_emotion + '</h3><h3>Baskın Irk : ' + res.dominant_race + '</h3><h3>Cinsiyet :' + res.gender + '</h3></div>';
  var div = document.createElement('div');
  div.id = 'frame';
  div.innerHTML = eklenecek;
  div.className = 'frame';
  document.body.appendChild(div);
  // }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function TextToSpeak() {
  var liste = [
    'ooo kimleri görüyorum',
    'ekle beni, göz kırpma emojisi',
    'Hatalıysam aramızda kalsın!',
    'seni incelemek çok zor oldu',
    'bu gözler, bu gülüş aman allahım',
    'oha, gözlerim kamaşıyor',
    'Çok şekilsin, benden şekil olan önümden çekilsin',
    'Nası ama yapıyorum şovumu',
    'Yalan paralı olsa kredi çeker yine söylerim',
    'Vay vay vay kimleri görüyorum',
    'Uzun zamandır bu kadar güel bir yüz görmemiştim',
    'Gözlerinin güzelliğinden arkadaşım teslaya bahsedeceğim',
    'yüzün altın orana tam oturuyor, bilgin olsun'
  ]
  let utter = new SpeechSynthesisUtterance();
  utter.lang = 'tr-TR';
  utter.text = liste[randomInt(0,liste.length-1)];
  utter.volume = 0.5;
  window.speechSynthesis.speak(utter);
}

function sendToFlask(base64) {
  var eklenecek = '<div class="frame"><img src="assets/loadng.gif" alt=""></div>';
  var div = document.createElement('div');
  div.id = 'frame';
  div.innerHTML = eklenecek;
  div.className = 'frame';
  document.body.appendChild(div);
  // console.log(base64)
  var formdata = new FormData();
  formdata.append("fotograf", base64);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:5000/fotograf", requestOptions)
    .then(response => response.json())
    .then((res) => {
      var el = document.getElementById('frame');
      el.remove();
      showPopUp(res, base64);
      TextToSpeak();
      console.log(res)
    })

}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  let width = video.getBoundingClientRect().width;
  let height = video.getBoundingClientRect().height;
  const displaySize = {
    width: width,
    height: height
  }
  faceapi.matchDimensions(canvas, displaySize)
  var popUpBaslat = false;
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)

    canvas.getContext('2d').clearRect(0, 0, width, height)
    if (popUpBaslat == false) {
      if (detections[0].expressions.happy > 0.99 || detections[0].expressions.angry > 0.99) {
        popUpBaslat = true;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        let image_data_url = canvas.toDataURL('image/jpeg');
        sendToFlask(image_data_url)
        setTimeout(function () {
          var el = document.getElementById('frame');
          el.remove();
          setTimeout(() => {
            popUpBaslat = false
          }, 5000, popUpBaslat);
        }, 10000);
      }
    }

    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 50, popUpBaslat)
})