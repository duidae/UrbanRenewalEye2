package main

import (
	"crypto/md5"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

type Meeting struct {
	Type string `json:"類別"`
	Title string `json:"title"`
	StartTime string `json:"會議開始時間"`
    EndTime string `json:"會議結束時間"`
    Address string `json:"地點"`
}

func main() {
	router := gin.Default()

	router.Use(static.Serve("/", static.LocalFile("./build", true)))

    // TODO: crawling https://civil.gov.taipei/News.aspx?n=21E85BBF867C4A19&sms=59AD6E6606F6002F
	router.GET("/fetchMeetings", func(c *gin.Context) {
        meetings := [5]Meeting{
            Meeting {
                Type: "住民大會",
                Title: "臺北市文山區111年度參與式預算提案說明會暨住民大會第4場-景美次分區",
                StartTime: "111-01-26 14:00",
                EndTime: "111-01-26 16:10",
                Address: "景行區民活動中心(臺北市文山區羅斯福路六段393號8樓)",
            },
            Meeting {
                Type: "公聽會",
                Title: "擬訂臺北市北投區溫泉段四小段121地號等30筆(原28筆)土地都市更新事業計畫案-公聽會",
                StartTime: "111-01-13 14:00",
                EndTime: "111-01-13 15:00",
                Address: "本市北投區民活動中心(新市街30號6樓)",
            },
            Meeting {
                Type: "公聽會",
                Title: "擬訂臺北市士林區百齡段五小段543地號等1筆土地都市更新事業計畫及權利變換計畫案-公聽會",
                StartTime: "111-01-11 14:30",
                EndTime: "111-01-11 15:30",
                Address: "本市士林區承德區民活動中心(承德路4段5之1號)",
            },
            Meeting {
                Type: "聽證會",
                Title: "擬訂臺北市南港區南港段二小段378地號等27筆土地都市更新權利變換計畫案-聽證會",
                StartTime: "111-01-05 15:00",
                EndTime: "111-01-05 16:00",
                Address: "本市南港區三重區民活動中心(興東街1號2樓)",
            },
            Meeting {
                Type: "公聽會",
                Title: "擬訂臺北市大安區通化段五小段191-1地號等6筆土地都市更新事業計畫及權利變換計畫案-公聽會",
                StartTime: "111-01-04 15:00",
                EndTime: "111-01-04 16:00",
                Address: "本市都市更新處1703會議室(南京東路三段168號17樓)",
            },
        }

		c.JSON(http.StatusOK, meetings)
	})

	router.NoRoute(func(ctx *gin.Context) {
		file, _ := ioutil.ReadFile("./../client/build/index.html")
		etag := fmt.Sprintf("%x", md5.Sum(file)) //nolint:gosec
		ctx.Header("ETag", etag)
		ctx.Header("Cache-Control", "no-cache")

		if match := ctx.GetHeader("If-None-Match"); match != "" {
			if strings.Contains(match, etag) {
				ctx.Status(http.StatusNotModified)
				return
			}
		}

		ctx.Data(http.StatusOK, "text/html; charset=utf-8", file)
	})

	err := router.Run(":3000")
	if err != nil {
		log.Fatalln("Route can not be run", err)
	}
}