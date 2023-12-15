import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/app.js';
const { expect } = chai;

chai.use(chaiHttp)

// GET /api/admin/getProviders
describe('get all providers API', () => {
    it('should return all providers when the user is admin', async () => {
        const res = await chai
            .request(app)
            .get('/api/admin/getProviders')
            .set('Authorization', `Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18f`); 
            
        // 进行断言，验证返回的数据是否符合预期
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array').that.is.not.empty; // 验证响应的body是否为数组类型
        for (let i = 0; i < res.body.length; i++) {
            expect(res.body[i]).to.have.property('user_id').that.is.a('string');
            expect(res.body[i]).to.have.property('name').that.is.a('string');
        }
      });

    it('should return unauthorized when user is not an admin', (done) => {
        chai.request(app)
          .get('/api/admin/getProviders') // 更改为你的路由路径
          .set('Authorization', 'Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18') // 设置一个无效的授权令牌
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.text).to.equal('You are not the admin!');
            done();
          });
    });
});

// GET /api/admin/court
describe('get courts API', () => {
    it('should return no court when there is no corresponding court to the filter', async () => {
        const query = {
            ball: [1,2], // 替换成你的测试值
            query_time: '2023-12-15+12:30:00', // 替换成你的测试值
            name: '台灣大學體育組',   // 替换成你的测试值
            address: '文山區',
            page: 1
          };

        const res = await chai
            .request(app)
            .get('/api/admin/court')
            .set('Authorization', `Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18f`)
            .query(query); 
            
        // 进行断言，验证返回的数据是否符合预期
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('total_page').that.is.a('number').equal(0);
        expect(res.body).to.have.property('courts').that.is.a('array').that.is.empty;
      });

      it('should return corresponding courts with the filter and the user is admin', async () => {
        const query = {
            ball: [3], 
            query_time: '2023-12-14+12:30:00', 
            name: '台灣大學體育組',   
            address: '文山區',
            page: 1
          };

        const res = await chai
          .request(app)
          .get('/api/admin/court')
          .set('Authorization', `Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18f`)
          .query(query); 
            
        // 进行断言，验证返回的数据是否符合预期
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('total_page').that.is.a('number');
        expect(res.body).to.have.property('courts').that.is.a('array').that.is.not.empty;
      });

    it('should return unauthorized when user is not an admin', (done) => {
      const query = {
        ball: [3], 
        query_time: '2023-12-14+12:30:00', 
        name: '台灣大學體育組',   
        address: '文山區',
        page: 1
      };
        chai.request(app)
          .get('/api/admin/court') // 更改为你的路由路径
          .set('Authorization', 'Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18') // 设置一个无效的授权令牌
          .query(query)
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.text).to.equal('You are not the admin!');
            done();
          });
    });
});

// GET /api/admin/courtDetail?court_id=
describe('get court detail API', () => {
  it('should return corresponding court detail with the court_id when the user is admin', async () => {
    const query = {
        court_id: 1,
        query_time: '2023-12-14+00:00:00'
    };
    const res = await chai
        .request(app)
        .get('/api/admin/courtDetail')
        .set('Authorization', `Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18f`)
        .query(query); 
          
      // 进行断言，验证返回的数据是否符合预期
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('court_info').that.is.a('array');
      expect(res.body).to.have.property('available_time').that.is.a('array');
      for (let i = 0; i < res.body['appointment'].length; i++) {
          expect(res.body['appointment'][i]).to.have.property('start_time').that.is.a('string').that.is.not.empty;
          expect(res.body['appointment'][i]).to.have.property('end_time').that.is.a('string').that.is.not.empty;
          expect(res.body['appointment'][i]).to.have.property('participant_count').that.is.a('number');
          expect(res.body['appointment'][i]).to.have.property('name').that.is.a('string');
          expect(res.body['appointment'][i]).to.have.property('date').that.is.a('string');
      }
    });

  it('should return no court appointment detail with the court_id that there are no appointments with this court', async () => {
      const query = {
          court_id: 3,
          query_time: '2023-12-14+00:00:00'
      };
      const res = await chai
          .request(app)
          .get('/api/admin/courtDetail')
          .set('Authorization', `Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18f`)
          .query(query); 
            
        // 进行断言，验证返回的数据是否符合预期
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('court_info').that.is.a('array').that.is.not.empty;
        expect(res.body).to.have.property('available_time').that.is.a('array').that.is.not.empty;
        expect(res.body).to.have.property('appointment').that.is.a('array').that.is.empty;
      });

  it('should return unauthorized when user is not an admin', (done) => {
      const query = {
          court_id: 1,
          query_time: '2023-12-14+00:00:00'
      };
      chai.request(app)
        .get('/api/admin/courtDetail') // 更改为你的路由路径
        .set('Authorization', 'Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18') // 设置一个无效的授权令牌
        .query(query)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.text).to.equal('You are not the admin!');
          done();
        });
  });
});

