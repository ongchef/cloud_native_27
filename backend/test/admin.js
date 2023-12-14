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
            query_time: '2023-12-15 12:30:00', // 替换成你的测试值
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
            date: '2023-12-14 12:30:00', 
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
        chai.request(app)
          .get('/api/admin/court') // 更改为你的路由路径
          .set('Authorization', 'Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18') // 设置一个无效的授权令牌
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
        court_id: 1
    };
    const res = await chai
        .request(app)
        .get('/api/admin/courtDetail')
        .set('Authorization', `Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18f`)
        .query(query); 
          
      // 进行断言，验证返回的数据是否符合预期
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array').that.is.not.empty; // 验证响应的body是否为数组类型
      for (let i = 0; i < res.body.length; i++) {
          expect(res.body[i]).to.have.property('start_time').that.is.a('string');
          expect(res.body[i]).to.have.property('end_time').that.is.a('string');
          expect(res.body[i]).to.have.property('participant_count').that.is.a('number');
          expect(res.body[i]).to.have.property('name').that.is.a('string');
          expect(res.body[i]).to.have.property('address').that.is.a('string');
      }
    });

  it('should return no court detail with the court_id that there are no appointments with this court', async () => {
      const query = {
          court_id: 3
      };
      const res = await chai
          .request(app)
          .get('/api/admin/courtDetail')
          .set('Authorization', `Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18f`)
          .query(query); 
            
        // 进行断言，验证返回的数据是否符合预期
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array').that.is.empty; // 验证响应的body是否为数组类型
      });

  it('should return unauthorized when user is not an admin', (done) => {
      const query = {
          court_id: 1
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
describe('get court detail API', () => {
  it('should return user appointments with the user_id', async () => {
    const query = {
        user_id: 'd82057c8-07dc-00f9-ad60-f70c4624b006'
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

// PUT /api/admin/user?user_id

// DELETE /api/admin/user?user_id