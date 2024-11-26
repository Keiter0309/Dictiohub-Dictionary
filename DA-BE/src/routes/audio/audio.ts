import {Router} from 'express';
import AudioController from '../../controllers/audio/audioController';

export const audioRoute = Router();

audioRoute.get('/audio', AudioController.getAudio);