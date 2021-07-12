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

### package.json의 기능
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

### express를 이용한 build server
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

<br>

### middleware
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

#### 외부 middleware
> nodejs의 모든 소프트웨어는 next()를 가진 middleware이다.
* log를 관리하는 'morgan'
* `npm i morgan`을 이용해서 설치 후
* `app.use(morgan("option"));` 으로 middleware처럼 사용

<br>

## 2021.04.28

### Router
* 웹사이트의 url을 compact있게 관리해주는 express의 기능
* Router is beggining of URL

### nodejs file의 특징
* 모든 nodejs file은 module이자 bubble이다.
* 모든 파일은 isolated
* import와 export의 활용

### nodejs의 export
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

### ':id' 에 대한 이해
> URL parameter.
* url에 존재하는 변수라고 생각하면 됨
* `:` 이 존재하지 않으면 url로 인식하기 때문에 반드시 써야된다.
* `req.params`를 통해서 그 값을 받아올 수 있다.
* 'get' 함수와 같이 사용할 때 그 위치가 중요하다
  * 일반적인 url을 받아오기 전에 그 위에 `:id`가 존재한다면, express는 일반적인 url을 변수로 착각한다.
  * 따라서 `:id`는 아래쪽으로 몰아주는 것이 좋다.
#### !이 문제를 해결하기 위해 정규식을 사용할 수 있다.

### router과 정규표현식의 관계
* `(\\d+)` 는 숫자만 포함된 string을 가져온다는 것을 의미하는 정규식

### pug
* HTML template을 return 하는 기능을 제공하는 module
* `app.set('view engine', 'pug')` 를 이용해서 확장팩을 설치
* express는 'views' 폴더 안에 있는 pug file들을 default로 찾는다
  * `res.render("views/filename");`을 이용해서 pug파일을 rendering

#### pug의 partials
* template간 중복되는 내용들을 따로 나눠서 관리 및 사용
* `include 폴더/파일이름.pug`로 사용

<br>

## 2021.05.02

### Inheritance
> base of a layout, base of html
* `extends file_name` 을 통해서 템플릿을 가져올 수 있다
* `block`
  * 무언가를 넣을 수 있는 창이 생긴다고 생각하면 됨
  * `block block_name`을 쓰고 원하는 내용을 넣으면 완성

### Variables to Templates
  * `#{}`: javascript code를 넣을 수도 있고, variable 처럼 사용할 수도 있다.
  * controller에서 variable을 보내줘야 한다.
  * `res.render("edit", {pageTitle: "Edit"});`

### mvp.css
  * put default style at the html temlplates
  * 일시적인 solution으로 ugly한 html을 보기 싫다면 적용해라

### Conditionals to Templates
  * `tag=variable` 의 형식으로 하면 `=`뒤의 내용이 text가 아닌 variable로 적용된다.
    * `#{variable}`과 동일한 기능을 함
    * 하지만 이 경우에는 다른 text와 섞을 수 없으며, 오직 하나의 variable만을 가질 때 사용한다.
  * `if varialble.property`의 형태로 사용
  ```javascript
    const fakeUser = {
    username: "Lee",
    loggedIn: false
      };

    if fakeUser.loggedIn
        li 
            a(href="/login") Logout
    else
        li 
            a(href="/login") Login
  ```

### Iteration to Temlplates
```javascript
array = [1, 2, 3, 4, 5];
each item in array
  li=item // li #{item}
```

### Mixins
* partial과 비슷한 개념
* data를 불러오는 partial이라고 생각하면 좋다.
* pre made html block

### Database
* pug 파일 안에서 백틱기호를 사용하면 javscript 문법을 사용할 수 있다.

<br>

## 2021.05.03

### form
* `action`: 내가 정보를 보내고 싶은 곳 (url)
* get과 post
  * get은 서버로부터 무언가를 받아올 때 사용
  * post는 서버(데이터베이스)로 무언가를 전달할 때 사용
* `method="POST"` 사용하기
  * `router.post(url, callback)`
* `get()`과 `post()` 한번에 다루기
  * `videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);`

### express.urlencoded()
* 내 서버가 form을 이해하고 이것을 javascript 코드로 변환시켜주는 middleware
* `input(name="value")`: value와 같은 이름의 객체 프로퍼티 안에 post한 내용이 들어감
* 이 middleware를 통해서 `req.body`의 프로퍼티가 생성된다.

