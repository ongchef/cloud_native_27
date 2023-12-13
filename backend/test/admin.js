import chai from 'chai'
import chaiHttp from 'chai-http'
import * as app from '../src/app.js';
const { expect } = chai;

chai.use(chaiHttp)

describe('getAllProviders API', () => {
    it('should return all providers when the user is admin', (done) => {
        chai.request(app)
      .get('/api/admin/getProviders') // 更改为你的路由路径
      .set('Authorization', 'Bearer 60b59b1f-b9c7-7bfe-43a6-9a42089ab18f') // 设置授权令牌
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        // 在这里编写更多的期望断言，根据你的API返回结果定义断言
        done();
      });
    })

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