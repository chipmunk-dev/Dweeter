# Dweeter

Express 학습을 위해 서버메모리를 이용한 심플 트위터 기능 구현 프로젝트

# Schema

## 트윗

```json
{
	id: number,
	text: string,
	createdAt: Date,
	name: string,
	username: string,
	url: string
}
```

## 유저

```json
{
	id: number,
	userName: string,
	password: string,
	email: string,
	name: string,
	url: string
}
```

# 요구사항 분석 및 Rest API 디자인

## 기능

- 로그인
- 회원가입
- 전체 포스트(트윗) 조회
- 내 포스트 조회
- 특정 유저 포스트 조회
- 새로운 포스트 등록
- 포스트 내용 수정
- 포스트 내용 삭제

## API Document

### 회원 기능

#### 로그인

- Method: `POST`
- Path: `/auth/login`
- Parameter: X
- Body
  - userName: string
  - password: string

#### 회원가입

- Method: `POST`
- Path: `/auth/signup`
- Parameter: X
- Body
  - userName: string
  - password: string
  - email: string
  - name: string
  - url: string

#### 인증

- Method: `GET`
- Path: `/auth/auth`
- Parameter: X
- Body: X

### 게시글 기능

#### 전체 게시글 조회

- Method: `GET`
- Path: `/tweets`

#### 특정 유저 게시글 조회

- Method: `GET`
- Path: `/tweets`
- PathVariable: { userId: number }

#### 특정 게시글 조회

- Method: `GET`
- Path: `/tweets/:id`

#### 게시글 등록

- Method: `POST`
- Path: `/tweets`
- Body
  - text: string
  - name: string
  - userId: string
  - url: string

#### 게시글 수정

- Method: `PATCH` or `PUT` + `/:id`
- Body
  - text: String

#### 게시글 삭제

- Method: `DELETE/:id`
