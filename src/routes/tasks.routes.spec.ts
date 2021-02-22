const express = require("express");
import tasks from './tasks.routes';
import request from 'supertest'

const app = express(); 
app.use("/tasks", tasks); //routes


describe('Testing tasks routes', () => {
    it('GET /tasks/list', async () => {
        
        const { body } = await request(app).get("/tasks");
        expect(body).toEqual(
            {}
        )
        
    })
})