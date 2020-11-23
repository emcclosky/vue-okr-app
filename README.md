### <a name="ToC"></a>Table of Contents

1. [Overview](#overview)
2. [MVP Checklist](#mvp)
3. [Immediate post-MVP](#post-mvp)

### <a name="overview"></a>Overview

#### Purpose

This application's initial goal is to track individual OKRs with the hope of expanding to track organization and team OKRs with performance metrics.

### <a name="mvp"></a> MVP checklist

- General
  - Frontend
    - [x] Vue impl
      - [x] Design system
  - Backend
    - [ ] Add auth middleware/routes
    - [x] Switch DB from Mongo to Postgres
    - [x] Write DB scripts
    - [x] Basic CRUD operations for OKRs
  - Tests
    - [x] Pick/setup assertion library/runner
      - [x] FE
      - [x] BE
    - [ ] Test coverage acceptable
      - [ ] FE
      - [ ] BE
- Features
  - [x] Registration
    - [x] Back-end logic
    - [x] Front-end view
    - [x] Front-end hooked to back-end
  - [x] Login
    - [x] Back-end logic
    - [x] Front-end view
    - [x] Front-end hooked to back-end
    - [x] JWT w/ Cookies
  - [x] Log out
    - [x] Back-end logic
    - [x] Front-end view
    - [x] Front-end hooked to back-end
- Build/deployment
  - [ ] BE on serverless
  - [ ] Serve statically generated bundle via S3
  - [ ] Figure out a continuous integration pipeline

### <a name="post-mvp"></a> Immediate post-MVP ideas

- [ ] Add Team and Organization options
- [ ] Add reporting
