import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/app.js';
const { expect } = chai;

chai.use(chaiHttp)

// GET /api/users/appointment/join
describe('get appointment join API', () => {
    it('should return courts when there are corresponding courts to the filter', async () => {
        const query = {
            ball: 3, 
            query_time: '2023-11-21+10:00:00',   
            address: '文山區',
            public_index: 1
          };

        const res = await chai
            .request(app)
            .get('/api/users/appointment/join')
            .set('Authorization', `Bearer df882093-0955-b49f-1660-ab04ae44c926`)
            .query(query); 
            
        // 进行断言，验证返回的数据是否符合预期
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('total_page').that.is.a('number');
        expect(res.body).to.have.property('courts').that.is.a('array').that.is.not.empty;
        for (let i = 0; i < res.body['courts'].length; i++) {
            expect(res.body['courts'][i]).to.have.property('public').to.equal(1);            
        }
    });

      it('should return no courts with the filter', async () => {
        const query = {
            ball: 3, 
            query_time: '2023-11-21+10:00:00',   
            address: '文山區',
            public_index: 0
          };

        const res = await chai
            .request(app)
            .get('/api/users/appointment/join')
            .set('Authorization', `Bearer df882093-0955-b49f-1660-ab04ae44c926`)
            .query(query);
            
        // 进行断言，验证返回的数据是否符合预期
        expect(res).to.have.status(200);
        expect(res.body).that.is.a('array').that.is.empty;
      });

      it('should return no courts with the filter and the user is admin', async () => {
        const query = {
            ball: 3, 
            query_time: '2023-11-21+10:00:00',   
            address: '文山區',
            public_index: 0
          };

        const res = await chai
            .request(app)
            .get('/api/users/appointment/join')
            .set('Authorization', `Bearer df882093-0955-b49f-1660-ab04ae44c92`)
            .query(query);
            
        // 进行断言，验证返回的数据是否符合预期
        expect(res).to.have.status(401);
        expect(res.body).to.equal('You are not the user!');
    });

});