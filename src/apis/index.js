import axios from 'axios'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * balloon들의 List를 가져오는 함수
 *
 * @returns {object} balloons
 */
export const getballoonListData = async () => {
  const data = await instance.get('/api/v1/balloons/')
  console.log('data:', data.data.data)
  return data.data.data

  // return mockData.data
}

export const getBallonData = async ({ balloon_id }) => {
  const data = await instance.get(`/api/v1/balloons/${balloon_id}`)
  console.log('data:', data.data.data)
  return data.data.data
}

/**
 * 제보하는 POST 함수 (이미지 + 기타 데이터 FormData로 전송, JSON 데이터도 포함)
 * @param {number} latitude 위도
 * @param {number} longitude 경도
 * @param {string} detection_time 발견시간 (YYYY-MM-DD HH:mm:ss 형식의 문자열)
 * @param {File} detection_image 발견 이미지 (파일)
 */
export const postBalloonData = async ({ latitude, longitude, detection_time, detection_image }) => {
  const formData = new FormData()

  // 이미지 파일을 FormData에 추가
  formData.append('detection_image', detection_image)
  formData.append('latitude', latitude)
  formData.append('longitude', longitude)
  formData.append('detection_time', detection_time)

  try {
    // API 요청
    const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/balloons/reported-balloons`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data // 요청 성공 시 응답 데이터를 반환
  } catch (error) {
    console.error('Error posting balloon data:', error)
    throw error // 오류 발생 시 상위 호출로 전달
  }
}

export const triggerFCM = async () => {
  try {
    const response = await instance.get('/api/v1/balloons/notifications')
    console.log('trigger:', response)
  } catch (error) {
    console.error('FCM Trigger 오류:', error)
  }
}
export const sendToken = async ({ token }) => {
  const data = {
    registration_token: token,
  }
  try {
    const response = await instance.post('/api/v1/balloons/notifications/token', data)
    console.log('token resp', response)
  } catch (error) {
    console.error('토큰을 보내는데 에러가 발생했습니다.:', error)
  }
}

const mockData = {
  success: true,
  data: [
    {
      id: '0e68778b-d19b-4182-a419-7eb9be5f933b',
      latitude: 37.27943075229118,
      longitude: 127.01763998406159,
      detection_image: 'detection_image2',
      detection_time: '2024-08-08T09:00:00',
      processing_image: 'processing_image2',
      processing_time: '2024-08-10 14:00:00',
      processing_state: '처리 완료',
      description: '처리 완료',
    },
    {
      id: '866795f1-f41a-480b-ab69-79987fc5a464',
      latitude: 37.55915668706214,
      longitude: 126.92536526611102,
      detection_image: 'detection_image3',
      detection_time: '2024-08-09 09:00:00',
      processing_image: null,
      processing_time: null,
      processing_state: '발견',
      description: null,
    },
    {
      id: 'b8def4a6-eb6d-41e5-ac82-9c43327da740',
      latitude: 37.27943075229118,
      longitude: 128.01763998406159,
      detection_image: 'detection_image1',
      detection_time: '2024-08-08T09:00:00',
      processing_image: null,
      processing_time: null,
      processing_state: '발견',
      description: null,
    },
    {
      id: '4327970c-f9b3-4ff7-84d1-f4de7cf2bac2',
      latitude: 35.20618517638034,
      longitude: 129.07944301057026,
      detection_image: 'detection_image2',
      detection_time: '2024-08-10T09:00:00',
      processing_image: 'processing_image2',
      processing_time: '2024-08-10T14:56:00',
      processing_state: '처리 완료',
      description: null,
    },
    {
      id: '548dc8d4-006d-4463-b5ec-ce1e942d809b',
      latitude: 37.55518388656961,
      longitude: 126.92926237742505,
      detection_image: 'detection_image1',
      detection_time: '2024-08-08 13:33:00',
      processing_image: null,
      processing_time: null,
      processing_state: '발견',
      description: null,
    },
    {
      id: 'c2f52805-4034-4634-8a81-61a98ea100e8',
      latitude: 37.561110808242056,
      longitude: 126.9831268386891,
      detection_image: 'detection_image3',
      detection_time: '2024-08-09 09:00:00',
      processing_image: null,
      processing_time: null,
      processing_state: '발견',
      description: '단순 쓰레기',
    },
    {
      id: 'e2a7c2f8-b9c4-4b47-a3a1-82bc634dd75f',
      latitude: 37.572045,
      longitude: 126.991089,
      detection_image: 'detection_image4',
      detection_time: '2024-08-11 10:00:00',
      processing_image: 'processing_image4',
      processing_time: '2024-08-12T15:00:00',
      processing_state: '처리 완료',
      description: '쓰레기 제거 완료',
    },
    {
      id: 'fa4325f2-74d4-4932-a34f-cb5710be5e8d',
      latitude: 36.481045,
      longitude: 127.282289,
      detection_image: 'detection_image5',
      detection_time: '2024-08-12T11:00:00',
      processing_image: null,
      processing_time: null,
      processing_state: '발견',
      description: '도심 쓰레기',
    },
    {
      id: 'fb5647b9-13de-4835-a22c-8e48f8c69a18',
      latitude: 38.259189,
      longitude: 127.589134,
      detection_image: 'detection_image6',
      detection_time: '2024-08-13T08:00:00',
      processing_image: 'processing_image6',
      processing_time: '2024-08-13T16:30:00',
      processing_state: '처리 완료',
      description: '산간 지역 쓰레기 처리 완료',
    },
    {
      id: '6dc8ab3f-dc2e-409a-9d4e-3e3b2fcd1b0e',
      latitude: 35.6804,
      longitude: 128.2573,
      detection_image: 'detection_image7',
      detection_time: '2024-08-14T14:00:00',
      processing_image: null,
      processing_time: null,
      processing_state: '발견',
      description: '길거리 쓰레기 발견',
    },
    {
      id: '3ad789f9-9146-44a7-b9a4-4b44eebf943e',
      latitude: 37.541,
      longitude: 127.0,
      detection_image: 'detection_image8',
      detection_time: '2024-08-15T15:00:00',
      processing_image: null,
      processing_time: null,
      processing_state: '발견',
      description: '공원 내 쓰레기',
    },
    {
      id: 'd7c74f12-b05f-41d6-8cf6-d9c2ebfa1c72',
      latitude: 35.1796,
      longitude: 129.0756,
      detection_image: 'detection_image9',
      detection_time: '2024-08-15T09:30:00',
      processing_image: 'processing_image9',
      processing_time: '2024-08-15T14:00:00',
      processing_state: '처리 완료',
      description: '부산 도심 내 쓰레기 제거 완료',
    },
    // 추가된 데이터
    {
      id: 'ab123456-7cde-49f1-1234-0abc123def56',
      latitude: 37.123456,
      longitude: 127.123456,
      detection_image: 'detection_image10',
      detection_time: '2024-08-16T08:00:00',
      processing_image: null,
      processing_time: null,
      processing_state: '발견',
      description: '해변가 쓰레기',
    },
    {
      id: 'cd987654-12ab-34cd-5678-90ef123abc78',
      latitude: 36.654321,
      longitude: 127.987654,
      detection_image: 'detection_image11',
      detection_time: '2024-08-16T09:00:00',
      processing_image: 'processing_image11',
      processing_time: '2024-08-17T12:00:00',
      processing_state: '처리 완료',
      description: '농촌 지역 쓰레기 처리 완료',
    },

    {
      id: 'gh098765-43de-21fg-65hi-543jkl890mno',
      latitude: 35.432101,
      longitude: 128.765432,
      detection_image: 'detection_image13',
      detection_time: '2024-08-17T13:30:00',
      processing_image: 'processing_image13',
      processing_time: '2024-08-17T16:00:00',
      processing_state: '처리 완료',
      description: '도심 공원 쓰레기 처리 완료',
    },
    {
      id: 'ij567890-98zy-21wx-34uv-12ef123qwe78',
      latitude: 37.987654,
      longitude: 127.654321,
      detection_image: 'detection_image14',
      detection_time: '2024-08-18T10:00:00',
      processing_image: null,
      processing_time: null,
      processing_state: '발견',
      description: '하천변 쓰레기 발견',
    },
  ],
}
