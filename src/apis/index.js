import axios from 'axios'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application.json',
  },
})

/**
 * Ballon들의 List를 가져오는 함수
 *
 * @returns {object} ballons
 */
export const getBallonListData = () => {
  //   return instance.get('/ballons')
}

// const mockupBallonListData ={
//     "success": bool,
// 	"data": [
// 		{
// 			"id": int,
// 			"address": str,
// 			"detection_image": str,
// 			"detection_time": datetime,
// 			"processing_image": str,
// 			"processing_time": datetime,
// 			"processing_state": enum,
// 			"description": str
// 		},
// 	],
// 	"error": None
// }
