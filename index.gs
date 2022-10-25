var token = TELEGRAM_WEB_TOKEN;// Get Telegram web token from BotFather telegram
var SheetID = GOOGLE_SHEET_ID ;// Get ID path from URL Spreadsheets
var UrlPublish = GOOOGLE_DEPLOYMENT_URL ; // Deploy a web app as Anyone
var telegramUrl = "https://api.telegram.org/bot" + token;

function setWebhook() {
var url = telegramUrl + "/setWebhook?url=" + UrlPublish;
var response = UrlFetchApp.fetch(url);
}

function doPost(e) {
  var stringJson = e.postData.getDataAsString();
  var updates = JSON.parse(stringJson);

    if(updates.message.text){ // if chat is present
      sendText(updates.message.chat.id,generateMessage(updates.message.text)); // generateMessage function
    }
}

function getsheet(){
  var rangeSheet = 'Sheet1!A2:F';
  var rows = Sheets.Spreadsheets.Values.get(SheetID, rangeSheet).values;
  return rows;
}

function getDate(date){
  return new Date(date)
}


function generateMessage(chat){
  var data = [{}];
  data=chat.split('/'); // chat -> id/DOB format
  date=new Date(data[1])
  var sheet_datas = getSheet();
  //Two step authentication

  for (var row = 0; row < sheet_datas.length; row++) { 
    if(sheet_datas[row][0]==data[0]){// Step 1 auth ID sheet in column 0
        if(+getDate(sheet_datas[row][1]) === +getDate(data[1])){// Step 2 auth D.O.B sheet in Column 1
          return  "Column2_name : "+ sheet_datas[row][2] +"\n" + //column 3
                  "Column3_name : "+ sheet_datas[row][3] +"\n" + //column 4
                  "Columnn_name : "+ sheet_datas[row][n] +"\n" + //column n
                  
          }
        else
          return "please enter correct DOB (<FORMAT>)"
    }
  }

  return "Enter you ID/DOB: ";
}


function sendText(chatid,text,replymarkup){
var data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chatid),
      text: text,
      parse_mode: "HTML",
      reply_markup: JSON.stringify(replymarkup)
    }
  };
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}
