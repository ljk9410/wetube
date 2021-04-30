# Youtube Clone Coding

<br>

## 2021.04.23

* nodejs가 뭔지, npm, 
* package.json
  * 파일의 정보를 저장하는 공간
  * nodejs 프로젝트를 만들 때 가장 먼저 만들어야 할 파일
  * 이름은 반드시 `package.json`이어야 함
* npm init
  * package.json을 만들어 준다.

<br>

## 2021.04.26

### <package.json의 기능>
---
  ```javascript
    "scripts": {
    "win": "node index.js"
  }, 
  ```
  * `"scripts"`
    * 단순히 실행하고 싶은 것을 의미한다.
    * `"원하는 이름"`
    * 'npm run 지정한 이름' 을 콘솔에서 실행한다면 지정한 key에 적혀있는 문장을 실행
    * 프로젝트 폴더 안에서 명령어를 실행해야 함

* dependencies의 중요성
  * express를 사용하기 위해서는 다른 패키지들이 필요하다. -> dependencies에 저장
  * `npm i express`를 이용해서 설치를 진행하면 node_modules라는 폴더가 생김
  * 이 폴더 안에 모든 dependencies를 설치하게 됨
    * npm은 똑똑하기 때문에 파일이 없어지더라도 dependencies를 보고 필요한 module을 자동적으로 install함
    * 즉 package.json과 dependencies는 매우매우 중요하다
    * github에는 node_modules 폴더를 따로 올릴 필요가 없이 dependencies만 알려주면 된다. -> `npm i`로 모든 정보를 install
    * 프로젝트를 공유하고 싶다면 package.json과 index.js만 보내면 된다.

* 'babel'이란 무엇인가?
  * 'babel'은 javascript 컴파일러이다.
  * nodeJs가 이해하지 못하는 최신 javascript가 존재하기 때문에 이를 컴파일 시켜주는 것
  * 설치하기
    * `npm install --save-dev @babel/core` 
    * `--save-dev`는 devDependencies에 저장하라는 뜻
      * 'devDependencies'란 개발자에게만 필요한 dependencies
      * 'dependencies'는 우리 프로젝트가 동작하는데 필요한 것들을 의미
  * nodemon
    * 우리가 만든 파일이 수정되는걸 감시해주는 패키지
    * 파일이 수정되면 nodemon이 자동적으로 재시작해줌
```javascript
  // 최종 script
  "scripts": {
    "dev": "nodemon --exec babel-node index.js"
        //자동수정 및 재시작 / 최신 js
}
```

### <express를 이용한 build server>
---
```javascript
import express from "express";

const app = express();

// server가 시작될 때 port번호와 callback 함수를 호출
const handleListening = () => console.log("Server listening on port 4000!!");
app.listen(4000, handleListening);
```
* 서버란 무엇인가?
  * 서버란 24시간 내내 온라인에 연결된 컴퓨터
  * 클라이언트의 request를 listen하고 그에 맞는 respond를 함

* GET method
  * http의 method 중 하나
  * 브라우저는 server에 웹사이트를 request하고 페이지를 get 해온다
  * 웹사이트에 접속하면 이 모든 일이 자동으로 이루어진다.
  * get request에 대한 respond를 반드시 해줘야 한다.

```javascript
const handleHome = (req, res) => {
  return res.end();
}
app.get("/", handleHome);
```
* request와 response
* `res.end()` or `res.send("hello world")` 를 이용해서 request를 마무리
* 가장 중요한 것은 'request를 받고 response를 해준다'이다

### <middleware>
---
> 중간에 있는 소프트웨어를 칭함. middleware은 req와 res 사이에 있는 소프트웨어이다.
* 모든 controller, handler는 middleware가 될 수 있다
```javascript
const gossipMiddleware = (req, res, next) => {
    console.log("i am in the middle");
    next();
}
```
* middleware에는 next() 함수가 argument로 존재한다.
* 중간에 끼어있는 software이기 때문에 다음 함수를 호출해야 하기 때문에 next()가 존재한다.
* middleware에 next()가 없다면 절대로 다음 함수가 호출되지 않는다.
* middleware는 request를 지속할 뿐 request를 종료하지 않는다.
* `app.use(callback);`
  * middleware을 호출하기 위한 함수
  * 함수를 호출하는 위치, 순서가 중요하다.

#### <외부 middleware>
---
> nodejs의 모든 소프트웨어는 next()를 가진 middleware이다.
* log를 관리하는 'morgan'
* `npm i morgan`을 이용해서 설치 후
* `app.use(morgan("option"));` 으로 middleware처럼 사용

<br>

## 2021.04.28

### <Router>
---
* 웹사이트의 url을 compact있게 관리해주는 express의 기능
* Router is beggining of URL

### <nodejs file의 특징>
---
* 모든 nodejs file은 module이자 bubble이다.
* 모든 파일은 isolated
* import와 export의 활용

### <nodejs의 export>
---
> js 파일을 module로 변경해주는 중요한 명령어
* `export defalut`와 `export`
  * `export default`
    * 변수 하나를 export해서 다른 곳에서 import를 할 때 아무 이름으로 import 할 수 있다.
  * `export`
    * default가 없이 export를 하는 경우 다른 곳에서 import를 할 때는 반드시 export한 파일에서 정의한 변수 이름으로 해야한다.
```javascript
import globalRouter from "./routers/globalRouter";
import { trending } from "../controllers/videoController";

export const trending = (req, res) => res.send("Home Page Videos");

const globalRouter = express.Router();
export default globalRouter;
```
 
<br>

## 2021.04.30

### <':id' 에 대한 이해>
---
> URL parameter.
* url에 존재하는 변수라고 생각하면 됨
* `:` 이 존재하지 않으면 url로 인식하기 때문에 반드시 써야된다.
* `req.params`를 통해서 그 값을 받아올 수 있다.
* 'get' 함수와 같이 사용할 때 그 위치가 중요하다
  * 일반적인 url을 받아오기 전에 그 위에 `:id`가 존재한다면, express는 일반적인 url을 변수로 착각한다.
  * 따라서 `:id`는 아래쪽으로 몰아주는 것이 좋다.
#### !이 문제를 해결하기 위해 정규식을 사용할 수 있다.

### <router과 정규표현식의 관계>
---
* `(\\d+)` 는 숫자만 포함된 string을 가져온다는 것을 의미하는 정규식

### <temlplate>
---
* String 대신 HTML을 send 하기 위한 template