// GET /api/admin/userHistories
describe('get all user API', () => {
  it('should return all users when the user is admin', async () => {
      const res = await chai
          .request(app)
          .get('/api/admin/userHistories')
          .set('Authorization', `Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18f`); 
          
      // 进行断言，验证返回的数据是否符合预期
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array').that.is.not.empty; // 验证响应的body是否为数组类型
      for (let i = 0; i < res.body.length; i++) {
          expect(res.body[i]).to.have.property('user_id').that.is.a('string');
          expect(res.body[i]).to.have.property('name').that.is.a('string');
          expect(res.body[i]).to.have.property('email').that.is.a('string');
          expect(res.body[i]).to.have.property('phone').that.is.a('string');
      }
    });

  it('should return unauthorized when user is not an admin', (done) => {
      chai.request(app)
        .get('/api/admin/userHistories') // 更改为你的路由路径
        .set('Authorization', 'Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18') // 设置一个无效的授权令牌
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.text).to.equal('You are not the admin!');
          done();
        });
  });
});

// GET /api/admin/userHistoryDetail?user_id=
describe('get user detail API', () => {
  it('should return user appointments with the user_id', async () => {
    const query = {
        user_id: 'd82057c8-07dc-00f9-ad60-f70c4624b006',
    };
    const res = await chai
        .request(app)
        .get('/api/admin/userHistoryDetails')
        .set('Authorization', `Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18f`)
        .query(query); 
          
      // 进行断言，验证返回的数据是否符合预期
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array').that.is.not.empty; // 验证响应的body是否为数组类型
    });

  it('should return no user appointment detail with the user_id that there are no appointments with this user', async () => {
      const query = {
          user_id: '111'
      };
      const res = await chai
          .request(app)
          .get('/api/admin/userHistoryDetails')
          .set('Authorization', `Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18f`)
          .query(query); 
            
        // 进行断言，验证返回的数据是否符合预期
        expect(res).to.have.status(404);
        expect(res.text).to.equal("User doesn't exist!");
      });

  it('should return unauthorized when user is not an admin', (done) => {
      const query = {
          user_id: 1
      };
      chai.request(app)
        .get('/api/admin/userHistoryDetails') // 更改为你的路由路径
        .set('Authorization', 'Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18') // 设置一个无效的授权令牌
        .query(query)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.text).to.equal('You are not the admin!');
          done();
        });
  });
});

