'use strict';

let numLength = 3 ; //記憶する数字の最初の長さ
let resultSum = ''; //記憶する数字
let inputNum; //入力した数字
let count;　//記憶時間の残りカウント
let timer;　//setIntervalを変数に入れる為の変数
let intervalID;　//setInterval() の戻り値

//カウントスタート
function countStart(){
  count = 3;
  timer = setInterval('countDown()',1000);
}
//カウントストップ
function countStop(){
  //タイマーを解除
  clearInterval(timer);
  document.getElementById("countdown").innerHTML  = '';
}
//カウントダウン
function countDown(){
  //カウントを表示
  document.getElementById("countdown").innerHTML  =  `<h2>あと${count}</h2>`;
  count--;　//1ずつ減少
  if(count < 0){
    countStop();
  }
}

//数字入力時の画像(./img の下に think1~3.pngとして配置)
const images = ["./img/think1.png", "./img/think2.png", "./img/think3.png"];
let countImg = 0;

//画像数を超えたら元に戻る
const slideImg = function(){
  if(countImg >= images.length){
    countImg = 0;
  }
  else{
    document.getElementById('picture1').src = images[countImg];
    countImg++;
  }
}
// 1秒毎にスライドを変える
const startImg = function(){  
  intervalID = setInterval(slideImg, 1000);     
}

//記憶する数字を作成
function makeRandomNum(){ 
  const source = "0123456789" ;　//記憶する数字の一覧
  //指定された長さまで一覧からランダムに数字を作成する
  for(let i=0; i<numLength; i++){
    let result = source[Math.floor(Math.random() * source.length)];
    resultSum = resultSum + result
  }
  //記憶すべき数字を表示する
  document.getElementById("outputnum").innerHTML = `<h1>${resultSum}</h1>`;
  countStart();　//カウントスタート
  setTimeout(hideNum , 4000 );　//4秒後に数字を隠す
  document.getElementById('picture1').src = '';　//画像を消す
  document.getElementById("startButton").innerHTML = '';　//スタートボタンを消す
}

//記憶する数字を隠して入力欄と画像を出す
function hideNum(){
  document.getElementById("outputnum").innerHTML = '';
  document.getElementById("message2").innerHTML = `<h1>覚えた数字を入力してね</h1>`;
  document.getElementById("inputField").innerHTML = '<input id="inputnum"　class="block" type="text" size="30" maxlength="10">';
  document.getElementById("checkButton").innerHTML = '<input class="btn" type="button" value="確　認" onclick="check();">';
  document.getElementById('picture1').src = './img/think1.png';
  // 1秒毎にスライドを変える
  startImg() ;
}

//数字が一致しているか確認する
function check(){
  clearInterval(intervalID); 
  inputNum = document.getElementById("inputnum").value;　//入力した数字を変数にする 
  const resultImg = ["./img/win.png", "./img/lose.png"];　//正解・不正解時の画像
  if (resultSum === inputNum){
    //正解
    //10桁覚えたら終了
    if (numLength >= 10){
      gameEnd();
      //3~9桁まで正解
      }else{
      document.getElementById("answer").innerText = "正解";
      document.getElementById("nextGame").innerHTML = '<input class="btn" type="button" value="一桁増えるよ" onclick="nextGame();">';
      document.getElementById('picture1').src = './img/win.png'
    }
    //不正解
    }else{
    document.getElementById("answer").innerText = "不正解";
    document.getElementById("againButton").innerHTML = '<input class="btn" type="button" value="もう一度最初から" onclick="again();"></input>';
    document.getElementById('picture1').src = './img/lose.png';
  }
  document.getElementById("message2").innerHTML = '';
  document.getElementById("inputField").innerHTML = '';
  document.getElementById("checkButton").innerHTML = '';
}

//ゲーム終了
function gameEnd(){ 
  document.getElementById('picture1').src = './img/end.png';
  document.getElementById("message1").innerHTML = `<h1 id="message1" class="block">正解。10桁覚えたね。</br>すごい！！</h1>`;
  document.getElementById("nextGame").innerHTML ='';
  document.getElementById("againButton").innerHTML = '<input class="btn" type="button" value="もう一度最初から" onclick="again();"></input>';
}

//次のゲームへ
function nextGame(){
  document.getElementById("outputnum").value = '';
  document.getElementById("answer").innerText = '';
  document.getElementById("nextGame").innerHTML = '';
  resultSum = '';
  inputNum = '';
  numLength++;  //記憶する数字を一桁増やす
  makeRandomNum(); //記憶する数字を作成
}

//もう一度最初から
function again (){
  resultSum = ''; 
  numLength = 3;
  document.getElementById("message1").innerHTML = `<h1 id="message1" class="block">数字記憶ゲーム</h1>`;
  document.getElementById("startImg").innerHTML = '<img src="./img/number.jpg" id="picture1" alt=""　width="200" height="200">';
  document.getElementById("startButton").innerHTML = '<input class="btn" type="button" value="スタート" onclick="makeRandomNum();">';
  document.getElementById("againButton").innerHTML = '';
  document.getElementById("answer").innerText = '';
}



