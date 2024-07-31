import { Application, Request, Response } from 'express';
import { generateTextIA, modelIA } from './urlIA';
import { IAKey } from '../../utils/data';


export const createUserRequestIA = (app: Application) => {
  app.post("/specificationWorker", async (req: Request, res: Response) => {
    try{
      const answer = await fetch(generateTextIA, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${IAKey}`
        },
        body: JSON.stringify({
          model: modelIA,
          messages: [
            {
              role: "user",
              content: req.body.message
            }
          ]
        })
      })
      
      const data = await answer.json();
      if(!data){
        return res.status(400).json({ message: 'Bad request' });
      }
      else{
        return res.status(200).json(data);
      }
    } 
    catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
};