### Database
* mongoDB
  * Document-base-database: JSON-like document 형식으로 저장된다.
  * `mongo` 명령어를 통해 mongo shell로 접속할 수 있다.
* mongoose
  * mongoDB와 nodejs를 이어주는 프레임워크
  * mongoose는 data를 자동으로 validate해준다. 즉 잘못된 타입의 data를 자동적으로 걸러줌
* 사용법
```javascript
import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube", 
{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const db = mongoose.connection; // excess current connection

const handleOpen = () => console.log("Connected to DB!");
db.on("error", (error) => console.log("DB Error", error));
db.once("open", handleOpen);
```
  * 연결할 때는 server 파일에서 db파일만 import하면 된다. `import ./db`

### Mongoose CRUD
* model
  * database의 전체적인 모양을 mongoose에게 알려줘야한다.
  * we need to define shape of the data's model = schema
* model 사용법
  * model이 있는 파일을 import
  * database 파일을 불러올 때 시간이 걸릴 수 있으므로 'callback' or 'promise'를 사용한다.
  * `model.find()` 를 이용해서 database를 가져올 수 있다.

### async await
```javascript
Videos.find({}, (err, videos) => {
    if (err) {
        return res.render("server-error");
    }
    return res.render("home", { pageTitle: "Home", videos });
})

export const home = async (req, res) => {
    try {
        const videos = await Video.find({});
        return res.render("home", { pageTitle: "Home", videos });
    } catch {
        return res.render("Error Page");
    }
}
```
* callback 함수를 이용해서 javascript의 행동을 늦추는 방법을 좀 더 쉽게 하기 위한 문법

### Database #2
* model을 이용해서 data 객체를 만들기
* `객체.save()` 함수를 통해 database에 저장하기
* 혹은 `객체.create()`를 이용해서 바로 저장하기
* mongoose는 잘못된 data type을 자동으로 걸러준다.

<br>

## 2021.05.06

### mongoose
* schema 안에 `default: `를 넣게 되면 데이터가 생설될 때 자동으로 생성
  * `createdAt: { type: Date, required: true, default: Date.now }` 
  * `Date.now()`라고 함수를 바로 실행하면, schema file이 저장된 시간으로 저장됨
  * 따라서 `Date.now` 처럼 함수를 실행하지 않아야 한다.
* error 처리
  * 우리가 작성한 데이터 모델과 다른 형식의 값이 들어오면 mongoose에서는 이를 error 처리한다. 이때 페이지는 rendering 되지 않고 무한 loading에 들어가므로 이를 처리해줘야 한다.
  * `try catch(error)`를 이용해서 처리
* schema opitons
  * trim
  * minLength, maxLength
    * html과 database에서 보안상의 이유로 많이 사용됨
    * 양쪽에서 double check가 되기 때문에 더욱 안전하게 사용할 수 있다.
  * uppercase, lowercase
* middleware
  * mongoose에도 middleware가 존재
  * 무언가를 저장하기 전에 checking process가 필요할 때 사용
  * 예를 들어서 comment를 database에 저장하기 전에 bad word를 찾아주는 middleware를 사용

### mongoDB ID
* mongoDB ID는 24바이트 hex로 입력이 된다.
* `[0-9a-f]{24}` 정규식을 이용해서 id를 가져오기
* `Model.findById()`를 이용해서 id에 따라 db를 가져오기
  * `Model.findByIdAndUpdate()`를 이용해서 db를 update할 수 있다.
* `Model.exists({ _id: id })`
  * model이 존재하는지 존재하지 않는지 true or false로 return 해주는 함수
  * postEdit 에서는 model 자체를 가져올 필요가 없기 때문에 사용

## 2021.05.08

### mongoose middlewares
* `schema.pre('save', function(){})`
  * document의 save option에 대한 middleware
  * model을 만들기 전 middleware가 위치해야 한다.
  * `this` 객체는 만들어 둔 schema 객체를 가리킴
* `schema.static('name', function(){})`
  * schema를 생성할 때 method를 포함시킴
  * 이후 `model.staticName()`으로 호출해서 사용 가능

### Delete dbs
* `Modle.findByIdAndDelete(id)`

### Data Query Function
* `Model.sort()` 를 이용해서 data를 정리할 수 있다
* `req.query`
  * url에서 '?' 뒤쪽에 해당하는 query string이 저장된 공간
  * input tag 에서 name을 통해 value를 받아오면 property로 저장됨
* RegExp를 이용해서 find() 를 좀 더 정교하게 만들 수 있음
  * mongoDB의 `$`(text operator) 를 이용하기 