// POST /api/admin/courtsProvider
describe('post courtProvider API', () => {
  it('should create court provider when the name and email are not duplicated', async () => {
    const body = {
        password: 'test',
        name: 'unittest1',
        email: 'unittest1@gmail.com',
        phone: '0933229944'
    };
    const res = await chai
        .request(app)
        .post('/api/admin/courtsProvider')
        .set('Authorization', `Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18f`)
        .send(body);
          
      // 进行断言，验证返回的数据是否符合预期
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message').to.equal('新增完成!'); 
      expect(res.body).to.have.property('user_id').that.is.a('string');
      expect(res.body).to.have.property('role_id').to.equal(3); 
    });

  it('should return 名稱和電子郵件重複! when the name and email are duplicated', async () => {
    const body = {
        password: 'test',
        name: 'unittest1',
        email: 'unittest1@gmail.com',
        phone: '0933229944'
    };
    const res = await chai
        .request(app)
        .post('/api/admin/courtsProvider')
        .set('Authorization', `Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18f`)
        .send(body);
            
        expect(res).to.have.status(200);
        expect(res.text).to.equal("名稱和電子郵件重複!");
      });

  it('should return 名稱重複! when the name is duplicated', async () => {
    const body = {
        password: 'test',
        name: 'unittest1',
        email: 'unittest2@gmail.com',
        phone: '0933229944'
    };
    const res = await chai
        .request(app)
        .post('/api/admin/courtsProvider')
        .set('Authorization', `Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18f`)
        .send(body);
            
        expect(res).to.have.status(200);
        expect(res.text).to.equal("名稱重複!");
      });

  it('should return 電子郵件重複! when the email is duplicated', async () => {
    const body = {
        password: 'test',
        name: 'unittest2',
        email: 'unittest1@gmail.com',
        phone: '0933229944'
    };
    const res = await chai
        .request(app)
        .post('/api/admin/courtsProvider')
        .set('Authorization', `Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18f`)
        .send(body);
            
        expect(res).to.have.status(200);
        expect(res.text).to.equal("電子郵件重複!");
      });

  it('should return unauthorized when user is not an admin', (done) => {
      const body = {
        password: 'test',
        name: 'unittest3',
        email: 'test3@gmail.com',
        phone: '0933229944'
      };
      chai.request(app)
        .post('/api/admin/courtsProvider')
        .set('Authorization', 'Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab1') 
        .send(body)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.text).to.equal('You are not the admin!');
          done();
        });
    });
});

// GET /api/admin/user?user_id
describe('get user info API', () => {
  it('should return user detail when the user is admin', async () => {
      const query = {
        user_id: '419b0bc1-6eba-4d70-b43a-c6b14d3fa849'
      };
      const res = await chai
          .request(app)
          .get('/api/admin/user')
          .set('Authorization', `Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18f`)
          .query(query);
          
      // 进行断言，验证返回的数据是否符合预期
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array').that.is.not.empty; // 验证响应的body是否为数组类型
    });

    it('should return user detail when the user is admin', async () => {
      const query = {
        user_id: '419b0bc1-6eba-4d70-b43a-c6b14d3fa'
      };
      const res = await chai
          .request(app)
          .get('/api/admin/user')
          .set('Authorization', `Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18f`)
          .query(query);
          
      // 进行断言，验证返回的数据是否符合预期
      expect(res).to.have.status(404);
      expect(res.body).to.equal("User doesn't exist!"); // 验证响应的body是否为数组类型
    });

  it('should return unauthorized when user is not an admin', (done) => {
    const query = {
      user_id: '419b0bc1-6eba-4d70-b43a-c6b14d3fa849'
    };
      chai.request(app)
        .get('/api/admin/user') // 更改为你的路由路径
        .set('Authorization', 'Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18') // 设置一个无效的授权令牌
        .query(query)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.text).to.equal('You are not the admin!');
          done();
        });
  });
});

