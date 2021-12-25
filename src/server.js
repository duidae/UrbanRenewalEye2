const express = require("express");
// const nodeFetch = require("node-fetch");
const path = require("path");

const Server = express();

// TODO: api changed
// const MEETING_JSON_URL = "https://civil.gov.taipei/OpenData.aspx?SN=881665EB5B77192F";

Server.use(express.static(path.join(__dirname, "build")));

Server.get("/fetchMeetings", async (req, res) => {
    try {
        /*
        const response = await nodeFetch(MEETING_JSON_URL);
        const text = await response.text();
        console.log(`Fetch ${MEETING_JSON_URL} successfully.`);
        */
        const meetings = JSON.stringify([
            {
                類別: "住民大會",
                title: "臺北市文山區111年度參與式預算提案說明會暨住民大會第4場-景美次分區",
                會議開始時間: "111-01-26 14:00",
                會議結束時間: "111-01-26 16:10",
                地點: "景行區民活動中心(臺北市文山區羅斯福路六段393號8樓)"
            },
            {
                類別: "公聽會",
                title: "擬訂臺北市北投區溫泉段四小段121地號等30筆(原28筆)土地都市更新事業計畫案-公聽會",
                會議開始時間: "111-01-13 14:00",
                會議結束時間: "111-01-13 15:00",
                地點: "本市北投區民活動中心(新市街30號6樓)"
            },
            {
                類別: "公聽會",
                title: "擬訂臺北市士林區百齡段五小段543地號等1筆土地都市更新事業計畫及權利變換計畫案-公聽會",
                會議開始時間: "111-01-11 14:30",
                會議結束時間: "111-01-11 15:30",
                地點: "本市士林區承德區民活動中心(承德路4段5之1號)"
            },
            {
                類別: "聽證會",
                title: "擬訂臺北市南港區南港段二小段378地號等27筆土地都市更新權利變換計畫案-聽證會",
                會議開始時間: "111-01-05 15:00",
                會議結束時間: "111-01-05 16:00",
                地點: "本市南港區三重區民活動中心(興東街1號2樓)"
            },
            {
                類別: "公聽會",
                title: "擬訂臺北市大安區通化段五小段191-1地號等6筆土地都市更新事業計畫及權利變換計畫案-公聽會",
                會議開始時間: "111-01-04 15:00",
                會議結束時間: "111-01-04 16:00",
                地點: "本市都市更新處1703會議室(南京東路三段168號17樓)"
            }
        ]);
        return res.send(meetings);
    } catch (error) {
        console.error(error);
    }
});

Server.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

Server.listen(process.env.PORT || 8080);
