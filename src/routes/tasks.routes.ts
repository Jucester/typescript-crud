import { Router, Request, Response } from 'express';
import Task from '../models/task';


const router = Router();


router.route('/create')
      .get((req: Request, res: Response) => {
          res.render('tasks/create')
      })
      .post(async (req: Request, res: Response) => {
         
            const { title, description } = req.body;
            const newTask = new Task({
                title, description
            });

            await newTask.save();

            res.redirect('/tasks/list')
      })


router.route('/list')
      .get( async (req: Request, res: Response) => {
            const tasksList = await Task.find().lean();
            console.log(tasksList)
            res.render('tasks/list', { tasksList });
       })

router.route('/delete/:id')
       .get( async (req: Request, res: Response) => {
            const { id } = req.params;
            
            await Task.findByIdAndDelete({ _id: id }); 
         
            res.redirect('tasks/list')
        })


router.route('/edit/:id')
        .get( async (req: Request, res: Response) => {
             const { id } = req.params;
             console.log(id);
             const task = await Task.findById({ _id: id }).lean(); 
             console.log(task)
             res.render('tasks/edit', { task });
         })
        .post( async (req: Request, res: Response) => {
            const { id } = req.params;
            const { title, description } = req.body;

            await Task.findByIdAndUpdate({ _id: id }, { title, description }); 
      
            res.redirect('/tasks/list')
        })
        
 

export default router;