import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { SleepDuration} from '../../models/SleepDuration';
import moment from 'moment';

const router = Router();
//let sleepDurations: SleepDuration[] = [];

const dataValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('gender').notEmpty().withMessage('Gender is required'),
  body('sleepDuration').isNumeric().withMessage('SleepDuration must be a number'),
];

router.get('/', async(req: Request, res: Response) => {
  let result: any[] = []
  const sleepDurations = await SleepDuration.find({})

  sleepDurations.forEach((d) => {
    const match = result.find(o => o.name === d.name && o.gender === d.gender);
    if (match){
      match.numberOfTimes ++
    }else{
      result.push({
        name: d.name,
        gender: d.gender,
        numberOfTimes: 1
      })
    }
  })
  res.json(result);
});

router.get('/:name', async(req : Request, res: Response) => {
  let result: any[] = []
  const sleepDurations = await SleepDuration.find({"createDate":{ $lt: new Date(), 
    $gte: new Date(new Date().setDate(new Date().getDate()-7))}})

  sleepDurations.forEach((d) => {
    const match = result.find(o => o.name === d.name && o.gender === d.gender && moment(o.createDate).format('YYYMMDD') ===moment(d.createDate).format('YYYMMDD') );
    if (match){
      match.sleepDuration= d.sleepDuration
    }else{
      result.push({
        name: d.name,
        gender: d.gender,
        sleepDuration: d.sleepDuration,
        createDate: d.createDate
      })
    }
  })
  res.json(result);
});


router.post('/', dataValidationRules,  async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  const sleepDuration = SleepDuration.build({
    name: req.body.name,
    sleepDuration: req.body.sleepDuration,
    gender: req.body.gender,
    createDate: new Date()
  })
  
  await sleepDuration.save()

//  sleepDurations.push(sleepDuration);
  res.status(201).json({})
});

export default router;