### Create User Authentication
* video page를 만드는 것과 동일한 방식으로 user db를 만들고 page를 rendering
* password에 대한 보안이 필요, 이를 해결하기 위한 방법이 존재

### hashing password
* password를 db에 그대로 저장하는 것은 매우 위험하다
* 이를 피하는 방법이 해싱(hashing)
* 해싱은 일방향 함수이며, 절대로 출력값으로 입력값을 알 수 없다
* 같은 입력값으로는 같은 출력값을 얻는다.
* 'bcrypt'
  * hashing을 해주는 api
```userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 5);
})
```

## 2021.05.09

### `$or` operator

### status code
`res.status(400).render()`
* 브라우저는 개발자가 에러를 출력하고 있다는 사실을 모른다
* 그렇기 때문에 `status(숫자)`를 이용해서 브라우저에게 이러한 사실을 알려야함

### login form 만들기
* 해싱된 패스워드를 어떻게 check 하는가?
  * 입력값에 대한 출력값은 항상 같다
  * 유저가 패스워드를 입력하면 이를 가져다 해싱해서 그 값이 우리의 db에 있는 값과 일치하는지 보면 됨
  * `bcrypt.compare()`


## 2021.05.11

### session & cookies
* session
  * 백엔드와 브라우저 간에 어떤 활동을 했는지 기억
  * 브라우저와 벡엔드 사이의 memory, history
* cookie
  * 유저가 요청을 할 때 백엔드에서 유저에게 무언가를 건넨다
  * somthing like piece of text
* express-session
  * 자동으로 cookie를 유저에게 보내주는 middleware
  * `req.headers`를 이용해서 cookie를 받아올 수 있다.
  * 어떤 유저가 우리에게 request 했는지를 백엔드가 알고 있다.

### Logged in User
* login controller에서 login을 했다면 
  * session object에 `loggedIn = true` 정보와
  * `user = user` 정보를 추가해주는 코드 삽입

### res.locals
* pug templates에서 `res.locals`에 접근할 수 있다.
* 자동으로 연결해주고, 별다른 수식어 없이 `#{변수명}`만 넣으면 된다.

## 2021.05.14

### session & MongoDB
* 현재 상태는 session에 loggedIn User의 정보를 저장
  * 하지만 server를 재시작하게 되면 session의 정보가 사라진다
* connect-mongo
  * server-side에 있는 session 정보를 mongoDB에 저장하기 위한 모듈
  * app.use(session) 부분에
  * `store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/wetube" })` 를 추가
  * 이를 통해서 session ID를 memory에 저장하는 것이 아닌 DB에 저장하도록 만듬

### Uninitialized Sessions
* 만약 모든 알 수 없는 사용자들에게 쿠키를 주고 이를 DB에 저장한다면 엄청난 부하가 생길 수 있다
* 그렇기 때문에 session의 save 옵션을 false로 바꿔야한다.
* 이를 통해서 `postLogin` 컨트롤러에서 session 부분을 수정할 때 intialize가 일어나고 이때 DB에 session ID가 저장되게 하는 것

### Properties of cookies
* maxAge
  * session의 만료 날짜를 1밀리초 단위로 설정할 수 있다.

### `.env` && `dotenv`
* github에는 우리의 비밀스러운 코드가 올라가면 안된다.
* 이를 위해서 `.env` 파일을 만든 후 `.gitignore`에 이를 추가
* `dotenv`
  * `process.env` 에 variable을 추가해주는 모듈
  * 가능한 빨리 require 해야하는데, 최대한 빨리 env를 불러오기 위함
  * `require("dotenv").config()`를 통해 실행

## 2021.05.17

### github social login
* OAUTH 를 이용한 유저로그인 방법
* flow
  1. 사용자를 깃헙 authentication page로 redirection
  2. 사용자가 깃헙에 의해 사이트로 redirection
      * 이 과정에서 `fetch`를 이용함
      * access-token을 가져온다
  3. 앱이 사용자의 access-token을 이용해서 API에 접근

### OAUTH
* github -> settings -> OAUTH -> new OAUTH
* URL에서 여러가지 옵션을 조정할 수 있다
  * `allow_signup=false`
    * 오직 github 사용유저만이 login 할 수 있게끔 만들어주는 옵션
  * `scope`
    * login 할 때 public data 이외에 우리가 원하는 정보를 얻을 수 있게 해주는 옵션

