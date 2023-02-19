# Dweeter
Express 학습을 위해 서버메모리를 이용한 심플 트위터 기능 구현 프로젝트

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
- Path: `/users/login`
- Parameter: X
- Body
	- id: String
	- password: String

#### 회원가입
- Method: `POST`
- Path: `users/register`
- Parameter: X
- Body
	- id: String
	- password: String
	- name: String
	- email: String
	- Profile Image URL: ??

### 게시글 기능
#### 게시글 등록
Method: `POST`
- Path: `/posts`
- Parameter: X
- Body
	- userId: Number
	- contents: String

#### 전체 게시글 조회
Method: `GET`
- Path: `/posts`
- Parameter: X
- Body X

#### 특정 유저 게시글 조회
Method: `GET`
- Path: /posts
- Parameter: { userId: number }
- Body X

#### 게시글 수정
- Method: `PATCH` or `PUT`
- Parameter: { postId: number }
- Body
	- contents: String

#### 게시글 삭제
- Method: `DELETE`
- Parameter: { postId: number }
- Body X
