import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/app.js';
import courtModel from '../models/court.js';
import courtRoute from '../routes/court.js';
import courtController from '../controllers/court.js';
const { expect } = chai;

chai.use(chaiHttp)

// GET /api/courts/admin/appointment
describe('get courts API', () => {
    it('should return no court when there is no corresponding court to the filter', async () => {
        const query = {
            ball: 3, // 替换成你的测试值
            date: '2023-11-01', // 替换成你的测试值
            address: '文山區',
            page: 2
          };

        const res = await chai
            .request(app)
            .get('/api/courts/admin/appointment')
            .set('Authorization', `Bearer 78f71412-e3f5-914d-ad75-bdda1a4580ad`)
            .query(query); 
            
        // 进行断言，验证返回的数据是否符合预期
        expect(res).to.have.status(200);
        expect(res.body).that.is.a('array').that.is.empty;
      });

      it('should return corresponding courts with the filter and the user is admin', async () => {
        const query = {
            ball: 3, 
            date: '2023-12-14', 
            address: '文山區',
            page: 1
          };

        const res = await chai
          .request(app)
          .get('/api/courts/admin/appointment')
          .set('Authorization', `Bearer 78f71412-e3f5-914d-ad75-bdda1a4580ad`)
          .query(query); 
            
        // 进行断言，验证返回的数据是否符合预期
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('total_page').that.is.a('number');
        expect(res.body).to.have.property('courts').that.is.a('array').that.is.not.empty;
      });

    it('should return unauthorized when user is not an admin', (done) => {
      const query = {
        ball: 3, 
        date: '2023-12-14', 
        address: '文山區',
        page: 1
      };
        chai.request(app)
        .get('/api/courts/admin/appointment')
        .set('Authorization', `Bearer 78f71412-e3f5-914d-d75-bdda1a4580ad`)
          .query(query)
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.equal("You are not the court provider!");
            done();
          });
    });
});