### `URLSearchParams()`
* 객체를 url의 query string으로 변환시켜주는 함수

### node-fetch
* nodejs에는 fetch 기능이 없기 때문에 이를 위한 패키지가 필요함

### `res.session.destroy()`
* 현재 남아 있는 session을 없애는 함수
* logout page에서 사용됨

## 2021.05.20

### Edit Profile
* route, controller, template에 대한 복습 진행
* middleware를 이용해서 user 정보를 쉽게 pug로 넘겨주는 방법
* login 하지 않은 사람이 `/user/edit` url로 접근하는 것을 막기 위한 방법
  * middleware를 이용해서 중간 과정에서 걸러내기
  * `all(protectMiddleware)`을 이용하면 어떠한 http method의 경우에도 middleware을 사용

### Update Profile
* postEdit controller 에서 mongoose와 `req.body`, `req.session`을 이용해서 DB수정
* session을 업데이트 해주는 과정이 필요하다.

## 2021.05.21

### Change Password
* change password에 대한 controller, template을 만듬
* bcrypt를 이용해서 hash된 비밀번호를 비교하는 과정을 거침
* mongoose의 save 기능을 이용해서 DB를 업데이트

## 2021.05.25

### Upload Files
* multer
  * file upload를 도와주는 middleware
  * form을 통해서 img를 받아와서 `req.file`에 파일 정보를 저장
  * `export const uploadFiles = multer({ dest: "uploads/" });` 와 같은 middleware를 만들어서 사용
* DB에는 파일을 절대 저장하면 안된다!! 대신에 파일의 url을 저장하는 것이 맞다

### Static Files Serving
* 폴더 전체를 브라우저에게 노출시키는 것을 의미

## 2021.05.31

### Upload Video
* fileSize
  * upload되는 filedml size를 조절할 수 있는 multer의 옵션
* `enctype="multipart/form-data"`
  * multer를 이용해서 데이터를 받아들여올 때 form tag에 반드시 입력해야 되는 옵션
* form을 이용해서 file을 받아오고, "uploads/videos"에 파일을 저장, 이후 `req.file.path`를 db에 저장하고 이를 이용해서 template에서 video를 rendering

### Connect Video & User
* 전체적인 방법
  * `req.session`에 저장되어 있는 user_id 를 이용
  * video를 생성할 때 `user._id`를 저장하면 db끼리 연결이 가능
  * 이를 이용해서 다양한 기능을 만들어냄
* mongoose의 `populate()`
  * mongoose의 `ref` 옵션을 이용
  * `populate("relation")`을 작성하면 mongoose가 연관된 db자료를 연결시켜줌

### Bug Fix
1. mongoose 에서 `pre("save")`를 사용했기 때문에 video를 업로드할 때마다 password가 hash되는 문제점이 발생
  * 이를 위해서 아래와 같이 `isModified()` 함수를 사용
  * `isModified()`는 객체의 어느 부분이 수정되었을 때 `true`를 반환하는 함수
    ```js
    userSchema.pre('save', async function() {
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 5);
        }
    })
    ```
2. owner가 아닌 사람이 editVideo를 할 수 없게 하기
  * db안의 내용들을 가지고 condition을 만들기
  ```js
      if(String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
  ```

## 2021.06.02

### Webpack
* 우리가 주는 모든 파일을 받아서 다른 파일로 처리, 변경해주는 모듈
* 대부분 webpack을 직접 사용하지 않고, webpack을 포함한 툴을 사용한다
* 따라서 어지간하면 개발자들이 직접 webpack 파일을 설정할 필요가 없다

### Webpack Configuration
* webpack, webpack-cli 설치
* `webpack.config.js` 파일 생성
  * `entry`와 `output` 이라는 필수요건 작성
* `path.resolve()`, `__dirname`
  * `path.resolve(arg1, arg2, arg3)`: arg들을 모아서 path를 생성
  * `__dirname`: 파일까지의 모든 경로를 나타냄
* rules
  * 특정 종류의 파일들에게 변형을 적용시키는 방법을 정리해놓는 객체
* mode
  * 'production': 완성된 이후 압축된 코드
  * 'development': 아직 개발중인 단계에서 보여지는 코드
=> entry, output, rules 는 webpack의 가장 기본적인 구조!!!

### Webpack을 이용한 front-end 연결과정
1. browser에서 동작할 `js`파일 생성
2. webpack 설정을 통해 압축된 `js`파일 생성
3. server에서 압축된 `js`파일을 사용
4. pug에 `js`파일 적용 후 rendering