// PUT /api/admin/user?user_id
describe('put user API', () => {
  it('should return user detail when the user is admin', async () => {
      const query = {
        user_id: '5c2c3e35-2d78-46b4-9356-ac165d3e66b3'
      };
      const body = {
        "password": "password123",
        "name": "unittest_use1",
        "email": "unittest_use1@gmail.com",
        "phone": "09123",
        "line_id": "123456"
      }
      const res = await chai
          .request(app)
          .put('/api/admin/user')
          .set('Authorization', `Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18f`)
          .query(query)
          .send(body);
          
      // 进行断言，验证返回的数据是否符合预期
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('string').to.equal('變更完成!'); // 验证响应的body是否为数组类型
    });

    it('should return 名稱和電子郵件重複！ when the email and phone are duplicated', async () => {
      const query = {
        user_id: '5c2c3e35-2d78-46b4-9356-ac165d3e66b3'
      };
      const body = {
        "password": "password123",
        "name": "unittest_use1",
        "email": "unittest_use1@gmail.com",
        "phone": "09123",
        "line_id": "123456"
      }
      const res = await chai
          .request(app)
          .put('/api/admin/user')
          .set('Authorization', `Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18f`)
          .query(query)
          .send(body);
          
      // 进行断言，验证返回的数据是否符合预期
      expect(res).to.have.status(200);
      expect(res.text).to.be.an('string').to.equal('名稱和電子郵件重複!'); // 验证响应的body是否为数组类型
    });
    
    it('should return 名稱重複！ when the email and phone are duplicated', async () => {
      const query = {
        user_id: '5c2c3e35-2d78-46b4-9356-ac165d3e66b3'
      };
      const body = {
        "password": "password123",
        "name": "unittest_use1",
        "email": "unittest2@gmail.com",
        "phone": "09123",
        "line_id": "123456"
      }
      const res = await chai
          .request(app)
          .put('/api/admin/user')
          .set('Authorization', `Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18f`)
          .query(query)
          .send(body);
          
      // 进行断言，验证返回的数据是否符合预期
      expect(res).to.have.status(200);
      expect(res.text).to.be.an('string').to.equal('名稱重複!'); // 验证响应的body是否为数组类型
    });

    it('should return 電子郵件重複！ when the email and phone are duplicated', async () => {
      const query = {
        user_id: '5c2c3e35-2d78-46b4-9356-ac165d3e66b3'
      };
      const body = {
        "password": "password123",
        "name": "unittest2",
        "email": "unittest_use1@gmail.com",
        "phone": "09123",
        "line_id": "123456"
      }
      const res = await chai
          .request(app)
          .put('/api/admin/user')
          .set('Authorization', `Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18f`)
          .query(query)
          .send(body);
          
      // 进行断言，验证返回的数据是否符合预期
      expect(res).to.have.status(200);
      expect(res.text).to.be.an('string').to.equal('電子郵件重複!'); // 验证响应的body是否为数组类型
    });

  it('should return unauthorized when user is not an admin', (done) => {
    const query = {
      user_id: '5c2c3e35-2d78-46b4-9356-ac165d3e66b3'
    };
    const body = {
      "password": "password123",
      "name": "unittest2",
      "email": "unittest2@gmail.com",
      "phone": "09123",
      "line_id": "123456"
    }
      chai.request(app)
        .put('/api/admin/user') // 更改为你的路由路径
        .set('Authorization', 'Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18') // 设置一个无效的授权令牌
        .query(query)
        .send(body)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.text).to.equal('You are not the admin!');
          done();
        });
  });
});

// DELETE /api/admin/user?user_id
describe('delete user info API', () => {
  it('should return unauthorized when user is not an admin', (done) => {
    const query = {
      user_id: '5c2c3e35-2d78-46b4-9356-ac165d3e66b3'
    };
      chai.request(app)
        .delete('/api/admin/user') // 更改为你的路由路径
        .set('Authorization', 'Bearer 60b59b1f-b') // 设置一个无效的授权令牌
        .query(query)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.text).to.equal('You are not the admin!');
          done();
        });
  });
  
  it('should delete user when the user is admin', async () => {
      const query = {
        user_id: '5c2c3e35-2d78-46b4-9356-ac165d3e66b3'
      };
      const res = await chai
          .request(app)
          .delete('/api/admin/user')
          .set('Authorization', `Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18f`)
          .query(query);
          
      // 进行断言，验证返回的数据是否符合预期
      expect(res).to.have.status(200);
      expect(res.body).to.equal('刪除完成!'); // 验证响应的body是否为数组类型
    });

    it('should delete no user when there is no user with this user_id', async () => {
      const query = {
        user_id: '419b0bc1-6eba-4d70-'
      };
      const res = await chai
          .request(app)
          .delete('/api/admin/user')
          .set('Authorization', `Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18f`)
          .query(query);
          
      // 进行断言，验证返回的数据是否符合预期
      expect(res).to.have.status(200);
      expect(res.text).to.equal('沒有此使用者'); // 验证响应的body是否为数组类型
    });
});