### babel-loader & SCSS-loader
webpack의 rule 안에서 사용할 모듈들
* babel-loader
  * back-end의 babel과 동일한 역할을 함
  * front-end에서 사용할 코드를 옛날 코드로 compile
* sass-loader css-loader style-loader
  * sass-loader: scss의 코드를 css코드로 변환시켜주는 loader
  * css-loader: @import와 url을 풀어서 해석하주는 loader
  * style-loader: css를 DOM에 주입하는 loader

### Webpack plugin
* Mini-Css-Extract-Plugin
  * 현재까지 우리의 webpack은 css를 javascript에 삽입했다
  * css파일을 따로 분리해서 관리하기 위해 필요한 plugin

## 2021.06.04
### CSS Part


## 2021.06.07
### Video Player


## 2021.06.09
### Javascript Event에 대한 모든 것
#### mousemove
#### mouseleave
#### setTimeout(function(), 시간)
  * 어떠한 function을 내가 설정한 시간 뒤에 실행하게끔 하는 함수
  * 이 함수는 특정한 id를 return 한다
#### clearTimeout(id)
  * setTimeout()에서 return한 특정한 id를 인자로 받음
  * 이 id를 부여받은 함수의 실행을 멈춤

## 2021.06.14

### api views
* 템플릿을 rendering 하지 않는 view

### data attribute
* 프론트에서 필요한 데이터를 HTML에 저장하기 위해 필요한 속성
* `dataset` property 이용해서 접근할 수 있음

## 2021.06.16

### FFmpeg
* 비디오의 형식 변환, 화질, 썸네일제작 등을 할 수 있는 소프트웨어

### WebAssembly
* 프론트엔드에서 매우 빠른 코드를 실행할 수 있게 해준다
* JS가 아니어도 다른 언어를 사용할 수 있다

### FFmpeg.wasm

## 2021.06.21
### express-flash
* 사용자에게 flash message를 남길 수 있게 해주는 middleware
* message는 session에 기반하기 때문에 한 명의 사용자에게만 보여줄 수 있다
* `app.use(flash());` -> `req.flash`에 접근할 수 있음
* `messages` 라는 locals가 자동적으로 생겨서 템플릿에서 이를 이용할 수 있다

## 2021.06.28
### 배포하기
1. Babel CLI를 이용해서 Javascript 코드 변경하기
    - Babel-node를 그대로 사용하는 것은 느리기 때문에 Performance가 좋지 못함
    - 아마존server에 파일을 올리기 전에 Javascript 코드를 변경할 필요가 있음
    - Babel CLI를 이용 최신 Javscript를 호환성이 높은 예전 Javascript코드로 변경
    - 이후 Babel을 이용해서 server를 시작하는 것이 아닌 node를 이용해서 서버를 시작하게끔 변경
2. Frontend Build
   -  webpack의 설정을 development->production으로 변경
   -  `webpack --mode=production`와 같은 옵션을 넣어주면 됨
3. Heroku 내부에 우리의 서버를 옮기기
    - ID생성, app만들기
    - Heroku Git으로 올리기 or Github으로 올리기
    - Heroku는 git history에 있는 파일들만 읽을 수 있다
    - 하지만 `.env`파일은 gitignore에 존재하기 때문에 MongoUrl을 불러올 수 없는 오류가 발생

## 2021.07.12
### 배포하기 이어서
4. MongoDB Atlas
  - Cluster
    - Database 그룹과 같은 의미
    - 생성을 할 때는 무료버전으로 진행
    - user password는 반드시 기억해야함
    - 생성 이후 나오는 DB_URL이 진짜 DB와 연결할 URL
5. Heroku setting
  - DB_URL을 연결하고 보관하기 위해 Heroku application 이용
    - settings -> reveal config vars
    - 이곳에서 DB_URL 변수를 추가
6. process.env 변수 추가
  - COOKIE_SECRET 역시 Heroku에서 변수로 지정해주어야함
7. Web process failed to bind to $PORT error
   - `PORT:4000` 은 Heroku가 우리에게 준 `PORT`가 아님
   - Heroku는 `PORT`를 랜덤으로 지정해서 주기 떄문에 이를 연결해야함
8. Github Login
   - 이 부분 역시 `.env`에 `GH_CLIENT`, `GH_SECRET`이 없기 때문에 추가
   - Redirect Url도 heroku로 바꾸기
  
### Gitbut으로 배포하기
1. 